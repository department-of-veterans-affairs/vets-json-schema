import _ from 'lodash/fp';

import constants from '../../common/constants';
import definitions from '../../common/definitions';

// Common definition doesn't have bank name
const directDepositDef = _.set('properties.bankName', { type: 'string' }, definitions.bankAccount);

// Until we can use the common address definition...
// Grab countries and state lists
const countries = constants.countries.map(object => object.value);
const countriesWithStateList = Object.keys(constants.states).filter(x => _.includes(countries, x));
const countryStateProperties = _.map(constants.states, (value, key) => ({
  properties: {
    country: {
      type: 'string',
      'enum': [key]
    },
    state: {
      type: 'string',
      'enum': value.map(x => x.value)
    }
  }
}));
countryStateProperties.push({
  properties: {
    country: {
      not: {
        type: 'string',
        'enum': countriesWithStateList
      }
    },
    state: {
      type: 'string',
      maxLength: 51 // Is this right?
    }
  },
});


const addressDef = {
  type: 'object',
  oneOf: countryStateProperties, // holds country and state
  properties: {
    addressLine1: {
      type: 'string'
      // maxLength: 51 // Until we know otherwise?
    },
    addressLine2: {
      type: 'string'
      // maxLength: 51 // Until we know otherwise?
    },
    addressLine3: {
      type: 'string'
      // maxLength: 51 // Until we know otherwise?
    },
    city: {
      type: 'string'
      // maxLength: 51 // Until we know otherwise?
    },
    zipFirstFive: {
      type: 'number',
      minLength: 5,
      maxLength: 5
    },
    zipLastFour: {
      type: 'number',
      minLength: 4,
      maxLength: 4
    },
    militaryPostOfficeTypeCode: {
      type: 'string'
      // maxLength: 51 // Until we know otherwise?
    },
    militaryStateCode: {
      type: 'string'
      // maxLength: 51 // Until we know otherwise?
    },
    type: {
      type: 'string',
      enum: [
        // Are these exact?
        'international',
        'domestic',
        'military'
      ]
    }
  }
};

// Apparently we don't need a suffix here.
const fullNameDef = _.omit('properties.suffix', definitions.fullName);

// Not sure this particular kind of datetime definition will be used anywhere else
// Pattern matches datetimes like 2018-03-22T17:25:19.191Z where the fractional seconds are optional
// NOTE: This doesn't catch invalid days like February 30th
const datetime = {
  pattern: '(\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?Z',
  type: 'string'
}


let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-526EZ)',
  type: 'object',
  definitions: {
    directDeposit: directDepositDef,
    datetime,
    // dateRange: definitions.dateRange // hopefully we can use this later
    phone: {
      type: 'object',
      properties: {
        areaCode: {
          type: 'string'
          // Validation?
        },
        phoneNumber: {
          $ref: '#/definitions/phone'
        }
      }
    },
    fullName: definitions.fullName
  },
  properties: {
    veteran: {
      type: 'object',
      properties: {
        emailAddress: {
          type: 'string',
          format: 'email'
        },
        alternateEmailAddress: {
          type: 'string',
          format: 'email'
        },
        mailingAddress: addressDef,
        primaryPhone: {
          $ref: '#/definitions/phone'
        },
        forwardingAddress: _.set('properties.efctvDt', {
          $ref: '#/definitions/datetime'
        }, addressDef),
        homelessness: {
          type: 'object',
          properties: {
            hasPointOfContact: {
              type: 'boolean'
            },
            pointOfContact: {
              type: 'object',
              properties: {
                pointOfContactName: {
                  type: 'string'
                  // maxLength: 51 // Until we know otherwise?
                },
                primaryPhone: {
                  $ref: '#/definitions/phone'
                }
              }
            }
          }
        },
        serviceNumber: {
          type: 'string'
          // What kind of validation goes here?
        }
      }
    },
    attachments: {
      type: 'array',
      items: {
        type: 'object',
        // What kind of validation do we use for all of these?
        properties: {
          documentName: {
            type: 'string'
          },
          dateUploaded: {
            type: 'string'
          },
          attachmentType: {
            type: 'string'
          },
          inflightDocumentId: {
            type: 'string'
          }
        }
      }
    },
    militaryPayments: {
      type: 'object',
      properties: {
        payments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              amount: {
                type: 'number'
              },
              payType: {
                type: 'string'
              }
            }
          }
        },
        receiveCompensationInLieuOfRetired: {
          type: 'boolean' // Is this right?
        },
        receivingInactiveDutyTrainingPay: {
          type: 'boolean' // Is this right?
        },
        waveBenifitsToRecInactDutyTraiPay: {
          type: 'boolean' // Is this right?
        }
      }
    },
    directDeposit: {
      $ref: '#/definitions/directDeposit'
    },
    serviceInformation: {
      type: 'object',
      properties: {
        // This is a little different from the common serviceHistory definition
        servicePeriods: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              serviceBranch: {
                type: 'string'
              },
              // The common definition has these in a `dateRange` object
              activeDutyBegin: {
                $ref: '$/definitions/datetime'
              },
              activeDutyEnd: {
                $ref: '$/definitions/datetime'
              }
              // The common definition has a `dischargeType`
            }
          }
        },
        servedInReservesOrNationalGuard: {
          type: 'boolean' // Is this right?
        },
        obligationTermOfServiceFrom: {
          type: 'boolean' // Is this right?
        },
        obligationTermOfServiceTo: {
          type: 'string'
        },
        anticipatedSeparationDate: {
          $ref: '$/definitions/datetime'
        },
        servedInCombatZone: {
          type: 'boolean'
        },
        currentlyActiveTitle10: {
          type: 'boolean' // Is this right?
        },
        title10ActivationDate: {
          $ref: '$/definitions/datetime'
        },
        title10UnitName: {
          type: 'string'
        },
        title10Phone: {
          $ref: '#/definitions/phone'
        },
        separationLocationName: {
          type: 'string'
        },
        separationLocationCode: {
          type: 'string'
        },
        // Presumably, this should be an array...
        alternateNames: {
          type: 'array',
          items: {
            $ref: '#/definitions/fullName'
          }
        },
        // Presumably, this should be an array...
        confinements: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              confinementBegin: {
                $ref: '#/definitions/datetime'
              },
              confinementEnd: {
                $ref: '#/definitions/datetime'
              },
              verifiedInd: {
                type: 'boolean' // Is this right?
              }
            }
          }
        }
      }
    },
    // Presumably, this should be an array...
    disabilities: {
      type: 'array',
      items: {
        // Any validation here would be great
        type: 'object',
        properties: {
          disability: { // Really hoping this extra nesting isn't necessary
            type: 'object',
            properties: {
              diagnosticText: {
                type: 'string'
              },
              decisionCode: {
                type: 'string'
              },
              specialIssues: {
                type: 'object', // Is this supposed to be an array?
                properties: {
                  // I get the sneaking suspicion this is going to be an enum
                  specialIssueCode: {
                    type: 'string'
                  },
                  specialIssueName: {
                    type: 'string'
                  }
                }
              },
              ratedDisabilityId: {
                type: 'string'
              },
              disabilityActionType: {
                type: 'string'
              },
              ratingDecisionId: {
                type: 'string'
              },
              diagnosticCode: {
                type: 'string'
              },
              // Presumably, this should be an array...
              secondaryDisabilities: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    diagnosticText: {
                      type: 'string'
                    },
                    disabilityActionType: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    // Presumably, this should be an array...
    treatments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          treatment: { // Really hoping this extra nesting isn't necessary
            type: 'object',
            properties: {
              treatmentCenterName: {
                type: 'string'
              },
              // Can we make this in to a dateRange?
              startTreatment: {
                $ref: '#/definitions/datetime'
              },
              endTreatment: {
                $ref: '#/definitions/datetime'
              },
              // Should this use a dropdown like address?
              treatmentCenterCountry: {
                type: 'string'
              },
              // Should this use a dropdown like address?
              treatmentCenterState: {
                type: 'string'
              },
              treatmentCenterCity: {
                type: 'string'
              },
              treatmentCenterType: {
                // Enum?
                type: 'string'
              }
            }
          }
        }
      }
    },
    // Presumably, this should be an array...
    specialCircumstances: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          specialCircumstance: { // Really hoping this extra nesting isn't necessary
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              code: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  },
  // Any idea?
  required: []
};

export default schema;

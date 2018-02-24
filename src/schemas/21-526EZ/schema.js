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

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-526EZ)',
  type: 'object',
  definitions: {
    directDeposit: directDepositDef,
    date: definitions.date,
    // dateRange: definitions.dateRange // hopefully we can use this later
    phone: definitions.phone,
    fullPhone: {
      type: 'object',
      properties: {
        areaNbr: {
          type: 'string'
          // Validation?
        },
        phoneNbr: {
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
          $ref: '#/definitions/fullPhone'
        },
        forwardingAddress: _.set('properties.efctvDt', {
          $ref: '#/definitions/date'
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
                // Should we make this a sub-object called
                // pointOfContactPhone so we can re-use a definition
                // for when the validation changes?
                pointOfContactAreaCode: {
                  type: 'string'
                  // What kind of validation goes here?
                },
                pointOfContactPhoneNumber: {
                  type: 'string'
                  // What kind of validation goes here?
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
    // Should this be an array of objects?
    attachments: {
      type: 'object',
      // What kind of validation do we use for all of these?
      docName: {
        type: 'string'
      },
      dateUploaded: {
        type: 'string'
      },
      attachmentType: {
        type: 'string'
      },
      inflightId: {
        type: 'string'
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
                $ref: '$/definitions/date'
              },
              activeDutyEnd: {
                $ref: '$/definitions/date'
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
          $ref: '$/definitions/date'
        },
        servedInCombatZone: {
          type: 'boolean'
        },
        currentlyActiveTitle10: {
          type: 'boolean' // Is this right?
        },
        title10ActivationDate: {
          $ref: '$/definitions/date'
        },
        title10UnitName: {
          type: 'string'
        },
        // TODO: Use definition for phone
        title10Phone: {
          $ref: '#/definitions/fullPhone'
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
                $ref: '#/definitions/date'
              },
              confinementEnd: {
                $ref: '#/definitions/date'
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
              treatmentCenterType: {
                // Enum?
                type: 'string'
              },
              // Can we make this in to a dateRange?
              startTreatment: {
                $ref: '#/definitions/date'
              },
              endTreatment: {
                $ref: '#/definitions/date'
              },
              // Should this use a dropdown like address?
              treatmentCenterCountry: {
                type: 'string'
              },
              // Should this use a dropdown like address?
              treatmentCenterState: {
                type: 'string'
              },
              treatmentCenterName: {
                type: 'string'
              },
              treatmentCenterCity: {
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

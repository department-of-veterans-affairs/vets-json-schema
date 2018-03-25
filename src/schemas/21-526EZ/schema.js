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
    fullName: definitions.fullName,
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
    specialIssues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: {
            type: 'string'
          },
          name: {
            type: 'string'
          }
        }
      }
    }
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
        forwardingAddress: _.set('properties.effectiveDate', {
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
              activeDutyBeginDate: {
                $ref: '$/definitions/datetime'
              },
              activeDutyEndDate: {
                $ref: '$/definitions/datetime'
              }
              // The common definition has a `dischargeType`
            }
          }
        },
        reservesNationalGuardService: {
          type: 'object',
          properties: {
            title10Activation: {
              type: 'object',
              properties: {
                title10ActivationDate: {
                  $ref: '$/definitions/datetime'
                },
                anticipatedSeparationDate: {
                  $ref: '$/definitions/datetime'
                },
              }
            }
            obligationTermOfServiceFromDate: {
              $ref: '$/definitions/datetime'
            },
            obligationTermOfServiceToDate: {
              $ref: '$/definitions/datetime'
            },
            unitName: {
              type: 'string'
            },
            unitPhone: {
              $ref: '#/definitions/phone'
            },
          }
        },
        servedInCombatZone: {
          type: 'boolean'
        },
        currentlyActiveTitle10: {
          type: 'boolean' // Is this right?
        },
        separationLocationName: {
          type: 'string'
        },
        separationLocationCode: {
          type: 'string'
        },
        alternateNames: {
          type: 'array',
          items: {
            $ref: '#/definitions/fullName'
          }
        },
        confinements: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              confinementBeginDate: {
                $ref: '#/definitions/datetime'
              },
              confinementEndDate: {
                $ref: '#/definitions/datetime'
              },
              verifiedIndicator: {
                type: 'boolean'
              }
            }
          }
        }
      }
    },
    disabilities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          diagnosticText: {
            type: 'string'
          },
          disabilityActionType: {
            type: 'string'
          },
          decisionCode: {
            type: 'string'
          },
          specialIssues: {
            $ref: '#/definitions/specialIssues'
          },
          ratedDisabilityId: {
            type: 'string'
          },
          ratingDecisionId: {
            type: 'string'
          },
          diagnosticCode: {
            type: 'number'
          },
          specialIssueTypeCode: {
            type: 'string'
          },
          secondaryDisabilities: {
            type: 'array',
            items: {
              // It'd be nice to use a diability definition, but we can't continually nest the `secondaryDisabilities` property
              type: 'object',
              properties: {
                diagnosticText: {
                  type: 'string'
                },
                disabilityActionType: {
                  type: 'string'
                },
                decisionCode: {
                  type: 'string'
                },
                specialIssues: {
                  $ref: '#/definitions/specialIssues'
                },
                ratedDisabilityId: {
                  type: 'string'
                },
                ratingDecisionId: {
                  type: 'string'
                },
                diagnosticCode: {
                  type: 'number'
                },
                specialIssueTypeCode: {
                  type: 'string'
                },
              }
            }
          }
        }
      }
    },
    treatments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          treatmentCenterName: {
            type: 'string'
          },
          // Can we make this in to a dateRange?
          startTreatmentDate: {
            $ref: '#/definitions/datetime'
          },
          endTreatmentDate: {
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
    },
    // Presumably, this should be an array...
    specialCircumstances: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          code: {
            type: 'string'
          },
          needed: {
            type: 'boolean'
          }
        }
      }
    }
  },
  // Any idea?
  required: []
};

export default schema;

import _ from 'lodash/fp';

import constants from '../../common/constants';
import definitions from '../../common/definitions';

// Common definition doesn't have bank name
const directDepositDef = _.set('properties.bankName', { type: 'string' }, definitions.bankAccount);

// Copy pasta from the common address definition
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
      // TODO: state is only a two-character code
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
      pattern: '^[a-zA-Z]{2}$'
    }
  },
});


const addressDef = {
  type: 'object',
  oneOf: countryStateProperties, // holds country and state
  properties: {
    // These validations (including regular expressions) come from the swagger docs
    // Should these patterns start with ^ to make sure they apply to the whole string?
    addressLine1: {
      type: 'string',
      maxLength: 30, // Is that going to be long enough?
      // I think the + here means it's required
      pattern: "([a-zA-Z0-9\-'.,,&#]([a-zA-Z0-9\-'.,,&# ])?)+$"
    },
    addressLine2: {
      type: 'string',
      maxLength: 30, // Is that going to be long enough?
      pattern: "([a-zA-Z0-9\-'.,,&#][a-zA-Z0-9\-'.,,&# ]?)*$"
    },
    addressLine3: {
      type: 'string',
      maxLength: 30, // Is that going to be long enough?
      pattern: "([a-zA-Z0-9\-'.,,&#][a-zA-Z0-9\-'.,,&# ]?)*$"
    },
    city: {
      type: 'string',
      maxLength: 30, // Is that going to be long enough?
      // I think the + here means it's required
      pattern: "([a-zA-Z0-9\-'.#]([a-zA-Z0-9\-'.# ])?)+$"
    },
    zipFirstFive: {
      type: 'string',
      // This validation isn't in the swagger docs
      pattern: '^\d{5}$'
    },
    zipLastFour: {
      type: 'string',
      // This validation isn't in the swagger docs
      pattern: '^\d{4}$'
    },
    militaryPostOfficeTypeCode: {
      type: 'string',
      // Should these be capitalized, or should we make sure they're lower case when we send them to the api?
      enum: ['apo', 'dpo', 'fpo']
    },
    militaryStateCode: {
      type: 'string'
      enum: ['AA', 'AE', 'AP']
    },
    type: {
      type: 'string',
      enum: ['DOMESTIC', 'MILITARY', 'INTERNATIONAL']
    }
  },
  required: ['addressLine1', 'country']
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
          pattern: '\d{3}'
        },
        phoneNumber: {
          type: 'string',
          pattern: '\d{7,11}'
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
              type: 'boolean',
              // Is this standard to define the default value in the schema?
              // Is our form library even set up to care about the default like this?
              default: false // Explicitly set to false instead of undefined
            },
            pointOfContact: {
              type: 'object',
              properties: {
                pointOfContactName: {
                  type: 'string'
                   maxLength: 100, // Why can this be so long but not the address parts?
                  pattern: "([a-zA-Z0-9\-'.#][a-zA-Z0-9\-'.# ]?)*$"
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
          pattern: '^[a-zA-Z0-9]{1,9}$'
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
            $ref: '#/definitions/datetime'
          },
          attachmentType: {
            type: 'string'
          },
          inflightDocumentId: {
            type: 'number'
          }
        }
      }
    },
    militaryPayments: {
      type: 'object',
      properties: {
        payments: {
          type: 'array',
          maxItems: 100,
          items: {
            type: 'object',
            properties: {
              amount: {
                type: 'number'
              },
              payType: {
                type: 'string',
                enum: [
                  'LONGEVITY',
                  'TEMPORARY_DISABILITY_RETIRED_LIST',
                  'PERMANENT_DISABILITY_RETIRED_LIST',
                  'SEPARATION',
                  'SEVERANCE'
                ]
              }
            }
          }
        },
        receiveCompensationInLieuOfRetired: {
          type: 'boolean',
          default: false
        },
        receivingInactiveDutyTrainingPay: {
          type: 'boolean',
          default: false
        },
        waveBenifitsToRecInactDutyTraiPay: {
          type: 'boolean',
          default: false
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
      minItems: 1,
      maxItems: 100,
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
      maxItems: 100,
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
      maxItems: 100,
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
  required: ['veteran', 'disabilities', 'serviceInformation']
};

export default schema;

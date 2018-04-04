import _ from 'lodash/fp';

import constants from '../../common/constants';
import definitions from '../../common/definitions';

// TODO: Check NOBANK option with EVSS, adapt accountType from common def if not needed
// TODO: Verify why we don't validate accountNumber in common definition
const uniqueBankFields = {
  type: 'object',
  properties: {
    accountType: {
      type: 'string',
      enum: ['CHECKING', 'SAVINGS', 'NOBANK']
    },
    accountNumber: {
      type: 'string',
      pattern: '^\\d{4,17}$'
    },
    bankName: {
      type: 'string',
      maxLength: 35,
      pattern: "([a-zA-Z0-9\-'.,# ])+$"
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

// Defined here to enable easy adding of properties for forwardingAddress
const addressDef = definitions.pciuAddress;

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-526EZ)',
  type: 'object',
  definitions: {
    address: addressDef,
    directDeposit: _.merge(definitions.bankAccount, uniqueBankFields),
    datetime,
    // dateRange: definitions.dateRange // hopefully we can use this later
    fullName: definitions.fullName,
    phone: {
      type: 'object',
      properties: {
        areaCode: {
          type: 'string',
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
      maxItems: 100,
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
        mailingAddress: {
          $ref: '#/definitions/address'
        },
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
                  type: 'string',
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
          type: 'string',
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
          minItems: 1,
          maxItems: 100,
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
            },
            required: ['serviceBranch', 'activeDutyBeginDate']
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
            },
            obligationTermOfServiceFromDate: {
              $ref: '$/definitions/datetime'
            },
            obligationTermOfServiceToDate: {
              $ref: '$/definitions/datetime'
            },
            unitName: {
              type: 'string',
              maxLength: 256,
              pattern: "([a-zA-Z0-9\-'.#][a-zA-Z0-9\-'.# ]?)*$"
            },
            unitPhone: {
              $ref: '#/definitions/phone'
            },
          }
        },
        servedInCombatZone: {
          type: 'boolean',
          default: false
        },
        separationLocationName: {
          type: 'string',
          maxLength: 256,
          pattern: "([a-zA-Z0-9\-'.#][a-zA-Z0-9\-'.# ]?)*$"
        },
        separationLocationCode: {
          type: 'string'
        },
        alternateNames: {
          type: 'array',
          maxItems: 100,
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
                type: 'boolean',
                default: false
              }
            }
          }
        }
      },
      required: ['servicePeriods', 'servedInCombatZone']
    },
    disabilities: {
      type: 'array',
      minItems: 1,
      maxItems: 100,
      items: {
        type: 'object',
        properties: {
          diagnosticText: {
            type: 'string',
            maxLength: 255,
            pattern: "([a-zA-Z0-9\-'.,#]([a-zA-Z0-9\-',.# ])?)+$"
          },
          disabilityActionType: {
            type: 'string',
            enum: ['NONE', 'NEW', 'SECONDARY', 'INCREASE', 'REOPEN']
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
            maxItems: 100,
            items: {
              // It'd be nice to use a diability definition, but we can't continually nest the `secondaryDisabilities` property
              type: 'object',
              properties: {
                diagnosticText: {
                  type: 'string',
                  maxLength: 255,
                  pattern: "([a-zA-Z0-9\-'.,#]([a-zA-Z0-9\-',.# ])?)+$"
                },
                disabilityActionType: {
                  type: 'string',
                  enum: ['NONE', 'NEW', 'SECONDARY', 'INCREASE', 'REOPEN']
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
              },
              required: ['diagnosticText', 'decisionCode', 'ratedDisabilityId']
            }
          }
        },
        required: ['diagnosticText', 'decisionCode', 'ratedDisabilityId']
      }
    },
    treatments: {
      type: 'array',
      maxItems: 100,
      items: {
        type: 'object',
        properties: {
          treatmentCenterName: {
            type: 'string',
            maxLength: 100,
            pattern: "([a-zA-Z0-9\-'.#]([a-zA-Z0-9\-'.# ])?)+$"
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
            type: 'string',
            pattern: '[a-zA-Z]{2}'
          },
          treatmentCenterCity: {
            type: 'string',
            maxLength: 100,
            pattern: "([a-zA-Z0-9\-'.#]([a-zA-Z0-9\-'.# ])?)+$"
          },
          treatmentCenterType: {
            type: 'string',
            enum: ['VA_MEDICAL_CENTER', 'DOD_MTF']
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
            type: 'boolean',
            default: false
          }
        }
      }
    }
  },
  required: ['veteran', 'disabilities', 'serviceInformation']
};

export default schema;

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

disabilitiesBaseDef = {
  type: 'array',
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
    },
    required: ['diagnosticText', 'decisionCode', 'ratedDisabilityId']
  }
};

/**
 * Modifies the common serviceHistory definition to fit with 526 API reqs. Note
 * that this uses a dateRange whereas 526 requires begin and end dates - this
 * transformation will be handled by vets-api. This object is deeply nested;
 * attempts at transforming it non-mutatively were convoluted.
 * @typedef {object} definitions
 * @property {object} serviceHistory
 * @param {definitions} definitions the common schema definitions file
 * @returns {object} the servicePeriods schema object
 */
const servicePeriodsDef = ((definitions) => {
  const serviceHistory = _.cloneDeep(definitions.serviceHistory);
  serviceHistory.minItems = 1;
  serviceHistory.maxItems = 100;
  serviceHistory.items.required = ['serviceBranch', 'dateRange'];
  delete serviceHistory.items.properties.dischargeType

  return serviceHistory;
})(definitions);

// Extracted to enable easy adding of properties for forwardingAddress
const addressDef = definitions.pciuAddress;

// Strip suffix from fullName common def
const fullNameDef = Object.assign(definitions.fullName, {
  properties: _.omit('suffix', definitions.fullName.properties)
});

/**
 * Strip address lines from PCIU address def for use with treatment center addresses
 * @typedef {object} definitions
 * @property {object} pciuAddress
 * @param {definitions} definitions from the common schema definitions file
 * @returns {object} the treatmentCenterAddress schema object
 */
const treatmentCenterAddressDef = ((definitions) => {
  const treatmentAddressProperties = _.pick(
    ['city', 'state', 'country'],
    definitions.pciuAddress.properties
  );

  return Object.assign(definitions.pciuAddress, { properties: treatmentAddressProperties });
})(definitions);

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-526EZ)',
  type: 'object',
  definitions: {
    address: addressDef,
    treatmentCenterAddress: treatmentCenterAddressDef,
    directDeposit: _.merge(definitions.bankAccount, uniqueBankFields),
    date: { definitions },
    dateRange: { definitions },
    disabilities: _.merge(disabilitiesBaseDef, {
      minItems: 1,
      items: {
        properties: {
          secondaryDisabilities: disabilitiesBaseDef
        }
      }
    }),
    fullName: fullNameDef,
    // vets-api will split into separate area code & phone number fields
    phone: Object.assign(definitions.phone, { maxLength: 10 }),
    servicePeriods: servicePeriodsDef,
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
          $ref: '#/definitions/date'
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
            $ref: '#/definitions/date'
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
        servicePeriods: {
          $ref: '#/definitions/servicePeriods'
        },
        reservesNationalGuardService: {
          type: 'object',
          properties: {
            title10Activation: {
              type: 'object',
              properties: {
                title10ActivationDate: {
                  $ref: '$/definitions/date'
                },
                anticipatedSeparationDate: {
                  $ref: '$/definitions/date'
                },
              }
            },
            obligationTermOfServiceDateRange: {
              $ref: '$/definitions/dateRange'
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
              confinementDateRange: {
                $ref: '#/definitions/dateRange'
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
      $ref: '#/definitions/disabilities'
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
          treatmentDateRange: {
            $ref: '#/definitions/dateRange'
          },
          treatmentCenterAddress: {
            $ref: '#/definitions/treatmentCenterAddress'
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

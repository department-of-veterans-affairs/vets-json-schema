import _ from 'lodash/fp';
import definitions from '../../common/definitions';

// TODO: Verify why we don't validate accountNumber in common definition
const uniqueBankFields = {
  type: 'object',
  properties: {
    accountType: {
      type: 'string',
      enum: ['CHECKING', 'SAVINGS', 'NOBANK'] // If NOBANK, no acct/routing num, or bank name.
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

const disabilitiesBaseDef = {
  type: 'array',
  maxItems: 100,
  items: {
    type: 'object',
    required: ['diagnosticText', 'disabilityActionType', 'decisionCode', 'ratedDisabilityId'],
    properties: {
      name: {
        type: 'string',
        maxLength: 255,
        pattern: "([a-zA-Z0-9\-'.,#]([a-zA-Z0-9\-',.# ])?)+$"
      },
      disabilityActionType: {
        type: 'string',
        enum: ['NONE', 'NEW', 'SECONDARY', 'INCREASE', 'REOPEN']
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
      classificationCode: {
        type: 'string'
      }
    }
  }
};


// Extracted to enable easy adding of properties for forwardingAddress
const addressDef = definitions.pciuAddress;

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

/**
 * Transforms common fullName definition by adding regex validations and
 * removing suffix property.
 * @typedef {object} definitions
 * @property {object} fullName
 * @param {definitions} definitions the common schema definitions file
 * @returns {object} the servicePeriods schema object
 */
const fullNameDef = ((definitions) => {
  const fullNameClone = _.cloneDeep(definitions.fullName);
  delete fullNameClone.properties.suffix;

  // These patterns are taken straight from Swagger
  const firstLastPattern = "([a-zA-Z0-9\-'.#]([a-zA-Z0-9\-'.# ])?)+$"
  fullNameClone.properties.first.pattern = firstLastPattern;
  fullNameClone.properties.last.pattern = firstLastPattern;
  fullNameClone.properties.middle.pattern = "([a-zA-Z0-9\-'.#][a-zA-Z0-9\-'.# ]?)*$";

  return fullNameClone;
})(definitions);

/**
 * Modifies PCIU Address for use with treatments schema
 * @typedef {object} definitions
 * @property {object} pciuAddress
 * @param {definitions} definitions from the common schema definitions file
 * @returns {object} the treatmentCenterAddress schema object
 */
const vaTreatmentCenterAddressDef = (({ pciuAddress }) => {
  const { type, oneOf, properties } = pciuAddress;
  return Object.assign({}, {
    type,
    oneOf: oneOf.map((obj) => _.cloneDeep(obj)),
    required: ['country'],
    properties: _.pick([
      'country',
      'city',
      'state'
    ], properties)
  });
})(definitions);

/**
 * Grab address lines, city and zip from PCIU address common def, then add
 * country and state properties for 'oneOf' to work properly
 */
const privateTreatmentCenterAddressDef = (({ pciuAddress }) => {
  const { type, oneOf, required, properties } = pciuAddress;
  
  return Object.assign({}, {
    type,
    oneOf: oneOf.map((obj) => _.cloneDeep(obj)),
    required,
    properties: _.pick(
      ['country', 'addressLine1', 'addressLine2', 'city', 'state', 'zip'],
      properties
    )
  });
})(definitions);

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-526EZ)',
  type: 'object',
  definitions: {
    address: addressDef,
    vaTreatmentCenterAddress: vaTreatmentCenterAddressDef,
    privateTreatmentCenterAddress: privateTreatmentCenterAddressDef,
    directDeposit: _.merge(definitions.bankAccount, uniqueBankFields),
    date: definitions.date,
    dateRange: _.set('required', ['from'], definitions.dateRange), 
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
    phone: Object.assign({}, definitions.phone, {
      pattern: "\d{7}" // differs from Swagger, but agreement from EVSS to update
    }),
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
        required: ['treatmentCenterName', 'treatmentCenterType'],
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
            $ref: '#/definitions/vaTreatmentCenterAddress'
          },
          treatmentCenterType: {
            type: 'string',
            enum: ['VA_MEDICAL_CENTER', 'DOD_MTF']
          }
        }
      }
    },
    privateRecordReleases: {
    // These records are sent through an ancillary form and are not directly
    // submitted via 526. This ancillary submission process has no actual
    // validations, but we thought keeping them here (especially for address)
    // would enforce a baseline of data quality which would be in the
    // submitter's best interest.
      type: 'array',
      items: {
        type: 'object',
        required: ['treatmentCenterName'],
        properties: {
          treatmentCenterName: {
            type: 'string',
            maxLength: 100,
            pattern: "([a-zA-Z0-9\\-'.#]([a-zA-Z0-9\\-'.# ])?)+$"
          },
          treatmentDateRange: {
            $ref: '#/definitions/dateRange'
          },
          treatmentCenterAddress: {
            $ref: '#/definitions/privateTreatmentCenterAddress'
          },
          privateMedicalRecordsReleaseRestricted: {
            type: 'boolean',
            default: false
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
    },
    noRapidProcessing: {
      type: 'boolean',
      default: false
    },
  },
  required: ['veteran', 'disabilities', 'serviceInformation']
};

export default schema;

import _ from 'lodash/fp';
import definitions from '../../common/definitions';

// TODO: Verify why we don't validate accountNumber in common definition
const uniqueBankFields = {
  type: 'object',
  required: ['accountType', 'accountNumber', 'bankName', 'routingNumber'],
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
      pattern: "^([a-zA-Z0-9\\-'.,# ])+$"
    }
  }
};

const disabilitiesBaseDef = {
  type: 'array',
  maxItems: 100,
  items: {
    type: 'object',
    required: ['name', 'disabilityActionType'],
    properties: {
      name: {
        type: 'string',
        maxLength: 255,
        pattern: "^([a-zA-Z0-9\\-'.,#]([a-zA-Z0-9\\-',.# ])?)+$"
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
      classificationCode: {
        type: 'string'
      }
    }
  }
};


// Extracted to enable easy adding of properties for forwardingAddress
const addressDef = definitions.pciuAddress;

// Some date ranges require both 'from' and 'to' dates
const dateRangeAllRequired = _.set('required', ['from', 'to'], definitions.dateRange);

// Other date ranges don't
const dateRangeFromRequired = _.set('required', ['from'], definitions.dateRange);

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
  const firstLastPattern = "^([a-zA-Z0-9\\-'.#]([a-zA-Z0-9\\-'.# ])?)+$"
  fullNameClone.properties.first.pattern = firstLastPattern;
  fullNameClone.properties.last.pattern = firstLastPattern;
  fullNameClone.properties.middle.pattern = "^([a-zA-Z0-9\\-'.#][a-zA-Z0-9\\-'.# ]?)*$";

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
      ['country', 'addressLine1', 'addressLine2', 'city', 'state', 'zipCode'],
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
    dateRange: definitions.dateRange,
    dateRangeFromRequired,
    dateRangeAllRequired,
    disabilities: _.merge(disabilitiesBaseDef, {
      minItems: 1,
      items: {
        properties: {
          secondaryDisabilities: disabilitiesBaseDef
        }
      }
    }),
    fullName: fullNameDef,
    phone: definitions.usaPhone,
    specialIssues: {
      type: 'array',
      maxItems: 100,
      items: {
        type: 'object',
        required: ['code', 'name'],
        properties: {
          code: {
            type: 'string',
            enum: [
              'ALS',
              'AOIV',
              'AOOV',
              'ASB',
              'EHCL',
              'GW',
              'HEPC',
              'MG',
              'POW',
              'RDN',
              'SHAD',
              'TRM',
              '38USC1151',
              'PTSD/1',
              'PTSD/2',
              'PTSD/4)'
            ]
          },
          name: {
            type: 'string'
          }
        }
      }
    }
  },
  required: [
    'veteran',
    'serviceInformation',
    'disabilities',
    'applicationExpirationDate',
    'standardClaim',
    'claimantCertification'
  ],
  properties: {
    veteran: {
      type: 'object',
      required: ['emailAddress', 'mailingAddress', 'primaryPhone'],
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
          required: ['hasPointOfContact'],
          properties: {
            hasPointOfContact: {
              type: 'boolean',
              default: false
            },
            pointOfContact: {
              type: 'object',
              required: ['pointOfContactName', 'primaryPhone'],
              properties: {
                pointOfContactName: {
                  type: 'string',
                  maxLength: 100,
                  pattern: "^([a-zA-Z0-9\\-'.#][a-zA-Z0-9\\-'.# ]?)*$"
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
      // Uploaded through a separate vets-api endpoint, not part of 526 submit
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
      required: ['payments', 'receiveCompensationInLieuOfRetired'],
      properties: {
        payments: {
          type: 'array',
          maxItems: 100,
          items: {
            type: 'object',
            required: ['payType', 'amount'],
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
          // I want military retired pay instead of VA compensation
          type: 'boolean',
          default: false
        },
      }
    },
    directDeposit: {
      $ref: '#/definitions/directDeposit'
    },
    serviceInformation: {
      type: 'object',
      required: ['servicePeriods', 'servedInCombatZone'],
      properties: {
        servicePeriods: {
          type: 'array',
          minItems: 1,
          maxItems: 100,
          items: {
            type: 'object',
            required: ['serviceBranch', 'dateRange'],
            properties: {
              serviceBranch: {
                type: 'string',
                enum: [
                  'Air Force',
                  'Air Force Reserve',
                  'Air National Guard',
                  'Army',
                  'Army National Guard',
                  'Army Reserve',
                  'Coast Guard',
                  'Coast Guard Reserve',
                  'Marine Corps',
                  'Marine Corps Reserve',
                  'National Oceanic and Atmospheric Administration',
                  'Navy',
                  'Navy Reserve',
                  'Public Health Service'
                ]
              },
              dateRange: {
                $ref: '#/definitions/dateRangeAllRequired'
              }
            }
          }
        },
        reservesNationalGuardService: {
          type: 'object',
          required: ['obligationTermOfServiceDateRange', 'unitName', 'unitPhone', ],
          properties: {
            title10Activation: {
              type: 'object',
              required: ['title10ActivationDate', 'anticipatedSeparationDate'],
              properties: {
                title10ActivationDate: {
                  $ref: '#/definitions/date'
                },
                anticipatedSeparationDate: {
                  $ref: '#/definitions/date'
                },
              }
            },
            obligationTermOfServiceDateRange: {
              $ref: '#/definitions/dateRangeAllRequired'
            },
            unitName: {
              type: 'string',
              maxLength: 256,
              pattern: "^([a-zA-Z0-9\\-'.#][a-zA-Z0-9\\-'.# ]?)*$"
            },
            unitPhone: {
              $ref: '#/definitions/phone'
            },
            inactiveDutyTrainingPay: {
              type: 'object',
              required: ['waiveVABenefitsToRetainTrainingPay'],
              properties: {
                waiveVABenefitsToRetainTrainingPay: {
                  // I elect to waive VA benefits for the days I accrued
                  // inactive duty training pay in order to retain my inactive
                  // duty training pay.
                  type: 'boolean',
                  default: false
                }
              }
            }
          }
        },
        servedInCombatZone: {
          type: 'boolean',
          default: false
        },
        separationLocationName: {
          type: 'string',
          maxLength: 256,
          pattern: "^([a-zA-Z0-9\\-'.#][a-zA-Z0-9\\-'.# ]?)*$"
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
          maxItems: 100,
          items: {
            type: 'object',
            properties: {
              confinementDateRange: {
                $ref: '#/definitions/dateRangeAllRequired'
              },
              verifiedIndicator: {
                type: 'boolean',
                default: false
              }
            }
          }
        }
      }
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
            pattern: "^([a-zA-Z0-9\\-'.#]([a-zA-Z0-9\\-'.# ])?)+$"
          },
          treatmentDateRange: {
            $ref: '#/definitions/dateRangeFromRequired'
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
            pattern: "^([a-zA-Z0-9\\-'.#]([a-zA-Z0-9\\-'.# ])?)+$"
          },
          treatmentDateRange: {
            $ref: '#/definitions/dateRangeFromRequired'
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
    specialCircumstances: {
      type: 'array',
      maxItems: 100,
      required: ['name', 'code', 'needed'],
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
    standardClaim: {
      // I DO NOT want my claim considered for rapid processing under the FDC
      // program because I plan to submit further evidence in support of my claim
      type: 'boolean',
      default: false
    },
    claimantCertification: {
      // VETERAN/SERVICE MEMBER/ALTERNATE SIGNER SIGNATURE
      type: 'boolean',
      default: false
    }
  },
};

export default schema;

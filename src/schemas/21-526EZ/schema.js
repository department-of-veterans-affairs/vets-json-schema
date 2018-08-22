import _ from 'lodash/fp';
import definitions from '../../common/definitions';
import {
  pciuCountries,
  pciuStates,
  documentTypes526
} from '../../common/constants';

const disabilitiesBaseDef = {
  type: 'array',
  maxItems: 100,
  items: {
    type: 'object',
    required: ['name', 'disabilityActionType'],
    properties: {
      name: {
        type: 'string',
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

const addressBaseDef = {
  type: 'object',
  required: ['country', 'city', 'addressLine1'],
  properties: {
    country: {
      type: 'string',
      'enum': pciuCountries,
      default: 'USA'
    },
    addressLine1: {
      type: 'string',
      maxLength: 20,
      pattern: "^([-a-zA-Z0-9'.,&#]([-a-zA-Z0-9'.,&# ])?)+$"
    },
    addressLine2: {
      type: 'string',
      maxLength: 20,
      pattern: "^([-a-zA-Z0-9'.,&#]([-a-zA-Z0-9'.,&# ])?)+$"
    },
    addressLine3: {
      type: 'string',
      maxLength: 20,
      pattern: "^([-a-zA-Z0-9'.,&#]([-a-zA-Z0-9'.,&# ])?)+$"
    },
    city: {
      type: 'string',
      maxLength: 30,
      pattern: "^([-a-zA-Z0-9'.#]([-a-zA-Z0-9'.# ])?)+$"
    },
    state: {
      type: 'string',
      'enum': pciuStates.map(state => state.value),
      enumNames: pciuStates.map(state => state.label)
    },
    zipCode: {
      type: 'string',
      pattern: '^\\d{5}(?:([-\\s]?)\\d{4})?$'
    }
  }
};

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
 * Modifies address schema for use with treatments schema
 * @property {object} addressSchema
 * @returns {object} the treatmentCenterAddress schema object
 */
const vaTreatmentCenterAddressDef = ((addressSchema) => {
  const { type, properties } = addressSchema;
  return Object.assign({}, {
    type,
    required: ['country'],
    properties: _.pick([
      'country',
      'city',
      'state'
    ], properties)
  });
})(addressBaseDef);

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-526EZ)',
  type: 'object',
  definitions: {
    address: addressBaseDef,
    vaTreatmentCenterAddress: vaTreatmentCenterAddressDef,
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
              'PTSD/4'
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
    'standardClaim'
  ],
  properties: {
    veteran: {
      type: 'object',
      required: ['emailAddress', 'mailingAddress', 'primaryPhone'],
      properties: {
        emailAddress: {
          type: 'string',
          minLength: 6,
          maxLength: 80,
          pattern: '^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
        },
        alternateEmailAddress: {
          type: 'string',
          format: 'email',
          maxLength: 80,
          pattern: '^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
        },
        mailingAddress: {
          $ref: '#/definitions/address'
        },
        primaryPhone: {
          $ref: '#/definitions/phone'
        },
        // Forwarding address differs from mailing address in a few key ways:
        // 1. Address lines 1-3 are max 20 chars instead of 35
        // 2. The UI is such that requiring fields must be done in the UI schema
        // 3. There is an effectiveDate property that specifies the date at which
        //    the forwarding address should start to be used
        forwardingAddress: _.set('properties.effectiveDate', {
          $ref: '#/definitions/date'
        }, _.omit('required', _.merge(addressBaseDef, {
          properties: {
            addressLine1: {
              maxLength: 35
            },
            addressLine2: {
              maxLength: 35
            },
            addressLine3: {
              maxLength: 35
            }
          }
        }))),
        homelessness: {
          type: 'object',
          required: ['isHomeless'],
          properties: {
            isHomeless: {
              type: 'boolean'
            },
            pointOfContact: {
              type: 'object',
              properties: {
                pointOfContactName: {
                  type: 'string',
                  minLength: 1,
                  maxLength: 100,
                  pattern: "([a-zA-Z0-9-/']+( ?))*$"
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
        required: ['name', 'attachmentId'],
        properties: {
          // This is the document name schema - FileField requires this specific name be used
          name: {
            type: 'string'
          },
          confirmationCode: {
            type: 'string'
          },
          // This is the document type schema - FileField requires this specific name be used
          attachmentId: {
            type: 'string',
            'enum': documentTypes526.map(doc => doc.value),
            enumNames: documentTypes526.map(doc => doc.label),
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
    serviceInformation: {
      type: 'object',
      required: ['servicePeriods'],
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
                  'NOAA',
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
          required: ['unitName', 'obligationTermOfServiceDateRange', 'waiveVABenefitsToRetainTrainingPay'],
          properties: {
            unitName: {
              type: 'string',
              maxLength: 256,
              pattern: "^([a-zA-Z0-9\\-'.#][a-zA-Z0-9\\-'.# ]?)*$"
            },
            obligationTermOfServiceDateRange: {
              $ref: '#/definitions/dateRangeAllRequired'
            },
            waiveVABenefitsToRetainTrainingPay: {
              // I elect to waive VA benefits for the days I accrued
              // inactive duty training pay in order to retain my inactive
              // duty training pay.
              type: 'boolean',
            },
            title10Activation: {
              type: 'object',
              properties: {
                title10ActivationDate: {
                  $ref: '#/definitions/date'
                },
                anticipatedSeparationDate: {
                  $ref: '#/definitions/date'
                },
              }
            }
          }
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
            $ref: '#/definitions/vaTreatmentCenterAddress'
          },
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
    }
  },
};

export default schema;

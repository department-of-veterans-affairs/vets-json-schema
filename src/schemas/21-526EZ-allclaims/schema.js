import _ from 'lodash/fp';
import definitions from '../../common/definitions';
import {
  documentTypes526,
  pciuCountries,
  pciuStates
} from '../../common/constants';

const ptsdAttachment = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      size: {
        type: 'integer'
      },
      confirmationCode: {
        type: 'string'
      }
    }
  }
};

const serviceBranches = [
  'Air Force',
  'Army',
  'Coast Guard',
  'Marine Corps',
  'National Oceanic and Atmospheric Administration',
  'Navy',
  'Public Health Service'
];

const disabilitiesBaseDef = {
  type: 'array',
  maxItems: 100,
  items: {
    type: 'object',
    required: ['name', 'disabilityActionType'],
    properties: {
      name: {
        type: 'string'
      },
      disabilityActionType: {
        type: 'string',
        enum: ['NONE', 'NEW', 'SECONDARY', 'INCREASE', 'REOPEN']
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

const baseAddressDef = {
  type: 'object',
  required: ['country', 'city', 'addressLine1'],
  properties: {
    country: {
      type: 'string',
      enum: pciuCountries,
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
      enum: pciuStates.map(state => state.value),
      enumNames: pciuStates.map(state => state.label)
    },
    zipCode: {
      type: 'string',
      pattern: '^\\d{5}(?:([-\\s]?)\\d{4})?$'
    }
  }
};

const vaTreatmentCenterAddressDef = (addressSchema => {
  const { type, properties } = addressSchema;
  return Object.assign(
    {},
    {
      type,
      required: ['country'],
      properties: _.pick(['country', 'city', 'state'], properties)
    }
  );
})(baseAddressDef);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR DISABILITY BENEFITS',
  type: 'object',
  definitions: {
    phone: definitions.usaPhone,
    date: definitions.date,
    fullName: definitions.fullName,
    email: {
      type: 'string',
      minLength: 6,
      maxLength: 80,
      pattern:
        '^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
    },
    address: baseAddressDef,
    vaTreatmentCenterAddress: vaTreatmentCenterAddressDef,
    dateRangeAllRequired: _.set(
      'required',
      ['from', 'to'],
      definitions.dateRange
    ),
    dateRangeFromRequired: _.set('required', ['from'], definitions.dateRange),
    dateRange: definitions.dateRange,
    disabilities: _.merge(disabilitiesBaseDef, {
      minItems: 1,
      items: {
        properties: {
          secondaryDisabilities: disabilitiesBaseDef
        }
      }
    }),
    ptsdAttachment
  },
  properties: {
    alternateNames: {
      type: 'array',
      maxItems: 100,
      items: {
        type: 'object',
        properties: {
          first: {
            type: 'string',
            minLength: 1,
            maxLength: 30,
            pattern: "^([a-zA-Z0-9-/']+( ?))+$"
          },
          middle: {
            type: 'string',
            minLength: 1,
            maxLength: 30,
            pattern: "^([a-zA-Z0-9-/']+( ?))+$"
          },
          last: {
            type: 'string',
            minLength: 1,
            maxLength: 30,
            pattern: "^([a-zA-Z0-9-/']+( ?))+$"
          }
        }
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
          required: ['unitName', 'obligationTermOfServiceDateRange'],
          properties: {
            unitName: {
              type: 'string',
              maxLength: 256,
              pattern: "^([a-zA-Z0-9\\-'.#][a-zA-Z0-9\\-'.# ]?)*$"
            },
            unitAddress: {
              $ref: '#/definitions/address'
            },
            unitPhone: {
              $ref: '#/definitions/phone'
            },
            obligationTermOfServiceDateRange: {
              $ref: '#/definitions/dateRangeAllRequired'
            },
            title10Activation: {
              type: 'object',
              properties: {
                title10ActivationDate: {
                  $ref: '#/definitions/date'
                },
                anticipatedSeparationDate: {
                  $ref: '#/definitions/date'
                }
              }
            }
          }
        }
      }
    },
    servedInCombatZonePost911: {
      type: 'boolean'
    },
    confinements: {
      type: 'array',
      minItems: 1,
      items: {
        $ref: '#/definitions/dateRangeAllRequired'
      }
    },
    militaryRetiredPayBranch: {
      type: 'string',
      enum: serviceBranches
    },
    waiveRetirementPay: {
      type: 'boolean'
    },
    separationPayDate: {
      type: 'string'
    },
    separationPayBranch: {
      type: 'string',
      enum: serviceBranches
    },
    hasTrainingPay: {
      type: 'boolean'
    },
    waiveTrainingPay: {
      type: 'boolean'
    },
    disabilities: {
      $ref: '#/definitions/disabilities'
    },
    newDisabilities: {
      type: 'array',
      items: {
        type: 'object',
        required: ['condition', 'cause'],
        properties: {
          condition: {
            type: 'string'
          },
          cause: {
            type: 'string',
            enum: ['NEW', 'SECONDARY', 'WORSENED', 'VA']
          },
          primaryDescription: {
            type: 'string'
          },
          causedByDisability: {
            type: 'string'
          },
          causedByDisabilityDescription: {
            type: 'string'
          },
          worsenedDescription: {
            type: 'string'
          },
          worsenedEffects: {
            type: 'string'
          },
          VAMistreatmentDescription: {
            type: 'string'
          },
          VAMistreatmentLocation: {
            type: 'string'
          },
          VAMistreatmentDate: {
            type: 'string'
          }
        }
      }
    },
    mailingAddress: {
      $ref: '#/definitions/address'
    },
    // Forwarding address differs from mailing address in a few key ways:
    // 1. Address lines 1-3 are max 35 chars instead of 20
    // 2. The UI is such that requiring fields must be done in the UI schema
    // 3. There are effectiveStartDate and effectiveEndDate properties that
    //    specify the date at which the forwarding address should start to be
    //    used
    forwardingAddress: _.set(
      'properties.effectiveDate',
      {
        $ref: '#/definitions/dateRange'
      },
      _.omit(
        'required',
        _.merge(baseAddressDef, {
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
        })
      )
    ),
    emailAddress: {
      $ref: '#/definitions/email'
    },
    primaryPhone: {
      $ref: '#/definitions/phone'
    },
    homelessOrAtRisk: {
      type: 'string',
      enum: ['no', 'homeless', 'atRisk']
    },
    homelessHousingSituation: {
      type: 'string',
      enum: ['shelter', 'notShelter', 'anotherPerson', 'other']
    },
    otherHomelessHousing: {
      type: 'string'
    },
    needToLeaveHousing: {
      type: 'boolean'
    },
    atRiskHousingSituation: {
      type: 'string',
      enum: ['losingHousing', 'leavingShelter', 'other']
    },
    otherAtRiskHousing: {
      type: 'string'
    },
    homelessnessContact: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: "([a-zA-Z0-9-/']+( ?))*$"
        },
        phoneNumber: {
          $ref: '#/definitions/phone'
        }
      }
    },
    vaTreatmentFacilities: {
      type: 'array',
      minItems: 1,
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
          }
        }
      }
    },
    attachments: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'attachmentId'],
        properties: {
          name: {
            type: 'string'
          },
          confirmationCode: {
            type: 'string'
          },
          attachmentId: {
            type: 'string',
            enum: documentTypes526.map(doc => doc.value),
            enumNames: documentTypes526.map(doc => doc.label)
          }
        }
      }
    },
    bankAccountType: {
      type: 'string',
      enum: ['Checking', 'Savings']
    },
    bankAccountNumber: {
      type: 'string',
      minLength: 4,
      maxLength: 17
    },
    bankRoutingNumber: {
      type: 'string',
      pattern: '^\\d{9}$'
    },
    bankName: {
      type: 'string',
      maxLength: 35
    },
    isVAEmployee: {
      type: 'boolean'
    },
    standardClaim: {
      type: 'boolean',
      default: false
    },
    ptsd781Attachment: {
      $ref: '#/definitions/ptsdAttachment'
    },
    ptsd781aAttachment: {
      $ref: '#/definitions/ptsdAttachment'
    },
    form4142: {
      type: 'object',
      properties: {
        limitedConsent: {
          type: 'string'
        },
        providerFacility: {
          type: 'array',
          required: [
            'providerFacilityName',
            'treatmentDateRange',
            'providerFacilityAddress'
          ],
          items: {
            type: 'object',
            properties: {
              providerFacilityName: {
                type: 'string'
              },
              treatmentDateRange: {
                $ref: '#/definitions/dateRange'
              },
              providerFacilityAddress: {
                $ref: '#/definitions/address'
              }
            }
          }
        },
        privacyAgreementAccepted: {
          type: 'boolean'
        }
      }
    },
    form0781: {
      type: 'object',
      incident: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            personalAssault: {
              type: 'boolean'
            },
            medalsCitations: {
              type: 'string'
            },
            incidentDate: {
              $ref: '#/definitions/date'
            },
            incidentLocation: {
              type: 'string'
            },
            incidentDescription: {
              type: 'string'
            },
            unitAssigned: {
              type: 'string'
            },
            unitAssignedDates: {
              $ref: '#/definitions/dateRange'
            },
            remarks: {
              type: 'string'
            },
            personInvolved: {
              type: 'array',
              items: {
                type: 'object',
                name: {
                  $ref: '#/definitions/fullName'
                },
                rank: {
                  type: 'string'
                },
                injuryDeath: {
                  type: 'string',
                  enum: [
                    'Killed in Action',
                    'Killed Non-Battle',
                    'Wounded in Action',
                    'Injured Non-Battle',
                    'Other'
                  ]
                },
                injuryDeathOther: {
                  type: 'string'
                },
                injuryDeathDate: {
                  $ref: '#/definitions/date'
                },
                unitAssigned: {
                  type: 'string'
                }
              }
            },
            source: {
              type: 'array',
              items: {
                type: 'object',
                name: {
                  $ref: '#/definitions/fullName'
                },
                address: {
                  $ref: '#/definitions/address'
                }
              }
            }
          }
        }
      }
    }
  }
};

export default schema;

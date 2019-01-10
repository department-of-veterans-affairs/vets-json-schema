import _ from 'lodash/fp';
import { countries } from '../../common/constants';
import definitions from '../../common/definitions';
import {
  documentTypes526,
  pciuCountries,
  pciuStates
} from '../../common/constants';

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
      specialIssues: { $ref: '#/definitions/specialIssues' },
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
    specialIssues: {
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'ALS',
          'HEPC',
          'POW',
          'PTSD/1',
          'PTSD/2',
          'PTSD/3',
          'PTSD/4',
          'MST'
        ]
      }
    },
    address: baseAddressDef,
    vaTreatmentCenterAddress: vaTreatmentCenterAddressDef,
    dateRange: definitions.dateRange,
    dateRangeAllRequired: _.set(
      'required',
      ['from', 'to'],
      definitions.dateRange
    ),
    dateRangeFromRequired: _.set('required', ['from'], definitions.dateRange),
    ratedDisabilities: _.merge(disabilitiesBaseDef, {
      minItems: 1,
      items: {
        properties: {
          secondaryDisabilities: disabilitiesBaseDef
        }
      }
    }),
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
          specialIssues: {
            $ref: '#/definitions/specialIssues'
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
    unitAssigned: {
      type: 'string',
      maxLength: 100
    },
    unitAssignedDates: {
      type: 'object',
      properties: {
        from: {
          type: 'string'
        },
        to: {
          type: 'string'
        }
      }
    },
    ptsdIncident: {
      type: 'object',
      properties: {
        incidentDate: { $ref: '#/definitions/date' },
        incidentDescription: { type: 'string' },
        unitAssigned: { $ref: '#/definitions/unitAssigned' },
        unitAssignedDates: { $ref: '#/definitions/unitAssignedDates' }
      }
    },
    secondaryPtsdIncident: {
      type: 'object',
      properties: {
        sources: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              address: {
                type: 'object',
                required: [],
                properties: {
                  ..._.omit(['addressLine3'], baseAddressDef.properties),
                  country: {
                    default: 'USA',
                    type: 'string',
                    enum: countries.map(country => country.value),
                    enumNames: countries.map(country => country.label)
                  },
                  state: {
                    title: 'State',
                    type: 'string',
                    maxLength: 51
                  }
                }
              }
            }
          }
        },
        incidentDate: { $ref: '#/definitions/date' },
        description: { type: 'string' },
        unitAssigned: { $ref: '#/definitions/unitAssigned' },
        unitAssignedDates: { $ref: '#/definitions/unitAssignedDates' }
      }
    }
  },
  properties: {
    alternateNames: {
      type: 'array',
      minItems: 1,
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
            obligationTermOfServiceDateRange: {
              $ref: '#/definitions/dateRangeAllRequired'
            },
            receivingTrainingPay: {
              type: 'boolean'
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
    ratedDisabilities: { $ref: '#/definitions/ratedDisabilities' },
    newPrimaryDisabilities: {
      $ref: '#/definitions/newDisabilities'
    },
    newSecondaryDisabilities: {
      $ref: '#/definitions/newDisabilities'
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
    phoneAndEmail: {
      type: 'object',
      required: ['primaryPhone', 'emailAddress'],
      properties: {
        primaryPhone: {
          $ref: '#/definitions/phone'
        },
        emailAddress: {
          $ref: '#/definitions/email'
        }
      }
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
        required: ['treatmentCenterName', 'treatedDisabilityNames'],
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
          treatedDisabilityNames: {
            type: 'array',
            minItems: 1,
            maxItems: 100,
            items: {
              type: 'string'
            }
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
    mentalChanges: {
      type: 'object',
      properties: {
        depression: {
          type: 'boolean'
        },
        obsessive: {
          type: 'boolean'
        },
        prescription: {
          type: 'boolean'
        },
        substance: {
          type: 'boolean'
        },
        hypervigilance: {
          type: 'boolean'
        },
        agoraphobia: {
          type: 'boolean'
        },
        fear: {
          type: 'boolean'
        },
        other: {
          type: 'boolean'
        },
        otherExplanation: {
          type: 'string'
        },
        noneApply: {
          type: 'boolean'
        }
      }
    },
    form0781: {
      type: 'object',
      properties: {
        remarks: {
          type: 'string'
        },
        additionalIncidentText: {
          type: 'string'
        },
        additionalSecondaryIncidentText: {
          type: 'string'
        },
        otherInformation: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        incidents: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['personalAssault'],
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
              personsInvolved: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'object',
                      properties: {
                        first: {
                          type: 'string'
                        },
                        middle: {
                          type: 'string'
                        },
                        last: {
                          type: 'string'
                        }
                      }
                    },
                    rank: {
                      type: 'string'
                    },
                    injuryDeath: {
                      type: 'string',
                      enum: [
                        'killedInAction',
                        'killedNonBattle',
                        'woundedInAction',
                        'injuredNonBattle',
                        'other'
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
                    },
                    description: {
                      type: 'string'
                    }
                  }
                }
              },
              sources: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string'
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
    },
    form4142: {
      type: 'object',
      properties: {
        limitedConsent: {
          type: 'string'
        },
        providerFacility: {
          type: 'array',
          minItems: 1,
          maxItems: 100,
          items: {
            type: 'object',
            required: [
              'providerFacilityName',
              'treatmentDateRange',
              'providerFacilityAddress'
            ],
            properties: {
              providerFacilityName: {
                type: 'string',
                minLength: 1,
                maxLength: 100
              },
              treatmentDateRange: {
                type: 'array',
                items: {
                  $ref: '#/definitions/dateRangeAllRequired'
                }
              },
              providerFacilityAddress: {
                type: 'object',
                required: ['street', 'city', 'country', 'state', 'postalCode'],
                properties: {
                  street: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20
                  },
                  street2: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 20
                  },
                  city: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 30
                  },
                  postalCode: {
                    type: 'string',
                    pattern: '^\\d{5}(?:([-\\s]?)\\d{4})?$'
                  },
                  country: baseAddressDef.properties.country,
                  state: baseAddressDef.properties.state
                }
              }
            }
          }
        }
      }
    },
    form8940: {
      type: 'object',
      properties: {
        unemployability: {
          type: 'object',
          properties: {
            mostIncome: {
              type: 'number',
            },
            yearEarned: {
              type: 'string',
            },
            job: {
              type: 'string',
            },
            disabilityPreventingEmployment: {
              type: 'string'
            },
            underDoctorHopitalCarePast12M: {
              type: 'boolean'
            },
            doctorProvidedCare: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  address: {
                    $ref: '#/definitions/address'
                  },
                  dates: {
                    type: "string"
                  }
                }
              }
            },
            hospitalProvidedCare: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  address: {
                    $ref: '#/definitions/address'
                  },
                  dates: {
                    type: "string"
                  }
                }
              }
            },
            disabilityAffectedEmploymentFullTimeDate: {
              $ref: '#/definitions/date'
            },
            lastWorkedFullTimeDate: {
              $ref: '#/definitions/date'
            },
            becameTooDisabledToWorkDate: {
              $ref: '#/definitions/date'
            },
            mostEarningsInAYear: {
              type: 'string'
            },
            yearOfMostEarnings: {
              type: 'string'
            },
            occupationDuringMostEarnings: {
              type: 'string'
            },
            previousEmployers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  employerAddress: {
                    $ref: '#/definitions/address'
                  },
                  phone: {
                    $ref: '#/definitions/phone',
                  },
                  typeOfWork: {
                    type: 'string'
                  },
                  hoursPerWeek: {
                    type: 'number',
                    minimum: 0,
                    maximum: 999,
                  },
                  dates: {
                    $ref: '#/definitions/dateRange'
                  },
                  timeLostFromIllness: {
                    type: 'string'
                  },
                  mostEarningsInAMonth: {
                    type: 'number',
                    minimum: 0,
                  },
                  inBusiness: {
                    type: 'boolean',
                  },
                }
              }
            },
            disabilityPreventMilitaryDuties: {
              type: 'boolean'
            },
            past12MonthsEarnedIncome: {
              type: 'number',
              minimum: 0,
              maximum: 9999999.99,
            },
            currentMonthlyEarnedIncome: {
              type: 'number',
              minimum: 0,
              maximum: 9999999.99,
            },
            leftLastJobDueToDisability: {
              type: 'boolean'
            },
            leftLastJobDueToDisabilityRemarks: {
              type: 'string',
            },
            receiveExpectDisabilityRetirement: {
              type: 'boolean'
            },
            receiveExpectWorkersCompensation: {
              type: 'boolean'
            },
            attemptedToObtainEmploymentSinceUnemployability: {
              type: 'boolean'
            },
            appliedEmployers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  address: {
                    $ref: '#/definitions/address'
                  },
                  workType: {
                    type: 'string'
                  },
                  date: {
                    $ref: '#/definitions/date'
                  },
                }
              }
            },
            education: {
              type: 'string',
              enum: [
                'Some elementary school',
                'Some high school',
                'High school diploma or GED',
                'Some college',
                "Associate's degree",
                'Bachelor’s degree',
                'Master’s degree',
                'Doctoral degre',
                'Other',
              ],
            },
            receivedOtherEducationTrainingPreUnemployability: {
              type: 'boolean'
            },
            otherEducationTrainingPreUnemployability: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  dates: {
                    $ref: '#/definitions/dateRange'
                  },
                }
              }
            },
            receivedOtherEducationTrainingPostUnemployability: {
              type: 'boolean'
            },
            otherEducationTrainingPostUnemployability: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  dates: {
                    $ref: '#/definitions/dateRange'
                  },
                }
              }
            },
            remarks: {
              type: 'string'
            }
          }
        },
      },
    },
    privateMedicalRecordAttachments: {
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
            enum: ['L107', 'L023'],
            enumNames: [
              'VA 21-4142 Authorization for Release of Information',
              'Other'
            ]
          }
        }
      }
    },
    completedFormAttachments: {
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
            type: 'string'
          }
        }
      }
    },
    secondaryAttachment: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'attachmentId'],
        properties: {
          name: {
            type: 'string',
          },
          confirmationCode: {
            type: 'string'
          },
          attachmentId: {
            type: 'string',
            enum: [
              'L229',
              'L018',
              'L034',
              'L048',
              'L049',
              'L029',
              'L023',
              'L015'
            ],
            enumNames: [
              'VA Form 21-0781a - Statement in Support of Claim for PTSD Secondary to Personal Assault',
              'Civilian Police Reports',
              'Military Personnel Record',
              'Medical Treatment Record - Government Facility',
              'Medical Treatment Record - Non-Government Facility',
              'DD214',
              'Other Correspondence',
              'Buddy/Lay Statement'
            ]
          }
        }
      }
    },
    unemployabilityAttachments: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'attachmentId'],
        properties: {
          name: {
            type: 'string',
          },
          confirmationCode: {
            type: 'string',
          },
          attachmentId: {
            type: 'string',
            enum: ['L149', 'L023'],
            enumNames: [
              'VA 21-8940 Veterans Application for Increased Compensation Based on Unemployability',
              'Other',
            ],
          },
        },
      },
    }, 
    employmentRequestAttachments: {
      type: "array",
      items: {
        type: "object",
        required: ["name", "attachmentId"],
        properties: {
          name: {
            type: "string"
          },
          confirmationCode: {
            type: "string"
          },
          attachmentId: {
            type: "string",
            enum: ["L115"],
            enumNames: [
              "A 21-4192 Request for Employment Information in Connection with Claim for Disability"
            ]
          }
        }
      }
    }
  }
};

export default schema;

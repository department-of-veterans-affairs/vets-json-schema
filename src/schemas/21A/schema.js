import pick from 'lodash/pick';
import { countries } from '../../common/constants';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply to become a VA-accredited attorney or claims agent',
  type: 'object',
  definitions: pick(definitions, 'country', 'date', 'email', 'phone'),
  properties: {
    firstName: {
      type: 'string',
    },
    middleName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    homeAddress: {
      type: 'object',
      properties: {
        addressType: {
          type: 'boolean',
        },
        line1: {
          type: 'string',
        },
        line2: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
        },
        country: {
          type: 'string',
          enum: countries.map(x => x.value),
        },
      },
    },
    homePhone: {
      $ref: '#/definitions/phone',
    },
    phoneType: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          enum: ['CELL', 'HOME', 'WORK'],
        },
      },
    },
    homeEmail: {
      $ref: '#/definitions/email',
    },
    employmentStatus: {
      type: 'string',
      enum: ['EMPLOYED', 'UNEMPLOYED', 'SELF_EMPLOYED', 'STUDENT', 'RETIRED', 'OTHER'],
    },
    employmentStatusExplanation: {
      type: 'string',
    },
    businessAddress: {
      type: 'object',
      properties: {
        addressType: {
          type: 'boolean',
        },
        line1: {
          type: 'string',
        },
        line2: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
        },
        country: {
          type: 'string',
          enum: countries.map(x => x.value),
        },
      },
    },
    birthdate: {
      $ref: '#/definitions/date',
    },
    birthCity: {
      type: 'string',
    },
    birthState: {
      type: 'string',
    },
    birthCountry: {
      type: 'string',
      enum: countries.map(x => x.value),
    },
    militaryServices: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          serviceBranch: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
          dischargeType: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
          dischargeTypeExplanation: {
            type: 'string',
          },
          entryDate: {
            $ref: '#/definitions/date',
          },
          dischargeDate: {
            $ref: '#/definitions/date',
          },
        },
      },
    },
    employment: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          employerAddress: {
            type: 'object',
            properties: {
              line1: {
                type: 'string',
              },
              line2: {
                type: 'string',
              },
              city: {
                type: 'string',
              },
              state: {
                type: 'string',
              },
              postalCode: {
                type: 'string',
              },
              country: {
                type: 'string',
                enum: countries.map(x => x.value),
              },
            },
          },
          phoneNumber: {
            $ref: '#/definitions/phone',
          },
          phoneExtension: {
            type: 'string',
          },
          positionTitle: {
            type: 'string',
          },
          startDate: {
            $ref: '#/definitions/date',
          },
          endDate: {
            $ref: '#/definitions/date',
          },
          supervisorName: {
            type: 'string',
          },
          supervisorEmail: {
            $ref: '#/definitions/email',
          },
        },
      },
    },
    financialPlaning: {
      type: 'string',
    },
    homeNursingCare: {
      type: 'string',
    },
    medicalServices: {
      type: 'string',
    },
    consultingService: {
      type: 'string',
    },
    advertisingtoVeterans: {
      type: 'string',
    },
    education: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          institutionAddress: {
            type: 'object',
            properties: {
              addressType: {
                type: 'boolean',
              },
              line1: {
                type: 'string',
              },
              line2: {
                type: 'string',
              },
              city: {
                type: 'string',
              },
              state: {
                type: 'string',
              },
              postalCode: {
                type: 'string',
              },
              country: {
                type: 'string',
                enum: countries.map(x => x.value),
              },
            },
          },
          startDate: {
            $ref: '#/definitions/date',
          },
          endDate: {
            $ref: '#/definitions/date',
          },
          wasDegreeReceived: {
            type: 'boolean',
          },
          degreeType: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
          major: {
            type: 'string',
          },
        },
      },
    },
    jurisdictions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          admissionDate: {
            $ref: '#/definitions/date',
          },
          membershipRegistrationNumber: {
            type: 'string',
          },
          admittanceType: {
            type: 'string',
          },
        },
      },
    },
    agencies: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          admissionDate: {
            $ref: '#/definitions/date',
          },
          membershipRegistrationNumber: {
            type: 'string',
          },
          admittanceType: {
            type: 'string',
          },
        },
      },
    },
    wasImprisoned: {
      type: 'boolean',
    },
    imprisonedExplanation: {
      type: 'string',
    },
    imprisonedDocumentation: {
      type: 'string',
    },
    wasMilitaryConviction: {
      type: 'boolean',
    },
    militaryConvictionExplanation: {
      type: 'string',
    },
    isCurrentlyCharged: {
      type: 'boolean',
    },
    currentlyChargedExplanation: {
      type: 'string',
    },
    currentlyChargedDocumentation: {
      type: 'string',
    },
    wasSuspended: {
      type: 'boolean',
    },
    suspendedExplanation: {
      type: 'string',
    },
    suspendedDocumentation: {
      type: 'string',
    },
    hasWithdrawn: {
      type: 'boolean',
    },
    withdrawnExplanation: {
      type: 'string',
    },
    withdrawnDocumentation: {
      type: 'string',
    },
    wasDisciplined: {
      type: 'boolean',
    },
    disciplinedExplanation: {
      type: 'string',
    },
    disciplinedDocumentation: {
      type: 'string',
    },
    hasResignedRetired: {
      type: 'boolean',
    },
    resignedRetiredExplanation: {
      type: 'string',
    },
    resignedRetiredDocumentation: {
      type: 'string',
    },
    wasAgentAttorney: {
      type: 'boolean',
    },
    agentAttorneyExplanation: {
      type: 'string',
    },
    agentAttorneyDocumentation: {
      type: 'string',
    },
    wasReprimanded: {
      type: 'boolean',
    },
    reprimandedExplanation: {
      type: 'string',
    },
    reprimandedDocumentation: {
      type: 'string',
    },
    hasResignedToAvoidReprimand: {
      type: 'boolean',
    },
    resignedToAvoidReprimandExplanation: {
      type: 'string',
    },
    resignedToAvoidReprimandDocumentation: {
      type: 'string',
    },
    hasAppliedForAccreditation: {
      type: 'boolean',
    },
    appliedForAccreditationExplanation: {
      type: 'string',
    },
    appliedForAccreditationDocumentation: {
      type: 'string',
    },
    wasAccreditationTerminated: {
      type: 'boolean',
    },
    accreditationTerminatedDocumentation: {
      type: 'string',
    },
    accreditationTerminatedExplanation: {
      type: 'string',
    },
    hasImpairments: {
      type: 'boolean',
    },
    impairmentsExplanation: {
      type: 'string',
    },
    impairmentsDocumentation: {
      type: 'string',
    },
    hasPhysicalLimitations: {
      type: 'boolean',
    },
    physicalLimitationsExplanation: {
      type: 'string',
    },
    physicalLimitationsDocumentation: {
      type: 'string',
    },
    characterReferences: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          address: {
            type: 'object',
            properties: {
              addressType: {
                type: 'boolean',
              },
              line1: {
                type: 'string',
              },
              line2: {
                type: 'string',
              },
              city: {
                type: 'string',
              },
              state: {
                type: 'string',
              },
              postalCode: {
                type: 'string',
              },
              country: {
                type: 'string',
                enum: countries.map(x => x.value),
              },
            },
          },
          email: {
            $ref: '#/definitions/email',
          },
          phoneNumber: {
            $ref: '#/definitions/phone',
          },
          relationshipToApplicantType: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    signature: {
      type: 'string',
    },
    gender: {
      type: 'string',
    },
    jurisdictionDocumentation: {
      type: 'string',
    },
    jurisdictionDeclinedToUploadDocuments: {
      type: 'boolean',
    },
    jurisdictionExplan: {
      type: 'string',
    },
    agenciesDocumentation: {
      type: 'string',
    },
    agenciesDeclinedToUploadDocuments: {
      type: 'boolean',
    },
    agenciesExplan: {
      type: 'string',
    },
  },
};

export default schema;

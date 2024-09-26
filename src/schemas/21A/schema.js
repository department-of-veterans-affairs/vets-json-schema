import pick from 'lodash/pick';
import { countries } from '../../common/constants';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply to become a VA-accredited attorney or claims agent',
  type: 'object',
  definitions: pick(definitions, 'country', 'date', 'email', 'files', 'phone'),
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
    financialPlanning: {
      type: 'boolean',
    },
    homeNursingCare: {
      type: 'boolean',
    },
    medicalServices: {
      type: 'boolean',
    },
    consultingService: {
      type: 'boolean',
    },
    advertisingtoVeterans: {
      type: 'boolean',
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
      $ref: '#/definitions/files',
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
      $ref: '#/definitions/files',
    },
    wasSuspended: {
      type: 'boolean',
    },
    suspendedExplanation: {
      type: 'string',
    },
    suspendedDocumentation: {
      $ref: '#/definitions/files',
    },
    hasWithdrawn: {
      type: 'boolean',
    },
    withdrawnExplanation: {
      type: 'string',
    },
    withdrawnDocumentation: {
      $ref: '#/definitions/files',
    },
    wasDisciplined: {
      type: 'boolean',
    },
    disciplinedExplanation: {
      type: 'string',
    },
    disciplinedDocumentation: {
      $ref: '#/definitions/files',
    },
    hasResignedRetired: {
      type: 'boolean',
    },
    resignedRetiredExplanation: {
      type: 'string',
    },
    resignedRetiredDocumentation: {
      $ref: '#/definitions/files',
    },
    wasAgentAttorney: {
      type: 'boolean',
    },
    agentAttorneyExplanation: {
      type: 'string',
    },
    agentAttorneyDocumentation: {
      $ref: '#/definitions/files',
    },
    wasReprimanded: {
      type: 'boolean',
    },
    reprimandedExplanation: {
      type: 'string',
    },
    reprimandedDocumentation: {
      $ref: '#/definitions/files',
    },
    hasResignedToAvoidReprimand: {
      type: 'boolean',
    },
    resignedToAvoidReprimandExplanation: {
      type: 'string',
    },
    resignedToAvoidReprimandDocumentation: {
      $ref: '#/definitions/files',
    },
    hasAppliedForAccreditation: {
      type: 'boolean',
    },
    appliedForAccreditationExplanation: {
      type: 'string',
    },
    appliedForAccreditationDocumentation: {
      $ref: '#/definitions/files',
    },
    wasAccreditationTerminated: {
      type: 'boolean',
    },
    accreditationTerminatedDocumentation: {
      $ref: '#/definitions/files',
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
      $ref: '#/definitions/files',
    },
    hasPhysicalLimitations: {
      type: 'boolean',
    },
    physicalLimitationsExplanation: {
      type: 'string',
    },
    physicalLimitationsDocumentation: {
      $ref: '#/definitions/files',
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
    jurisdictionDocumentation: {
      $ref: '#/definitions/files',
    },
    jurisdictionDeclinedToUploadDocuments: {
      type: 'boolean',
    },
    jurisdictionExplan: {
      type: 'string',
    },
    agenciesDocumentation: {
      $ref: '#/definitions/files',
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

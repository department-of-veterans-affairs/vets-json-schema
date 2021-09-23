import { countries, states } from '../../common/constants';

// filter out military states
const militaryStates = ['AA', 'AE', 'AP'];
const filteredStates = states.USA.filter(state => !militaryStates.includes(state.value));

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply for Certificate of Eligibility (26-1880)',
  type: 'object',
  additionalProperties: false,
  definitions: {
    date: {
      pattern: '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
      type: 'string',
    },
    files: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          size: {
            type: 'integer',
          },
          confirmationCode: {
            type: 'string',
          },
        },
      },
    },
    profileAddress: {
      type: 'object',
      properties: {
        isMilitary: {
          type: 'boolean',
        },
        country: {
          type: 'string',
          enum: countries.filter(country => country.value !== 'USA').map(country => country.value),
          enumNames: countries.filter(country => country.label !== 'United States').map(country => country.label),
        },
        'view:militaryBaseDescription': {
          type: 'object',
          properties: {},
        },
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        street3: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        state: {
          type: 'string',
          enum: filteredStates.map(state => state.value),
          enumNames: filteredStates.map(state => state.label),
        },
        postalCode: {
          type: 'string',
        },
      },
    },
    usAddress: {
      type: 'object',
      additionalProperties: false,
      required: ['street', 'city', 'state', 'postalCode'],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 51,
        },
        state: {
          type: 'string',
          enum: filteredStates.map(state => state.value),
          enumNames: filteredStates.map(state => state.label),
        },
        postalCode: {
          type: 'string',
          pattern: '^(\\d{5})(?:[-](\\d{4}))?$',
        },
      },
    },
    usaPhone: {
      type: 'string',
      pattern: '^\\d{10}$',
    },
    email: {
      type: 'string',
      maxLength: 256,
      format: 'email',
    },
    dateRangeFromRequired: {
      type: 'object',
      properties: {
        from: {
          $ref: '#/definitions/date',
        },
        to: {
          $ref: '#/definitions/date',
        },
      },
      required: ['from'],
    },
  },
  properties: {
    applicantInformation: {
      type: 'object',
      properties: {},
    },
    applicantContactInformation: {
      type: 'object',
      properties: {
        applicantAddress: {
          $ref: '#/definitions/profileAddress',
        },
        phoneNumber: {
          $ref: '#/definitions/usaPhone',
        },
        email: {
          $ref: '#/definitions/email',
        },
      },
    },
    communicationPreferences: {
      type: 'object',
      properties: {
        preferredMethod: {
          type: 'string',
          enum: ['EMAIL', 'PHONE', 'MAIL'],
          enumNames: ['Email', 'Phone', 'U.S. Mail'],
        },
      },
    },
    serviceStatus: {
      type: 'object',
      required: ['identity'],
      properties: {
        identity: {
          type: 'string',
          // Abbreviation keys:
          // ADSM - Active Duty Service Member
          // NADNA - Non Active Duty Never Activated
          // DNANA - Discharged National Guard Never Activated
          // DRNA - Discharged Reserves Never Activaed
          enum: ['VETERAN', 'ADSM', 'NADNA', 'DNANA', 'DRNA'],
          enumNames: [
            'I’m a Veteran',
            'I’m an active-duty service member',
            'I’m a current member of the National Guard or Reserves',
            'I’m a discharged member of the National Guard or Reserves',
          ],
        },
      },
    },
    serviceHistory: {
      type: 'object',
      required: ['servicePeriods'],
      properties: {
        servicePeriods: {
          type: 'array',
          minItems: 1,
          maxItems: 100,
          items: {
            type: 'object',
            title: 'service period',
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
                  'Public Health Service',
                ],
              },
              dateRange: {
                $ref: '#/definitions/dateRangeFromRequired',
              },
            },
          },
        },
      },
    },
    existingLoanSummary: {
      type: 'object',
      properties: {},
    },
    hasExistingLoan: {
      type: 'object',
      required: ['existingLoan'],
      properties: {
        existingLoan: {
          type: 'boolean',
        },
      },
    },
    loanIntent: {
      type: 'object',
      properties: {
        intent: {
          type: 'string',
          enum: ['ONETIMERESTORATION', 'REFI', 'IRRRL', 'INQUIRY'],
          enumNames: [
            'A one-time restoration of entitlement to buy another home',
            'A regular cash-out refinance of a current VA home loan',
            'An Interest Rate Reduction Refinancing Loan (IRRRL) to refinance the balance of a current VA home loan',
            'An entitlement inquiry only',
          ],
        },
      },
    },
    loanHistory: {
      type: 'object',
      properties: {
        loans: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            title: 'Existing VA loan',
            properties: {
              dateRange: {
                $ref: '#/definitions/dateRangeFromRequired',
              },
              address: {
                $ref: '#/definitions/usAddress',
              },
              isCurrentlyOwned: {
                type: 'boolean',
              },
              willRefinance: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
    documentScreener: {
      type: 'object',
      properties: {
        willUploadDocs: {
          type: 'boolean',
        },
      },
    },
    documentUpload: {
      type: 'object',
      properties: {
        fileType: {
          type: 'string',
          enum: [
            'Discharge or separation papers (DD214)',
            'Statement of service',
            'Report of Separation and Record of Service (NGB Form 22)',
            'Retirement Points Statement (NGB Form 23)',
            'Proof of honorable service',
            'Annual retirement points',
          ],
        },
        files: {
          $ref: '#/definitions/files',
        },
      },
    },
  },
};

export default schema;

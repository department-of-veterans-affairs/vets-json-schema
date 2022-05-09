import definitions from './definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply for Certificate of Eligibility (26-1880)',
  type: 'object',
  additionalProperties: true,
  definitions,
  properties: {
    personalInformation: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        dateOfBirth: {
          $ref: '#/definitions/date',
        },
      },
      required: ['dateOfBirth'],
    },
    contactInformation: {
      type: 'object',
      mailingAddress: {
        type: 'object',
        properties: {
          applicantAddress: {
            $ref: '#/definitions/profileAddress',
          },
        },
      },
      additionalInformation: {
        type: 'object',
        properties: {
          contactPhone: {
            $ref: '#/definitions/usaPhone',
          },
          contactEmail: {
            $ref: '#/definitions/email',
          },
        },
        required: ['contactPhone', 'contactEmail'],
      },
    },
    serviceStatus: {
      type: 'object',
      properties: {
        identity: {
          type: 'string',
          // Abbreviation keys:
          // ADSM - Active Duty Service Member
          // NADNA - Non Active Duty Never Activated
          // DNANA - Discharged National Guard Never Activated
          // DRNA - Discharged Reserves Never Activaed
          enum: ['VETERAN', 'ADSM', 'NADNA', 'DNANA', 'DRNA'],
          // enumNames are jsx, so we will handle those in vets-website
        },
      },
      required: ['identity'],
    },
    serviceHistory: {
      type: 'object',
      required: ['periodsOfService'],
      properties: {
        periodsOfService: {
          type: 'array',
          minItems: 1,
          maxItems: 100,
          items: {
            type: 'object',
            title: 'service period',
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
                  'Navy',
                  'Navy Reserve',
                  'Other',
                ],
              },
              dateRange: {
                $ref: '#/definitions/dateRange',
              },
            },
            required: ['serviceBranch', 'dateRange'],
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
      required: ['vaLoanIndicator'],
      properties: {
        vaLoanIndicator: {
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
          // enumNames are jsx, so we will handle those in vets-website
        },
      },
    },
    loanHistory: {
      type: 'object',
      properties: {
        relevantPriorLoans: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              dateRange: {
                $ref: '#/definitions/dateRange',
              },
              propertyAddress: {
                $ref: '#/definitions/loanAddress',
              },
              vaLoanNumber: {
                type: 'number',
              },
              propertyOwned: {
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
            'Closing Disclosure',
            'HUD-1 Settlement Statement',
            'Statement from Loan Servicer',
            'Alta Statement',
            'Other',
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

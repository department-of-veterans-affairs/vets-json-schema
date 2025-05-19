import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(origDefinitions, ['date']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-1919',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: [
    'institutionDetails',
    'statementOfTruthSignature',
    'dateSigned',
  ],
  properties: {
    institutionDetails: {
      type: 'object',
      required: ['certifyingOfficial', 'aboutYourInstitution', 'facilityCode', 'insitutionName', 'address'],
      properties: {
        certifyingOfficial: {
          type: 'object',
          required: ['first', 'last', 'role'],
          properties: {
            first: {
              type: 'string',
              minLength: 1,
              maxLength: 30,
            },
            last: {
              type: 'string',
              minLength: 1,
              maxLength: 30,
            },
            role: {
              type: 'object',
              properties: {
                level: {
                  type: 'string',
                  enum: ['Certifying Official', 'Owner', 'Officer', 'other'],
                },
                other: {
                  type: 'string',
                  minLength: 0,
                  maxLength: 30,
                }
              },
            },
          },
        },
        aboutYourInstitution: {
          type: definitions.yesNoSchema
        },
        facilityCode: {
          type: 'string',
          pattern: '^[a-zA-Z0-9]{8}$',
        },
        institutionName: {
          type: 'string',
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            state: {
              type: 'string',
              pattern: '^[A-Z]{2}$',
            },
            zip: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
          },
        },
      },
    },
    proprietaryProfitSchools: {
      type: 'array',
      items: {
        type: 'object',
        required: ['isProprietaryProfit', 'hasConflictOfInterest', 'first', 'last', 'title', 'association'],
        properties: {
          isProprietaryProfit: definitions.yesNoSchema,
          hasConflictOfInterest: definitions.yesNoSchema,
          first: {
            type: 'string',
            minLength: 1,
            maxLength: 30,
          },
          last: {
            type: 'string',
            minLength: 1,
            maxLength: 30,
          },
          title: {
            type: 'string',
            minLength: 1,
            maxLength: 50
          },
          association: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'They are a VA employee who works with, receives services from, or receives compensation from our institution',
                'They are a SAA employee who works with or receives compensation from our institution'
              ]
            }
          }
        }
      }
    },
    conflictOfInterest: {
      type: 'array',
      items: {
        type: 'object',
        required: ['hasConflictOfInterest', 'certifyingOfficial', 'fileNumber', 'enrollmentPeriod'],
        properties: {
          hasConflictOfInterest: definitions.yesNoSchema,
          certifyingOfficial: {
            type: 'object',
            required: ['first', 'last', 'title'],
            properties: {
              first: {
                type: 'string',
                minLength: 1,
                maxLength: 30,
              },
              last: {
                type: 'string',
                minLength: 1,
                maxLength: 30,
              },
              title: {
                type: 'string',
                minLength: 1,
                maxLength: 50
              },
            },
          },
          fileNumber: {
            type: 'string',
            pattern: definitions.ssn || definitions.centralMailVaFile // syntax ok? add custom regex to cover both if unit test fails
          },
          enrollmentPeriod: definitions.dateRange 
        },
      },
    },
    statementOfTruthSignature: {
      type: 'string',
    },
    dateSigned: definitions.date
  },
};

export default schema;
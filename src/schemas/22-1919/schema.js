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
  required: ['institutionDetails', 'statementOfTruthSignature', 'dateSigned'],
  properties: {
    institutionDetails: {
      type: 'object',
      required: ['certifyingOfficial', 'aboutYourInstitution', 'facilityCode', 'insitutionName', 'address'],
      properties: {
        certifyingOfficial: {
          // TODO:should this be at the same level as institutionDetails, or nested here? In store it's at the top level
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
                },
              },
            },
          },
        },
        // TODO: use clearer name? Or is it sufficient if facitly code is undefined?
        aboutYourInstitution: {
          type: definitions.yesNoSchema,
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
      type: 'object',
      properties: {
        proprietaryProfitDetails: {
          type: object,
          required: ['isProprietaryProfit'],
          properties: {
            isProprietaryProfit: definitions.yesNoSchema,
          },
        },
      },
    },
    conflictingIndividuals: {
      type: 'array',
      items: {
        type: 'object',
        required: ['first', 'last', 'title', 'association'],
        properties: {
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
            maxLength: 50,
          },
          association: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                // TODO:
                // Better to use full text or value showed in store?

                // 'They are a VA employee who works with, receives services from, or receives compensation from our institution',
                'vaEmployee', // value in store

                // 'They are a SAA employee who works with or receives compensation from our institution',
                'saaEmployee', // value in store
              ],
            },
          },
        },
      },
    },
    allProprietarySchools: {
      type: 'array',
      items: {
        type: 'object',
        required: ['allProprietarySchoolsEmployeeInfo', 'fileNumber', 'enrollmentPeriod'],
        properties: {
          hasConflictOfInterest: definitions.yesNoSchema, // TODO: is this needed, even though it's not in the final submission state?
          allProprietarySchoolsEmployeeInfo: {
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
                maxLength: 50,
              },
            },
          },
          fileNumber: {
            type: 'string',
            pattern: definitions.ssn || definitions.centralMailVaFile, // TODO: syntax ok? add custom regex to cover both if unit test fails
          },
          enrollmentPeriod: definitions.dateRange,
        },
      },
    },
    directDeposit: {
      type: 'object',
      required: ['bankAccount'],
      properties: {
        declineDirectDeposit: definitions.yesNoSchema, // TODO: is this needed, even though it's not in the final submission state?
        bankAccount: definitions.bankAccount,
      },
    },
    statementOfTruthSignature: {
      type: 'string',
    },

    dateSigned: definitions.date,
  },
};

export default schema;

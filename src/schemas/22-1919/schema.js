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
    'institutionClassification',
    'hasConflictOfInterest',
    'officialsReceiveBenefits',
    'conflictOfInterestDetails',
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
            },
            last: {
              type: 'string',
            },
            role: {
              type: 'string',
              items: {
                type: 'string',
                enum: ['Certifying Official', 'Owner', 'Officer', 'Other'],
              },
            },
          },
        },
        aboutYourInstitution: {
          type: 'string',
          enum: ['yes', 'no'],
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
        isProprietary: definitions.yesNoSchema,
        isProfit: {
          type: 'boolean',
          enum: [true, false],
        },
      },
    },
  },
};

export default schema;
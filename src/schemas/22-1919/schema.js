import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(origDefinitions, ['date', 'profileAddress', 'vaFileNumber']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-1919',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: [
    'certifyingOfficial',
    'aboutYourInstitution',
    'institutionDetails',
    'isProprietaryProfit',
    'potentialConflictOfInterest',
    'proprietaryProfit',
    'hasConflictOfInterest',
    'statementOfTruthSignature',
    'dateSigned',
  ],
  properties: {
    certifyingOfficial: {
      type: 'object',
      required: ['first', 'last', 'role'],
      properties: {
        first: {
          type: 'string',
          maxLength: 30,
        },
        last: {
          type: 'string',
          maxLength: 30,
        },
        role: {
          type: 'object',
          required: ['level'],
          properties: {
            level: {
              type: 'string',
              enum: ['certifying official', 'owner', 'officer', 'other'],
            },
            other: {
              type: 'string',
              maxLength: 30,
            },
          },
        },
      },
    },
    aboutYourInstitution: definitions.yesNoSchema,
    institutionDetails: {
      type: 'object',
      required: ['facilityCode', 'institutionName', 'institutionAddress'],
      properties: {
        facilityCode: {
          type: 'string',
          pattern: '^[a-zA-Z0-9]{8}$',
        },
        institutionName: {
          type: 'string',
        },
        institutionAddress: {
          $ref: '#/definitions/profileAddress',
        },
      },
    },
    isProprietaryProfit: definitions.yesNoSchema,
    potentialConflictOfInterest: definitions.yesNoSchema,
    proprietaryProfit: {
      type: 'array',
      items: {
        type: 'object',
        required: ['affiliatedIndividuals'],
        properties: {
          affiliatedIndividuals: {
            type: 'object',
            required: ['first', 'last', 'title', 'individualAssociationType'],
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
                maxLength: 30,
              },
              individualAssociationType: {
                type: 'string',
                enum: ['va', 'saa'],
              },
            },
          },
        },
      },
    },
    hasConflictOfInterest: {
      type: 'array',
      items: {
        type: 'object',
        required: ['certifyingOfficial'],
        properties: {
          certifyingOfficial: {
            type: 'object',
            required: ['first', 'last', 'title', 'fileNumber', 'enrollmentPeriod'],
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
                maxLength: 30,
              },
            },
          },
          fileNumber: {
            $ref: '#/definitions/vaFileNumber',
          },
          enrollmentPeriod: definitions.dateRange,
        },
      },
    },
    statementOfTruthSignature: {
      type: 'string',
    },
    dateSigned: {
      $ref: '#/definitions/date',
    },
  },
};

export default schema;

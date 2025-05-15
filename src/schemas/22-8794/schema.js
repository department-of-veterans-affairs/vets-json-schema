import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, ['date']);
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Designation Of Certifying Official(S) (22-8794)',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: ['designatedOfficial', 'institutionDetails', 'statementOfTruthSignature', 'dateSigned'],
  properties: {
    designatedOfficial: {
      type: 'object',
      required: ['first', 'last', 'title', 'phone', 'email'],
      properties: {
        first: {
          type: 'string',
        },
        middle: {
          type: 'string',
        },
        last: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        phone: {
          type: 'string',
          enum: ['usPhone', 'internationalPhone'],
          description: 'Type of phone number',
        },
        usPhone: {
          type: 'string',
          pattern: '^(||d{10}|||+?[0-9])$',
          description: 'Phone number',
        },
        internationalPhone: {
          type: 'string',
          pattern: '^(||d{15}|||+?[0-9])$',
          description: 'Phone number',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email address',
        },
      },
    },
    institutionDetails: {
      type: 'object',
      hasVaFacilityCode: {
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
      required: ['facilityCode', 'hasVaFacilityCode'],
    },
  },
};

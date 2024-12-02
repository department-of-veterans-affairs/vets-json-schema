import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, ['date']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10215 Statement of Assurance of Compliance with 95 Percent Enrollment Ratios (22-10215)',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    institutionDetails: {
      type: 'object',
      required: ['institutionName', 'facilityCode', 'termStartDate', 'dateOfCalculations'],
      properties: {
        institutionName: {
          type: 'string',
        },
        facilityCode: {
          type: 'string',
        },
        termStartDate: {
          $ref: '#/definitions/date',
        },
        dateOfCalculations: {
          $ref: '#/definitions/date',
        },
      },
    },
  },
};

export default schema;

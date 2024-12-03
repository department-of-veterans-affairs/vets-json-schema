import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, ['date']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Report 85/15 Rule enrollment ratios',
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

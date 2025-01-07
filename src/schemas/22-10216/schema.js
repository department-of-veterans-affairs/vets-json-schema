import _, { max } from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, ['date']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10216 5% EXEMPTION REQUEST FROM 85/15 REPORTING REQUIREMENT GENERAL INFORMATION (22-10216)',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    institutionDetails: {
      type: 'object',
      required: ['institutionName', 'facilityCode', 'termStartDate'],
      properties: {
        institutionName: {
          type: 'string',
        },
        facilityCode: {
          type: 'string',
          pattern: '^[a-zA-Z0-9]{8}$',
        },
        termStartDate: {
          $ref: '#/definitions/date',
        },
      },
    },
    studentRatioCalcChapter: {
      type: 'object',
      required: ['beneficiaryStudent', 'numOfStudent', 'dateOfCalculation'],
      properties: {
        beneficiaryStudent: {
          type: 'integer',
        },
        numOfStudent: {
          type: 'integer',
        },
        VaBeneficiaryStudentsPercentage: {
          type: 'number',
        },
        dateOfCalculation: {
          $ref: '#/definitions/date',
        },
      },
    },
  },
};
export default schema;

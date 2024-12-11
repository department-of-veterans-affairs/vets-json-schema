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
  required: ['institutionDetails', 'programs'],
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
    programs: {
      type: 'array',
      items: {
        type: 'object',
        required: ['programName', 'studentsEnrolled', 'supportedStudents'],
        properties: {
          programName: {
            type: 'string',
          },
          studentsEnrolled: {
            type: 'integer',
          },
          supportedStudents: {
            type: 'integer',
          },
          fte: {
            type: 'object',
            properties: {
              supported: {
                type: 'integer',
              },
              nonSupported: {
                type: 'integer',
              },
              totalFTE: {
                type: 'integer',
              },
              supportedPercentageFTE: {
                type: 'number',
              },
            },
          },
        },
      },
    },
  },
};

export default schema;

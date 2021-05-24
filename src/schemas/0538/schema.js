import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DEPENDENCY VERIFICAION (0538)',
  type: 'object',
  additionalProperties: false,
  definitions: pick(definitions, 'date', 'fullName', 'ssn', 'email'),
  properties: {
    updateDiaries: {
      type: 'boolean',
    },
    veteranInformation: {
      fullName: {
        $ref: '#/definitions/fullName',
      },
      ssn: {
        $ref: '#/definitions/ssn',
      },
      dateOfBirth: {
        $ref: '#/definitions/date',
      },
      email: {
        $ref: '#/definitions/email',
      },
    },
  },
};

export default schema;

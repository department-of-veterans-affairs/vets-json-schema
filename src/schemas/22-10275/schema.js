import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
  'address',
  'date',
  'email',
  'fullNameNoSuffix',
  'privacyAgreementAccepted',
  'ssn',
  'usaPhone',
  'yesNoSchema',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10275 PRINCIPLES OF EXCELLENCE FOR EDUCATIONAL INSTITUTIONS',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {},
  required: [],
};

export default schema;

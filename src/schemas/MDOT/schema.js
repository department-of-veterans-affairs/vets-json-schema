import _ from 'lodash';
import schemaHelpers from '../../common/schema-helpers';
import originalDefinitions from '../../common/definitions';
import constants from '../../common/constants';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL DEVICES ORDERING TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    dateOfBirth: {
      type: 'string',
      format: 'date'
    }
  },
  required: ['privacyAgreementAccepted'],
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'fullName'],
  ['address', 'veteranAddress'],
  ['gender'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

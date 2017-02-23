import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' APPLICATION FOR VA EDUCATION BENEFITS",
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {},
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['ssn', 'relativeSocialSecurityNumber'],
  ['gender'],
  ['date', 'relativeDateOfBirth'],
  ['fullName', 'relativeFullName'],
  ['address', 'relativeAddress'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

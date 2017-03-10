import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "APPLICATION FOR VA EDUCATION BENEFITS UNDER THE NATIONAL CALL TO SERVICE (NCS) PROGRAM (22-1990N)",
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['gender'],
  ['date', 'veteranDateOfBirth'],
  ['fullName', 'veteranFullName'],
  ['address', 'veteranAddress'],
  ['phone', 'homePhone'],
  ['phone', 'mobilePhone'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

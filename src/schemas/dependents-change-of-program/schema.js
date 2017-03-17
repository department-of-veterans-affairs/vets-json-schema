import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING (22-5495)",
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'educationType',
    'dateRange'
  ]),
  properties: {
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'relativeFullName'],
  ['ssn', 'relativeSocialSecurityNumber'],
  ['vaFileNumber'],
  ['gender'],
  ['date', 'relativeDateOfBirth'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

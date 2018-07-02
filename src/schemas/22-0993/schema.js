import schemaHelpers from '../../common/schema-helpers';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'REQUEST TO OPT-OUT OF INFORMATION SHARING WITH EDUCATIONAL INSTITUTIONS (VA FORM 22-0993)',
  type: 'object',
  definitions: {},
  additionalProperties: false,
  properties: {},
  anyOf: [
    {
      "required" : ["vaFileNumber"]
    },
    {
      "required" : ["veteranSocialSecurityNumber"]
    }
  ],
  required: ['privacyAgreementAccepted', 'veteranFullName']
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['privacyAgreementAccepted']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

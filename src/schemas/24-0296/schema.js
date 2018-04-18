import schemaHelpers from '../../common/schema-helpers';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DIRECT DEPOSIT ENROLLMENT',
  type: 'object',
  additionalProperties: false,
  definitions: {
  },
  properties: {
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['fullName','veteranFullName'],
  ['ssn','veteranSSN'],
  ['vaFileNumber','veteranVAFileNumber'],
  ['date','veteranDOB'],
  ['fullName','beneficiaryFullName'],
  ['ssn','beneficiarySSN'],
  ['vaFileNumber','beneficiaryVAFileNumber'],
  ['date','beneficiaryDOB'],
  ['bankAccount','institutionAccount'],
  ['address','institutionAddress'],
  ['phone','institutionPhone']
  

].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
import schemaHelpers from '../../common/schema-helpers';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DIRECT DEPOSIT ENROLLMENT',
  type: 'object',
  additionalProperties: false,
  definitions: {
  },
  properties: {
    institutionName: {
      type: 'string',
      maxLength: 30
    },
    benefitType: {
      type: 'string'
    }
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
  ['address','beneficiaryAddress'],
  ['bankAccount','institutionAccount'],
  ['address','institutionAddress'],
  ['phone','institutionPhone']
  

].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
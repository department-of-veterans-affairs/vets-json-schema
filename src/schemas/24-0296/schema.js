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
      maxLength: 100
    },
    beneficiaryAddressIsNew: {
      type: 'boolean'
    },
    benefitType: {
      type: 'string',
      maxLength: 100
    }
  },
  required: ['privacyAgreementAccepted','veteranFullName','veteranSSN','veteranVAFileNumber','veteranDOB',
            'beneficiaryFullName','beneficiarySSN','beneficiaryVAFileNumber','benefitType','beneficiaryAddress','beneficiaryAddressIsNew',
            'institutionName','institutionAccount','institutionAddress','institutionPhone']
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
  ['address','beneficiaryAddress'],
  ['bankAccount','institutionAccount'],
  ['address','institutionAddress'],
  ['phone','institutionPhone']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
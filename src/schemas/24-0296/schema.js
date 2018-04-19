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
  anyOf: [{
      'required' : ['veteranSSN']
    },{
      'required' : ['veteranVAFileNumber']
    }
  ], 
  anyOf: [{
      'required' : ['beneficiarySSN']
    },{
      'required' : ['beneficiaryVAFileNumber']
    }
  ],
  required: [
    'privacyAgreementAccepted',
    'veteranFullName',
    'veteranDOB',
    'benefitType',
    'beneficiaryAddress',
    'beneficiaryAddressIsNew',
    'institutionName',
    'institutionAccount',
    'institutionAddress',
    'institutionPhone',
    'payeePhone'
  ]
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
  ['phone','institutionPhone'],
  ['phone','payeePhone']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
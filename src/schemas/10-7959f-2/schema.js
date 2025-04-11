import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Foreign Medical Program (FMP) Claim Cover Sheet',
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
    sendPayment: {
      type: 'string',
      enum: ['Veteran', 'Provider'],
    },
  },
  required: [
    'privacyAgreementAccepted',
    'veteranFullName',
    'veteranDateOfBirth',
    'veteranSocialSecurityNumber',
    'veteranAddress',
    'sameMailingAddress',
    'physicalAddress',
    'veteranPhoneNumber',
    'veteranEmailAddress',
    'sendPayment',
    'uploadSectionVeteran',
    'uploadSectionProvider',
  ],
};

[
  ['privacyAgreementAccepted'],
  ['name', 'veteranFullName'],
  ['date', 'veteranDateOfBirth'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['address', 'veteranAddress'],
  ['yesNoSchema', 'sameMailingAddress'],
  ['address', 'physicalAddress'],
  ['phone', 'veteranPhoneNumber'],
  ['email', 'veteranEmailAddress'],
  ['files', 'uploadSectionVeteran'],
  ['files', 'uploadSectionProvider'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

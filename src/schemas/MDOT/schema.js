import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const { fullName, address, email, gender, date } = definitions;

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL DEVICES ORDERING TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName,
    address,
    email,
    gender,
    date,
  },
  properties: {},
  required: ['privacyAgreementAccepted', 'fullName', 'address', 'gender', 'email', 'date'],
};

[
  ['privacyAgreementAccepted'],
  ['email'],
  ['fullName', 'veteranFullName'],
  ['address', 'veteranAddress'],
  ['gender'],
  ['date', 'dateOfBirth'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

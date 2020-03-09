import commonDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const { fullName, email, gender, date, address } = commonDefinitions;

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL DEVICES ORDERING TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName,
    email,
    gender,
    date,
    address,
  },
  properties: {},
  required: ['privacyAgreementAccepted', 'veteranFullName', 'veteranAddress', 'gender', 'email', 'dateOfBirth'],
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

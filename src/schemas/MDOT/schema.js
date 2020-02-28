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
  properties: {
    email: {
      $ref: '#/definitions/email',
    },
    dateOfBirth: {
      $ref: '#/definitions/dateOfBirth',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    gender: {
      $ref: '#/definitions/gender',
    },
  },
  required: ['privacyAgreementAccepted', 'fullName', 'address', 'gender', 'email', 'dateOfBirth'],
};

[['privacyAgreementAccepted']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

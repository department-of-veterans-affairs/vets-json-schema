import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR FAMILY MEMBER TO USE TRANSFERRED BENEFITS (22-1990E)',
  type: 'object',
  additionalProperties: true,
  definitions: _.pick(
    definitions,
    'privacyAgreementAccepted',
    'ssn',
    'gender',
    'date',
    'fullName',
    'address',
    'usaPhone',
    'bankAccount',
    'educationType',
    'educationProgram',
    'postHighSchoolTrainings',
    'dateRange',
    'nonMilitaryJobs',
    'preferredContactMethod',
  ),
  anyOf: [
    {
      required: ['vaFileNumber'],
    },
    {
      required: ['veteranSocialSecurityNumber'],
    },
  ],
  properties: {
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
    relativeSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    gender: {
      $ref: '#/definitions/gender',
    },
    relativeDateOfBirth: {
      $ref: '#/definitions/date',
    },
    relativeFullName: {
      $ref: '#/definitions/fullName',
    },
    relativeAddress: {
      $ref: '#/definitions/address',
    },
    mobilePhone: {
      $ref: '#/definitions/usaPhone',
    },
    homePhone: {
      $ref: '#/definitions/usaPhone',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    highSchoolOrGedCompletionDate: {
      $ref: '#/definitions/date',
    },
    benefit: {
      type: 'string',
      enum: ['chapter33', 'chapter30'],
    },
    educationProgram: {
      $ref: '#/definitions/educationProgram',
    },
    educationObjective: {
      type: 'string',
    },
    faaFlightCertificatesInformation: {
      type: 'string',
    },
    postHighSchoolTrainings: {
      $ref: '#/definitions/postHighSchoolTrainings',
    },
    nonMilitaryJobs: {
      $ref: '#/definitions/nonMilitaryJobs',
    },
    nonVaAssistance: {
      type: 'boolean',
    },
    civilianBenefitsAssistance: {
      type: 'boolean',
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    serviceBranch: {
      type: 'string',
    },
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    preferredContactMethod: {
      $ref: '#/definitions/preferredContactMethod',
    },
  },
  required: ['privacyAgreementAccepted', 'relativeFullName'],
};

[['relationship'], ['vaFileNumber']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

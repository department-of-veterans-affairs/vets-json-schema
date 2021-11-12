import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR VRRAP',
  type: 'object',
  additionalProperties: false,
  definitions: {
    address: definitions.address,
    bankAccount: definitions.bankAccount,
    date: definitions.date,
    email: definitions.email,
    fullName: definitions.fullName,
    usaPhone: definitions.usaPhone,
    ssn: definitions.ssn,
    privacyAgreementAccepted: definitions.privacyAgreementAccepted,
    usaStates: definitions.usAddress.properties.state,
  },
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    dateOfBirth: {
      $ref: '#/definitions/date',
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    email: {
      $ref: '#/definitions/email',
    },
    mobilePhone: {
      $ref: '#/definitions/usaPhone',
    },
    alternatePhone: {
      $ref: '#/definitions/usaPhone',
    },
    address: {
      $ref: '#/definitions/address',
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    hasSelectedProgram: {
      type: 'boolean',
    },
    providerName: {
      type: 'string',
    },
    programName: {
      type: 'string',
    },
    programCity: {
      type: 'string',
    },
    programState: {
      type: 'string',
    },
    learningFormat: {
      type: 'string',
      enum: ['inPerson', 'online', 'onlineAndInPerson'],
    },
    vrrapConfirmation: {
      type: 'boolean',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: ['veteranFullName', 'dateOfBirth', 'veteranSocialSecurityNumber', 'email', 'privacyAgreementAccepted'],
};

export default schema;

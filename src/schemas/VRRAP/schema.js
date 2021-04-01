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
    phone: definitions.phone,
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
      $ref: '#/definitions/phone',
    },
    alternatePhone: {
      $ref: '#/definitions/phone',
    },
    address: {
      ...definitions.address,
      properties: {
        ...definitions.address.properties,
        street: {
          ...definitions.address.properties.street,
          ...definitions.rejectOnlyWhitespace,
        },
        street3: definitions.address.properties.street2,
        city: {
          ...definitions.address.properties.city,
          ...definitions.rejectOnlyWhitespace,
        },
      },
    },
    bankAccount: {
      ...definitions.bankAccount,
      properties: {
        ...definitions.bankAccount.properties,
        bankName: {
          type: 'string',
        },
      },
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
  required: [
    'veteranFullName',
    'dateOfBirth',
    'veteranSocialSecurityNumber',
    'address',
    'email',
    'privacyAgreementAccepted',
  ],
};

export default schema;

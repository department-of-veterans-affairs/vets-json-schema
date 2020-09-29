import definitions from '../../common/definitions';
import constants from '../../common/constants';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR STEM (22-10203)',
  type: 'object',
  additionalProperties: false,
  definitions: {
    address: definitions.address,
    bankAccount: definitions.bankAccount,
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
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    benefit: {
      type: 'string',
      enum: ['chapter33', 'chapter30', 'chapter1606', 'transferOfEntitlement', 'chapter32'],
    },
    isEnrolledStem: {
      type: 'boolean',
    },
    isPursuingTeachingCert: {
      type: 'boolean',
    },
    benefitLeft: {
      type: 'string',
      enum: ['moreThanSixMonths', 'sixMonthsOrLess', 'none'],
    },
    degreeName: {
      type: 'string',
    },
    schoolName: {
      type: 'string',
    },
    schoolCity: {
      type: 'string',
    },
    schoolState: {
      type: 'string',
    },
    schoolCountry: {
      type: 'string',
      enum: constants.countries.map((country) => country.value),
    },
    schoolStudentId: {
      type: 'string',
    },
    schoolEmailAddress: {
      $ref: '#/definitions/email',
    },
    isActiveDuty: {
      type: 'boolean',
    },
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    email: {
      $ref: '#/definitions/email',
    },
    homePhone: {
      $ref: '#/definitions/phone',
    },
    mobilePhone: {
      $ref: '#/definitions/phone',
    },
    preferredContactMethod: {
      type: 'string',
      enum: ['mail', 'email', 'homePhone', 'mobilePhone'],
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
    declineDirectDeposit: {
      type: 'boolean',
    },
    scoEmailSent: {
      type: 'boolean',
    },
    receiveTexts: {
      type: 'boolean',
    },
  },
  required: [
    'veteranFullName',
    'veteranSocialSecurityNumber',
    'benefit',
    'isEnrolledStem',
    'benefitLeft',
    'degreeName',
    'schoolName',
    'schoolCity',
    'schoolCountry',
    'isActiveDuty',
    'veteranAddress',
    'email',
    'privacyAgreementAccepted',
  ],
};

export default schema;

import definitions from '../../common/definitions';
import constants from '../../common/constants';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'HEALTH BENEFITS UPDATE FORM (10-10EZR)',
  definitions: {
    date: {
      format: 'date',
      type: 'string',
    },
  },
  type: 'object',
  properties: {
    veteranFullName: definitions.hcaFullName,
    veteranSocialSecurityNumber: definitions.ssn,
    gender: {
      type: 'string',
      enum: constants.genders.map(option => option.value),
    },
    sigiGenders: definitions.sigiGenders,
    veteranDateOfBirth: {
      $ref: '#/definitions/date',
    },
    homePhone: definitions.hcaPhone,
    mobilePhone: definitions.hcaPhone,
    veteranAddress: definitions.hcaAddress,
    veteranHomeAddress: definitions.hcaAddress,
    email: definitions.hcaEmail,
    maritalStatus: definitions.maritalStatus,
    providers: {
      type: 'array',
      items: definitions.insuranceProvider,
    },
    isMedicaidEligible: {
      type: 'boolean',
    },
    isEnrolledMedicarePartA: {
      type: 'boolean',
    },
    medicarePartAEffectiveDate: {
      $ref: '#/definitions/date',
    },
    medicareClaimNumber: {
      type: 'string',
      maxLength: 30,
    },
    spouseFullName: definitions.hcaFullName,
    spouseSocialSecurityNumber: definitions.ssn,
    spouseDateOfBirth: {
      $ref: '#/definitions/date',
    },
    dateOfMarriage: {
      $ref: '#/definitions/date',
    },
    cohabitedLastYear: {
      type: 'boolean',
    },
    provideSupportLastYear: {
      type: 'boolean',
    },
    spouseAddress: definitions.hcaAddress,
    spousePhone: definitions.hcaPhone,
    dependents: definitions.hcaDependents,
    veteranGrossIncome: definitions.hcaMonetaryValue,
    veteranNetIncome: definitions.hcaMonetaryValue,
    veteranOtherIncome: definitions.hcaMonetaryValue,
    spouseGrossIncome: definitions.hcaMonetaryValue,
    spouseNetIncome: definitions.hcaMonetaryValue,
    spouseOtherIncome: definitions.hcaMonetaryValue,
    deductibleMedicalExpenses: definitions.hcaMonetaryValue,
    deductibleFuneralExpenses: definitions.hcaMonetaryValue,
    deductibleEducationExpenses: definitions.hcaMonetaryValue,
    privacyAgreementAccepted: {
      type: 'boolean',
      enum: [true],
    },
    veteranContacts: definitions.hcaVeteranContacts,
  },
  required: [
    'privacyAgreementAccepted',
    'veteranFullName',
    'veteranSocialSecurityNumber',
    'veteranDateOfBirth',
    'gender',
    'veteranAddress',
    'isMedicaidEligible',
  ],
};

schema.properties = { ...schema.properties, ...definitions.teraQuestions };

export default schema;

import _ from 'lodash';
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
    preferredName: { type: 'string' },
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
    isEssentialAcaCoverage: {
      type: 'boolean',
    },
    vaMedicalFacility: definitions.hcaVaMedicalFacility,
    isSpanishHispanicLatino: {
      type: 'boolean',
    },
    isCoveredByHealthInsurance: {
      type: 'boolean',
    },
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
    lastServiceBranch: definitions.hcaLastServiceBranch,
    lastEntryDate: {
      $ref: '#/definitions/date',
    },
    lastDischargeDate: {
      $ref: '#/definitions/date',
    },
    dischargeType: definitions.dischargeType,
    spouseFullName: definitions.hcaFullName,
    spouseSocialSecurityNumber: definitions.ssn,
    spouseDateOfBirth: {
      $ref: '#/definitions/date',
    },
    spouseSigiGenders: definitions.sigiGenders,
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
  },
  required: [
    'privacyAgreementAccepted',
    'veteranFullName',
    'veteranSocialSecurityNumber',
    'veteranDateOfBirth',
    'gender',
    'isSpanishHispanicLatino',
    'veteranAddress',
    'isMedicaidEligible',
    'isEssentialAcaCoverage',
    'vaMedicalFacility',
    'lastServiceBranch',
    'lastEntryDate',
    'lastDischargeDate',
    'dischargeType',
  ],
};

export default schema;

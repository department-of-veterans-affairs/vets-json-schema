import _ from 'lodash';
import definitions from '../../common/definitions';
import constants from '../../common/constants';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'HEALTH BENEFITS UPDATE FORM (10-10EZR)',
  definitions: {
    monetaryValue: definitions.hcaMonetaryValue,
    ssn: definitions.ssn,
    date: {
      format: 'date',
      type: 'string',
    },
    phone: definitions.hcaPhone,
    provider: definitions.insuranceProvider,
    address: definitions.hcaAddress,
  },
  type: 'object',
  properties: {
    veteranFullName: definitions.hcaFullName,
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    preferredName: { type: 'string' },
    gender: {
      type: 'string',
      enum: constants.genders.map(option => option.value),
    },
    sigiGenders: definitions.sigiGenders,
    veteranDateOfBirth: {
      $ref: '#/definitions/date',
    },
    homePhone: {
      $ref: '#/definitions/phone',
    },
    mobilePhone: {
      $ref: '#/definitions/phone',
    },
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    veteranHomeAddress: {
      $ref: '#/definitions/address',
    },
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
      items: {
        $ref: '#/definitions/provider',
      },
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
    spouseSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
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
    spouseAddress: {
      $ref: '#/definitions/address',
    },
    spousePhone: {
      $ref: '#/definitions/phone',
    },
    dependents: definitions.hcaDependents,
    veteranGrossIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    veteranNetIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    veteranOtherIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    spouseGrossIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    spouseNetIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    spouseOtherIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    deductibleMedicalExpenses: {
      $ref: '#/definitions/monetaryValue',
    },
    deductibleFuneralExpenses: {
      $ref: '#/definitions/monetaryValue',
    },
    deductibleEducationExpenses: {
      $ref: '#/definitions/monetaryValue',
    },
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

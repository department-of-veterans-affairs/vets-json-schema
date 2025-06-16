import _ from 'lodash';
import constants from '../../common/constants';
import schemaHelpers from '../../common/schema-helpers';
import definitions from '../../common/definitions';
import { states50AndDC } from '../../common/address';

const stateOfBirth = [...states50AndDC.map(state => state.value), 'Other'];

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR HEALTH BENEFITS (10-10EZ)',
  definitions: {
    date: {
      format: 'date',
      type: 'string',
    },
  },
  type: 'object',
  properties: {
    attachments: (() => {
      const attachments = _.cloneDeep(definitions.files);
      attachments.items.properties.dd214 = { type: 'boolean' };
      return attachments;
    })(),
    veteranFullName: definitions.hcaFullName,
    //  Revisit how to validate that this is either empty or a string between 2 and 35 characters
    mothersMaidenName: {
      type: 'string',
    },
    veteranSocialSecurityNumber: definitions.ssn,
    gender: {
      type: 'string',
      enum: constants.genders.map(option => option.value),
    },
    cityOfBirth: {
      type: 'string',
      minLength: 2,
      maxLength: 20,
    },
    stateOfBirth: {
      type: 'string',
      enum: stateOfBirth,
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date',
    },
    maritalStatus: definitions.maritalStatus,
    vaCompensationType: {
      type: 'string',
      enum: ['lowDisability', 'highDisability', 'none'],
    },
    vaPensionType: {
      type: 'string',
      enum: ['Yes', 'No'],
    },
    isEssentialAcaCoverage: {
      type: 'boolean',
    },
    vaMedicalFacility: {
      type: 'string',
    },
    wantsInitialVaContact: {
      type: 'boolean',
    },
    isSpanishHispanicLatino: {
      type: 'boolean',
    },
    isAmericanIndianOrAlaskanNative: {
      type: 'boolean',
    },
    isBlackOrAfricanAmerican: {
      type: 'boolean',
    },
    isNativeHawaiianOrOtherPacificIslander: {
      type: 'boolean',
    },
    isAsian: {
      type: 'boolean',
    },
    isWhite: {
      type: 'boolean',
    },
    hasDemographicNoAnswer: {
      type: 'boolean',
    },
    veteranAddress: definitions.hcaAddress,
    veteranHomeAddress: definitions.hcaAddress,
    email: definitions.hcaEmail,
    homePhone: definitions.hcaPhone,
    mobilePhone: definitions.hcaPhone,
    discloseFinancialInformation: {
      type: 'boolean',
    },
    spouseFullName: definitions.hcaFullName,
    spouseSocialSecurityNumber: definitions.ssn,
    spouseDateOfBirth: {
      $ref: '#/definitions/date',
    },
    dateOfMarriage: {
      $ref: '#/definitions/date',
    },
    sameAddress: {
      type: 'boolean',
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
    lastServiceBranch: {
      type: 'string',
      enum: constants.branchesServed.map(option => option.value),
    },
    lastEntryDate: {
      $ref: '#/definitions/date',
    },
    lastDischargeDate: {
      $ref: '#/definitions/date',
    },
    dischargeType: definitions.dischargeType,
    purpleHeartRecipient: {
      type: 'boolean',
    },
    isFormerPow: {
      type: 'boolean',
    },
    postNov111998Combat: {
      type: 'boolean',
    },
    disabledInLineOfDuty: {
      type: 'boolean',
    },
    swAsiaCombat: {
      type: 'boolean',
    },
    vietnamService: {
      type: 'boolean',
    },
    exposedToRadiation: {
      type: 'boolean',
    },
    radiumTreatments: {
      type: 'boolean',
    },
    campLejeune: {
      type: 'boolean',
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
    'vaMedicalFacility',
  ],
};

schema.properties = { ...schema.properties, ...definitions.teraQuestions };

[['maritalStatus']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

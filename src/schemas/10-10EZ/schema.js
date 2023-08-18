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
    address: definitions.hcaAddress,
    date: {
      format: 'date',
      type: 'string',
    },
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
          ...definitions.rejectOnlyWhitespace,
        },
        middle: {
          type: 'string',
          maxLength: 30,
        },
        last: {
          type: 'string',
          minLength: 2,
          maxLength: 30,
          ...definitions.rejectOnlyWhitespace,
        },
        suffix: {
          type: 'string',
          enum: constants.suffixes,
        },
      },
      required: ['first', 'last'],
    },
    monetaryValue: definitions.hcaMonetaryValue,
    phone: definitions.hcaPhone,
    provider: {
      type: 'object',
      properties: {
        insuranceName: {
          type: 'string',
          maxLength: 100,
        },
        insurancePolicyHolderName: {
          type: 'string',
          maxLength: 50,
        },
        insurancePolicyNumber: {
          type: 'string',
          maxLength: 30,
          ...definitions.rejectOnlyWhitespace,
        },
        insuranceGroupCode: {
          type: 'string',
          maxLength: 30,
          ...definitions.rejectOnlyWhitespace,
        },
      },
      anyOf: [
        {
          required: ['insurancePolicyNumber'],
        },
        {
          required: ['insuranceGroupCode'],
        },
      ],
    },
    ssn: definitions.ssn,
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
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    gender: {
      type: 'string',
      enum: constants.genders.map(option => option.value),
    },
    sigiGenders: definitions.sigiGenders,
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
    maritalStatus: {
      type: 'string',
      enum: constants.maritalStatuses,
    },
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
      enum: _.flatten(_.values(constants.vaMedicalFacilities)).map(object => object.value),
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
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    veteranHomeAddress: {
      $ref: '#/definitions/address',
    },
    email: {
      type: 'string',
      // regex from client/validations.js' isValidEmail, with some extra escaping
      pattern:
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    },
    homePhone: {
      $ref: '#/definitions/phone',
    },
    mobilePhone: {
      $ref: '#/definitions/phone',
    },
    discloseFinancialInformation: {
      type: 'boolean',
    },
    spouseFullName: definitions.hcaFullName,
    spouseSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
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
    dischargeType: {
      type: 'string',
      enum: constants.dischargeTypes.map(option => option.value),
    },
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
    'isEssentialAcaCoverage',
  ],
};

[['maritalStatus']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

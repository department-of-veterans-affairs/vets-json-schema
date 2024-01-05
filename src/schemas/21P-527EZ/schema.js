import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
definitions.bankAccount.properties.bankName = { type: 'string' };

const financialNumber = {
  type: 'number',
  default: 0,
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR PENSION',
  type: 'object',
  additionalProperties: false,
  anyOf: [
    {
      required: ['vaFileNumber'],
    },
    {
      required: ['veteranSocialSecurityNumber'],
    },
  ],
  definitions: _.merge(_.pick(definitions, 'dateRange', 'bankAccount'), {
    date: {
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      type: 'string',
    },
    incomeSources: {
      type: 'array',
      items: {
        type: 'object',
        required: ['typeOfIncome', 'receiver', 'payer', 'amount'],
        properties: {
          typeOfIncome: {
            type: 'string',
            enum: ['SOCIAL_SECURITY', 'INTEREST_DIVIDEND', 'RETIREMENT', 'PENSION', 'OTHER']
          },
          receiver: {
            type: 'string',
          },
          payer: {
            type: 'string',
          },
          amount: financialNumber,
        },
      },
    },
    careExpenses: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipients', 'childName', 'provider', 'careType', 'paymentFrequency', 'paymentAmount'],
        properties: {
          recipients: {
            type: 'string',
          },
          childName: { type: 'string' },
          provider: { type: 'string' },
          careType: { type: 'string', enum: ['CARE_FACILITY', 'IN_HOME_CARE_PROVIDER'] },
          ratePerHour: { type: 'number' },
          hoursPerWeek: { type: 'number' },
          careDateRange: schemaHelpers.getDefinition('dateRange'),
          noCareEndDate: { type: 'boolean' },
          paymentFrequency: {
            type: 'string',
          },
          paymentAmount: { type: 'number' },
        },
      },
    },
    medicalExpenses: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'recipients',
          'childName',
          'provider',
          'purpose',
          'paymentDate',
          'paymentFrequency',
          'paymentAmount',
        ],
        properties: {
          recipients: { type: 'string' },
          childName: { type: 'string' },
          provider: { type: 'string' },
          purpose: { type: 'string' },
          paymentDate: { $ref: '#/definitions/date' },
          paymentFrequency: { type: 'string' },
          paymentAmount: { type: 'number' },
        },
      },
    },
  }),
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    vaClaimsHistory: {
      type: 'boolean',
    },
    phone: schemaHelpers.getDefinition('usaPhone'),
    internationalPhone: {
      type: 'string',
    },
    serviceBranch: {
      type: 'object',
      properties: {
        ARMY: { type: 'boolean' },
        NAVY: { type: 'boolean' },
        AIR_FORCE: { type: 'boolean' },
        COAST_GUARD: { type: 'boolean' },
        MARINE_CORPS: { type: 'boolean' },
        SPACE_FORCE: { type: 'boolean' },
        USPHS: { type: 'boolean' },
        NOAA: { type: 'boolean' },
      },
    },
    activeServiceDateRange: schemaHelpers.getDefinition('dateRange'),
    serviceNumber: { type: 'string' },
    serveUnderOtherNames: { type: 'boolean' },
    previousNames: {
      type: 'array',
      items: schemaHelpers.getDefinition('fullName'),
    },
    placeOfSeparation: {
      type: 'string',
    },
    noRapidProcessing: {
      type: 'boolean',
    },
    powStatus: { type: 'boolean' },
    powDateRange: schemaHelpers.getDefinition('dateRange'),
    isOver65: { type: 'boolean' },
    socialSecurityDisability: { type: 'boolean' },
    medicalCondition: { type: 'boolean' },
    nursingHome: { type: 'boolean' },
    medicaidCoverage: { type: 'boolean' },
    medicaidStatus: { type: 'boolean' },
    specialMonthlyPension: { type: 'boolean' },
    vaTreatmentHistory: { type: 'boolean' },
    vaMedicalCenters: {
      type: 'array',
      items: {
        type: 'object',
        required: ['medicalCenter'],
        properties: {
          medicalCenter: {
            type: 'string',
          },
        },
      },
    },
    federalTreatmentHistory: {
      type: 'boolean',
    },
    federalMedicalCenters: {
      type: 'array',
      items: {
        type: 'object',
        required: ['medicalCenter'],
        properties: {
          medicalCenter: {
            type: 'string',
          },
        },
      },
    },
    currentEmployment: {
      type: 'boolean',
    },
    currentEmployers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['jobType', 'jobHoursWeek', 'jobTitle'],
        properties: {
          jobType: {
            type: 'string',
          },
          jobHoursWeek: {
            type: 'number',
          },
          jobTitle: {
            type: 'string',
          },
        },
      },
    },
    previousEmployers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['jobType', 'jobHoursWeek', 'jobTitle'],
        properties: {
          jobDate: {
            $ref: '#/definitions/date',
          },
          jobType: {
            type: 'string',
          },
          jobHoursWeek: {
            type: 'number',
          },
          jobTitle: {
            type: 'string',
          },
        },
      },
    },
    marriages: {
      type: 'number',
    },
    marriageHistory: {
      $ref: '#/definitions/marriages',
    },
    spouseDateOfBirth: {
      $ref: '#/definitions/date',
    },
    spouseSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    spouseIsVeteran: {
      type: 'boolean',
    },
    spouseVaFileNumber: {
      $ref: '#/definitions/centralMailVaFile',
    },
    liveWithSpouse: {
      type: 'boolean',
    },
    reasonForCurrentSeparation: {
      type: 'string',
    },
    reasonForNotLivingWithSpouse: {
      type: 'string',
    },
    spouseAddress: {
      $ref: '#/definitions/address',
    },
    currentSpouseMonthlySupport: {
      type: 'number',
    },
    currentSpouseMaritalHistory: {
      type: 'string',
      enum: ['Yes', 'No', 'I’m not sure'],
    },
    spouseMarriages: {
      $ref: '#/definitions/marriages',
    },
    dependents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: schemaHelpers.getDefinition('fullName'),
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childInHousehold: {
            type: 'boolean',
          },
          childAddress: schemaHelpers.getDefinition('address'),
          personWhoLivesWithChild: schemaHelpers.getDefinition('fullName'),
          monthlyPayment: {
            type: 'number',
          },
          childPlaceOfBirth: {
            type: 'string',
          },
          childSocialSecurityNumber: schemaHelpers.getDefinition('ssn'),
          childRelationship: {
            type: 'string',
            enum: ['biological', 'adopted', 'stepchild'],
          },
          attendingCollege: {
            type: 'boolean',
          },
          disabled: {
            type: 'boolean',
          },
          married: {
            type: 'boolean',
          },
          previouslyMarried: {
            type: 'boolean',
          },
        },
      },
    },
    totalNetWorth: {
      type: 'boolean',
    },
    netWorthEstimation: {
      type: 'number',
    },
    transferredAssets: {
      type: 'boolean',
    },
    homeOwnership: {
      type: 'boolean',
    },
    homeAcreageMoreThanTwo: {
      type: 'boolean',
    },
    homeAcreageValue: {
      type: 'number',
    },
    landMarketable: {
      type: 'boolean',
    },
    receivesIncome: {
      type: 'boolean',
    },
    incomeSources: {
      $ref: '#/definitions/incomeSources',
    },
    hasCareExpenses: {
      type: 'boolean',
    },
    careExpenses: {
      $ref: '#/definitions/careExpenses',
    },
    hasMedicalExpenses: {
      type: 'boolean',
    },
    medicalExpenses: {
      $ref: '#/definitions/medicalExpenses',
    },
  },
  required: ['privacyAgreementAccepted', 'veteranFullName', 'veteranAddress'],
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['centralMailVaFile', 'vaFileNumber'],
  ['centralMailAddress', 'veteranAddress'],
  ['usaPhone', 'dayPhone'],
  ['usaPhone', 'nightPhone'],
  ['usaPhone', 'mobilePhone'],
  ['maritalStatus'],
  ['dateRange', 'powDateRange'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'spouseDateOfBirth'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['centralMailVaFile', 'spouseVaFileNumber'],
  ['address', 'spouseAddress'],
  ['marriages'],
  ['marriages', 'spouseMarriages'],
  ['netWorth'],
  ['monthlyIncome'],
  ['expectedIncome'],
  ['otherExpenses'],
  ['netWorth', 'spouseNetWorth'],
  ['monthlyIncome', 'spouseMonthlyIncome'],
  ['expectedIncome', 'spouseExpectedIncome'],
  ['otherExpenses', 'spouseOtherExpenses'],
  ['bankAccount'],
  ['files'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

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
            enum: ['SOCIAL_SECURITY', 'INTEREST_DIVIDEND', 'RETIREMENT', 'PENSION', 'OTHER'],
          },
          otherTypeExplanation: {
            type: 'string',
          },
          receiver: {
            type: 'string',
          },
          childName: {
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
        required: ['recipients', 'provider', 'careType', 'paymentFrequency', 'paymentAmount'],
        properties: {
          recipients: {
            type: 'string',
            enum: ['VETERAN', 'SPOUSE', 'CHILD'],
          },
          childName: { type: 'string' },
          provider: { type: 'string' },
          careType: { type: 'string', enum: ['CARE_FACILITY', 'IN_HOME_CARE_PROVIDER'] },
          ratePerHour: { type: 'number' },
          hoursPerWeek: { type: 'number' },
          careDateRange: schemaHelpers.getDefinition('dateRange'),
          noCareEndDate: { type: 'boolean' },
          paymentFrequency: { type: 'string', enum: ['ONCE_MONTH', 'ONCE_YEAR'] },
          paymentAmount: { type: 'number' },
        },
      },
    },
    medicalExpenses: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipients', 'provider', 'purpose', 'paymentDate', 'paymentFrequency', 'paymentAmount'],
        properties: {
          recipients: {
            type: 'string',
            enum: ['VETERAN', 'SPOUSE', 'CHILD'],
          },
          childName: { type: 'string' },
          provider: { type: 'string' },
          purpose: { type: 'string' },
          paymentDate: { $ref: '#/definitions/date' },
          paymentFrequency: { type: 'string', enum: ['ONCE_MONTH', 'ONCE_YEAR', 'ONE_TIME'] },
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
    internationalPhone: {
      type: 'string',
    },
    serviceBranch: {
      type: 'object',
      properties: {
        army: { type: 'boolean' },
        navy: { type: 'boolean' },
        airForce: { type: 'boolean' },
        coastGuard: { type: 'boolean' },
        marineCorps: { type: 'boolean' },
        spaceForce: { type: 'boolean' },
        usphs: { type: 'boolean' },
        noaa: { type: 'boolean' },
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
    marriageHistory: {
      $ref: '#/definitions/marriages',
    },
    spouseIsVeteran: {
      type: 'boolean',
    },
    liveWithSpouse: {
      type: 'boolean',
    },
    reasonForCurrentSeparation: {
      type: 'string',
    },
    otherExplanation: {
      type: 'string',
    },
    reasonForNotLivingWithSpouse: {
      type: 'string',
    },
    currentSpouseMonthlySupport: {
      type: 'number',
    },
    currentSpouseMaritalHistory: {
      type: 'string',
      enum: ['Yes', 'No', 'I’m not sure'],
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
    statementOfTruthCertified: {
      type: 'boolean',
    },
    statementOfTruthSignature: {
      type: 'string',
    },
  },
  required: ['veteranFullName', 'veteranAddress'],
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['centralMailVaFile', 'vaFileNumber'],
  ['centralMailAddress', 'veteranAddress'],
  ['usaPhone', 'phone'],
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
  ['bankAccount'],
  ['files'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

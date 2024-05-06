import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
definitions.bankAccount.properties.bankName = { type: 'string' };

definitions.noSuffixMarriages = _.cloneDeep(definitions.marriages);
definitions.noSuffixMarriages.items.properties.spouseFullName = schemaHelpers.getDefinition('fullNameNoSuffix');

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
  definitions: _.merge(_.pick(definitions, 'dateRange', 'bankAccount', 'noSuffixMarriages', 'fullNameNoSuffix'), {
    date: {
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      type: 'string',
    },
    maritalStatus: {
      type: 'string',
      enum: ['MARRIED', 'NEVER_MARRIED', 'SEPARATED', 'WIDOWED', 'DIVORCED'],
    },
    incomeSources: {
      type: 'array',
      items: {
        type: 'object',
        required: ['typeOfIncome', 'receiver', 'payer', 'amount'],
        properties: {
          typeOfIncome: {
            type: 'string',
            enum: ['SOCIAL_SECURITY', 'INTEREST_DIVIDEND', 'CIVIL_SERVICE', 'PENSION_RETIREMENT', 'OTHER'],
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
            enum: ['VETERAN', 'SPOUSE', 'DEPENDENT'],
          },
          childName: { type: 'string' },
          provider: { type: 'string' },
          careType: { type: 'string', enum: ['CARE_FACILITY', 'IN_HOME_CARE_PROVIDER'] },
          ratePerHour: { type: 'number' },
          hoursPerWeek: { type: 'string' },
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
            enum: ['VETERAN', 'SPOUSE', 'DEPENDENT'],
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
    vaClaimsHistory: definitions.yesNoSchema,
    internationalPhone: {
      type: 'string',
    },
    /*
    How do we incorporate the following code?
    ```js
      checkboxGroupSchema(Object.keys(serviceBranchLabels))
    ```
    */
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
    serveUnderOtherNames: definitions.yesNoSchema,
    previousNames: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          previousFullName: schemaHelpers.getDefinition('fullName'),
        },
      },
    },
    placeOfSeparation: {
      type: 'string',
    },
    noRapidProcessing: {
      type: 'boolean',
    },
    powStatus: definitions.yesNoSchema,
    isOver65: definitions.yesNoSchema,
    socialSecurityDisability: definitions.yesNoSchema,
    medicalCondition: definitions.yesNoSchema,
    nursingHome: definitions.yesNoSchema,
    medicaidCoverage: definitions.yesNoSchema,
    medicaidStatus: definitions.yesNoSchema,
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
    federalTreatmentHistory: definitions.yesNoSchema,
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
    currentEmployment: definitions.yesNoSchema,
    currentEmployers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['jobType', 'jobHoursWeek'],
        properties: {
          jobType: {
            type: 'string',
          },
          jobHoursWeek: {
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
            type: 'string',
          },
          jobTitle: {
            type: 'string',
          },
        },
      },
    },
    maritalStatus: {
      $ref: '#/definitions/maritalStatus',
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
      enum: ['YES', 'NO', 'IDK'],
    },
    dependents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: schemaHelpers.getDefinition('fullNameNoSuffix'),
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
          /*
            Where will the childRelationshipOptions live? Do we add the helper functions to this project?
            ```js
            radioSchema(
              Object.keys(childRelationshipOptions),
            )
            ```
           */
          childRelationship: {
            type: 'string',
            enum: ['BIOLOGICAL', 'ADOPTED', 'STEP_CHILD'],
          },
          attendingCollege: definitions.yesNoSchema,
          disabled: definitions.yesNoSchema,
          previouslyMarried: definitions.yesNoSchema,
          married: definitions.yesNoSchema,
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
  required: ['veteranFullName', 'veteranAddress', 'statementOfTruthCertified', 'statementOfTruthSignature'],
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['centralMailVaFile', 'vaFileNumber'],
  ['centralMailAddress', 'veteranAddress'],
  ['usaPhone', 'dayPhone'],
  ['usaPhone', 'nightPhone'],
  ['usaPhone', 'phone'],
  ['usaPhone', 'mobilePhone'],
  ['dateRange', 'powDateRange'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'spouseDateOfBirth'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['centralMailVaFile', 'spouseVaFileNumber'],
  ['address', 'spouseAddress'],
  ['noSuffixMarriages', 'marriages'],
  ['marriages', 'spouseMarriages'],
  ['bankAccount'],
  ['files'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

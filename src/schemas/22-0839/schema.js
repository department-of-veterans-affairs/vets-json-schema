import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(origDefinitions, [
  'date',
  'fullNameNoSuffix',
  'dateRange',
  'phone',
  'yesNoSchema',
  'email',
  'profileAddress',
]);

// Clone profileAddress, but make "country" a free-text string (no enum) for foreign addresses
const profileAddressForeign = _.cloneDeep(pickedDefinitions.profileAddress || {});
if (profileAddressForeign?.properties?.country) {
  profileAddressForeign.properties.country = {
    type: 'string',
    minLength: 2,
    maxLength: 100,
    pattern: '^(?!\\s*$).+', // not just whitespace
  };
  delete profileAddressForeign.properties.country.enum;
  delete profileAddressForeign.properties.country.enumNames;
}

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-0839',
  type: 'object',
  additionalProperties: false,
  definitions: {
    ...pickedDefinitions,
    profileAddressForeign,
  },
  required: ['authorizedOfficial', 'agreementType', 'statementOfTruthSignature', 'dateSigned', 'isAuthenticated'],
  properties: {
    authorizedOfficial: {
      type: 'object',
      required: ['fullName', 'title', 'phoneNumber'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        phoneNumber: {
          $ref: '#/definitions/phone',
        },
      },
    },
    agreementType: {
      type: 'string',
      enum: ['startNewOpenEndedAgreement', 'modifyExistingAgreement', 'withdrawFromYellowRibbonProgram'],
    },
    withdrawFromYellowRibbonProgram: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['facilityCode', 'institutionName', 'isForeignCountry', 'institutionAddress'],
        properties: {
          facilityCode: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]{8}$',
          },
          institutionName: {
            type: 'string',
          },
          isForeignCountry: { $ref: '#/definitions/yesNoSchema' },
          // Declare as object; the exact schema enforced via allOf below
          institutionAddress: { type: 'object' },
        },
        allOf: [
          {
            anyOf: [
              // Foreign → profileAddressForeign
              {
                type: 'object',
                required: ['isForeignCountry'],
                properties: {
                  isForeignCountry: { enum: [true] },
                  institutionAddress: { $ref: '#/definitions/profileAddressForeign' },
                },
              },
              // Domestic → profileAddress
              {
                type: 'object',
                required: ['isForeignCountry'],
                properties: {
                  isForeignCountry: { enum: [false] },
                  institutionAddress: { $ref: '#/definitions/profileAddress' },
                },
              },
            ],
          },
        ],
      },
    },
    yellowRibbonProgramTerms: {
      type: 'object',
      required: [
        'firstAcknowledgement',
        'secondAcknowledgement',
        'thirdAcknowledgement',
        'fourthAcknowledgement',
        'agreeToProvideYellowRibbonProgramContributions',
      ],
      properties: {
        firstAcknowledgement: {
          type: 'string',
          minLength: 2,
          maxLength: 3,
        },
        secondAcknowledgement: {
          type: 'string',
          minLength: 2,
          maxLength: 3,
        },
        thirdAcknowledgement: {
          type: 'string',
          minLength: 2,
          maxLength: 3,
        },
        fourthAcknowledgement: {
          type: 'string',
          minLength: 2,
          maxLength: 3,
        },

        agreeToProvideYellowRibbonProgramContributions: { type: 'boolean' },
      },
    },
    institutionDetails: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['facilityCode', 'isForeignCountry', 'institutionName', 'institutionAddress'],
        properties: {
          isForeignCountry: { $ref: '#/definitions/yesNoSchema' },
          facilityCode: {
            type: 'string',
            pattern: '^[A-Za-z0-9]{8}$',
          },
          institutionName: {
            type: 'string',
          },
          // Declare as object; branch schema applied in allOf
          institutionAddress: { type: 'object' },
        },
        allOf: [
          {
            anyOf: [
              // Foreign → profileAddressForeign
              {
                type: 'object',
                required: ['isForeignCountry'],
                properties: {
                  isForeignCountry: { enum: [true] },
                  institutionAddress: { $ref: '#/definitions/profileAddressForeign' },
                },
              },
              // Domestic → profileAddress
              {
                type: 'object',
                required: ['isForeignCountry'],
                properties: {
                  isForeignCountry: { enum: [false] },
                  institutionAddress: { $ref: '#/definitions/profileAddress' },
                },
              },
            ],
          },
        ],
      },
    },
    yellowRibbonProgramAgreementRequest: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'eligibleIndividuals',
          'yearRange',
          'maximumNumberofStudents',
          'degreeLevel',
          'currencyType',
          'maximumContributionAmount',
        ],
        properties: {
          eligibleIndividuals: { type: 'integer', minimum: 0, maximum: 1000000 },
          yearRange: {
            $ref: '#/definitions/dateRange',
          },
          maximumNumberofStudents: { type: 'integer', minimum: 0, maximum: 1000000 },
          degreeLevel: {
            type: 'string',
            enum: ['undergraduate', 'graduate', 'doctoral', 'all'],
          },
          degreeProgram: {
            type: 'string',
          },
          currencyType: {
            type: 'string',
          },
          maximumContributionAmount: {
            type: 'number',
            minimum: 0,
            maximum: 99999,
          },
        },
      },
    },
    pointOfContact: {
      type: 'object',
      required: ['fullName', 'phoneNumber', 'emailAddress', 'role'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        phoneNumber: {
          $ref: '#/definitions/phone',
        },
        emailAddress: definitions.email,
        role: {
          type: 'string',
          enum: ['YellowRibbonProgramPOC', 'schoolFinancialRepresentative', 'schoolCertifyingOfficial'],
        },
      },
    },
    pointOfContactTwo: {
      type: 'object',
      required: ['fullName', 'phoneNumber', 'emailAddress', 'role'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        phoneNumber: {
          $ref: '#/definitions/phone',
        },
        emailAddress: definitions.email,
        role: {
          type: 'string',
          enum: ['YellowRibbonProgramPOC', 'schoolFinancialRepresentative', 'schoolCertifyingOfficial'],
        },
      },
    },
    statementOfTruthSignature: { type: 'string', minLength: 1 },
    dateSigned: {
      $ref: '#/definitions/date',
    },
    isAuthenticated: {
      type: 'boolean',
    },
  },
  allOf: [
    {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            agreementType: { enum: ['withdrawFromYellowRibbonProgram'] },
          },
          required: ['agreementType', 'withdrawFromYellowRibbonProgram'],
        },
        {
          type: 'object',
          properties: {
            agreementType: { enum: ['startNewOpenEndedAgreement', 'modifyExistingAgreement'] },
          },
          required: [
            'agreementType',
            'yellowRibbonProgramTerms',
            'institutionDetails',
            'yellowRibbonProgramAgreementRequest',
            'pointOfContact',
          ],
          not: { required: ['withdrawFromYellowRibbonProgram'] },
        },
      ],
    },
  ],
};
export default schema;

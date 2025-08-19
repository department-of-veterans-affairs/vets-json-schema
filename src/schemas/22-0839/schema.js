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

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-0839',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: ['authorizedOfficial', 'agreementType', 'statementOfTruthSignature', 'dateSigned'],
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
        required: ['facilityCode', 'institutionName', 'institutionAddress'],
        properties: {
          facilityCode: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]{8}$',
          },
          institutionName: {
            type: 'string',
          },
          institutionAddress: {
            $ref: '#/definitions/profileAddress',
          },
        },
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
        required: ['facilityCode', 'institutionName', 'institutionAddress'],
        properties: {
          facilityCode: {
            type: 'string',
            pattern: '^(?!..[Xx])[A-Za-z0-9]{8}$',
          },
          institutionName: {
            type: 'string',
          },
          institutionAddress: {
            $ref: '#/definitions/profileAddress',
          },
        },
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
          //default: 'USD'
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

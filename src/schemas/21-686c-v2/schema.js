import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import commonDefinitions from '../../common/definitions';

let definitions = cloneDeep(commonDefinitions);
definitions = pick(
  definitions,
  'address',
  'email',
  'files',
  'fullNameNoSuffix',
  'phone',
  'privacyAgreementAccepted',
  'ssn',
  'ssnLastFour',
  'veteranServiceNumber',
);

export const schema686c = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DEPENDENTS MANAGEMENT FORM (21-686C)',
  type: 'object',
  definitions: merge(definitions, {
    date: {
      type: 'string',
      pattern: '^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$',
    },
    genericLocation: {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            outsideUsa: { type: 'boolean', enum: [false] },
            location: {
              type: 'object',
              properties: { city: { type: 'string' }, state: { type: 'string' } },
              required: ['city', 'state'],
            },
          },
          required: ['location'],
        },
        {
          type: 'object',
          properties: {
            outsideUsa: { type: 'boolean', enum: [true] },
            location: {
              type: 'object',
              properties: { city: { type: 'string' }, country: { type: 'string' } },
              required: ['city', 'country'],
            },
          },
          required: ['location'],
        },
      ],
    },
    genericLocationAlt: {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            outsideUsa: { type: 'boolean', enum: [false] },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                state: { type: 'string' },
                postalCode: { type: 'string', pattern: '^\\d{5}$' },
              },
              required: ['city', 'state', 'postalCode'],
            },
          },
          required: ['location'],
        },
        {
          type: 'object',
          properties: {
            outsideUsa: { type: 'boolean', enum: [true] },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                country: { type: 'string' },
                postalCode: { type: 'string' },
              },
              required: ['city', 'country'],
            },
          },
          required: ['location'],
        },
      ],
    },
  }),
  properties: {
    veteranInformation: {
      type: 'object',
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        birthDate: { $ref: '#/definitions/date' },
        ssnLastFour: { $ref: '#/definitions/ssnLastFour' },
        vaFileLastFour: { type: 'string', pattern: '^\\d{4}$' },
      },
    },

    statementOfTruthSignature: { type: 'string' },
    statementOfTruthCertified: { type: 'boolean' },

    veteranContactInformation: {
      type: 'object',
      properties: {
        veteranAddress: { $ref: '#/definitions/address' },
        phoneNumber: { $ref: '#/definitions/phone' },
        emailAddress: { $ref: '#/definitions/email' },
      },
      required: ['veteranAddress', 'phoneNumber', 'emailAddress'],
    },

    householdIncome: { type: 'boolean' },

    spouseInformation: {
      type: 'object',
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        ssn: { $ref: '#/definitions/ssn' },
        birthDate: { $ref: '#/definitions/date' },
        isVeteran: { type: 'boolean' },
        vaFileNumber: { type: 'string' },
        serviceNumber: { $ref: '#/definitions/veteranServiceNumber' },
      },
      required: ['fullName', 'ssn', 'birthDate', 'isVeteran'],
    },

    currentMarriageInformation: {
      type: 'object',
      oneOf: [
        {
          allOf: [
            { $ref: '#/definitions/genericLocation' },
            {
              type: 'object',
              properties: {
                typeOfMarriage: { not: { type: 'string', enum: ['OTHER'] } },
                date: { $ref: '#/definitions/date' },
              },
              required: ['typeOfMarriage', 'location', 'date'],
            },
          ],
        },
        {
          allOf: [
            { $ref: '#/definitions/genericLocation' },
            {
              type: 'object',
              properties: {
                typeOfMarriage: { type: 'string', enum: ['OTHER'] },
                typeOther: { type: 'string' },
                date: { $ref: '#/definitions/date' },
              },
              required: ['typeOfMarriage', 'typeOther', 'location', 'date'],
            },
          ],
        },
      ],
    },

    doesLiveWithSpouse: {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            spouseDoesLiveWithVeteran: { type: 'boolean', enum: [true] },
            spouseIncome: { type: 'string' },
          },
          required: ['spouseDoesLiveWithVeteran'],
        },
        {
          type: 'object',
          properties: {
            spouseDoesLiveWithVeteran: { type: 'boolean', enum: [false] },
            spouseIncome: { type: 'string' },
            address: { $ref: '#/definitions/address' },
            currentSpouseReasonForSeparation: { type: 'string' },
            other: { type: 'string' },
          },
          required: ['spouseDoesLiveWithVeteran', 'currentSpouseReasonForSeparation', 'address'],
        },
      ],
    },

    spouseMarriageHistory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          reasonMarriageEnded: { type: 'string' },
          otherReasonMarriageEnded: { type: 'string' },
          startDate: { $ref: '#/definitions/date' },
          endDate: { $ref: '#/definitions/date' },
          startLocation: { $ref: '#/definitions/genericLocation' },
          endLocation: { $ref: '#/definitions/genericLocation' },
        },
        required: ['startLocation', 'endLocation', 'endDate', 'startDate', 'reasonMarriageEnded', 'fullName'],
        oneOf: [
          {
            type: 'object',
            properties: { reasonMarriageEnded: { type: 'string', enum: ['Other'] } },
            required: ['reasonMarriageEnded', 'otherReasonMarriageEnded'],
          },
          {
            type: 'object',
            properties: { reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] } },
            required: ['reasonMarriageEnded'],
          },
        ],
      },
    },

    veteranMarriageHistory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          reasonMarriageEnded: { type: 'string' },
          otherReasonMarriageEnded: { type: 'string' },
          startDate: { $ref: '#/definitions/date' },
          endDate: { $ref: '#/definitions/date' },
          startLocation: { $ref: '#/definitions/genericLocation' },
          endLocation: { $ref: '#/definitions/genericLocation' },
        },
        required: ['endLocation', 'startLocation', 'endDate', 'startDate', 'reasonMarriageEnded', 'fullName'],
        oneOf: [
          {
            type: 'object',
            properties: { reasonMarriageEnded: { type: 'string', enum: ['Other'] } },
            required: ['reasonMarriageEnded', 'otherReasonMarriageEnded'],
          },
          {
            type: 'object',
            properties: { reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] } },
            required: ['reasonMarriageEnded'],
          },
        ],
      },
    },

    reportDivorce: {
      type: 'object',
      properties: {
        spouseIncome: { type: 'string' },
        date: { $ref: '#/definitions/date' },
        divorceLocation: { $ref: '#/definitions/genericLocation' },
        reasonMarriageEnded: { type: 'string' },
        explanationOfOther: { type: 'string' },
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        birthDate: { $ref: '#/definitions/date' },
      },
      required: ['date', 'divorceLocation', 'reasonMarriageEnded', 'fullName', 'birthDate'],
      oneOf: [
        {
          type: 'object',
          properties: { reasonMarriageEnded: { type: 'string', enum: ['Other'] } },
          required: ['reasonMarriageEnded', 'explanationOfOther'],
        },
        {
          type: 'object',
          properties: { reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] } },
          required: ['reasonMarriageEnded'],
        },
      ],
    },

    childrenToAdd: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          birthDate: { $ref: '#/definitions/date' },
          ssn: { $ref: '#/definitions/ssn' },
          birthLocation: { $ref: '#/definitions/genericLocationAlt' },
          isBiologicalChild: {
            type: 'boolean',
            oneOf: [
              { type: 'boolean', enum: [true], required: ['relationshipToChild'] },
              { type: 'boolean', enum: [false] },
            ],
          },
          relationshipToChild: {
            type: 'object',
            properties: { adopted: { type: 'boolean' }, stepchild: { type: 'boolean' } },
          },
          isBiologicalChildOfSpouse: { type: 'boolean' },
          dateEnteredHousehold: { $ref: '#/definitions/date' },
          biologicalParentName: { $ref: '#/definitions/fullNameNoSuffix' },
          biologicalParentSsn: { $ref: '#/definitions/ssn' },
          biologicalParentDob: { $ref: '#/definitions/date' },
          doesChildHaveDisability: {
            oneOf: [
              { type: 'boolean', enum: [true], required: ['doesChildHavePermanentDisability'] },
              { type: 'boolean', enum: [false] },
            ],
          },
          doesChildHavePermanentDisability: { type: 'boolean' },
          doesChildLiveWithYou: {
            type: 'boolean',
            oneOf: [
              { type: 'boolean', enum: [false], required: ['livingWith'] },
              { type: 'boolean', enum: [true] },
            ],
          },
          hasChildEverBeenMarried: {
            type: 'boolean',
            oneOf: [
              { type: 'boolean', enum: [true], required: ['marriageEndDate', 'marriageEndReason'] },
              { type: 'boolean', enum: [false] },
            ],
          },
          marriageEndDate: { $ref: '#/definitions/date' },
          marriageEndReason: {
            type: 'string',
            oneOf: [
              { type: 'string', enum: ['Other'], required: ['marriageEndDescription'] },
              { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
            ],
          },
          marriageEndDescription: { type: 'string' },
          incomeInLastYear: { type: 'string' },
          address: { $ref: '#/definitions/address' },
          livingWith: {
            type: 'object',
            required: ['first', 'last'],
            properties: { first: { type: 'string' }, middle: { type: 'string' }, last: { type: 'string' } },
          },
        },
        required: [
          'doesChildLiveWithYou',
          'hasChildEverBeenMarried',
          'doesChildHaveDisability',
          'isBiologicalChildOfSpouse',
          'dateEnteredHousehold',
          'biologicalParentName',
          'biologicalParentSsn',
          'biologicalParentDob',
          'isBiologicalChild',
          'birthLocation',
          'ssn',
          'fullName',
          'birthDate',
        ],
      },
    },

    stepChildren: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          whoDoesTheStepchildLiveWith: {
            type: 'object',
            properties: { first: { type: 'string' }, last: { type: 'string' } },
            required: ['first', 'last'],
          },
          address: { $ref: '#/definitions/address' },
          livingExpensesPaid: { type: 'string' },
          supportingStepchild: { type: 'boolean' },
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: { $ref: '#/definitions/date' },
        },
        required: ['whoDoesTheStepchildLiveWith', 'address', 'supportingStepchild', 'fullName', 'ssn', 'birthDate'],
        oneOf: [
          {
            type: 'object',
            properties: { supportingStepchild: { type: 'boolean', enum: [true] } },
            required: ['supportingStepchild', 'livingExpensesPaid'],
          },
          {
            type: 'object',
            properties: { supportingStepchild: { type: 'boolean', enum: [false] } },
            required: ['supportingStepchild'],
          },
        ],
      },
    },

    deaths: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentDeathLocation: { $ref: '#/definitions/genericLocation' },
          deceasedDependentIncome: { type: 'string' },
          dependentDeathDate: { $ref: '#/definitions/date' },
          dependentType: { type: 'string' },
          childStatus: {
            type: 'object',
            properties: { childUnder18: { type: 'boolean' }, stepChild: { type: 'boolean' } },
          },
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: { $ref: '#/definitions/date' },
        },
        required: ['dependentDeathLocation', 'dependentDeathDate', 'dependentType', 'fullName', 'ssn', 'birthDate'],
        oneOf: [
          { type: 'object', properties: { dependentType: { type: 'string', enum: ['CHILD'] } }, required: ['dependentType', 'childStatus'] },
          { type: 'object', properties: { dependentType: { type: 'string', enum: ['SPOUSE', 'DEPENDENT_PARENT'] } }, required: ['dependentType'] },
        ],
      },
    },

    childMarriage: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentIncome: { type: 'string' },
          dateMarried: { $ref: '#/definitions/date' },
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: { $ref: '#/definitions/date' },
        },
        required: ['dateMarried', 'fullName', 'ssn', 'birthDate'],
      },
    },

    childStoppedAttendingSchool: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentIncome: { type: 'string' },
          dateChildLeftSchool: { $ref: '#/definitions/date' },
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: { $ref: '#/definitions/date' },
        },
        required: ['dateChildLeftSchool', 'fullName', 'ssn', 'birthDate'],
      },
    },

    spouseSupportingDocuments: {
      $ref: '#/definitions/files',
    },
    childSupportingDocuments: {
      $ref: '#/definitions/files',
    },
  },
  required: ['statementOfTruthCertified', 'statementOfTruthSignature'],
};

export default schema686c;
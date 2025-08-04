import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import { countries, states } from '../../common/constants';
import commonDefinitions from '../../common/definitions';

// patterns
const numberAndDashPattern = '^[0-9]*[-]*[0-9]*[-]*[0-9]*$';

const currencyAmountPattern = '^\\d+(\\.\\d{1,2})?$';

// filter out military states
const militaryStates = ['AA', 'AE', 'AP'];
const filteredStates = states.USA.filter(state => !militaryStates.includes(state.value));
const nameRegex = '^[A-Za-zÀ-ÖØ-öø-ÿ-]+(?:s[A-Za-zÀ-ÖØ-öø-ÿ-][?]+)*$';

let definitions = cloneDeep(commonDefinitions);
definitions = pick(definitions, 'fullNameNoSuffix', 'phone', 'email', 'files', 'privacyAgreementAccepted', 'ssn');

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DEPENDENTS MANAGEMENT FORM (21-686C & 21-674)',
  type: 'object',
  definitions: merge(definitions, {
    date: {
      type: 'string',
      // Don't include the "X" placeholders in the pattern
      pattern: '^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$',
    },
    genericLocation: {
      type: 'object',
      oneOf: [
        {
          properties: {
            outsideUsa: {
              not: {
                type: 'boolean',
                enum: [true],
              },
            },
            location: {
              type: 'object',
              properties: {
                city: {
                  type: 'string',
                },
                state: {
                  type: 'string',
                },
              },
              required: ['city', 'state'],
            },
          },
          required: ['location'],
        },
        {
          properties: {
            outsideUsa: {
              type: 'boolean',
              enum: [true],
            },
            location: {
              type: 'object',
              properties: {
                city: {
                  type: 'string',
                },
                country: {
                  type: 'string',
                },
              },
              required: ['city', 'country'],
            },
          },
          required: ['location'],
        },
      ],
    },
    genericTextInput: {
      type: 'string',
      maxLength: 50,
    },
    genericNumberAndDashInput: {
      type: 'string',
      maxLength: 50,
      minLength: 4,
      pattern: numberAndDashPattern,
    },
    currencyInput: {
      type: 'string',
      pattern: currencyAmountPattern,
    },
    addressSchema: {
      type: 'object',
      properties: {
        isMilitary: {
          type: 'boolean',
        },
        country: {
          type: 'string',
        },
        street: {
          type: 'string',
        },
        street2: {
          type: 'string',
        },
        street3: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
          pattern: '^\\d{5}$',
        },
      },
      required: ['country', 'street', 'city', 'state', 'postalCode'],
    },
  }),
  properties: {
    useV2: { type: 'boolean' },
    daysTillExpires: { type: 'integer' },

    // this is prefilled data, so it doesn't need to be required
    veteranInformation: {
      type: 'object',
      properties: {
        fullName: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            middle: { type: 'string' },
            last: { type: 'string' },
          },
          required: ['first', 'last'],
        },
        birthDate: {
          $ref: '#/definitions/date',
        },
        ssnLastFour: { type: 'string' },
        vaFileLastFour: { type: 'string' },
      },
    },

    veteranContactInformation: {
      type: 'object',
      properties: {
        veteranAddress: {
          $ref: '#/definitions/addressSchema',
        },
        phoneNumber: { type: 'string' },
        emailAddress: { type: 'string' },
      },
      required: ['veteranAddress', 'phoneNumber', 'emailAddress'],
    },

    spouseInformation: {
      type: 'object',
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        ssn: { type: 'string' },
        birthDate: { $ref: '#/definitions/date' },
        isVeteran: { type: 'boolean' },
        vaFileNumber: { type: 'string' },
        serviceNumber: { type: 'string' },
      },
      required: ['fullName', 'ssn', 'birthDate', 'isVeteran'],
    },

    doesLiveWithSpouse: {
      type: 'object',
      oneOf: [
        {
          properties: {
            spouseDoesLiveWithVeteran: { type: 'boolean', enum: [true] },
            spouseIncome: { type: 'string' },
            address: { $ref: '#/definitions/addressSchema' },
          },
          required: ['spouseIncome', 'spouseDoesLiveWithVeteran'],
        },
        {
          properties: {
            spouseDoesLiveWithVeteran: { not: { type: 'boolean', enum: [true] } },
            spouseIncome: { type: 'string' },
            address: { $ref: '#/definitions/addressSchema' },
          },
          required: ['spouseIncome', 'spouseDoesLiveWithVeteran', 'address'],
        },
      ],
    },

    currentMarriageInformation: {
      type: 'object',
      oneOf: [
        {
          allOf: [
            { $ref: '#/definitions/genericLocation' },
            {
              properties: {
                typeOfMarriage: {
                  not: {
                    type: 'string',
                    enum: ['OTHER'],
                  },
                },
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
              properties: {
                typeOfMarriage: {
                  type: 'string',
                  enum: ['OTHER'],
                },
                typeOther: { type: 'string' },
                date: { $ref: '#/definitions/date' },
              },
              required: ['typeOfMarriage', 'typeOther', 'location', 'date'],
            },
          ],
        },
      ],
    },

    spouseMarriageHistory: {
      type: 'array',
      items: {
        type: 'object',
        oneOf: [
          {
            properties: {
              fullName: { $ref: '#/definitions/fullNameNoSuffix' },
              reasonMarriageEnded: {
                not: {
                  type: 'string',
                  enum: ['Other'],
                },
              },
              otherReasonMarriageEnded: { type: 'string' },

              startDate: { $ref: '#/definitions/date' },
              endDate: { $ref: '#/definitions/date' },
              startLocation: { $ref: '#/definitions/genericLocation' },
              endLocation: { $ref: '#/definitions/genericLocation' },
            },
            required: ['startLocation', 'endLocation', 'endDate', 'startDate', 'reasonMarriageEnded', 'fullName'],
          },
          {
            properties: {
              fullName: { $ref: '#/definitions/fullNameNoSuffix' },
              reasonMarriageEnded: { type: 'string', enum: ['Other'] },
              otherReasonMarriageEnded: { type: 'string' },

              startDate: { $ref: '#/definitions/date' },
              endDate: { $ref: '#/definitions/date' },
              startLocation: { $ref: '#/definitions/genericLocation' },
              endLocation: { $ref: '#/definitions/genericLocation' },
            },
            required: [
              'startLocation',
              'endLocation',
              'endDate',
              'startDate',
              'reasonMarriageEnded',
              'otherReasonMarriageEnded',
              'fullName',
            ],
          },
        ],
      },
    },

    spouseSupportingDocuments: {
      $ref: '#/definitions/files',
    },
    childSupportingDocuments: {
      $ref: '#/definitions/files',
    },
    householdIncome: { type: 'boolean' },

    reportDivorce: {
      type: 'object',
      properties: {
        spouseIncome: {
          type: 'string',
        },
        date: {
          $ref: '#/definitions/date',
        },
        divorceLocation: {
          $ref: '#/definitions/genericLocation',
        },
        reasonMarriageEnded: { type: 'string' },
        explanationOfOther: { type: 'string' },
        fullName: {
          $ref: '#/definitions/fullNameNoSuffix',
        },
        birthDate: {
          $ref: '#/definitions/date',
        },
      },
      required: ['date', 'divorceLocation', 'reasonMarriageEnded', 'fullName', 'birthDate'],
    },

    // **** pick it up here ****

    childrenToAdd: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          incomeInLastYear: { type: 'string' },
          marriageEndDescription: { type: 'string' },
          marriageEndDate: {
            $ref: '#/definitions/date',
          },
          marriageEndReason: { type: 'string' },
          doesChildLiveWithYou: { type: 'boolean' },
          hasChildEverBeenMarried: { type: 'boolean' },
          doesChildHaveDisability: { type: 'boolean' },
          isBiologicalChildOfSpouse: { type: 'boolean' },
          dateEnteredHousehold: {
            $ref: '#/definitions/date',
          },
          biologicalParentName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          biologicalParentSsn: { type: 'string' },
          biologicalParentDob: {
            $ref: '#/definitions/date',
          },
          relationshipToChild: {
            type: 'object',
            properties: {
              adopted: { type: 'boolean' },
              stepchild: { type: 'boolean' },
            },
          },
          isBiologicalChild: { type: 'boolean' },
          birthLocation: {
            type: 'object',
            properties: {
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  state: { type: 'string' },
                  postalCode: { type: 'string' },
                },
                required: ['city'],
              },
            },
            required: ['location'],
          },
          ssn: { type: 'string' },
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          birthDate: {
            $ref: '#/definitions/date',
          },
        },
        required: [
          'incomeInLastYear',
          'marriageEndDescription',
          'marriageEndDate',
          'marriageEndReason',
          'doesChildLiveWithYou',
          'hasChildEverBeenMarried',
          'doesChildHaveDisability',
          'isBiologicalChildOfSpouse',
          'dateEnteredHousehold',
          'biologicalParentName',
          'biologicalParentSsn',
          'biologicalParentDob',
          'relationshipToChild',
          'isBiologicalChild',
          'birthLocation',
          'ssn',
          'fullName',
          'birthDate',
        ],
      },
    },

    studentInformation: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          studentNetworthInformation: {
            type: 'object',
            properties: {
              savings: { type: 'string' },
              securities: { type: 'string' },
              realEstate: { type: 'string' },
              otherAssets: { type: 'string' },
              totalValue: { type: 'string' },
            },
            required: ['savings', 'securities', 'realEstate', 'otherAssets', 'totalValue'],
          },
          studentExpectedEarningsNextYear: {
            type: 'object',
            properties: {
              earningsFromAllEmployment: { type: 'string' },
              annualSocialSecurityPayments: { type: 'string' },
              otherAnnuitiesIncome: { type: 'string' },
              allOtherIncome: { type: 'string' },
            },
            required: [
              'earningsFromAllEmployment',
              'annualSocialSecurityPayments',
              'otherAnnuitiesIncome',
              'allOtherIncome',
            ],
          },
          studentEarningsFromSchoolYear: {
            type: 'object',
            properties: {
              earningsFromAllEmployment: { type: 'string' },
              annualSocialSecurityPayments: { type: 'string' },
              otherAnnuitiesIncome: { type: 'string' },
              allOtherIncome: { type: 'string' },
            },
            required: [
              'earningsFromAllEmployment',
              'annualSocialSecurityPayments',
              'otherAnnuitiesIncome',
              'allOtherIncome',
            ],
          },
          claimsOrReceivesPension: { type: 'boolean' },
          schoolInformation: {
            type: 'object',
            properties: {
              studentDidAttendSchoolLastTerm: { type: 'boolean' },
              dateFullTimeEnded: {
                $ref: '#/definitions/date',
              },
              studentIsEnrolledFullTime: { type: 'boolean' },
              currentTermDates: {
                type: 'object',
                properties: {
                  officialSchoolStartDate: {
                    $ref: '#/definitions/date',
                  },
                  expectedStudentStartDate: {
                    $ref: '#/definitions/date',
                  },
                  expectedGraduationDate: {
                    $ref: '#/definitions/date',
                  },
                },
                required: ['officialSchoolStartDate', 'expectedStudentStartDate', 'expectedGraduationDate'],
              },
              isSchoolAccredited: { type: 'boolean' },
              name: { type: 'string' },
            },
            required: [
              'studentDidAttendSchoolLastTerm',
              'dateFullTimeEnded',
              'studentIsEnrolledFullTime',
              'currentTermDates',
              'isSchoolAccredited',
              'name',
            ],
          },
          typeOfProgramOrBenefit: {
            type: 'object',
            properties: {
              ch35: { type: 'boolean' },
              fry: { type: 'boolean' },
              feca: { type: 'boolean' },
              other: { type: 'boolean' },
            },
          },
          otherProgramOrBenefit: { type: 'string' },
          tuitionIsPaidByGovAgency: { type: 'boolean' },
          ssn: { type: 'string' },
          isParent: { type: 'boolean' },
          wasMarried: { type: 'boolean' },
          address: {
            $ref: '#/definitions/addressSchema',
          },
          remarks: { type: 'string' },
          benefitPaymentDate: {
            $ref: '#/definitions/date',
          },
          marriageDate: {
            $ref: '#/definitions/date',
          },
          studentIncome: { type: 'string' },
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          birthDate: {
            $ref: '#/definitions/date',
          },
        },
        required: [
          'studentNetworthInformation',
          'studentExpectedEarningsNextYear',
          'studentEarningsFromSchoolYear',
          'claimsOrReceivesPension',
          'schoolInformation',
          'typeOfProgramOrBenefit',
          'otherProgramOrBenefit',
          'tuitionIsPaidByGovAgency',
          'ssn',
          'isParent',
          'wasMarried',
          'address',
          'remarks',
          'benefitPaymentDate',
          'studentIncome',
          'fullName',
          'birthDate',
        ],
      },
    },

    veteranMarriageHistory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          endLocation: {
            $ref: '#/definitions/genericLocation',
          },
          startLocation: {
            $ref: '#/definitions/genericLocation',
          },
          endDate: {
            $ref: '#/definitions/date',
          },
          startDate: {
            $ref: '#/definitions/date',
          },
          reasonMarriageEnded: { type: 'string' },
          otherReasonMarriageEnded: { type: 'string' },
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
        },
        required: ['endLocation', 'startLocation', 'endDate', 'startDate', 'reasonMarriageEnded', 'fullName'],
      },
    },

    stepChildren: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          whoDoesTheStepchildLiveWith: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          address: {
            $ref: '#/definitions/addressSchema',
          },
          livingExpensesPaid: { type: 'string' },
          supportingStepchild: { type: 'boolean' },
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          ssn: { type: 'string' },
          birthDate: {
            $ref: '#/definitions/date',
          },
        },
        required: [
          'whoDoesTheStepchildLiveWith',
          'address',
          'livingExpensesPaid',
          'supportingStepchild',
          'fullName',
          'ssn',
          'birthDate',
        ],
      },
    },

    deaths: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentDeathLocation: {
            $ref: '#/definitions/genericLocation',
          },
          deceasedDependentIncome: { type: 'string' },
          dependentDeathDate: {
            $ref: '#/definitions/date',
          },
          dependentType: { type: 'string' },
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          ssn: { type: 'string' },
          birthDate: {
            $ref: '#/definitions/date',
          },
        },
        required: [
          'dependentDeathLocation',
          'deceasedDependentIncome',
          'dependentDeathDate',
          'dependentType',
          'fullName',
          'ssn',
          'birthDate',
        ],
      },
    },

    childMarriage: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentIncome: { type: 'string' },
          dateMarried: {
            $ref: '#/definitions/date',
          },
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          ssn: { type: 'string' },
          birthDate: {
            $ref: '#/definitions/date',
          },
        },
        required: ['dependentIncome', 'dateMarried', 'fullName', 'ssn', 'birthDate'],
      },
    },

    childStoppedAttendingSchool: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentIncome: { type: 'string' },
          dateChildLeftSchool: {
            $ref: '#/definitions/date',
          },
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          ssn: { type: 'string' },
          birthDate: {
            $ref: '#/definitions/date',
          },
        },
        required: ['dependentIncome', 'dateChildLeftSchool', 'fullName', 'ssn', 'birthDate'],
      },
    },

    statementOfTruthSignature: { type: 'string' },
    statementOfTruthCertified: { type: 'boolean' },

    privacyAgreementAccepted: { type: 'boolean' },
  },
  required: [
    'spouseSupportingDocuments',
    'childSupportingDocuments',
    'householdIncome',
    'reportDivorce',
    'currentMarriageInformation',
    'doesLiveWithSpouse',
    'spouseInformation',
    'veteranContactInformation',
    'spouseMarriageHistory',
    'childrenToAdd',
    'studentInformation',
    'veteranMarriageHistory',
    'stepChildren',
    'deaths',
    'childMarriage',
    'childStoppedAttendingSchool',
    'statementOfTruthSignature',
    'statementOfTruthCertified',
    'veteranInformation',
    'privacyAgreementAccepted',
  ],
};

export default schema;

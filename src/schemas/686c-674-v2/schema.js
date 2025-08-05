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
  }),
  properties: {
    // Data from prefill transformer: COMPLETE

    useV2: { type: 'boolean' },
    daysTillExpires: { type: 'integer' },

    // Veteran information section: COMPLETE
    // this is prefilled data, so it doesn't need to be required

    veteranInformation: {
      type: 'object',
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        birthDate: { $ref: '#/definitions/date' },
        ssnLastFour: { $ref: '#/definitions/ssnLastFour' },
        vaFileLastFour: { type: 'string', pattern: '^\\d{4}$' },
      },
    },

    // Veteran contact information section: COMPLETE

    veteranContactInformation: {
      type: 'object',
      properties: {
        veteranAddress: { $ref: '#/definitions/address' },
        phoneNumber: { $ref: '#/definitions/phone' },
        emailAddress: { $ref: '#/definitions/email' },
      },
      required: ['veteranAddress', 'phoneNumber', 'emailAddress'],
    },

    // Current spouse information section: COMPLETE

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

    // Spouse does live with veteran section: COMPLETE

    doesLiveWithSpouse: {
      type: 'object',
      oneOf: [
        {
          properties: {
            spouseDoesLiveWithVeteran: { type: 'boolean', enum: [true] },
            spouseIncome: { type: 'string' },
          },
          required: ['spouseDoesLiveWithVeteran'],
        },
        {
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

    // Current marriage information section: COMPLETE

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

    // Spouse marriage history section: COMPLETE

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
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Other'] },
            },
            required: ['reasonMarriageEnded', 'otherReasonMarriageEnded'],
          },
          {
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
            },
            required: ['reasonMarriageEnded'],
          },
        ],
      },
    },

    // Veteran marriage history section: COMPLETE

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
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Other'] },
            },
            required: ['reasonMarriageEnded', 'otherReasonMarriageEnded'],
          },
          {
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
            },
            required: ['reasonMarriageEnded'],
          },
        ],
      },
    },

    // Remove divorced: COMPLETE

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
          properties: {
            reasonMarriageEnded: { type: 'string', enum: ['Other'] },
          },
          required: ['reasonMarriageEnded', 'explanationOfOther'],
        },
        {
          properties: {
            reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
          },
          required: ['reasonMarriageEnded'],
        },
      ],
    },

    // **** pick it up here ****

    // Add children section: WIP

    childrenToAdd: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          birthDate: { $ref: '#/definitions/date' },

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
          biologicalParentSsn: { $ref: '#/definitions/ssn' },
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

          ssn: { $ref: '#/definitions/ssn' },
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

    // Student information section: COMPLETE

    studentInformation: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          birthDate: {
            $ref: '#/definitions/date',
          },
          ssn: { $ref: '#/definitions/ssn' },
          isParent: { type: 'boolean' },
          studentIncome: { type: 'string' },
          address: {
            $ref: '#/definitions/address',
          },
          wasMarried: {
            oneOf: [
              {
                type: 'boolean',
                enum: [true],
                required: ['wasMarried', 'marriageDate'],
              },
              {
                type: 'boolean',
                enum: [false],
                required: ['wasMarried'],
              },
            ],
          },
          marriageDate: { $ref: '#/definitions/date' },
          typeOfProgramOrBenefit: {
            type: 'object',
            oneOf: [
              {
                properties: {
                  typeOfProgramOrBenefit: {
                    type: 'object',
                    properties: {
                      other: { type: 'boolean', enum: [true] },
                    },
                  },
                },
                required: ['otherProgramOrBenefit'],
              },
              {
                properties: {
                  typeOfProgramOrBenefit: {
                    type: 'object',
                    properties: {
                      other: { type: 'boolean', enum: [false] },
                    },
                  },
                },
                anyOf: [
                  {
                    properties: {
                      typeOfProgramOrBenefit: {
                        type: 'object',
                        properties: { other: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefitPaymentDate'],
                  },
                  {
                    properties: {
                      typeOfProgramOrBenefit: {
                        type: 'object',
                        properties: { ch35: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefitPaymentDate'],
                  },
                  {
                    properties: {
                      typeOfProgramOrBenefit: {
                        type: 'object',
                        properties: { fry: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefitPaymentDate'],
                  },
                  {
                    properties: {
                      typeOfProgramOrBenefit: {
                        type: 'object',
                        properties: { feca: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefitPaymentDate'],
                  },
                ],
              },
              {
                properties: {
                  typeOfProgramOrBenefit: {
                    type: 'object',
                    properties: {
                      ch35: { type: 'boolean', enum: [false] },
                      fry: { type: 'boolean', enum: [false] },
                      feca: { type: 'boolean', enum: [false] },
                      other: { type: 'boolean', enum: [false] },
                    },
                  },
                },
              },
            ],
          },
          otherProgramOrBenefit: {
            type: 'string',
          },
          tuitionIsPaidByGovAgency: { type: 'boolean' },
          benefitPaymentDate: {
            $ref: '#/definitions/date',
          },
          schoolInformation: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              studentIsEnrolledFullTime: {
                type: 'boolean',
              },
              dateFullTimeEnded: { $ref: '#/definitions/date' },
              isSchoolAccredited: { type: 'boolean' },
              currentTermDates: {
                type: 'object',
                properties: {
                  officialSchoolStartDate: { $ref: '#/definitions/date' },
                  expectedStudentStartDate: { $ref: '#/definitions/date' },
                  expectedGraduationDate: { $ref: '#/definitions/date' },
                },
                required: ['officialSchoolStartDate', 'expectedStudentStartDate', 'expectedGraduationDate'],
              },
              studentDidAttendSchoolLastTerm: { type: 'boolean' },
              lastTermSchoolInformation: {
                type: 'object',
                properties: {
                  termBegin: { type: 'string' },
                  dateTermEnded: { type: 'string' },
                },
              },
            },
            required: [
              'name',
              'studentIsEnrolledFullTime',
              'studentDidAttendSchoolLastTerm',
              'currentTermDates',
              'isSchoolAccredited',
            ],
            oneOf: [
              {
                properties: {
                  studentDidAttendSchoolLastTerm: { type: 'boolean', enum: [true] },
                  lastTermSchoolInformation: {
                    type: 'object',
                    required: ['termBegin', 'dateTermEnded'],
                  },
                },
                required: ['studentDidAttendSchoolLastTerm', 'lastTermSchoolInformation'],
              },
              {
                properties: {
                  studentDidAttendSchoolLastTerm: { type: 'boolean', enum: [false] },
                },
                required: ['studentDidAttendSchoolLastTerm'],
              },
            ],
          },
          claimsOrReceivesPension: { type: 'boolean' },
          studentNetworthInformation: {
            type: 'object',
            properties: {
              savings: { type: 'string' },
              securities: { type: 'string' },
              realEstate: { type: 'string' },
              otherAssets: { type: 'string' },
              totalValue: { type: 'string' },
            },
          },
          studentExpectedEarningsNextYear: {
            type: 'object',
            properties: {
              earningsFromAllEmployment: { type: 'string' },
              annualSocialSecurityPayments: { type: 'string' },
              otherAnnuitiesIncome: { type: 'string' },
              allOtherIncome: { type: 'string' },
            },
          },
          studentEarningsFromSchoolYear: {
            type: 'object',
            properties: {
              earningsFromAllEmployment: { type: 'string' },
              annualSocialSecurityPayments: { type: 'string' },
              otherAnnuitiesIncome: { type: 'string' },
              allOtherIncome: { type: 'string' },
            },
          },

          remarks: { type: 'string' },
        },
        required: [
          'fullName',
          'birthDate',
          'ssn',
          'isParent',
          'address',
          'wasMarried',
          'tuitionIsPaidByGovAgency',
          'schoolInformation',
          'claimsOrReceivesPension',
          'typeOfProgramOrBenefit',
          'otherProgramOrBenefit',
          'benefitPaymentDate',
        ],
      },
    },

    // Remove Stepchildren section: COMPLETE

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
            properties: {
              supportingStepchild: { type: 'boolean', enum: [true] },
            },
            required: ['supportingStepchild', 'livingExpensesPaid'],
          },
          {
            properties: {
              supportingStepchild: { type: 'boolean', enum: [false] },
            },
            required: ['supportingStepchild'],
          },
        ],
      },
    },

    // Remove deceased section: COMPLETE

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
            properties: {
              childUnder18: { type: 'boolean' },
              stepChild: { type: 'boolean' },
            },
          },
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: { $ref: '#/definitions/date' },
        },
        required: ['dependentDeathLocation', 'dependentDeathDate', 'dependentType', 'fullName', 'ssn', 'birthDate'],
        oneOf: [
          {
            properties: {
              dependentType: { type: 'string', enum: ['CHILD'] },
            },
            required: ['dependentType', 'childStatus'],
          },
          {
            properties: {
              dependentType: { type: 'string' },
            },
            required: ['dependentType'],
          },
        ],
      },
    },

    // Remove married child section: COMPLETE

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
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: {
            $ref: '#/definitions/date',
          },
        },
        required: ['dateMarried', 'fullName', 'ssn', 'birthDate'],
      },
    },

    // Remove child not in school section: COMPLETE

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
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: {
            $ref: '#/definitions/date',
          },
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
    householdIncome: { type: 'boolean' },

    statementOfTruthSignature: { type: 'string' },
    statementOfTruthCertified: { type: 'boolean' },

    privacyAgreementAccepted: { $ref: '#/definitions/privacyAgreementAccepted' },
  },
  required: [
    // 'childMarriage',
    // 'childrenToAdd',
    // 'childSupportingDocuments',
    // 'currentMarriageInformation',
    // 'deaths',
    // 'doesLiveWithSpouse',
    'privacyAgreementAccepted',
    // 'reportDivorce',
    // 'spouseInformation',
    // 'spouseMarriageHistory',
    // 'spouseSupportingDocuments',
    // 'statementOfTruthCertified',
    'statementOfTruthSignature',
    // 'stepChildren',
    // 'studentInformation',
    // 'veteranContactInformation',
    // 'veteranInformation',
    // 'veteranMarriageHistory',
  ],
};

export default schema;

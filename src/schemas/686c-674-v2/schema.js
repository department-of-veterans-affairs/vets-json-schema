// Known schema issues: https://github.com/department-of-veterans-affairs/va.gov-team/issues/138238
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

// Fix #4: Remove minLength: 1 from address.street2 (production data includes empty strings)
if (definitions.address && definitions.address.properties && definitions.address.properties.street2) {
  delete definitions.address.properties.street2.minLength;
}

// Fix #12: Extend veteranServiceNumber pattern to allow 5-10 digit service numbers
definitions.veteranServiceNumber = {
  type: 'string',
  pattern: '^[A-Z]{0,2}\\d{5,10}$',
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DEPENDENTS MANAGEMENT FORM (21-686C & 21-674)',
  type: 'object',
  definitions: merge(definitions, {
    date: {
      type: 'string',
      // Fix #11: Allow XX for month and day to support partial dates (e.g. 1994-06-XX)
      pattern: '^(\\d{4})-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
    },
    genericLocation: {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            outsideUsa: {
              type: 'boolean',
              enum: [false],
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                state: { type: 'string' },
              },
              required: ['city', 'state'],
            },
          },
          required: ['location'],
        },
        {
          type: 'object',
          properties: {
            outsideUsa: {
              type: 'boolean',
              enum: [true],
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                country: { type: 'string' },
              },
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
            outsideUsa: {
              type: 'boolean',
              enum: [false],
            },
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
            outsideUsa: {
              type: 'boolean',
              enum: [true],
            },
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
    useV2: { type: 'boolean' },
    daysTillExpires: { type: 'integer' },

    veteranInformation: {
      type: 'object',
      properties: {
        // Fix #10: Inlined fullName with optional suffix (7 veterans in production had Jr., II, etc.)
        fullName: {
          type: 'object',
          required: ['first', 'last'],
          properties: {
            first: { type: 'string', minLength: 1, maxLength: 30 },
            middle: { type: 'string', maxLength: 30 },
            last: { type: 'string', minLength: 1, maxLength: 30 },
            suffix: { type: 'string', maxLength: 10 },
          },
          additionalProperties: false,
        },
        birthDate: { $ref: '#/definitions/date' },
        ssnLastFour: { $ref: '#/definitions/ssnLastFour' },
        vaFileLastFour: { type: 'string', pattern: '^\\d{4}$' },
        ssn: { $ref: '#/definitions/ssn' },
        vaFileNumber: { type: 'string' },
      },
    },

    veteranContactInformation: {
      type: 'object',
      properties: {
        veteranAddress: { $ref: '#/definitions/address' },
        phoneNumber: { $ref: '#/definitions/phone' },
        internationalPhoneNumber: { type: 'string' },
        emailAddress: { $ref: '#/definitions/email' },
        electronicCorrespondence: { type: 'boolean' },
      },
      required: ['veteranAddress', 'phoneNumber', 'emailAddress'],
    },

    // Fix #3: ssn conditional on noSsn flag
    spouseInformation: {
      type: 'object',
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        ssn: { $ref: '#/definitions/ssn' },
        birthDate: { $ref: '#/definitions/date' },
        isVeteran: { type: 'boolean' },
        vaFileNumber: { type: 'string' },
        serviceNumber: { $ref: '#/definitions/veteranServiceNumber' },
        noSsn: { type: 'boolean' },
        noSsnReason: { type: 'string' },
      },
      required: ['fullName', 'birthDate', 'isVeteran'],
      oneOf: [
        {
          type: 'object',
          properties: {
            noSsn: { not: { type: 'boolean', enum: [true] } },
          },
          required: ['ssn'],
        },
        {
          type: 'object',
          properties: {
            noSsn: { type: 'boolean', enum: [true] },
          },
          required: ['noSsnReason'],
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

    currentMarriageInformation: {
      type: 'object',
      oneOf: [
        {
          allOf: [
            { $ref: '#/definitions/genericLocation' },
            {
              type: 'object',
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
              type: 'object',
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
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Other'] },
            },
            required: ['reasonMarriageEnded', 'otherReasonMarriageEnded'],
          },
          {
            type: 'object',
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
            },
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
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Other'] },
            },
            required: ['reasonMarriageEnded', 'otherReasonMarriageEnded'],
          },
          {
            type: 'object',
            properties: {
              reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
            },
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
          properties: {
            reasonMarriageEnded: { type: 'string', enum: ['Other'] },
          },
          required: ['reasonMarriageEnded', 'explanationOfOther'],
        },
        {
          type: 'object',
          properties: {
            reasonMarriageEnded: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
          },
          required: ['reasonMarriageEnded'],
        },
      ],
    },

    // Fixes #1, #6, #8, #9: childrenToAdd restructured
    // - Stepchild fields conditional via oneOf (biological vs stepchild vs adopted)
    // - Removed invalid required inside boolean/string oneOf branches (Draft 4 cleanup)
    // - Removed ssn from base required (noSsn support)
    childrenToAdd: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          birthDate: { $ref: '#/definitions/date' },
          ssn: { $ref: '#/definitions/ssn' },
          noSsn: { type: 'boolean' },
          noSsnReason: { type: 'string' },
          birthLocation: {
            $ref: '#/definitions/genericLocationAlt',
          },
          isBiologicalChild: { type: 'boolean' },
          relationshipToChild: {
            type: 'object',
            properties: {
              adopted: { type: 'boolean' },
              stepchild: { type: 'boolean' },
            },
          },
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
          doesChildHaveDisability: { type: 'boolean' },
          doesChildHavePermanentDisability: { type: 'boolean' },
          doesChildLiveWithYou: { type: 'boolean' },
          hasChildEverBeenMarried: { type: 'boolean' },
          marriageEndDate: {
            $ref: '#/definitions/date',
          },
          marriageEndReason: { type: 'string' },
          marriageEndDescription: { type: 'string' },
          incomeInLastYear: { type: 'string' },
          address: {
            $ref: '#/definitions/address',
          },
          livingWith: {
            type: 'object',
            required: ['first', 'last'],
            properties: {
              first: { type: 'string' },
              middle: { type: 'string' },
              last: { type: 'string' },
            },
          },
          relationshipType: { type: 'string' },
        },
        required: [
          'doesChildLiveWithYou',
          'hasChildEverBeenMarried',
          'doesChildHaveDisability',
          'isBiologicalChild',
          'birthLocation',
          'fullName',
          'birthDate',
        ],
        oneOf: [
          {
            // Biological child
            type: 'object',
            properties: {
              isBiologicalChild: { type: 'boolean', enum: [true] },
            },
            required: ['isBiologicalChild'],
          },
          {
            // Stepchild: requires parent info
            type: 'object',
            properties: {
              isBiologicalChild: { type: 'boolean', enum: [false] },
              relationshipType: { type: 'string', enum: ['STEPCHILD'] },
            },
            required: [
              'isBiologicalChild',
              'relationshipType',
              'isBiologicalChildOfSpouse',
              'dateEnteredHousehold',
              'biologicalParentName',
              'biologicalParentSsn',
              'biologicalParentDob',
            ],
          },
          {
            // Adopted child: no stepchild-specific fields
            type: 'object',
            properties: {
              isBiologicalChild: { type: 'boolean', enum: [false] },
              relationshipType: { type: 'string', enum: ['ADOPTED'] },
            },
            required: ['isBiologicalChild', 'relationshipType'],
          },
        ],
      },
    },

    // Fixes #6, #7, #13: studentInformation restructured
    // - Simplified wasMarried (removed invalid required inside boolean oneOf)
    // - Simplified typeOfProgramOrBenefit to accept both string and object
    // - ssn conditional on noSsn
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
          noSsn: { type: 'boolean' },
          noSsnReason: { type: 'string' },
          relationshipToStudent: { type: 'string' },
          studentIncome: { type: 'string' },
          address: {
            $ref: '#/definitions/address',
          },
          wasMarried: { type: 'boolean' },
          marriageDate: { $ref: '#/definitions/date' },
          typeOfProgramOrBenefit: {
            oneOf: [
              { type: 'string' },
              { type: 'object' },
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
                type: 'object',
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
                type: 'object',
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
          'relationshipToStudent',
          'address',
          'wasMarried',
          'tuitionIsPaidByGovAgency',
          'schoolInformation',
          'typeOfProgramOrBenefit',
        ],
        oneOf: [
          {
            type: 'object',
            properties: {
              noSsn: { not: { type: 'boolean', enum: [true] } },
            },
            required: ['ssn'],
          },
          {
            type: 'object',
            properties: {
              noSsn: { type: 'boolean', enum: [true] },
            },
            required: ['noSsn'],
          },
        ],
      },
    },

    // Fix #2: stepChildren required reduced to [fullName, ssn, birthDate], removed supportingStepchild oneOf
    stepChildren: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          whoDoesTheStepchildLiveWith: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              middle: { type: 'string' },
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
          dateStepchildLeftHousehold: { $ref: '#/definitions/date' },
        },
        required: ['fullName', 'ssn', 'birthDate'],
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
            type: 'object',
            properties: {
              dependentType: { type: 'string', enum: ['CHILD'] },
            },
            required: ['dependentType', 'childStatus'],
          },
          {
            type: 'object',
            properties: {
              dependentType: { type: 'string', enum: ['SPOUSE', 'DEPENDENT_PARENT'] },
            },
            required: ['dependentType'],
          },
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
          ssn: { $ref: '#/definitions/ssn' },
          birthDate: {
            $ref: '#/definitions/date',
          },
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
    signatureDate: { $ref: '#/definitions/date' },
  },
  required: ['statementOfTruthCertified', 'statementOfTruthSignature'],
};

export default schema;

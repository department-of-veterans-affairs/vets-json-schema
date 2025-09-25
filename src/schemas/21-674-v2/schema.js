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

export const schema674 = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DEPENDENTS MANAGEMENT FORM (21-674)',
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

    daysTillExpires: { type: 'integer' },

    veteranContactInformation: {
      type: 'object',
      properties: {
        veteranAddress: { $ref: '#/definitions/address' },
        phoneNumber: { $ref: '#/definitions/phone' },
        emailAddress: { $ref: '#/definitions/email' },
      },
      required: ['veteranAddress', 'phoneNumber', 'emailAddress'],
    },

    studentInformation: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          birthDate: { $ref: '#/definitions/date' },
          ssn: { $ref: '#/definitions/ssn' },
          isParent: { type: 'boolean' },
          studentIncome: { type: 'string' },
          address: { $ref: '#/definitions/address' },
          wasMarried: {
            oneOf: [
              { type: 'boolean', enum: [true], required: ['wasMarried', 'marriageDate'] },
              { type: 'boolean', enum: [false], required: ['wasMarried'] },
            ],
          },
          marriageDate: { $ref: '#/definitions/date' },
          typeOfProgramOrBenefit: {
            type: 'object',
            oneOf: [
              {
                type: 'object',
                properties: {
                  typeOfProgramOrBenefit: {
                    type: 'object',
                    properties: { other: { type: 'boolean', enum: [true] } },
                  },
                },
                required: ['otherProgramOrBenefit'],
              },
              {
                type: 'object',
                properties: {
                  typeOfProgramOrBenefit: {
                    type: 'object',
                    properties: { other: { type: 'boolean', enum: [false] } },
                  },
                },
                anyOf: [
                  {
                    type: 'object',
                    properties: {
                      typeOfProgramOrBenefit: {
                        type: 'object',
                        properties: { other: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefitPaymentDate'],
                  },
                  {
                    type: 'object',
                    properties: {
                      typeOfProgramOrBenefit: {
                        type: 'object',
                        properties: { ch35: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefitPaymentDate'],
                  },
                  {
                    type: 'object',
                    properties: {
                      typeOfProgramOrBenefit: {
                        type: 'object',
                        properties: { fry: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefitPaymentDate'],
                  },
                  {
                    type: 'object',
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
                type: 'object',
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
          otherProgramOrBenefit: { type: 'string' },
          tuitionIsPaidByGovAgency: { type: 'boolean' },
          benefitPaymentDate: { $ref: '#/definitions/date' },

          schoolInformation: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              studentIsEnrolledFullTime: { type: 'boolean' },
              dateFullTimeEnded: { $ref: '#/definitions/date' },
              isSchoolAccredited: { type: 'boolean' },
              currentTermDates: {
                type: 'object',
                properties: {
                  officialSchoolStartDate: { $ref: '#/definitions/date' },
                  expectedStudentStartDate: { $ref: '#/definitions/date' },
                  expectedGraduationDate: { $ref: '#/definitions/date' },
                },
                required: [
                  'officialSchoolStartDate',
                  'expectedStudentStartDate',
                  'expectedGraduationDate',
                ],
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
  },
  required: ['statementOfTruthCertified', 'statementOfTruthSignature'],
};

export default schema674;
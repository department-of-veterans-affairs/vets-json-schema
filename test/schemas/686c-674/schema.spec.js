import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';

const schema = schemas['686C-674'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

const testData = {
  genericLocation: {
    valid: [
      { state: 'California', city: 'Los Angeles' },
      { state: 'Hong Kong', city: 'Kowloon' },
    ],
    invalid: [
      {
        state: '123#$%AState',
        city: '456!)aCity',
      },
      {
        state: 'This entry is too long to be a valid state',
        city: 'This city is too long to be a valid entry',
      },
    ],
  },
  boolean: {
    valid: [true, false],
    invalid: [null, 'some string', 42],
  },
  marriageTypes: {
    valid: ['CEREMONIAL', 'COMMON-LAW', 'TRIBAL', 'PROXY', 'OTHER'],
    invalid: ['something', 'else', 'entirely'],
  },
  reasonsMarriageEnded: {
    valid: ['DIVORCE', 'OTHER'],
    invalid: ['DEATH', 'SOME_OTHER'],
  },
  deceasedDependent: {
    valid: [
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        dependentType: 'SPOUSE',
        date: '2001-01-02',
        location: {
          state: 'California',
          city: 'Los Angeles',
        },
      },
    ],
    invalid: [],
  },
  stepChildNotInHousehold: {
    valid: [
      {
        stepChildren: [
          {
            fullName: {
              first: 'John',
              last: 'Doe',
            },
            supportingStepchild: true,
            livingExpensesPaid: 'Half',
            whoDoesTheStepchildLiveWith: {
              first: 'James',
              last: 'Doe',
            },
            address: {
              countryName: 'United States',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
          },
        ],
      },
    ],
    invalid: [],
  },
  report674: {
    valid: [
      {
        studentNameAndSSN: {
          fullName: {
            first: 'John',
            last: 'Doe',
          },
          ssn: '123121234',
          birthDate: '2010-01-04',
        },
        studentAddressMarriageTuition: {
          address: {
            countryName: 'USA',
            addressLine1: '123 At Home Dr',
            city: 'A City',
            stateCode: 'AL',
            zipCode: '91103',
          },
          wasMarried: true,
          marriageDate: '2012-08-08',
          tuitionIsPaidByGovAgency: true,
          agencyName: 'The Government',
          datePaymentsBegan: '2009-01-01',
        },
        studentSchoolAddress: {
          schoolInformation: {
            name: 'Phoenix Online',
            trainingProgram: 'Marine Biology',
            address: {
              countryName: 'USA',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
          },
        },
        studentTermDates: {
          currentTermDates: {
            officialSchoolStartDate: '2011-01-01',
            expectedStudentStartDate: '2011-01-03',
            expectedGraduationDate: '2014-01-01',
          },
          programInformation: {
            studentIsEnrolledFullTime: true,
            courseOfStudy: 'Marine Biology',
            classesPerWeek: 2,
            hoursPerWeek: 20,
          },
        },
        studentLastTerm: {
          studentDidAttendSchoolLastTerm: true,
          lastTermSchoolInformation: {
            name: 'Argosy',
            address: {
              countryName: 'USA',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
            termBegin: '2010-01-01',
            dateTermEnded: '2010-09-09',
            classesPerWeek: 2,
            hoursPerWeek: 20,
          },
        },
        studentIncomeInformation: {
          studentDoesEarnIncome: true,
          studentEarningsFromSchoolYear: {
            earningsFromAllEmployment: '2',
            annualSocialSecurityPayments: '2',
            otherAnnuitiesIncome: '4',
            allOtherIncome: '2.05',
          },
          studentWillEarnIncomeNextYear: true,
          studentExpectedEarningsNextYear: {
            earningsFromAllEmployment: '2010.33',
            annualSocialSecurityPayments: '2',
            otherAnnuitiesIncome: '4',
            allOtherIncome: '2.05',
          },
        },
        studentNetworthInformation: {
          studentDoesHaveNetworth: true,
          studentNetworthInformation: {
            savings: '0',
            securities: '0',
            realEstate: '0',
            otherAssets: '500000.11',
            remarks: 'Put it all in bitcoin baby',
          },
        },
      },
    ],
    invalid: [
      {
        studentNameAndSSN: {
          fullName: {
            first: 'John',
            last: 'Doe',
          },
          ssn: '123121234',
          birthDate: '2010-01-04',
        },
        studentAddressMarriageTuition: {
          address: {
            countryName: 'United States',
            addressLine1: '123 At Home Dr',
            city: 'A City',
            stateCode: 'AL',
            zipCode: '91103',
          },
        },
        studentSchoolAddress: {
          schoolInformation: {
            name: 'Phoenix Online',
            trainingProgram: 'Marine Biology',
            address: {
              countryName: 'United States',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
          },
        },
        studentTermDates: {
          currentTermDates: {
            officialSchoolStartDate: '2011-01-01',
            expectedStudentStartDate: '2011-01-03',
            expectedGraduationDate: '2014-01-01',
          },
          programInformation: {
            studentIsEnrolledFullTime: true,
            courseOfStudy: 'Marine Biology',
            classesPerWeek: 2,
            hoursPerWeek: 20,
          },
        },
        studentLastTerm: {
          studentDidAttendSchoolLastTerm: true,
          lastTermSchoolInformation: {
            name: 'Argosy',
            address: {
              countryName: 'United States',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
            termBegin: '2010-01-01',
            dateTermEnded: '2010-09-09',
            classesPerWeek: 2,
            hoursPerWeek: 20,
          },
        },
        studentIncomeInformation: {
          studentDoesEarnIncome: false,
          studentWillEarnIncomeNextYear: true,
          studentExpectedEarningsNextYear: {
            earningsFromAllEmployment: 2010.33,
          },
        },
        studentNetworInformation: {
          studentDoesHaveNetworth: false,
        },
      },
    ],
  },
};

describe('686c-674 schema', () => {
  // veteran information
  sharedTests.runTest('fullName', [
    'addSpouse.spouseNameInformation.fullName',
    'reportDivorce.fullName',
    'reportChildMarriage.fullName',
    'reportChildStoppedAttendingSchool.fullName',
    'report674.studentNameAndSSN.fullName',
  ]);
  sharedTests.runTest('ssn', ['addSpouse.spouseNameInformation.ssn', 'report674.studentNameAndSSN.ssn']);
  sharedTests.runTest('date', [
    'addSpouse.spouseNameInformation.birthDate',
    'addSpouse.currentMarriageInformation.date',
    'reportDivorce.date',
    'reportChildMarriage.dateMarried',
    'reportChildStoppedAttendingSchool.dateChildLeftSchool',
    'report674.studentNameAndSSN.birthDate',
    'report674.studentAddressMarriageTuition.marriageDate',
    'report674.studentAddressMarriageTuition.datePaymentsBegan',
    'report674.studentTermDates.currentTermDates.officialSchoolStartDate',
    'report674.studentTermDates.currentTermDates.expectedStudentStartDate',
    'report674.studentTermDates.currentTermDates.expectedGraduationDate',
    'report674.studentLastTerm.lastTermSchoolInformation.termBegin',
    'report674.studentLastTerm.lastTermSchoolInformation.dateTermEnded',
  ]);
  sharedTests.runTest('phone', ['veteranInformation.veteranAddress.phoneNumber']);
  sharedTests.runTest('email', ['veteranInformation.veteranAddress.emailAddress']);

  // Current Marriage
  schemaTestHelper.testValidAndInvalid('addSpouse.spouseNameInformation.isVeteran', testData.boolean);
  schemaTestHelper.testValidAndInvalid('addSpouse.currentMarriageInformation.type', testData.marriageTypes);
  schemaTestHelper.testValidAndInvalid('addSpouse.doesLiveWithSpouse.spouseDoesLiveWithVeteran', testData.boolean);
  schemaTestHelper.testValidAndInvalid('addSpouse.spouseMarriageHistory.spouseWasMarriedBefore', testData.boolean);
  schemaTestHelper.testValidAndInvalid('addSpouse.veteranMarriageHistory.veteranWasMarriedBefore', testData.boolean);
  schemaTestHelper.testValidAndInvalid('addSpouse.currentMarriageInformation.location', testData.genericLocation);

  // Report Divorce
  schemaTestHelper.testValidAndInvalid('reportDivorce.reasonMarriageEnded', testData.reasonsMarriageEnded);
  schemaTestHelper.testValidAndInvalid('reportDivorce.location', testData.genericLocation);

  // Deceased Dependents
  schemaTestHelper.testValidAndInvalid('deceasedDependents', testData.deceasedDependent);

  // Report stepchild not in household
  schemaTestHelper.testValidAndInvalid('reportStepchildNotInHousehold', testData.stepChildNotInHousehold);

  // 674
  schemaTestHelper.testValidAndInvalid('report674', testData.report674);
});

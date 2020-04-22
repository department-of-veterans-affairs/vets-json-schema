import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';

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
  deceasedDependent: {
    valid: [
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        dependentType: 'SPOUSE',
        deceasedDateOfDeath: '2001-01-02',
        deceasedLocationOfDeath: {
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
            stepchildName: {
              first: 'John',
              last: 'Doe',
            },
            stillSupportingStepchild: true,
            stepchildLivingExpensesPaid: 'Half',
            whoDoesTheStepchildLiveWith: {
              first: 'James',
              last: 'Doe',
            },
            stepchildAddress: {
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
          studentFullName: {
            first: 'John',
            last: 'Doe',
          },
          studentSSN: '123121234',
          studentDOB: '2010-01-04',
        },
        studentAddressMarriageTuition: {
          studentAddress: {
            countryName: 'United States',
            addressLine1: '123 At Home Dr',
            city: 'A City',
            stateCode: 'AL',
            zipCode: '91103',
          },
          studentWasMarried: true,
          marriageDate: '2012-08-08',
          tuitionIsPaidByGovAgency: true,
          agencyName: 'The Government',
          datePaymentsBegan: '2009-01-01',
        },
        studentSchoolAddress: {
          schoolInformation: {
            schoolName: 'Phoenix Online',
            trainingProgram: 'Marine Biology',
            schoolAddress: {
              countryName: 'United States',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
          },
        },
        studentTermDates: {
          termDates: {
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
            schoolName: 'Argosy',
            schoolAddress: {
              countryName: 'United States',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
            dateTermBegan: '2010-01-01',
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
          networthInformation: {
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
          studentFullName: {
            first: 'John',
            last: 'Doe',
          },
          studentSSN: '123121234',
          studentDOB: '2010-01-04',
        },
        studentAddressMarriageTuition: {
          studentAddress: {
            countryName: 'United States',
            addressLine1: '123 At Home Dr',
            city: 'A City',
            stateCode: 'AL',
            zipCode: '91103',
          },
        },
        studentSchoolAddress: {
          schoolInformation: {
            schoolName: 'Phoenix Online',
            trainingProgram: 'Marine Biology',
            schoolAddress: {
              countryName: 'United States',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
          },
        },
        studentTermDates: {
          termDates: {
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
            schoolName: 'Argosy',
            schoolAddress: {
              countryName: 'United States',
              addressLine1: '123 At Home Dr',
              city: 'A City',
              stateCode: 'AL',
              zipCode: '91103',
            },
            dateTermBegan: '2010-01-01',
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
    'veteranInformation.veteranInformation.veteranFullName',
    'addSpouse.spouseNameInformation.spouseFullName',
    'reportDivorce.formerSpouseName',
    'reportChildMarriage.marriedChildName',
    'reportChildStoppedAttendingSchool.childNoLongerAtSchoolName',
    'report674.studentNameAndSSN.studentFullName',
  ]);
  sharedTests.runTest('ssn', [
    'veteranInformation.veteranInformation.ssn',
    'addSpouse.spouseNameInformation.spouseSSN',
    'report674.studentNameAndSSN.studentSSN',
  ]);
  sharedTests.runTest('date', [
    'veteranInformation.veteranInformation.birthDate',
    'addSpouse.spouseNameInformation.spouseDOB',
    'addSpouse.currentMarriageInformation.dateOfMarriage',
    'reportDivorce.dateOfDivorce',
    'reportChildMarriage.dateChildMarried',
    'reportChildStoppedAttendingSchool.dateChildLeftSchool',
    'report674.studentNameAndSSN.studentDOB',
    'report674.studentAddressMarriageTuition.marriageDate',
    'report674.studentAddressMarriageTuition.datePaymentsBegan',
    'report674.studentTermDates.termDates.officialSchoolStartDate',
    'report674.studentTermDates.termDates.expectedStudentStartDate',
    'report674.studentTermDates.termDates.expectedGraduationDate',
    'report674.studentLastTerm.lastTermSchoolInformation.dateTermBegan',
    'report674.studentLastTerm.lastTermSchoolInformation.dateTermEnded',
  ]);
  sharedTests.runTest('phone', ['veteranInformation.veteranAddress.phoneNumber']);
  sharedTests.runTest('email', ['veteranInformation.veteranAddress.emailAddress']);

  // Current Marriage
  schemaTestHelper.testValidAndInvalid('addSpouse.spouseNameInformation.isSpouseVeteran', testData.boolean);
  schemaTestHelper.testValidAndInvalid('addSpouse.currentMarriageInformation.marriageType', testData.marriageTypes);
  schemaTestHelper.testValidAndInvalid('addSpouse.doesLiveWithSpouse.spouseDoesLiveWithVeteran', testData.boolean);
  schemaTestHelper.testValidAndInvalid('addSpouse.spouseMarriageHistory.spouseWasMarriedBefore', testData.boolean);
  schemaTestHelper.testValidAndInvalid('addSpouse.veteranMarriageHistory.veteranWasMarriedBefore', testData.boolean);
  schemaTestHelper.testValidAndInvalid(
    'addSpouse.currentMarriageInformation.locationOfMarriage',
    testData.genericLocation,
  );

  // Report Divorce
  schemaTestHelper.testValidAndInvalid('reportDivorce.isMarriageAnnulledOrVoid', testData.boolean);
  schemaTestHelper.testValidAndInvalid('reportDivorce.locationOfDivorce', testData.genericLocation);

  // Deceased Dependents
  schemaTestHelper.testValidAndInvalid('deceasedDependents', testData.deceasedDependent);

  // Report stepchild not in household
  schemaTestHelper.testValidAndInvalid('reportStepchildNotInHousehold', testData.stepChildNotInHousehold);

  // 674
  schemaTestHelper.testValidAndInvalid('report674', testData.report674);
});

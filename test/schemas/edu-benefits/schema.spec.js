import SchemaTestHelper from '../../support/schema-test-helper';
import { eduBenefits as schema } from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

let schemaTestHelper = new SchemaTestHelper(
  schema,
  {
    privacyAgreementAccepted: true
  }
);
let sharedTests = new SharedTests(schemaTestHelper);

describe('education benefits json schema', () => {
  const validDateRange = {
    from: '2000-01-01',
    to: '2000-01-02'
  };

  [
    'ssn',
    'fullName',
    'gender',
    'bankAccount',
    'date',
    'email'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('address', ['veteranAddress', 'secondaryContact.address', 'school.address']);

  sharedTests.runTest('phone', ['homePhone', 'mobilePhone', 'secondaryContact.phone']);

  context('serviceAcademyGraduationYear validations', () => {
    schemaTestHelper.testValidAndInvalid('serviceAcademyGraduationYear', {
      valid: [2004],
      invalid: [1899]
    });
  });

  context('dateRange validations', () => {
    schemaTestHelper.testValidAndInvalid('activeDutyRepayingPeriod', {
      valid: [
        validDateRange,
        {
          from: '2000-01-01',
          to: '2001-03-30'
        },
        {
          from: '2000-01-01'
        }
      ],
      invalid: [
        {
          from: 'foo',
          to: 'bar'
        },
        {
          from: '2000-01-01',
          to: 'future'
        },
      ]
    });
  });

  context('tours of duty validation', () => {
    schemaTestHelper.testValidAndInvalid('toursOfDuty', {
      valid: [[{
        dateRange: validDateRange,
        serviceBranch: 'navy',
        serviceStatus: 'active',
        benefitsToApplyTo: 'chapter30'
      }]],
      invalid: [
        [{
          serviceBranch: 'navy',
          serviceStatus: 'active',
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 1,
          serviceStatus: 'active',
        }],
        [{
          dateRange: validDateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          benefitsToApplyTo: ['chapter85968568']
        },
        {
          dateRange: validDateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          involuntarilyCalledToDuty: 'yes',
          benefitsToApplyTo: 'chapter30'
        }]
      ],
    });
  });

  context('post high school trainings validation', () => {
    schemaTestHelper.testValidAndInvalid('postHighSchoolTrainings', {
      valid: [[{
        name: 'college',
        dateRange: validDateRange,
        city: 'new york',
        hoursType: 'semester',
        state: 'NY'
      }]],
      invalid: [
        [{
          name: 'college',
          dateRange: {},
          city: 'new york',
          hoursType: 'semester',
          state: 'ABC'
        }]
      ]
    });
  });

  context('non military jobs validation', () => {
    schemaTestHelper.testValidAndInvalid('nonMilitaryJobs', {
      valid: [[{
        name: 'president',
        months: 9999,
        postMilitaryJob: true
      }]],
      invalid: [[{
        postMilitaryJob: true,
        months: 'a'
      }]]
    });
  });

  context('senior rotc validation', () => {
    schemaTestHelper.testValidAndInvalid('seniorRotc', {
      valid: [{
        commissionYear: 1981,
        rotcScholarshipAmounts: [{
          year: 1999,
          amount: 99.99
        }]
      }],
      invalid: [{
        commissionYear: 1981
      }]
    });
  });

  context('preferredContactMethod validation', () => {
    schemaTestHelper.testValidAndInvalid('preferredContactMethod', {
      valid: [
        'mail',
        'email'
      ],
      invalid: ['foo']
    });
  });

  context('benefitsRelinquished validation', () => {
    schemaTestHelper.testValidAndInvalid('benefitsRelinquished', {
      valid: ['chapter30', 'unknown', 'chapter1607', 'chapter1606'],
      invalid: ['chapter33']
    });
  });

  context('serviceBefore1977 validation', () => {
    schemaTestHelper.testValidAndInvalid('serviceBefore1977', {
      valid: [{
        married: true,
        haveDependents: true,
        parentDependent: false
      }],
      invalid: [{
        married: true
      }]
    });
  });

  context('school validation', () => {
    schemaTestHelper.testValidAndInvalid('school', {
      valid: [{
        name: 'harvard'
      }],
      invalid: [{
        name: true
      }]
    });
  });
});

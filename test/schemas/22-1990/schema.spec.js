import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['22-1990'];

let schemaTestHelper = new SchemaTestHelper(
  schema,
  {
    privacyAgreementAccepted: true,
    veteranFullName: {
      first: 'a',
      last: 'b'
    }
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
    'email',
    'school',
    'postHighSchoolTrainings',
    'educationType',
    'nonMilitaryJobs',
    'secondaryContact',
    'toursOfDuty'
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
  
  context('currentlyActiveDuty', () => {
    schemaTestHelper.testValidAndInvalid('currentlyActiveDuty', {
      valid: [{
        yes: true,
        onTerminalLeave: true
      }],
      invalid: [{
        yes: 1
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
});

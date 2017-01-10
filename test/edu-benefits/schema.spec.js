import SchemaTestHelper from '../support/schema-test-helper';
import { eduBenefits as schema } from '../../dist/schemas';
let schemaTestHelper = new SchemaTestHelper(schema);

describe('education benefits json schema', () => {
  const validDateRange = {
    from: '2000-01-01',
    to: '2000-01-02'
  };

  context('ssn validations', () => {
    schemaTestHelper.testValidAndInvalid('veteranSocialSecurityNumber', {
      valid: ['123456789'],
      invalid: ['123-45-6789', '12345678']
    });
  });

  context('name validations', () => {
    ['veteranFullName'].forEach((parentKey) => {
      schemaTestHelper.testValidAndInvalid(parentKey, {
        valid: [{
          first: 'john',
          last: 'doe'
        }],
        invalid: [{
          first: 'john'
        }]
      });
    });
  });

  context('gender validations', () => {
    schemaTestHelper.testValidAndInvalid('gender', {
      valid: ['M', 'F'],
      invalid: ['Z']
    });
  });

  context('address validations', () => {
    ['veteranAddress', 'secondaryContact.address', 'school.address'].forEach((parentKey) => {
      schemaTestHelper.testValidAndInvalid(parentKey, {
        valid: [{
          street: '123 a rd',
          city: 'abc',
          country: 'USA'
        }],
        invalid: [{
          city: 'foo',
          country: 'USA'
        }]
      });
    });
  });

  context('phone # validations', () => {
    ['homePhone', 'mobilePhone', 'secondaryContact.phone'].forEach((parentKey) => {
      schemaTestHelper.testValidAndInvalid(parentKey, {
        valid: ['5555555555', '555-555-5555', '555 555 5555'],
        invalid: ['1234']
      });
    });
  });

  context('bank account validations', () => {
    schemaTestHelper.testValidAndInvalid('bankAccount.accountType', {
      valid: ['checking', 'savings'],
      invalid: ['bitcoin']
    });

    schemaTestHelper.testValidAndInvalid('bankAccount.routingNumber', {
      valid: ['123456789'],
      invalid: ['12345678']
    });
  });

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
          to: 'present'
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

  context('date validations', () => {
    schemaTestHelper.testValidAndInvalid('veteranDateOfBirth', {
      valid: [
        '2000-01-02',
        '2000-01-31',
        '2000-11-02',
        '2000-11-25',
        'XXXX-11-25',
        'XXXX-XX-25',
        '2001-11-XX',
        '2001-XX-01'
      ],
      invalid: [
        '4/6/1998',
        'Fri Aug 19 2016 15:09:46 GMT-0400 (EDT)',
        '2000-1-02',
        '2000-13-01',
        '2000-12-32',
        '2000-12-00',
        '2000-00-01',
        '2000-01-9'
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

  context('email validation', () => {
    schemaTestHelper.testValidAndInvalid('email', {
      valid: [
        'foo@foo.com',
        'foo+1@foo.com'
      ],
      invalid: ['foo']
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

import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';
import { expect } from 'chai';

const schema = schemas['21P-527EZ'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-527 schema', () => {
  [
    'maritalStatus',
    'gender'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal(['privacyAgreementAccepted', 'veteranFullName', 'veteranAddress']);
  });

  sharedTests.runTest('usaPhone', ['dayPhone', 'nightPhone', 'mobilePhone', 'nationalGuard.phone']);

  sharedTests.runTest('email', ['email', 'altEmail']);

  sharedTests.runTest('fullName', ['veteranFullName']);

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'spouseSocialSecurityNumber']);

  sharedTests.runTest('dateRange', ['powDateRange']);

  sharedTests.runTest('vaFileNumber', ['vaFileNumber', 'spouseVaFileNumber']);

  sharedTests.runTest('address', ['spouseAddress']);

  sharedTests.runTest('centralMailAddress', ['veteranAddress']);

  sharedTests.runTest('marriages', ['marriages', 'spouseMarriages']);

  sharedTests.runTest('files', ['files']);

  ['spouseDateOfBirth', 'veteranDateOfBirth', 'nationalGuard.date'].forEach((field) => {
    schemaTestHelper.testValidAndInvalid(field, {
      valid: ['1990-01-01'],
      invalid: ['1/1/1990']
    })
  });

  schemaTestHelper.testValidAndInvalid('dependents', {
    valid: [[{
      fullName: fixtures.fullName,
      childDateOfBirth: fixtures.date,
      childPlaceOfBirth: 'ny, ny',
      childSocialSecurityNumber: fixtures.ssn,
      childRelationship: 'adopted',
      attendingCollege: true,
      disabled: true,
      married: true,
      previouslyMarried: true,
      childFullName: fixtures.fullName,
      childInHousehold: true,
      childAddress: fixtures.address,
      personWhoLivesWithChild: fixtures.fullName,
      monthlyPayment: 1,
      monthlyIncome: {
        socialSecurity: 1,
        railroad: 1,
        blackLung: 0,
        serviceRetirement: 0,
        civilService: 5,
        ssi: 1,
        additionalSources: [{
          name: 'Something',
          amount: 1
        }]
      },
      netWorth: {
        bank: 2,
        ira: 2,
        stocks: 2,
        interestBank: 2,
        realProperty: 123
      }
    }]],
    invalid: [[{
      fullName: 1,
      monthlyIncome: {
        civilService: 'what'
      },
      netWorth: {
        additionalSources: [{
          name: 1
        }]
      }
    }],
      [{
        netWorth: {
          additionalSources: [{}]
        }
      }]]
  });

  schemaTestHelper.testValidAndInvalid('bankAccount', {
    valid: [{
      accountType: 'checking',
      routingNumber: '123456789',
      bankName: 'foo',
      accountNumber: '1234'
    }],
    invalid: [{
      bankName: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('previousNames', {
    valid: [[fixtures.fullName, fixtures.fullName]],
    invalid: [[false]]
  });

  schemaTestHelper.testValidAndInvalid('disabilities', {
    valid: [[{
      name: 'polio',
      disabilityStartDate: fixtures.date
    }]],
    invalid: [[{
      name: false
    }]]
  });

  schemaTestHelper.testValidAndInvalid('jobs', {
    valid: [[{
      employer: 'foo corp',
      address: fixtures.address,
      jobTitle: 'analyst',
      dateRange: fixtures.dateRange,
      daysMissed: '1 month',
      annualEarnings: 12
    }]],
    invalid: [[{
      employer: 1
    }]]
  });

  schemaTestHelper.testValidAndInvalid('servicePeriods', {
    valid: [[{
      activeServiceDateRange: fixtures.dateRange,
      serviceBranch: 'Army'
    }]],
    invalid: [[{
      activeServiceDateRange: fixtures.dateRange,
      serviceBranch: 3
    }]]
  });

  schemaTestHelper.testValidAndInvalid('vamcTreatmentCenters', {
    valid: [[{
      location: 'Maryland'
    }]],
    invalid: [[{
      location: 3
    }]]
  });

  schemaTestHelper.testValidAndInvalid('expectedIncome', {
    valid: [{
      salary: 1,
      interest: 2,
      additionalSources: [fixtures.otherIncome]
    }],
    invalid: [{
      salary: true
    }]
  });

  schemaTestHelper.testValidAndInvalid('monthlyIncome',{
    valid: [{
      relationshipAndChildName: fixtures.relationshipAndChildName,
      socialSecurity: 1,
      civilService: 1,
      railroad: 0,
      serviceRetirement: 0,
      blackLung: 0,
      ssi: 1,
      otherIncome: fixtures.otherIncome
    }],
    invalid: [[{
      ssi: false
    }]]
  });

  schemaTestHelper.testValidAndInvalid('nationalGuard',{
    valid: [{
      name: 'unit 123',
      address: fixtures.address,
      phone: '0123456789',
      date: fixtures.date
    }],
    invalid: [[{
      name: false
    }]]
  });

  schemaTestHelper.testValidAndInvalid('severancePay',{
    valid: [{
      amount: 123,
      type: 'Longevity'
    }],
    invalid: [[{
      amount: false
    }]]
  });

  ['otherExpenses', 'spouseOtherExpenses']
    .forEach(field => {
      schemaTestHelper.testValidAndInvalid(field, {
        valid: [[{
          amount: 1,
          date: fixtures.date,
          purpose: 'doctor',
          paidTo: 'doctor'
        }]],
        invalid: [[{
          amount: false
        }]]
      });
    });
});

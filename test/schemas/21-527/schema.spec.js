import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21-527'];

let schemaTestHelper = new SchemaTestHelper(schema);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-527 schema', () => {
  [
    'email',
    'maritalStatus',
    'bankAccount'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['veteranFullName', 'spouseFullName']);

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'spouseSocialSecurityNumber']);

  sharedTests.runTest('phone', ['dayPhone', 'nightPhone', 'mobilePhone']);

  sharedTests.runTest('date', ['dateOfMarriage', 'spouseDateOfBirth']);

  sharedTests.runTest('vaFileNumber', ['vaFileNumber', 'spouseVaFileNumber']);

  sharedTests.runTest('address', ['veteranAddress', 'spouseAddress']);

  sharedTests.runTest('marriages', ['marriages', 'spouseMarriages']);

  sharedTests.runTest('moneyTransfer', ['recentMoneyTransfer', 'largeMoneyTransfer']);

  schemaTestHelper.testValidAndInvalid('children', {
    valid: [[{
      childFullName: fixtures.fullName,
      childDateOfBirth: fixtures.date,
      childPlaceOfBirth: 'ny, ny',
      childSocialSecurityNumber: fixtures.ssn,
      biological: true,
      adopted: true,
      stepchild: true,
      attendingCollege: true,
      disabled: true,
      previouslyMarried: true,
      childFullName: fixtures.fullName,
      childAddress: fixtures.address,
      personWhoLivesWithChild: fixtures.fullName,
      monthlyPayment: 1,
      monthlyIncome: {
        socialSecurity: 1,
        railroad: 1,
        blackLunk: 0,
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
        business: 2,
        realProperty: 123,
        otherProperty: 12
      }
    }]],
    invalid: [[{
      childFullName: 1,
      monthlyIncome: {
        civilService: 'what'
      },
      netWorth: {
        additionalSources: [{
          name: 1
        }]
      }
    }]]
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

  schemaTestHelper.testValidAndInvalid('hospitalizations', {
    valid: [[{
      dateRange: fixtures.dateRange,
      facilityName: 'foo hospital',
      address: fixtures.address
    }]],
    invalid: [[{
      dateRange: false
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

  schemaTestHelper.testValidAndInvalid('highestEducationLevel', {
    valid: ['grade1', 'grade12', 'college1', 'college4', 'college4+'],
    invalid: ['grade0', 'grade13', 'college0', 'college5']
  });

  schemaTestHelper.testValidAndInvalid('monthlyIncome',{
    valid: [{
      relationshipAndChildName: fixtures.relationshipAndChildName,
      socialSecurity: 1,
      civilService: 1,
      railroad: 0,
      military: 0,
      blackLung: 0,
      ssi: 1,
      otherIncome: fixtures.otherIncome
    }],
    invalid: [[{
      ssi: false
    }]]
  });

  schemaTestHelper.testValidAndInvalid('annualIncome', {
    valid: [[{
      relationshipAndChildName: fixtures.relationshipAndChildName,
      otherIncome: fixtures.otherIncome,
      interest: 1,
      workersComp: 2
    }]],
    invalid: [[{
      interest: false
    }]]
  });

  schemaTestHelper.testValidAndInvalid('otherExpenses', {
    valid: [[{
      amount: 1,
      date: fixtures.date,
      purpose: 'doctor',
      paidTo: 'doctor',
      disabilityOrRelationship: 'disability'
    }]],
    invalid: [[{
      amount: false
    }]]
  });
});

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

  schemaTestHelper.testValidAndInvalid('childrenInHousehold', {
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
      previouslyMarried: true
    }]],
    invalid: [[{
      childFullName: 1
    }]]
  });

  schemaTestHelper.testValidAndInvalid('childrenNotInHousehold', {
    valid: [[{
      childFullName: fixtures.fullName,
      childAddress: fixtures.address,
      personWhoLivesWithChild: fixtures.fullName,
      monthlyPayment: 1
    }]],
    invalid: [[{
      childFullName: 1
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
    valid: [[{
      relationshipAndChildName: fixtures.relationshipAndChildName,
      salary: 1,
      socialSecurity: 1,
      civilService: 1,
      railroad: 0,
      military: 0,
      blackLung: 0,
      ssi: 1,
      otherIncome: fixtures.otherIncome
    }]],
    invalid: [[{
      salary: false
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

  schemaTestHelper.testValidAndInvalid('netWorth', {
    valid: [[{
      relationshipAndChildName: fixtures.relationshipAndChildName,
      netWorthAccounts: {
        bank: fixtures.netWorthAccount,
        ira: fixtures.netWorthAccount,
        stocks: fixtures.netWorthAccount,
        business: fixtures.netWorthAccount,
        realProperty: 123,
        otherProperty: 12
      }
    }]],
    invalid: [[{
      netWorthAccounts: {
        realProperty: false
      }
    }]]
  });
});

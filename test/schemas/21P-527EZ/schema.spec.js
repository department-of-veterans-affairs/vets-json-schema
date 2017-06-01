import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21P-527EZ'];

let schemaTestHelper = new SchemaTestHelper(schema);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-527 schema', () => {
  [
    'maritalStatus',
    'gender',
    'bankAccount'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('email', ['email', 'altEmail']);

  sharedTests.runTest('fullName', ['veteranFullName']);

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'spouseSocialSecurityNumber']);

  sharedTests.runTest('date', ['spouseDateOfBirth', 'veteranDateOfBirth', 'activationDate']);

  sharedTests.runTest('dateRange', ['activeServiceDateRange', 'powDateRange']);

  sharedTests.runTest('vaFileNumber', ['vaFileNumber', 'spouseVaFileNumber']);

  sharedTests.runTest('address', ['veteranAddress', 'spouseAddress']);

  sharedTests.runTest('marriages', ['marriages', 'spouseMarriages']);

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
      married: true,
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

  ['dayPhone', 'nightPhone', 'mobilePhone', 'nationalGuard.phone'].forEach(attr => {
    schemaTestHelper.testValidAndInvalid(attr, {
      valid: ['0123456789'],
      invalid: ['012345678x', '01234567899', '012345678']
    });
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

  schemaTestHelper.testValidAndInvalid('vaHospitalTreatments', {
    valid: [[{
      dates: [fixtures.date, fixtures.date],
      facilityName: 'foo hospital',
      location: 'atlanta'
    }]],
    invalid: [[{
      dates: false
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

  schemaTestHelper.testValidAndInvalid('nationalGuard',{
    valid: [{
      name: 'unit 123',
      address: fixtures.address,
      phone: '0123456789'
    }],
    invalid: [[{
      name: false
    }]]
  });

  schemaTestHelper.testValidAndInvalid('severancePay',{
    valid: [{
      amount: 123,
      type: 'cash'
    }],
    invalid: [[{
      amount: false
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

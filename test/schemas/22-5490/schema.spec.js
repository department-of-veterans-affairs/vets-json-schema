import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['22-5490'];

const schemaDefaults = {
  privacyAgreementAccepted: true,
  relativeFullName: {
    first: 'a',
    last: 'b'
  }
};

let schemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('dependents benefits schema', () => {
  [
    'gender',
    'phone',
    'email',
    'bankAccount',
    'secondaryContact',
    'vaFileNumber',
    'educationProgram',
    'relationship',
    'postHighSchoolTrainings',
    'nonMilitaryJobs',
    'preferredContactMethod'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['relativeFullName', 'veteranFullName', 'previousBenefits.veteranFullName']);

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber', 'veteranSocialSecurityNumber', 'previousBenefits.veteranSocialSecurityNumber']);

  sharedTests.runTest('date', ['relativeDateOfBirth', 'veteranDateOfBirth', 'veteranDateOfDeath', 'educationStartDate', 'benefitsRelinquishedDate', 'highSchool.highSchoolOrGedCompletionDate']);

  sharedTests.runTest('address', ['relativeAddress', 'educationProgram.address']);

  schemaTestHelper.testValidAndInvalid('educationProgram.educationType', {
    valid: ['farmCoop'],
    invalid: ['cooperativeTraining']
  });

  schemaTestHelper.testValidAndInvalid('educationProgram', {
    valid: [{
      name: 'school name',
      address: fixtures.address,
      educationType: 'college'
    }],
    invalid: [{
      name: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('spouseInfo', {
    valid: [{
      divorcePending: true,
      remarried: true,
      remarriageDate: fixtures.date
    }],
    invalid: [{
      divorcePending: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('benefit', {
    valid: ['chapter35'],
    invalid: ['chapter32']
  });

  schemaTestHelper.testValidAndInvalid('previousBenefits', {
    valid: [{
      disability: true,
      ownServiceBenefits: 'chapter32',
      transferOfEntitlement: true
    }],
    invalid: [{
      disability: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('toursOfDuty', {
    valid: [[{
      dateRange: fixtures.dateRange,
      serviceBranch: 'Army',
      serviceStatus: 'Honorable',
      applyPeriodToSelected: true
    }]],
    invalid: [[{
      dateRange: 'foo'
    }]]
  });

  schemaTestHelper.testValidAndInvalid('highSchool.status', {
    valid: ['graduated', 'ged'],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('highSchool', {
    valid: [{
      name: 'ps1',
      dateRange: fixtures.dateRange,
      city: 'new york',
      hoursType: 'semester',
      state: 'NY'
    }],
    invalid: [{
      name: 1
    }]
  });
});

import SchemaTestHelper from '../../support/schema-test-helper';
import { dependentsBenefits as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schemaDefaults = {
  privacyAgreementAccepted: true
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
    'toursOfDuty',
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

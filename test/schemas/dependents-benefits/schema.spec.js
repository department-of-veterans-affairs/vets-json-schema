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

describe('transfer benefits schema', () => {
  [
    'gender',
    'phone',
    'email',
    'bankAccount',
    'secondaryContact',
    'vaFileNumber',
    'educationType',
    'school',
    'relationship',
    'toursOfDuty',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['relativeFullName', 'veteranFullName', 'previousBenefits.veteranFullName']);

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber', 'veteranSocialSecurityNumber', 'previousBenefits.veteranSocialSecurityNumber']);

  sharedTests.runTest('date', ['relativeDateOfBirth', 'veteranDateOfBirth', 'veteranDateOfDeath', 'educationStartDate', 'benefitsRelinquishedDate']);

  sharedTests.runTest('address', ['relativeAddress']);

  schemaTestHelper.testValidAndInvalid('trainingState', {
    valid: ['DC', 'VA'],
    invalid: ['XX']
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

  schemaTestHelper.testValidAndInvalid('highSchoolStatus', {
    valid: ['graduated', 'ged'],
    invalid: ['foo']
  });
});

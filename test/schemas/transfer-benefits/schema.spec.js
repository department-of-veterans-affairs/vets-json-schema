import SchemaTestHelper from '../../support/schema-test-helper';
import { transferBenefits as schema } from '../../../dist/schemas';
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
    'educationType',
    'school',
    'postHighSchoolTrainings',
    'nonMilitaryJobs'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber', 'veteranSocialSecurityNumber']);

  sharedTests.runTest('fullName', ['relativeFullName']);

  sharedTests.runTest('address', ['relativeAddress']);

  sharedTests.runTest('date', ['relativeDateOfBirth', 'highSchoolOrGedCompletionDate']);

  schemaTestHelper.testValidAndInvalid('benefit', {
    valid: ['chapter33'],
    invalid: ['foo']
  });
});

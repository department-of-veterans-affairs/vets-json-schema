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
    'fullName',
    'address',
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

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber']);

  sharedTests.runTest('date', ['veteranDateOfBirth', 'highSchoolOrGedCompletionDate']);

  schemaTestHelper.testValidAndInvalid('benefit', {
    valid: ['chapter33'],
    invalid: ['foo']
  });
});

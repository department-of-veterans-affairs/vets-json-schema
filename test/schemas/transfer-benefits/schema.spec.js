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
    'ssn',
    'gender',
    'fullName',
    'address',
    'phone',
    'email',
    'bankAccount'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('date', ['veteranDateOfBirth', 'highSchoolOrGedCompletionDate']);
});

import SchemaTestHelper from '../../support/schema-test-helper';
import { ncsBenefits as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('ncs benefits schema', () => {
  [
    'gender',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber']);

  sharedTests.runTest('date', ['veteranDateOfBirth']);

  sharedTests.runTest('fullName', ['veteranFullName']);

  sharedTests.runTest('address', ['veteranAddress']);
});

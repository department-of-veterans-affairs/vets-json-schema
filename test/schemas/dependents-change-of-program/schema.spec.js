import SchemaTestHelper from '../../support/schema-test-helper';
import { dependentsChangeOfProgram as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('dependents change of program schema', () => {
  [
    'vaFileNumber',
    'gender',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['relativeFullName']);

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber']);

  sharedTests.runTest('date', ['relativeDateOfBirth']);
});

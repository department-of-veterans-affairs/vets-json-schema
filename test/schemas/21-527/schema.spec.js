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
});

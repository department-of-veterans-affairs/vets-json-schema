import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';
import { expect } from 'chai';

const schema = schemas['21-686C'];

let schemaTestHelper = new SchemaTestHelper(schema);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-686C schema', () => {
  sharedTests.runTest('fullName', ['veteranFullName', 'claimantFullName']);
  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'claimantSocialSecurityNumber', 'spouseSocialSecurityNumber']);
  sharedTests.runTest('vaFileNumber');
  sharedTests.runTest('address', ['claimantAddress', 'spouseAddress']);
  sharedTests.runTest('email', ['claimantEmail']);
  sharedTests.runTest('maritalStatus');
  sharedTests.runTest('date', ['spouseDateOfBirth']);
  sharedTests.runTest('marriages', ['marriages', 'spouseMarriages']);
});

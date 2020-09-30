import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['5655'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

describe('5655 schema', () => {
  sharedTests.runTest('fullName', ['personalData.veteranFullName', 'personalData.spouseFullName']);
  sharedTests.runTest('address', ['personalData.veteranAddress']);
  sharedTests.runTest('phone', ['personalData.phoneNumber']);
});
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['VYE-ADDRESS-CHANGE'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper)

describe('VYE address change', () => {
  sharedTests.runTest('address', ['veteranAddress']);
});

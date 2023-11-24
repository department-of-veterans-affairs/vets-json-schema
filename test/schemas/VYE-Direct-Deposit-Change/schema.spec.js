import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['VYE-DIRECT-DEPOSIT-CHANGE'];

let schemaTestHelper = new SchemaTestHelper(schema);
let sharedTests = new SharedTests(schemaTestHelper);

describe('VYE direct deposit change', () => {
  [
    'bankAccount',
    'usaPhone'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });
});

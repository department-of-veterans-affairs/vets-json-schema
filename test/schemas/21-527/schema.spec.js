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
    'fullName',
    'ssn',
    'vaFileNumber',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });
});

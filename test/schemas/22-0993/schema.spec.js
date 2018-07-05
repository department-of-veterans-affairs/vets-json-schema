import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';
import _ from 'lodash';

const schema = schemas['22-0993'];

const schemaDefaults = {
  privacyAgreementAccepted: true,
  veteranFullName: {
    first: 'bob',
    last: 'smith'
  }
};

let schemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'), schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('Colmery Act Opt-Out json schema', () => {
  sharedTests.runTest('vaFileNumber');
  sharedTests.runTest('fullName', ['veteranFullName']);
  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber']);
  (new SharedTests(new SchemaTestHelper(schema, schemaDefaults))).requireSsnOrFile();
});

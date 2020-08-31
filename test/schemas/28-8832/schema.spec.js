import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['28-8832'];

const schemaTestHelper = new SchemaTestHelper(schema, {
  privacyAgreementAccepted: true,
});
const sharedTests = new SharedTests(schemaTestHelper);

describe('disabled veterans vocational rehabilitation schema', () => {
  [['ssn', ['dependentInformation.dependentInformation.ssn']]].forEach(args => {
    sharedTests.runTest(...args);
  });
});

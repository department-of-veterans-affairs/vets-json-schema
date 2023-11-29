import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['VYE-DIRECT-DEPOSIT-CHANGE'];

const schemaTestHelper = new SchemaTestHelper(schema,{
  bankName: "Test Name",
  bankAccount: { accountType: 'checking', routingNumber: '123123123', accountNumber: '1234' },
  bankPhone: '1231231231',
});

const sharedTests = new SharedTests(schemaTestHelper);


describe('VYE direct deposit change', () => {
  sharedTests.runTest('bankAccount', ['bankAccount']);
  sharedTests.runTest('usaPhone', ['bankPhone'])

  schemaTestHelper.testValidAndInvalid('bankName', {
    valid: ['Test Name'],
    invalid: [234],
  });
});

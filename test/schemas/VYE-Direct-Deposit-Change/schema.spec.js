import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['VYE-DIRECT-DEPOSIT-CHANGE'];

const schemaTestHelper = new SchemaTestHelper(schema,{
  fullName:'John T. Doe',
  phone:'1231231231',
  email:'test@test.com',
  acctNo: '1234',
  acctType: 'checking', 
  routingNo: '123123123', 
  bankName: "Test Name",
  bankPhone: '1231231231',
});

const sharedTests = new SharedTests(schemaTestHelper);


describe('VYE direct deposit change', () => {
  sharedTests.runTest('usaPhone', ['phone'])
  sharedTests.runTest('usaPhone', ['bankPhone'])

  schemaTestHelper.testValidAndInvalid('fullName', {
    valid: ['John T. Dow'],
    invalid: [123],
  });

  schemaTestHelper.testValidAndInvalid('email', {
    valid: ['test@test.com'],
    invalid: ['test.com'],
  });

  schemaTestHelper.testValidAndInvalid('email', {
    valid: ['test@test.com'],
    invalid: ['test@com'],
  });

  schemaTestHelper.testValidAndInvalid('acctNo', {
    valid: ['1234'],
    invalid: ['12345678901234567890'],
  });

  schemaTestHelper.testValidAndInvalid('acctType', {
    valid: ['checking'],
    invalid: ['stocks'],
  });

  schemaTestHelper.testValidAndInvalid('routingNo', {
    valid: ['123456789'],
    invalid: ['123'],
  });

  schemaTestHelper.testValidAndInvalid('bankName', {
    valid: ['Test Name'],
    invalid: [123],
  });
});

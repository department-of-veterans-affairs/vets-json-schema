import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['24-0296'];

const schemaTestHelper = new SchemaTestHelper(schema, {
  privacyAgreementAccepted: true,
  veteranFullName: { first: 'guy', last: 'guyson' },
  beneficiaryFullName: { first: 'guy', last: 'guyson' },
  beneficiarySSN: '123123123',
  veteranVAFileNumber: 'c11234567',
  veteranDOB: '2018-04-01',
  institutionAddress: { street: 'A', city: 'A', state: 'NC', postalCode: 'z', country: 'AUS' },
  beneficiaryAddress: { street: 'A', city: 'A', state: 'NC', postalCode: 'z', country: 'USA' },
  institutionName: 'Blech',
  institutionAccount: { accountType: 'checking', routingNumber: '123123123', accountNumber: 'blech1234' },
  institutionPhone: '1231231231',
  benefitType: 'blech',
  beneficiaryAddressIsNew: false,
  payeePhone: '1231231234',
});

const sharedTests = new SharedTests(schemaTestHelper);

describe('24-0296 DIRECT DEPOSIT ENROLLMENT', () => {
  sharedTests.runTest('fullName', ['veteranFullName', 'beneficiaryFullName']);
  sharedTests.runTest('ssn', ['veteranSSN', 'beneficiarySSN']);
  sharedTests.runTest('vaFileNumber', ['veteranVAFileNumber', 'beneficiaryVAFileNumber']);
  sharedTests.runTest('date', ['veteranDOB']);
  sharedTests.runTest('address', ['beneficiaryAddress', 'institutionAddress']);
  sharedTests.runTest('bankAccount', ['institutionAccount']);
  sharedTests.runTest('phone', ['institutionPhone', 'payeePhone']);

  schemaTestHelper.testValidAndInvalid('institutionName', {
    valid: ['Let Us Have Your Money, Inc.'],
    invalid: [3],
  });

  schemaTestHelper.testValidAndInvalid('benefitType', {
    valid: ['Something Promised'],
    invalid: [101],
  });

  schemaTestHelper.testValidAndInvalid('beneficiaryAddressIsNew', {
    valid: [true],
    invalid: ['buffalo'],
  });
});

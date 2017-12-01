import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['28-1900'];

let schemaTestHelper = new SchemaTestHelper(
  schema,
  {
    privacyAgreementAccepted: true
  }
);
let sharedTests = new SharedTests(schemaTestHelper);

describe('disabled veterans vocational rehabilitation schema', () => {
  [
    ['fullName', ['veteranFullName']],
    ['ssn', ['veteranSocialSecurityNumber']],
    ['date', ['veteranDateOfBirth']],
    ['address', ['veteranAddress', 'newVeteranAddress', 'employerAddress', 'hospitalAddress']],
    ['phone', ['homePhone', 'mobilePhone']],
    ['email'],
    ['vaFileNumber'],
    ['serviceHistory']
  ].forEach((args) => {
    sharedTests.runTest(...args); 
  });
});
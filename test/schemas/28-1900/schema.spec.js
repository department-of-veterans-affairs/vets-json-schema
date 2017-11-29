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

describe('educational/vocational counseling schema', () => {
  [
    ['fullName', ['veteranFullName']],
    ['ssn', ['veteranSocialSecurityNumber']],
    ['date', ['veteranDateOfBirth']],
    ['address', ['veteranAddress', 'newVeteranAddress', 'employerAddress', 'hospitalAddress']],
    ['phone', ['homePhone', 'mobilePhone']],
    ['email'],
  ].forEach((args) => {
    sharedTests.runTest(...args); 
  });
});
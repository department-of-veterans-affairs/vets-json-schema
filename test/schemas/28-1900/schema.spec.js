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
    ['phone', ['daytimePhone', 'eveningPhone']],
    ['email'],
    ['vaFileNumber', ['veteranVaFileNumber']],
    ['serviceHistory']
  ].forEach((args) => {
    sharedTests.runTest(...args);
  });
});

schemaTestHelper.testValidAndInvalid('jobDuties', {
  valid: ['duties'],
  invalid: [1]
});

schemaTestHelper.testValidAndInvalid('employer', {
  valid: ['foo corp'],
  invalid: [1]
});

schemaTestHelper.testValidAndInvalid('disabilityRating', {
  valid: [10],
  invalid: [15]
});

schemaTestHelper.testValidAndInvalid('disabilities', {
  valid: ['Back ache'],
  invalid: [1]
});

schemaTestHelper.testValidAndInvalid('dischargeDocuments', {
  valid: [[{
    name: 'test',
    size: 40,
    confirmationCode: 'testcode'
  }]],
  invalid: [[]]
});

schemaTestHelper.testValidAndInvalid('serviceHistory', {
  valid: [[{
    serviceBranch: 'branch',
    dischargeType: 'honorable',
    from: '1980-12-01',
    to: '1981-12-01'
  }]],
  invalid: [[]]
});

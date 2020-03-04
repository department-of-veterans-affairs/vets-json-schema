import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['MDOT'];

let schemaTestHelper = new SchemaTestHelper(
  schema,
  {
    privacyAgreementAccepted: true
  }
);

let sharedTests = new SharedTests(schemaTestHelper);

describe('mdot schema', () => {
  sharedTests.runTest('email');

  let tests = {
    fullName: ['fullName'],
    address: ['veteranAddress']
  };

  for (let test in tests) { 
    sharedTests.runTest(`${test}`, tests[test]) 
  };

  schemaTestHelper.testValidAndInvalid('dateOfBirth', {
    valid: [
      '2000-12-12'
    ],
    invalid: [
      '01-01-2000',
      '01/01/2000',
      '2000/01/01'
    ]
  });

  schemaTestHelper.testValidAndInvalid('gender', {
    valid: [
      'M',
      'F'
    ],
    invalid: [
      'invalid'
    ]
  });
});

import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['VIC'];

let schemaTestHelper = new SchemaTestHelper(
  schema,
  {
    privacyAgreementAccepted: true
  }
);
let sharedTests = new SharedTests(schemaTestHelper);

describe('vic schema', () => {
  [
    'email',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['veteranFullName']);
  sharedTests.runTest('address', ['veteranAddress']);
  sharedTests.runTest('phone', ['phone']);
});

schemaTestHelper.testValidAndInvalid('veteranAddress', {
  valid: [
    {
      street: '123 a rd',
      city: 'abc',
      country: 'DEU'
    },
    {
      street: '123 a rd',
      city: 'abc',
      country: 'USA',
      state: 'AA'
    },
    {
      street: '123 a rd',
      city: 'abc',
      state: '11',
      country: 'CHN'
    }
  ],
  invalid: [
    {
      street: '123 a rd',
      city: 'abc',
      state: '11',
      country: 'CHNA'
    },
    {
      street: '123 a rd',
      city: 'abc',
      state: 'beijing',
      country: 'CHN'
    }
  ]
});

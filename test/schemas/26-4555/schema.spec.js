import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';
import fixtures from '../../support/fixtures';

const schema = schemas['26-4555'];
const usAddressFixture = {
  ...fixtures.address,
  state: 'AL',
  postalCode: '54321',
};

const schemaDefaults = {
  veteran: {
    fullName: {
      first: 'Test',
      last: 'Name',
    },
    ssn: fixtures.ssn,
    address: usAddressFixture,
    homePhone: fixtures.phone,
  },
};

// need to remove any required props from schema first,
// in order for tests to work.
const schemaTestHelper = new SchemaTestHelper(
  _.omit(
    schema,
    'anyOf',
    'required',
    'properties.veteran.required',
    'properties.previousSahApplication.required',
    'properties.previousHiApplication.required',
    'properties.livingSituation.required',
  ),
  schemaDefaults,
);
const sharedTests = new SharedTests(schemaTestHelper);

describe('26-4555 Adapted Housing json-schema', () => {
  [
    ['date', ['veteran.dateOfBirth']],
    ['email', ['veteran.email']],
    ['fullName', ['veteran.fullName']],
    ['phone', ['veteran.homePhone']],
    ['ssn', ['veteran.ssn']],
    ['address', ['veteran.address']],
  ].forEach(test => {
    sharedTests.runTest(...test);
  });

  schemaTestHelper.testValidAndInvalid('previousSahApplication.hasPreviousSahApplication', {
    valid: [true, false],
    invalid: ['yes', 'no', '0', '1'],
  });

  schemaTestHelper.testValidAndInvalid('previousHiApplication.hasPreviousHiApplication', {
    valid: [true, false],
    invalid: ['yes', 'no', '0', '1'],
  });

  schemaTestHelper.testValidAndInvalid('livingSituation.isInCareFacility', {
    valid: [true, false],
    invalid: ['yes', 'no', '0', '1'],
  });
});

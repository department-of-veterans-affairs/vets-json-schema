import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';
import fixtures from '../../support/fixtures';

const schema = schemas['21-10210'];
const usAddressFixture = {
  ...fixtures.address,
  state: 'AL',
  postalCode: '54321',
};

const schemaDefaults = {
  statementInformation: {
    claimOwnership: 'self',
    claimantType: 'veteran',
  },
  nonVeteran: {
    fullName: {
      first: 'Jane',
      last: 'Doe',
    },
    phone: fixtures.phone,
    email: 'jane.doe@example.com',
    agreeToReceiveEmails: true,
  },
  veteran: {
    fullName: {
      first: 'John',
      last: 'Doe',
    },
    ssn: fixtures.ssn,
    address: usAddressFixture,
    homePhone: fixtures.phone,
    mobilePhone: fixtures.phone,
    email: 'john.doe@example.com',
  },
  statement: '[Test statement content]',
  privacyAgreementAccepted: true,
};

const testData = {
  statementInformation: {
    valid: [
      {
        claimOwnership: 'self',
        claimantType: 'veteran',
      },
      {
        claimOwnership: 'self',
        claimantType: 'non-veteran',
      },
      {
        claimOwnership: 'third-party',
        claimantType: 'non-veteran',
      },
      {
        claimOwnership: 'third-party',
        claimantType: 'veteran',
      },
    ],
    invalid: [
      {
        claimOwnership: 'my-own',
        claimantType: 'vet',
      },
      {
        claimOwnership: '',
        claimantType: '',
      },
      {
        claimOwnership: 1,
        claimantType: true,
      },
    ],
  },
  address: {
    valid: [
      {
        country: 'USA',
        street: '123 at home dr',
        street2: 'apt 1',
        city: 'a city',
        state: 'AL',
        postalCode: '12345',
      },
    ],
    invalid: [
      {
        country: 'ABC',
        street: true,
        city: null,
        state: false,
        postalCode: 12345,
      },
    ],
  },
  statement: {
    valid: [
      'This is a valid statement',
      'This is a valid statement with a number 1',
      'This is a valid statement with a number 1 and a symbol !',
    ],
    invalid: [123, true, null, '', 'This is an invalid statement with a symbol #'],
  },
};

// need to remove any required props from schema first,
// in order for tests to work.
const schemaTestHelper = new SchemaTestHelper(
  _.omit(
    schema,
    'anyOf',
    'required',
    'properties.claimInformation.required',
    'properties.nonVeteran.required',
    'properties.veteran.required',
  ),
  schemaDefaults,
);
const sharedTests = new SharedTests(schemaTestHelper);

describe('21-10210 Lay/Witness Statement json-schema', () => {
  [
    ['date', ['veteran.dateOfBirth']],
    ['email', ['veteran.email', 'nonVeteran.email']],
    ['fullName', ['veteran.fullName', 'nonVeteran.fullName']],
    ['phone', ['veteran.homePhone', 'veteran.mobilePhone', 'nonVeteran.phone']],
    ['ssn', ['veteran.ssn']],
    ['address', ['veteran.address']],
  ].forEach(test => {
    sharedTests.runTest(...test);
  });

  schemaTestHelper.testValidAndInvalid('veteran.address', testData.address);
  schemaTestHelper.testValidAndInvalid('statementInformation', testData.statementInformation);
});

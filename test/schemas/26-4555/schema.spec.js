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
  privacyAgreementAccepted: true,
  fullName: fixtures.fullName,
  ssn: fixtures.ssn,
  address: usAddressFixture,
  homePhone: fixtures.phone,
  hasPreviousSahApplication: false,
  hasPreviousHiApplication: false,
  isInCareFacility: false,
};

const schemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'), schemaDefaults);
const sharedTests = new SharedTests(schemaTestHelper);

describe('26-4555 Adapted Housing json-schema', () => {
  [
    ['date', ['dateOfBirth']],
    ['email'],
    ['fullName', ['fullName']],
    ['phone', ['homePhone']],
    ['ssn'],
    ['address', ['address']],
    ['vaFileNumber'],
  ].forEach(test => {
    sharedTests.runTest(...test);
  });

  schemaTestHelper.testValidAndInvalid('fullName', {
    valid: [{ first: fixtures.fullName.first, middle: undefined, last: fixtures.fullName.last }],
    invalid: [{ first: undefined, middle: undefined, last: undefined }],
  });

  schemaTestHelper.testValidAndInvalid('dateOfBirth', {
    valid: [fixtures.date],
    invalid: ['abc', '-1-1-1', '12345', 'Jan 1, 2023'],
  });

  schemaTestHelper.testValidAndInvalid('ssn', {
    valid: [fixtures.ssn],
    invalid: ['12345678', '1234567890', undefined],
  });

  schemaTestHelper.testValidAndInvalid('address', {
    valid: [usAddressFixture],
    invalid: [fixtures.address, undefined],
  });

  schemaTestHelper.testValidAndInvalid('homePhone', {
    valid: [fixtures.phone],
    invalid: ['123456789', undefined],
  });

  schemaTestHelper.testValidAndInvalid('hasPreviousSahApplication', {
    valid: [true, false],
    invalid: ['yes', 'no', '0', '1', undefined],
  });

  schemaTestHelper.testValidAndInvalid('hasPreviousHiApplication', {
    valid: [true, false],
    invalid: ['yes', 'no', '0', '1', undefined],
  });

  schemaTestHelper.testValidAndInvalid('isInCareFacility', {
    valid: [true, false],
    invalid: ['yes', 'no', '0', '1', undefined],
  });
});

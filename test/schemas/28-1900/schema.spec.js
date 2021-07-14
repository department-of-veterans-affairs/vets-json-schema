import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['28-1900'];

const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

const testData = {
  yearsOfEducation: {
    valid: ['10', '11', '5', '23', '4'],
    invalid: ['four', 'seventeen', 'thirty', 'five', 'ten'],
  },
  boolean: {
    valid: [true, false],
    invalid: ['false', null, 42],
  },
  address: {
    valid: [
      {
        country: 'USA',
        street: '123 at home dr',
        street2: 'apt 1',
        city: 'a city',
        state: 'a state',
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
};

describe('veteran readiness and employment', () => {
  sharedTests.runTest('fullName', ['veteranInformation.fullName']);
  sharedTests.runTest('date', ['veteranInformation.dob']);
  sharedTests.runTest('email', ['email']);
  sharedTests.runTest('phone', ['mainPhone', 'cellPhone']);
  schemaTestHelper.testValidAndInvalid('isMoving', testData.boolean);
  schemaTestHelper.testValidAndInvalid('useEva', testData.boolean);
  schemaTestHelper.testValidAndInvalid('useTelecounseling', testData.boolean);
  schemaTestHelper.testValidAndInvalid('appointmentTimePreferences.morning', testData.boolean);
  schemaTestHelper.testValidAndInvalid('appointmentTimePreferences.midDay', testData.boolean);
  schemaTestHelper.testValidAndInvalid('appointmentTimePreferences.afternoon', testData.boolean);
  schemaTestHelper.testValidAndInvalid('veteranAddress', testData.address);
  schemaTestHelper.testValidAndInvalid('newAddress', testData.address);
});

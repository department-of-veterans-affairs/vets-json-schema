import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';

const schema = schemas['5655'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

const validAddress = {
  country: 'USA',
  state: 'MO',
  postalCode: '00000',
  street: '123 Fake Street',
  city: 'Fakerville'
}

const testData = {
  married: {
    valid: [true, false],
    invalid: [0, 'invalid'],
  },
  agesOfOtherDependents: {
    valid: [[8, 20]],
    invalid: [false, 'invalid']
  },
  employmentHistory: {
    valid: [[
      {
        occupationName: 'valid job name',
        from: '2015-10',
        to: '2020-01',
        employerName: 'widgets inc.',
        employerAddress: validAddress,
      },
    ]],
    invalid: [[
      {
        occupationName: false,
        from: 2020,
        to: true,
        employerName: 1.5,
        employerAddress: null,
      },
    ]],
  },
  income: {
    valid: [
      {
        monthlyGrossSalary: 10000,
      }
    ],
    invalid: [

    ],
  },
};

describe('5655 schema', () => {
  sharedTests.runTest('fullName', ['personalData.fullName', 'personalData.spouseFullName']);
  sharedTests.runTest('address', ['personalData.address']);
  sharedTests.runTest('date', ['personalData.dateOfBirth']);
  schemaTestHelper.testValidAndInvalid('personalData.married', testData.married);
  schemaTestHelper.testValidAndInvalid('personalData.agesOfOtherDependents', testData.agesOfOtherDependents);
  schemaTestHelper.testValidAndInvalid('personalData.employmentHistory.veteran', testData.employmentHistory);
  schemaTestHelper.testValidAndInvalid('personalData.employmentHistory.spouse', testData.employmentHistory);
});

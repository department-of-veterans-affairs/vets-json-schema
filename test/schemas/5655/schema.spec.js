import { expect } from 'chai';
import { _, cloneDeep } from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['5655'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

const personalDataTestData = {
  married: {
    valid: [true, false],
    invalid: ['yes', 123, null]
  },
};

describe('5655 schema', () => {
  expect(schema.required).to.deep.equal([
    'personalData',
    'income',
    'expenses',
    'discretionaryIncome',
    'assets',
    'installmentContractsAndOtherDebts',
    'additionalData',
  ]);

  expect(schema.properties.personalData.required).to.deep.equal([
    'veteranFullName',
    'veteranAddress',
    'phoneNumber',
    'dateOfBirth',
    'married',
  ]);

  // Personal Data
  sharedTests.runTest('fullName', ['personalData.veteranFullName', 'personalData.spouseFullName']);
  sharedTests.runTest('address', ['personalData.veteranAddress']);
  sharedTests.runTest('phone', ['personalData.phoneNumber']);
  sharedTests.runTest('date', ['personalData.dateOfBirth']);
});

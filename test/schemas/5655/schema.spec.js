// import { expect } from 'chai';
// import { _, cloneDeep } from 'lodash';
// import SchemaTestHelper from '../../support/schema-test-helper';
// import schemas from '../../../dist/schemas';
// import SharedTests from '../../support/shared-tests';

// const schema = schemas['5655'];
// let schemaWithoutRequired = _.cloneDeep(schema);
// delete schemaWithoutRequired.required;
// delete schemaWithoutRequired.anyOf;
// let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
// let sharedTests = new SharedTests(schemaTestHelper);

// const personalDataTestData = {
//   married: {
//     valid: [true, false],
//     invalid: ['yes', 123, null],
//   },
// };

  // describe('5655 schema', () => {
  // expect(schema.required).to.deep.equal([
  //   'personalData',
  //   'income',
  //   'expenses',
  //   'discretionaryIncome',
  //   'assets',
  //   'installmentContractsAndOtherDebts',
  //   'additionalData',
  // ]);

  // expect(schema.properties.personalData.required).to.deep.equal([
  //   'veteranFullName',
  //   'veteranAddress',
  //   'phoneNumber',
  //   'dateOfBirth',
  //   'married',
  // ]);

  // Personal Data
  // sharedTests.runTest('fullName', ['personalData.veteranFullName']);
  // sharedTests.runTest('address', ['personalData.veteranAddress']);
  // sharedTests.runTest('phone', ['personalData.phoneNumber']);
  // sharedTests.runTest('date', ['personalData.dateOfBirth']);
// });

import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';

const schema = schemas['5655'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

const testData = {
  statusOptions: {
    valid: ['isActiveDuty', 'isVeteran', 'isSpouse', 'isChild'],
    invalid: ['notAVeteran', 'notAServiceMember'],
  },
};

describe('5655 schema', () => {
  sharedTests.runTest('fullName', ['personalData.fullName']);
  sharedTests.runTest('address', ['personalData.address']);
  // sharedTests.runTest('ssn', ['claimantInformation.ssn', 'veteranInformation.ssn']);
  // sharedTests.runTest('date', ['claimantInformation.dateOfBirth']);
  // sharedTests.runTest('phone', ['claimantPhoneNumber']);
  // sharedTests.runTest('email', ['claimantEmailAddress']);
  // schemaTestHelper.testValidAndInvalid('status', testData.statusOptions);
});

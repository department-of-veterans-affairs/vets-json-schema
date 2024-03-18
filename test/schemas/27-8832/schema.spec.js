import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';

const schema = schemas['27-8832'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

const testData = {
  statusOptions: {
    valid: ['isActiveDuty', 'isVeteran', 'isSpouse', 'isChild'],
    invalid: ['notAVeteran', 'notAServiceMember'],
  },
};

describe('27-8832 schema', () => {
  sharedTests.runTest('fullName', ['claimantInformation.fullName', 'veteranInformation.fullName']);
  sharedTests.runTest('ssn', ['claimantInformation.ssn', 'veteranInformation.ssn']);
  sharedTests.runTest('date', ['claimantInformation.dateOfBirth']);
  sharedTests.runTest('phone', ['claimantPhoneNumber']);
  sharedTests.runTest('email', ['claimantEmailAddress']);
  schemaTestHelper.testValidAndInvalid('status', testData.statusOptions);
});

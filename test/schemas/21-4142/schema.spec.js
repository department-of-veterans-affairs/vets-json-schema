import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21-4142'];

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-4142 schema', () => {

  [
    'email'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  // Veteran Full Name
  sharedTests.runTest('fullName', ['veteranFullName']);

  // Veteran Social Security Number
  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber']);

  // Veteran VA File Number
  sharedTests.runTest('centralMailVaFile', ['vaFileNumber']);

  // Veteran Date of Birth
  sharedTests.runTest('date', ['veteranDateOfBirth']);

  // Veteran Address
  sharedTests.runTest('centralMailAddress', ['veteranAddress']);

  // Veteran Phone
  sharedTests.runTest('phone', ['veteranPhone']);

  //Limited Consent
  schemaTestHelper.testValidAndInvalid('limitedConsent', {
    valid: ['consent limited to whatever'],
    invalid: [3, false]
  });

  //Provider Facility
  schemaTestHelper.testValidAndInvalid('providerFacility', {
    valid: [[{
      providerFacilityName: 'we fix u',
      treatmentDateRange: fixtures.dateRange,
      providerFacilityAddress: fixtures.address,
    }]],
    invalid: [[{
      providerFacilityName: 1
    }]]
  });
});

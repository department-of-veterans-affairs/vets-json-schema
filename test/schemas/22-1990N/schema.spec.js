import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['22-1990N'];

const schemaDefaults = {
  privacyAgreementAccepted: true,
  veteranFullName: {
    first: 'a',
    last: 'b'
  }
};

let schemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('ncs benefits schema', () => {
  [
    'gender',
    'phone',
    'email',
    'bankAccount',
    'educationProgram',
    'currentlyActiveDuty',
    'toursOfDuty',
    'preferredContactMethod'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber']);

  sharedTests.runTest('date', ['veteranDateOfBirth']);

  sharedTests.runTest('fullName', ['veteranFullName']);

  sharedTests.runTest('address', ['veteranAddress']);
});

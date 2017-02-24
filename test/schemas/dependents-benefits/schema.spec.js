import SchemaTestHelper from '../../support/schema-test-helper';
import { dependentsBenefits as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('transfer benefits schema', () => {
  [
    'gender',
    'phone',
    'email',
    'bankAccount',
    'secondaryContact',
    'vaFileNumber',
    'educationType',
    'school',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['relativeFullName', 'veteranFullName']);

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber', 'veteranSocialSecurityNumber']);

  sharedTests.runTest('date', ['relativeDateOfBirth', 'veteranDateOfBirth', 'veteranDateOfDeath', 'educationStartDate']);

  sharedTests.runTest('address', ['relativeAddress']);
});

import SchemaTestHelper from '../../support/schema-test-helper';
import { dependentsChangeOfProgram as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('dependents change of program schema', () => {
  [
    'vaFileNumber',
    'gender',
    'phone',
    'email',
    'preferredContactMethod',
    'bankAccount',
    'secondaryContact',
    'relationship',
    'toursOfDuty',
    'educationType',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['relativeFullName', 'veteranFullName']);

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber', 'veteranSocialSecurityNumber']);

  sharedTests.runTest('date', ['relativeDateOfBirth', 'veteranDateOfBirth', 'veteranDateOfDeath']);

  sharedTests.runTest('address', ['relativeAddress']);

  sharedTests.runTest('school', ['newSchool', 'oldSchool']);
});

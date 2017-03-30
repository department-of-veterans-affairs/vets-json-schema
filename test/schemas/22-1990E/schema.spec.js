import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import { expect } from 'chai';
import SharedTests from '../../support/shared-tests';

const schema = schemas['22-1990E'];

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'), schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('transfer benefits schema', () => {
  [
    'gender',
    'phone',
    'email',
    'bankAccount',
    'educationProgram',
    'postHighSchoolTrainings',
    'nonMilitaryJobs',
    'relationship',
    'preferredContactMethod',
    'vaFileNumber'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber', 'veteranSocialSecurityNumber']);

  sharedTests.runTest('fullName', ['relativeFullName', 'veteranFullName']);

  sharedTests.runTest('address', ['relativeAddress', 'veteranAddress']);

  sharedTests.runTest('date', ['relativeDateOfBirth', 'highSchoolOrGedCompletionDate']);

  schemaTestHelper.testValidAndInvalid('benefit', {
    valid: ['chapter33'],
    invalid: ['foo']
  });

  (new SharedTests(new SchemaTestHelper(schema, schemaDefaults))).requireSsnOrFile();
});

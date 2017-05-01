import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21-527'];

let schemaTestHelper = new SchemaTestHelper(schema);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-527 schema', () => {
  [
    'email',
    'maritalStatus',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['veteranFullName', 'spouseFullName']);

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'spouseSocialSecurityNumber']);

  sharedTests.runTest('phone', ['dayPhone', 'nightPhone', 'mobilePhone']);

  sharedTests.runTest('date', ['dateOfMarriage', 'spouseDateOfBirth']);

  sharedTests.runTest('vaFileNumber', ['vaFileNumber', 'spouseVaFileNumber']);

  sharedTests.runTest('address', ['veteranAddress', 'spouseAddress']);

  sharedTests.runTest('marriages', ['marriages', 'spouseMarriages']);

  schemaTestHelper.testValidAndInvalid('childrenInHousehold', {
    valid: [[{
      childFullName: fixtures.fullName,
      childDateOfBirth: fixtures.date,
      childPlaceOfBirth: 'ny, ny',
      childSocialSecurityNumber: fixtures.ssn,
      biological: true,
      adopted: true,
      stepchild: true,
      attendingCollege: true,
      disabled: true,
      previouslyMarried: true
    }]],
    invalid: [[{
      childFullName: 1
    }]]
  });

  schemaTestHelper.testValidAndInvalid('childrenNotInHousehold', {
    valid: [[{
      childFullName: fixtures.fullName,
      childAddress: fixtures.address,
      personWhoLivesWithChild: fixtures.fullName,
      monthlyPayment: 1
    }]],
    invalid: [[{
      childFullName: 1
    }]]
  });

  schemaTestHelper.testValidAndInvalid('disabilities', {
    valid: [[{
      name: 'polio',
      disabilityStartDate: fixtures.date
    }]],
    invalid: [[{
      name: false
    }]]
  });
});

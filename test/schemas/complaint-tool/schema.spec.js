import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['complaint-tool'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('complaint tool schema', () => {
    [
    'email',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('date', ['dob']);
  sharedTests.runTest('usaPhone', ['phone']);
  sharedTests.runTest('dateRange', ['serviceDateRange']);
  // test fullName
  // test address
  // test onBehalfOf
  // test serviceBranch
  // test serviceAffiliation
  // test education details
  // test issue
  // test issue description
  // test issue resolution
  // schemaTestHelper.testValidAndInvalid('dependents', {
  //   valid: [[{
  //     fullName: fixtures.fullName,
  //     childDateOfBirth: fixtures.date,
  //     childPlaceOfBirth: 'ny, ny',
  //     childSocialSecurityNumber: fixtures.ssn,
  //     childRelationship: 'adopted',
  //     attendingCollege: true,
  //     disabled: true,
  //     married: true,
  //     previouslyMarried: true,
  //     childFullName: fixtures.fullName,
  //     childInHousehold: true,
  //     childAddress: fixtures.address,
  //     personWhoLivesWithChild: fixtures.fullName
  //   }]],
  //   invalid: [[{
  //     fullName: 1
  //   }]]
  // });
});

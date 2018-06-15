import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['40-10007'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.properties.application.required;
delete schemaWithoutRequired.properties.application.properties.applicant.required;
delete schemaWithoutRequired.properties.application.properties.claimant.required;
delete schemaWithoutRequired.properties.application.properties.veteran.required;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('preneeds schema', () => {
  sharedTests.runTest('centralMailVaFile', ['application.veteran.vaClaimNumber']);

  schemaTestHelper.testValidAndInvalid('application.applicant.applicantEmail', {
    valid: [
      'foo@foo.com',
      'foo@foo.net',
      'foo+13@foo.com',
      'foo@bar.co.uk',
      'foo.foo@foo.com'
    ],
    invalid: [
      'bad'
    ]
  });

  schemaTestHelper.testValidAndInvalid('application.applicant.applicantPhoneNumber', {
    valid: [
      '415555-2671'
    ],
    invalid: [
      'bad'
    ]
  });

  schemaTestHelper.testValidAndInvalid('application.claimant.ssn', {
    valid: [
      '000-12-3456'
    ],
    invalid: [
      'bad'
    ]
  });
});

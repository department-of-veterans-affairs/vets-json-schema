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

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('preneeds schema', () => {
  schemaTestHelper.testValidAndInvalid('application.applicant.applicantEmail', {
    valid: [
      'foo@foo.com',
      'foo@foo.net',
      'foo+13@foo.com',
      'foo.foo@foo.com'
    ],
    invalid: [
      'bad',
      '$bad@bad.com'
    ]
  });
});

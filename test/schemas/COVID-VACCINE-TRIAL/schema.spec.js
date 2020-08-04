import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
// import fixtures from '../../support/fixtures';

import SharedTests from '../../support/shared-tests';

let schema = schemas['COVID-VACCINE-TRIAL'];
console.log(schema);
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('covid vaccine trial schema', () => {
  sharedTests.runTest('email');
  sharedTests.runTest('fullName');
  sharedTests.runTest('date');

  // schemaTestHelper.testValidAndInvalid('address', {
  //   valid: [_.merge({}, fixtures.address, {
  //     country: 'US',
  //     state: 'CA',
  //     postalCode: '23423'
  //   })],
  //   invalid: [[false]]
  // });
});

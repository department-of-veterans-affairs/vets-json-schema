import SchemaTestHelper from '../../support/schema-test-helper';
import { transferBenefits as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);

describe('transfer benefits schema', () => {
  schemaTestHelper.testValidAndInvalid('veteranSocialSecurityNumber', {
    valid: [
      '123456789'
    ],
    invalid: ['123']
  });

  schemaTestHelper.testValidAndInvalid('gender', {
    valid: [
      'M'
    ],
    invalid: ['m']
  });
});

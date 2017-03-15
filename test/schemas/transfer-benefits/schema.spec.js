import SchemaTestHelper from '../../support/schema-test-helper';
import { transferBenefits as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import { expect } from 'chai';
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

  describe('required fields', () => {
    it('should require either ssn or vaFileNumber', () => {
      let fullSchemaTestHelper = new SchemaTestHelper(schema, schemaDefaults);

      expect(fullSchemaTestHelper.validateSchema({})).to.equal(false);
      expect(fullSchemaTestHelper.ajv.errors[0].params.missingProperty).to.equal('.vaFileNumber');

      [
        { veteranSocialSecurityNumber: '123456789' },
        { vaFileNumber: '12345678' },
        {
          veteranSocialSecurityNumber: '123456789',
          vaFileNumber: '12345678'
        }
      ].forEach((schemaData) => {
        fullSchemaTestHelper.schemaExpect(true, schemaData);
      });
    });
  });
});

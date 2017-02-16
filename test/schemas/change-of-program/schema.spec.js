import SchemaTestHelper from '../../support/schema-test-helper';
import { changeOfProgram as schema } from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import { expect } from 'chai';
import SharedTests from '../../support/shared-tests';

const schemaDefaults = {
  privacyAgreementAccepted: true
};

let schemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'), schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('change of program json schema', () => {
  [
    'ssn',
    'fullName',
    'address',
    'phone',
    'email',
    'bankAccount'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('school', ['newSchool', 'oldSchool']);

  schemaTestHelper.testValidAndInvalid('educationType', {
    valid: ['college', 'cooperativeTraining'],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('benefit', {
    valid: ['chapter33'],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('trainingEndDate', {
    valid: [fixtures.date],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('bankAccountChange', {
    valid: ['start', 'update'],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('serviceBefore1977', {
    valid: [{
      married: true,
      haveDependents: true,
      parentDependent: false
    }],
    invalid: [{
      married: true
    }]
  });

  schemaTestHelper.testValidAndInvalid('toursOfDuty', {
    valid: [[{
      serviceBranch: 'army',
      dateRange: fixtures.dateRange
    }]],
    invalid: [[{
      serviceBranch: true,
      dateRange: fixtures.dateRange
    }]]
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

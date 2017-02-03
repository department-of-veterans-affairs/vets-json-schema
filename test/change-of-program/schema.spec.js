import SchemaTestHelper from '../support/schema-test-helper';
import { changeOfProgram as schema } from '../../dist/schemas';
import fixtures from '../support/fixtures';
import _ from 'lodash';
import { expect } from 'chai';

let schemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'));

describe('change of program json schema', () => {
  schemaTestHelper.testValidAndInvalid('veteranFullName', {
    valid: [{
      first: 'john',
      last: 'doe'
    }],
    invalid: [{
      first: 'john'
    }]
  });

  schemaTestHelper.testValidAndInvalid('veteranAddress', {
    valid: [{
      street: '123 a rd',
      city: 'abc',
      country: 'USA'
    }],
    invalid: [{
      city: 'foo',
      country: 'USA'
    }]
  });

  ['home', 'mobile'].forEach((type) => {
    schemaTestHelper.testValidAndInvalid(`${type}Phone`, {
      valid: ['555-555-5555'],
      invalid: ['1234']
    });
  });

  schemaTestHelper.testValidAndInvalid('email', {
    valid: [
      'foo@foo.com',
      'foo+1@foo.com'
    ],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('veteranSocialSecurityNumber', {
    valid: [
      '123456789'
    ],
    invalid: ['123']
  });

  schemaTestHelper.testValidAndInvalid('benefit', {
    valid: ['chapter33'],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('educationType', {
    valid: ['cooperativeTraining', 'college'],
    invalid: ['foo']
  });

  ['new', 'old'].forEach((type) => {
    schemaTestHelper.testValidAndInvalid(`${type}School`, {
      valid: [{ name: 'foo' }],
      invalid: [{ name: true }]
    });
  });

  schemaTestHelper.testValidAndInvalid('trainingEndDate', {
    valid: [fixtures.date],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('bankAccountChange', {
    valid: ['start', 'change'],
    invalid: ['foo']
  });

  schemaTestHelper.testValidAndInvalid('bankAccount', {
    valid: [{
      accountType: 'checking',
      routingNumber: '123456789',
      accountNumber: '1234'
    }],
    invalid: [{
      accountType: 'foo',
      routingNumber: '123456789',
      accountNumber: '1234'
    }]
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
      let fullSchemaTestHelper = new SchemaTestHelper(schema);

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

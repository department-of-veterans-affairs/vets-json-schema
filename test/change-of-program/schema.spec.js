import SchemaTestHelper from '../support/schema-test-helper';
import { changeOfProgram as schema } from '../../dist/schemas';

let schemaTestHelper = new SchemaTestHelper(schema);

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

  ['day', 'night'].forEach((type) => {
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
    valid: [{ college: true }],
    invalid: [{ college: 'true' }]
  });

  ['new', 'old'].forEach((type) => {
    schemaTestHelper.testValidAndInvalid(`${type}School`, {
      valid: [{ name: 'foo' }],
      invalid: [{ name: true }]
    });
  });

  schemaTestHelper.testValidAndInvalid('bankAccountChange', {
    valid: ['startOrChange'],
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
});

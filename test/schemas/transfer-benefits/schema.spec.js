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

  schemaTestHelper.testValidAndInvalid('veteranDateOfBirth', {
    valid: [
      fixtures.date
    ],
    invalid: [
      '4/6/1998'
    ]
  });

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

  context('phone # validations', () => {
    ['homePhone', 'mobilePhone'].forEach((parentKey) => {
      schemaTestHelper.testValidAndInvalid(parentKey, {
        valid: ['5555555555', '555-555-5555', '555 555 5555'],
        invalid: ['1234']
      });
    });
  });

  schemaTestHelper.testValidAndInvalid('email', {
    valid: [
      'foo@foo.com',
      'foo+1@foo.com'
    ],
    invalid: ['foo']
  });
});

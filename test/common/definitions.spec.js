import { expect } from 'chai';
import SchemaTestHelper from '../support/schema-test-helper';
import definitions from '../../src/common/definitions';

describe('schema definitions', () => {
  const testValidAndInvalidDefinitions = (definitionName, fields) => {
    let schemaTestHelper = new SchemaTestHelper(
      {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          [definitionName]: definitions[definitionName]
        }
      }
    );

    schemaTestHelper.testValidAndInvalid(definitionName, fields);
  };

  testValidAndInvalidDefinitions('fullName', {
    valid: [{
      first: 'john',
      last: 'doe'
    }],
    invalid: [{
      first: 'john'
    }]
  });

  testValidAndInvalidDefinitions('address', {
    valid: [
      {
        street: '123 a rd',
        city: 'abc',
        country: 'USA'
      },
      {
        street: '123 a rd',
        city: 'abc',
        state: 'VA',
        country: 'USA'
      }
    ],
    invalid: [
      {
        city: 'foo',
        country: 'USA'
      },
      {
        street: '123 a rd',
        city: 'abc',
        state: 'foo',
        country: 'USA'
      }
    ]
  });

  testValidAndInvalidDefinitions('phone', {
    valid: ['5555555555', '555-555-5555', '555 555 5555'],
    invalid: ['1234']
  });
});

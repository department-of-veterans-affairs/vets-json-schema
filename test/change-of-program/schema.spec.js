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
});

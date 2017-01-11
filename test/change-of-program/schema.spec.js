import SchemaTestHelper from '../support/schema-test-helper';
import { changeOfProgram as schema } from '../../dist/schemas';

let schemaTestHelper = new SchemaTestHelper(schema);

describe('change of program json schema', () => {
  context('veteranFullName', () => {
    ['veteranFullName'].forEach((parentKey) => {
      schemaTestHelper.testValidAndInvalid(parentKey, {
        valid: [{
          first: 'john',
          last: 'doe'
        }],
        invalid: [{
          first: 'john'
        }]
      });
    });
  });
});

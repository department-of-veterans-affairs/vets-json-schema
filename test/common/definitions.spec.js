import { expect } from 'chai';
import SchemaTestHelper from '../support/schema-test-helper';
import definitions from '../../src/common/definitions';

describe('schema definitions', () => {
  const testDefinition = (definition, data) => {
    let schemaTestHelper = new SchemaTestHelper(
      Object.assign(
        {
          $schema: 'http://json-schema.org/draft-04/schema#'
        },
        definition
      )
    );

    return schemaTestHelper.validateSchema(data);
  };

  const testValidAndInvalidDefinitions = (definitionName, fields) => {
    ['valid', 'invalid'].forEach((fieldType) => {
      const valid = fieldType === 'valid';

      fields[fieldType].forEach((value) => {
        it(`should${valid ? '' : 'nt'} allow ${definitionName} with ${JSON.stringify(value)}`, () => {
          expect(testDefinition(definitions[definitionName], value)).to.equal(valid);
        });
      });
    });
  }

  context('fullName', () => {
    testValidAndInvalidDefinitions('fullName', {
      valid: [{
        first: 'john',
        last: 'doe'
      }],
      invalid: [{
        first: 'john'
      }]
    });
  });

  context('address', () => {
    testValidAndInvalidDefinitions('address', {
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
});

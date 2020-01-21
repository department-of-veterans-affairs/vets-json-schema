import SchemaTestHelper from '../support/schema-test-helper';
import path from 'path';
import fs from 'fs';
import { expect } from 'chai';

/**
 * Builds a dictionary of schemas indexed by it's schema name (id) with values
 * containing the schema's name (id), definition, and example.
 * 
 * @return { [key: string]: { schemaId: string; schema: object; example: object } }
 */
const importExamplesAndSchemas = () => {
  const SCHEMAS_DIR_PATH = path.join(__dirname, '../../src/schemas');
  const EXAMPLES_DIR_PATH = path.join(__dirname, '../../src/examples');
  const SCHEMA_FILE_NAME = 'schema.js';
  const EXAMPLE_FILE_NAME = 'example.js';

  const examplesDir = fs.readdirSync(EXAMPLES_DIR_PATH, { withFileTypes: true });

  /**
   * Contains dictionary of schema examples found in the EXAMPLES_DIR_PATH
   * 
   * @return { [key: string]: { schemaId: string; schema: object; example: object } }
   */
  const examples = examplesDir.reduce((acc, dirent) => {
    if (dirent.isDirectory()) {
      const schemaPath = `${SCHEMAS_DIR_PATH}/${dirent.name}/${SCHEMA_FILE_NAME}`;
      const examplePath = `${EXAMPLES_DIR_PATH}/${dirent.name}/${EXAMPLE_FILE_NAME}`;

      let schema, example;

      try {
        schema = require(schemaPath).default;
      } catch(e) { // Error importing the schema for `dirent.name`
        console.error(e);
        
        throw Error(`
          Failed to import the ${dirent.name} schema. Make sure ${schemaPath} exists and exports as "default".
        `);
      }

      try {
        example = require(examplePath).default;
      } catch(e) { // Error importing the example for `dirent.name`
        console.error(e);
        
        throw Error(`
          Failed to import the ${dirent.name} example. Make sure ${examplePath} exists and exports as "default".
        `);
      }

      acc[dirent.name] = { schemaId: dirent.name, schema, example };
    }

    return acc;
  }, {});

  return examples;
};

describe('schema examples', () => {
  let examples;

  before(() => {
    examples = importExamplesAndSchemas();

    if (examples === undefined) { throw Error('Failed to bootstrap test'); }
  });

  it('each contain an example that\'s valid against it\'s matching schema', () => {
    for (const schemaId in examples) {
      const { schema, example } = examples[schemaId];

      const schemaTestHelper = new SchemaTestHelper(schema);
      const isValidForSchema = schemaTestHelper.validateSchema(example);

      /**
       * If this expectation fails, the data in your schema's example (src/examples/10-10CG/example.js)
       * is not valid against it's corresponding schema definition found in (src/schemas/10-10CG/schema.js)
       */
      expect(isValidForSchema).to.equal(true, `The ${schemaId} example is not valid against the ${schemaId} schema definition`);
    }
  });
});

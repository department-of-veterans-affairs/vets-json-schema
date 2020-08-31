import examples from './validate-examples-against-schema/examples.js';
import { schema, schema_name } from './validate-examples-against-schema/schema.js';
import Path from 'path';
import { expect } from 'chai';
import { it } from 'mocha';
import Ajv from 'ajv';

function validate_examples_against_schema({ schema, examples, schema_name }) {
  const { valid, invalid } = examples;
  describe(schema_name, () => {
    Object.keys(valid).forEach(filename => {
      const example = valid[filename];
      example_is_valid_against_schema({ example, schema, filename, expectation: true });
    });
    Object.keys(invalid).forEach(filename => {
      const example = invalid[filename];
      example_is_valid_against_schema({ example, schema, filename, expectation: false });
    });
  });
}

function example_is_valid_against_schema({ schema, example, filename, expectation }) {
  const ajv = new Ajv();
  const validated = ajv.validate(schema, example);

  const errors = ajv.errors;
  if (errors && errors.length > 0 && expectation) console.log(errors);

  const test = () => expect(validated).to.equal(expectation);

  it(`${filename} - ${expectation ? 'passes' : 'fails'}`, test);
}

function examples_path(path) {
  return Path.resolve(schema_dir_path(path), 'examples');
}

function schema_dir_path(path) {
  return Path.resolve(path, '..', '..', '..', 'src', 'schemas', schema_name(path));
}

function no_examples(examples) {
  return Object.keys(examples['valid']).length === 0 && Object.keys(examples['invalid']).length === 0;
}

export default path => {
  const exs = examples(examples_path(path));
  if (no_examples(exs)) throw 'no examples provided';
  validate_examples_against_schema({
    schema: schema(schema_dir_path(path)),
    examples: exs,
    schema_name: schema_name(path),
  });
};

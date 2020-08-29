import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { it } from 'mocha';
import Ajv from 'ajv';

const path_string_to_array = path_string => path_string.split(path.sep);

const join_as_absolute_path = path_array => path.sep + path.join(...path_array);

const path_array_to_repo_path = path_array => {
  const i = path_array.indexOf('vets-json-schema');
  return i !== -1 && path_array.slice(0, i + 1);
};

const get_schemas_path = (repo_path, schema_dir_name) => [...repo_path, 'src', 'schemas', schema_dir_name];

const get_examples_path = schemas_path => [...schemas_path, 'examples'];

const get_schema_path = schemas_path => [...schemas_path, 'schema.js'];

const get_example_filenames = examples_path =>
  fs
    .readdirSync(join_as_absolute_path(examples_path))
    .filter(filename => filename.slice(-5) === '.json' && filename[0] !== '.');

const get_examples = (examples_path, example_filenames) =>
  example_filenames.reduce((acc, filename) => {
    const example_path = join_as_absolute_path([...examples_path, filename]);
    return { ...acc, [filename]: require(example_path) };
  }, {});

const get_schema = schema_path => require(join_as_absolute_path(schema_path)).default;

const validateExamplesAgainstSchema = path_string => {
  const path_array = path_string_to_array(path_string);
  const schema_dir_name = path_array[path_array.length - 1];
  const repo_path = path_array_to_repo_path(path_array);
  const schemas_path = get_schemas_path(repo_path, schema_dir_name);
  const examples_path = get_examples_path(schemas_path);
  const example_filenames = get_example_filenames(examples_path);
  const examples = get_examples(examples_path, example_filenames);
  const schema_path = get_schema_path(schemas_path);
  const schema = get_schema(schema_path);

  const ajv = new Ajv();
  describe(schema_dir_name, () =>
    Object.keys(examples).forEach(filename => {
      const example = examples[filename];
      const exampleValidatesAgainstSchema = ajv.validate(schema, example);

      const errors = ajv.errors;
      if (errors && errors.length > 0) console.log(errors);

      const test = () => expect(exampleValidatesAgainstSchema).to.be.true;

      it(`validates against example: ${filename}`, test);
    }),
  );
};

export default validateExamplesAgainstSchema;

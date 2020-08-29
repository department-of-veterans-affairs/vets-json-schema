import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { it } from 'mocha';
import Ajv from 'ajv';

const join_as_absolute_path = path_array => path.sep + path.join(...path_array);

const string_is_a_path_to_a_dir = string => fs.existsSync(string) && fs.lstatSync(string).isDirectory();

const is_a_dir = value => string_is_a_path_to_a_dir(Array.isArray(value) ? join_as_absolute_path(value) : value);

const string_is_a_path_to_a_file = string => fs.existsSync(string) && !fs.lstatSync(string).isDirectory();

const is_a_file = value => string_is_a_path_to_a_file(Array.isArray(value) ? join_as_absolute_path(value) : value);

const path_string_to_array = path_string => path_string.split(path.sep);

const schema_dir_path_array_to_repo_path = schema_dir_path_array => schema_dir_path_array.slice(0, -3);

const get_schema_dir_path_in_src = (repo_path, schema_dir_name) => [...repo_path, 'src', 'schemas', schema_dir_name];

const get_examples_path = schema_dir_path_in_src => [...schema_dir_path_in_src, 'examples'];

const get_schema_path = schema_dir_path_in_src => [...schema_dir_path_in_src, 'schema.js'];

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

const is_a_non_empty_string = value => typeof value === 'string' && value !== '';

const last_char_is_path_separator = string => string[string.length - 1] === path.sep;

// schema_dir_path_string should be something like:
//
//  .../src/schemas/SCHEMA_DIR
//  .../test/schemas/SCHEMA_DIR
const get_schema_and_examples = schema_dir_path_string => {
  schema_dir_path_string = last_char_is_path_separator(schema_dir_path_string)
    ? schema_dir_path_string.slice(0, -1)
    : schema_dir_path_string;
  if (!is_a_dir(schema_dir_path_string))
    throw `argument to validateExamplesAgainstSchema should be a string that is a path to a directory: ${schema_dir_path_string}`;
  if (!path.isAbsolute(schema_dir_path_string))
    throw `argument to validateExamplesAgainstSchema must be an absolute path: ${schema_dir_path_string}`;

  const schema_dir_path_array = path_string_to_array(schema_dir_path_string);
  const schema_dir_name = schema_dir_path_array[schema_dir_path_array.length - 1];
  // throw unless schema_dir_name is a non-empty string
  if (!is_a_non_empty_string(schema_dir_name)) throw 'schema dir name cannot be blank';

  const repo_path = schema_dir_path_array_to_repo_path(schema_dir_path_array);
  if (repo_path.length === 0) throw "couldn't find repo path"; // even if repo_path was the root, it should be ['']

  const schema_dir_path_in_src = get_schema_dir_path_in_src(repo_path, schema_dir_name);
  if (!is_a_dir(schema_dir_path_in_src)) throw `schema_dir_path_in_src isn't a directory?: ${schema_dir_path_in_src}`;

  const examples_path = get_examples_path(schema_dir_path_in_src);
  if (!is_a_dir(examples_path)) throw `examples_path isn't a directory?: ${examples_path}`;

  const example_filenames = get_example_filenames(examples_path);
  if (example_filenames.length === 0) throw `no example files in ${examples_path} ?`;

  const examples = get_examples(examples_path, example_filenames);

  const schema_path = get_schema_path(schema_dir_path_in_src);
  if (!is_a_file(schema_path)) throw `schema_path isn't a file?: ${schema_path}`;

  const schema = get_schema(schema_path);
  if (!(typeof schema === 'object' && schema !== null)) throw `schema isn't an object?: ${JSON.stringify(schema)}`;

  return [schema, examples, schema_dir_name];
};

const validateExamplesAgainstSchema = schema_dir_path_string => {
  const [schema, examples, schema_dir_name] = get_schema_and_examples(schema_dir_path_string);

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

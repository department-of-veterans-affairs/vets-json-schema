import Fs from 'fs';
import Path from 'path';

// the examples function helps generate *-example.json files for /dist
// and locates valid and invalid examples for validate-examples-against-schema.js
//
// returns an object:
//   {
//      dist: { ... },
//      valid: { ... },
//      invalid: { ... },
//   }
//
// the dist object looks like:
//   {
//     'SOME-SCHEMA-NAME-example.json': obj,
//     'SOME-SCHEMA-NAME-example.json': obj,
//     'SOME-SCHEMA-NAME-example.json': obj,
//     'SOME-SCHEMA-NAME-example.json': obj,
//     ...
//   }
//
// the valid and invalid objects look like:
//   {
//     'src/schemas/SOME-SCHEMA/examples/valid/example.json': obj,
//     'src/schemas/SOME-SCHEMA/examples/invalid/example.json': obj,
//     'test/schemas/SOME-SCHEMA/example.js': obj,
//     'src/examples/SOME-SCHEMA/example.json': obj,
//     ...
//   }
//
// only examples found in /src/examples end up in /dist
// (see load_dist_examples for how these get named)
//
// valid examples (examples that pass against their schema)
// can be put in the following locations:
//
//   src/examples/{schema}/*.js
//   src/examples/{schema}/*.json
//
//   src/schemas/{schema}/example.js
//                        example.json
//                        examples/*.js
//                        examples/*.json
//                        examples/valid/*.js
//                        examples/valid/*.json
//
//   test/schemas/{schema}/example.js
//                         example.json
//                         examples/*.js
//                         examples/*.json
//                         examples/valid/*.js
//                         examples/valid/*.json

// examples in /src/schemas/{schema-name}/*
export default function examples(root_path, schema_name) {
  return {
    valid: valid_examples(root_path, schema_name),
    invalid: invalid_examples(root_path, schema_name),
    dist: dist_examples(root_path, schema_name),
  };
}

function valid_examples(root_path, schema_name) {
  return {
    ...load_js_and_json_files(root_path, ['src', 'examples', schema_name]),
    ...load_js_and_json_files(root_path, ['src', 'schemas', schema_name, 'examples']),
    ...load_js_and_json_files(root_path, ['src', 'schemas', schema_name, 'examples', 'valid']),
    ...load_example_file(root_path, ['src', 'schemas', schema_name]),
    ...load_js_and_json_files(root_path, ['test', 'schemas', schema_name, 'examples']),
    ...load_js_and_json_files(root_path, ['test', 'schemas', schema_name, 'examples', 'valid']),
    ...load_example_file(root_path, ['test', 'schemas', schema_name]),
  };
}

function invalid_examples(root_path, schema_name) {
  return load_js_and_json_files(root_path, ['src', 'schemas', schema_name, 'examples', 'invalid']);
  return load_js_and_json_files(root_path, ['test', 'schemas', schema_name, 'examples', 'invalid']);
}

function load_js_and_json_files(root_path, relative_path) {
  return {
    ...load_files(root_path, relative_path, is_a_js_file, load_js_file),
    ...load_files(root_path, relative_path, is_a_json_file, load_json_file),
  };
}

// loads example.js and/or example.json at the given path
//
// returns an object
// {
//   "src/schemas/schemaName/example.js": object (default export),
//   "src/schemas/schemaName/example.json": object,
// }
//   ^^^ may return an empty object or an object with just one key (if files don't exist)
function load_example_file(root_path, relative_path) {
  const path = Path.resolve(root_path, relative_path.join(Path.sep));
  if (not_a_dir(path)) return {};

  return [
    ['example.js', load_js_file],
    ['example.json', load_json_file],
  ].reduce((acc, [filename, file_loader]) => {
    const file_path = Path.resolve(path, filename);
    if (!is_a_file(file_path)) return acc;
    const key = [...relative_path, filename].join('/');
    return { ...acc, [key]: file_loader(example_file_path) };
  }, {});
}

// loads files at the given path
//
// returns an object
// {
//   "some/path/filename.ext": file_contents_as_object,
//   "another/path/filename.ext": file_contents_as_object,
//   ... and so on
// }
//   ^^^ the returned object may have any number of keys (including 0)
function load_files(root_path, relative_path, path_validator, file_loader) {
  const path = Path.resolve(root_path, relative_path.join(Path.sep));
  if (not_a_dir(path)) return {};
  return filenames_in_dir(path, path_validator).reduce((acc, filename) => {
    const file_path = Path.resolve(path, filename);
    const key = [...relative_path, filename].join('/');
    return { ...acc, [key]: file_loader(file_path) };
  }, {});
}

function filenames_in_dir(dir_path, validator) {
  return Fs.readdirSync(dir_path).filter(file_name => {
    const file_path = Path.resolve(dir_path, file_name);
    return validator(file_path) && not_on_the_ignore_list(file_path);
  });
}

function load_json_file(file_path) {
  return require(file_path);
}

function load_js_file(file_path) {
  return require(file_path).default;
}

function is_a_js_file(file_path) {
  return is_a_file_with_ext(file_path, '.js');
}

function is_a_json_file(file_path) {
  return is_a_file_with_ext(file_path, '.json');
}

function is_a_file_with_ext(file_path, ext) {
  const filename = Path.basename(file_path);
  return not_a_dir(file_path) && Path.extname(filename) === ext;
}

function not_on_the_ignore_list(file_path) {
  const filename = Path.basename(file_path);
  return filename[0] !== '.' && filename[0] !== '#';
}

function is_a_dir(path) {
  return Fs.existsSync(path) && Fs.lstatSync(path).isDirectory();
}

function is_a_file(path) {
  return Fs.existsSync(path) && !Fs.lstatSync(path).isDirectory();
}

function not_a_dir(path) {
  return !is_a_dir(path);
}

export function dist_examples(root_path, schema_name) {
  return {
    ...load_dist_examples(root_path, schema_name, is_a_js_file, load_js_file),
    ...load_dist_examples(root_path, schema_name, is_a_json_file, load_json_file),
  };
}

function load_dist_examples(root_path, schema_name, path_validator, file_loader) {
  const path = Path.resolve(root_path, ['src', 'examples', schema_name].join(Path.sep));
  if (not_a_dir(path)) return {};

  const SCHEMA_NAME = schema_name.toUpperCase();
  return filenames_in_dir(path, path_validator).reduce((acc, filename) => {
    const file_path = Path.resolve(path, filename);
    const basename_without_ext = Path.basename(filename, Path.extname(filename));
    const example_name = basename_without_ext === 'example' ? '' : basename_without_ext;
    const hyphen = example_name && '-';
    const dist_name = `${SCHEMA_NAME}${hyphen}${example_name}-example.json`;
    if (acc[dist_name]) throw unique_dist_name_error(file_path, dist_name, acc);
    return { ...acc, [dist_name]: file_loader(file_path) };
  }, {});
}

function unique_dist_name_error(file_path, dist_name, result) {
  return `
unique dist name couldn't be created.
  current file path: ${file_path}
  dist name it generated: ${dist_name}
  dist names already generated: ${JSON.stringify(result)}
`;
}

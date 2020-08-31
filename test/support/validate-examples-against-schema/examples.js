import Fs from 'fs';
import Path from 'path';

export default function examples(examples_path) {
  return {
    valid: valid_examples(examples_path),
    invalid: invalid_examples(examples_path),
  };
}

function invalid_examples(path) {
  return examples_from(path, 'invalid');
}

function valid_examples(path) {
  return {
    ...examples_from(path),
    ...examples_from(path, 'valid'),
  };
}

function examples_from(root_path, relative_path = '') {
  const path = Path.resolve(root_path, relative_path);
  if (not_a_dir(path)) return {};
  return example_filenames(path).reduce((acc, filename) => {
    const example_path = Path.resolve(path, filename);
    const key = relative_path ? [...relative_path.split(Path.sep), filename].join(Path.sep) : filename;
    return { ...acc, [key]: require(example_path) };
  }, {});
}

function example_filenames(examples_path) {
  return Fs.readdirSync(examples_path).filter(filename => is_a_json_file(Path.resolve(examples_path, filename)));
}

function is_a_json_file(path) {
  const filename = Path.basename(path);
  return not_a_dir(path) && filename.slice(-5) === '.json' && filename[0] !== '.' && filename[0] !== '#';
}

function not_a_dir(path) {
  return !is_a_dir(path);
}

function is_a_dir(path) {
  return Fs.existsSync(path) && Fs.lstatSync(path).isDirectory();
}

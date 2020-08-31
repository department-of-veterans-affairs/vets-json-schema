import Path from 'path';

export function schema_name(schema_dir_path) {
  return Path.basename(schema_dir_path);
}

export function schema(schema_dir_path) {
  return require(schema_path(schema_dir_path)).default;
}

function schema_path(schema_dir_path) {
  return Path.resolve(schema_dir_path, 'schema.js');
}

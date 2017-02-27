import definitions from './definitions';

const getDefinition = (definition) => {
  return {
    $ref: `#/definitions/${definition}`
  };
};

const addDefinitionToSchema = (schema, definition, key) => {
  if (key == null) key = definition;
  let schemaDefinitions = schema.definitions;

  if (schemaDefinitions[definition] == null) {
    schemaDefinitions[definition] = definitions[definition];
  }

  const keysArray = key.split('.');
  let prop = schema;

  keysArray.forEach((k, i) => {
    prop = prop.properties;

    if (i === keysArray.length - 1) {
      prop[k] = getDefinition(definition);
    } else {
      if (prop[k] == null) prop[k] = {};

      prop = prop[k];
    }
  });
};

export default {
  addDefinitionToSchema
};

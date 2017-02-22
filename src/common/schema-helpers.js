const getDefinition = (definition, key) => {
  if (key == null) key = definition;

  return {
    [key]: {
      $ref: `#/definitions/${definition}`
    }
  };
};

export default {
  getDefinition
};

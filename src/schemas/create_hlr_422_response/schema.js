const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  $ref: '#/definitions/root',
  definitions: {
    root: {
      type: 'object',
      properties: { errors: { $ref: '#/definitions/errors' } },
      required: ['errors'],
      additionalProperties: false,
    },
    errors: {
      type: 'array',
      minItems: 1,
      maxItems: 1,
      items: { $ref: '#/definitions/failed_json_schema' },
    },
    failed_json_schema: {
      type: 'object',
      properties: {
        status: { type: 'integer' },
        detail: { type: 'string' },
        source: {
          oneOf: [{ type: 'string' }, { type: 'boolean', const: false }],
        },
      },
      required: ['status', 'detail', 'source'],
      additionalProperties: false,
    },
  },
};

export default schema;

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
      items: { $ref: '#/definitions/not_found' },
    },
    not_found: {
      type: 'object',
      properties: {
        status: { type: 'integer', enum: [404] },
        code: { type: 'string', enum: ['veteran_not_found'] },
        title: { type: 'string', enum: ['Veteran Not Found']  },
      },
      required: ['status', 'code', 'title'],
      additionalProperties: false,
    },
  },
};

export default schema;

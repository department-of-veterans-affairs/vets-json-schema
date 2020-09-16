const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  $ref: '#/definitions/root',
  definitions: {
    root: {
      type: 'object',
      properties: { errors: { $ref: '#/definitions/errors' } },
      required: ['errors'],
      additionalProperties: true,
    },
    errors: {
      type: 'array',
      minItems: 1,
      items: {
        oneOf: [
          { $ref: '#/definitions/before_ama' },
          { $ref: '#/definitions/future_receipt_date' },
          { $ref: '#/definitions/unparsable_date' },
          { $ref: '#/definitions/invalid_benefit_type' },
          { $ref: '#/definitions/invalid_veteran_ssn' },
        ],
      },
    },
    before_ama: {
      type: 'object',
      properties: {
        status: { type: 'integer', enum: [422] },
        code: { type: 'string', enum: ['invalid_receipt_date'] },
        title: { type: 'string', enum: ['Invalid Receipt Date'] },
        detail: { type: 'string', pattern: 'is before AMA Activation Date' },
      },
      required: ['status', 'code', 'title', 'detail'],
      additionalProperties: false,
    },
    future_receipt_date: {
      type: 'object',
      properties: {
        status: { type: 'integer', enum: [422] },
        code: { type: 'string', enum: ['invalid_receipt_date'] },
        title: { type: 'string', enum: ['Invalid Receipt Date'] },
        detail: { type: 'string', pattern: 'is in the future' },
      },
      required: ['status', 'code', 'title', 'detail'],
      additionalProperties: false,
    },
    unparsable_date: {
      type: 'object',
      properties: {
        status: { type: 'integer', enum: [422] },
        code: { type: 'string', enum: ['invalid_receipt_date'] },
        title: { type: 'string', enum: ['Invalid Receipt Date'] },
        detail: { type: 'string', pattern: 'is not a valid date' },
      },
      required: ['status', 'code', 'title', 'detail'],
      additionalProperties: false,
    },
    invalid_benefit_type: {
      type: 'object',
      properties: {
        status: { type: 'integer', enum: [422] },
        code: { type: 'string', enum: ['invalid_benefit_type'] },
        title: { type: 'string', enum: ['Invalid Benefit Type'] },
        detail: { type: 'string', pattern: 'Benefit type .*? is invalid' },
      },
      required: ['status', 'code', 'title', 'detail'],
      additionalProperties: false,
    },
    invalid_veteran_ssn: {
      type: 'object',
      properties: {
        status: { type: 'integer', enum: [422] },
        code: { ssn: 'string', enum: ['invalid_veteran_ssn'] },
        title: { ssn: 'string', enum: ['Invalid Veteran SSN'] },
        detail: { type: 'string', pattern: 'SSN regex:' },
      },
      required: ['status', 'code', 'title', 'detail'],
      additionalProperties: false,
    },
  },
};

export default schema;

import definitions from '../../common/definitions';

const { ssn, requiredDate } = definitions;

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  $ref: '#/definitions/root',
  definitions: {
    root: {
      type: 'object',
      properties: {
        'X-VA-SSN': { $ref: '#/definitions/X-VA-SSN' },
        'X-VA-Receipt-Date': { $ref: '#/definitions/X-VA-Receipt-Date' },
      },
      additionalProperties: false,
      required: ['X-VA-SSN', 'X-VA-Receipt-Date'],
    },
    'X-VA-SSN': ssn,
    'X-VA-Receipt-Date': requiredDate,
  },
};

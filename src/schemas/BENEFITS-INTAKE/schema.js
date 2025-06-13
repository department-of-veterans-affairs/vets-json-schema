export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  additionalProperties: false,
  properties: {
    veteran: {
      type: 'object',
      additionalProperties: false,
      properties: {
        ssn: {
          type: 'string',
          pattern: '^\\d{9}$',
          example: '796126859',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          example: '1932-02-05',
        },
        postalCode: {
          type: 'string',
          pattern: '^\\d{5}$',
          example: '12345',
        },
        name: {
          type: 'object',
          additionalProperties: false,
          properties: {
            first: {
              type: 'string',
              example: 'Hector',
            },
            last: {
              type: 'string',
              example: 'Allen',
            },
          },
          required: ['first', 'last'],
        },
      },
      required: ['ssn', 'dateOfBirth', 'postalCode', 'name'],
    },
    dependent: {
      type: ['object', 'null'],
      additionalProperties: false,
      properties: {
        ssn: {
          type: ['string', 'null'],
          pattern: '^\\d{9}$',
          example: '796229088',
        },
        dateOfBirth: {
          type: ['string', 'null'],
          format: 'date',
          example: '1976-01-16',
        },
        name: {
          type: 'object',
          additionalProperties: false,
          properties: {
            first: {
              type: ['string', 'null'],
              example: 'Derrick',
            },
            last: {
              type: ['string', 'null'],
              example: 'Reid',
            },
          },
          required: ['first', 'last'],
        },
      },
      required: ['ssn', 'dateOfBirth', 'name'],
    },
  },
  required: ['veteran', 'dependent'],
};

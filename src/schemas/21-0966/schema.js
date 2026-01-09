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
          type: ['string', 'null'],
          format: 'date',
          example: '1932-02-05',
        },
        vaFileNumber: {
          type: ['string', 'null'],
          pattern: "^[cC]{0,1}\\d{7,9}$",
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
      required: ['ssn', 'dateOfBirth', 'name'],
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
    benefitType: {
      type: 'string',
      enum: ['compensation', 'pension', 'survivor'],
    }
  },
  required: ['veteran', 'dependent', 'benefitType'],
};

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  additionalProperties: false,
  properties: {
    dependent: {
      type: ['object', 'null'],
      additionalProperties: false,
      properties: {
        name: {
          type: 'object',
          additionalProperties: false,
          properties: {
            first: {
              type: 'string',
              example: 'John',
            },
            middle: {
              type: ['string', 'null'],
              example: 'Middle',
            },
            last: {
              type: 'string',
              example: 'Doe',
            },
          },
          required: ['first', 'middle', 'last'],
        },
        address: {
          type: 'object',
          additionalProperties: false,
          properties: {
            addressLine1: {
              type: 'string',
              example: '123 Main St',
            },
            addressLine2: {
              type: ['string', 'null'],
              example: 'Apt 1',
            },
            city: {
              type: 'string',
              example: 'Springfield',
            },
            stateCode: {
              type: 'string',
              example: 'IL',
            },
            country: {
              type: 'string',
              example: 'US',
            },
            zipCode: {
              type: 'string',
              example: '62704',
            },
            zipCodeSuffix: {
              type: ['string', 'null'],
              example: '6789',
            },
          },
          required: ['addressLine1', 'addressLine2', 'city', 'stateCode', 'country', 'zipCode', 'zipCodeSuffix'],
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          example: '1980-12-31',
        },
        relationship: {
          type: 'string',
          example: 'Spouse',
        },
        phone: {
          type: ['string', 'null'],
          pattern: '^\\d{10}$',
          example: '1234567890',
        },
        email: {
          type: ['string', 'null'],
          example: 'dependent@example.com',
        },
      },
      required: ['name', 'address', 'dateOfBirth', 'relationship', 'phone', 'email'],
    },
    veteran: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
          type: 'object',
          additionalProperties: false,
          properties: {
            first: {
              type: 'string',
              example: 'john',
            },
            middle: {
              type: ['string', 'null'],
              example: 'middle',
            },
            last: {
              type: 'string',
              example: 'doe',
            },
          },
          required: ['first', 'middle', 'last'],
        },
        address: {
          type: 'object',
          additionalProperties: false,
          properties: {
            addressLine1: {
              type: 'string',
              example: '123 Main St',
            },
            addressLine2: {
              type: ['string', 'null'],
              example: 'Apt 1',
            },
            city: {
              type: 'string',
              example: 'Springfield',
            },
            stateCode: {
              type: 'string',
              example: 'IL',
            },
            country: {
              type: 'string',
              example: 'US',
            },
            zipCode: {
              type: 'string',
              example: '62704',
            },
            zipCodeSuffix: {
              type: ['string', 'null'],
              example: '6789',
            },
          },
          required: ['addressLine1', 'addressLine2', 'city', 'stateCode', 'country', 'zipCode', 'zipCodeSuffix'],
        },
        ssn: {
          type: 'string',
          example: '123456789',
        },
        vaFileNumber: {
          type: ['string', 'null'],
          example: '123456789',
        },
        dateOfBirth: {
          type: 'string',
          format: 'date',
          example: '1980-12-31',
        },
        serviceNumber: {
          type: ['string', 'null'],
          example: '123456789',
        },
        serviceBranch: {
          type: ['string', 'null'],
          enum: ['ARMY', 'NAVY', 'AIR_FORCE', 'MARINE_CORPS', 'COAST_GUARD', 'SPACE_FORCE', 'NOAA', 'USPHS', null],
          example: 'ARMY',
        },
        phone: {
          type: ['string', 'null'],
          pattern: '^\\d{10}$',
          example: '1234567890',
        },
        email: {
          type: ['string', 'null'],
          example: 'veteran@example.com',
        },
      },
      required: [
        'name',
        'address',
        'ssn',
        'vaFileNumber',
        'dateOfBirth',
        'serviceNumber',
        'serviceBranch',
        'phone',
        'email',
      ],
    },
  },
  required: ['veteran', 'dependent'],
};

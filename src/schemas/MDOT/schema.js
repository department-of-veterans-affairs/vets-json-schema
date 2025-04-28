import schemaHelpers from '../../common/schema-helpers';

const addressWithIsMilitaryBase = {
  type: 'object',
  properties: {
    isMilitaryBase: {
      type: 'boolean',
      default: false,
    },
    country: {
      type: 'string',
    },
    street: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
    },
    street2: {
      type: 'string',
      maxLength: 50,
    },
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 51,
    },
    state: {
      type: 'string',
    },
    province: {
      type: 'string',
    },
    postalCode: {
      type: 'string',
      pattern: '(^\\d{5}$)|(^\\d{5}-\\d{4}$)',
    },
    internationalPostalCode: {
      type: 'string',
    },
  },
};

const supplies = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      deviceName: {
        type: 'string',
      },
      productName: {
        type: 'string',
      },
      productGroup: {
        type: 'string',
      },
      productId: {
        type: 'integer',
      },
      availableForReorder: {
        type: 'boolean',
      },
      lastOrderDate: {
        $ref: '#/definitions/date',
      },
      nextAvailabilityDate: {
        $ref: '#/definitions/date',
      },
      quantity: {
        type: 'number',
      },
      size: {
        type: 'string',
      },
      prescribedDate: {
        $ref: '#/definitions/date',
      },
    },
  },
};

const eligibility = {
  type: 'object',
  properties: {
    batteries: {
      type: 'boolean',
    },
    accessories: {
      type: 'boolean',
    },
  },
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL DEVICES ORDERING TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    supplies,
    eligibility,
    addressWithIsMilitaryBase,
  },
  properties: {},
  required: ['fullName', 'gender', 'vetEmail', 'dateOfBirth', 'supplies', 'eligibility'],
};

[
  ['email', 'vetEmail'],
  ['fullName'],
  ['addressWithIsMilitaryBase', 'permanentAddress'],
  ['addressWithIsMilitaryBase', 'temporaryAddress'],
  ['ssnLastFour'],
  ['gender'],
  ['date', 'dateOfBirth'],
  ['eligibility'],
  ['supplies'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

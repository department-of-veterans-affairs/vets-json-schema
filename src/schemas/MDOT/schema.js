import commonDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const { fullName, ssnLastFour, email, gender, date, address } = commonDefinitions;

const addressWithIsMilitaryBase = {
  ...address,
  isMilitaryBase: {
    type: 'boolean'
  }
}

const supplies = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      deviceName: {
        type: 'string'
      },
      productName: {
        type: 'string'
      },
      productGroup: {
        type: 'string'
      },
      productId: {
        type: 'integer'
      },
      availableForReorder: {
        type: 'boolean'
      },
      lastOrderDate: {
        $ref: '#/definitions/date'
      },
      nextAvailabilityDate: {
        $ref: '#/definitions/date'
      },
      quantity: {
        type: 'number'
      },
      size: {
        type: 'string'
      },
      prescribedDate: {
        $ref: '#/definitions/date'
      }
    }
  }
}

const eligibility = {
  type: 'object',
  properties: {
    batteries: {
      type: 'boolean'
    },
    accessories: {
      type: 'boolean'
    }
  }
}

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL DEVICES ORDERING TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName,
    email,
    gender,
    date,
    addressWithIsMilitaryBase,
    eligibility: eligibility,
    supplies: supplies
  },
  properties: {},
  required: ['privacyAgreementAccepted', 'fullName', 'permanentAddress', 'temporaryAddress', 'gender', 'vetEmail', 'dateOfBirth', 'supplies', 'eligibility'],
};

[
  ['privacyAgreementAccepted'],
  ['email', 'vetEmail'],
  ['fullName', 'fullName'],
  ['addressWithIsMilitaryBase', 'permanentAddress'],
  ['addressWithIsMilitaryBase', 'temporaryAddress'],
  ['ssnLastFour', 'ssnLastFour'],
  ['gender'],
  ['date', 'dateOfBirth'],
  ['eligibility'],
  ['supplies']
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

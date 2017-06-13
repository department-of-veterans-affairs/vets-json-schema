import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    phone: {
      type: 'string',
      pattern: '^[0-9]{10}$'
    },
  },
  properties: {
    relationship: {
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['spouse', 'child', 'parent', 'executor', 'other']
        },
        other: {
          type: 'string'
        }
      }
    },
    locationOfDeath: {
      type: 'object',
      required: ['location'],
      properties: {
        location: {
          type: 'string',
          enum: [
            'vaMedicalCenter',
            'stateVeteransHome',
            'nursingHome',
            'other'
          ]
        },
        other: {
          type: 'string'
        }
      }
    },
    address: schemaHelpers.getDefinition('address'),
    email: {
      type: 'string',
      format: 'email'
    },
    phone: schemaHelpers.getDefinition('phone'),
  }
};

[
  ['address'],
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['date', 'burialDate'],
  ['date', 'deathDate'],
  ['phone'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

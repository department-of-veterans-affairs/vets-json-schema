import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    usaPhone: {
      type: 'string',
      pattern: '^\\d{10}$'
    }
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
    email: {
      type: 'string',
      format: 'email'
    },
    phone: {
      $ref: '#/definitions/usaPhone'
    }
  }
};

[
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['date', 'burialDate'],
  ['date', 'deathDate'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

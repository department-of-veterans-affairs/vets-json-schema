import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VETERAN IDENTIFICATION CARD FORM',
  type: 'object',
  additionalProperties: false,
  definitions: {
  },
  properties: {
    serviceBranch: {
      type: 'string',
      enum: [
        'F', // Air Force
        'A', // Army
        'C', // Coast Guard
        'D', // DoD
        'M', // Marine Corps
        'N', // Navy
        'O', // NOAA
        'H', // Public Health Service
        '4', // Foreign Air Force
        '1', // Foreign Army
        '6', // Foreign Coast Guard
        '3', // Foreign Marine Corps
        '2', // Foreign Navy
        'X', // Other
        'Z', // Unknown
      ]
    },
    email: {
      type: 'string',
      format: 'email'
    },
    photo: {
      type: 'string'
    },
    dd214: Object.assign({}, originalDefinitions.files, {
      minItems: 1
    }),
    veteranDateOfBirth: {
      type: 'string',
      format: 'date'
    }
  }
};

[
  ['fullName', 'veteranFullName'],
  ['address', 'veteranAddress'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['phone'],
  ['gender']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

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
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    photo: {
      type: 'string'
    },
    dd214: Object.assign({}, originalDefinitions.files, {
      minItems: 1,
      maxItems: 1
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
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

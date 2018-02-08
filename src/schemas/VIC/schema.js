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
        'M', // Marine Corps
        'N', // Navy
      ]
    },
    email: {
      type: 'string',
      format: 'email'
    },
    photo: originalDefinitions.files.items,
    dd214: Object.assign({}, originalDefinitions.files, {
      minItems: 1
    }),
    veteranDateOfBirth: {
      type: 'string',
      format: 'date'
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'veteranFullName'],
  ['address', 'veteranAddress'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['phone'],
  ['gender']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

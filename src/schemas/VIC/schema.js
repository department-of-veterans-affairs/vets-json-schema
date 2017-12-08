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
  },
};

[
  ['fullName', 'veteranFullName'],
  ['address', 'veteranAddress'],
  ['dischargeType']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

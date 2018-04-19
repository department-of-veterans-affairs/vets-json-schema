import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DECLARATION OF STATUS OF DEPENDENTS',
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
    claimantEmail: {
      type: 'string',
      format: 'email'
    }
  }
};

[
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['ssn', 'claimantSocialSecurityNumber'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['vaFileNumber'],
  ['address', 'claimantAddress'],
  ['maritalStatus'],
  ['date', 'spouseDateOfBirth'],
  ['marriages'],
  ['marriages', 'spouseMarriages'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

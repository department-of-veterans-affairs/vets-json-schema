import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'INCOME, NET WORTH, AND EMPLOYMENT STATEMENT',
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    locationOfMarriage: {
      type: 'string'
    },
    spouseIsVeteran: {
      type: 'boolean'
    },
    liveWithSpouse: {
      type: 'boolean'
    },
    reasonForNotLivingWithSpouse: {
      type: 'string'
    },
    monthlySpousePayment: {
      type: 'integer'
    },
  },
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['address', 'veteranAddress'],
  ['phone', 'dayPhone'],
  ['phone', 'nightPhone'],
  ['phone', 'mobilePhone'],
  ['maritalStatus'],
  ['date', 'dateOfMarriage'],
  ['fullName', 'spouseFullName'],
  ['date', 'spouseDateOfBirth'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['vaFileNumber', 'spouseVaFileNumber'],
  ['address', 'spouseAddress'],
  ['marriages'],
  ['marriages', 'spouseMarriages']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

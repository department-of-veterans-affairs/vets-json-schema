import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'REQUEST TO OPT-OUT OF INFORMATION SHARING WITH EDUCATIONAL INSTITUTIONS (VA FORM 22-0993)',
  type: 'object',
  definitions: _.pick(definitions, [
    'fullName',
    'ssn',
    'vaFileNumber',
    'privacyAgreementAccepted'
  ]),
  additionalProperties: false,
  properties: {},
  oneOf: [
    {
      "required" : ["vaFileNumber"]
    },
    {
      "required" : ["veteranSocialSecurityNumber"]
    }
  ],
  required: ['privacyAgreementAccepted', 'veteranFullName']
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['privacyAgreementAccepted']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

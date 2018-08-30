import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from "lodash";


let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'AUTHORIZATION TO DISCLOSE INFORMATION TO THE DEPARTMENT OF VETERANS AFFAIRS (21-4142/21-4142a)',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'address',
    'dateRange'
  ]),
  anyOf: [
    {
      "required" : ["vaFileNumber"]
    },
    {
      "required" : ["veteranSocialSecurityNumber"]
    }
  ],
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    limitedConsent: {
      type: 'string'
    },
    providerFacility: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          providerFacilityName: {
            type: 'string'
          },
          treatmentDateRange: {
            $ref: '#/definitions/dateRange'
          },
          providerFacilityAddress: {
            $ref: '#/definitions/address'
          }
        }
      }
    }
  },
  required: ['privacyAgreementAccepted', 'veteranFullName']
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['centralMailVaFile', 'vaFileNumber'],
  ['date', 'veteranDateOfBirth'],
  ['centralMailAddress', 'veteranAddress'],
  ['phone', 'veteranPhone'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
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
    },
    spouseIsVeteran: {
      type: 'boolean'
    },
    liveWithSpouse: {
      type: 'boolean'
    },
    monthlySpousePayment: {
      type: 'number'
    },
    remarks: {
      type: 'string'
    },
    dependents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: schemaHelpers.getDefinition('fullName'),
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childInHousehold: {
            type: 'boolean'
          },
          childAddress: schemaHelpers.getDefinition('address'),
          personWhoLivesWithChild: schemaHelpers.getDefinition('fullName'),
          childPlaceOfBirth: {
            type: 'string'
          },
          childSocialSecurityNumber: schemaHelpers.getDefinition('ssn'),
          childRelationship: {
            type: 'string',
            enum: [
              'biological',
              'adopted',
              'stepchild'
            ]
          },
          attendingCollege: {
            type: 'boolean'
          },
          disabled: {
            type: 'boolean'
          },
          married: {
            type: 'boolean'
          },
          previouslyMarried: {
            type: 'boolean'
          }
        }
      }
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['usaPhone', 'dayPhone'],
  ['usaPhone', 'nightPhone'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['ssn', 'claimantSocialSecurityNumber'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['vaFileNumber'],
  ['vaFileNumber', 'spouseVaFileNumber'],
  ['address', 'claimantAddress'],
  ['address', 'spouseAddress'],
  ['maritalStatus'],
  ['date', 'spouseDateOfBirth'],
  ['marriages'],
  ['marriages', 'spouseMarriages'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

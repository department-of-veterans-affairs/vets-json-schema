import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
let modifiedToursOfDuty = definitions.toursOfDuty;
delete modifiedToursOfDuty.items.properties.benefitsToApplyTo;
delete modifiedToursOfDuty.items.properties.applyPeriodToSelected;
delete modifiedToursOfDuty.items.properties.serviceStatus;
delete modifiedToursOfDuty.items.required;

_.merge(modifiedToursOfDuty, {
  items: {
    properties: {
      rank: {
        type: 'string'
      },
      serviceNumber: {
        type: 'string'
      },
      placeOfEntry: {
        type: 'string'
      },
      placeOfSeparation: {
        type: 'string'
      }
    }
  }
});

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    dateRange: definitions.dateRange,
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
    toursOfDuty: modifiedToursOfDuty,
    claimantEmail: {
      type: 'string',
      format: 'email'
    },
    claimantPhone: schemaHelpers.getDefinition('usaPhone'),
  }
};

[
  ['address', 'claimantAddress'],
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

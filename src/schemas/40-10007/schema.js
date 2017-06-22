import constants from '../../common/constants';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
let modifiedToursOfDuty = definitions.toursOfDuty;
modifiedToursOfDuty.items.required = ['serviceBranch'];
delete modifiedToursOfDuty.items.properties.benefitsToApplyTo;
delete modifiedToursOfDuty.items.properties.applyPeriodToSelected;
delete modifiedToursOfDuty.items.properties.serviceStatus;

_.merge(modifiedToursOfDuty, {
  items: {
    properties: {
      dischargeType: {
        type: 'string',
        'enum': constants.dischargeTypes.map(option => option.value)
      },
      rank: {
        type: 'string'
      }
    }
  }
});

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR PRE-NEED DETERMINATION OF ELIGIBILITY IN A VA NATIONAL CEMETARY',
  type: 'object',
  additionalProperties: false,
  definitions: {
    dateRange: definitions.dateRange
  },
  properties: {
    relationship: {
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: [
            'servicemember',
            'spouseOrChild',
            'other'
          ]
        },
        other: {
          type: 'string'
        }
      }
    },
    veteranMaidenName: {
      type: 'string'
    },
    sponsorMilitaryServiceNumber: {
      type: 'string'
    },
    sponsorVAClaimNumber: {
      type: 'string'
    },
    sponsorPlaceOfBirth: {
      type: 'string'
    },
    sponsorDeceased: {
      type: 'string',
      'enum': ['Y', 'N', 'U']
    },
    sponsorGender: {
      type: 'string',
      'enum': ['F', 'M']
    },
    sponsorMaritalStatus: {
      type: 'string',
      'enum': [
        'single',
        'separated',
        'married',
        'divorced',
        'widowed'
      ]
    },
    sponsorMilitaryStatus: {
      type: 'object',
      properties: {
        veteran: {
          type: 'boolean'
        },
        retiredActiveDuty: {
          type: 'boolean'
        },
        diedOnActiveDuty: {
          type: 'boolean'
        },
        retiredReserve: {
          type: 'boolean'
        },
        retiredNationalGuard: {
          type: 'boolean'
        },
        deathInactiveDuty: {
          type: 'boolean'
        },
        other: {
          type: 'boolean'
        }
      }
    },
    toursOfDuty: modifiedToursOfDuty,
    previousNames: {
      type: 'array',
      items: schemaHelpers.getDefinition('fullName')
    },
  }
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['date', 'veteranDateOfBirth'],
  ['fullName', 'sponsorFullName'],
  ['ssn', 'sponsorSocialSecurityNumber'],
  ['date', 'sponsorDateOfBirth'],
  ['date', 'sponsorDateOfDeath'],
  ['address', 'sponsorAddress'],
  ['gender', 'sponsorGender']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;


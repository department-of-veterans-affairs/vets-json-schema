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
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string'
        },
        aptNum: {
          type: 'string',
          minLength: 1,
          maxLength: 5
        },
        city: {
          type: 'string'
        },
        state: {
          type: 'string',
          minLength: 2,
          maxLength: 2
        },
        country: {
          type: 'string',
          minLength: 2,
          maxLength: 2
        },
        postalCode1: {
          type: 'string',
          minLength: 5,
          maxLength: 5
        },
        postalCode2: {
          type: 'string',
          minLength: 4,
          maxLength: 4
        }
      }
    },
    dateRange: definitions.dateRange
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
    previousNames: {
      type: 'array',
      items: schemaHelpers.getDefinition('fullName')
    },
    claimantEmail: {
      type: 'string',
      format: 'email'
    },
    burialAllowance: {
      type: 'boolean'
    },
    plotAllowance: {
      type: 'boolean'
    },
    transportation: {
      type: 'boolean'
    },
    amountIncurred: {
      type: 'number'
    },
    burialAllowanceRequested: {
      type: 'string',
      'enum': [
        'nonService',
        'service',
        'vaMC'
      ]
    },
    burialCost: {
      type: 'number'
    },
    previouslyReceivedAllowance: {
      type: 'boolean'
    },
    incurredExpenses: {
      type: 'boolean'
    },
    benefitsUnclaimedRemains: {
      type: 'boolean'
    },
    placeOfRemains: {
      type: 'string'
    },
    federalCemetery: {
      type: 'boolean'
    },
    stateCemetery: {
      type: 'boolean'
    },
    govtContributions: {
      type: 'boolean'
    },
    amountGovtContribution: {
      type: 'number'
    },
    placeOfBirth: {
      type: 'string'
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['address', 'claimantAddress'],
  ['usaPhone', 'claimantPhone'],
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['date', 'burialDate'],
  ['date', 'deathDate'],
  ['date', 'veteranDateOfBirth'],
  ['files', 'deathCertificate'],
  ['files', 'transportationReceipts']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

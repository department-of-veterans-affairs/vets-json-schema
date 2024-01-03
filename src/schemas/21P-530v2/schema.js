import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
const modifiedToursOfDuty = definitions.toursOfDuty;
delete modifiedToursOfDuty.items.properties.benefitsToApplyTo;
delete modifiedToursOfDuty.items.properties.applyPeriodToSelected;
delete modifiedToursOfDuty.items.properties.serviceStatus;
delete modifiedToursOfDuty.items.required;

_.merge(modifiedToursOfDuty, {
  items: {
    properties: {
      rank: {
        type: 'string',
      },
      serviceNumber: {
        type: 'string',
      },
      placeOfEntry: {
        type: 'string',
      },
      placeOfSeparation: {
        type: 'string',
      },
    },
  },
});

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    dateRange: definitions.dateRange,
  },
  anyOf: [
    {
      required: ['vaFileNumber'],
    },
    {
      required: ['veteranSocialSecurityNumber'],
    },
  ],
  properties: {
    relationship: {
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['spouse', 'child', 'parent', 'executor', 'funeralDirector', 'otherFamilyOrFriend'],
        },
      },
    },
    locationOfDeath: {
      type: 'object',
      required: ['location'],
      properties: {
        location: {
          type: 'string',
          enum: ['atHome', 'nursingHomePaid', 'nursingHomeUnpaid', 'vaMedicalCenter', 'stateVeteransHome', 'other'],
        },
        nursingHomePaid: {
          type: 'object',
          properties: {
            facilityName: {
              type: 'string',
            },
            facilityLocation: {
              type: 'string',
            },
          },
        },
        vaMedicalCenter: {
          type: 'object',
          properties: {
            facilityName: {
              type: 'string',
            },
            facilityLocation: {
              type: 'string',
            },
          },
        },
        stateVeteransHome: {
          type: 'object',
          properties: {
            facilityName: {
              type: 'string',
            },
            facilityLocation: {
              type: 'string',
            },
          },
        },
        other: {
          type: 'string',
        },
      },
    },
    toursOfDuty: modifiedToursOfDuty,
    previousNames: {
      type: 'array',
      items: schemaHelpers.getDefinition('fullName'),
    },
    claimantEmail: {
      type: 'string',
      format: 'email',
    },
    burialAllowance: {
      type: 'boolean',
    },
    plotAllowance: {
      type: 'boolean',
    },
    transportation: {
      type: 'boolean',
    },
    amountIncurred: {
      type: 'number',
    },
    burialAllowanceRequested: {
      type: 'string',
      enum: ['service', 'nonService', 'vaMC'],
    },
    burialCost: {
      type: 'number',
    },
    previouslyReceivedAllowance: {
      type: 'boolean',
    },
    benefitsUnclaimedRemains: {
      type: 'boolean',
    },
    placeOfRemains: {
      type: 'string',
    },
    federalCemetery: {
      type: 'boolean',
    },
    stateCemetery: {
      type: 'boolean',
    },
    govtContributions: {
      type: 'boolean',
    },
    amountGovtContribution: {
      type: 'number',
    },
    placeOfBirth: {
      type: 'string',
    },
    officialPosition: {
      type: 'string',
    },
    firmName: {
      type: 'string',
    },
  },
  required: ['privacyAgreementAccepted', 'claimantAddress', 'veteranFullName'],
};

[
  ['privacyAgreementAccepted'],
  ['centralMailAddress', 'claimantAddress'],
  ['usaPhone', 'claimantPhone'],
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'claimantSocialSecurityNumber'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['centralMailVaFile', 'vaFileNumber'],
  ['date', 'burialDate'],
  ['date', 'deathDate'],
  ['date', 'claimantDateOfBirth'],
  ['date', 'veteranDateOfBirth'],
  ['files', 'militarySeparationDocuments'],
  ['files', 'deathCertificate'],
  ['files', 'transportationReceipts'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

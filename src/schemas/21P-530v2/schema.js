import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const newDefinitions = _.cloneDeep(definitions);
const modifiedPreviousNames = newDefinitions.fullName;
delete modifiedPreviousNames.required;

const serviceBranchDefinitions = {
  type: 'string',
  enum: [
    'Air Force',
    'Air Force Reserve',
    'Air National Guard',
    'Army',
    'Army National Guard',
    'Army Reserve',
    'Coast Guard',
    'Coast Guard Reserve',
    'Marine Corps',
    'Marine Corps Reserve',
    'Navy',
    'Navy Reserve',
    'Other',
  ],
};

const modifiedToursOfDuty = {
  type: 'array',
  minItems: 1,
  maxItems: 100,
  items: {
    type: 'object',
    properties: {
      serviceBranch: serviceBranchDefinitions,
      dateRange: {
        $ref: '#/definitions/dateRange',
      },
      placeOfEntry: {
        type: 'string',
      },
      placeOfSeparation: {
        type: 'string',
      },
      rank: {
        type: 'string',
      },
      unit: {
        type: 'string',
      },
    },
    required: ['serviceBranch'],
  },
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    dateRange: newDefinitions.dateRange,
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
    finalRestingPlace: {
      type: 'object',
      required: ['location'],
      properties: {
        location: {
          type: 'string',
          enum: ['cemetary', 'mausoleum', 'privateResidence', 'other'],
        },
        other: {
          type: 'string',
        },
      },
    },
    toursOfDuty: modifiedToursOfDuty,
    previousNames: {
      type: 'array',
      items: {
        ...modifiedPreviousNames,
        required: ['first', 'last'],
      },
    },
    serviceNumber: {
      type: 'string',
    },
    claimantEmail: {
      type: 'string',
      format: 'email',
    },
    unclaimedRemains: {
      type: 'boolean',
    },
    burialAllowanceRequested: {
      type: 'string',
      enum: ['service', 'nonService'],
    },
    burialCost: {
      type: 'number',
    },
    burialExpenseResponsibility: {
      type: 'boolean',
    },
    plotExpenseResponsibility: {
      type: 'boolean',
    },
    allowanceStatementOfTruth: {
      type: 'boolean',
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
    transportationExpenses: {
      type: 'boolean',
    },
    placeOfBirth: {
      type: 'string',
    },
  },
  required: ['privacyAgreementAccepted', 'claimantAddress', 'veteranFullName'],
};

[
  ['privacyAgreementAccepted'],
  ['centralMailAddress', 'claimantAddress'],
  ['usaPhone', 'claimantPhone'],
  ['usaPhone', 'claimantIntPhone'],
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

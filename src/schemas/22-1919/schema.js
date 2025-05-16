import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, ['date']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-1919',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: ['certifyingOfficial', 'institutionDetails', 'institutionClassification', 'hasConflictOfInterest', 'officialsReceiveBenefits', 'conflictOfInterestDetails', 'statementOfTruthSignature', 'dateSigned'],
  properties: {
    certifyingOfficial: {
      type: 'object',
      required: ['first', 'last', 'role'],
      properties: {
        first: {
          type: 'string',
        },
        last: {
          type: 'string',
        },
        role: { 
          // ok to use string? Radio field has multiple options, but only one can beselected.
          type: 'string',
          items: {
            type: 'string',
            enumNames: ['Certifying Official', 'Owner', 'Officer', 'Other'] // How to handle "other" ?
          }
        },
      },
    },
    institutionDetails: {
      type: 'object',
      hasVaFacilityCode: {
        type: 'string',
        enum: ['yes', 'not yet'],
      },
      facilityCode: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]{8}$',
      },
      institutionName: {
        type: 'string',
      },
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          state: {
            type: 'string',
            pattern: '^[A-Z]{2}$',
          },
          zip: {
            type: 'string',
            pattern: '^\\d{5}(-\\d{4})?$',
          },
        },
      },
      required: ['facilityCode', 'hasVaFacilityCode'],
    },
    isProprietaryInstitution: {
      $ref: '#/definitions/yesNoSchema'
    },
    hasConflictOfInterest: {
      $ref: '#/definitions/yesNoSchema'
    },
    officialsReceiveBenefits: {
      $ref: '#/definitions/yesNoSchema'
    },
    conflictOfInterestDetails: {
      type: 'object',
      required: ['firstName', 'lastName', 'title'],
      properties: {
          first: {
            type: 'string',
          },
          last: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
      },
    },
  },
};

export default schema;

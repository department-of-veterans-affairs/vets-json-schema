import constants from '../../common/constants';
import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'EDUCATIONAL/VOCATIONAL COUNSELING APPLICATION (28-8832)',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'dateRange',
  ]),
  properties: {
    applicantEmail: {
      type: 'string',
      format: 'email'
    },
    applicantRelationshipToVeteran: {
      type: 'string'
    },
    seekingRestorativeTraining: {
      type: 'boolean'
    },
    seekingVocationalTraining: {
      type: 'boolean'
    },
    receivedPamphlet: {
      type: 'boolean'
    },
    veteranServiceBranch: {
      type: 'string'
    },
    divorceOrAnnulmentPending: {
      type: 'boolean',
    },
    applicantAgeAtRemarriage: {
      type: 'integer',
    },
    // TODO: Update this once backend requirements are determined
    previousBenefitApplications: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    serviceHistory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          serviceBranch: {
            type: 'string'
          },
          dateRange: {
            $ref: '#/definitions/dateRange'
          },
          dischargeType: {
            type: 'string',
            'enum': constants.dischargeTypes.map(option => option.value)
          },
        }
      }
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['address', 'applicantAddress'],
  ['date', 'applicantDateOfBirth'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'veteranDateOfDeathMIAPOW'],
  ['fullName', 'applicantFullName'],
  ['fullName', 'veteranFullName'],
  ['fullName', 'previousVeteranBenefitsFullName'],
  ['gender', 'applicantGender'],
  ['phone', 'applicantHomePhone'],
  ['phone', 'applicantMobilePhone'],
  ['ssn', 'applicantSocialSecurityNumber'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['vaFileNumber', 'veteranVaFileNumber'],
  ['vaFileNumber', 'previousBenefitsVaFileNumber'],
  ['privacyAgreementAccepted']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
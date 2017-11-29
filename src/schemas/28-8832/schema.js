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
    'fullName',
    'address',
    'phone',
    'ssn',
    'date',
    'dateRange',
    'gender'
  ]),
  properties: {
    applicantFullName: {
      $ref: '#/definitions/fullName'
    },
    applicantSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    applicantGender: {
      $ref: '#/definitions/gender'
    },
    applicantEmail: {
      type: 'string',
      format: 'email'
    },
    applicantDateOfBirth: {
      $ref: '#/definitions/date'
    },
    applicantRelationshipToVeteran: {
      type: 'string'
    },
    applicantHomePhone: {
      $ref: '#/definitions/phone'
    },
    applicantMobilePhone: {
      $ref: '#/definitions/phone'
    },
    applicantAddress: {
      $ref: '#/definitions/address'
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
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date'
    },
    veteranServiceBranch: {
      type: 'string'
    },
    veteranDateofDeathMIAPOW: {  // date of death, M.I.A., or P.O.W.
      $ref: '#/definitions/date'
    },
    divorceOrAnnulmentPending: {
      type: 'boolean',
    },
    applicantAgeAtRemarriage: {
      type: 'number',
    },
    previousBenefitApplications: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    previousBenefitsVeteranFullName: {
      $ref: '#/definitions/fullName'
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
  ['vaFileNumber'],
  ['vaFileNumber', 'veteranVaFileNumber'],
  ['vaFileNumber', 'previousBenefitsVaFileNumber'],
  ['privacyAgreementAccepted']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
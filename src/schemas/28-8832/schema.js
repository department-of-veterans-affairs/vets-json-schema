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
    'privacyAgreementAccepted',
    'gender'
  ]),
  properties: {
    applicantFullName: {
      $ref: '#/definition/fullName'
    },
    applicantSocialSecurityNumber: {
      $ref: '#/definition/ssn'
    },
    applicantGender: {
      $ref: '#/definition/gender'
    },
    applicantEmail: {
      $ref: '#/definition/email'
    },
    applicantDateOfBirth: {
      $ref: '#/definition/date'
    },
    applicantRelationshipToVeteran: {
      // TODO: Build relationship enum for form
    },
    applicantHomePhone: {
      $ref: '#/definition/phone'
    },
    applicantMobilePhone: {
      $ref: '#/definition/phone'
    },
    applicantAddress: {
      $ref: '#/definition/address'
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
      $ref: '#/definition/fullName'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definition/ssn'
    },
    veteranDateOfBirth: {
      $ref: '#/definition/date'
    },
    veteranServiceBranch: {
      type: 'string'
    },
    veteranDateofDeathMIAPOW: {  // date of death, M.I.A., or P.O.W.
      $ref: '#/definition/date'
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
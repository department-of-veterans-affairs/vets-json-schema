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
    'dateRange'
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
    // TODO: Determine the correct type to use for previousBenefitApplications
    previousBenefitApplications: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['privacyAgreementAccepted'] // TODO Determine set of required fields
};

[
  ['address', 'applicantAddress'],
  ['date', 'applicantDateOfBirth'], // TODO Change if partial dates disallowed
  ['date', 'veteranDateOfBirth'], // TODO Change if partial dates disallowed
  ['date', 'veteranDateOfDeathMIAPOW'], // TODO Change if partial dates disallowed
  ['fullName', 'applicantFullName'],
  ['fullName', 'veteranFullName'],
  ['fullName', 'previousVeteranBenefitsFullName'],
  ['gender', 'applicantGender'],
  ['phone', 'applicantPrimaryPhone'],
  ['phone', 'applicantOtherPhone'],
  ['ssn', 'applicantSocialSecurityNumber'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber', 'applicantVaFileNumber'],
  ['vaFileNumber', 'veteranVaFileNumber'],
  ['vaFileNumber', 'previousBenefitsVaFileNumber'],
  ['serviceHistory', 'applicantServiceHistory'],
  ['privacyAgreementAccepted']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

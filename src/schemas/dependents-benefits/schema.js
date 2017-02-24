import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' APPLICATION FOR VA EDUCATION BENEFITS",
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    serviceBranch: {
      type: 'string'
    },
    currentlyActiveDuty: {
      type: 'boolean'
    },
    outstandingFelony: {
      type: 'boolean'
    },
    restorativeTraining: {
      type: 'boolean'
    },
    vocationalTraining: {
      type: 'boolean'
    },
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['ssn', 'relativeSocialSecurityNumber'],
  ['gender'],
  ['date', 'relativeDateOfBirth'],
  ['fullName', 'relativeFullName'],
  ['address', 'relativeAddress'],
  ['phone', 'homePhone'],
  ['phone', 'mobilePhone'],
  ['bankAccount'],
  ['secondaryContact'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'veteranDateOfDeath'],
  ['date', 'educationStartDate'],
  ['educationType'],
  ['school'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

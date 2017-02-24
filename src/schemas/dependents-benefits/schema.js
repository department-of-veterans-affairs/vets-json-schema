import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import constants from '../../common/constants';
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
    trainingState: {
      enum: constants.usaStates
    },
    educationObjective: {
      type: 'string'
    },
    educationalCounseling: {
      type: 'boolean'
    },
    spouseInfo: {
      type: 'object',
      properties: {
        divorcePending: {
          type: 'boolean'
        },
        remarried: {
          type: 'boolean'
        }
      }
    },
    benefit: {
      type: 'string',
      enum: ['chapter35', 'chapter33']
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
  ['relationship'],
  ['date', 'spouseInfo.remarriageDate'],
  ['date', 'benefitsRelinquishedDate'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

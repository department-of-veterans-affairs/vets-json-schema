import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';
import set from 'lodash/fp/set';

const updatedDefinitions = set('educationType.enum', 
  definitions.educationType.enum.filter(x => x !== 'tuitionTopUp'),
  definitions
);

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING (22-5495)",
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(updatedDefinitions, [
    'dateRange',
    'educationType'
  ]),
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
    benefit: {
      type: 'string',
      enum: ['chapter35', 'chapter33']
    },
    educationObjective: {
      type: 'string'
    },
    programName: {
      type: 'string'
    },
    reasonForChange: {
      type: 'string'
    },
    remarks: {
      type: 'string'
    },
  },
  required: ['privacyAgreementAccepted', 'relativeFullName']
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'relativeFullName'],
  ['ssn', 'relativeSocialSecurityNumber'],
  ['vaFileNumber', 'relativeVaFileNumber'],
  ['vaFileNumber'],
  ['gender'],
  ['date', 'relativeDateOfBirth'],
  ['address', 'relativeAddress'],
  ['phone', 'homePhone'],
  ['phone', 'mobilePhone'],
  ['preferredContactMethod'],
  ['bankAccount'],
  ['secondaryContact'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'veteranDateOfDeath'],
  ['date', 'trainingEndDate'],
  ['relationship'],
  ['toursOfDuty'],
  ['educationProgram'],
  ['school', 'oldSchool'],
  ['bankAccountChange']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

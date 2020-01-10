import _ from 'lodash';
import set from 'lodash/fp/set';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const updatedDefinitions = set(
  'educationType.enum',
  definitions.educationType.enum.filter(x => x !== 'tuitionTopUp'),
  definitions,
);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR VA EDUCATION BENEFITS UNDER THE NATIONAL CALL TO SERVICE (NCS) PROGRAM (22-1990N)',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(updatedDefinitions, ['educationType', 'dateRange']),
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    educationObjective: {
      type: 'string',
    },
    payHighestRateBenefit: {
      type: 'boolean',
    },
    seniorRotcScholarshipProgram: {
      type: 'boolean',
    },
    civilianBenefitsAssistance: {
      type: 'boolean',
    },
    civilianBenefitsSource: {
      type: 'string',
    },
  },
  required: ['privacyAgreementAccepted', 'veteranFullName'],
};

[
  ['privacyAgreementAccepted'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['gender'],
  ['date', 'veteranDateOfBirth'],
  ['fullName', 'veteranFullName'],
  ['address', 'veteranAddress'],
  ['phone', 'homePhone'],
  ['phone', 'mobilePhone'],
  ['bankAccount'],
  ['educationProgram'],
  ['currentlyActiveDuty'],
  ['toursOfDuty'],
  ['preferredContactMethod'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

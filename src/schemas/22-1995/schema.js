import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
definitions.educationType.enum.push('cooperativeTraining');

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING (22-1995)',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'fullName',
    'address',
    'phone',
    'ssn',
    'school',
    'bankAccount',
    'serviceBefore1977',
    'date',
    'dateRange',
    'educationType',
    'preferredContactMethod',
    'privacyAgreementAccepted',
  ]),
  anyOf: [
    {
      required: ['vaFileNumber'],
    },
    {
      required: ['veteranSocialSecurityNumber'],
    },
  ],
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    homePhone: {
      $ref: '#/definitions/phone',
    },
    mobilePhone: {
      $ref: '#/definitions/phone',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    preferredContactMethod: {
      $ref: '#/definitions/preferredContactMethod',
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    benefit: {
      type: 'string',
      enum: ['chapter33', 'chapter30', 'chapter1606', 'transferOfEntitlement', 'chapter32'],
    },
    educationType: {
      $ref: '#/definitions/educationType',
    },
    educationObjective: {
      type: 'string',
    },
    programName: {
      type: 'string',
    },
    newSchool: {
      $ref: '#/definitions/school',
    },
    oldSchool: {
      $ref: '#/definitions/school',
    },
    trainingEndDate: {
      $ref: '#/definitions/date',
    },
    reasonForChange: {
      type: 'string',
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    serviceBefore1977: {
      $ref: '#/definitions/serviceBefore1977',
    },
    toursOfDuty: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          serviceBranch: {
            type: 'string',
          },
          dateRange: {
            $ref: '#/definitions/dateRange',
          },
        },
      },
    },
    civilianBenefitsAssistance: {
      type: 'boolean',
    },
    nonVaAssistance: {
      type: 'boolean',
    },
    remarks: {
      type: 'string',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
    isEdithNourseRogersScholarship: {
      type: 'boolean',
    },
    isEnrolledStem: {
      type: 'boolean',
    },
    isPursuingTeachingCert: {
      type: 'boolean',
    },
    isActiveDuty: {
      type: 'boolean',
    },
  },
  required: ['privacyAgreementAccepted', 'veteranFullName'],
};

[['vaFileNumber'], ['bankAccountChange']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

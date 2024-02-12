import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
definitions.educationType.enum.push('cooperativeTraining');

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING (22-1995)',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'fullName',
    'address',
    'usaPhone',
    'ssn',
    'school',
    'bankAccount',
    'serviceBefore1977',
    'date',
    'dateRange',
    'educationType',
    'educationTypeUpdate',
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
    dateOfBirth: {
      $ref: '#/definitions/date',
    },
    applicantGender: {
      type: 'string',
      enum: ['F', 'M'],
    },
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    homePhone: {
      $ref: '#/definitions/usaPhone',
    },
    mobilePhone: {
      $ref: '#/definitions/usaPhone',
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
      enum: [
        'chapter33Post911',
        'chapter33FryScholarship',
        'chapter30',
        'chapter1606',
        'transferOfEntitlement',
        'chapter32',
      ],
    },
    benefitUpdate: {
      type: 'string',
      enum: [
        'chapter30',
        'chapter1606',
        'chapter33Post911',
        'transferOfEntitlement',
        'chapter33FryScholarship',
        'chapter35',
      ],
    },
    changeAnotherBenefit: {
      type: 'string',
      enum: ['Yes', 'No'],
    },
    benefitAppliedFor: {
      type: 'string',
      enum: ['1', '2'],
    },
    educationType: {
      $ref: '#/definitions/educationType',
    },
    educationTypeUpdate: {
      $ref: '#/definitions/educationTypeUpdate',
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

[['vaFileNumber'], ['bankAccountChange'], ['bankAccountChangeUpdate']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

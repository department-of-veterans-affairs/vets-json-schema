import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
definitions.educationType.enum.push('cooperativeTraining');

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'APPLICATION FOR STEM (22-10203)',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'fullName',
    'address',
    'phone',
    'ssn',
    'school',
    'bankAccount',
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
      enum: [
        'chapter33',
        'chapter30',
        'chapter1606',
        'transferOfEntitlement',
        'chapter32',
      ],
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
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

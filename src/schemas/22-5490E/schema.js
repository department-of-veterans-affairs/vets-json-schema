import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' APPLICATION FOR VA EDUCATION BENEFITS (22-5490E)",
  type: 'object',
  additionalProperties: false,
  definitions: _.merge(
    _.pick(definitions, [
      'address',
      'fullName',
      'bankAccount',
      'date',
      'preferredContactMethod',
      'privacyAgreementAccepted',
    ]),
    {
      internationalPhone: {
        type: 'string',
        pattern: '^\\d{10,15}$',
      },
      year: {
        type: 'integer',
        minimum: 1900,
      },
    },
  ),
  properties: {
    userFullName: {
      $ref: '#/definitions/fullName',
    },
    dateOfBirth: {
      $ref: '#/definitions/date',
    },
    selectedVeteran: {
      type: 'string',
    },
    relationshipToVeteran: {
      type: 'string',
      enum: [
        'Spouse',
        'Child',
      ],
    },
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    benefitSelection: {
      type: 'string',
      enum: [
        'Fry Scholarship (Chapter 33)',
        "Survivors’ and Dependents’ Educational Assistance (DEA, Chapter 35)",
      ],
    },
    highSchoolDiploma: {
      type: 'string',
      enum: [
        'Yes',
        'No',
      ],
    },
    highSchoolDiplomaDate: {
      $ref: '#/definitions/date',
    },
    marriageDate: {
      $ref: '#/definitions/date',
    },
    marriageInformation: {
      type: 'string',
      enum: [
        'Married',
        'Divorced (or a divorce is in progress)',
        'Marriage was annulled (or annulment is in progress)',
        'Widowed',
      ],
    },
    remarriage: {
      type: 'boolean',
    },
    remarriageDate: {
      $ref: '#/definitions/date',
    },
    outstandingFelony: {
      type: 'boolean',
    },
    mobilePhoneNumber: {
      $ref: '#/definitions/internationalPhone',
    },
    phoneNumber: {
      $ref: '#/definitions/internationalPhone',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    livesOnMilitaryBase: {
      type: 'boolean',
    },
    address: {
      $ref: '#/definitions/address',
    },
    contactMethod: {
      $ref: '#/definitions/preferredContactMethod',
    },
    receiveTextMessages: {
      type: 'string',
      enum: [
        'Yes, send me text message notifications',
        'No, just send me email notifications',
      ],
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: [
    'bankAccount',
    'dateOfBirth',
    'email',
    'userFullName',
  ],
};

export default schema;

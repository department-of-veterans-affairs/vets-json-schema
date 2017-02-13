import definitions from '../../common/definitions';
import _ from 'lodash';

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR FAMILY MEMBER TO USE TRANSFERRED BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions,
    'privacyAgreementAccepted',
    'ssn',
    'gender',
    'date',
    'fullName',
    'address',
    'phone',
    'bankAccount',
    'educationType',
    'school',
    'postHighSchoolTrainings',
    'dateRange',
    'nonMilitaryJobs'
  ),
  properties: {
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    },
    relativeSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    gender: {
      $ref: '#/definitions/gender'
    },
    relativeDateOfBirth: {
      $ref: '#/definitions/date'
    },
    relativeFullName: {
      $ref: '#/definitions/fullName'
    },
    relativeAddress: {
      $ref: '#/definitions/address'
    },
    homePhone: {
      $ref: '#/definitions/phone'
    },
    mobilePhone: {
      $ref: '#/definitions/phone'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount'
    },
    relationship: {
      type: 'string',
      'enum': ['spouse', 'child']
    },
    highSchoolOrGedCompletionDate: {
      $ref: '#/definitions/date'
    },
    benefit: {
      type: 'string',
      enum: ['chapter33', 'chapter30', 'chapter1606', 'chapter1607']
    },
    educationType: {
      $ref: '#/definitions/educationType'
    },
    school: {
      $ref: '#/definitions/school'
    },
    educationObjective: {
      type: 'string'
    },
    faaFlightCertificatesInformation: {
      type: 'string'
    },
    postHighSchoolTrainings: {
      $ref: '#/definitions/postHighSchoolTrainings'
    },
    nonMilitaryJobs: {
      $ref: '#/definitions/nonMilitaryJobs'
    },
    nonVaAssistance: {
      type: 'boolean'
    },
    civilianBenefitsAssistance: {
      type: 'boolean'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    serviceBranch: {
      type: 'string'
    },
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    }
  },
  required: ['privacyAgreementAccepted']
};

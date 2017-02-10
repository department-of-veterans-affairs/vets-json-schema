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
  ),
  properties: {
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    gender: {
      $ref: '#/definitions/gender'
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date'
    },
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    veteranAddress: {
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
  },
  required: ['privacyAgreementAccepted']
};

import _ from 'lodash';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR FAMILY MEMBER TO USE TRANSFERRED BENEFITS (22-1990E)',
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
    parentGuardianSponsor: {
      type: 'string',
    },
    selectedSponsors: {
      type: 'array',
      // minItems: 1,
      items: {
        type: 'string',
      },
    },
    relationshipToServiceMember: {
      type: 'string',
      enum: [
        'Spouse',
        'Child',
      ],
    },
    sponsorFullName: {
      $ref: '#/definitions/fullName',
    },
    sponsorDateOfBirth: {
      $ref: '#/definitions/date',
    },
    firstSponsor: {
      type: 'string',
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

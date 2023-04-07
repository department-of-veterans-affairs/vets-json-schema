import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';

import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Lay/Witness Statement (21-10210)',
  type: 'object',
  additionalProperties: false,
  definitions: pick(definitions, [
    'address',
    'date',
    'email',
    'fullName',
    'phone',
    'profileAddress',
    'ssn',
    'centralMailVaFile',
    'privacyAgreementAccepted',
  ]),
  properties: {
    statementInformation: {
      type: 'object',
      additionalProperties: false,
      required: ['claimOwnership', 'claimantType'],
      properties: {
        claimOwnership: {
          type: 'string',
          enum: ['self', 'third-party'],
        },
        claimantType: {
          type: 'string',
          enum: ['veteran', 'non-veteran'],
        },
      },
    },
    nonVeteran: {
      type: 'object',
      additionalProperties: false,
      required: [],
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        relationshipToVeteran: {
          type: 'string',
          enum: ['served-with', 'family-or-friend', 'coworker-or-supervisor'],
        },
        relationshipToVeteranOther: {
          type: 'string',
        },
        phone: { $ref: '#/definitions/phone' },
        email: { $ref: '#/definitions/email' },
        agreeToReceiveEmails: {
          type: 'boolean',
        },
      },
    },
    veteran: {
      type: 'object',
      additionalProperties: false,
      required: ['fullName', 'ssn', 'address', 'homePhone'],
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        dateOfBirth: {
          $ref: '#/definitions/date',
        },
        ssn: { $ref: '#/definitions/ssn' },
        vaFileNumber: { $ref: '#/definitions/centralMailVaFile' },
        vaInsFileNumber: {
          type: 'string',
          // TODO: Add pattern.
        },
        address: { $ref: '#/definitions/profileAddress' },
        homePhone: { $ref: '#/definitions/phone' },
        mobilePhone: { $ref: '#/definitions/phone' },
        email: { $ref: '#/definitions/email' },
      },
    },
    statement: {
      type: 'string',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: ['statement', 'privacyAgreementAccepted'],
};

export default schema;

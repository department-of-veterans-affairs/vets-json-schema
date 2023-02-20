import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';

import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply for Specially Adapted Housing Grant (26-4555)',
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
    'vaFileNumber',
    'privacyAgreementAccepted',
  ]),
  properties: {
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
        vaFileNumber: { $ref: '#/definitions/vaFileNumber' },
        address: { $ref: '#/definitions/profileAddress' },
        homePhone: { $ref: '#/definitions/phone' },
        mobilePhone: { $ref: '#/definitions/phone' },
        email: { $ref: '#/definitions/email' },
      },
    },
    previousSahApplication: {
      type: 'object',
      additionalProperties: false,
      required: ['hasPreviousSahApplication'],
      properties: {
        hasPreviousSahApplication: { type: 'boolean' },
        // next 2 props are on a separate, conditional form-page
        // split from 1 single field on the PDF-form
        previousSahApplicationDate: { $ref: '#/definitions/date' },
        previousSahApplicationAddress: { $ref: '#/definitions/address' },
      },
    },
    previousHiApplication: {
      type: 'object',
      additionalProperties: false,
      required: ['hasPreviousHiApplication'],
      properties: {
        hasPreviousHiApplication: { type: 'boolean' },
        // next 2 props are on a separate, conditional form-page
        // split from 1 single field on the PDF-form
        previousHiApplicationDate: { $ref: '#/definitions/date' },
        previousHiApplicationAddress: { $ref: '#/definitions/address' },
      },
    },
    livingSituation: {
      type: 'object',
      additionalProperties: false,
      required: ['isInCareFacility'],
      properties: {
        isInCareFacility: { type: 'boolean' },
        // next 2 props are on a separate, conditional form-page
        // split from 1 single field on the PDF-form
        careFacilityName: { type: 'string' },
        careFacilityAddress: { $ref: '#/definitions/address' },
      },
    },
    remarks: {
      type: 'string',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: ['privacyAgreementAccepted'],
};

export default schema;

import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';

import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply for Specially Adapted Housing Grant (26-4555)',
  type: 'object',
  additionalProperties: false,
  definitions: pick(definitions, ['address', 'date', 'email', 'fullName', 'phone', 'ssn', 'vaFileNumber']),
  properties: {
    veteran: {
      type: 'object',
      additionalProperties: false,
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        birthDate: {
          $ref: '#/definitions/date',
        },
        ssn: { $ref: '#/definitions/ssn' },
        vaFileNumber: { $ref: '#/definitions/vaFileNumber' },
        address: { $ref: '#/definitions/address' },
        homePhone: { $ref: '#/definitions/phone' },
        mobilePhone: { $ref: '#/definitions/phone' },
        email: { $ref: '#/definitions/email' },
      },
    },
    previousSahApplication: {
      type: 'object',
      additionalProperties: false,
      properties: {
        hasPreviousSahApplication: { type: 'boolean ' },
        // next 2 props are on a separate, conditional form-page
        previousSahApplicationDate: { $ref: '#/definitions/date ' },
        previousSahApplicationAddress: { $ref: '#/definitions/address' },
      },
    },
    previousHiApplication: {
      type: 'object',
      additionalProperties: false,
      properties: {
        hasPreviousHiApplication: { type: 'boolean' },
        // next 2 props are on a separate, conditional form-page
        previousHiApplicationDate: { $ref: '#/definitions/date ' },
        previousHiApplicationAddress: { $ref: '#/definitions/address' },
      },
    },
    livingSituation: {
      type: 'object',
      additionalProperties: false,
      properties: {
        isInCareFacility: { type: 'boolean' },
        // next 2 props are on a separate, conditional form-page
        careFacilityName: { type: 'string' },
        careFacilityAddress: { $ref: '#/definitions/address' },
        // next prop is on an conditional form-page [always shows]
        otherMedicalInformation: { type: 'string' },
      },
    },
  },
};

export default schema;

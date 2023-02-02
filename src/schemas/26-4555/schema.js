import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';

import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply for Specially Adapted Housing Grant (26-4555)',
  type: 'object',
  additionalProperties: false,
  definitions: pick(definitions, ['date', 'email', 'fullName', 'phone', 'ssn', 'usAddress', 'vaFileNumber']),
  properties: {
    veteran: {
      type: 'object',
      additionalProperties: false,
      properties: {
        required: ['fullName', 'ssn', 'address', 'homePhone'],
        fullName: {
          $ref: '#/definitions/fullName',
        },
        birthDate: {
          $ref: '#/definitions/date',
        },
        ssn: { $ref: '#/definitions/ssn' },
        vaFileNumber: { $ref: '#/definitions/vaFileNumber' },
        address: { $ref: '#/definitions/usAddress' },
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
        hasPreviousSahApplication: { type: 'boolean ' },
        // next 2 props are on a separate, conditional form-page
        previousSahApplicationDate: { $ref: '#/definitions/date ' },
        previousSahApplicationAddress: { $ref: '#/definitions/usAddress' },
      },
    },
    previousHiApplication: {
      type: 'object',
      additionalProperties: false,
      required: ['hasPreviousHiApplication'],
      properties: {
        hasPreviousHiApplication: { type: 'boolean' },
        // next 2 props are on a separate, conditional form-page
        previousHiApplicationDate: { $ref: '#/definitions/date ' },
        previousHiApplicationAddress: { $ref: '#/definitions/usAddress' },
      },
    },
    livingSituation: {
      type: 'object',
      additionalProperties: false,
      required: ['isInCareFacility'],
      properties: {
        isInCareFacility: { type: 'boolean' },
        // next 2 props are on a separate, conditional form-page
        careFacilityName: { type: 'string' },
        careFacilityAddress: { $ref: '#/definitions/usAddress' },
        // next prop is on an conditional form-page [always shows]
        otherMedicalInformation: { type: 'string' },
      },
    },
  },
};

export default schema;

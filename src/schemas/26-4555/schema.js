import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';

import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Apply for Specially Adapted Housing Grant (26-4555)',
  type: 'object',
  additionalProperties: false,
  definitions: pick(definitions, ['date', 'email', 'fullName', 'phone', 'profileAddress', 'ssn', 'vaFileNumber']),
  properties: {
    // "Step 1"
    personalChapter: {
      type: 'object',
      // additionalProperties: false,
      properties: {
        personalPage1: {
          type: 'object',
          properties: {
            fullName: {
              $ref: '#/definitions/fullName',
            },
            birthDate: {
              $ref: '#/definitions/date',
            },
          },
        },
        personalPage2: {
          type: 'object',
          properties: {
            ssn: { $ref: '#/definitions/ssn' },
            vaFileNumber: { $ref: '#/definitions/vaFileNumber' },
          },
        },
      },
    },
    // "Step 2"
    contactChapter: {
      type: 'object',
      contactPage1: {
        type: 'object',
        properties: {
          address: { $ref: '#/definitions/profileAddress' },
        },
      },
      contactPage2: {
        type: 'object',
        properties: {
          homePhone: { $ref: '#/definitions/phone' },
          mobilePhone: { $ref: '#/definitions/phone' },
          email: { $ref: '#/definitions/email' },
        },
      },
    },
    // "Step 3"
    previousApplicationsChapter: {
      type: 'object',
      previousSahApplicationPage1: {
        type: 'object',
        properties: {
          hasPreviousSahApplication: { type: 'boolean ' },
        },
      },
      previousSahApplicationPage2: {
        type: 'object',
        properties: {
          previousSahApplicationDate: { $ref: '#/definitions/date ' },
          previousSahApplicationAddress: { $ref: '#/definitions/address' },
        },
      },
      previousHiApplicationPage1: {
        type: 'object',
        properties: {
          hasPreviousHiApplication: { type: 'boolean' },
        },
      },
      previousHiApplicationPage2: {
        type: 'object',
        properties: {
          previousHiApplicationDate: { $ref: '#/definitions/date ' },
          previousHiApplicationAddress: { $ref: '#/definitions/profileAddress' },
        },
      },
    },
    // Step 4
    livingSituationChapter: {
      type: 'object',
      livingSituationPage1: {
        type: 'object',
        properties: {
          isInCareFacility: { type: 'boolean' },
        },
      },
      livingSituationPage2: {
        type: 'object',
        properties: {
          careFacilityName: { type: 'string' },
          careFacilityAddress: { $ref: '#/definitions/profileAddress' },
        },
      },
      livingSituationPage3: {
        type: 'object',
        otherMedicalInformation: { type: 'string' },
      },
    },
  },
};

export default schema;

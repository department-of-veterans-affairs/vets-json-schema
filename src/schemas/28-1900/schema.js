import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DISABLED VETERANS APPLICATION FOR VOCATIONAL REHABILITATION (28-1900)',
  type: 'object',
  additionalProperties: false,
  definitions: pick(definitions, 'date', 'fullName', 'ssn', 'vaFileNumber', 'phone', 'email', 'profileAddress'),
  properties: {
    veteranInformation: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        ssn: {
          $ref: '#/definitions/ssn',
        },
        vaFileNumber: {
          $ref: '#/definitions/vaFileNumber',
        },
        dob: {
          $ref: '#/definitions/date',
        },
      },
    },
    veteranAddress: {
      $ref: '#/definitions/profileAddress',
    },
    mainPhone: {
      $ref: '#/definitions/phone',
    },
    cellPhone: {
      $ref: '#/definitions/phone',
    },
    email: {
      $ref: '#/definitions/email',
    },
    yearsOfEducation: {
      type: 'string',
      pattern: '^\\d+$',
    },
    isMoving: {
      type: 'boolean',
    },
    newAddress: {
      $ref: '#/definitions/profileAddress',
    },
    useEva: {
      type: 'boolean',
    },
    useTelecounseling: {
      type: 'boolean',
    },
    appointmentTimePreferences: {
      type: 'object',
      properties: {
        morning: {
          type: 'boolean',
          default: false,
        },
        midDay: {
          type: 'boolean',
          default: false,
        },
        afternoon: {
          type: 'boolean',
          default: false,
        },
        other: {
          type: 'boolean',
          default: false,
        },
      },
    },
  },
};

export default schema;

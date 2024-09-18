import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import commonDefinitions from '../../common/definitions';

const definitions = cloneDeep(commonDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DISABLED VETERANS APPLICATION FOR VOCATIONAL REHABILITATION (28-1900)',
  type: 'object',
  additionalProperties: true,
  definitions: pick(definitions, ['date', 'fullName', 'phone', 'email', 'profileAddress']),
  properties: {
    veteranInformation: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
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
      enum: ['10', '12', '14', '15', '17', '19'],
      enumNames: [
        'Some high school',
        'High school / GED',
        'Some college',
        'Associate degree',
        'Bachelor’s degree',
        'Master’s degree or higher',
      ],
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
      },
    },
  },
};

export default schema;

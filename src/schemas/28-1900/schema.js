import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import { countries, states50AndDC } from '../../common/constants';
import commonDefinitions from '../../common/definitions';

let definitions = cloneDeep(commonDefinitions);

definitions = pick(definitions, 'date', 'fullName', 'ssn', 'vaFileNumber', 'phone', 'email');

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DISABLED VETERANS APPLICATION FOR VOCATIONAL REHABILITATION (28-1900)',
  type: 'object',
  additionalProperties: false,
  definitions: merge(definitions, {
    address: {
      type: 'object',
      properties: {
        countryName: {
          type: 'string',
          enum: countries.map(country => country.value),
          enumNames: countries.map(country => country.label),
        },
        addressLine1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine2: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine3: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        city: {
          type: 'string',
        },
        stateCode: {
          type: 'string',
          enum: states50AndDC.map(state => state.value),
          enumNames: states50AndDC.map(state => state.label),
        },
        province: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}$',
        },
        internationalPostalCode: {
          type: 'string',
        },
      },
    },
  }),
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
    isMilitaryAddress: {
      type: 'boolean',
      default: false,
    },
    veteranAddress: {
      $ref: '#/definitions/address',
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
      $ref: '#/definitions/address',
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

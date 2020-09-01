import definitions from '../../common/definitions';
import { countries, states50AndDC } from '../../common/constants';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'EDUCATIONAL/VOCATIONAL COUNSELING APPLICATION (28-8832)',
  type: 'object',
  additionalProperties: false,
  definitions: {
    addressSchema: {
      type: 'object',
      properties: {
        'view:livesOnMilitaryBase': {
          type: 'boolean',
        },
        'view:livesOnMilitaryBaseInfo': {
          type: 'object',
          properties: {},
        },
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
  },
  properties: {
    claimantInformation: {
      type: 'object',
      properties: {
        fullName: definitions.fullName,
        ssn: definitions.ssn,
        VAFileNumber: definitions.vaFileNumber,
        dateOfBirth: definitions.date,
      },
    },
    claimantStaticInformation: {
      type: 'object',
      properties: {},
    },
    claimantAddress: {
      $ref: '#/definitions/addressSchema',
    },
    statusSelection: {
      type: 'string',
      enum: ['isActiveDuty', 'isVeteran', 'isSpouse', 'isChild'],
      enumNames: [
        'Active duty service member',
        'Veteran',
        'Spouse of a Veteran or service member',
        'Child of a Veteran or service member',
      ],
    },
    veteranInformation: {
      type: 'object',
      properties: {
        fullName: definitions.fullName,
        ssn: definitions.ssn,
      },
    },
  },
};

export default schema;

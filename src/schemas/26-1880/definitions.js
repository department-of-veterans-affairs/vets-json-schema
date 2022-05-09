import { countries, states } from '../../common/constants';
import definitions from '../../common/definitions';

// filter out military states
const militaryStates = ['AA', 'AE', 'AP'];
const filteredStates = states.USA.filter(state => !militaryStates.includes(state.value));

const defs = {
  date: definitions.date,
  dateRange: { ...definitions.dateRange, required: ['from'] },
  files: definitions.files,
  fullName: definitions.fullName,
  profileAddress: {
    type: 'object',
    properties: {
      isMilitary: {
        type: 'boolean',
      },
      country: {
        type: 'string',
        enum: countries.filter(country => country.value !== 'USA').map(country => country.value),
        enumNames: countries.filter(country => country.label !== 'United States').map(country => country.label),
      },
      'view:militaryBaseDescription': {
        type: 'object',
        properties: {},
      },
      street: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
      street2: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
      street3: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
      city: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
      },
      state: {
        type: 'string',
        enum: filteredStates.map(state => state.value),
        enumNames: filteredStates.map(state => state.label),
      },
      postalCode: {
        type: 'string',
      },
    },
  },
  loanAddress: {
    type: 'object',
    additionalProperties: false,
    required: ['propertyAddress1', 'propertyCity', 'propertyState', 'propertyZip'],
    properties: {
      propertyAddress1: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
      propertyAddress2: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
      propertyCity: {
        type: 'string',
        minLength: 1,
        maxLength: 51,
      },
      propertyState: {
        type: 'string',
        enum: filteredStates.map(state => state.value),
        enumNames: filteredStates.map(state => state.label),
      },
      propertyZip: {
        type: 'string',
        pattern: '^(\\d{5})(?:[-](\\d{4}))?$',
      },
    },
  },
  usaPhone: {
    type: 'string',
    pattern: '^\\d{10}$',
  },
  email: {
    type: 'string',
    maxLength: 256,
    format: 'email',
  },
};

export default defs;

import { countries, states } from '../../common/constants';

// filter out military states
const militaryStates = ['AA', 'AE', 'AP'];
const filteredStates = states.USA.filter(state => !militaryStates.includes(state.value));

const dateRange = (from = 'from', to = 'to') => {
  return {
    type: 'object',
    properties: {
      [from]: {
        $ref: '#/definitions/date',
      },
      [to]: {
        $ref: '#/definitions/date',
      },
    },
    required: [from],
  };
};

const definitions = {
  date: {
    pattern: '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
    type: 'string',
  },
  files: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        size: {
          type: 'integer',
        },
        confirmationCode: {
          type: 'string',
        },
      },
    },
  },
  fullName: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      middleName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      suffixName: {
        type: 'string',
        enum: ['Jr.', 'Sr.', 'II', 'III', 'IV'],
      },
    },
    required: ['firstName', 'lastName'],
  },
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
  serviceDateRange: dateRange(),
  loanDateRange: dateRange('startDate', 'paidOffDate'),
};

export default definitions;

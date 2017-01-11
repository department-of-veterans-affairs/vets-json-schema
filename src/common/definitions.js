import constants from './constants';
import _ from 'lodash';

const fullName = {
  type: 'object',
  properties: {
    salutation: {
      type: 'string'
    },
    first: {
      type: 'string',
      minLength: 1,
      maxLength: 30
    },
    middle: {
      type: 'string'
    },
    last: {
      type: 'string',
      minLength: 1,
      maxLength: 30
    },
    suffix: {
      'enum': constants.suffixes
    },
  },
  required: [
    'first',
    'last'
  ]
};

const address = (() => {
  const countries = constants.countries.map(object => object.value);
  const countriesWithAnyState = Object.keys(constants.states).filter(x => _.includes(countries, x));
  const countryStateProperites = _.map(constants.states, (value, key) => ({
    properties: {
      country: {
        'enum': [key]
      },
      state: {
        'enum': value.map(x => x.value)
      },
      postalCode: {
        type: 'string',
        maxLength: 10
      }
    }
  }));
  countryStateProperites.push({
    properties: {
      country: {
        not: {
          'enum': countriesWithAnyState
        }
      },
      state: {
        type: 'string',
        maxLength: 51
      },
      postalCode: {
        type: 'string',
        maxLength: 51
      },
    },
  });

  return {
    type: 'object',
    oneOf: countryStateProperites,
    properties: {
      street: {
        type: 'string',
        minLength: 1,
        maxLength: 50
      },
      street2: {
        type: 'string',
        minLength: 1,
        maxLength: 50
      },
      city: {
        type: 'string',
        minLength: 1,
        maxLength: 51
      }
    },
    required: [
      'street',
      'city',
      'country'
    ]
  };
})();

const phone = {
  type: 'string',
  minLength: 10
};

const ssn = {
  type: 'string',
  pattern: '^[0-9]{9}$'
};

export default {
  fullName,
  address,
  phone,
  ssn,
};

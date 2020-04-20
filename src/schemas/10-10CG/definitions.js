import _ from 'lodash';
import constants from '../../common/constants';

const fullName = {
  type: 'object',
  properties: {
    first: {
      type: 'string',
      minLength: 1,
      maxLength: 30,
    },
    middle: {
      type: 'string',
    },
    last: {
      type: 'string',
      minLength: 1,
      maxLength: 30,
    },
  },
  required: ['first', 'last'],
};

const address = (() => {
  const countriesWithAnyState = Object.keys(constants.states).filter(x => _.includes(constants.countries[0], x));
  const countryStateProperties = _.map(constants.states, value => ({
    properties: {
      state: {
        type: 'string',
        enum: value.map(x => x.value),
      },
      postalCode: {
        type: 'string',
        maxLength: 10,
      },
    },
  }));

  countryStateProperties.push({
    properties: {
      country: {
        not: {
          type: 'string',
          enum: countriesWithAnyState,
        },
      },
      state: {
        type: 'string',
        maxLength: 51,
      },
      postalCode: {
        type: 'string',
        maxLength: 51,
      },
    },
  });

  return {
    type: 'object',
    oneOf: countryStateProperties,
    properties: {
      street: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
      street2: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
      },
      city: {
        type: 'string',
        minLength: 1,
        maxLength: 51,
      },
    },
  };
})();

export { address, fullName };

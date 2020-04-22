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

const address = {
  type: 'object',
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
    state: {
      type: 'string',
      enum: constants.states.USA,
    },
    postalCode: {
      type: 'string',
      maxLength: 10,
    },
  },
};

const gender = {
  type: 'string',
  enum: ['F', 'M', 'U'],
};

export { address, fullName, gender };

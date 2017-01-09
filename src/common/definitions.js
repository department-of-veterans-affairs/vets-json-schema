import constants from './constants';

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

export default {
  fullName
};

import schemaHelpers from '../../common/schema-helpers';
import constants from '../../../dist/constants.json';

// create an object of states using this pattern - {abbreviation}: {full name}
// e.g. "DC": "District of Columnbia"
const STATES = constants.states.USA.reduce(
  (stateList, { value, label }) => ({
    ...stateList,
    [value]: label,
  }),
  {},
);

export const blockURLsRegEx =
  '^((?!http|www\\.|\\.co|\\.net|\\.gov|\\.edu|\\.org).)*$';

const STREET_LINE_MAX_LENGTH = 20;

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VERIFY YOUR ENROLLMENT CHANGE OF ADDRESS',
  type: 'object',
  additionalProperties: false,
  definitions:{},
  properties: {

  veteranName: {
      type: 'string',
      minLength: 1,
      maxLength: 100,
    },
  address1: {
      type: 'string',
      minLength: 1,
      maxLength: STREET_LINE_MAX_LENGTH,
      pattern: blockURLsRegEx,
  },
  address2: {
      type: 'string',
      minLength: 1,
      maxLength: STREET_LINE_MAX_LENGTH,
      pattern: blockURLsRegEx,
  },
  address3: {
      type: 'string',
      minLength: 1,
      maxLength: STREET_LINE_MAX_LENGTH,
      pattern: blockURLsRegEx,
  },
  address4: {
      type: 'string',
      minLength: 1,
      maxLength: STREET_LINE_MAX_LENGTH,
      pattern: blockURLsRegEx,
  },
  city: {
      type: 'string',
      pattern: blockURLsRegEx,
      minLength: 1,
      maxLength: 51,
  },
  state: {
      type: 'string',
      enum: Object.keys(STATES),
      enumNames: Object.values(STATES),
  },
  zipCode: {
      type: 'string',
      pattern: '^\\d{5}$',
      minLength: 5,
      maxLength: 5,
  },
  },
  required: ['veteranName','address1', 'city'],
};

[].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

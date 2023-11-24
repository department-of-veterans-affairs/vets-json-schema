import _ from 'lodash';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VERIFY YOUR ENROLLMENT CHANGE OF ADDRESS',
  type: 'object',
  definitions:_.merge(
    _.set(
      _.pick(definitions,['address']),
      'address.properties',
      {
        "street": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "street2": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "street3": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "street4": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "city": {
          "type": "string",
          "minLength": 1,
          "maxLength": 51
        }
      }
    )
  ),
  additionalProperties: false,
  properties: {
    veteranAddress: {
      $ref: '#/definitions/address',
    },
  },
  required: ['veteranAddress'],
};
export default schema;

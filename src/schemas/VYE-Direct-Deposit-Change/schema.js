import _ from 'lodash';
import definitions from '../../common/definitions';


const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VERIFY YOUR ENROLLMENT CHANGE OF DIRECT DEPOSIT',
  type: 'object',
  additionalProperties: false,
  definitions:_.merge(
    _.pick(definitions,['bankAccount','usaPhone'])
  ),
  properties: {
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    checkDigit: {
      type: 'string',
    },
    bankName:{
      type:'string'
    },
    bankPhone:{
      $ref: '#/definitions/usaPhone',
    },
  },
  required: ['bankName', 'bankAccount', 'bankPhone',],
};
export default schema;

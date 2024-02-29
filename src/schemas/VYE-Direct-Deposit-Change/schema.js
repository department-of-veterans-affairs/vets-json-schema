import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VERIFY YOUR ENROLLMENT CHANGE OF DIRECT DEPOSIT',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'usaPhone',
  ]),
  properties: {

    fullName:{
      type: 'string',
      minLength: 1,
      maxLength: 100,//check what the max char is
    },
    phone:{
      $ref: '#/definitions/usaPhone',
    },
    email:{
      type: 'string',
      pattern:'^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    },
    acctNo:{
      type: 'string',
      pattern: '^\\d{1,17}$',
    },
    acctType:{
      type: 'string',
      enum: ['checking', 'savings'],
    },
    routingNo:{
      type: 'string',
      pattern: '^\\d{9}$',
    },
    bankName:{
      type:'string'
    },
    bankPhone:{
      $ref: '#/definitions/usaPhone',
    },
  },
  required: ['fullName', 'phone', 'email', 'acctNo', 'acctType', 'routingNo', 'bankName', 'bankPhone'],
};

[
  ['usaPhone'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

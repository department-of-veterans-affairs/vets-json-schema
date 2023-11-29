import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VERIFY YOUR ENROLLMENT CHANGE OF DIRECT DEPOSIT',
  type: 'object',
  additionalProperties: false,
  definitions:{},
  properties: {

    checkDigit: {
      type: 'string',
    },
    bankName:{
      type:'string'
    },
  },
  required: ['bankName', 'bankAccount', 'bankPhone',],
};

[
  ['bankAccount'],
  ['usaPhone', 'bankPhone'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

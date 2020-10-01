import { cloneDeep } from 'lodash';

const schema = cloneDeep(require('../HLR-create-request-body/schema.js').default);

const hlrCreate = schema.definitions.hlrCreate;

schema.definitions.hlrCreate = {
  ...hlrCreate,
  properties: {
    ...hlrCreate.properties,
    nonPrefill: { type: 'object' },
  },
};

export default schema;

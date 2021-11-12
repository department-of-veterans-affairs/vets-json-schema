import { cloneDeep } from 'lodash';

const schema = cloneDeep(require('../HLR-create-request-body/schema').default);

const { hlrCreate } = schema.definitions;

schema.definitions.hlrCreate = {
  ...hlrCreate,
  properties: {
    ...hlrCreate.properties,
    nonPrefill: { type: 'object' },
  },
};

export default schema;

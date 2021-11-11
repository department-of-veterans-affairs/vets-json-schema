import { cloneDeep } from 'lodash';

const schema = cloneDeep(require('../HLR-create-request-body_v1/schema.js').default);

const definitions = {
  root: {
    type: 'object',
    properties: { data: { $ref: '#/definitions/data' } },
    required: ['data'],
    additionalProperties: false,
  },
  data: {
    type: 'object',
    properties: {
      id: { $ref: '#/definitions/uuid' },
      type: { type: 'string', enum: ['higherLevelReview'] },
      attributes: {
        type: 'object',
        properties: {
          status: { $ref: '#/definitions/hlrStatus' },
          updatedAt: { $ref: '#/definitions/timeStamp' },
          createdAt: { $ref: '#/definitions/timeStamp' },
          formData: { $ref: '#/definitions/hlrCreate' },
        },
        required: ['status', 'updatedAt', 'createdAt', 'formData'],
        additionalProperties: false,
      },
    },
    required: ['id', 'type', 'attributes'],
    additionalProperties: false,
  },
  uuid: {
    type: 'string',
    pattern: '^[0-9a-fA-F]{8}(-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$',
  },
  timeStamp: {
    type: 'string',
    pattern: '\\d{4}(-\\d{2}){2}T\\d{2}(:\\d{2}){2}.\\d{3}Z',
  },
  hlrStatus: {
    type: 'string',
    enum: [
      'pending',
      'submitting',
      'submitted',
      'processing',
      'error',
      'uploaded',
      'received',
      'success',
      'vbms',
      'expired',
    ],
  },
};

schema.definitions = { ...schema.definitions, ...definitions };
schema.$ref = '#/definitions/root';

export default schema;

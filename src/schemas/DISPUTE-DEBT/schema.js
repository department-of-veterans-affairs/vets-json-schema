import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DISPUTE DEBT',
  type: 'object',
  properties: {
    contactInformation: {
      type: 'object',
      email: definitions.email,
      phoneNumber: definitions.phoneNumber,
      address: definitions.profileAddress,
    },
    debtInformation: {
      type: 'object',
      properties: {
        debt: {
          type: 'string',
        },
        disputeReason: {
          type: 'string',
        },
        supportStatement: {
          type: 'string',
        },
      },
    },
  },
  required: ['email', 'phoneNumber', 'address', 'debt', 'disputeReason', 'supportStatement'],
};

export default schema;

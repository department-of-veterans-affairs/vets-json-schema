import definitions from '../../common/definitions';

const schema = {
 $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR ANNUAL CLOTHING ALLOWANCE (10-8678)',
  type: 'object',
  definitions: {
    email: definitions.email,
    ssn: definitions.ssn,
    address: definitions.address,
    fullName: definitions.fullName,
  },

 properties: {
    calendarYear: {
      type: 'string',
    },

    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
        },
        middleinitial: {
          type: 'string',
        },
        last: {
          type: 'string',
        },
      },
    },

    ssn: {
      $ref: '#/definitions/ssn',
    },
     address: {
      $ref: '#/definitions/address',
    },
     phoneDay: {
      type: 'string',
    },
     phoneEvening: {
      type: 'string',
    },
     emailAddress: {
      type: 'string',
      format: 'email',
    },

    appliances: {
      type: 'array',
      minItems: 0,
      items: [{
        type: 'object',
        properties: {
          type: {
            type: 'string',
          },
          issued_month_year: {
            type: 'string',
          },
          facility: {
            type: 'string',
          },
          service_connected_disabilities: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          impacted_locations: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          approved: {
            type: 'boolean',
          },
        },
      }],
    },

     signature: {
      type: 'object',
  
      properties: {
        veteran_signature: {
          type: 'string',
        },
        date_signed: {
          type: 'string',
        },
      },
    },
  },

};

export default schema;
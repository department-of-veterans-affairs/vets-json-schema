import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Employment Questionairres (21-4140)',
  type: 'object',
  properties: {
    veteranFullName: {
      type: 'object',
      first: {
        type: 'string',
        maxLength: 12,
      },
      middle: {
        type: 'string',
        maxLength: 1,
      },
      last: {
        type: 'string',
        maxLength: 18,
      },
    },
    veteranSocialSecurityNumber: definitions.ssn,
    vaFileNumber: definitions.vaFileNumber,
    vaServiceNumber: {
      type: 'string',
      maxLength: 18,
    },
    dateOfBirth: definitions.date,
    veteranAddress: definitions.address,
    veteranContact: {
      type: 'object',
      email: {
        type: 'string',
        maxLength: 12,
      },
      primaryPhone: {
        type: 'string',
        maxLength: 1,
      },
      alternatePhone: {
        type: 'string',
        maxLength: 18,
      },
    },
    employmentStatus: {
      type: 'object',
      radio: {
        type: 'boolean',
        maxLength: 12,
      },
      mailedDate: definitions.date,
    },
    signatureSection1: {
      type: 'object',
      properties: {
        signatureDate: definitions.date,
        veteranSocialSecurityNumber: definitions.ssn,
      },
    },
    employmentHistory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nameAndAddress: {
            maxLength: 110,
            type: 'string',
          },
          typeOfWork: {
            maxLength: 39,
            type: 'string',
          },
          hoursPerWeek: {
            type: 'integer',
          },
          dateRange: {
            type: 'object',
            properties: {
              from: definitions.date,
              to: definitions.date,
            },
          },
          timeLost: {
            type: 'string',
          },
          grossEarningsPerMonth: {
            type: 'string',
          },
        },
      },
    },
    signatureSection2: {
      type: 'object',
      signatureDate: definitions.date,
    },
    stationAddress: {
      type: 'string',
      maxLength: 400,
    },
  },
  required: [],
};
export default schema;

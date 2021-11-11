import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'EDUCATIONAL/VOCATIONAL COUNSELING APPLICATION (28-8832)',
  type: 'object',
  definitions: {
    address: definitions.profileAddress,
  },
  properties: {
    claimantInformation: {
      type: 'object',
      properties: {
        fullName: definitions.fullName,
        ssn: definitions.ssn,
        VAFileNumber: definitions.vaFileNumber,
        dateOfBirth: definitions.date,
      },
    },
    claimantStaticInformation: {
      type: 'object',
      properties: {},
    },
    claimantAddress: {
      $ref: '#/definitions/address',
    },
    claimantPhoneNumber: definitions.phone,
    claimantEmailAddress: definitions.email,
    status: {
      type: 'string',
      enum: ['isActiveDuty', 'isVeteran', 'isSpouse', 'isChild'],
      enumNames: [
        'Active duty service member',
        'Veteran',
        'Spouse of a Veteran or service member',
        'Child of a Veteran or service member',
      ],
    },
    veteranInformation: {
      type: 'object',
      properties: {
        fullName: definitions.fullName,
        ssn: definitions.ssn,
      },
    },
  },
};

export default schema;

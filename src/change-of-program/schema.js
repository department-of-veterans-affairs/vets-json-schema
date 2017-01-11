import definitions from '../../src/common/definitions';

let myDefinitions = {
  fullName: definitions.fullName,
  address: definitions.address,
  phone: definitions.phone,
  ssn: definitions.ssn
};

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING',
  type: 'object',
  additionalProperties: false,
  definitions: myDefinitions,
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    },
    dayPhone: {
      $ref: '#/definitions/phone'
    },
    nightPhone: {
      $ref: '#/definitions/phone'
    },
    vaFileNumber: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
  }
};

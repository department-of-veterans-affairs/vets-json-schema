import definitions from '../../src/common/definitions';

let myDefinitions = {
  fullName: definitions.fullName,
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
  }
};

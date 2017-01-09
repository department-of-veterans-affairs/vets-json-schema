module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING',
  type: 'object',
  additionalProperties: false,
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
  }
};

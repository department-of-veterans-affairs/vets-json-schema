import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'CONFLICTING INTERESTS CERTIFICATION FOR PROPRIETARY SCHOOL',
  type: 'object',
  definitions: {
    fullName: {
      ...definitions.fullName,
      properties: {
        ...definitions.fullName.properties,
        first: {
          ...definitions.fullName.properties.first,
          ...definitions.rejectOnlyWhitespace,
        },
        last: {
          ...definitions.fullName.properties.last,
          ...definitions.rejectOnlyWhitespace,
        },
      },
    },
    roleDesc: {
      certifyingOfficial: 'Certifying Official',
      owner: 'Owner',
      Officer: 'Officer',
    },
  },
};

export default schema;

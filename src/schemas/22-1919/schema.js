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
    yourName: {
      type: 'object',
      required: ['first', 'last'],
      properties: {
        first: {
          type: 'string',
        },
        last: {
          type: 'string',
        },
      },
    },
    roleDesc: {
      certifyingOfficial: 'Certifying Official',
      owner: 'Owner',
      officer: 'Officer',
      other: 'Other',
    },
  },
};

export default schema;

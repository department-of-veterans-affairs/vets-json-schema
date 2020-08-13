import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'IRIS Ask a Question',
  type: 'object',
  definitions: {},
  additionalProperties: false,
  properties: {
    topic: {
      type: 'string',
      enum: ['Policy Questions', 'Question about Women Veterans Programs'],
    },
    inquiryType: {
      type: 'string',
      enum: [
        'Question',
        'Compliment',
        'Service Complaint',
        'Suggestion',
        'Status of Claim',
        'Status of Appeal at a Local VA Office',
        'Status of Appeals at BVA, Wash DC',
      ],
    },
    query: {
      type: 'string',
    },
  },
  anyOf: [
    {
      required: ['email'],
    },
    {
      required: ['phone'],
    },
    {
      required: ['address'],
    },
  ],
  required: ['privacyAgreementAccepted', 'fullName', 'preferredContactMethod'],
};

[
  ['fullName'],
  ['preferredContactMethod'],
  ['email'],
  ['phone'],
  ['address'],
  ['privacyAgreementAccepted'],
].forEach(args => {
    schemaHelpers.addDefinitionToSchema(schema, ...args);
  },
);

export default schema;

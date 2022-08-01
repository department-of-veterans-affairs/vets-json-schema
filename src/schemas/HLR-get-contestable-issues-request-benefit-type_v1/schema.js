import schema from '../HLR-create-request-body_v1/schema';

const benefitTypeSchema = schema.definitions.hlrCreate.properties.data.properties.attributes.properties.benefitType;

if (!benefitTypeSchema) throw 'benefit_type_schema missing';

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  ...benefitTypeSchema,
};

import schema from '../HLR-create-request-body/schema.js';

const benefitTypeSchema = schema.definitions.hlrCreateBenefitType;

if (!benefitTypeSchema) throw 'benefit_type_schema missing';

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  ...benefitTypeSchema,
};

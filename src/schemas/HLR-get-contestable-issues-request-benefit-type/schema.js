import schema from '../HLR-create-request-body/schema';

const benefitTypeSchema = schema.definitions.hlrCreateBenefitType;

if (!benefitTypeSchema) throw Error('benefit_type_schema missing');

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  ...benefitTypeSchema,
};

import schema from '../HLR-create-request-body/schema.js';

const benefit_type_schema = schema['definitions']['hlrCreateBenefitType'];

if (!benefit_type_schema) throw 'benefit_type_schema missing';

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  ...benefit_type_schema,
};

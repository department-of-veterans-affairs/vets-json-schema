// The 20-0996 schema is supplied to us from Lighthouse: https://api.va.gov/services/appeals/v2/decision_reviews/higher_level_reviews/schema
import schema from './schema.json';
schema.$schema = 'http://json-schema.org/draft-07/schema#'; // draft-07 not supported by Ajv testing tool
export default schema;

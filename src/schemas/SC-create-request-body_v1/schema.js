// The schema is supplied to us from Lighthouse: https://dev-developer.va.gov/explore/api/docs/decision_reviews?version=current
import schema from './schema.json';
schema.$schema = 'http://json-schema.org/draft-07/schema#'; // draft-07 not supported by Ajv testing tool
export default schema;

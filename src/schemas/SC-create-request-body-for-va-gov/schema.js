// The schema is supplied to us from Lighthouse: https://dev-developer.va.gov/explore/appeals/docs/decision_reviews?version=current
// The lighthouse schema is ../SC-create-request-body_v1
// HOWEVER va.gov frontend, passes 2 extra fields (form4142, and additionalDocuments) fromt the frontend to vets-api
// vets-api consumes these fields and strips them out before sending the rest along to lighthouse
// So we need 2 schemas, the lighthouse one (../SC-create-request-body_v1), and the va.gov one (this one)
import schema from './schema.json';
import definitions from '../../common/definitions';

schema.$schema = 'http://json-schema.org/draft-07/schema#';
schema.definitions.form4142 = definitions.form4142
export default schema;

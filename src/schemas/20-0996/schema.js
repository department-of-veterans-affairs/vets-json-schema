// The 20-0996 schema is supplied to us from Lighthouse: https://api.va.gov/services/appeals/v1/decision_reviews/higher_level_reviews/schema
import fs from 'fs';
import path from 'path';
export default JSON.parse(fs.readFileSync(path.resolve(__dirname, 'schema.json')));

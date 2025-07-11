import { expect } from 'chai';
import { it } from 'mocha';
import Ajv from "ajv-draft-04";
const addFormats = require("ajv-formats");
const schema_name = 'HLR-get-contestable-issues-request-benefit-type';
const schema = require(`../../../src/schemas/${schema_name}/schema.js`).default;

const ajv = new Ajv({ strict: false });
addFormats(ajv);

describe(schema_name.toUpperCase(), () => {
  it('blank string fails', () => ajv.validate(schema, ''));
  it('null fails', () => ajv.validate(schema, null));
  it('"compensation" passes', () => ajv.validate(schema, 'compensation'));
});

import { expect } from 'chai';
import { it } from 'mocha';
import Ajv from 'ajv';
import schemas from '../../../dist/schemas';
import example from './example.json';

const schema_key = 'CREATE_HLR_200_RESPONSE';
const schema = schemas[schema_key];
const ajv = new Ajv();

const exampleValidatesAgainstSchema = ajv.validate(schema, example);

const errors = ajv.errors;
if (errors && errors.length > 0) console.log(errors);

const test = () => expect(exampleValidatesAgainstSchema).to.be.true;

describe(schema_key, it('validates against example', test));

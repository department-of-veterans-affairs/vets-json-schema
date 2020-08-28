import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { it } from 'mocha';
import Ajv from 'ajv';
import schemas from '../../../dist/schemas';

const schema_key = 'CREATE_HLR_422_RESPONSE';
const schema = schemas[schema_key];
const examplesDir = [__dirname, 'examples'];

fs.readdirSync(path.resolve(...examplesDir)).forEach(exampleFileName => {
  const examplePath = path.resolve(...[...examplesDir, exampleFileName]);
  const example = require(examplePath);

  console.log(typeof example);

  const ajv = new Ajv();
  const exampleValidatesAgainstSchema = ajv.validate(schema, example);

  const errors = ajv.errors;
  if (errors && errors.length > 0) console.log(errors);

  const test = () => expect(exampleValidatesAgainstSchema).to.be.true;

  describe(schema_key, it(`validates against example: ${exampleFileName}`, test));
});

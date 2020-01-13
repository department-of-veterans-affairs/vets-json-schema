import { expect } from 'chai';
import Ajv from 'ajv';

const objectBuilder = (keys, value) => {
  let object = {};

  keys
    .split('.')
    .reverse()
    .forEach((key, i) => {
      if (i === 0) {
        object = {
          [key]: value,
        };
      } else {
        object = {
          [key]: object,
        };
      }
    });

  return object;
};

export default class SchemaTestHelper {
  constructor(schema, defaults = {}) {
    this.schema = schema;
    this.defaults = defaults;
    this.ajv = new Ajv();
  }

  validateSchema(data) {
    return this.ajv.validate(this.schema, { ...this.defaults, ...data });
  }

  schemaExpect(valid, data) {
    expect(this.validateSchema(data)).to.equal(valid);

    if (!valid) {
      expect(this.ajv.errors[0].dataPath).to.contain(`.${Object.keys(data)[0]}`);
    }
  }

  testValidAndInvalid(parentKey, fields) {
    ['valid', 'invalid'].forEach(fieldType => {
      const valid = fieldType === 'valid';

      fields[fieldType].forEach(values => {
        it(`should${valid ? '' : "n't"} allow ${parentKey} with ${JSON.stringify(values)}`, () => {
          this.schemaExpect(valid, objectBuilder(parentKey, values));
        });
      });
    });
  }
}

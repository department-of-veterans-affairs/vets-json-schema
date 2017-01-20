import { expect } from 'chai';
import Ajv from 'ajv';

let ajv = new Ajv();

const objectBuilder = (keys, value) => {
  let object = {};

  keys.split('.').reverse().forEach((key, i) => {
    if (i === 0) {
      object = {
        [key]: value
      };
    } else {
      object = {
        [key]: object
      };
    }
  });

  return object;
};

export default class SchemaTestHelper {
  constructor(schema, defaults = {}) {
    this.schema = schema;
    this.defaults = defaults;
  }

  validateSchema(data) {
    return ajv.validate(this.schema, Object.assign({}, data, this.defaults));
  }

  schemaExpect(valid, data) {
    expect(this.validateSchema(data)).to.equal(valid);

    if (!valid) {
      expect(ajv.errors[0].dataPath).to.contain(`.${Object.keys(data)[0]}`);
    }
  }

  testValidAndInvalid(parentKey, fields) {
    ['valid', 'invalid'].forEach((fieldType) => {
      const valid = fieldType === 'valid';

      fields[fieldType].forEach((values) => {
        it(`should${valid ? '' : 'nt'} allow ${parentKey} with ${JSON.stringify(values)}`, () => {
          this.schemaExpect(valid, objectBuilder(parentKey, values));
        });
      });
    });
  }
};

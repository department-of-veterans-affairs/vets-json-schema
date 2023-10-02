import ajv from 'ajv';
import { omit } from 'lodash';
import { expect } from 'chai';
import { it } from 'mocha';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';
import definitions from '../../../src/common/definitions';

const applicationSchema = schemas['10-10EZR'];

const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));
const jsonValidator = ajv({ allErrors: true, errorDataPath: 'property', removeAdditional: true, useDefaults: true });

function definitionValidator(field) {
  const tinySchema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      field: definitions[field],
    },
  };

  return function validator(value) {
    const fn = jsonValidator.compile(tinySchema);
    return fn({ field: value });
  };
}


describe('1010ezr json schema', () => {
  describe('phone', () => {
    const phoneValidation = definitionValidator('hcaPhone');
    it('validates a 10 digit number as a string', () => {
      expect(phoneValidation('1234567890')).to.be.true;
    });

    it('does not validate a 10 digit string of non-numeric characters', () => {
      expect(phoneValidation('abcdefghij')).to.be.false;
    });

    it('does not validate phone numbers that include punctuation', () => {
      expect(phoneValidation('123-456-7890')).to.be.false;
    });

    it('does not validate integer representations', () => {
      expect(phoneValidation(1234567890)).to.be.false;
    });

    it('does not allow blank values', () => {
      expect(phoneValidation('')).to.be.false;
    });
  });

  describe('ssn', () => {
    const ssnValidation = definitionValidator('ssn');
    it('validates a single string of numbers', () => {
      expect(ssnValidation('111223333')).to.be.true;
    });

    it('does not validate non-numeric values', () => {
      expect(ssnValidation('aaa223333')).to.be.false;
    });
  });

  describe('address', () => {
    const addressValidation = definitionValidator('hcaAddress');
    it("doesn't allow street, cities, or provinces with only spaces", () => {
      expect(addressValidation({ street: '   ', city: '    ', country: '     ', provinceCode: '     ' })).to.be.false;
    });
  });

  schemaTestHelper.testValidAndInvalid('veteranFullName', {
    valid: [
      {
        first: 'a0ad6a23fa748a2768fcf6041',
        last: 'dfdf',
      },
    ],
    invalid: [
      {
        first: 'a0ad6a23fa748a2768fcf6041d',
        last: 'dfdf',
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('email', {
    valid: ['a@a.com', 'a@a.net', 'a+2@a.com', 'Foo@foo.com', 'foo.bar@foo.org'],
    invalid: ['@', 'foo', 'foo.com', 'a@a', 'a@a.', '@a.com'],
  });
});

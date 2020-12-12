import ajv from 'ajv';
import { omit } from 'lodash';
import { expect } from 'chai';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';

const applicationSchema = schemas['10-10EZ'];

const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));
const jsonValidator = ajv({ allErrors: true, errorDataPath: 'property', removeAdditional: true, useDefaults: true });

function definitionValidator(field) {
  const tinySchema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      field: applicationSchema.definitions[field],
    },
  };

  return function validator(value) {
    const fn = jsonValidator.compile(tinySchema);
    return fn({ field: value });
  };
}

function stringGenerate(length) {
  return new Array(length + 1).join('a');
}

// TODO: These should be cross checked against what's generated by common/veteran.js and possibly
// what's in utils/validations.js for a more inter-connected verification that we're sending and
// getting what's expected all around.
describe('healthcare-application json schema', () => {
  describe('phone', () => {
    const phoneValidation = definitionValidator('phone');
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

    it('validates a single properly delemited string of numbers', () => {
      expect(ssnValidation('111-22-3333')).to.be.true;
    });

    it('does not validate non-numeric values', () => {
      expect(ssnValidation('aa-22-3333')).to.be.false;
    });
  });

  describe('fullName', () => {
    const fullNameValidation = definitionValidator('fullName');
    it('allows 2 letter last names', () => {
      expect(fullNameValidation({ first: 'foo', last: 'ba' })).to.be.true;
    });

    it('doesnt allow 1 letter last names', () => {
      expect(fullNameValidation({ first: 'foo', last: 'b' })).to.be.false;
    });

    it("doesn't allow names with only spaces", () => {
      expect(fullNameValidation({ first: '   ', last: '  ' })).to.be.false;
    });
  });

  describe('address', () => {
    const addressValidation = definitionValidator('address');
    it("doesn't allow street, cities, or provinces with only spaces", () => {
      expect(addressValidation({ street: '   ', city: '    ', country: '     ', provinceCode: '     ' })).to.be.false;
    });
  });

  describe('provider', () => {
    const providerValidation = definitionValidator('provider');

    [
      ['insuranceName', 100],
      ['insurancePolicyHolderName', 50],
      ['insurancePolicyNumber', 30],
      ['insuranceGroupCode', 30],
    ].forEach(providerFieldData => {
      const providerField = providerFieldData[0];
      const providerFieldMaxLength = providerFieldData[1];
      const policyNumber = {
        insurancePolicyNumber: '123',
      };

      it(`allows ${providerField} with less than ${providerFieldMaxLength} chars`, () => {
        expect(providerValidation({ ...policyNumber, [providerField]: stringGenerate(providerFieldMaxLength) })).to.be
          .true;
      });

      it(`doesnt allow ${providerField} with more than ${providerFieldMaxLength} chars`, () => {
        expect(providerValidation({ ...policyNumber, [providerField]: stringGenerate(providerFieldMaxLength + 1) })).to
          .be.false;
      });
    });

    it('requires policy number or group code', () => {
      expect(providerValidation({ insurancePolicyNumber: '123' })).to.be.true;
      expect(providerValidation({ insuranceGroupCode: '123' })).to.be.true;
      expect(providerValidation({})).to.be.false;
    });

    it('doesnt allow only spaces for insurancePolicyNumber or insuranceGroupCode', () => {
      expect(providerValidation({ insuranceGroupCode: ' ' })).to.be.false;
      expect(providerValidation({ insurancePolicyNumber: ' ' })).to.be.false;
    });
  });

  schemaTestHelper.testValidAndInvalid('attachments', {
    valid: [
      [
        {
          dd214: true,
          confirmationCode: 'testing',
          name: 'testing',
          size: 1,
        },
      ],
    ],
    invalid: [1],
  });

  schemaTestHelper.testValidAndInvalid('email', {
    valid: ['a@a.com', 'a@a.net', 'a+2@a.com', 'Foo@foo.com', 'foo.bar@foo.org'],
    invalid: ['@', 'foo', 'foo.com', 'a@a', 'a@a.', '@a.com'],
  });
});

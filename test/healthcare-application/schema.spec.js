import ajv from 'ajv';
import { healthcareApplication as applicationSchema } from '../../dist/schemas';
import { expect } from 'chai';

const jsonValidator = ajv({ allErrors: true, errorDataPath: 'property', removeAdditional: true, useDefaults: true });

function definitionValidator(field) {
  const tinySchema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    properties: {
      field: applicationSchema.definitions[field]
    }
  };

  return function validator(value) {
    const fn = jsonValidator.compile(tinySchema);
    return fn({ field: value });
  };
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

  describe('provider', () => {
    const providerValidation = definitionValidator('provider');
    it('allows insurancePolicyHolderName with less than 50 chars', () => {
      expect(providerValidation({ insurancePolicyHolderName: 'foo' })).to.be.true;
    });

    it('doesnt allow insurancePolicyHolderName with more than 50 chars', () => {
      expect(providerValidation({ insurancePolicyHolderName: '012345678901234567890123456789012345678901234567890' })).to.be.false;
    });
  });
});

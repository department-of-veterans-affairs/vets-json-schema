import { it } from 'mocha';
import { expect } from 'chai';

/* eslint-disable no-unused-expressions */

function stringGenerate(length) {
  return new Array(length + 1).join('a');
}

export function itValidatesInsuranceProvider(providerValidation) {
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
      expect(providerValidation({ ...policyNumber, [providerField]: stringGenerate(providerFieldMaxLength + 1) })).to.be
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
}

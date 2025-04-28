import { difference, omit } from 'lodash';
import { expect } from 'chai';
import { it } from 'mocha';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';

const applicationSchema = schemas['10-10EZR'];
const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));
const { definitions } = schemas;
function stringGenerate(length) {
  return new Array(length + 1).join('a');
}

const nameMaxLength = stringGenerate(100);
const policyHolderNameMaxLength = stringGenerate(50);
const policyNumberMaxLength = stringGenerate(30);
const groupCodeMaxLength = stringGenerate(30);

function insuranceProvider(insuranceName, insurancePolicyHolderName, insurancePolicyNumber, insuranceGroupCode) {
  return {
    insuranceName,
    insurancePolicyHolderName,
    insurancePolicyNumber,
    insuranceGroupCode,
  };
}

describe('10-10EZR json schema', () => {
  it('should have TERA fields', () => {
    const teraKeys = Object.keys(definitions.teraQuestions);
    const schemaKeys = Object.keys(applicationSchema.properties);
    expect(difference(teraKeys, schemaKeys).length).to.equal(0);
  });

  schemaTestHelper.testValidAndInvalid('medicareClaimNumber', {
    valid: [stringGenerate(30)],
    invalid: [null, '', '     '],
  });

  schemaTestHelper.testValidAndInvalid('providers', {
    valid: [
      [
        // 'insurancePolicyNumber' present
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, policyNumberMaxLength, null),
        // 'insuranceGroupCode' present
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, null, groupCodeMaxLength),
        // Both 'insurancePolicyNumber' and 'insuranceGroupCode' present
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, policyNumberMaxLength, groupCodeMaxLength),
      ],
    ],
    invalid: [
      [
        // No 'insurancePolicyNumber' or 'insuranceGroupCode' present
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, null, null),
        // Only spaces for 'insuranceName'
        insuranceProvider('  ', policyHolderNameMaxLength, policyNumberMaxLength, groupCodeMaxLength),
        // Only spaces for 'insurancePolicyHolderName'
        insuranceProvider(nameMaxLength, '   ', policyNumberMaxLength, groupCodeMaxLength),
        // Only spaces for 'insurancePolicyNumber'
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, '   ', groupCodeMaxLength),
        // Only spaces for 'insuranceGroupCode'
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, policyNumberMaxLength, '     '),
        // Max length for 'insuranceName' exceeded
        insuranceProvider(nameMaxLength + 1, policyHolderNameMaxLength, policyNumberMaxLength, null),
        // Max length for 'insurancePolicyHolderName' exceeded
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength + 1, null, groupCodeMaxLength),
        // Max length for 'insurancePolicyNumber' exceeded
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, policyNumberMaxLength + 1, groupCodeMaxLength),
        // Max length for 'insuranceGroupCode' exceeded
        insuranceProvider(nameMaxLength, policyHolderNameMaxLength, policyNumberMaxLength, groupCodeMaxLength + 1),
      ],
    ],
  });
});

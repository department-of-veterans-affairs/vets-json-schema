import { cloneDeep, omit } from 'lodash';
import { expect } from 'chai';
import { it } from 'mocha';
import schema from '../../../src/schemas/22-0803/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
// Ignore root-level cross-field logic for the unit-style property tests:
const schemaTestHelper = new SchemaTestHelper(schemaClone);

describe('22-0803 schema', () => {
  const base = {
    testCost: 123,
    organizationName: 'test org',
    organizationAddress: {
      country: 'USA',
      street: '123 Fake St.',
      city: 'Skokie',
      state: 'IL',
      postalCode: '12345',
    },
    testName: 'Physics Certification',
    testDate: '2022-11-12',
    mailingAddress: {
      country: 'USA',
      street: '321 Maple Ave.',
      city: 'Boise',
      state: 'ID',
      postalCode: '54321',
    },
    statementOfTruthSignature: 'Abraham Lincoln',
  };

  it('is valid with an ssn and has previously applied', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: true,
      vaBenefitProgram: 'chapter30',
      ssn: '796111863',
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
  });

  it('is valid with a va file number and has previously applied', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: true,
      vaBenefitProgram: 'chapter30',
      vaFileNumber: '796111863',
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
  });

  it('is valid with both an ssn and va file number and has previously applied', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: true,
      vaBenefitProgram: 'chapter30',
      vaFileNumber: '796111863',
      ssn: '123456789',
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
  });

  it('is invalid when neither ssn nor va file number is given', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: true,
      vaBenefitProgram: 'chapter30',
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(false);
  });

  it('is invalid with has previously applied is true and no benefit program', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: true,
      ssn: '123456789',
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(false);
  });
});

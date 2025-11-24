import { cloneDeep, omit } from 'lodash';
import { expect } from 'chai';
import { it } from 'mocha';
import schema from '../../../src/schemas/22-0803/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
// Ignore root-level cross-field logic for the unit-style property tests:
const schemaTestHelper = new SchemaTestHelper(schemaClone);

const testData = {
  applicantName: {
    valid: [
      { first: 'Joe', last: 'Smith' },
      { first: 'A', last: 'B' },
    ],
    invalid: [{ first: null, last: null }],
  },
  organizationName: {
    valid: ['Test Org'],
    invalid: [''],
  },
  organizationAddress: {
    valid: [
      {
        street: '111 2nd St S',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
    ],
    invalid: [
      {
        street: null,
        city: 'Seattle',
        state: 'WA',
        postalCode: '',
        country: 'USA',
      },
    ],
  },
  testName: {
    valid: ['My Test', 'abc123'],
    invalid: [''],
  },
  testDate: {
    valid: ['2020-01-01'],
    invalid: ['', '12/10/2022'],
  },
  mailingAddress: {
    valid: [
      {
        street: '111 2nd St S',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
    ],
    invalid: [
      {
        street: null,
        city: 'Seattle',
        state: 'WA',
        postalCode: '',
        country: 'USA',
      },
    ],
  },
  vaBenefitProgram: {
    valid: ['chapter30', 'chapter33', 'chapter35', 'chapter1606'],
    invalid: ['chapter20', 'abcd'],
  },
  ssn: {
    valid: ['123456789'],
    invalid: ['abc', '123'],
  },
  statementOfTruthSignature: {
    valid: ['Jane Q. Smith', 'J Smith'],
    invalid: [null, ''],
  },
  dateSigned: {
    valid: ['2025-08-01', '2024-01-31'],
    invalid: ['08/01/2025', '2025-13-01', null],
  },
};

describe('22-0839 schema', () => {
  const validationHelper = new SchemaTestHelper(omit(schemaClone, ['required', 'oneOf', 'anyOf']));
  validationHelper.testValidAndInvalid('applicantName', testData.applicantName);
  validationHelper.testValidAndInvalid('organizationName', testData.organizationName);
  validationHelper.testValidAndInvalid('organizationAddress', testData.organizationAddress);
  validationHelper.testValidAndInvalid('testName', testData.testName);
  validationHelper.testValidAndInvalid('testDate', testData.testDate);
  validationHelper.testValidAndInvalid('mailingAddress', testData.mailingAddress);
  validationHelper.testValidAndInvalid('vaBenefitProgram', testData.vaBenefitProgram);
  validationHelper.testValidAndInvalid('ssn', testData.ssn);
  validationHelper.testValidAndInvalid('statementOfTruthSignature', testData.statementOfTruthSignature);
  validationHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});

describe('22-0803 schema test inputs', () => {
  const base = {
    testCost: 123,
    applicantName: {
      first: 'Joe',
      last: 'Smith',
    },
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
    dateSigned: '2022-01-01',
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

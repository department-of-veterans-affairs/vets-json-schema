import { cloneDeep, omit } from 'lodash';
import { expect } from 'chai';
import { it } from 'mocha';
import schema from '../../../src/schemas/22-10272/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(schemaClone);

const longString501 = 'a'.repeat(501);

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
    valid: [
      'Previously applied for Chapter 33',
      'Used Chapter 33 and Chapter 35 in the past',
    ],
    invalid: [
      '',
      null,
      longString501,
    ],
  },
  vaFileNumber: {
    valid: ['796111863', '123456789'],
    invalid: ['abc', '', null, '12345678', '1234567890'],
  },
  statementOfTruthSignature: {
    valid: ['Jane Q. Smith', 'J Smith'],
    invalid: [null, ''],
  },
  dateSigned: {
    valid: ['2025-08-01', '2024-01-31'],
    invalid: ['08/01/2025', '2025-13-01', null],
  },
  prepCourseName: {
    valid: ['Test Prep Course'],
    invalid: [''],
  },
  prepCourseOrganizationName: {
    valid: ['Prep Org'],
    invalid: [''],
  },
  prepCourseOrganizationAddress: {
    valid: [
      {
        street: '500 Prep St',
        city: 'Denver',
        state: 'CO',
        postalCode: '80202',
        country: 'USA',
      },
    ],
    invalid: [
      {
        street: null,
        city: 'Denver',
        state: 'CO',
        postalCode: '',
        country: 'USA',
      },
    ],
  },
  prepCourseTakenOnline: {
    valid: [true, false],
    invalid: ['yes', null],
  },
  prepCourseStartDate: {
    valid: ['2022-01-01'],
    invalid: ['', '01/01/2022'],
  },
  prepCourseEndDate: {
    valid: ['2022-01-31'],
    invalid: ['', '01/31/2022'],
  },
  prepCourseCost: {
    valid: [0, 123.45],
    invalid: [-1, 'abc'],
  },
  remarks: {
    valid: ['Some remarks', '', 'a'.repeat(500)],
    invalid: [longString501],
  },
};

describe('22-10272 schema property validations', () => {
  // Strip out cross-field logic for unit-style property tests
  const validationHelper = new SchemaTestHelper(
    omit(schemaClone, ['required', 'oneOf']),
  );

  validationHelper.testValidAndInvalid('applicantName', testData.applicantName);
  validationHelper.testValidAndInvalid('organizationName', testData.organizationName);
  validationHelper.testValidAndInvalid('organizationAddress', testData.organizationAddress);
  validationHelper.testValidAndInvalid('testName', testData.testName);
  validationHelper.testValidAndInvalid('mailingAddress', testData.mailingAddress);
  validationHelper.testValidAndInvalid('vaBenefitProgram', testData.vaBenefitProgram);
  validationHelper.testValidAndInvalid('vaFileNumber', testData.vaFileNumber);
  validationHelper.testValidAndInvalid(
    'statementOfTruthSignature',
    testData.statementOfTruthSignature,
  );
  validationHelper.testValidAndInvalid('dateSigned', testData.dateSigned);

  validationHelper.testValidAndInvalid('prepCourseName', testData.prepCourseName);
  validationHelper.testValidAndInvalid(
    'prepCourseOrganizationName',
    testData.prepCourseOrganizationName,
  );
  validationHelper.testValidAndInvalid(
    'prepCourseOrganizationAddress',
    testData.prepCourseOrganizationAddress,
  );
  validationHelper.testValidAndInvalid(
    'prepCourseTakenOnline',
    testData.prepCourseTakenOnline,
  );
  validationHelper.testValidAndInvalid(
    'prepCourseStartDate',
    testData.prepCourseStartDate,
  );
  validationHelper.testValidAndInvalid(
    'prepCourseEndDate',
    testData.prepCourseEndDate,
  );
  validationHelper.testValidAndInvalid('prepCourseCost', testData.prepCourseCost);
  validationHelper.testValidAndInvalid('remarks', testData.remarks);
});

describe('22-10272 schema cross-field validations', () => {
  const base = {
    applicantName: {
      first: 'Joe',
      last: 'Smith',
    },
    mailingAddress: {
      country: 'USA',
      street: '321 Maple Ave.',
      city: 'Boise',
      state: 'ID',
      postalCode: '54321',
    },
    vaFileNumber: '796111863',
    testName: 'Physics Certification',
    organizationName: 'Test Org',
    organizationAddress: {
      country: 'USA',
      street: '123 Fake St.',
      city: 'Skokie',
      state: 'IL',
      postalCode: '12345',
    },
    prepCourseName: 'Test Prep Course',
    prepCourseOrganizationName: 'Prep Org',
    prepCourseOrganizationAddress: {
      country: 'USA',
      street: '500 Prep St',
      city: 'Denver',
      state: 'CO',
      postalCode: '80202',
    },
    prepCourseTakenOnline: true,
    prepCourseStartDate: '2022-01-01',
    prepCourseEndDate: '2022-01-31',
    prepCourseCost: 123,
    statementOfTruthSignature: 'Abraham Lincoln',
    dateSigned: '2022-02-01',
  };

  it('is valid when hasPreviouslyApplied is true and vaBenefitProgram is provided', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: true,
      vaBenefitProgram: 'Previously applied for Chapter 33 benefits',
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
  });

  it('is invalid when hasPreviouslyApplied is true and vaBenefitProgram is missing', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: true,
      // vaBenefitProgram omitted
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(false);
  });

  it('is valid when hasPreviouslyApplied is false and vaBenefitProgram is not provided', () => {
    const payload = {
      ...base,
      hasPreviouslyApplied: false,
      // vaBenefitProgram omitted
    };

    expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
  });
});

import _ from 'lodash';
import { expect } from 'chai';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21P-527EZ'];
const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

describe('21P-527EZ schema', () => {
  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal([
      'veteranFullName',
      'veteranAddress',
      'statementOfTruthCertified',
      'statementOfTruthSignature',
    ]);
  });

  sharedTests.runTest('usaPhone', ['phone', 'dayPhone', 'nightPhone', 'mobilePhone']);

  sharedTests.runTest('email', ['email']);

  sharedTests.runTest('fullName', ['veteranFullName']);

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'spouseSocialSecurityNumber']);

  sharedTests.runTest('dateRange', ['powDateRange']);

  sharedTests.runTest('centralMailVaFile', ['vaFileNumber', 'spouseVaFileNumber']);

  const testData = {
    address: {
      valid: [
        {
          country: 'USA',
          street: '123 at home dr',
          street2: 'apt 1',
          city: 'a city',
          state: 'AL',
          postalCode: '12345',
        },
      ],
      invalid: [
        {
          country: 'ABC',
          street: true,
          city: null,
          state: false,
          postalCode: 12345,
        },
      ],
    },
  };
  schemaTestHelper.testValidAndInvalid('veteranAddress', testData.address);

  schemaTestHelper.testValidAndInvalid('spouseAddress', testData.address);

  sharedTests.runTest('marriages', ['marriages']);

  sharedTests.runTest('files', ['files']);

  ['spouseDateOfBirth', 'veteranDateOfBirth'].forEach(field => {
    schemaTestHelper.testValidAndInvalid(field, {
      valid: ['1990-01-01'],
      invalid: ['1/1/1990'],
    });
  });

  schemaTestHelper.testValidAndInvalid('dependents', {
    valid: [
      [
        {
          fullName: fixtures.fullName,
          childDateOfBirth: fixtures.date,
          childPlaceOfBirth: 'ny, ny',
          childSocialSecurityNumber: fixtures.ssn,
          childRelationship: 'ADOPTED',
          attendingCollege: true,
          disabled: true,
          previouslyMarried: true,
          childInHousehold: true,
          childAddress: fixtures.address,
          personWhoLivesWithChild: fixtures.fullName,
          monthlyPayment: 1,
        },
      ],
    ],
    invalid: [
      [
        {
          fullName: 1,
        },
      ],
    ],
  });

  schemaTestHelper.testValidAndInvalid('bankAccount', {
    valid: [
      {
        accountType: 'checking',
        routingNumber: '123456789',
        bankName: 'foo',
        accountNumber: '1234',
      },
    ],
    invalid: [
      {
        bankName: 1,
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('previousNames', {
    valid: [[fixtures.previousFullName, fixtures.previousFullName]],
    invalid: [[false]],
  });

  schemaTestHelper.testValidAndInvalid('currentEmployers', {
    valid: [
      [
        {
          jobType: 'analyst',
          jobHoursWeek: '40',
          jobTitle: 'analyst',
        },
      ],
    ],
    invalid: [
      [
        {
          jobType: 1,
          jobHoursWeek: 40,
          jobTitle: 234,
        },
      ],
    ],
  });

  schemaTestHelper.testValidAndInvalid('previousEmployers', {
    valid: [
      [
        {
          jobDate: '2020-01-01',
          jobType: 'analyst',
          jobHoursWeek: '40',
          jobTitle: 'analyst',
        },
      ],
    ],
    invalid: [
      [
        {
          jobDate: '2020/01/01',
          jobType: 1,
          jobHoursWeek: 40,
          jobTitle: 234,
        },
      ],
    ],
  });

  schemaTestHelper.testValidAndInvalid('vaMedicalCenters', {
    valid: [
      [
        {
          medicalCenter: 'Maryland',
        },
      ],
    ],
    invalid: [
      [
        {
          medicalCenter: 3,
        },
      ],
    ],
  });

  schemaTestHelper.testValidAndInvalid('maritalStatus', {
    valid: ['MARRIED', 'NEVER_MARRIED', 'SEPARATED', 'WIDOWED', 'DIVORCED'],
    invalid: ['foo'],
  });
});

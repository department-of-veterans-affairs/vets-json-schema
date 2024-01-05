import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';
import { expect } from 'chai';

const schema = schemas['21P-527EZ'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-527 schema', () => {
  [
    'maritalStatus'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal(['privacyAgreementAccepted', 'veteranFullName', 'veteranAddress']);
  });

  sharedTests.runTest('usaPhone', ['phone', 'mobilePhone']);

  sharedTests.runTest('email', ['email']);

  sharedTests.runTest('fullName', ['veteranFullName']);

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'spouseSocialSecurityNumber']);

  sharedTests.runTest('dateRange', ['powDateRange']);

  sharedTests.runTest('centralMailVaFile', ['vaFileNumber', 'spouseVaFileNumber']);

  sharedTests.runTest('address', ['spouseAddress']);

  sharedTests.runTest('centralMailAddress', ['veteranAddress']);

  sharedTests.runTest('marriages', ['marriages']);

  sharedTests.runTest('files', ['files']);

  ['spouseDateOfBirth', 'veteranDateOfBirth'].forEach((field) => {
    schemaTestHelper.testValidAndInvalid(field, {
      valid: ['1990-01-01'],
      invalid: ['1/1/1990']
    })
  });

  schemaTestHelper.testValidAndInvalid('dependents', {
    valid: [[{
      fullName: fixtures.fullName,
      childDateOfBirth: fixtures.date,
      childPlaceOfBirth: 'ny, ny',
      childSocialSecurityNumber: fixtures.ssn,
      childRelationship: 'adopted',
      attendingCollege: true,
      disabled: true,
      married: true,
      previouslyMarried: true,
      childFullName: fixtures.fullName,
      childInHousehold: true,
      childAddress: fixtures.address,
      personWhoLivesWithChild: fixtures.fullName,
      monthlyPayment: 1,
    }]],
    invalid: [[{
      fullName: 1,
    }]],
  });

  schemaTestHelper.testValidAndInvalid('bankAccount', {
    valid: [{
      accountType: 'checking',
      routingNumber: '123456789',
      bankName: 'foo',
      accountNumber: '1234'
    }],
    invalid: [{
      bankName: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('previousNames', {
    valid: [[fixtures.fullName, fixtures.fullName]],
    invalid: [[false]]
  });

  schemaTestHelper.testValidAndInvalid('currentEmployers', {
    valid: [[{
      jobType: 'analyst',
      jobHoursWeek: 40,
      jobTitle: 'analyst',
    }]],
    invalid: [[{
      jobType: 1,
      jobHoursWeek: '40',
      jobTitle: 234,
    }]]
  });

  schemaTestHelper.testValidAndInvalid('previousEmployers', {
    valid: [[{
      jobDate: '2020-01-01',
      jobType: 'analyst',
      jobHoursWeek: 40,
      jobTitle: 'analyst',
    }]],
    invalid: [[{
      jobDate: '2020/01/01',
      jobType: 1,
      jobHoursWeek: '40',
      jobTitle: 234,
    }]]
  });

  schemaTestHelper.testValidAndInvalid('vaMedicalCenters', {
    valid: [[{
      medicalCenter: 'Maryland'
    }]],
    invalid: [[{
      medicalCenter: 3
    }]]
  });
});

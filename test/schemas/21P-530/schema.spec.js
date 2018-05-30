import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';
import { expect } from 'chai';

const schema = schemas['21P-530'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-530 schema', () => {
  sharedTests.runTest('usaPhone', ['claimantPhone']);

  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal(['privacyAgreementAccepted', 'claimantAddress', 'veteranFullName']);
  });

  sharedTests.runTest('fullName', ['claimantFullName', 'veteranFullName']);

  sharedTests.runTest('date', ['deathDate', 'burialDate', 'veteranDateOfBirth']);

  sharedTests.runTest('vaFileNumber', ['vaFileNumber']);

  sharedTests.runTest('centralMailAddress', ['claimantAddress']);

  sharedTests.runTest('email', ['claimantEmail']);

  sharedTests.runTest('files', ['deathCertificate', 'transportationReceipts']);

  schemaTestHelper.testValidAndInvalid('relationship', {
    valid: [{
      type: 'spouse'
    }, {
      type: 'other',
      other: 'Whatever'
    }],
    invalid: [{
      type: 'grandfather'
    }, {
      type: 'other',
      other: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('locationOfDeath', {
    valid: [{
      location: 'vaMedicalCenter'
    }, {
      location: 'other',
      other: 'Somewhere'
    }],
    invalid: [{
      location: 'asdfa'
    }, {
      location: 'other',
      other: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('previousNames', {
    valid: [[fixtures.fullName, fixtures.fullName]],
    invalid: [[false]]
  });

  schemaTestHelper.testValidAndInvalid('toursOfDuty', {
    valid: [[{
      serviceBranch: 'Army',
      dateRange: {
        to: '2010-01-01',
        from: '2010-01-02'
      },
      rank: 'test',
      serviceNumber: 'some text',
      placeOfEntry: 'DC',
      placeOfSeparation: 'VA'
    }]],
    invalid: [[{
      serviceBranch: 'Army',
      dateRange: '2010-01-02',
      rank: 'test',
      serviceNumber: 'some text',
      placeOfEntry: 'DC',
      placeOfSeparation: 'VA'
    }]]
  });

  ['federalCemetery', 'stateCemetery', 'govtContributions', 'previouslyReceivedAllowance', 'benefitsUnclaimedRemains', 'burialAllowance', 'plotAllowance', 'transportation'].forEach(attr => {
    schemaTestHelper.testValidAndInvalid(attr, {
      valid: [true, false],
      invalid: ['012345678x', 1]
    });
  });

  ['amountIncurred', 'burialCost', 'amountGovtContribution'].forEach(attr => {
    schemaTestHelper.testValidAndInvalid(attr, {
      valid: [3, 3.5],
      invalid: ['012345678x', false]
    });
  });

  schemaTestHelper.testValidAndInvalid('burialAllowanceRequested', {
    valid: ['nonService', 'service', 'vaMC'],
    invalid: ['whatever', 3, false]
  });

  schemaTestHelper.testValidAndInvalid('placeOfRemains', {
    valid: ['whatever', '1'],
    invalid: [3, false]
  });
});

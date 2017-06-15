import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21P-530'];

let schemaTestHelper = new SchemaTestHelper(schema);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-530 schema', () => {

  sharedTests.runTest('fullName', ['claimantFullName', 'veteranFullName']);

  sharedTests.runTest('date', ['deathDate', 'burialDate']);

  sharedTests.runTest('vaFileNumber', ['vaFileNumber']);

  sharedTests.runTest('address', ['claimantAddress']);

  sharedTests.runTest('email', ['claimantEmail']);

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

  ['federalCemetary', 'stateCemetary', 'govtContributions', 'previouslyReceiveAllowance', 'incurredExpenses', 'benefitsUnclaimedRemains', 'burialAllowance', 'plotAllowance', 'transportation'].forEach(attr => {
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

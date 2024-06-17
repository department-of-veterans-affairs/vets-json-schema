import _ from 'lodash';
import { expect } from 'chai';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21P-530'];
const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

describe('21-530 schema', () => {
  // sharedTests.runTest('usaPhone', ['claimantPhone']);

  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal(['privacyAgreementAccepted', 'claimantAddress', 'veteranFullName']);
  });

  sharedTests.runTest('fullName', ['claimantFullName', 'veteranFullName']);

  sharedTests.runTest('date', ['deathDate', 'burialDate', 'veteranDateOfBirth']);

  sharedTests.runTest('centralMailVaFile', ['vaFileNumber']);

  sharedTests.runTest('centralMailAddress', ['claimantAddress']);

  // sharedTests.runTest('email', ['claimantEmail']);

  sharedTests.runTest('files', ['deathCertificate', 'transportationReceipts']);

  // schemaTestHelper.testValidAndInvalid('relationship', {
  //   valid: [{
  //     type: 'spouse'
  //   }, {
  //     type: 'other',
  //     other: 'Whatever'
  //   }],
  //   invalid: [{
  //     type: 'grandfather'
  //   }, {
  //     type: 'other',
  //     other: 1
  //   }]
  // });

  schemaTestHelper.testValidAndInvalid('locationOfDeath', {
    valid: [
      {
        location: 'vaMedicalCenter',
      },
      {
        location: 'other',
        other: 'Somewhere',
      },
    ],
    invalid: [
      {
        location: 'asdfa',
      },
      {
        location: 'other',
        other: 1,
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('previousNames', {
    valid: [[fixtures.fullName, fixtures.fullName]],
    invalid: [[false]],
  });

  schemaTestHelper.testValidAndInvalid('toursOfDuty', {
    valid: [
      [
        {
          serviceBranch: 'Army',
          dateRange: {
            to: '2010-01-01',
            from: '2010-01-02',
          },
          rank: 'test',
          serviceNumber: 'some text',
          placeOfEntry: 'DC',
          placeOfSeparation: 'VA',
        },
      ],
    ],
    invalid: [
      [
        {
          serviceBranch: 'Army',
          dateRange: '2010-01-02',
          rank: 'test',
          serviceNumber: 'some text',
          placeOfEntry: 'DC',
          placeOfSeparation: 'VA',
        },
      ],
    ],
  });

  [
    'federalCemetery',
    'stateCemetery',
    'govtContributions',
    'previouslyReceivedAllowance',
    'benefitsUnclaimedRemains',
  ].forEach(attr => {
    schemaTestHelper.testValidAndInvalid(attr, {
      valid: [true, false],
      invalid: ['012345678x', 1],
    });
  });

  ['burialCost'].forEach(attr => {
    schemaTestHelper.testValidAndInvalid(attr, {
      valid: [3, 3.5],
      invalid: ['012345678x', false],
    });
  });

  schemaTestHelper.testValidAndInvalid('burialAllowanceRequested', {
    valid: ['nonService', 'service', 'vaMC'],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('placeOfRemains', {
    valid: ['whatever', '1'],
    invalid: [3, false],
  });
});

/* eslint-disable no-undef */
import _ from 'lodash';
import { expect } from 'chai';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21P-0969'];
const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

describe('21-0969 schema', () => {
  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal([
      'veteranFullName',
      'statementOfTruthCertified',
      'statementOfTruthSignature',
    ]);
  });

  sharedTests.runTest('usaPhone', ['claimantPhone']);

  sharedTests.runTest('fullName', ['veteranFullName', 'claimantFullName']);

  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'claimantSocialSecurityNumber']);

  sharedTests.runTest('dateRange', ['incomeNetWorthDateRange']);

  sharedTests.runTest('centralMailVaFile', ['vaFileNumber']);

  sharedTests.runTest('files', ['files']);
});

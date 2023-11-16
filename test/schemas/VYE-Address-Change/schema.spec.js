import _ from 'lodash';
import { expect } from 'chai';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import SharedTests from '../../support/shared-tests';

const schema = schemas['VYE-Address-Change'];
const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

describe('21-686C schema', () => {
  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal([
      'veteranFullName',
      'veteranAddress',
    ]);
  });

  sharedTests.runTest('fullName', ['veteranFullName']);
  sharedTests.runTest('vaFileNumber', ['vaFileNumber']);
  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber']);
  
  schemaTestHelper.testValidAndInvalid('veteranAddress', {
    valid: [
      {
        addressType: 'DOMESTIC',
        street: '123 main st.',
        city: 'anywhere',
        countryDropdown: 'USA',
        state: 'KY',
        postalCode: '55555',
      },
      {
        addressType: 'MILITARY',
        street: '123 main st.',
        city: 'anywhere',
        countryDropdown: 'USA',
        postOffice: 'APO',
        postalType: 'AA',
        postalCode: '55555',
      },
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        countryDropdown: 'Canada',
      },
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        countryDropdown: 'Country Not In List',
        countryText: 'Independent Nation of Myself',
      },
    ],
    invalid: [
      // INTERNATIONAL with country of 'USA'
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        countryDropdown: 'USA',
      },

      // INTERNATIONAL (Country Not In List) with state and postalCode
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        countryDropdown: 'Country Not In List',
        state: 'KY',
        postalCode: '55555',
      },

      // INTERNATIONAL with state and postalCode
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        state: 'KY',
        countryDropdown: 'Bangladesh',
      },

      // INTERNATIONAL with selected country (allowed) and countryText (not allowed)
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        countryDropdown: 'Canada',
        countryText: 'Independent Nation of Myself',
      },

      // consecutive spaces present
      {
        addressType: 'DOMESTIC',
        street: '123 main st.',
        city: 'any  where',
        countryDropdown: 'USA',
        state: 'KY',
        postalCode: '55555',
      },
    ],
  });
});

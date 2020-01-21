import _ from 'lodash';
import { expect } from 'chai';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21-686C'];
const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

describe('21-686C schema', () => {
  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal([
      'privacyAgreementAccepted',
      'veteranFullName',
      'veteranAddress',
      'maritalStatus',
    ]);
  });

  sharedTests.runTest('fullName', ['veteranFullName']);
  sharedTests.runTest('email', ['veteranEmail']);
  sharedTests.runTest('vaFileNumber', ['vaFileNumber']);
  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber']);
  sharedTests.runTest('usaPhone', ['dayPhone', 'nightPhone']);

  const validDependent = {
    fullName: fixtures.fullName,
    childDateOfBirth: fixtures.date,
    childSocialSecurityNumber: fixtures.ssn,
    childRelationship: 'adopted',
    attendingCollege: true,
    disabled: true,
    dateMarriageEnded: fixtures.date,
    reasonMarriageEnded: 'Declared void',
    previouslyMarried: true,
    childInHousehold: true,
    childAddress: {
      street: '123 a rd',
      city: 'abc',
      countryDropdown: 'USA',
      addressType: 'DOMESTIC',
      state: 'TX',
      postalCode: '344546767',
    },
    childHasNoSsn: false,
    childHasNoSsnReason: 'NONRESIDENTALIEN',
    personWhoLivesWithChild: fixtures.fullName,
  };

  schemaTestHelper.testValidAndInvalid('currentMarriage', {
    valid: [
      {
        spouseFullName: fixtures.fullName,
        spouseSocialSecurityNumber: fixtures.ssn,
        spouseVaFileNumber: 'C1234567',
      },
      {
        spouseFullName: fixtures.fullName,
        spouseHasNoSsn: true,
        spouseHasNoSsnReason: 'NONRESIDENTALIEN',
      },
    ],
    invalid: [
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada',
        },
        spouseFullName: fixtures.fullName,
      },
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Country Not In List',
          countryText: 'My Island',
        },
        spouseFullname: fixtures.fullName,
        spouseSocialSecurityNumber: 'blah',
      },
      // invalid spouseVaFileNumber
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada',
        },
        spouseFullName: fixtures.fullName,
        spouseSocialSecurityNumber: fixtures.ssn,
        spouseVaFileNumber: 'C12345679999',
      },
      // invalid spouseDateOfBirth
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada',
        },
        spouseFullName: fixtures.fullName,
        spouseSocialSecurityNumber: fixtures.ssn,
        spouseDateOfBirth: 'in the past',
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('maritalStatus', {
    valid: ['MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED', 'NEVERMARRIED'],
    invalid: ['Divorce'],
  });

  schemaTestHelper.testValidAndInvalid('marriages', {
    valid: [
      [
        {
          dateOfMarriage: fixtures.date,
          locationOfMarriage: 'Washington, DC',
          spouseFullName: fixtures.fullName,
          reasonForSeparation: 'Divorce',
          dateOfSeparation: fixtures.date,
          locationOfSeparation: 'Washington, DC',
          marriageType: 'common-law',
        },
        {
          dateOfMarriage: fixtures.date,
          locationOfMarriage: 'Washington, DC',
          spouseFullName: fixtures.fullName,
          reasonForSeparation: 'Other',
          explainSeparation: 'irreconcilable differences',
          dateOfSeparation: fixtures.date,
          locationOfSeparation: 'Washington, DC',
          marriageType: 'common-law',
        },
      ],
    ],
    invalid: [
      [
        { reasonForSeparation: 'fadsf' },
        // 'Other' without explanation
        {
          dateOfMarriage: fixtures.date,
          locationOfMarriage: 'Washington, DC',
          spouseFullName: fixtures.fullName,
          reasonForSeparation: 'Other',
          dateOfSeparation: fixtures.date,
          locationOfSeparation: 'Washington, DC',
        },
      ],
    ],
  });

  schemaTestHelper.testValidAndInvalid('dependents', {
    valid: [
      [
        {
          ...validDependent,
          childPlaceOfBirth: 'Washington, DC',
        },
      ],
    ],
    invalid: [
      [{ fullName: 1 }],
      [_.omit(validDependent, 'dateMarriageEnded')],
      [{ ..._.omit(validDependent, 'childHasNoSsnReason'), childHasNoSsn: true }],
    ],
  });

  schemaTestHelper.testValidAndInvalid('reportMarriageOfChild', {
    valid: [
      {
        marriedChildName: fixtures.fullName,
        dateChildMarried: fixtures.date,
      },
    ],
    invalid: [
      {
        marriedChildName: '',
        dateChildMarried: fixtures.date,
      },
    ],
  });

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

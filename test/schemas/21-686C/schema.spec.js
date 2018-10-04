import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';
import { expect } from 'chai';

const schema = schemas['21-686C'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-686C schema', () => {
  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal(['privacyAgreementAccepted']);
  });

  sharedTests.runTest('fullName', ['veteranFullName']);
  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber', 'spouseSocialSecurityNumber']);
  sharedTests.runTest('vaFileNumber', ['vaFileNumber', 'spouseVaFileNumber']);
  sharedTests.runTest('email', ['veteranEmail']);
  sharedTests.runTest('maritalStatus');
  sharedTests.runTest('date', ['spouseDateOfBirth']);
  sharedTests.runTest('marriages', ['marriages', 'spouseMarriages']);
  sharedTests.runTest('usaPhone', ['dayPhone', 'nightPhone']);

  const validDependent = {
    fullName: fixtures.fullName,
    childDateOfBirth: fixtures.date,
    childSocialSecurityNumber: fixtures.ssn,
    childRelationship: 'adopted',
    attendingCollege: true,
    disabled: true,
    married: true,
    previouslyMarried: true,
    childInHousehold: true,
    childAddress: Object.assign(fixtures.address, {addressType: 'DOMESTIC', state: 'TX', postalCode: '344546767'}),
    personWhoLivesWithChild: fixtures.fullName
  }

  schemaTestHelper.testValidAndInvalid('dependents', {
    valid: [
      [
        Object.assign({}, validDependent, {
          childPlaceOfBirth: {
            childCountryOfBirthDropdown: 'USA',
            childCityOfBirth: 'somewhere',
            childStateOfBirth: 'VA'
          }
        })
      ],
      [
        Object.assign({}, validDependent, {
          childPlaceOfBirth: {
            childCountryOfBirthDropdown: 'Country Not In List',
            childCountryOfBirthText: 'somewhere'
          }
        })
      ],
      [
        Object.assign({}, validDependent, {
          childPlaceOfBirth: {
            childCountryOfBirthDropdown: 'Canada'
          }
        })
      ]
    ],
    invalid: [
      [{ fullName: 1 }],
      [Object.assign({}, validDependent, {
        childPlaceOfBirth: {
          childCountryOfBirthDropdown: 'Canada',
          childCityOfBirth: 'somewhere',
          childStateOfBirth: 'VA'
        }
      })],
      [Object.assign({}, validDependent, {
        childPlaceOfBirth: {
          childCountryOfBirthDropdown: 'Country Not In List',
          childCityOfBirth: 'somewhere'
        }
      })]
    ]
  });

  schemaTestHelper.testValidAndInvalid('veteranAddress', {
    valid: [
      {
        addressType: 'DOMESTIC',
        street: '123 main st.',
        city: 'anywhere',
        country: 'USA',
        state: 'KY',
        postalCode: '55555'
      },
      {
        addressType: 'MILITARY',
        street: '123 main st.',
        city: 'anywhere',
        country: 'USA',
        postOffice: 'APO',
        postalType: 'AA',
        postalCode: '55555'
      },
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        country: 'Canada',
      },
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        country: 'Country Not In List',
        countryText: 'Independent Nation of Myself'
      },
    ],
    invalid: [
      // INTERNATIONAL with country of 'USA'
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        country: 'USA',
      },

      // INTERNATIONAL (Country Not In List) with state and postalCode
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        country: 'Country Not In List',
        state: 'KY',
        postalCode: '55555'
      },

      // INTERNATIONAL with state and postalCode
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        state: 'KY',
        country: 'Bangladesh'
      },

      // INTERNATIONAL with selected country (allowed) and countryText (not allowed)
      {
        addressType: 'INTERNATIONAL',
        street: '123 main st.',
        city: 'anywhere',
        country: 'Canada',
        countryText: 'Independent Nation of Myself'
      },

      // consecutive spaces present
      {
        addressType: 'DOMESTIC',
        street: '123 main st.',
        city: 'any  where',
        country: 'USA',
        state: 'KY',
        postalCode: '55555'
      }
    ]
  });
});

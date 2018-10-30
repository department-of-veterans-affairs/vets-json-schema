import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';
import { expect } from 'chai';

const schema = schemas['21-686C'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-686C schema', () => {
  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal([
      'privacyAgreementAccepted',
      'veteranFullName',
      'veteranAddress',
      'maritalStatus'
    ])
  });

  sharedTests.runTest('fullName', ['veteranFullName']);
  sharedTests.runTest('email', ['veteranEmail']);
  sharedTests.runTest('vaFileNumber', ['vaFileNumber']);
  sharedTests.runTest('ssn', ['veteranSocialSecurityNumber'])
  sharedTests.runTest('usaPhone', ['dayPhone', 'nightPhone'])

  const validDependent = {
    fullName: fixtures.fullName,
    childDateOfBirth: fixtures.date,
    childSocialSecurityNumber: fixtures.ssn,
    childRelationship: 'adopted',
    attendingCollege: true,
    disabled: true,
    marriedDate: fixtures.date,
    previouslyMarried: true,
    childInHousehold: true,
    childAddress: Object.assign(fixtures.address, {addressType: 'DOMESTIC', state: 'TX', postalCode: '344546767'}),
    childHasNoSsn: true,
    childHasNoSsnReason: 'NONRESIDENTALIEN',
    personWhoLivesWithChild: fixtures.fullName
  }

  schemaTestHelper.testValidAndInvalid('currentMarriage', {
    valid: [
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada'
        },
        spouseFullName: fixtures.fullName,
        spouseSocialSecurityNumber: fixtures.ssn,
        spouseVaFileNumber: 'C1234567'
      },
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada'
        },
        spouseFullName: fixtures.fullName,
        spouseHasNoSsn: true,
        spouseHasNoSsnReason: 'NONRESIDENTALIEN'
      }
    ],
    invalid: [
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada'
        },
        spouseFullName: fixtures.fullName
      },
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Country Not In List',
          countryText: 'My Island'
        },
        spouseFullname: fixtures.fullName,
        spouseSocialSecurityNumber: 'blah'
      },
      // invalid spouseVaFileNumber
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada'
        },
        spouseFullName: fixtures.fullName,
        spouseSocialSecurityNumber: fixtures.ssn,
        spouseVaFileNumber: 'C12345679999'
      },
      // invalid spouseDateOfBirth
      {
        dateOfMarriage: fixtures.date,
        locationOfMarriage: {
          countryDropdown: 'Canada'
        },
        spouseFullName: fixtures.fullName,
        spouseSocialSecurityNumber: fixtures.ssn,
        spouseDateOfBirth: 'in the past'
      },
    ]
  });

  schemaTestHelper.testValidAndInvalid('maritalStatus', {
    valid: ['MARRIED', 'DIVORCED', 'WIDOWED', 'SEPARATED', 'NEVERMARRIED'],
    invalid: ['Divorce']
  });
  
  schemaTestHelper.testValidAndInvalid('previousMarriages', {
    valid: [
      [
        {
          dateOfMarriage: fixtures.date,
          locationOfMarriage: {
            countryDropdown: 'Country Not In List',
            countryText: 'My Island'
          },
          spouseFullName: fixtures.fullName,
          reasonForSeparation: 'Divorce',
          dateOfSeparation: fixtures.date,
          locationOfSeparation: {
            countryDropdown: 'USA',
            city: 'somewhere',
            state: 'VA'
          }
        },
        {
          dateOfMarriage: fixtures.date,
          locationOfMarriage: {
            countryDropdown: 'Country Not In List',
            countryText: 'My Island'
          },
          spouseFullName: fixtures.fullName,
          reasonForSeparation: 'Other',
          explainSeparation: 'irreconcilable differences',
          dateOfSeparation: fixtures.date,
          locationOfSeparation: {
            countryDropdown: 'USA',
            city: 'somewhere',
            state: 'VA'
          }
        }
      ]
    ],
    invalid: [
      [
        {reasonForSeparation: 'fadsf'},
        // 'Other' without explanation
        {
          dateOfMarriage: fixtures.date,
          locationOfMarriage: {
            countryDropdown: 'Country Not In List',
            countryText: 'My Island'
          },
          spouseFullName: fixtures.fullName,
          reasonForSeparation: 'Other',
          dateOfSeparation: fixtures.date,
          locationOfSeparation: {
            countryDropdown: 'USA',
            city: 'somewhere',
            state: 'VA'
          }
        }
      ]
    ]
  });

  schemaTestHelper.testValidAndInvalid('dependents', {
    valid: [
      [
        Object.assign({}, validDependent, {
          childPlaceOfBirth: {
            countryDropdown: 'USA',
            city: 'somewhere',
            state: 'VA'
          }
        })
      ],
      [
        Object.assign({}, validDependent, {
          childPlaceOfBirth: {
            countryDropdown: 'Country Not In List',
            countryText: 'somewhere'
          }
        })
      ],
      [
        Object.assign({}, validDependent, {
          childPlaceOfBirth: {
            countryDropdown: 'Canada'
          }
        })
      ]
    ],
    invalid: [
      [{ fullName: 1 }],
      [_.omit(validDependent, 'marriedDate')],
      [_.omit(validDependent, 'childHasNoSsnReason')],
      [Object.assign({}, validDependent, {
        childPlaceOfBirth: {
          countryDropdown: 'Canada',
          city: 'somewhere',
          state: 'VA'
        }
      })],
      [Object.assign({}, validDependent, {
        childPlaceOfBirth: {
          countryDropdown: 'Country Not In List',
          city: 'somewhere'
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

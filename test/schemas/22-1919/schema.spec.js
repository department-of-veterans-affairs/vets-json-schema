import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep } from 'lodash';
import schema from '../../../src/schemas/22-1919/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaWithoutRequired = cloneDeep(schema);

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);

const testData = {
  certifyingOfficial: {
    valid: [
      {
        first: 'John',
        last: 'Doe',
        role: {
          level: 'Certifying Official'
        }
      }
    ],
    invalid: [
      {
        first: '',
        last: 'Doe',
        role: {
          level: 'Certifying Official'
        }
      },
      {
        first: 'John',
        last: '',
        role: {
          level: 'Certifying Official'
        }
      },
      {
        first: 'John',
        last: 'Doe',
        role: {
          level: 'Invalid Role'
        }
      }
    ]
  },
  institutionDetails: {
    valid: [
      {
        certifyingOfficial: {
          first: 'John',
          last: 'Doe',
          role: {
            level: 'Certifying Official'
          }
        },
        aboutYourInstitution: 'yes',
        facilityCode: '12345678',
        institutionName: 'Test Institution',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345'
        }
      }
    ],
    invalid: [
      {
        certifyingOfficial: {
          first: 'John',
          last: 'Doe',
          role: {
            level: 'Certifying Official'
          }
        },
        aboutYourInstitution: 'yes',
        facilityCode: '12345f6g',
        institutionName: 'Test Institution',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CAA',
          zip: '123456'
        }
      }
    ]
  },
  proprietaryProfitSchools: {
    valid: [
      {
        isProprietaryProfit: 'yes',
        hasConflictOfInterest: 'no',
        first: 'John',
        last: 'Doe',
        title: 'President',
        association: ['They are a VA employee who works with, receives services from, or receives compensation from our institution']
      }
    ],
    invalid: [
      {
        isProprietaryProfit: 'yes',
        hasConflictOfInterest: 'no',
        first: '',
        last: 'Doe',
        title: 'President',
        association: ['Invalid Association']
      }
    ]
  }
};

describe('1919 schema', () => {
  it('should have required fields', () => {
    expect(schema.properties.institutionDetails.required).to.deep.equal([
      'certifyingOfficial',
      'aboutYourInstitution',
      'facilityCode',
      'insitutionName',
      'address'
    ]);
    expect(schema.properties.institutionDetails.properties.certifyingOfficial.required).to.deep.equal([
      'first',
      'last',
      'role'
    ]);
    expect(schema.properties.proprietaryProfitSchools.items.required).to.deep.equal([
      'isProprietaryProfit',
      'first',
      'last',
      'title',
      'association'
    ]);
    schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
    schemaTestHelper.testValidAndInvalid('proprietaryProfitSchools', testData.proprietaryProfitSchools);
  });
}); 
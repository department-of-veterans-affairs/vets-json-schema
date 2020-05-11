import { expect } from 'chai';
import { cloneDeep } from 'lodash';
import { before, it } from 'mocha';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';
import SharedTests from '../../support/shared-tests';
import _ from 'lodash';

const schema = schemas['MDOT'];
const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

describe('mdot schema', () => {
  sharedTests.runTest('email');

  schemaTestHelper.testValidAndInvalid('supplies',{
    valid: [
      [
        {
          deviceName: 'OMEGA XD3241',
          productName: 'ZA1239',
          productGroup: 'hearing aid batteries',
          productId: '1',
          availableForReorder: false,
          lastOrderDate: '2020-01-01',
          nextAvailabilityDate: '2020-09-01',
          quantity: 60
        }
      ]
    ],
    invalid: [
      [
        {
          deviceName: 11112222,
          productName: 'ZA1239',
          productId: '1',
          availableForReorder: 1,
          lastOrderDate: '2020-01-01',
          nextAvailabilityDate: '2020-09-01',
          quantity: 'banana'
        }
      ]
    ]
  })

  schemaTestHelper.testValidAndInvalid('eligibility',{
    valid: [
      {
        batteries: true
      }
    ],
    invalid: [
      {
        batteries: 7
      }
    ]
  })

  it('should have the correct required properties', () => {
    expect(schema.required).to.deep.equal([
      'privacyAgreementAccepted',
      'fullName',
      'permanentAddress',
      'temporaryAddress',
      'gender',
      'email',
      'dateOfBirth',
      'supplies',
      'eligibility'
    ]);

    expect(schema.definitions.fullName.required).to.deep.equal(['first', 'last']);
  });

  it('should not accept additional properties', () => {
    expect(schema.additionalProperties).to.equal(false);
  });

  it('should pass shared common definition tests that need removal of required property on schema root', () => {
    const unrequiredSchema = cloneDeep(schema);
    delete unrequiredSchema.required;
    const unrequiredSchemaTestHelper = new SchemaTestHelper(unrequiredSchema);
    const unrestrictedSharedTests = new SharedTests(unrequiredSchemaTestHelper);

    const commonDefinitionAndPropertyNames = {
      fullName: ['fullName'],
      address: ['permanentAddress'],
      address: ['temporaryAddress'],
      gender: ['gender'],
      date: ['dateOfBirth']
    };

    for (const [commonDefinitionName, schemaPropertyName] of Object.entries(commonDefinitionAndPropertyNames)) {
      unrestrictedSharedTests.runTest(`${commonDefinitionName}`, schemaPropertyName);
    }
  });
});

import { expect } from 'chai';
import { cloneDeep } from 'lodash';
import { before, it } from 'mocha';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';
import SharedTests from '../../support/shared-tests';

describe('mdot schema', () => {
  let schema;
  before('schema set up', () => {
    schema = schemas.MDOT;
  });

  it('should have the correct required properties', () => {
    expect(schema.required).to.deep.equal([
      'privacyAgreementAccepted',
      'veteranFullName',
      'veteranAddress',
      'gender',
      'email',
      'dateOfBirth',
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
      fullName: ['veteranFullName'],
      address: ['veteranAddress'],
      gender: ['gender'],
      date: ['dateOfBirth'],
    };

    for (const [commonDefinitionName, schemaPropertyName] of Object.entries(commonDefinitionAndPropertyNames)) {
      unrestrictedSharedTests.runTest(`${commonDefinitionName}`, schemaPropertyName);
    }
  });
});

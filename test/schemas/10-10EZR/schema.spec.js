import { difference, omit } from 'lodash';
import { expect } from 'chai';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';

const applicationSchema = schemas['10-10EZR'];
const { definitions } = schemas;

const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));

function stringGenerate(length) {
  return new Array(length + 1).join('a');
}

describe('ezr json schema', () => {
  it('should have TERA fields', () => {
    const teraKeys = Object.keys(definitions.teraQuestions);
    const schemaKeys = Object.keys(applicationSchema.properties);
    expect(difference(teraKeys, schemaKeys).length).to.equal(0);
  });

  schemaTestHelper.testValidAndInvalid('medicareClaimNumber', {
    valid: [stringGenerate(30)],
    invalid: [null, '', '     '],
  });
});

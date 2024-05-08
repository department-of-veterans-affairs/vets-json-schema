import { omit } from 'lodash';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';
import { definitions } from '../../../dist/schemas';
import { expect } from 'chai';
import { difference } from 'lodash';

const applicationSchema = schemas['10-10EZR'];

const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));

function stringGenerate(length) {
  return new Array(length + 1).join('a');
}

describe('ezr json schema', () => {
  it('has tera fields', () => {
    expect(
      difference(Object.keys(definitions.teraQuestions), Object.keys(applicationSchema.properties)).length
    ).to.equal(0);
  });

  schemaTestHelper.testValidAndInvalid('medicareClaimNumber', {
    valid: [
      stringGenerate(30),
    ],
    invalid: [null, '', '     '],
  });
});

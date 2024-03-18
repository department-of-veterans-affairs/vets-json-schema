import { omit } from 'lodash';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';
import { definitions } from '../../../dist/schemas';
import { expect } from 'chai';
import { difference } from 'lodash';

const applicationSchema = schemas['10-10EZR'];

const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));

describe('ezr json schema', () => {
  it('has tera fields', () => {
    expect(
      difference(Object.keys(definitions.teraQuestions), Object.keys(applicationSchema.properties)).length
    ).to.equal(0);
  });
});

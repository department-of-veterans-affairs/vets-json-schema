import { omit } from 'lodash';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';

const applicationSchema = schemas['10-10EZR'];

const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));

describe('ezr json schema', () => {
  schemaTestHelper.testValidAndInvalid('otherToxicExposure', {
    valid: [
      'foo',
      'foo bar',
      'Foo123'
    ],
    invalid: [
      '$'
    ],
  });
});

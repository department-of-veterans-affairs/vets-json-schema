import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['0873'];

const schemaDefaults = {
  privacyAgreementAccepted: true,
  fullName: {
    first: 'bob',
    last: 'smith',
  },
  preferredContactMethod: 'email',
};

const schemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'), schemaDefaults);
const sharedTests = new SharedTests(schemaTestHelper);

describe('IRIS Ask a Question json schema', () => {
  [
    ['fullName', ['fullName']],
    ['preferredContactMethod'],
    ['email'],
    ['phone', ['phone']],
    ['address', ['address']],
  ].forEach(test => {
    sharedTests.runTest(...test);
  });

  schemaTestHelper.testValidAndInvalid('topic', {
    valid: ['Policy Question'],
    invalid: ['foo'],
  });

  schemaTestHelper.testValidAndInvalid('inquiryType', {
    valid: ['Question'],
    invalid: ['foo'],
  });

  schemaTestHelper.testValidAndInvalid('query', {
    valid: ['Some query'],
    invalid: [3],
  });
});

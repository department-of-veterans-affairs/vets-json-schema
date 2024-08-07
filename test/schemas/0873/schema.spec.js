import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['0873'];

const schemaDefaults = {
  privacyAgreementAccepted: true,
  topic: {
    levelOne: 'Caregiver Support Program',
    levelTwo: 'VA Supportive Services',
  },
  inquiryType: 'Question',
  query: 'How do I apply for caregiver assistance?',
  personalInformation: {
    first: 'bob',
    last: 'smith',
    preferredName: 'Bobby',
    middle: 'A',
    socialSecurityNumber: '123456789',
    serviceNumber: '123456'
  },
  contactInformation: {
    email: 'bob.smith@example.com',
    phone: '1234567890',
    address: {
      country: 'Anytown',
      state: 'VA',
      postalCode: '12345'
    }
  },
  preferredContactMethod: 'email',
  veteranStatus: {
    veteranStatus: 'general',
  },
};

const schemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'), schemaDefaults);
const sharedTests = new SharedTests(schemaTestHelper);

describe('IRIS Ask a Question json schema', () => {
  [
    ['personalInformation', ['personalInformation']],
    ['preferredContactMethod'],
    ['contactInformation', ['contactInformation']]
  ].forEach(test => {
    sharedTests.runTest(...test);
  });

  schemaTestHelper.testValidAndInvalid('topic', {
    valid: [{ levelOne: 'Caregiver Support Program', levelTwo: 'VA Supportive Services' }],
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

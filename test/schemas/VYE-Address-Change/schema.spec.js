import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
// import SharedTests from '../../support/shared-tests';

const schema = schemas['VYE-ADDRESS-CHANGE'];

const schemaTestHelper = new SchemaTestHelper(schema,{
  veteranName:'John T. Doe',
  address1:'123 Test address',
  address2:'123 Test address',
  address3:'123 Test address',
  address4:'123 Test address',
  city:'Norman',
  state:'OK',
  zipCode:'12345'
});

// const sharedTests = new SharedTests(schemaTestHelper)

describe('VYE address change', () => {

  schemaTestHelper.testValidAndInvalid('veteranName', {
    valid: ['John T. Doe'],
    invalid: [123],
  });

  schemaTestHelper.testValidAndInvalid('address1', {
    valid: ['123 Test address'],
    invalid: ['123 Test address APT 2011'],
  });

  schemaTestHelper.testValidAndInvalid('address2', {
    valid: ['123 Test address'],
    invalid: ['123 Test address APT 2011'],
  });

  schemaTestHelper.testValidAndInvalid('address3', {
    valid: ['123 Test address'],
    invalid: ['123 Test address APT 2011'],
  });

  schemaTestHelper.testValidAndInvalid('address4', {
    valid: ['123 Test address'],
    invalid: ['123 Test address APT 2011'],
  });

  schemaTestHelper.testValidAndInvalid('city', {
    valid: ['Norman'],
    invalid: [123],
  });

  schemaTestHelper.testValidAndInvalid('state', {
    valid: ['OK'],
    invalid: [123],
  });

  schemaTestHelper.testValidAndInvalid('state', {
    valid: ['TX'],
    invalid: ['ZQ'],
  });


  schemaTestHelper.testValidAndInvalid('zipCode', {
    valid: ['12345'],
    invalid: ['123'],
  });
});

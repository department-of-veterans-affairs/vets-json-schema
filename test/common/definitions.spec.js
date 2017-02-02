import SchemaTestHelper from '../support/schema-test-helper';
import { definitions } from '../../dist/schemas';
import fixtures from '../support/fixtures';

describe('schema definitions', () => {
  const testValidAndInvalidDefinitions = (definitionName, fields) => {
    let schemaTestHelper = new SchemaTestHelper(
      {
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        definitions: definitions,
        properties: {
          [definitionName]: definitions[definitionName]
        }
      }
    );

    schemaTestHelper.testValidAndInvalid(definitionName, fields);
  };

  testValidAndInvalidDefinitions('fullName', {
    valid: [{
      first: 'john',
      last: 'doe'
    }],
    invalid: [{
      first: 'john'
    }]
  });

  testValidAndInvalidDefinitions('address', {
    valid: [
      fixtures.address,
      {
        street: '123 a rd',
        city: 'abc',
        state: 'VA',
        country: 'USA'
      }
    ],
    invalid: [
      {
        city: 'foo',
        country: 'USA'
      },
      {
        street: '123 a rd',
        city: 'abc',
        state: 'foo',
        country: 'USA'
      }
    ]
  });

  testValidAndInvalidDefinitions('phone', {
    valid: ['5555555555', '555-555-5555', '555 555 5555'],
    invalid: ['1234']
  });

  testValidAndInvalidDefinitions('ssn', {
    valid: ['123456789'],
    invalid: ['123-45-6789', '12345678']
  });

  testValidAndInvalidDefinitions('school', {
    valid: [{
      name: 'foo',
      address: fixtures.address
    }],
    invalid: [{
      name: true
    }]
  });

  testValidAndInvalidDefinitions('bankAccount', {
    valid: [
      {
        accountType: 'checking',
        routingNumber: '123456789',
        accountNumber: '1234'
      }
    ],
    invalid: [
      {
        accountType: 'foo',
        routingNumber: '123456789',
        accountNumber: '1234'
      }
    ]
  });

  testValidAndInvalidDefinitions('serviceBefore1977', {
    valid: [{
      married: true,
      haveDependents: true,
      parentDependent: false
    }],
    invalid: [{
      married: true
    }]
  });

  testValidAndInvalidDefinitions('dateRange', {
    valid: [
      fixtures.dateRange,
      {
        from: '2000-01-01',
        to: 'present'
      },
      {
        from: '2000-01-01'
      }
    ],
    invalid: [
      {
        from: 'foo',
        to: 'bar'
      },
      {
        from: '2000-01-01',
        to: 'future'
      }
    ]
  });

  testValidAndInvalidDefinitions('date', {
    valid: [
      '2000-01-02',
      '2000-01-31',
      '2000-11-02',
      '2000-11-25',
      'XXXX-11-25',
      'XXXX-XX-25',
      '2001-11-XX',
      '2001-XX-01'
    ],
    invalid: [
      '4/6/1998',
      'Fri Aug 19 2016 15:09:46 GMT-0400 (EDT)',
      '2000-1-02',
      '2000-13-01',
      '2000-12-32',
      '2000-12-00',
      '2000-00-01',
      '2000-01-9'
    ]
  });

  testValidAndInvalidDefinitions('educationType', {
    valid: ['college', 'correspondence'],
    invalid: ['foo']
  });
});

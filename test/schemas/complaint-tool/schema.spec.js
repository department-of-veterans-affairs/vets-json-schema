import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['complaint-tool'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('complaint tool schema', () => {
  [
    'email',
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('date', ['dob']);
  sharedTests.runTest('usaPhone', ['phone']);
  sharedTests.runTest('dateRange', ['serviceDateRange']);
  schemaTestHelper.testValidAndInvalid('fullName', {
    valid: [_.merge({}, fixtures.fullName, {
      prefix: 'Mr.'
    })],
    invalid: [[false]]
  });

  // test postalCode
  schemaTestHelper.testValidAndInvalid('postalCode', {
    valid: ['12345'],
    invalid: ['1234']
  });  
  
  // test address
  schemaTestHelper.testValidAndInvalid('address', {
    valid: [
      '123 Forest Road'
    ],
    invalid: [
      true
    ]
  });
  
  // test address2
  schemaTestHelper.testValidAndInvalid('address2', {
    valid: [
      '123 Forest Road'
    ],
    invalid: [
      true
    ]
  });

  // test city
  schemaTestHelper.testValidAndInvalid('city', {
    valid: [
      'Springfield'
    ],
    invalid: [
      true
    ]
  });
    
  // test state
  schemaTestHelper.testValidAndInvalid('state', {
    valid: [
      'CA'
    ],
    invalid: [
      'California'
    ]
  });

  // test country
  schemaTestHelper.testValidAndInvalid('country', {
    valid: [ 'US' ],
    invalid: [ 'USA' ]
  });

  // test onBehalfOf
  schemaTestHelper.testValidAndInvalid('onBehalfOf', {
    valid: [
      'Myself'
    ],
    invalid: [
      'No one'
    ]
  });

  // test serviceBranch
  schemaTestHelper.testValidAndInvalid('serviceBranch', {
    valid: [
      'Army'
    ],
    invalid: [
      3
    ]
  });

  // test serviceAffiliation
  schemaTestHelper.testValidAndInvalid('serviceAffiliation', {
    valid: [
      'Veteran'
    ],
    invalid: [
      'Neighbor'
    ]
  });

  // test issue
  schemaTestHelper.testValidAndInvalid('issue', {
    valid: [{
      'Recruiting/Marketing Practices': true
    }],
    invalid: [{
      'Recruiting/Marketing Practices': 3
    }]
  });

  // test issue description
  schemaTestHelper.testValidAndInvalid('issueDescription', {
    valid: [
      'Veteran'
    ],
    invalid: [
      false
    ]
  });

  // test issue resolution
  schemaTestHelper.testValidAndInvalid('issueResolution', {
    valid: [
      'Veteran'
    ],
    invalid: [
      false
    ]
  });

  // test education details
  schemaTestHelper.testValidAndInvalid('educationDetails', {
    valid: [{
      school: {
        address: '123 a rd',
        city: 'abc',
        state: 'Missouri',
        postalCode: '12345',
        country: 'US',
        name: 'Veteran school name',
      },
      programs: {
        'MGIB-AD Ch 30': true
      },
      assistance: {
        TA: true
      }
    }],
    invalid: [{
      school: {
        address: '123 a rd',
        city: 'abc',
        postalCode: '12345 1245',
        country: 'USA',
        name: 324,
      },
      // programs: {
      //   'MGIB-AD Ch 30': 'orange'
      // },
      assistance: {
        TA: 3
      }
    }]
  });
});

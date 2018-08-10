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
  sharedTests.runTest('email', ['anonymousEmail', 'applicantEmail']);
  sharedTests.runTest('usaPhone', ['phone']);
  sharedTests.runTest('dateRange', ['serviceDateRange']);

  schemaTestHelper.testValidAndInvalid('address', {
    valid: [_.merge({}, fixtures.address, {
      country: 'US',
      state: 'CA',
      postalCode: '23423'
    })],
    invalid: [[false]]
  });

  schemaTestHelper.testValidAndInvalid('fullName', {
    valid: [_.merge({}, fixtures.fullName, {
      prefix: 'Mr.'
    })],
    invalid: [[false]]
  });

  schemaTestHelper.testValidAndInvalid('onBehalfOf', {
    valid: [
      'Myself'
    ],
    invalid: [
      'No one'
    ]
  });

  schemaTestHelper.testValidAndInvalid('serviceBranch', {
    valid: [
      'Army'
    ],
    invalid: [
      3
    ]
  });

  schemaTestHelper.testValidAndInvalid('serviceAffiliation', {
    valid: [
      'Veteran'
    ],
    invalid: [
      'Neighbor'
    ]
  });

  schemaTestHelper.testValidAndInvalid('issue', {
    valid: [{
      'recruiting': true
    }],
    invalid: [{
      'recruiting': 3
    }]
  });

  schemaTestHelper.testValidAndInvalid('issueDescription', {
    valid: [
      'Veteran'
    ],
    invalid: [
      false
    ]
  });

  schemaTestHelper.testValidAndInvalid('issueResolution', {
    valid: [
      'Veteran'
    ],
    invalid: [
      false
    ]
  });

  schemaTestHelper.testValidAndInvalid('educationDetails', {
    valid: [{
      school: {
        address: {
          street: '123 a rd',
          city: 'abc',
          country: 'GBR'
        },
        name: 'Veteran school name'
      },
      programs: {
        'MGIB-AD Ch 30': true
      },
      assistance: {
        TA: true
      }
    },
      {
     school: {
       facilityCode: '343434',
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
        address: {
          street: '123 a rd',
          city: 'abc',
          postalCode: '12345 1245',
          country: 'United States'
        },
        name: 324,
        facilityCode: '343343'
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

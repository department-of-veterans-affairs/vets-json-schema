import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['FEEDBACK-TOOL'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('feedback tool schema', () => {
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
    valid: [
      // valid international
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            country: 'United Kingdom'
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
      // `assistance` is optional
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            country: 'United Kingdom'
          },
          name: 'Veteran school name'
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
      // valid domestic
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            state: 'CA',
            postalCode: '12345',
            country: 'United States'
          },
          name: 'Veteran school name'
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
      // valid search tool address
      {
        school: {
          address: {
            street: '254 PHAYATHAI ROAD',
            street2: 'ENGINEERING BLDG 2',
            street3: 'ROOM 107    10330',
            city: 'BANGKOK',
            country: 'ANY OLD COUNTRY WILL DO!'
          },
          name: 'CHULALONGKORN-ENGINEERING'
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
    ],
    invalid: [
      // missing the required `programs`
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            state: 'CA',
            postalCode: '12345',
            country: 'United States'
          },
          name: 'Yale',
        },
      },
      // invalid postal code - too long
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            state: 'CA',
            postalCode: '12345 1234',
            country: 'United States'
          },
          name: 'Yale',
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
      // invalid postal code - not numbers
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            state: 'CA',
            postalCode: 'abcde',
            country: 'United States'
          },
          name: 'Yale',
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
      // missing postalCode
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            state: 'CA',
            country: 'United States'
          },
          name: 'Yale',
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
      // missing state
      {
        school: {
          address: {
            street: '123 a rd',
            city: 'abc',
            postalCode: '12345',
            country: 'United States'
          },
          name: 'Yale',
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
      // invalid search tool address - missing city
      {
        school: {
          address: {
            street: '254 PHAYATHAI ROAD',
            street2: 'ENGINEERING BLDG 2, ROOM 107    10330',
            country: 'ANY OLD COUNTRY WILL DO!'
          },
          name: 'CHULALONGKORN-ENGINEERING'
        },
        programs: {
          'MGIB-AD Ch 30': true
        }
      },
    ]
  });
});

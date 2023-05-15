import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['22-5490'];

const schemaDefaults = {
  privacyAgreementAccepted: true,
  relativeFullName: {
    first: 'a',
    last: 'b'
  }
};

// remove the anyOf required fields so that tests for other fields can run without filling them in
// tests for the specific anyOf fields should not use this liteSchema
let liteSchema = _.cloneDeep(schema);
delete liteSchema.anyOf;
delete liteSchema.properties.previousBenefits.anyOf;

let schemaTestHelper = new SchemaTestHelper(liteSchema, schemaDefaults);
let sharedTests = new SharedTests(schemaTestHelper);

describe('dependents benefits schema', () => {
  [
    'gender',
    'phone',
    'email',
    'bankAccount',
    'nonMilitaryJobs',
    'preferredContactMethod'
  ].forEach((test) => {
    sharedTests.runTest(test);
  });

  sharedTests.runTest('fullName', ['relativeFullName', 'veteranFullName', 'previousBenefits.veteranFullName']);

  sharedTests.runTest('ssn', ['relativeSocialSecurityNumber', 'veteranSocialSecurityNumber', 'previousBenefits.veteranSocialSecurityNumber']);

  sharedTests.runTest('vaFileNumber', ['vaFileNumber', 'previousBenefits.vaFileNumber']);

  sharedTests.runTest('date', ['relativeDateOfBirth', 'veteranDateOfBirth', 'veteranDateOfDeath',]);

  sharedTests.runTest('address', ['relativeAddress',]);

  schemaTestHelper.testValidAndInvalid('spouseInfo', {
    valid: [{
      divorcePending: true,
      remarried: true,
      remarriageDate: fixtures.date
    }],
    invalid: [{
      divorcePending: 1
    }]
  });

  schemaTestHelper.testValidAndInvalid('benefit', {
    valid: ['chapter35'],
    invalid: ['chapter32']
  });

  describe('previousBenefits tests', () => {
    let pbSchemaTestHelper = new SchemaTestHelper(_.omit(schema, 'anyOf'), schemaDefaults);
    const previousBenefitsFixture = {
      disability: true,
      ownServiceBenefits: 'chapter32',
      transferOfEntitlement: true
    };

    pbSchemaTestHelper.testValidAndInvalid('previousBenefits', {
      valid: [
        Object.assign(
          { vaFileNumber: '12345678' },
          previousBenefitsFixture
        ),
        Object.assign(
          { veteranSocialSecurityNumber: '123456789' },
          previousBenefitsFixture
        ),
        previousBenefitsFixture
      ],
      invalid: [
        {
          disability: 1
        }
      ]
    });
  });

  schemaTestHelper.testValidAndInvalid('toursOfDuty', {
    valid: [[{
      dateRange: fixtures.dateRange,
      serviceBranch: 'Army',
      serviceStatus: 'Honorable',
      applyPeriodToSelected: true
    }]],
    invalid: [[{
      dateRange: 'foo'
    }]]
  });
});

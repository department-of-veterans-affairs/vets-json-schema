import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep } from 'lodash';
import schema from '../../../src/schemas/22-10282/schema';
import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaWithoutRequired = cloneDeep(schema);
delete schemaWithoutRequired.required;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

const testData = {
  veteranFullName: {
    valid: {
      first: 'John',
      last: 'Doe'
    },
  },
  veteranDesc: {
    valid: [
      'veteran',
    ],
    invalid: [
      'Veteran',
    ]
  },
  boolean: {
    valid: [true, false],
    invalid: ['false', null, 'Yes', 'No'],
  },
  contactInfo: {
    valid: [
      { email: 'john.doe@gmail.com' }
    ],
    invalid: [
      { homePhone: '123333444' },
      { email: 'john.doe@gmail.com', homePhone: 1233334444 }
    ]
  },
  country: {
    valid: ['United States'],
    invalid: ['US','Virginia']
  },
  state: {
    valid: ['VA', 'MD'],
    invalid: ['US', 'Virginia']
  },
  ethnicity: {
    valid: ['HL', 'NHL', 'NA'],
    invalid: ['Prefer not to answer']
  },
  originRace: {
    valid: [{ isAmericanIndianOrAlaskanNative: true }],
    invalid: ['isAmericanIndianOrAlaskanNative', 'Prefer not to answer', { isAmericanIndianOrAlaskanNative: null } ],
  },
  gender: {
    valid: ["W", "M", "TW", "TM", "NB", "0", "NA"],
    invalid: ['Woman', 'Prefer not to answer']
  },
  highestLevelOfEducation: {
    valid: [{ level: 'HS' }, { otherEducation: 'Code Bootcamp' } ],
    invalid: [{ otherEducation: 'Some long description describing other education' }, { level: 'High School' }]
  },
  currentAnnualSalary: {
    valid: ['lessThanTwenty', 'twentyToThirtyFive', 'thirtyFiveToFifty', 'fiftyToSeventyFive', 'moreThanSeventyFive'],
    invalid: ['< 20,000']
  },
  techIndustryFocusArea: {
    valid: ['CP', 'CS', 'DP', 'IS', 'MA', 'NA'],
    invalid: ['Computer Science']
  }
};

describe('10282 schema', () => {
  it('should have required fields', () => {
    expect(schema.required).to.deep.equal(['veteranFullName', 'veteranDesc', 'contactInfo', 'country']);
  });
  sharedTests.runTest('fullNameNoSuffix', ['veteranFullName']);
  schemaTestHelper.testValidAndInvalid('veteranDesc', testData.veteranDesc);
  schemaTestHelper.testValidAndInvalid('contactInfo', testData.contactInfo);
  schemaTestHelper.testValidAndInvalid('country', testData.country);
  schemaTestHelper.testValidAndInvalid('state', testData.state);
  schemaTestHelper.testValidAndInvalid('raceAndGender', testData.boolean);
  schemaTestHelper.testValidAndInvalid('ethnicity', testData.ethnicity);
  schemaTestHelper.testValidAndInvalid('originRace', testData.originRace);
  schemaTestHelper.testValidAndInvalid('gender', testData.gender);
  schemaTestHelper.testValidAndInvalid('highestLevelOfEducation', testData.highestLevelOfEducation);
  schemaTestHelper.testValidAndInvalid('currentlyEmployed', testData.boolean);
  schemaTestHelper.testValidAndInvalid('currentAnnualSalary', testData.currentAnnualSalary);
  schemaTestHelper.testValidAndInvalid('isWorkingInTechIndustry', testData.boolean);
  schemaTestHelper.testValidAndInvalid('techIndustryFocusArea', testData.techIndustryFocusArea);
});


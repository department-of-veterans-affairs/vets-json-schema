import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
// import fixtures from '../../support/fixtures';

import SharedTests from '../../support/shared-tests';

const schema = schemas['COVID-VACCINE-TRIAL'];
const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

describe('covid vaccine trial schema', () => {
  sharedTests.runTest('email');
  sharedTests.runTest('fullName');
  sharedTests.runTest('date');

  schemaTestHelper.testValidAndInvalid('residentsInHome', {
    valid: ['ONE_TWO', 'THREE_FIVE', 'SIX_TEN', 'MORE_THAN_TEN'],
    invalid: ['INVALID'],
  });
  schemaTestHelper.testValidAndInvalid('healthHistory', {
    valid: [
      { ALLERGY_VACCINE: true },
      { AUTOIMMUNE_DISEASE: true },
      { CANCER: true },
      { DIABETES: true },
      { HEART_DISEASE: true },
      { HIGH_BLOOD_PRESSURE: true },
      { IMMUNOCOMPROMISED: true },
      { KIDNEY_LIVER_DISEASE: true },
      { LUNG_DISEASE: true },
      { STROKE: true },
      { ANOTHER_SERIOUS_CHRONIC_ILLNESS: true },
      { ALLERGY_VACCINE: false },
      { AUTOIMMUNE_DISEASE: false },
      { CANCER: false },
      { DIABETES: false },
      { HEART_DISEASE: false },
      { HIGH_BLOOD_PRESSURE: false },
      { IMMUNOCOMPROMISED: false },
      { KIDNEY_LIVER_DISEASE: false },
      { LUNG_DISEASE: false },
      { STROKE: false },
      { ANOTHER_SERIOUS_CHRONIC_ILLNESS: false },
    ],
    invalid: [
      { ALLERGY_VACCINE: 'invalid' },
      { AUTOIMMUNE_DISEASE: 'invalid' },
      { CANCER: 'invalid' },
      { DIABETES: 'invalid' },
      { HEART_DISEASE: 'invalid' },
      { HIGH_BLOOD_PRESSURE: 'invalid' },
      { IMMUNOCOMPROMISED: 'invalid' },
      { KIDNEY_LIVER_DISEASE: 'invalid' },
      { LUNG_DISEASE: 'invalid' },
      { STROKE: 'invalid' },
      { ANOTHER_SERIOUS_CHRONIC_ILLNESS: 'invalid' },
    ],
  });
  schemaTestHelper.testValidAndInvalid('diagnosed', {
    valid: [true, false],
    invalid: ['INVALID'],
  });
  schemaTestHelper.testValidAndInvalid('closeContactPositive', {
    valid: ['YES', 'NO', 'UNSURE'],
    invalid: ['INVALID'],
  });
  schemaTestHelper.testValidAndInvalid('hospitalized', {
    valid: [true, false],
    invalid: ['INVALID'],
  });
  schemaTestHelper.testValidAndInvalid('smokeOrVape', {
    valid: [true, false],
    invalid: ['INVALID'],
  });
  schemaTestHelper.testValidAndInvalid('employmentStatus', {
    valid: [
      { EMPLOYED_HOME: true },
      { EMPLOYED_OUTSIDE_OF_HOME: true },
      { FRONTLINE_WORKER: true },
      { FURLOUGHED_UNEMPLOYED: true },
      { RETIRED: true },
      { STUDENT: true },
      { NONE_OF_ABOVE: true },
      { EMPLOYED_HOME: false },
      { EMPLOYED_OUTSIDE_OF_HOME: false },
      { FRONTLINE_WORKER: false },
      { FURLOUGHED_UNEMPLOYED: false },
      { RETIRED: false },
      { STUDENT: false },
      { NONE_OF_ABOVE: false },
    ],
    invalid: [
      { EMPLOYED_HOME: 'invalid' },
      { EMPLOYED_OUTSIDE_OF_HOME: 'invalid' },
      { FRONTLINE_WORKER: 'invalid' },
      { FURLOUGHED_UNEMPLOYED: 'invalid' },
      { RETIRED: 'invalid' },
      { STUDENT: 'invalid' },
      { NONE_OF_ABOVE: 'invalid' },
    ],
  });

  schemaTestHelper.testValidAndInvalid('transportation', {
    valid: [
      { CAR: true },
      { FREQUENT_AIR_TRAVEL: true },
      { PUBLIC_TRANSPORT: true },
      { WALK_BIKE: true },
      { WORK_FROM_HOME: true },
      { NONE_OF_ABOVE: true },
      { CAR: false },
      { FREQUENT_AIR_TRAVEL: false },
      { PUBLIC_TRANSPORT: false },
      { WALK_BIKE: false },
      { WORK_FROM_HOME: false },
      { NONE_OF_ABOVE: false },
    ],
    invalid: [
      { CAR: 'invalid' },
      { FREQUENT_AIR_TRAVEL: 'invalid' },
      { PUBLIC_TRANSPORT: 'invalid' },
      { WALK_BIKE: 'invalid' },
      { WORK_FROM_HOME: 'invalid' },
      { NONE_OF_ABOVE: 'invalid' },
    ],
  });
  schemaTestHelper.testValidAndInvalid('closeContact', {
    valid: ['ZERO', 'ONE_TEN', 'ELEVEN_THIRTY', 'THIRTYONE_FIFTY', 'MORE_THAN_FIFTY'],
    invalid: ['INVALID'],
  });
  schemaTestHelper.testValidAndInvalid('zipCode', {
    valid: ['12345', '12345-6789'],
    invalid: ['INVALID', '123456789', '12345678910'],
  });
  schemaTestHelper.testValidAndInvalid('gender', {
    valid: [
      { FEMALE: true },
      { MALE: true },
      { TRANSGENDER_FEMALE: true },
      { TRANSGENDER_MALE: true },
      { GENDER_VARIANT: true },
      { SELF_IDENTIFY: true },
      { NONE_OF_ABOVE: true },
      { FEMALE: false },
      { MALE: false },
      { TRANSGENDER_FEMALE: false },
      { TRANSGENDER_MALE: false },
      { GENDER_VARIANT: false },
      { SELF_IDENTIFY: false },
      { NONE_OF_ABOVE: false },
    ],
    invalid: [
      { FEMALE: 'invalid' },
      { MALE: 'invalid' },
      { TRANSGENDER_FEMALE: 'invalid' },
      { TRANSGENDER_MALE: 'invalid' },
      { GENDER_VARIANT: 'invalid' },
      { SELF_IDENTIFY: 'invalid' },
      { NONE_OF_ABOVE: 'invalid' },
    ],
  });
  schemaTestHelper.testValidAndInvalid('raceEthnicityOrigin', {
    valid: [
      { AMERICAN_INDIAN_ALASKA_NATIVE: true },
      { ASIAN: true },
      { BLACK_AFRICAN_AMERICAN: true },
      { HISPANIC_LATINO_SPANISH_ORIGIN: true },
      { HAWAIIAN_PACIFIC_ISLANDER: true },
      { WHITE: true },
      { OTHER_RACE_ETHNICITY: true },
      { NONE_OF_ABOVE: true },
      { AMERICAN_INDIAN_ALASKA_NATIVE: false },
      { ASIAN: false },
      { BLACK_AFRICAN_AMERICAN: false },
      { HISPANIC_LATINO_SPANISH_ORIGIN: false },
      { HAWAIIAN_PACIFIC_ISLANDER: false },
      { WHITE: false },
      { OTHER_RACE_ETHNICITY: false },
      { NONE_OF_ABOVE: false },
    ],
    invalid: [
      { AMERICAN_INDIAN_ALASKA_NATIVE: 'invalid' },
      { ASIAN: 'invalid' },
      { BLACK_AFRICAN_AMERICAN: 'invalid' },
      { HISPANIC_LATINO_SPANISH_ORIGIN: 'invalid' },
      { HAWAIIAN_PACIFIC_ISLANDER: 'invalid' },
      { WHITE: 'invalid' },
      { OTHER_RACE_ETHNICITY: 'invalid' },
      { NONE_OF_ABOVE: 'invalid' },
    ],
  });
  schemaTestHelper.testValidAndInvalid('weight', {
    valid: ['90', '90.5', '100', '100.25', '12345.6'],
    invalid: ['INVALID', '1234.56789', '0', '099'],
  });
});

import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
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
  schemaTestHelper.testValidAndInvalid('HEALTH_HISTORY', {
    valid: [
      { 'HEALTH_HISTORY::ALLERGY_VACCINE': true },
      { 'HEALTH_HISTORY::AUTOIMMUNE_DISEASE': true },
      { 'HEALTH_HISTORY::CANCER': true },
      { 'HEALTH_HISTORY::DIABETES': true },
      { 'HEALTH_HISTORY::HEART_DISEASE': true },
      { 'HEALTH_HISTORY::HIGH_BLOOD_PRESSURE': true },
      { 'HEALTH_HISTORY::IMMUNOCOMPROMISED': true },
      { 'HEALTH_HISTORY::KIDNEY_LIVER_DISEASE': true },
      { 'HEALTH_HISTORY::LUNG_DISEASE': true },
      { 'HEALTH_HISTORY::STROKE': true },
      { 'HEALTH_HISTORY::ANOTHER_SERIOUS_CHRONIC_ILLNESS': true },
      { 'HEALTH_HISTORY::ALLERGY_VACCINE': false },
      { 'HEALTH_HISTORY::AUTOIMMUNE_DISEASE': false },
      { 'HEALTH_HISTORY::CANCER': false },
      { 'HEALTH_HISTORY::DIABETES': false },
      { 'HEALTH_HISTORY::HEART_DISEASE': false },
      { 'HEALTH_HISTORY::HIGH_BLOOD_PRESSURE': false },
      { 'HEALTH_HISTORY::IMMUNOCOMPROMISED': false },
      { 'HEALTH_HISTORY::KIDNEY_LIVER_DISEASE': false },
      { 'HEALTH_HISTORY::LUNG_DISEASE': false },
      { 'HEALTH_HISTORY::STROKE': false },
      { 'HEALTH_HISTORY::ANOTHER_SERIOUS_CHRONIC_ILLNESS': false },
    ],
    invalid: [
      { 'HEALTH_HISTORY::ALLERGY_VACCINE': 'invalid' },
      { 'HEALTH_HISTORY::AUTOIMMUNE_DISEASE': 'invalid' },
      { 'HEALTH_HISTORY::CANCER': 'invalid' },
      { 'HEALTH_HISTORY::DIABETES': 'invalid' },
      { 'HEALTH_HISTORY::HEART_DISEASE': 'invalid' },
      { 'HEALTH_HISTORY::HIGH_BLOOD_PRESSURE': 'invalid' },
      { 'HEALTH_HISTORY::IMMUNOCOMPROMISED': 'invalid' },
      { 'HEALTH_HISTORY::KIDNEY_LIVER_DISEASE': 'invalid' },
      { 'HEALTH_HISTORY::LUNG_DISEASE': 'invalid' },
      { 'HEALTH_HISTORY::STROKE': 'invalid' },
      { 'HEALTH_HISTORY::ANOTHER_SERIOUS_CHRONIC_ILLNESS': 'invalid' },
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
  schemaTestHelper.testValidAndInvalid('EMPLOYMENT_STATUS', {
    valid: [
      { 'EMPLOYMENT_STATUS::EMPLOYED_HOME': true },
      { 'EMPLOYMENT_STATUS::EMPLOYED_OUTSIDE_OF_HOME': true },
      { 'EMPLOYMENT_STATUS::FRONTLINE_WORKER': true },
      { 'EMPLOYMENT_STATUS::FURLOUGHED_UNEMPLOYED': true },
      { 'EMPLOYMENT_STATUS::RETIRED': true },
      { 'EMPLOYMENT_STATUS::STUDENT': true },
      { 'EMPLOYMENT_STATUS::NONE_OF_ABOVE': true },
      { 'EMPLOYMENT_STATUS::EMPLOYED_HOME': false },
      { 'EMPLOYMENT_STATUS::EMPLOYED_OUTSIDE_OF_HOME': false },
      { 'EMPLOYMENT_STATUS::FRONTLINE_WORKER': false },
      { 'EMPLOYMENT_STATUS::FURLOUGHED_UNEMPLOYED': false },
      { 'EMPLOYMENT_STATUS::RETIRED': false },
      { 'EMPLOYMENT_STATUS::STUDENT': false },
      { 'EMPLOYMENT_STATUS::NONE_OF_ABOVE': false },
    ],
    invalid: [
      { 'EMPLOYMENT_STATUS::EMPLOYED_HOME': 'invalid' },
      { 'EMPLOYMENT_STATUS::EMPLOYED_OUTSIDE_OF_HOME': 'invalid' },
      { 'EMPLOYMENT_STATUS::FRONTLINE_WORKER': 'invalid' },
      { 'EMPLOYMENT_STATUS::FURLOUGHED_UNEMPLOYED': 'invalid' },
      { 'EMPLOYMENT_STATUS::RETIRED': 'invalid' },
      { 'EMPLOYMENT_STATUS::STUDENT': 'invalid' },
      { 'EMPLOYMENT_STATUS::NONE_OF_ABOVE': 'invalid' },
    ],
  });

  schemaTestHelper.testValidAndInvalid('TRANSPORTATION', {
    valid: [
      { 'TRANSPORTATION::CAR': true },
      { 'TRANSPORTATION::FREQUENT_AIR_TRAVEL': true },
      { 'TRANSPORTATION::PUBLIC_TRANSPORT': true },
      { 'TRANSPORTATION::WALK_BIKE': true },
      { 'TRANSPORTATION::WORK_FROM_HOME': true },
      { 'TRANSPORTATION::NONE_OF_ABOVE': true },
      { 'TRANSPORTATION::CAR': false },
      { 'TRANSPORTATION::FREQUENT_AIR_TRAVEL': false },
      { 'TRANSPORTATION::PUBLIC_TRANSPORT': false },
      { 'TRANSPORTATION::WALK_BIKE': false },
      { 'TRANSPORTATION::WORK_FROM_HOME': false },
      { 'TRANSPORTATION::NONE_OF_ABOVE': false },
    ],
    invalid: [
      { 'TRANSPORTATION::CAR': 'invalid' },
      { 'TRANSPORTATION::FREQUENT_AIR_TRAVEL': 'invalid' },
      { 'TRANSPORTATION::PUBLIC_TRANSPORT': 'invalid' },
      { 'TRANSPORTATION::WALK_BIKE': 'invalid' },
      { 'TRANSPORTATION::WORK_FROM_HOME': 'invalid' },
      { 'TRANSPORTATION::NONE_OF_ABOVE': 'invalid' },
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
  schemaTestHelper.testValidAndInvalid('VETERAN', {
    valid: [
      { 'VETERAN::VETERAN': true },
      { 'VETERAN::ACTIVE_DUTY': true },
      { 'VETERAN::NATIONAL_GUARD_RESERVES': true },
      { 'VETERAN::VA_EMPLOYEE': true },
      { 'VETERAN::FAMILY_MEMBER_CAREGIVER': true },
      { 'VETERAN::VA_HEALTHCARE_CHAMPVA': true },
      { 'VETERAN::NONE_OF_ABOVE': true },
      { 'VETERAN::VETERAN': false },
      { 'VETERAN::ACTIVE_DUTY': false },
      { 'VETERAN::NATIONAL_GUARD_RESERVES': false },
      { 'VETERAN::VA_EMPLOYEE': false },
      { 'VETERAN::FAMILY_MEMBER_CAREGIVER': false },
      { 'VETERAN::VA_HEALTHCARE_CHAMPVA': false },
      { 'VETERAN::NONE_OF_ABOVE': false },
    ],
    invalid: [
      { 'VETERAN::VETERAN': 'invalid' },
      { 'VETERAN::ACTIVE_DUTY': 'invalid' },
      { 'VETERAN::NATIONAL_GUARD_RESERVES': 'invalid' },
      { 'VETERAN::VA_EMPLOYEE': 'invalid' },
      { 'VETERAN::FAMILY_MEMBER_CAREGIVER': 'invalid' },
      { 'VETERAN::VA_HEALTHCARE_CHAMPVA': 'invalid' },
      { 'VETERAN::NONE_OF_ABOVE': 'invalid' },
    ],
  });
  schemaTestHelper.testValidAndInvalid('GENDER', {
    valid: [
      { 'GENDER::FEMALE': true },
      { 'GENDER::MALE': true },
      { 'GENDER::TRANSGENDER_FEMALE': true },
      { 'GENDER::TRANSGENDER_MALE': true },
      { 'GENDER::SELF_IDENTIFY': true },
      { 'GENDER::NONE_OF_ABOVE': true },
      { 'GENDER::FEMALE': false },
      { 'GENDER::MALE': false },
      { 'GENDER::TRANSGENDER_FEMALE': false },
      { 'GENDER::TRANSGENDER_MALE': false },
      { 'GENDER::SELF_IDENTIFY': false },
      { 'GENDER::NONE_OF_ABOVE': false },
    ],
    invalid: [
      { 'GENDER::FEMALE': 'invalid' },
      { 'GENDER::MALE': 'invalid' },
      { 'GENDER::TRANSGENDER_FEMALE': 'invalid' },
      { 'GENDER::TRANSGENDER_MALE': 'invalid' },
      { 'GENDER::SELF_IDENTIFY': 'invalid' },
      { 'GENDER::NONE_OF_ABOVE': 'invalid' },
    ],
  });
  schemaTestHelper.testValidAndInvalid('RACE_ETHNICITY_ORIGIN', {
    valid: [
      { 'RACE_ETHNICITY_ORIGIN::AMERICAN_INDIAN_ALASKA_NATIVE': true },
      { 'RACE_ETHNICITY_ORIGIN::ASIAN': true },
      { 'RACE_ETHNICITY_ORIGIN::BLACK_AFRICAN_AMERICAN': true },
      { 'RACE_ETHNICITY_ORIGIN::HISPANIC_LATINO_SPANISH_ORIGIN': true },
      { 'RACE_ETHNICITY_ORIGIN::HAWAIIAN_PACIFIC_ISLANDER': true },
      { 'RACE_ETHNICITY_ORIGIN::WHITE': true },
      { 'RACE_ETHNICITY_ORIGIN::OTHER_RACE_ETHNICITY': true },
      { 'RACE_ETHNICITY_ORIGIN::NONE_OF_ABOVE': true },
      { 'RACE_ETHNICITY_ORIGIN::AMERICAN_INDIAN_ALASKA_NATIVE': false },
      { 'RACE_ETHNICITY_ORIGIN::ASIAN': false },
      { 'RACE_ETHNICITY_ORIGIN::BLACK_AFRICAN_AMERICAN': false },
      { 'RACE_ETHNICITY_ORIGIN::HISPANIC_LATINO_SPANISH_ORIGIN': false },
      { 'RACE_ETHNICITY_ORIGIN::HAWAIIAN_PACIFIC_ISLANDER': false },
      { 'RACE_ETHNICITY_ORIGIN::WHITE': false },
      { 'RACE_ETHNICITY_ORIGIN::OTHER_RACE_ETHNICITY': false },
      { 'RACE_ETHNICITY_ORIGIN::NONE_OF_ABOVE': false },
    ],
    invalid: [
      { 'RACE_ETHNICITY_ORIGIN::AMERICAN_INDIAN_ALASKA_NATIVE': 'invalid' },
      { 'RACE_ETHNICITY_ORIGIN::ASIAN': 'invalid' },
      { 'RACE_ETHNICITY_ORIGIN::BLACK_AFRICAN_AMERICAN': 'invalid' },
      { 'RACE_ETHNICITY_ORIGIN::HISPANIC_LATINO_SPANISH_ORIGIN': 'invalid' },
      { 'RACE_ETHNICITY_ORIGIN::HAWAIIAN_PACIFIC_ISLANDER': 'invalid' },
      { 'RACE_ETHNICITY_ORIGIN::WHITE': 'invalid' },
      { 'RACE_ETHNICITY_ORIGIN::OTHER_RACE_ETHNICITY': 'invalid' },
      { 'RACE_ETHNICITY_ORIGIN::NONE_OF_ABOVE': 'invalid' },
    ],
  });
});

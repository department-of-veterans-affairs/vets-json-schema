import schemaHelpers from '../../common/schema-helpers';

const diagnosed = {
  type: 'boolean',
};
const closeContactPositive = {
  type: 'string',
  enum: ['YES', 'NO', 'UNSURE'],
};
const hospitalized = {
  type: 'boolean',
};
const smokeOrVape = {
  type: 'boolean',
};

const HEALTH_HISTORY = {
  type: 'object',
  properties: {
    'HEALTH_HISTORY::ALLERGY_VACCINE': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::AUTOIMMUNE_DISEASE': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::CANCER': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::DIABETES': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::HEART_DISEASE': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::HIGH_BLOOD_PRESSURE': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::IMMUNOCOMPROMISED': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::KIDNEY_LIVER_DISEASE': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::LUNG_DISEASE': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::STROKE': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::ANOTHER_SERIOUS_CHRONIC_ILLNESS': {
      type: 'boolean',
    },
    'HEALTH_HISTORY::NONE_OF_ABOVE': {
      type: 'boolean',
    },
  },
};

const residentsInHome = {
  type: 'string',
  enum: ['ONE_TWO', 'THREE_FIVE', 'SIX_TEN', 'MORE_THAN_TEN'],
};

const EMPLOYMENT_STATUS = {
  type: 'object',
  properties: {
    'EMPLOYMENT_STATUS::EMPLOYED_HOME': {
      type: 'boolean',
    },
    'EMPLOYMENT_STATUS::EMPLOYED_OUTSIDE_OF_HOME': {
      type: 'boolean',
    },
    'EMPLOYMENT_STATUS::FRONTLINE_WORKER': {
      type: 'boolean',
    },
    'EMPLOYMENT_STATUS::FURLOUGHED_UNEMPLOYED': {
      type: 'boolean',
    },
    'EMPLOYMENT_STATUS::RETIRED': {
      type: 'boolean',
    },
    'EMPLOYMENT_STATUS::STUDENT': {
      type: 'boolean',
    },
    'EMPLOYMENT_STATUS::NONE_OF_ABOVE': {
      type: 'boolean',
    },
  },
};

const TRANSPORTATION = {
  type: 'object',
  properties: {
    'TRANSPORTATION::CAR': {
      type: 'boolean',
    },
    'TRANSPORTATION::FREQUENT_AIR_TRAVEL': {
      type: 'boolean',
    },
    'TRANSPORTATION::PUBLIC_TRANSPORT': {
      type: 'boolean',
    },
    'TRANSPORTATION::WALK_BIKE': {
      type: 'boolean',
    },
    'TRANSPORTATION::WORK_FROM_HOME': {
      type: 'boolean',
    },
    'TRANSPORTATION::NONE_OF_ABOVE': {
      type: 'boolean',
    },
  },
};
const closeContact = {
  type: 'string',
  enum: ['ZERO', 'ONE_TEN', 'ELEVEN_THIRTY', 'THIRTYONE_FIFTY', 'MORE_THAN_FIFTY'],
};
const VETERAN = {
  type: 'object',
  properties: {
    'VETERAN::VETERAN': {
      type: 'boolean',
    },
    'VETERAN::ACTIVE_DUTY': {
      type: 'boolean',
    },
    'VETERAN::NATIONAL_GUARD_RESERVES': {
      type: 'boolean',
    },
    'VETERAN::VA_EMPLOYEE': {
      type: 'boolean',
    },
    'VETERAN::FAMILY_MEMBER_CAREGIVER': {
      type: 'boolean',
    },
    'VETERAN::VA_HEALTHCARE_CHAMPVA': {
      type: 'boolean',
    },
    'VETERAN::NONE_OF_ABOVE': {
      type: 'boolean',
    },
  },
};
const GENDER = {
  type: 'object',
  properties: {
    'GENDER::MALE': {
      type: 'boolean',
    },
    'GENDER::FEMALE': {
      type: 'boolean',
    },
    'GENDER::TRANSGENDER_MALE': {
      type: 'boolean',
    },
    'GENDER::TRANSGENDER_FEMALE': {
      type: 'boolean',
    },
    'GENDER::SELF_IDENTIFY': {
      type: 'boolean',
    },
    'GENDER::NONE_OF_ABOVE': {
      type: 'boolean',
    },
  },
};
const GENDER_SELF_IDENTIFY_DETAILS = {
  type: 'string',
};
const RACE_ETHNICITY_ORIGIN = {
  type: 'object',
  properties: {
    'RACE_ETHNICITY_ORIGIN::AMERICAN_INDIAN_ALASKA_NATIVE': {
      type: 'boolean',
    },
    'RACE_ETHNICITY_ORIGIN::ASIAN': {
      type: 'boolean',
    },
    'RACE_ETHNICITY_ORIGIN::BLACK_AFRICAN_AMERICAN': {
      type: 'boolean',
    },
    'RACE_ETHNICITY_ORIGIN::HISPANIC_LATINO_SPANISH_ORIGIN': {
      type: 'boolean',
    },
    'RACE_ETHNICITY_ORIGIN::HAWAIIAN_PACIFIC_ISLANDER': {
      type: 'boolean',
    },
    'RACE_ETHNICITY_ORIGIN::WHITE': {
      type: 'boolean',
    },
    'RACE_ETHNICITY_ORIGIN::OTHER_RACE_ETHNICITY': {
      type: 'boolean',
    },
    'RACE_ETHNICITY_ORIGIN::NONE_OF_ABOVE': {
      type: 'boolean',
    },
  },
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Covid Vaccine Trial',
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
    residentsInHome,
    HEALTH_HISTORY,
    diagnosed,
    closeContactPositive,
    hospitalized,
    smokeOrVape,
    EMPLOYMENT_STATUS,
    TRANSPORTATION,
    closeContact,
    VETERAN,
    GENDER,
    GENDER_SELF_IDENTIFY_DETAILS,
    RACE_ETHNICITY_ORIGIN,
  },
  required: [
    'email',
    'veteranFullName',
    'veteranDateOfBirth',
    'zipCode',
    'phone',
    'residentsInHome',
    'HEALTH_HISTORY',
    'diagnosed',
    'closeContactPositive',
    'hospitalized',
    'smokeOrVape',
    'EMPLOYMENT_STATUS',
    'TRANSPORTATION',
    'closeContact',
    'VETERAN',
    'GENDER',
    'RACE_ETHNICITY_ORIGIN',
  ],
};

[
  ['email', 'email'],
  ['fullName', 'veteranFullName'],
  ['date', 'veteranDateOfBirth'],
  ['usaPostalCode', 'zipCode'],
  ['usaPhone', 'phone'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

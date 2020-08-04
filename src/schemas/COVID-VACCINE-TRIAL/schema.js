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

const healthHistory = {
  type: 'object',
  properties: {
    ALLERGY_VACCINE: {
      type: 'boolean',
    },
    AUTOIMMUNE_DISEASE: {
      type: 'boolean',
    },
    CANCER: {
      type: 'boolean',
    },
    DIABETES: {
      type: 'boolean',
    },
    HEART_DISEASE: {
      type: 'boolean',
    },
    HIGH_BLOOD_PRESSURE: {
      type: 'boolean',
    },
    IMMUNOCOMPROMISED: {
      type: 'boolean',
    },
    KIDNEY_LIVER_DISEASE: {
      type: 'boolean',
    },
    LUNG_DISEASE: {
      type: 'boolean',
    },
    STROKE: {
      type: 'boolean',
    },
    ANOTHER_SERIOUS_CHRONIC_ILLNESS: {
      type: 'boolean',
    },
  },
};

const residentsInHome = {
  type: 'string',
  enum: ['ONE_TWO', 'THREE_FIVE', 'SIX_TEN', 'MORE_THAN_TEN'],
};

const employmentStatus = {
  type: 'object',
  properties: {
    EMPLOYED_HOME: {
      type: 'boolean',
    },
    EMPLOYED_OUTSIDE_OF_HOME: {
      type: 'boolean',
    },
    FRONTLINE_WORKER: {
      type: 'boolean',
    },
    FURLOUGHED_UNEMPLOYED: {
      type: 'boolean',
    },
    RETIRED: {
      type: 'boolean',
    },
    STUDENT: {
      type: 'boolean',
    },
    NONE_OF_ABOVE: {
      type: 'boolean',
    },
  },
};

const transportation = {
  type: 'object',
  properties: {
    CAR: {
      type: 'boolean',
    },
    FREQUENT_AIR_TRAVEL: {
      type: 'boolean',
    },
    PUBLIC_TRANSPORT: {
      type: 'boolean',
    },
    WALK_BIKE: {
      type: 'boolean',
    },
    WORK_FROM_HOME: {
      type: 'boolean',
    },
    NONE_OF_ABOVE: {
      type: 'boolean',
    },
  },
};
const zipCode = {
  type: 'string',
  pattern: '^(\\d{5})(?:[-](\\d{4}))?$',
};
const closeContact = {
  type: 'string',
  enum: ['ZERO', 'ONE_TEN', 'ELEVEN_THIRTY', 'THIRTYONE_FIFTY', 'MORE_THAN_FIFTY'],
};
const descriptionText = {
  type: 'object',
  properties: {
    'view:descriptionText': {
      type: 'object',
      properties: {},
    },
  },
};
const infoSharingText = {
  type: 'object',
  properties: {
    'view:infoSharingText': {
      type: 'object',
      properties: {},
    },
  },
};
const contactHeaderText = {
  type: 'object',
  properties: {
    'view:contactText': {
      type: 'object',
      properties: {},
    },
  },
};
const healthHeaderText = {
  type: 'object',
  properties: {
    'view:healthText': {
      type: 'object',
      properties: {},
    },
  },
};
const exposureRiskHeaderText = {
  type: 'object',
  properties: {
    'view:exposureRiskText': {
      type: 'object',
      properties: {},
    },
  },
};
const height = {
  type: 'object',
  properties: {
    heightFeet: {
      type: 'string',
      enum: ['TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'],
    },
    heightInches: {
      type: 'string',
      enum: ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE'],
    },
  },
};
const weight = {
  type: 'string',
};
const gender = {
  type: 'object',
  properties: {
    FEMALE: {
      type: 'boolean',
    },
    MALE: {
      type: 'boolean',
    },
    TRANSGENDER_FEMALE: {
      type: 'boolean',
    },
    TRANSGENDER_MALE: {
      type: 'boolean',
    },
    GENDER_VARIANT: {
      type: 'boolean',
    },
    SELF_IDENTIFY: {
      type: 'boolean',
    },
    PREFER_NO_ANSWER: {
      type: 'boolean',
    },
  },
};
const raceEthnicityOrigin = {
  type: 'object',
  properties: {
    AMERICAN_INDIAN_ALASKA_NATIVE: {
      type: 'boolean',
    },
    ASIAN: {
      type: 'boolean',
    },
    BLACK_AFRICAN_AMERICAN: {
      type: 'boolean',
    },
    HISPANIC_LATINO_SPANISH_ORIGIN: {
      type: 'boolean',
    },
    HAWAIIAN_PACIFIC_ISLANDER: {
      type: 'boolean',
    },
    WHITE: {
      type: 'boolean',
    },
    OTHER_RACE_ETHNICITY: {
      type: 'boolean',
    },
    PREFER_NO_ANSWER: {
      type: 'boolean',
    },
  },
};

const closingText = {
  type: 'object',
  properties: {
    'view:thankYouText': {
      type: 'object',
      properties: {},
    },
    'view:textDetail': {
      type: 'object',
      properties: {},
    },
    'view:eligibilityTextHeader': {
      type: 'object',
      properties: {},
    },
    'view:eligibileTextDetail': {
      type: 'object',
      properties: {},
    },
    'view:eligibileTextNote': {
      type: 'object',
      properties: {},
    },
    'view:notEligibileTextHeader': {
      type: 'object',
      properties: {},
    },
    'view:notEligibileTextDetail': {
      type: 'object',
      properties: {},
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
    descriptionText,
    infoSharingText,
    healthHeaderText,
    exposureRiskHeaderText,
    residentsInHome,
    healthHistory,
    diagnosed,
    closeContactPositive,
    hospitalized,
    smokeOrVape,
    employmentStatus,
    transportation,
    closeContact,
    contactHeaderText,
    zipCode,
    height,
    weight,
    gender,
    raceEthnicityOrigin,
    closingText,
  },
  required: ['fullName'],
};

[['email'], ['fullName'], ['date']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

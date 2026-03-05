import _ from 'lodash';
import originalDefinitions from '../../common/definitions';

const definitions = _.cloneDeep(originalDefinitions);

const fullNameSchema = {
  type: 'object',
  required: ['first', 'last'],
  properties: {
    first: { type: 'string', maxLength: 30 },
    middle: { type: 'string', maxLength: 30 },
    last: { type: 'string', maxLength: 30 },
    suffix: {
      type: 'string',
      enum: ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'],
    },
    maiden: { type: 'string', maxLength: 30 },
  },
};

const addressSchema = {
  type: 'object',
  properties: {
    isMilitary: { type: 'boolean' },
    country: { type: 'string' },
    street: { type: 'string', maxLength: 100 },
    street2: { type: 'string', maxLength: 100 },
    city: { type: 'string', maxLength: 100 },
    state: { type: 'string' },
    postalCode: { type: 'string' },
  },
};

const servicePeriodSchema = {
  type: 'object',
  required: ['branchOfService', 'dischargeCharacter'],
  properties: {
    branchOfService: { type: 'string' },
    serviceStartDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    serviceEndDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
    highestRank: { type: 'string' },
    dischargeCharacter: {
      type: 'string',
      enum: [
        '',
        'honorable',
        'general',
        'otherThanHonorable',
        'badConduct',
        'dishonorable',
        'entryLevelSeparation',
        'uncharacterized',
        'unknown',
      ],
    },
  },
};

const currentlyBuriedPersonSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'object',
      required: ['first', 'last'],
      properties: {
        first: { type: 'string' },
        last: { type: 'string' },
      },
    },
    ssn: definitions.ssn,
    cemeteryNumber: { type: 'string' },
  },
};

const raceCheckboxGroupSchema = {
  type: 'object',
  properties: {
    americanIndian: { type: 'boolean' },
    asian: { type: 'boolean' },
    black: { type: 'boolean' },
    hawaiian: { type: 'boolean' },
    white: { type: 'boolean' },
    other: { type: 'boolean' },
    preferNoAnswer: { type: 'boolean' },
  },
};

const timePreferenceSchema = {
  type: 'object',
  properties: {
    '8-10': { type: 'boolean' },
    '10-12': { type: 'boolean' },
    '12-2': { type: 'boolean' },
    '2-4': { type: 'boolean' },
    none: { type: 'boolean' },
  },
};

const dayPreferenceSchema = {
  type: 'object',
  properties: {
    monday: { type: 'boolean' },
    tuesday: { type: 'boolean' },
    wednesday: { type: 'boolean' },
    thursday: { type: 'boolean' },
    friday: { type: 'boolean' },
    none: { type: 'boolean' },
  },
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL IN A VA NATIONAL CEMETERY (40-4962)',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName: fullNameSchema,
    address: addressSchema,
    servicePeriod: servicePeriodSchema,
    currentlyBuriedPerson: currentlyBuriedPersonSchema,
  },
  required: [
    'applicantName',
    'phoneNumber',
    'emailAddress',
    'deceasedType',
    'deceasedFirstName',
    'deceasedLastName',
    'dateOfBirth',
    'dateOfDeath',
    'ssn',
    'maritalStatus',
    'gender',
    'ethnicity',
    'race',
    'servicePeriods',
    'desiredCemetery',
    'burialType',
    'sexualOffense',
    'capitalCrime',
    'funeralHomeName',
    'relationshipToVeteran',
    'hasPreneedDecisionLetter',
    'currentlyBuried',
    'requestEmblemOfBelief',
    'preferredBurialTimes',
    'preferredBurialDays',
  ],
  properties: {
    // ----- Applicant (Personal Representative) -----
    applicantName: fullNameSchema,
    phoneNumber: {
      type: 'string',
      maxLength: 10,
      pattern: '^[0-9]{10}$',
    },
    emailAddress: {
      type: 'string',
      format: 'email',
      maxLength: 256,
    },
    address: addressSchema,

    // Who is deceased
    deceasedType: {
      type: 'string',
      enum: ['veteran', 'spouse', 'dependentChild'],
    },

    // Pre-Need decision letter
    hasPreneedDecisionLetter: {
      type: 'string',
      enum: ['yes', 'no', 'unknown'],
    },
    preneedDecisionLetterNumber: {
      type: 'string',
      maxLength: 30,
    },

    // Relationship to Veteran
    relationshipToVeteran: {
      type: 'string',
      enum: ['familyMember', 'funeralHomeRep', 'personalRepresentative', 'other'],
    },
    relationshipDescription: {
      type: 'string',
      maxLength: 100,
    },

    // ----- Deceased (Veteran / Claimant) -----
    deceasedFirstName: { type: 'string', maxLength: 30 },
    deceasedMiddleName: { type: 'string', maxLength: 30 },
    deceasedLastName: { type: 'string', maxLength: 30 },
    deceasedSuffix: {
      type: 'string',
      enum: ['', 'Jr.', 'Sr.', 'II', 'III', 'IV', 'V'],
    },
    deceasedMaidenName: { type: 'string', maxLength: 30 },

    dateOfBirth: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
    dateOfDeath: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
    ssn: definitions.ssn,

    // Demographics
    maritalStatus: {
      type: 'string',
      enum: ['married', 'divorcedAnnulled', 'separated', 'widowed', 'neverMarried'],
    },
    gender: {
      type: 'string',
      enum: ['female', 'male'],
    },
    ethnicity: {
      type: 'string',
      enum: ['hispanic', 'notHispanic', 'unknown', 'preferNoAnswer'],
    },
    race: raceCheckboxGroupSchema,

    // ----- Marital / Spouse Information -----
    isSpouseOfDeceased: {
      type: 'string',
      enum: ['yes', 'no'],
    },
    spouseFirstName: { type: 'string' },
    spouseLastName: { type: 'string' },
    spouseDateOfBirth: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
    spouseSsn: definitions.ssn,

    // Veteran status (if applicant is a Veteran)
    isVeteran: {
      type: 'string',
      enum: ['yes', 'no'],
    },
    vaFileNumber: { type: 'string' },
    militaryServiceNumber: { type: 'string' },

    // Dependent child
    hasAdultDependentChild: {
      type: 'string',
      enum: ['yes', 'no'],
    },

    // ----- Service Periods -----
    servicePeriods: {
      type: 'array',
      minItems: 1,
      maxItems: 3,
      items: servicePeriodSchema,
    },

    // ----- Interment -----
    currentlyBuried: {
      type: 'string',
      enum: ['yes', 'no', 'unknown'],
    },
    currentlyBuriedPersons: {
      type: 'array',
      maxItems: 3,
      items: currentlyBuriedPersonSchema,
    },

    desiredCemetery: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        label: { type: 'string' },
      },
    },

    burialType: {
      type: 'string',
      enum: ['casket', 'cremains', 'noRemains', 'intactGreen', 'cremainsGreen'],
    },
    burialLocation: {
      type: 'string',
      enum: ['inGround', 'columbarium', 'scattered', 'ossuary'],
    },
    containerType: {
      type: 'string',
      enum: ['biodegradable', 'crematedNone'],
    },

    // Emblem of belief
    requestEmblemOfBelief: {
      type: 'string',
      enum: ['yes', 'no'],
    },
    selectedEmblem: { type: 'string' },

    // Federal law
    sexualOffense: {
      type: 'string',
      enum: ['yes', 'no', 'unknown'],
    },
    capitalCrime: {
      type: 'string',
      enum: ['yes', 'no', 'unknown'],
    },

    // ----- Funeral Home -----
    funeralHomeName: { type: 'string' },
    funeralHomeAddress: addressSchema,
    funeralContactFirstName: { type: 'string' },
    funeralContactLastName: { type: 'string' },
    funeralContactPhoneNumber: {
      type: 'string',
      pattern: '^(?:\\+?1)?\\d{10}$',
    },
    funeralContactEmailAddress: {
      type: 'string',
      format: 'email',
    },

    // ----- Scheduling -----
    preferredBurialTimes: timePreferenceSchema,
    preferredBurialDays: dayPreferenceSchema,

    // ----- Supporting Documents -----
    attachments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          size: { type: 'integer' },
          confirmationCode: { type: 'string' },
        },
      },
    },

    // ----- Metadata / Privacy -----
    privacyAgreementAccepted: { type: 'boolean' },
    preparerName: {
      type: 'object',
      properties: {
        first: { type: 'string' },
        last: { type: 'string' },
      },
    },
  },
};

export default schema;

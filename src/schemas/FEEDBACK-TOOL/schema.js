import _ from 'lodash/fp';

import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import constants from '../../common/constants';

const { salesforceCountries: countries } = constants;

// The common definition includes "II" and lacks "Other"
const fullName = _.set(
  'properties.suffix',
  {
    type: 'string',
    enum: ['Jr.', 'III', 'IV', 'Sr.', 'Other'],
  },
  definitions.fullName,
);

const USA = countries.find(country => country.value === 'USA');
const nonUSACountries = countries.filter(country => country.value !== 'USA');

const internationalAddressFields = {
  street: {
    type: 'string',
    minLength: 1,
    maxLength: 52,
  },
  street2: {
    type: 'string',
    minLength: 1,
    maxLength: 52,
  },
  street3: {
    type: 'string',
    minLength: 1,
    maxLength: 52,
  },
  city: {
    type: 'string',
    minLength: 1,
    maxLength: 40,
  },
  state: {
    type: 'string',
    minLength: 1,
    maxLength: 20,
  },
  postalCode: {
    type: 'string',
    minLength: 1,
    maxLength: 30,
  },
};

const domesticSchoolAddress = {
  required: ['street', 'city', 'state', 'country', 'postalCode'],
  properties: {
    country: {
      type: 'string', // TYPE: text (255)
      enum: [USA.label],
      default: USA.label,
    },
    street: {
      type: 'string',
      minLength: 1,
      maxLength: 84, // street + street2 + street3 length must be < 255
    },
    street2: {
      type: 'string',
      minLength: 1,
      maxLength: 84, // street + street2 + street3 length must be < 255
    },
    street3: {
      type: 'string',
      minLength: 1,
      maxLength: 84, // street + street2 + street3 length must be < 255
    },
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    state: {
      type: 'string',
      enum: constants.states.USA.map(state => state.value), // backend accepts abbreviated state names
      enumNames: constants.states.USA.map(state => state.label),
    },
    postalCode: {
      // TYPE: text (255)
      type: 'string',
      pattern: '^\\d{5}$', // common definition pattern (meets submission requirements)
    },
  },
};

// TRANSLATE: all international address fields into street, street2, and country
const internationalSchoolAddress = {
  required: ['street', 'city', 'country'],
  properties: {
    country: {
      type: 'string', // TYPE: text (255)
      enum: nonUSACountries.map(country => country.label),
    },
    ...internationalAddressFields,
  },
};

// TRANSLATE: all search tool address fields into street, street2, and country
const searchToolSchoolAddress = {
  required: ['street', 'city', 'country'],
  properties: {
    country: {
      type: 'string', // TYPE: text (255)
      minLength: 1,
      maxLength: 255,
    },
    ...internationalAddressFields,
  },
};

const schoolAddresses = [domesticSchoolAddress, internationalSchoolAddress, searchToolSchoolAddress];

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'GI BILL SCHOOL FEEDBACK TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    date: definitions.date,
    ssnLastFour: definitions.ssnLastFour,
  },
  required: [
    // no fields are required for submission, though several are required by design on FE
    'onBehalfOf',
    'educationDetails',
    'issue',
    'issueDescription',
    'privacyAgreementAccepted',
    'issueResolution',
  ],
  properties: {
    address: {
      type: 'object',
      required: ['street', 'city', 'state', 'country', 'postalCode'],
      properties: {
        country: {
          type: 'string',
          enum: ['US'],
          enumNames: [USA.label],
          default: 'US',
        },
        street: {
          // TYPE: text (499)
          type: 'string',
          minLength: 1,
          maxLength: 499, // address + address2 length must be < 1000
        },
        street2: {
          // TYPE: text (499)
          type: 'string',
          minLength: 1,
          maxLength: 499, // address + address2 length must be < 1000
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 25,
        },
        state: {
          // backend requires abbreviated state names for applicant address
          type: 'string',
          enum: constants.states.USA.map(state => state.value),
          enumNames: constants.states.USA.map(state => state.label),
        },
        postalCode: {
          // TYPE: text (5)
          type: 'string',
          pattern: '^\\d{5}$', // common definition pattern (meets submission requirements)
        },
      },
    },
    onBehalfOf: {
      // Type: text (255 limit)
      type: 'string',
      enum: ['Myself', 'Someone else', 'Anonymous'],
      enumNames: ['Myself', 'Someone else', 'I want to submit my feedback anonymously'],
    },
    serviceBranch: {
      // Type: text (255 limit)
      type: 'string',
      enum: ['Air Force', 'Army', 'Coast Guard', 'Marine Corps', 'Navy', 'NOAA', 'Public Health Service'],
    },
    serviceAffiliation: {
      // Type: text (255 limit)
      type: 'string',
      enum: ['Servicemember', 'Veteran', 'Spouse', 'Child', 'Other'],
    },
    fullName: _.merge(
      {
        // First, Middle, Last (100 limit, each)
        properties: {
          // common definition sets first and last maxLength to 30 (within submission limit)
          middle: {
            // common definition doesn't set middle maxLength
            type: 'string',
            minLength: 1,
            maxLength: 30,
          },
          prefix: {
            // common definition doesn't set prefix
            type: 'string',
            enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Other'],
          },
        },
      },
      fullName,
    ),
    anonymousEmail: {
      // TRANSLATE rename "email" if present
      type: 'string', // Type: email (no length limit)
      format: 'email', // HACK: email is displayed in mutually exclusive situations on the FE, so the forms library deletes/disables the field. We are splitting it into two fields to get around that, and translating the data/renaming the field on submit.
    },
    applicantEmail: {
      // TRANSLATE rename "email" if present
      type: 'string', // Type: email (no length limit)
      format: 'email',
    },
    educationDetails: {
      type: 'object',
      required: ['school', 'programs'],
      properties: {
        school: {
          type: 'object',
          required: ['address', 'name'],
          properties: {
            address: {
              type: 'object',
              anyOf: schoolAddresses,
            },
            facilityCode: {
              type: 'string',
            },
            name: {
              // Type: text (255)
              type: 'string',
              minLength: 1,
              maxLength: 255,
            },
          },
        },
        programs: {
          // TRANSLATE into array of strings
          type: 'object', // FE validation requires at least one selected
          properties: {
            chapter33: {
              type: 'boolean',
              default: false,
              title: 'Post-9/11 GI Bill (Chapter 33)',
            },
            chapter30: {
              type: 'boolean',
              default: false,
              title: 'Montgomery GI Bill - Active Duty (MGIB-AD, Chapter 30)',
            },
            chapter1606: {
              type: 'boolean',
              default: false,
              title: 'Montgomery GI Bill - Selected Reserve (MGIB-SR, Chapter 1606)',
            },
            tatu: {
              type: 'boolean',
              default: false,
              title: 'Tuition Assistance Top-Up',
            },
            chapter35: {
              type: 'boolean',
              default: false,
              title: 'Survivors’ and Dependents’ Assistance (DEA) (Chapter 35)',
            },
            chapter31: {
              type: 'boolean',
              default: false,
              title: 'Vocational Rehabilitation and Employment (VR&E) (Chapter 31)',
            },
          },
        },
        assistance: {
          // TRANSLATE into array of strings
          type: 'object',
          properties: {
            ta: {
              type: 'boolean',
              default: false,
              title: 'Federal Tuition Assistance (TA)',
            },
            taAgr: {
              type: 'boolean',
              default: false,
              title: 'State-funded Tuition Assistance (TA) for Servicemembers on Active Guard and Reserve (AGR) duties',
            },
            myCaa: {
              type: 'boolean',
              default: false,
              title: 'Military Spouse Career Advancement Accounts (MyCAA)',
            },
            ffa: {
              type: 'boolean',
              default: false,
              title: 'Federal financial aid',
            },
          },
        },
      },
    },
    issue: {
      // TRANSLATE into array of strings
      type: 'object', // FE validation requires at least one selected
      properties: {
        // TODO: obtain updated options based on sample request
        recruiting: {
          type: 'boolean',
          default: false,
        },
        accreditation: {
          type: 'boolean',
          default: false,
        },
        financialIssues: {
          type: 'boolean',
          default: false,
        },
        studentLoans: {
          type: 'boolean',
          default: false,
        },
        jobOpportunities: {
          type: 'boolean',
          default: false,
        },
        changeInDegree: {
          type: 'boolean',
          default: false,
        },
        quality: {
          type: 'boolean',
          default: false,
        },
        gradePolicy: {
          type: 'boolean',
          default: false,
        },
        transcriptRelease: {
          type: 'boolean',
          default: false,
        },
        creditTransfer: {
          type: 'boolean',
          default: false,
        },
        refundIssues: {
          type: 'boolean',
          default: false,
        },  
        other: {
          type: 'boolean',
          default: false,
        }
      },
    },
    issueDescription: {
      type: 'string',
      maxLength: 32000,
    },
    issueResolution: {
      type: 'string',
      maxLength: 1000,
    },
  },
};

[
  ['privacyAgreementAccepted'],
  ['usaPhone', 'phone'], // Type: 10 digit number (no whitespace, etc.)
  ['dateRange', 'serviceDateRange'], // TRANSLATE: Date must be flattened to enteredDuty & releaseFromDuty (both type: date)
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
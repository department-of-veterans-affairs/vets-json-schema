import _ from 'lodash/fp';

import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import constants from '../../common/constants';

const { salesforceCountries: countries } = constants;

const allStates = [
  { full: 'Alabama', abbreviation: 'AL' },
  { full: 'Alaska', abbreviation: 'AK' },
  { full: 'Arizona', abbreviation: 'AZ' },
  { full: 'Arkansas', abbreviation: 'AR' },
  { full: 'California', abbreviation: 'CA' },
  { full: 'Colorado', abbreviation: 'CO' },
  { full: 'Connecticut', abbreviation: 'CT' },
  { full: 'Delaware', abbreviation: 'DE' },
  { full: 'District Of Columbia', abbreviation: 'DC' },
  { full: 'Florida', abbreviation: 'FL' },
  { full: 'Georgia', abbreviation: 'GA' },
  { full: 'Hawaii', abbreviation: 'HI' },
  { full: 'Idaho', abbreviation: 'ID' },
  { full: 'Illinois', abbreviation: 'IL' },
  { full: 'Indiana', abbreviation: 'IN' },
  { full: 'Iowa', abbreviation: 'IA' },
  { full: 'Kansas', abbreviation: 'KS' },
  { full: 'Kentucky', abbreviation: 'KY' },
  { full: 'Louisiana', abbreviation: 'LA' },
  { full: 'Maine', abbreviation: 'ME' },
  { full: 'Maryland', abbreviation: 'MD' },
  { full: 'Massachusetts', abbreviation: 'MA' },
  { full: 'Michigan', abbreviation: 'MI' },
  { full: 'Minnesota', abbreviation: 'MN' },
  { full: 'Mississippi', abbreviation: 'MS' },
  { full: 'Missouri', abbreviation: 'MO' },
  { full: 'Montana', abbreviation: 'MT' },
  { full: 'Nebraska', abbreviation: 'NE' },
  { full: 'Nevada', abbreviation: 'NV' },
  { full: 'New Hampshire', abbreviation: 'NH' },
  { full: 'New Jersey', abbreviation: 'NJ' },
  { full: 'New Mexico', abbreviation: 'NM' },
  { full: 'New York', abbreviation: 'NY' },
  { full: 'North Carolina', abbreviation: 'NC' },
  { full: 'North Dakota', abbreviation: 'ND' },
  { full: 'Ohio', abbreviation: 'OH' },
  { full: 'Oklahoma', abbreviation: 'OK' },
  { full: 'Oregon', abbreviation: 'OR' },
  { full: 'Pennsylvania', abbreviation: 'PA' },
  { full: 'Rhode Island', abbreviation: 'RI' },
  { full: 'South Carolina', abbreviation: 'SC' },
  { full: 'South Dakota', abbreviation: 'SD' },
  { full: 'Tennessee', abbreviation: 'TN' },
  { full: 'Texas', abbreviation: 'TX' },
  { full: 'Utah', abbreviation: 'UT' },
  { full: 'Vermont', abbreviation: 'VT' },
  { full: 'Virginia', abbreviation: 'VA' },
  { full: 'Washington', abbreviation: 'WA' },
  { full: 'West Virginia', abbreviation: 'WV' },
  { full: 'Wisconsin', abbreviation: 'WI' },
  { full: 'Wyoming', abbreviation: 'WY' }
]

// The common definition includes "II" and lacks "Other"
const fullName = _.set('properties.suffix', {
  type: 'string',
  'enum': [
    'Jr.',
    'III',
    'IV',
    'Sr.',
    'Other'
  ]
}, definitions.fullName);

const USA = countries.find(country => country.value === 'USA');
const nonUSACountries = countries.filter(country => country.value !== 'USA');

const domesticSchoolAddress = {
  required: ['street', 'city', 'state', 'country', 'postalCode'],
  properties: {
    country: {
      type: 'string', // TYPE: text (255)
      'enum': [USA.label],
      default: USA.label
    },
    street: {
      type: 'string',
      minLength: 1,
      maxLength: 126 // street + street2 length must be < 255
    },
    street2: {
      type: 'string',
      minLength: 1,
      maxLength: 126 // street + street2 length must be < 255
    },
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 255
    },
    state: {
      type: 'string',
      'enum': allStates.map(state => state.abbreviation), // backend accepts abbreviated state names
      enumNames: allStates.map(state => state.full)
    },
    postalCode: {  // TYPE: text (255)
      type: 'string',
      pattern: '^\\d{5}$' // common definition pattern (meets submission requirements)
    }
  }
};

// TRANSLATE: all international address fields into street, street2, and country
const internationalSchoolAddress = {
  required: ['street', 'city', 'country'],
  properties: {
    country: {
      type: 'string', // TYPE: text (255)
      'enum': nonUSACountries.map(country => country.label),
    },
    street: {
      type: 'string',
      minLength: 1,
      maxLength: 80
    },
    street2: {
      type: 'string',
      minLength: 1,
      maxLength: 80
    },
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 40
    },
    state: {
      type: 'string',
      minLength: 1,
      maxLength: 20
    },
    postalCode: {
      type: 'string',
      minLength: 1,
      maxLength: 30
    }
  }
};

const schoolAddress = [domesticSchoolAddress, internationalSchoolAddress];

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'GI BILL SCHOOL FEEDBACK TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    date: definitions.date
  },
  required: [ // no fields are required for submission, though several are required by design on FE
    'onBehalfOf',
    'educationDetails',
    'issue',
    'issueDescription',
    'issueResolution'
  ],
  properties: {
    address: {
      type: 'object',
      required: ['street', 'city', 'state', 'country', 'postalCode'],
      properties: {
        country: {
          type: 'string',
          'enum': ['US'],
          enumNames: [USA.label],
          default: 'US'
        },
        street: { // TYPE: text (499)
          type: 'string',
          minLength: 1,
          maxLength: 499 // address + address2 length must be < 1000
        },
        street2: { // TYPE: text (499)
          type: 'string',
          minLength: 1,
          maxLength: 499 // address + address2 length must be < 1000
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 25
        },
        state: { // backend requires abbreviated state names for applicant address
          type: 'string',
          'enum': allStates.map(state => state.abbreviation),
          enumNames: allStates.map(state => state.full)
        },
        postalCode: {  // TYPE: text (5)
          type: 'string',
          pattern: '^\\d{5}$' // common definition pattern (meets submission requirements)
        }
      }
    },
    onBehalfOf: {  // Type: text (255 limit)
      type: 'string',
      'enum': [
        'Myself',
        'Someone else',
        'Anonymous'
      ],
      enumNames: [
        'Myself',
        'Someone else',
        'I want to submit my feedback anonymously'
      ]
    },
    serviceBranch: { // Type: text (255 limit)
      type: 'string',
      enum: [
        'Air Force',
        'Army',
        'Coast Guard',
        'Marine Corps',
        'Navy',
        'NOAA',
        'Public Health Service'
      ]
    },
    serviceAffiliation: { // Type: text (255 limit)
      type: 'string',
      'enum': [
        'Servicemember',
        'Veteran',
        'Spouse',
        'Child',
        'Other'
      ]
    },
    fullName: _.merge({ // First, Middle, Last (100 limit, each)
      properties: { // common definition sets first and last maxLength to 30 (within submission limit)
        middle: { // common definition doesn't set middle maxLength
          type: 'string',
          minLength: 1,
          maxLength: 30
        },
        prefix: { // common definition doesn't set prefix
          type: 'string',
          'enum': [
            'Mr.',
            'Mrs.',
            'Ms.',
            'Dr.',
            'Other'
          ]
        }
      }
    }, fullName),
    anonymousEmail: { // TRANSLATE rename "email" if present
      type: 'string',  // Type: email (no length limit)
      format: 'email' // HACK: email is displayed in mutually exclusive situations on the FE, so the forms library deletes/disables the field. We are splitting it into two fields to get around that, and translating the data/renaming the field on submit.
    },
    applicantEmail: { // TRANSLATE rename "email" if present
      type: 'string',  // Type: email (no length limit)
      format: 'email'
    },
    educationDetails: {
      type: 'object',
      required: [
        'school',
        'programs'
      ],
      school: {
        type: 'object',
        oneOf: [{
          required: ['address', 'name'],
          properties: {
            address: {
              type: 'object',
              oneOf: schoolAddress
            },
            name: { // Type: text (255)
              type: 'string',
              minLength: 1,
              maxLength: 255
            }
          }
        }, {
          required: ['facilityCode'],
          properties: {
            facilityCode: {  // TRANSLATE: Used to obtain school address
              type: 'string'
            }
          }
        }]
      },
      programs: { // TRANSLATE into array of strings
        type: 'object', // FE validation requires at least one selected
        properties: {
          'Post-9/11 Ch 33': {
            type: 'boolean',
            default: false,
            title: 'Post-9/11 GI Bill (Chapter 33)'
          },
          'MGIB-AD Ch 30': {
            type: 'boolean',
            default: false,
            title: 'Montgomery GI Bill - Active Duty (MGIB-AD, Chapter 30)'
          },
          'MGIB-SR Ch 1606': {
            type: 'boolean',
            default: false,
            title: 'Montgomery GI Bill - Selected Reserve (MGIB-SR, Chapter 1606)'
          },
          TATU: {
            type: 'boolean',
            default: false,
            title: 'Tuition Assistance Top-Up'
          },
          REAP: {
            type: 'boolean',
            default: false,
            title: 'Reserve Educational Assistance Program (REAP) (Chapter 1607)'
          },
          'DEA Ch 35': {
            type: 'boolean',
            default: false,
            title: 'Survivors’ and Dependents’ Assistance (DEA) (Chapter 35)'
          },
          'VRE Ch 31': {
            type: 'boolean',
            default: false,
            title: 'Vocational Rehabilitation and Employment (VR&E) (Chapter 31)'
          }
        }
      },
      assistance: { // TRANSLATE into array of strings
        type: 'object',
        properties: {
          TA: {
            type: 'boolean',
            default: false,
            title: 'Federal Tuition Assistance (TA)'
          },
          'TA-AGR': {
            type: 'boolean',
            default: false,
            title: 'State-funded Tuition Assistance (TA) for Servicemembers on Active Guard and Reserve (AGR) duties'
          },
          MyCAA: {
            type: 'boolean',
            default: false,
            title: 'Military Spouse Career Advancement Accounts (MyCAA)'
          },
          FFA: {
            type: 'boolean',
            default: false,
            title: 'Federal financial aid'
          }
        }
      }
    },
    issue: {  // TRANSLATE into array of strings
      type: 'object', // FE validation requires at least one selected
      properties: { // TODO: obtain updated options based on sample request
        'other': {
          type: 'boolean',
          default: false
        },
        'recruiting': {
          type: 'boolean',
          default: false
        },
        'studentLoans': {
          type: 'boolean',
          default: false
        },
        'quality': {
          type: 'boolean',
          default: false
        },
        'creditTransfer': {
          type: 'boolean',
          default: false
        },
        'accreditation': {
          type: 'boolean',
          default: false
        },
        'jobOpportunities': {
          type: 'boolean',
          default: false
        },
        'gradePolicy': {
          type: 'boolean',
          default: false
        },
        'refundIssues': {
          type: 'boolean',
          default: false
        },
        'financialIssues': {
          type: 'boolean',
          default: false
        },
        'changeInDegree': {
          type: 'boolean',
          default: false
        },
        'transcriptRelease': {
          type: 'boolean',
          default: false
        }
      }
    },
    issueDescription: {
      type: 'string',
      maxLength: 32000
    },
    issueResolution: {
      type: 'string',
      maxLength: 1000
    }
  }
};


[
  ['privacyAgreementAccepted'],
  ['usaPhone', 'phone'], // Type: 10 digit number (no whitespace, etc.)
  ['dateRange', 'serviceDateRange'] // TRANSLATE: Date must be flattened to enteredDuty & releaseFromDuty (both type: date)
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash/fp';

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

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'GI BILL SCHOOL FEEDBACK TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {},
  required: [ // no fields are required for submission, though several are required by design on FE
    'onBehalfOf',
    'educationDetails',
    'issue',
    'issueDescription',
    'issueResolution'
  ],
  properties: {
    // TRANSLATE: address and address2 must be combined into a single comma separated string property named 'address'
    address: { // TYPE: text (499)
      type: 'string',
      minLength: 1,
      maxLength: 499 // address + address2 length must be < 1000
    },
    address2: { // TYPE: text (499)
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
    },
    country: {
      type: 'string',
      'enum': ['US'], // Only 'US' is accepted
      enumNames: ['United States'],
      default: 'US'
    },
    onBehalfOf: {  // Type: text (255 limit)
      type: 'string',
      'enum': [
        'Myself',
        'Someone else',
        'Anonymous'
      ]
    },
    serviceBranch: { // Type: text (255 limit)
      type: 'string',
      'enum': [
        'Army',
        'Navy',
        'Marines',
        'Air Force',
        'Coast Guard',
        'NOAA/PHS'
      ]
    },
    serviceAffiliation: { // Type: text (255 limit)
      type: 'string',
      'enum': [
        'Service Member',
        'Spouse or Family Member',
        'Veteran',
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
    email: {
      type: 'string',  // Type: email (no length limit)
      format: 'email'
    },
    educationDetails: {
      type: 'object',
      required: [ // no fields are required for submission, though several are required by design on FE
        'school',
        'programs'
      ],
      school: {
        type: 'object',
        properties: {
          required: ['name'], // address or facilityCode are also required on FE
          address: { // TRANSLATE: address and address2 must be combined into a single comma separated string property named 'address'
            type: 'string',
            minLength: 1,
            maxLength: 126 // address + address2 length must be < 255
          },
          address2: {
            type: 'string',
            minLength: 1,
            maxLength: 126 // address + address2 length must be < 255
          },
          city: {
            type: 'string',
            minLength: 1,
            maxLength: 255
          },
          state: { // backend requires the full state names for the school address
            type: 'string',
            'enum': allStates.map(state => state.full),
          },
          postalCode: {  // TYPE: text (255)
            type: 'string',
            pattern: '^\\d{5}$' // common definition pattern (meets submission requirements)
          },
          country: {
            type: 'string',
            'enum': ['US'], // Only 'US' addresses are supported
            enumNames: ['United States'],
            default: 'US'
          },
          name: { // Type: text (255)
            type: 'string',
            minLength: 1,
            maxLength: 255
          },
          facilityCode: {  // TRANSLATE: Used to obtain school address
            type: 'string'
          }
        }
      },
      programs: { // TRANSLATE into an array of semicolon separated strings (255 limit)
        type: 'object', // FE validation requires at least one selected
        properties: {
          'MGIB-AD Ch 30': {
            type: 'boolean',
            default: false
            // title: 'Montgomery GI Bill - Active Duty (MGIB) (Ch. 30)'
          },
          'MGIB-SR Ch 1606': {
            type: 'boolean',
            default: false
            // title: 'Montgomery GI Bill - Selected Reserve (MGIB-SR) (Ch. 1606)'
          },
          'VRE Ch 31': {
            type: 'boolean',
            default: false
            // title: 'Vocational Rehabilitation and Employment (VR&E) (Ch. 31)'
          },
          'Post-9/11 Ch 33': {
            type: 'boolean',
            default: false
            // title: 'Post-9/11 GI Bill (Ch. 33)'
          },
          'DEA Ch 35': {
            type: 'boolean',
            default: false
            // title: 'Survivors & Dependents Assistance (DEA) (Ch. 35)'
          },
          TATU: {
            type: 'boolean',
            default: false
            // title: 'Tuition Assistance Top-Up'
          }
        }
      },
      assistance: { // TRANSLATE into a semicolon separated string (255 limit)
        type: 'object',
        properties: {
          TA: {
            type: 'boolean',
            default: false
            // title: Federal Tuition Assistance (TA)
          },
          'TA-AGR': {
            type: 'boolean',
            default: false
            // title: State Funded Tuition Assistance (TA) for Service members performing Active Guard and Reserve (AGR) duties
          },
          MyCAA: {
            type: 'boolean',
            default: false
            // title: Military Spouse Career Advancement Accounts
          },
          FFA: {
            type: 'boolean',
            default: false
            // title: Federal Financial Aid
          }
        }
      }
    },
    issue: {  // TRANSLATE into array
      type: 'object', // FE validation requires at least one selected
      properties: {
        'Recruiting/Marketing Practices': {
            type: 'boolean',
            default: false
        },
        'Student Loans': {
            type: 'boolean',
            default: false
        },
        'Quality of Education': {
            type: 'boolean',
            default: false
        },
        'Transfer of Credits': {
            type: 'boolean',
            default: false
        },
        'Accreditation': {
            type: 'boolean',
            default: false
        },
        'Post-graduation Job Opportunities': {
            type: 'boolean',
            default: false
        },
        'Grade Policy': {
            type: 'boolean',
            default: false
        },
        'Refund Issues': {
            type: 'boolean',
            default: false
        },
        'Financial Issues (e.g. Tuition/Fee charges)': {
            type: 'boolean',
            default: false
        },
        'Change in degree plan/requirements': {
            type: 'boolean',
            default: false
        },
        'Release of Transcripts': {
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
  ['dateRange', 'serviceDateRange'], // TRANSLATE: Date must be flattened to enteredDuty & releaseFromDuty (both type: date)
  ['date', 'dob'], // Type: date
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

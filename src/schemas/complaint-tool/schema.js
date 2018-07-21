import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash/fp';


const GIBSFTStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

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
    address: {
      type: 'object',
      required: ['street', 'city', 'state', 'postalCode', 'country'],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 1000 // TODO: confirm length limit with stakeholders 
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 1000 // TODO: confirm length limit with stakeholders 
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 25
        },
        state: {  // TODO: verify validation as abbreviations or words
          type: 'string',
          'enum': GIBSFTStates
        },
        postalCode: {  // TYPE: text (5)
          type: 'string',
          pattern: '^\\d{5}$' // common definition pattern (meets submission requirements)
        },
        country: { // TODO: determine validation, picklist? 
          type: 'string',
          'enum': ['US'] // Only US addresses are supported
        }
      }
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
          address: {
            type: 'object',
            required: ['street', 'city', 'state', 'postalCode', 'country'],
            properties: {
              street: {
                type: 'string',
                minLength: 1,
                maxLength: 255 // TODO: confirm length limit with stakeholders 
              },
              street2: {
                type: 'string',
                minLength: 1,
                maxLength: 255 // TODO: confirm length limit with stakeholders 
              },
              city: {
                type: 'string',
                minLength: 1,
                maxLength: 255
              },
              state: {  // TODO: verify validation as abbreviations or words
                type: 'string',
                'enum': GIBSFTStates
              },
              postalCode: {  // TYPE: text (255)
                type: 'string',
                pattern: '^\\d{5}$' // common definition pattern (meets submission requirements)
              },
              country: { // TODO: determine validation, picklist?
                type: 'string',
                'enum': ['US'] // Only US addresses are supported
              }
            }
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
      programs: { // TODO: Needs to be translated into an array of strings?? clarify with stakeholders (255 limit)
        type: 'object', // FE validation requires at least one selected
        properties: { // TODO: confirm with stakeholders that "VA Education Programs (e.g. GI Bill)" shouldn't be an option, or if an acronym should be provided
          'MGIB-AD Ch 30': {
            type: 'boolean'
            // title: 'Montgomery GI Bill - Active Duty (MGIB) (Ch. 30)'
          },
          'MGIB-SR Ch 1606': {
            type: 'boolean'
            // title: 'Montgomery GI Bill - Selected Reserve (MGIB-SR) (Ch. 1606)'
          },
          'VRE Ch 31': {
            type: 'boolean'
            // title: 'Vocational Rehabilitation and Employment (VR&E) (Ch. 31)'
          },
          'Post- 9/11 Ch 33': { // TODO: verify with stakeholders that space should be removed after dash
            type: 'boolean'
            // title: 'Post-9/11 GI Bill (Ch. 33)'
          },
          'DEA Ch 35': {
            type: 'boolean'
            // title: 'Survivors & Dependents Assistance (DEA) (Ch. 35)'
          },
          TATU: {
            type: 'boolean'
            // title: 'Tuition Assistance Top-Up'
          }
        }
      },
      assistance: { // TODO: Needs to be translated into an array of strings?? clarify with stakeholders (255 limit)
        type: 'object',
        properties: {
          TA: {
            type: 'boolean'
            // title: Federal Tuition Assistance (TA)
          },
          'TA-AGR': {
            type: 'boolean'
            // title: State Funded Tuition Assistance (TA) for Service members performing Active Guard and Reserve (AGR) duties 
          },
          MyCAA: {
            type: 'boolean'
            // title: Military Spouse Career Advancement Accounts
          },
          FFA: {
            type: 'boolean'
            // title: Federal Financial Aid 
          }
        }
      }
    },
    issue: {  // TRANSLATE to array 
      type: 'object', // FE validation requires at least one selected
      properties: {
        'Recruiting/Marketing Practices': {
          type: 'boolean'
        },
        'Student Loans': {
          type: 'boolean'
        },
        'Quality of Education': {
          type: 'boolean'
        },
        'Transfer of Credits': { // TODO: determine why missing in design
          type: 'boolean'
        },
        'Accreditation': {
          type: 'boolean'
        },
        'Post-graduation Job Opportunities': { // TODO: resolve discrepancy "Post-graduation;Job Opportunities"
          type: 'boolean'
        },
        'Grade Policy': {
          type: 'boolean'
        },
        'Refund Issues': { // TODO: determine why missing in design
          type: 'boolean'
        },
        'Financial Issues (e.g. Tuition/Fee charges)': {
          type: 'boolean'
        },
        'Change in degree plan/requirements': {
          type: 'boolean'
        },
        'Release of Transcripts': {
          type: 'boolean'
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

 // TODO: clarify with stakeholders what Vets.gov ID – 20 limit refers to
[
  ['privacyAgreementAccepted'],
  ['usaPhone', 'phone'], // Type: 10 digit number (no whitespace, etc.)
  ['dateRange', 'serviceDateRange'], // TRANSLATE: Date must be flattened to enteredDuty & releaseFromDuty (both type: date)
  ['date', 'dob'], // Type: date
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

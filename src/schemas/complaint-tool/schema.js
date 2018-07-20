import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'GI BILL SCHOOL COMPLAINT TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName: _.merge({}, definitions.fullName, { // TODO: our common definition includes "II" (inclusion pending stakeholder feedback), lacks "Other"
      properties: { // First, Middle, Last (100 limit, each)
        prefix: {
          type: 'string',
          'enum': [
            'Mr.',
            'Mrs.',
            'Ms.',
            'Dr.',
            'Other'
          ]
        },
        suffix: {
          type: 'string',
          'enum': ['Other']
        }
      }
    })
  },
  required: [ // no fields are required for submission, though several are required by design on FE
    // 'onBehalfOf',
    // 'educationDetails',
    // 'issue',
    // 'issueDescription',
    // 'issueResolution'
  ],
  properties: {
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
    fullName: {
      '$ref': '#/definitions/fullName'
    },
    email: {
      type: 'string',  // Type: email (no length limit)
      format: 'email'
    },
    educationDetails: {
      required: [ // no fields are required for submission, though several are required by design on FE
        // 'school',
        // 'programs'
      ],
      school: definitions.school,
      programs: { // TODO: Needs to be translated into a (comma) delimited string, and spelled out if within 255 limit 
        type: 'object',
        properties: {
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
          'Post- 9/11 Ch 33': {
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
      assistance: { // TODO: Needs to be translated into a (comma) delimited string (255 limit), abbr provided to support content changes
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
            // title: State Funded Tuition Assistance (TA) for Service members performing Active Guard and Reserve (AGR) duties 
          },
          FFA: {
            type: 'boolean'
            // title: Federal Financial Aid 
          }
        }
      }
    },
    issue: { 
      type: 'string',
      'enum': [
        'Recruiting/Marketing Practices',
        'Accreditation',
        'Financial Issues (e.g. Tuition/Fee Charges)',
        'Student Loans',
        'Post-Graduation Job Opportunities',
        'Change in degree/plan requirements',
        'Quality of Education',
        'Grade Policy',
        'Release of Transcripts'
      ]
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
  ['usaPhone', 'phone'], // TODO: note validation requirements pending feedback
  ['address'], // TODO: note length limits pending feedback
  ['dateRange', 'serviceDateRange'], // TODO: Date format needs to be transformed to enteredDuty & releaseFromDuty
  ['date', 'dob'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'GI BILL SCHOOL COMPLAINT TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName: _.merge({}, definitions.fullName, {
      properties: {
        prefix: {
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
    })
  },
  required: [
    'onBehalfOf',
    'educationDetails',
    'issue',
    'issueDescription',
    'issueResolution'
  ],
  properties: {
    onBehalfOf: {
      type: 'string',
      'enum': [
        'Myself',
        'Someone else',
        'Anonymous'
      ]
    },
    serviceBranch: {
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
    serviceAffiliation: { // TODO: resolve this design, this is a radio button in the prototype
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
      type: 'string',  // TODO: determine if there is a length limit
      format: 'email'
    },
    profileData: {
      activeICN: {
        type: 'number'
      },
      historicalICN: { // TODO: should this be "historicalICNs" (plural)?
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ICN: {
              type: 'number'
            }
          }
        }
      },
      secID: {
        type: 'string'
      },
      SSN: definitions.ssn
    },
    educationDetails: {
      required: [
        'school',
        'programs'
      ],
      school: definitions.school,
      programs: { // TODO: Needs to be translated into an array of strings, verify should still be included (no longer included in provided list)
        type: 'object',
        properties: {
          chapter30ActiveDuty: {
            type: 'boolean'
          },
          chapter30SelectedReserve: {
            type: 'boolean'
          },
          chapter31: {
            type: 'boolean'
          },
          chapter33: {
            type: 'boolean'
          },
          chapter35: {
            type: 'boolean'
          },
          tuitionAssistanceTopUp: {
            type: 'boolean'
          }
        }
      },
      assistance: { // TODO: Needs to be translated into an array of strings, verify should still be included (no longer included in provided list)
        type: 'object',
        properties: {
          TA: {
            type: 'boolean'
          },
          TAAGR: {
            type: 'boolean'
          },
          MyCAA: {
            type: 'boolean'
          },
          federalFinancialAid: {
            type: 'boolean'
          }
        }
      }
    },
    issue: { // TODO: verify list, as provided list does not match design (e.g. post-graduation)
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
      maxLength: 1000
    },
    issueResolution: {
      type: 'string',
      maxLength: 1000
    }
  }
};

[
  ['privacyAgreementAccepted'], // should this be removed on the BE?
  ['usaPhone', 'phone'],
  ['address'],
  ['dateRange', 'serviceDateRange'], // TODO: Date format needs to be transformed to enteredDuty & releaseFromDuty
  ['date', 'dob'], // TODO: reconcile design and example request, which is an enum list
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

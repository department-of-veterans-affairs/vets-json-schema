import _ from 'lodash';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'IRIS Ask a Question',
  type: 'object',
  definitions: _.pick(definitions, [
    'address',
    'date',
    'dateRange',
    'email',
    'phone',
    'ssn',
    'privacyAgreementAccepted',
  ]),
  additionalProperties: false,
  anyOf: [
    {
      required: ['email'],
    },
    {
      required: ['phone'],
    },
    {
      required: ['address'],
    },
  ],
  required: ['fullName', 'preferredContactMethod', 'topic', 'inquiryType', 'query', 'veteranStatus'],
  properties: {
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        suffix: {
          type: 'string',
          enum: ['Jr.', 'Sr.', 'II', 'III', 'IV'],
        },
      },
      required: ['first', 'last'],
    },
    preferredContactMethod: {
      default: 'email',
      type: 'string',
      enum: ['email', 'mail', 'phone'],
      enumNames: ['Email', 'US Mail', 'Phone'],
    },
    topic: {
      type: 'object',
      oneOf: [
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Caregiver Support Program'],
            },
            levelTwo: {
              type: 'string',
              enum: [
                'General Caregiver Support/Education',
                'Comprehensive Family Caregiver Program',
                'VA Supportive Services',
              ],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Health & Medical Issues & Services'],
            },
            levelTwo: {
              type: 'string',
              enum: [
                'Medical Care Issues at Specific Facility',
                'Health/Medical Eligibility & Programs',
                'My HealtheVet',
                'Prosthetics, Med Devices & Sensory Aids',
                'Vet Center / Readjustment Counseling Service (RCS)',
                'Women Veterans Health Care',
              ],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['VA Ctr for Women Vets, Policies & Progs'],
            },
            levelTwo: {
              type: 'string',
              enum: ['Policy Questions', 'Question about Women Veterans Programs'],
            },
          },
        },
      ],
    },
    inquiryType: {
      type: 'string',
      enum: [
        'Question',
        'Compliment',
        'Service Complaint',
        'Suggestion',
        'Status of Claim',
        'Status of Appeal at a Local VA Office',
        'Status of Appeals at BVA, Wash DC',
      ],
    },
    query: {
      type: 'string',
    },
    veteranStatus: {
      type: 'object',
      required: ['veteranStatus'],
      properties: {
        veteranStatus: {
          type: 'string',
          enum: ['vet', 'behalf of vet', 'dependent', 'general'],
          enumNames: [
            'For myself as a Veteran',
            'On behalf of a Veteran',
            'For the dependent of a Veteran',
            'A general question',
          ],
        },
        isDependent: {
          type: 'boolean',
        },
        relationshipToVeteran: {
          type: 'string',
          enum: [
            'Attorney',
            'Authorized 3rd Party',
            'Daughter',
            'Dependent Child',
            'Ex-spouse',
            'Father',
            'Funeral Director',
            'General Question; Not Applicable',
            'Guardian/Fiduciary',
            'Helpless Child',
            'Mother',
            'Other',
            'Sibling',
            'Son',
            'Spouse',
            'Surviving Spouse',
            'Veteran',
            'VSO',
          ],
        },
        veteranIsDeceased: {
          type: 'boolean',
        },
        dateOfDeath: {
          $ref: '#/definitions/date',
        },
        branchOfService: {
          type: 'string',
          enum: [
            'Air Force',
            'Air Force Reserves',
            'Air Force National Guard',
            'Air Force Nursing Corps (AFNC)',
            'Army',
            'Army National Guard',
            'Army Reserves',
            'Coast Guard',
            "Coast Guard Women's Reserve (SPARS)",
            'Environmental Services Administration',
            'Marine Corps',
            'Marine Corps Reserves',
            'Natl Oceanic & Atmospheric Admin (NOAA)',
            'Navy',
            'Navy Reserves',
            'Navy Nursing Corps (NNC)',
            'Philippines Guerilla',
            'Philippines Scout',
            'Public Health Service',
            'U. S. Merchant Marine',
            "Women's Air Force Service Pilots (WASPS)",
            "Women's Army Auxiliary Corps (WAAC)",
            "Women's Army Corps (WACs)",
            'Womens Voluntary Emerg Srv (WAVES)',
            'Other',
          ],
        },
      },
    },
    veteranInformation: {
      dateOfBirth: {
        $ref: '#/definitions/date',
      },
      socialSecurityNumber: {
        $ref: '#/definitions/ssn',
      },
      serviceNumber: {
        type: 'string',
        pattern: '^\\d{0,12}$',
      },
      claimNumber: {
        type: 'string',
        pattern: '^\\d{6,8}$',
      },
      serviceDateRange: {
        $ref: '#/definitions/dateRange',
      },
    },
    email: {
      $ref: '#/definitions/email',
    },
    phone: {
      $ref: '#/definitions/phone',
    },
    address: {
      $ref: '#/definitions/address',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
};

export default schema;

import definitions from '../../common/definitions';
import { pciuCountries, pciuStates } from '../../common/constants';

// Only compensation is available for the HLR MVP. These definitions match
// caseflow:
// https://github.com/department-of-veterans-affairs/caseflow/blob/master/client/constants/BENEFIT_TYPES.json
const benefitTypes = [
  { label: 'Compensation', value: 'compensation' },
  // { label: 'Pension/survivors benefits', value: 'pension' },
  // { label: 'Fiduciary', value: 'fiduciary' },
  // { label: 'Education', value: 'education' },
  // { label: 'Veterans Health Administration' , value: 'vha' },
  // { label: 'Vocational rehabilitation and employment', value: 'voc_rehab'},
  // { label: 'Loan guaranty', value: 'loan_guaranty'},
  // { label: 'Insurance', value: 'insurance' },
  // { label: 'National Cemetary Administration', value: 'nca' },
];

const baseAddressDef = {
  addressLine1: {
    $ref: '#/definitions/addressLine1',
  },
  addressLine2: {
    $ref: '#/definitions/addressLine2',
  },
  city: {
    $ref: '#/definitions/city',
  },
  stateOrProvinceCode: {
    $ref: '#/definitions/state',
  },
  zipPostalCode: {
    $ref: '#/definitions/zipCode',
  },
  countryCode: {
    $ref: '#/definitions/country',
  },
};

const basePhoneDef = {
  phoneNumber: {
    $ref: '#/definitions/phone',
  },
  phoneNumberCountryCode: {
    $ref: '#/definitions/phoneCountryCode',
  },
  phoneNumberExt: {
    $ref: '#/definitions/phoneExt',
  },
};

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'HIGHER-LEVEL REVIEW',
  type: 'object',
  definitions: {
    formType: {
      type: 'string',
      enum: ['HigherLevelReview'],
    },
    benefitType: {
      type: 'string',
      enum: benefitTypes.map(b => b.value),
      enumNames: benefitTypes.map(b => b.label),
    },
    addressLine1: {
      type: 'string',
      maxLength: 50,
    },
    addressLine2: {
      type: 'string',
      maxLength: 20,
    },
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 51,
    },
    state: {
      type: 'string',
      enum: pciuStates.map(state => state.value),
      enumNames: pciuStates.map(state => state.label),
    },
    zipCode: definitions.usaPostalCode,
    country: {
      type: 'string',
      enum: pciuCountries,
      default: 'USA',
    },
    phone: definitions.usaPhone,
    phoneCountryCode: {
      type: 'string',
      maxLength: 10,
    },
    phoneExt: {
      type: 'string',
      maxLength: 10,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    date: definitions.date,
    // Used for forwarding address
    // dateRange: definitions.dateRange,
  },
  properties: {
    data: {
      type: 'object',
      properties: {
        type: {
          $ref: '#/definitions/formType',
        },
        attributes: {
          type: 'object',
          required: [
            'receiptDate',
            'benefitType',
            'legacyOptInApproved',
            'sameOffice',
            'veteran',
            'informalConference',
          ],
          properties: {
            receiptDate: {
              $ref: '#/definitions/date',
            },
            benefitType: {
              $ref: '#/definitions/benefitType',
            },
            legacyOptInApproved: {
              type: 'boolean',
            },
            sameOffice: {
              type: 'boolean',
            },
            veteran: {
              type: 'object',
              required: ['countryCode', 'city', 'addressLine1'],
              properties: {
                // fileNumberOrSsn: { type: 'string' },
                ...baseAddressDef,
                ...basePhoneDef,
                emailAddress: {
                  $ref: '#/definitions/email',
                },
                /* Not yet supported by CaseFlow
                forwardingAddress: {
                  effectiveDates: {
                    $ref: '#/definitions/dateRange',
                  },
                  ...baseAddressDef,
                },
                */
              },
            },
            /* Not included in MVP *
            claimant: {
              type: 'object',
              properties: {
                participantId: {
                  type: 'string',
                },
                payeeCode: {
                  type: 'string',
                },
              },
            },
            */

            informalConference: {
              type: 'boolean',
            },
            informalConferenceRep: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                ...basePhoneDef,
              },
            },
            informalConferenceTimes: {
              type: 'array',
              minItems: 1,
              maxItems: 2,
              uniqueItems: true,
              items: {
                type: 'string',
                enum: ['800-1000', '1000-1230', '1230-200', '200-430'],
              },
            },
          },
        },
      },
    },
    included: {
      type: 'array',
      minItems: 1,
      maxItems: 100,
      items: {
        type: 'object',
        required: ['type'],
        properties: {
          type: {
            type: 'string',
            enum: ['ContestableIssue'],
          },
          attributes: {
            type: 'object',
            properties: {
              notes: {
                type: 'string',
                maxLength: 400,
              },
              decisionIssueId: {
                type: 'number',
              },
              ratingIssueId: {
                type: 'string',
              },
              ratingDecisionIssueId: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};

export default schema;

import { benefitTypes } from '../../common/constants';

// Only compensation is available for the HLR MVP
const supportedBenefits = ['compensation'];
const supportedBenefitTypes = benefitTypes.filter(benefit => supportedBenefits.includes(benefit.value));

const phoneDef = {
  type: 'object',
  properties: {
    areaCode: {
      type: 'string',
      pattern: '^[2-9][0-9]{2}$',
    },
    phoneNumber: {
      type: 'string',
      pattern: '^[0-9]{1,14}$',
    },
    phoneNumberCountryCode: {
      type: 'string',
      pattern: '^[0-9]+$',
    },
    phoneNumberExt: {
      type: 'string',
      pattern: '^[a-zA-Z0-9]{1,10}$',
    },
  },
};

// Note: patterns copied from lighthouse schema
// https://github.com/department-of-veterans-affairs/vets-api/blob/master/modules/appeals_api/config/schemas/200996.json
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'HIGHER-LEVEL REVIEW',
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['HigherLevelReview'],
          enumNames: ['HLR'],
        },
        attributes: {
          type: 'object',
          required: ['benefitType', 'veteran', 'sameOffice', 'informalConference'],
          benefitType: {
            type: 'string',
            enum: supportedBenefitTypes.map(b => b.value),
            enumNames: supportedBenefitTypes.map(b => b.label),
          },
          veteran: {
            type: 'object',
            required: ['address'],
            properties: {
              address: {
                type: 'object',
                required: ['zipCode5'],
                properties: {
                  zipCode5: {
                    type: 'string',
                    pattern: '^[0-9]{5}$',
                  },
                },
              },
              phone: phoneDef,
              emailAddressText: {
                type: 'string',
                format: 'email',
              },
              // Lighthouse is including enum time zone values here, but they are all
              // built into the browser - see the "TZ database name" column here:
              // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
              timeZone: {
                type: 'string',
              },
            },
          },
          sameOffice: {
            type: 'boolean',
          },
          informalConference: {
            type: 'boolean',
          },
          informalConferenceRep: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              phone: phoneDef,
            },
          },
          informalConferenceTimes: {
            type: 'array',
            minItems: 1,
            maxItems: 2,
            uniqueItems: true,
            items: {
              type: 'string',
              enum: ['800-1000 ET', '1000-1230 ET', '1230-1400 ET', '1400-1630 ET'],
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
            required: ['issue', 'decisionDate'],
            properties: {
              issue: {
                type: 'string',
                maxLength: 140,
              },
              decisionDate: {
                type: 'string',
                pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
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

import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, ['date']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-1919',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: [
    'institutionDetails',
    'proprietaryProfitSchools',
    'conflictOfInterest',
    'statementOfTruthSignature',
    'dateSigned',
  ],
  properties: {
    institutionDetails: {
      type: 'object',
      required: ['certifyingOfficial', 'aboutYourInstitution', 'facilityCode', 'insitutionName', 'address'],
      properties: {
        certifyingOfficial: {
          type: 'object',
          required: ['first', 'last', 'role'],
          properties: {
            first: {
              type: 'string',
            },
            last: {
              type: 'string',
            },
            role: {
              type: 'string',
              items: {
                type: 'string',
                enum: ['Certifying Official', 'Owner', 'Officer', 'Other'],
              },
            },
          },
        },
        aboutYourInstitution: {
          type: 'string',
          enum: ['yes', 'no'],
        },
        facilityCode: {
          type: 'string',
          pattern: '^[a-zA-Z0-9]{8}$',
        },
        institutionName: {
          type: 'string',
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            state: {
              type: 'string',
              pattern: '^[A-Z]{2}$',
            },
            zip: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
          },
        },
      },
    },
    proprietaryProfitSchools: {
      type: 'object', // should whole object be a list and loop or only the individual cases after declaring if school is proprietary?
      required: ['isProprietary', 'conflictOfInterest'],
      properties: {
        isProprietaryProfit: definitions.yesNoSchema, 
        conflictOfInterest: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              conflictOfInterest: {
                type: 'object',
                required: ['hasConflictOfInterest', 'first', 'last', 'title', 'association'],
                properties: {
                  hasConflictOfInterest: definitions.yesNoSchema,
                  first: {
                    type: 'string',
                  },
                  last: {
                    type: 'string',
                  },
                  title: {
                    type: 'string',
                  },
                  association: {
                    type: string,
                    items: {
                      type: 'string', 
    
                      // ok for enum items to match UI, or better way for schema?
                      enum: ['They are a VA employee who works with, receives services from, or receives compensation from our institution', 
                        'They are a SAA employee who works with or receives compensation from our institution'
                      ]
                    }
                  } 
                }
              }
            }
          }
        }
      },
     

    },
    conflictOfInterest: {
      type: 'array',
      items: {
        type: 'object',
        required: ['hasConflictOfInterest'],
        properties: {
          hasConflictOfInterest: definitions.yesNoSchema,
          certifyingOfficial: {
            type: 'object',
            required: ['first', 'last', 'title'],
            properties: {
              first: {
                type: 'string',
              },
              last: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
            },
          },
        },
        
      },
    },
    statementOfTruthSignature: {
      type: 'string',
    },
    dateSigned: {
      $ref: '#/definitions/date',
    },
  },
};

export default schema;
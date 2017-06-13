import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    address: {
      type: 'object',
      oneOf: [
        {
          properties: {
            country: {
              type: 'string',
              'enum': [
                'CAN'
              ]
            },
            state: {
              type: 'string',
              'enum': [
                'AB',
                'BC',
                'MB',
                'NB',
                'NF',
                'NT',
                'NV',
                'NU',
                'ON',
                'PE',
                'QC',
                'SK',
                'YT'
              ]
            },
            postalCode: {
              type: 'string',
              maxLength: 10
            }
          }
        },
        {
          properties: {
            country: {
              type: 'string',
              'enum': [
                'MEX'
              ]
            },
            state: {
              type: 'string',
              'enum': [
                'aguascalientes',
                'baja-california-norte',
                'baja-california-sur',
                'campeche',
                'chiapas',
                'chihuahua',
                'coahuila',
                'colima',
                'distrito-federal',
                'durango',
                'guanajuato',
                'guerrero',
                'hidalgo',
                'jalisco',
                'mexico',
                'michoacan',
                'morelos',
                'nayarit',
                'nuevo-leon',
                'oaxaca',
                'puebla',
                'queretaro',
                'quintana-roo',
                'san-luis-potosi',
                'sinaloa',
                'sonora',
                'tabasco',
                'tamaulipas',
                'tlaxcala',
                'veracruz',
                'yucatan',
                'zacatecas'
              ]
            },
            postalCode: {
              type: 'string',
              maxLength: 10
            }
          }
        },
        {
          properties: {
            country: {
              type: 'string',
              'enum': [
                'USA'
              ]
            },
            state: {
              type: 'string',
              'enum': [
                'AL',
                'AK',
                'AS',
                'AZ',
                'AR',
                'AA',
                'AE',
                'AP',
                'CA',
                'CO',
                'CT',
                'DE',
                'DC',
                'FM',
                'FL',
                'GA',
                'GU',
                'HI',
                'ID',
                'IL',
                'IN',
                'IA',
                'KS',
                'KY',
                'LA',
                'ME',
                'MH',
                'MD',
                'MA',
                'MI',
                'MN',
                'MS',
                'MO',
                'MT',
                'NE',
                'NV',
                'NH',
                'NJ',
                'NM',
                'NY',
                'NC',
                'ND',
                'MP',
                'OH',
                'OK',
                'OR',
                'PW',
                'PA',
                'PR',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VT',
                'VI',
                'VA',
                'WA',
                'WV',
                'WI',
                'WY'
              ]
            },
            postalCode: {
              type: 'string',
              maxLength: 10
            }
          }
        },
        {
          properties: {
            country: {
              not: {
                type: 'string',
                'enum': [
                  'CAN',
                  'MEX',
                  'USA'
                ]
              }
            },
            state: {
              type: 'string',
              maxLength: 51
            },
            postalCode: {
              type: 'string',
              maxLength: 51
            }
          }
        }
      ],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 51
        }
      }
    },
    usaPhone: {
      type: 'string',
      pattern: '^\\d{10}$'
    }
  },
  properties: {
    relationship: {
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['spouse', 'child', 'parent', 'executor', 'other']
        },
        other: {
          type: 'string'
        }
      }
    },
    locationOfDeath: {
      type: 'object',
      required: ['location'],
      properties: {
        location: {
          type: 'string',
          enum: [
            'vaMedicalCenter',
            'stateVeteransHome',
            'nursingHome',
            'other'
          ]
        },
        other: {
          type: 'string'
        }
      }
    },
    email: {
      type: 'string',
      format: 'email'
    },
    phone: {
      $ref: '#/definitions/usaPhone'
    }
  }
};

[
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['date', 'burialDate'],
  ['date', 'deathDate'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

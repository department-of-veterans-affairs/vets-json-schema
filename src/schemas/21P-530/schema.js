import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
const modifiedToursOfDuty = definitions.toursOfDuty;
delete modifiedToursOfDuty.items.properties.benefitsToApplyTo;
delete modifiedToursOfDuty.items.properties.applyPeriodToSelected;
delete modifiedToursOfDuty.items.properties.serviceStatus;
delete modifiedToursOfDuty.items.required;

_.merge(modifiedToursOfDuty, {
  items: {
    properties: {
      rank: {
        type: 'string',
      },
      serviceNumber: {
        type: 'string',
      },
      placeOfEntry: {
        type: 'string',
      },
      placeOfSeparation: {
        type: 'string',
      },
    },
  },
});

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR BURIAL BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    dateRange: definitions.dateRange,
    centralMailAddress: {
      type: 'object',
      oneOf: [
        {
          properties: {
            country: {
              type: 'string',
              enum: ['CA'],
            },
            state: {
              type: 'string',
              enum: ['AB', 'BC', 'MB', 'NB', 'NF', 'NT', 'NV', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'],
            },
            postalCode: {
              type: 'string',
              maxLength: 10,
            },
          },
        },
        {
          properties: {
            country: {
              type: 'string',
              enum: ['MX'],
            },
            state: {
              type: 'string',
              enum: [
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
                'zacatecas',
              ],
            },
            postalCode: {
              type: 'string',
              maxLength: 10,
            },
          },
        },
        {
          properties: {
            country: {
              type: 'string',
              enum: ['US'],
            },
            state: {
              type: 'string',
              enum: [
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
                'WY',
              ],
            },
            postalCode: {
              type: 'string',
              pattern: '^(\\d{5})(?:[-](\\d{4}))?$',
            },
          },
        },
        {
          properties: {
            country: {
              not: {
                type: 'string',
                enum: ['CA', 'MX', 'US'],
              },
            },
            state: {
              type: 'string',
              maxLength: 51,
            },
            postalCode: {
              type: 'string',
              maxLength: 51,
            },
          },
        },
      ],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 51,
        },
      },
      required: ['postalCode'],
    },
  },
  anyOf: [
    {
      required: ['vaFileNumber'],
    },
    {
      required: ['veteranSocialSecurityNumber'],
    },
  ],
  properties: {
    relationship: {
      type: 'object',
      required: ['type'],
      properties: {
        type: {
          type: 'string',
          enum: ['spouse', 'child', 'parent', 'executor', 'other'],
        },
        other: {
          type: 'string',
        },
        isEntity: {
          type: 'boolean',
        },
      },
    },
    locationOfDeath: {
      type: 'object',
      required: ['location'],
      properties: {
        location: {
          type: 'string',
          enum: ['vaMedicalCenter', 'stateVeteransHome', 'nursingHome', 'other'],
        },
        other: {
          type: 'string',
        },
      },
    },
    toursOfDuty: modifiedToursOfDuty,
    previousNames: {
      type: 'array',
      items: schemaHelpers.getDefinition('fullName'),
    },
    claimantEmail: {
      type: 'string',
      format: 'email',
    },
    burialAllowance: {
      type: 'boolean',
    },
    plotAllowance: {
      type: 'boolean',
    },
    transportation: {
      type: 'boolean',
    },
    amountIncurred: {
      type: 'number',
    },
    burialAllowanceRequested: {
      type: 'string',
      enum: ['service', 'nonService', 'vaMC'],
    },
    burialCost: {
      type: 'number',
    },
    previouslyReceivedAllowance: {
      type: 'boolean',
    },
    benefitsUnclaimedRemains: {
      type: 'boolean',
    },
    placeOfRemains: {
      type: 'string',
    },
    federalCemetery: {
      type: 'boolean',
    },
    stateCemetery: {
      type: 'boolean',
    },
    govtContributions: {
      type: 'boolean',
    },
    amountGovtContribution: {
      type: 'number',
    },
    placeOfBirth: {
      type: 'string',
    },
    officialPosition: {
      type: 'string',
    },
    firmName: {
      type: 'string',
    },
  },
  required: ['privacyAgreementAccepted', 'claimantAddress', 'veteranFullName'],
};

[
  ['privacyAgreementAccepted'],
  ['centralMailAddress', 'claimantAddress'],
  ['usaPhone', 'claimantPhone'],
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['centralMailVaFile', 'vaFileNumber'],
  ['date', 'burialDate'],
  ['date', 'deathDate'],
  ['date', 'veteranDateOfBirth'],
  ['files', 'deathCertificate'],
  ['files', 'transportationReceipts'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

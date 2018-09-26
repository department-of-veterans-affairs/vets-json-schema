import definitions from '../../common/definitions';
import { countries, states50AndDC } from '../../common/constants';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

const textRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*][\\w ]+$';
const USA = countries.find(country => country.value === 'USA');
const nonUSACountries = countries.filter(country => country.value !== 'USA');

const states = states50AndDC.concat([
  { label: 'American Samoa', value: 'AS' },
  { label: 'Federated States Of Micronesia', value: 'FM' },
  { label: 'Guam', value: 'GU' },
  { label: 'Marshall Islands', value: 'MH' },
  { label: 'Northern Mariana Islands', value: 'MP' },
  { label: 'Palau', value: 'PW' },
  { label: "Philippines", value: "PI" },
  { label: 'Puerto Rico', value: 'PR' },
  { label: "U.S. Minor Outlying Islands", value: "UM" },
  { label: 'Virgin Islands', value: 'VI' }
]).sort((stateA, stateB) => (stateA.label.localeCompare(stateB.label)))

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DECLARATION OF STATUS OF DEPENDENTS',
  type: 'object',
  additionalProperties: false,
  definitions: {},
  properties: {
    claimantEmail: {
      type: 'string',
      format: 'email'
    },
    spouseIsVeteran: {
      type: 'boolean'
    },
    liveWithSpouse: {
      type: 'boolean'
    },
    monthlySpousePayment: {
      type: 'number'
    },
    remarks: {
      type: 'string'
    },
    dependents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: schemaHelpers.getDefinition('fullName'),
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childInHousehold: {
            type: 'boolean'
          },
          childAddress: schemaHelpers.getDefinition('address'),
          personWhoLivesWithChild: schemaHelpers.getDefinition('fullName'),

          childPlaceOfBirth: {
            type: 'object',
            anyOf: [
              {
                required: ['childCountryOfBirthCode', 'childCityOfBirth', 'childStateOfBirth'],
                properties: {
                  childCountryOfBirthCode: {
                    type: 'string',
                    'enum': [USA.label],
                    default: USA.label
                  },
                  childCityOfBirth: {
                    type: 'string',
                    maxLength: 30,
                    minLength: 1,
                    pattern: textRegex
                  },
                  childStateOfBirth: {
                    type: 'string',
                    maxLength: 50,
                    'enum': states.map(country => country.label)
                  }
                }
              },
              {
                required: ['childCountryOfBirthCode', 'childCountryOfBirthText'],
                properties: {
                  childCountryOfBirthCode: {
                    type: 'string',
                    'enum': ['Not in list'],
                    default: 'Not in list'
                  },
                  childCountryOfBirthText: {
                    type: 'string',
                    maxLength: 50,
                    minLength: 1,
                    pattern: textRegex
                  }
                }
              },
              {
                required: ['childCountryOfBirthCode'],
                properties: {
                  childCountryOfBirthCode: {
                    type: 'string',
                    'enum': nonUSACountries.map(country => country.label)
                  }
                }
              }
            ]
          },
          childSocialSecurityNumber: schemaHelpers.getDefinition('ssn'),
          childRelationship: {
            type: 'string',
            enum: [
              'biological',
              'adopted',
              'stepchild'
            ]
          },
          attendingCollege: {
            type: 'boolean'
          },
          disabled: {
            type: 'boolean'
          },
          married: {
            type: 'boolean'
          },
          previouslyMarried: {
            type: 'boolean'
          }
        }
      }
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'claimantFullName'],
  ['fullName', 'veteranFullName'],
  ['usaPhone', 'dayPhone'],
  ['usaPhone', 'nightPhone'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['ssn', 'claimantSocialSecurityNumber'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['vaFileNumber'],
  ['vaFileNumber', 'spouseVaFileNumber'],
  ['address', 'claimantAddress'],
  ['address', 'spouseAddress'],
  ['maritalStatus'],
  ['date', 'spouseDateOfBirth'],
  ['marriages'],
  ['marriages', 'spouseMarriages']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

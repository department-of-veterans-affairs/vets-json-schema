import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

const textRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*][\\w ]+$';

// lists of countries and states from EVSS ReferenceDataService
const countries = [
  "Albania",
  "Algeria",
  "Angola",
  "Anguilla",
  "Antigua",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Azores",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Barbuda",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia-Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burma",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of",
  "Congo, People's Republic of",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "England",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Great Britain",
  "Great Britain and Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guatemala",
  "Guinea",
  "Guinea, Republic of Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel (Jerusalem)",
  "Israel (Tel Aviv)",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Leeward Islands",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Mali",
  "Malta",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldavia",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "Nevis",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Northern Ireland",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Philippines (restricted payments)",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of Yemen",
  "Romania",
  "Russia",
  "Rwanda",
  "Sao-Tome/Principe",
  "Saudi Arabia",
  "Scotland",
  "Senegal",
  "Serbia",
  "Serbia/Montenegro",
  "Seychelles",
  "Sicily",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St. Kitts",
  "St. Lucia",
  "St. Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey (Adana only)",
  "Turkey (except Adana)",
  "Turkmenistan",
  "USA",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Wales",
  "Western Samoa",
  "Yemen Arab Republic",
  "Zambia",
  "Zimbabwe"
]

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "Armed Forces (AE)",
  "Armed Forces Americas",
  "Armed Forces Pacific",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Islands",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
]

const USA = countries.find(country => country === 'USA');
const nonUSACountries = countries.filter(country => country !== 'USA');

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
                required: ['childCountryOfBirthDropdown', 'childCityOfBirth', 'childStateOfBirth'],
                properties: {
                  childCountryOfBirthDropdown: {
                    type: 'string',
                    'enum': [USA],
                    default: USA
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
                    'enum': states
                  }
                }
              },
              {
                required: ['childCountryOfBirthDropdown', 'childCountryOfBirthText'],
                properties: {
                  childCountryOfBirthDropdown: {
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
                required: ['childCountryOfBirthDropdown'],
                properties: {
                  childCountryOfBirthDropdown: {
                    type: 'string',
                    'enum': nonUSACountries
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

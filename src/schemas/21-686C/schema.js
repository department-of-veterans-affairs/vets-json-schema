import schemaHelpers from '../../common/schema-helpers';
import originalDefinitions from '../../common/definitions';
import constants from '../../common/constants';
import _ from 'lodash';

const countryUSA = "USA";  // if selected, addressType should be 'DOMESTIC'
const countryNotInList = "Country Not In List"; // if selected, addressType should be 'INTERNATIONAL'

// lists of countries and states are from EVSS ReferenceDataService
// if any of these countries are selected, addressType should be 'INTERNATIONAL'
const countriesForeign = [
  "Afghanistan",
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

const { states: constStates } = constants;
const states = constStates.USA.concat(
  [{ value: "UM", label: "United States Minor Outlying Islands"}]
).sort((stateA, stateB) => (stateA.label.localeCompare(stateB.label)))

const textRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*0-9]+$';
const textAndNumbersRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$';

let definitions = _.cloneDeep(originalDefinitions);
definitions =  _.pick(definitions, ['fullName']);

definitions.fullName.properties.first.pattern = textRegex
definitions.fullName.properties.last.pattern = textRegex
definitions.fullName.properties.middle.pattern = textRegex
definitions.fullName.properties.first.maxLength = 30
definitions.fullName.properties.last.maxLength = 30
definitions.fullName.properties.middle.maxLength = 20

const commonAddressFields = {
  required: ['addressType', 'street', 'city', 'country'],
  properties: {
    addressType: {
      type: 'string',
      'enum': [
        'DOMESTIC',
        'MILITARY',
        'INTERNATIONAL'
      ],
      enumNames: [
        'Domestic',
        'Military',
        'International'
      ]
    },
    street: {
      type: 'string',
      minLength: 1,
      maxLength: 20,
      pattern: textAndNumbersRegex
    },
    street2: {
      type: 'string',
      maxLength: 20,
      pattern: textAndNumbersRegex
    },
    street3: {
      type: 'string',
      maxLength: 20,
      pattern: textAndNumbersRegex
    },
    city: {
      type: 'string',
      maxLength: 30,
      pattern: textRegex
    },
    country: {
      type: 'string',
      maxLength: 50,
      'enum': [countryUSA, countryNotInList].concat(countriesForeign)
    }
  }
}

const postalCode = {
  type: 'string',
  maxLength: 10,
  pattern: '(^\\d{5}(?:[-]\\d{4})?$)?'
};

const domesticAddress = {
  required: [...commonAddressFields.required, 'state', 'postalCode'],
  properties: {
    ...commonAddressFields.properties,
    addressType: {
      type: 'string',
      'enum': ['DOMESTIC'],
      default: 'DOMESTIC'  
    },
    state: {
      type: 'string',
      maxLength: 50,
      'enum': states.map(state => state.value),
      enumNames: states.map(state => state.label)
    },
    postalCode,
    country: {
      type: 'string',
      maxLength: 50,
      default: countryUSA
    }
  },
  additionalProperties: false
}

const militaryAddress = {
  required: [...commonAddressFields.required, 'postOffice', 'postalType', 'postalCode'],
  properties: {
    ...commonAddressFields.properties, 
    addressType: {
      type: 'string',
      enum: ['MILITARY'],
      default: 'MILITARY'  
    },
    postOffice: {
      type: 'string',
      'enum': [
        'APO',
        'DPO',
        'FPO'
      ],
      enumNames: [
        'Ashore Post Office',
        'Diplomatic Post Office',
        'Fleet Post Office'
      ]
      
    },
    postalType: {
      type: 'string',
      'enum': [
        'AA',
        'AE',
        'AP'
      ],
      enumNames: [
        'Armed Forces Americas (except Canada)',
        'Armed Forces Europe, Middle East, Canada & Africa',
        'Armed Forces Pacific'
      ]
    },
    postalCode
  },
  additionalProperties: false
}


const internationalAddressDropDown = {
  required: [...commonAddressFields.required],
  properties: {
    ...commonAddressFields.properties,
    addressType: {
      type: 'string',
      enum: ['INTERNATIONAL'],
      default: 'INTERNATIONAL'
    },
    country: {
      type: 'string',
      'enum': countriesForeign
    }
  },
  additionalProperties: false
}

const internationalAddressText = {
  required: [...commonAddressFields.required, 'countryText'],
  properties: {
    ...commonAddressFields.properties,
    addressType: {
      type: 'string',
      enum: ['INTERNATIONAL'],
      default: 'INTERNATIONAL'
    },
    country: {
      type: 'string',
      'enum': [countryNotInList],
      default: countryNotInList
    },
    countryText: {
      type: 'string',
      maxLength: 50,
      minLength: 1,
      pattern: textRegex
    }
  },
  additionalProperties: false
}


const addressDefs = [domesticAddress, militaryAddress, internationalAddressDropDown, internationalAddressText];

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DECLARATION OF STATUS OF DEPENDENTS',
  type: 'object',
  additionalProperties: false,
  definitions,
  properties: {
    claimantAddress: {
      type: 'object',
      oneOf: addressDefs
    },
    claimantEmail: {
      type: 'string',
      format: 'email'
    },
    spouseAddress: {
      type: 'object',
      oneOf: addressDefs
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
        additionalProperties: false,
        properties: {
          fullName: schemaHelpers.getDefinition('fullName'),
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childInHousehold: {
            type: 'boolean'
          },
          childAddress: {
            type: 'object',
            oneOf: addressDefs
          },
          personWhoLivesWithChild: schemaHelpers.getDefinition('fullName'),
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
          marriedDate: schemaHelpers.getDefinition('date'),
          previouslyMarried: {
            type: 'boolean'
          },
          childPlaceOfBirth: {
            type: 'object',
            oneOf: [
              {
                required: ['childCountryOfBirthDropdown', 'childCityOfBirth', 'childStateOfBirth'],
                properties: {
                  childCountryOfBirthDropdown: {
                    type: 'string',
                    'enum': [countryUSA],
                    default: countryUSA
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
                    'enum': states.map(state => state.value),
                    enumNames: states.map(state => state.label)
                  }
                },
                additionalProperties: false
              },
              {
                required: ['childCountryOfBirthDropdown', 'childCountryOfBirthText'],
                properties: {
                  childCountryOfBirthDropdown: {
                    type: 'string',
                    'enum': [countryNotInList],
                    default: countryNotInList
                  },
                  childCountryOfBirthText: {
                    type: 'string',
                    maxLength: 50,
                    minLength: 1,
                    pattern: textRegex
                  }
                },
                additionalProperties: false
              },
              {
                required: ['childCountryOfBirthDropdown'],
                properties: {
                  childCountryOfBirthDropdown: {
                    type: 'string',
                    'enum': countriesForeign
                  }
                },
                additionalProperties: false
              }
            ]
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
  ['maritalStatus'],
  ['date', 'spouseDateOfBirth'],
  ['marriages'],
  ['marriages', 'spouseMarriages']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

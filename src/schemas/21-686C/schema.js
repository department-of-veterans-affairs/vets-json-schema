import schemaHelpers from '../../common/schema-helpers';
import originalDefinitions from '../../common/definitions';
import _ from 'lodash';

const countryUSA = "USA";  // if selected, addressType should be 'DOMESTIC'
const countryMilitary = "Military Address"; // if selected, addressType should be 'MILITARY'
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

const states = [
  { value: "AK", label: "Alaska"},
  { value: "AL", label: "Alabama"},
  { value: "AR", label: "Arkansas"},
  { value: "AS", label: "American Samoa"},
  { value: "AZ", label: "Arizona"},
  { value: "CA", label: "California"},
  { value: "CO", label: "Colorado"},
  { value: "CT", label: "Connecticut"},
  { value: "DC", label: "District of Columbia"},
  { value: "DE", label: "Delaware"},
  { value: "FL", label: "Florida"},
  { value: "FM", label: "Federated Micronesia"},
  { value: "GA", label: "Georgia"},
  { value: "GU", label: "Guam"},
  { value: "HI", label: "Hawaii"},
  { value: "IA", label: "Iowa"},
  { value: "ID", label: "Idaho"},
  { value: "IL", label: "Illinois"},
  { value: "IN", label: "Indiana"},
  { value: "KS", label: "Kansas"},
  { value: "KY", label: "Kentucky"},
  { value: "LA", label: "Louisiana"},
  { value: "MA", label: "Massachusetts"},
  { value: "MD", label: "Maryland"},
  { value: "ME", label: "Maine"},
  { value: "MH", label: "Marshall Islands"},
  { value: "MI", label: "Michigan"},
  { value: "MN", label: "Minnesota"},
  { value: "MO", label: "Missouri"},
  { value: "MP", label: "Northern Mariana Islands"},
  { value: "MS", label: "Mississippi"},
  { value: "MT", label: "Montana"},
  { value: "NC", label: "North Carolina"},
  { value: "ND", label: "North Dakota"},
  { value: "NE", label: "Nebraska"},
  { value: "NH", label: "New Hampshire"},
  { value: "NJ", label: "New Jersey"},
  { value: "NM", label: "New Mexico"},
  { value: "NV", label: "Nevada"},
  { value: "NY", label: "New York"},
  { value: "OH", label: "Ohio"},
  { value: "OK", label: "Oklahoma"},
  { value: "OR", label: "Oregon"},
  { value: "PA", label: "Pennsylvania"},
  { value: "PI", label: "Philippine Islands"},
  { value: "PR", label: "Puerto Rico"},
  { value: "PW", label: "Palau"},
  { value: "RI", label: "Rhode Island"},
  { value: "SC", label: "South Carolina"},
  { value: "SD", label: "South Dakota"},
  { value: "TN", label: "Tennessee"},
  { value: "TX", label: "Texas"},
  { value: "UM", label: "United States Minor Outlying Islands"},
  { value: "UT", label: "Utah"},
  { value: "VA", label: "Virginia"},
  { value: "VI", label: "US Virgin Islands"},
  { value: "VT", label: "Vermont"},
  { value: "WA", label: "Washington"},
  { value: "WI", label: "Wisconsin"},
  { value: "WV", label: "West Virginia"},
  { value: "WY", label: "Wyoming"}
]

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
      'enum': [countryUSA, countryMilitary, countryNotInList].concat(countriesForeign)
    }
  }
}

const postalCode = {
  type: 'string',
  maxLength: 10,
  pattern: '^[0-9]{5,10}$'
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

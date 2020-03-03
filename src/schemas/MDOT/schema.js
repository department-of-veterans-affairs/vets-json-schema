import constants from '../../common/constants';
import commonDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const { fullName, email, gender, date } = commonDefinitions;

const {countries, states} = constants;

const currentCountryLabels = countries.filter(country => country.value === 'USA' || country.value === 'CAN' || country.value === 'MEX').map(country => country.label);

const [USALabel, CANLabel, MEXLabel] = currentCountryLabels;

const {CAN, MEX, USA} = states;

const CANStateLabels = CAN.map(state => state.label);
const USAStateLabels = USA.map(state => state.label);
const MEXStateLabels = MEX.map(state => state.label);

const veteranAddress = {
  type: "object",
  oneOf: [
    {
      "properties": {
        "country": {
          "type": "string",
          "enum": [CANLabel],
        },
        "state": {
          "type": "string",
          "enum": CANStateLabels,
        },
        "postalCode": {
          "type": "string",
          "maxLength": 10
        }
      }
    },
    {
      "properties": {
        "country": {
          "type": "string",
          "enum": [MEXLabel],
        },
        "state": {
          "type": "string",
          "enum": MEXStateLabels,
        },
        "postalCode": {
          "type": "string",
          "maxLength": 10
        }
      }
    },
    {
      "properties": {
        "country": {
          "type": "string",
          "enum": [USALabel]
        },
        "state": {
          "type": "string",
          "enum": USAStateLabels,
        },
        "postalCode": {
          "type": "string",
          "maxLength": 10
        }
      }
    },
    {
      "properties": {
        "country": {
          "not": {
            "type": "string",
            "enum": currentCountryLabels
          }
        },
        "state": {
          "type": "string",
          "maxLength": 51,
        },
        "postalCode": {
          "type": "string",
          "maxLength": 51
        }
      }
    }
  ],
  properties: {
    street: {
      type: "string",
      minLength: 1,
      maxLength: 50
    },
    street2: {
      type: "string",
      minLength: 1,
      maxLength: 50
    },
    city: {
      type: "string",
      minLength: 1,
      maxLength: 51
    },
    state: {
      title: "State",
      type: "string",
      maxLength: 51,
      enum: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "Armed Forces Americas (AA)",
        "Armed Forces Europe (AE)",
        "Armed Forces Pacific (AP)",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District Of Columbia",
        "Federated States Of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
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
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
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
    },
    country: {
      default: "United States",
      type: "string",
      enum: [
        "United States"
      ]
    },
    postalCode: {
      type: "string",
      maxLength: 10
    }
  },
  required: [
    "street",
    "city",
    "state",
    "country",
    "postalCode"
  ]
}

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL DEVICES ORDERING TOOL',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName,
    email,
    gender,
    date,
    veteranAddress
  },
  properties: {},
  required: ['privacyAgreementAccepted', 'veteranFullName', 'veteranAddress', 'gender', 'email', 'dateOfBirth'],
};

[['privacyAgreementAccepted'], ['email'], ['fullName', 'veteranFullName'], ['veteranAddress'], ['gender'], ['date', 'dateOfBirth']].forEach(
  args => {
    schemaHelpers.addDefinitionToSchema(schema, ...args);
  },
);

export default schema;

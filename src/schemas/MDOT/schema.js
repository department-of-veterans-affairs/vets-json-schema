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

const address = {
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
    country: {
      default: USALabel,
      type: 'string',
      enum: [USALabel],
    },
    state: {
      title: 'State',
      type: 'string',
      maxLength: 51,
    },
    postalCode: {
      type: 'string',
      maxLength: 10,
    },
  }
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
    address
  },
  properties: {},
  required: ['privacyAgreementAccepted', 'veteranFullName', 'veteranAddress', 'gender', 'email', 'dateOfBirth'],
};

[['privacyAgreementAccepted'], ['email'], ['fullName', 'veteranFullName'], ['address', 'veteranAddress'], ['gender'], ['date', 'dateOfBirth']].forEach(
  args => {
    schemaHelpers.addDefinitionToSchema(schema, ...args);
  },
);

export default schema;

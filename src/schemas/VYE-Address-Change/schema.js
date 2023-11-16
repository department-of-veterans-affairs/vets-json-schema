import _ from 'lodash';
import schemaHelpers from '../../common/schema-helpers';
import originalDefinitions from '../../common/definitions';
import constants from '../../common/constants';

const { states: constStates, states50AndDC, pciuCountries } = constants;

// lists of countries and states are from EVSS ReferenceDataService
// if any of these countries are selected, addressType should be 'INTERNATIONAL'
const nonUSACountries = pciuCountries.filter(country => country !== 'USA');
const countryUSA = pciuCountries.find(country => country === 'USA'); // if selected, addressType should be 'DOMESTIC'
const countryNotInList = 'Country Not In List'; // if selected, addressType should be 'INTERNATIONAL'

const states = constStates.USA.concat([
  { value: 'UM', label: 'United States Minor Outlying Islands' },
]).sort((stateA, stateB) => stateA.label.localeCompare(stateB.label));

const textRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*0-9]+$';
const textAndNumbersRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$';

let definitions = _.cloneDeep(originalDefinitions);
definitions = _.pick(definitions, 'fullName', 'ssn');

definitions.fullName.properties.first.pattern = textRegex;
definitions.fullName.properties.last.pattern = textRegex;
definitions.fullName.properties.middle.pattern = textRegex;
definitions.fullName.properties.first.maxLength = 30;
definitions.fullName.properties.last.maxLength = 30;
definitions.fullName.properties.middle.maxLength = 20;
delete definitions.fullName.properties.suffix;

const commonAddressFields = {
  required: ['addressType', 'street', 'city', 'countryDropdown'],
  properties: {
    addressType: {
      type: 'string',
      enum: ['DOMESTIC', 'MILITARY', 'INTERNATIONAL'],
      enumNames: ['Domestic', 'Military', 'International'],
    },
    street: {
      type: 'string',
      minLength: 1,
      maxLength: 20,
      pattern: textAndNumbersRegex,
    },
    street2: {
      type: 'string',
      maxLength: 20,
      pattern: textAndNumbersRegex,
    },
    street3: {
      type: 'string',
      maxLength: 20,
      pattern: textAndNumbersRegex,
    },
    street4: {
        type: 'string',
        maxLength: 20,
        pattern: textAndNumbersRegex,
      },
    city: {
      type: 'string',
      maxLength: 30,
      pattern: textRegex,
    },
    countryDropdown: {
      type: 'string',
      maxLength: 50,
      enum: [countryUSA, countryNotInList].concat(nonUSACountries),
    },
  },
};

const addressDefs = [
  { $ref: '#/definitions/domesticAddress' },
  { $ref: '#/definitions/militaryAddress' },
  { $ref: '#/definitions/internationalAddressDropDown' },
  { $ref: '#/definitions/internationalAddressText' },
];

const schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'Verify Your Enrollment Change of Address',
    type: 'object',
    additionalProperties: false,
    definitions: _.merge(definitions, {
        domesticAddress: {
        type: 'object',
        required: [...commonAddressFields.required, 'state', 'postalCode'],
        properties: {
            ...commonAddressFields.properties,
            addressType: {
            type: 'string',
            enum: ['DOMESTIC'],
            default: 'DOMESTIC',
            },
            state: {
            type: 'string',
            maxLength: 50,
            enum: states.map(state => state.value),
            enumNames: states.map(state => state.label),
            },
            postalCode: {
            $ref: '#/definitions/postalCode',
            },
            countryDropdown: {
            type: 'string',
            maxLength: 50,
            default: countryUSA,
            },
        },
        additionalProperties: false,
        },
        militaryAddress: {
        type: 'object',
        required: [...commonAddressFields.required, 'postOffice', 'postalType', 'postalCode'],
        properties: {
            ...commonAddressFields.properties,
            addressType: {
            type: 'string',
            enum: ['MILITARY'],
            default: 'MILITARY',
            },
            postOffice: {
            type: 'string',
            enum: ['APO', 'DPO', 'FPO'],
            enumNames: ['Ashore Post Office', 'Diplomatic Post Office', 'Fleet Post Office'],
            },
            postalType: {
            type: 'string',
            enum: ['AA', 'AE', 'AP'],
            enumNames: [
                'Armed Forces Americas (except Canada)',
                'Armed Forces Europe, Middle East, Canada & Africa',
                'Armed Forces Pacific',
            ],
            },
            postalCode: {
            $ref: '#/definitions/postalCode',
            },
        },
        additionalProperties: false,
        },
        internationalAddressDropDown: {
        type: 'object',
        required: [...commonAddressFields.required],
        properties: {
            ...commonAddressFields.properties,
            addressType: {
            type: 'string',
            enum: ['INTERNATIONAL'],
            default: 'INTERNATIONAL',
            },
            countryDropdown: {
            type: 'string',
            enum: nonUSACountries,
            },
        },
        additionalProperties: false,
        },
        internationalAddressText: {
        type: 'object',
        required: [...commonAddressFields.required, 'countryText'],
        properties: {
            ...commonAddressFields.properties,
            addressType: {
            type: 'string',
            enum: ['INTERNATIONAL'],
            default: 'INTERNATIONAL',
            },
            countryDropdown: {
            type: 'string',
            enum: [countryNotInList],
            default: countryNotInList,
            },
            countryText: {
            type: 'string',
            maxLength: 50,
            minLength: 1,
            pattern: textRegex,
            },
        },
        additionalProperties: false,
        },
        postalCode: {
        type: 'string',
        maxLength: 10,
        pattern: '^\\d{5}(?:[- ]?\\d{4})?$',
        },
        location: {
        type: 'object',
        properties: {},
        oneOf: [
            {
            required: ['countryDropdown', 'city', 'state'],
            properties: {
                countryDropdown: {
                type: 'string',
                enum: [countryUSA],
                default: countryUSA,
                },
                city: {
                type: 'string',
                maxLength: 30,
                minLength: 1,
                pattern: textRegex,
                },
                state: {
                type: 'string',
                maxLength: 50,
                enum: states50AndDC.map(state => state.value),
                enumNames: states50AndDC.map(state => state.label),
                },
            },
            additionalProperties: false,
            },
            {
            required: ['countryDropdown', 'countryText'],
            properties: {
                countryDropdown: {
                type: 'string',
                enum: [countryNotInList],
                default: countryNotInList,
                },
                countryText: {
                type: 'string',
                maxLength: 50,
                minLength: 1,
                pattern: textRegex,
                },
            },
            additionalProperties: false,
            },
            {
            required: ['countryDropdown'],
            properties: {
                countryDropdown: {
                type: 'string',
                enum: nonUSACountries,
                },
            },
            additionalProperties: false,
            },
        ],
        },
    }),
    properties: {
        veteranAddress: {
        type: 'object',
        oneOf: addressDefs,
        },
        veteranSocialSecurityNumber: { $ref: '#/definitions/ssn' },
    },
    required: ['veteranFullName', 'veteranAddress'],
  anyOf: [
    {
      required: ['vaFileNumber'],
    },
    {
      required: ['veteranSocialSecurityNumber'],
    },
  ],
};

[
  
  ['fullName', 'veteranFullName'],
  ['vaFileNumber'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

import {
  countries,
  currencyAmountPattern,
  datePattern,
  numberAndDashPattern,
  phonePattern,
  states50AndDC,
  suffixes,
  textOnlyPattern,
} from '../../common/constants.js';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-526EZ)',
  type: 'object',
  definitions: {
    genericLocation: {
      type: 'object',
      required: ['city', 'state'],
      properties: {
        state: {
          type: 'string',
          maxLength: 30,
          pattern: textOnlyPattern,
        },
        city: {
          type: 'string',
          maxLength: 30,
          pattern: textOnlyPattern,
        },
      },
    },
    genericTextInput: {
      type: 'string',
      maxLength: 50,
    },
    genericTrueFalse: {
      type: 'boolean',
    },
    genericNumberAndDashInput: {
      type: 'string',
      maxLength: 50,
      pattern: numberAndDashPattern,
    },
    genericUSAStateDropdown: {
      type: 'string',
      enum: states50AndDC.map(state => state.value),
      default: states50AndDC.map(state => state.label),
    },
    countryDropdown: {
      type: 'string',
      enum: countries.map(country => country.label),
    },
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
          pattern: textOnlyPattern,
        },
        middle: {
          type: 'string',
          maxLength: 20,
          pattern: textOnlyPattern,
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
          pattern: textOnlyPattern,
        },
        suffix: {
          type: 'string',
          enum: suffixes,
        },
      },
      required: ['first', 'last'],
    },
    date: {
      type: 'string',
      pattern: datePattern,
    },
    emailInput: {
      type: 'string',
      format: 'email',
    },
    phoneInput: {
      type: 'string',
      pattern: phonePattern,
    },
    currencyInput: {
      type: 'string',
      pattern: currencyAmountPattern,
    },
    fileSchema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          size: { type: 'integer' },
          confirmationCode: { type: 'string' },
        },
      },
    },
  },
  properties: {
    optionSelection: {
      type: 'object',
        'view:selectable686Options': {
          type: 'object',
          properties: {
            addChild: { type: 'boolean', default: false },
            addSpouse: { type: 'boolean', default: false },
            reportDivorce: { type: 'boolean', default: false },
            reportDeath: { type: 'boolean', default: false },
            reportStepchildNotInHousehold: { type: 'boolean', default: false },
            reportMarriageOfChildUnder18: { type: 'boolean', default: false },
            reportChild18orOlderIsNotAttendingSchool: {
              type: 'boolean',
              default: false,
            },
            report674: {
              type: 'boolean',
              default: false,
            },
          },
        },
    },

    veteranInformation: {},

    addChild: {},

    addSpouse: {},

    reportDivorce: {},

    deceasedDependents: {},

    reportChildMarriage: {},

    reportChildStoppedAttendingSchool: {},

    reportStepchildNotInHousehold: {},

    report674: {},
  },
}

export default schema;
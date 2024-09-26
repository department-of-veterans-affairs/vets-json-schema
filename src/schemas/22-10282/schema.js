import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import constants from '../../common/constants';

const definitions = _.cloneDeep(originalDefinitions);
const { salesforceCountries: countries } = constants;

definitions.country = {
  type: 'string',
  enum: countries.map(country => country.label),
};
definitions.state = {
  type: 'string',
  enum: constants.usaStates,
};
definitions.raceAndGender = {
  type: 'string',
  enum: ['Yes', 'No'],
};
const pickedDefinitions = _.pick(definitions, ['fullName', 'email', 'usaPhone', 'country', 'state', 'raceAndGender']);
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10282 IBM Skillsbuild Training Program Intake Application',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    veteranDesc: {
      type: 'string',
      enum: [
        'veteran',
        'veteransSpouse',
        'veteransChild',
        'veteransCaregiver',
        'activeduty',
        'nationalGuard',
        'reservist',
        'individualReadyReserve',
      ],
    },
    email: {
      type: 'string',
      format: 'email',
    },
    mobilePhone: {
      $ref: '#/definitions/usaPhone',
    },
    homePhone: {
      $ref: '#/definitions/usaPhone',
    },
    country: {
      $ref: '#/definitions/country',
    },
    state: {
      $ref: '#/definitions/state',
    },
    raceAndGender: {
      type: 'string',
      enum: ['Yes', 'No'],
    },
    ethnicity: {
      type: 'string',
      enum: ['Hispanic or Latino', 'Not Hispanic or Latino', 'Prefer not to answer'],
    },
    orginRace: {
      type: 'string',
      enum: [
        'American Indian or Alaskan Native',
        'Asian',
        'Black or African American',
        'Native Hawaiian or Other Pacific Islander',
        'White',
        'Prefer not to answer',
      ],
    },
    gender: {
      type: 'string',
      enum: [
        'Man',
        'Non-binary',
        'Transgender man',
        'Transgender woman',
        'Woman',
        'Prefer not to answer',
        'A gender not listed here',
      ],
    },
    highestLevelOfEducation: {
      type: 'object',
      properties: {
        level: {
          type: 'string',
          enum: [
            'A high school diploma or GED',
            'An associate degree',
            "A bachelor's degree",
            "A master's degree",
            'A doctoral degree like a PhD',
            'Something else',
          ],
        },
        otherEducation: {
          type: 'string',
          minLength: 0,
        },
      },
    },
    currentlyEmployed: {
      type: 'string',
      enum: ['Yes', 'No'],
    },
    currentAnnualSalary: {
      type: 'string',
      enum: [
        'Less than $20,000',
        'Between $20,001 and $35,000',
        'Between $35,001 and $50,000',
        'Between $50,001 and $75,000',
        'More than $75,000',
      ],
    },
    isWorkingInTechIndustry: {
      type: 'string',
      enum: ['Yes', 'No'],
    },
    techIndustryFocusArea: {
      type: 'string',
      enum: [
        'Computer programming',
        'Data processing',
        'Computer software',
        'Information sciences',
        'Media application',
        'Something else not listed here',
      ],
    },
  },
  required: ['veteranFullName', 'veteranDesc', 'email', 'country', 'state'],
};
[['fullName', 'veteranFullName']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});
export default schema;

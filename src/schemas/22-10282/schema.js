import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import constants from '../../common/constants';

const definitions = _.cloneDeep(originalDefinitions);
const { salesforceCountries: countries } = constants;
const nonUSACountries = countries.filter(country => country.value !== 'USA');

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10282 IBM Skillsbuild Training Program Intake Application',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, ['fullName', 'description', 'usaPhone']),
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
    homePhone: {
      $ref: '#/definitions/usaPhone',
    },
    mobilePhone: {
      $ref: '#/definitions/usaPhone',
    },
    country: {
      type: 'string', // TYPE: text (255)
      enum: nonUSACountries.map(country => country.label),
    },
    state: {
      type: 'string',
      enum: constants.usaStates,
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
    },
  },
  required: ['veteranFullName', 'veteranDesc', 'email', 'country', 'state'],
};
[['fullName', 'veteranFullName']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});
export default schema;

import _ from 'lodash';
import definitions from '../../common/definitions';
import constants from '../../common/constants';

const origDefinitions = _.cloneDeep(definitions);
const { salesforceCountries: countries } = constants;

origDefinitions.country = {
  type: 'string',
  enum: ['United States', ...countries.filter(country => country.value !== 'USA').map(country => country.label)],
  default: 'United States'
};
origDefinitions.state = {
  type: 'string',
  enum: constants.usaStates,
};
origDefinitions.raceAndGender = {
  type: 'boolean',
};

const pickedDefinitions = _.pick(origDefinitions, ['fullNameNoSuffix', 'email', 'usaPhone', 'country', 'state', 'raceAndGender']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10282 IBM Skillsbuild Training Program Intake Application',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullNameNoSuffix',
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
    contactInfo: {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          $ref: '#/definitions/email',
        },
        mobilePhone: {
          $ref: '#/definitions/usaPhone',
        },
        homePhone: {
          $ref: '#/definitions/usaPhone',
        },
      }
    },
    country: {
      $ref: '#/definitions/country',
    },
    state: {
      $ref: '#/definitions/state',
    },
    raceAndGender: {
      $ref: '#/definitions/raceAndGender',
    },
    ethnicity: {
      type: 'string',
      enum: ['HL', 'NHL', 'NA'],
    },
    originRace: {
      type: 'object',
      properties: {
        isAmericanIndianOrAlaskanNative: {
          type: 'boolean',
        },
        isAsian: {
          type: 'boolean',
        },
        isBlackOrAfricanAmerican: {
          type: 'boolean',
        },
        isNativeHawaiianOrOtherPacificIslander: {
          type: 'boolean',
        },
        isWhite: {
          type: 'boolean',
        },
        noAnswer: {
          type: 'boolean'
        }
      },
    },
    gender: {
      type: 'string',
      enum: [
        "W",
        "M",
        "TW",
        "TM",
        "NB",
        "0",
        "NA"
      ],
    },
    highestLevelOfEducation: {
      type: 'object',
      properties: {
        level: {
          type: 'string',
          enum: [
            'HS',
            'AD',
            'BD',
            'MD',
            'DD',
            'NA'
          ],
        },
        otherEducation: {
          type: 'string',
          minLength: 0,
          maxLength: 30,
        },
      },
    },
    currentlyEmployed: {
      type: 'boolean',
    },
    currentAnnualSalary: {
      type: 'string',
      enum: [
        'lessThanTwenty',
        'twentyToThirtyFive',
        'thirtyFiveToFifty',
        'fiftyToSeventyFive',
        'moreThanSeventyFive',
      ],
    },
    isWorkingInTechIndustry: {
      type: 'boolean',
    },
    techIndustryFocusArea: {
      type: 'string',
      enum: [
        'CP',
        'CS',
        'DP',
        'IS',
        'MA',
        'NA'
      ],
    },
  },
  required: ['veteranFullName', 'veteranDesc', 'contactInfo', 'country']
};

export default schema;


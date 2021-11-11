import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import commonDefinitions from '../../common/definitions';
import addressDefinitions from '../../common/address';

const definitions = cloneDeep(commonDefinitions);

const states50AndDCAndOthers = addressDefinitions.states50AndDC
  .concat([
    { label: 'Guam', value: 'GU' },
    { label: 'Puerto Rico', value: 'PR' },
    { label: 'Virgin Islands', value: 'VI' },
  ])
  .sort((stateA, stateB) => stateA.label.localeCompare(stateB.label));

const dischargeTypeLabels = {
  honorable: 'Honorable',
  general: 'General',
  other: 'Other Than Honorable',
  'bad-conduct': 'Bad Conduct',
  dishonorable: 'Dishonorable',
  undesirable: 'Undesirable',
};

const lastServiceBranchLabels = {
  'air force': 'Air Force',
  army: 'Army',
  'coast guard': 'Coast Guard',
  'marine corps': 'Marine Corps',
  'merchant seaman': 'Merchant Seaman',
  navy: 'Navy',
  noaa: 'Noaa',
  usphs: 'USPHS',
  'f.commonwealth': 'Filipino Commonwealth Army',
  'f.guerilla': 'Filipino Guerilla Forces',
  'f.scouts new': 'Filipino New Scout',
  'f.scouts old': 'Filipino Old Scout',
  other: 'Other',
};



export const serviceBranchEnum = () => {
  return Object.values(lastServiceBranchLabels);
};

export const dischargeTypeEnum = () => {
  return Object.values(dischargeTypeLabels);
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'COVID VACCINATION EXPANSION',
  type: 'object',
  additionalProperties: false,
  definitions: pick(
    definitions,
    'date',
    'ssn',
    'vaFileNumber',
    'phone',
    'email',
    'profileAddress',
    'dateRange',
  ),
  properties: {
    attestation: {
      type: 'object',
      properties: {
        introText: {
          type: 'object',
          properties: {
            'view:introText': {
              type: 'object',
              properties: {},
            },
          },
        },
        applicantType: {
          type: 'string',
          enum: ['veteran', 'spouse', 'caregiverOfVeteran', 'CHAMPVA'],
        },
      },
    },
    militaryHistory: {
      type: 'object',
      properties: {
        lastBranchOfService: {
          type: 'string',
          enum: serviceBranchEnum(),
        },
        dateRange: _.set('required', ['from', 'to'], definitions.dateRange),
        characterOfService: {
          type: 'string',
          enum: dischargeTypeEnum(),
        },
      },
    },
    veteranInformation: {
      type: 'object',
      properties: {
        veteranFirstName: {
          type: 'string',
        },
        veteranLastName: {
          type: 'string',
        },
      },
      required: ['veteranFirstName', 'veteranLastName'],
    },
    personalInformation: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          maxLength: 25,
        },
        middleName: {
          type: 'string',
          maxLength: 25,
        },
        lastName: {
          type: 'string',
          maxLength: 35,
        },
        birthDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        birthSex: {
          type: 'string',
          enum: ['Female', 'Male', 'Prefer not to answer'],
        },
        ssn: {
          type: 'string',
        },
      },
      required: ['firstName', 'lastName', 'birthDate', 'ssn'],
    },
    addressInformation: {
      type: 'object',
      properties: {
        addressLine1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine2: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine3: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        city: {
          type: 'string',
        },
        stateCode: {
          type: 'string',
          enum: states50AndDCAndOthers.map(state => state.value),
          enumNames: states50AndDCAndOthers.map(state => state.label),
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}$',
        },
        emailAddress: {
          type: 'string',
          format: 'email',
        },
        phone: {
          type: 'string',
          pattern: '\\(?\\d{3}\\)?-?\\d{3}-?\\d{4}$',
        },
        smsAcknowledgement: {
          type: 'boolean',
        },
      },
      required: ['city', 'stateCode', 'addressLine1', 'zipCode', 'phone'],
    },
    vaLocation: {
      type: 'object',
      properties: {
        preferredFacility: {
          type: 'string',
        },
      },
    },
  },
};

export default schema;

import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import commonDefinitions from '../../common/definitions';
import addressDefinitions from '../../common/address';

const definitions = cloneDeep(commonDefinitions);

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
    'fullName',
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
        notEligibleText: {
          type: 'object',
          properties: {
            'view:notEligibleText': {
              type: 'object',
              properties: {},
            },
          },
        },
        applicantType: {
          type: 'string',
          enum: ['veteran', 'spouse', 'caregiverEnrolled', 'caregiverOfVeteran', 'CHAMPVA'],
        },
      },
    },
    notEligible: {
      type: 'object',
      properties: {
        eligibility: {
          type: 'string',
        },
      },
    },
    complianceAgreement: {
      type: 'object',
      properties: {
        veteranCertify: {
          type: 'boolean',
        },
        spouseCertify: {
          type: 'boolean',
        },
        caregiverCertify: {
          type: 'boolean',
        },
        champVaRecipientCertify: {
          type: 'boolean',
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
        veteranBirthDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        veteranSsn: {
          type: 'string',
        },
      },
      required: ['veteranBirthDate', 'veteranSsn'],
    },
    personalInformation: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        middleName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        birthDate: {
          type: 'string',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        birthSex: {
          type: 'string',
          enum: ['Male', 'Female', 'Prefer not to answer'],
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
        countryName: {
          type: 'string',
          enum: addressDefinitions.countries.map(country => country.value),
          enumNames: addressDefinitions.countries.map(country => country.label),
        },
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
          enum: addressDefinitions.states50AndDC.map(state => state.value),
          enumNames: addressDefinitions.states50AndDC.map(state => state.label),
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}$',
        },
        emailAddress: {
          type: 'string',
        },
        'view:confirmEmail': {
          type: 'string',
        },
        homePhone: {
          type: 'string',
          pattern: '\\(?\\d{3}\\)?-?\\d{3}-?\\d{4}$',
        },
        mobilePhone: {
          type: 'string',
          pattern: '\\(?\\d{3}\\)?-?\\d{3}-?\\d{4}$',
        },
      },
      required: ['countryName', 'city', 'stateCode', 'addressLine1', 'zipCode', 'homePhone'],
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

import _ from 'lodash';
import constants from '../../common/constants';
import definitions from '../../common/definitions';

const address = {
  type: 'object',
  properties: {
    addressLine1: { type: 'string', minLength: 1, maxLength: 30 },
    addressLine2: { type: 'string', minLength: 1, maxLength: 5 },
    city: { type: 'string', minLength: 1, maxLength: 18 },
    state_code: { type: 'string', minLength: 2, maxLength: 2 },
    country: { type: 'string', minLength: 3, maxLength: 3 },
    zip_code: { type: 'string', "pattern": "^\\d{5}$" },
    zip_code_suffix: { type: 'string', "pattern": "^\\d{4}$" },
  },
  required: ['addressLine1', 'city', 'state_code', 'country', 'zip_code'],
};

const name = {
  type: 'object',
  properties: {
    first: { type: 'string', minLength: 1, maxLength: 12 },
    middle: { type: 'string', minLength: 1, maxLength: 1 },
    last: { type: 'string', minLength: 1, maxLength: 18 },
  },
  required: ['first', 'last'],
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "APPOINTMENT OF INDIVIDUAL AS CLAIMANT'S REPRESENTATIVE",
  type: 'object',
  properties: {
    // Section I VETERAN'S IDENTIFICATION INFORMATION
    veteran: {
      type: 'object',
      properties: {
        name: name,
        ssn: definitions.ssn,
        vaFileNumber: definitions.vaFileNumber,
        dateOfBirth: definitions.date,
        serviceNumber: definitions.veteranServiceNumber,
        serviceBranch: {
          type: 'string',
          enum: ['ARMY', 'NAVY', 'AIR_FORCE', 'MARINE_CORPS', 'COAST_GUARD', 'SPACE_FORCE', 'NOAA', 'USPHS']
        },
        address: address,
        phone: definitions.hcaPhone,
        email: definitions.hcaEmail,
      },
      required: [
        'name',
        'ssn',
        'dateOfBirth',
        'address',
        'phone'
      ],
    },
    // Section II Claimant's Information
    claimant: {
      type: 'object',
      properties: {
        name: name,
        dateOfBirth: definitions.date,
        relationship: definitions.relationship,
        address: address,
        phone: definitions.hcaPhone,
        email: definitions.hcaEmail,
      },
      // If these are required here but the claimant object isn't required at
      // the top level, will that match our use case?  Our use case being that
      // the claimant object isn't required but if it is present, these fields
      // are required.
      required: [
        'name',
        'dateOfBirth',
        'relationship',
        'address',
        'phone'
      ],
    },
    // Section III APPOINTED REPRESENTATIVE'S INFORMATION
    representative: {
      type: 'object',
      properties: {
        id: { type: 'string' },

      },
      required: ['id'],
    },
    // Section IV Authorization Information
    recordConsent: { type: 'boolean' },
    consentAddressChange: { type: 'boolean' },
    consentLimits: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['ALCOHOLISM', 'DRUG_ABUSE', 'HIV', 'SICKLE_CELL'],
      }
    },
  },
  required: [
    'veteran',
    'representative',
    'recordConsent',
    'consentAddressChange',
    'consentLimits',
  ],
};

export default schema;

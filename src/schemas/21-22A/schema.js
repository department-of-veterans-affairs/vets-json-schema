import _ from 'lodash';
import constants from '../../common/constants';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "APPOINTMENT OF INDIVIDUAL AS CLAIMANT'S REPRESENTATIVE",
  type: 'object',
  properties: {
    // Section I VETERAN'S IDENTIFICATION INFORMATION
    veteran: {
      type: 'object',
      properties: {
        name: definitions.hcaFullName,
        ssn: definitions.ssn,
        vaFileNumber: definitions.vaFileNumber,
        dateOfBirth: definitions.date,
        serviceNumber: definitions.veteranServiceNumber,
        serviceBranch: {
          type: 'string',
          enum: ['ARMY', 'NAVY', 'AIR_FORCE', 'MARINE_CORPS', 'COAST_GUARD', 'SPACE_FORCE', 'NOAA', 'USPHS']
        },
        address: definitions.hcaAddress,
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
        name: definitions.hcaFullName,
        dateOfBirth: definitions.date,
        relationship: definitions.relationship,
        address: definitions.hcaAddress,
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

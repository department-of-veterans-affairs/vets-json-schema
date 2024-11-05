import _ from 'lodash';
import constants from '../../common/constants';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR APPOINTING AN ACCREDITED REPRESENTATIVE',
  type: 'object',
  properties: {
    // Section I Veteran's Information
    veteran: {
      type: 'object',
      properties: {
        name: definitions.hcaFullName,
        ssn: definitions.ssn,
        vaFileNumber: definitions.vaFileNumber,
        dateOfBirth: definitions.date,
        serviceNumber: definitions.veteranServiceNumber,
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
    // Section III Service Organization Information
    representative: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        organizationId: { type: 'string' },

      },
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

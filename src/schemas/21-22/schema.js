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
        veteranFullName: definitions.hcaFullName,
        veteranSocialSecurityNumber: definitions.ssn,
        veteranVaFileNumber: definitions.vaFileNumber,
        veteranDateOfBirth: definitions.date,
        veteranServiceNumber: definitions.veteranServiceNumber,
        veteranMailingAddress: definitions.hcaAddress,
        veteranPhone: definitions.hcaPhone,
        veteranEmail: definitions.hcaEmail,
      },
      required: [
        'veteranFullName',
        'veteranSocialSecurityNumber',
        'veteranDateOfBirth',
        'veteranMailingAddress',
        'veteranPhone'
      ],
    },
    // Section II Claimant's Information
    claimant: {
      type: 'object',
      properties: {
        claimantFullName: definitions.hcaFullName,
        claimantDateOfBirth: definitions.date,
        claimantRelationship: definitions.relationship,
        claimantMailingAddress: definitions.hcaAddress,
        claimantPhone: definitions.hcaPhone,
        claimantEmail: definitions.hcaEmail,
      },
      // If these are required here but the claimant object isn't required at
      // the top level, will that match our use case?  Our use case being that
      // the claimant object isn't required but if it is present, these fields
      // are required.
      required: [
        'claimantFullName',
        'claimantDateOfBirth',
        'claimantRelationship',
        'claimantMailingAddress',
        'claimantPhone'
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
    authorizationAccessProtectedRecords: { type: 'boolean' },
    limitationsOfConsent: { 
      type: 'array',
      items: { 
        type: 'string',
        enum: ['ALCOHOLISM', 'DRUG_ABUSE', 'HIV', 'SICKLE_CELL'],
       }
    },



    // Fields we need but I'm unsure how to add as of yet:
    // Org name - string
    // Limitations of consent - Use some kind of enum? - include all option
    // Address change authorization - boolean


    // Does this file need all fields in the PDF, just those we need to 
    // process the form, or those actually present in the front end form
    // experience?



















  },
  required: ['veteranFullName', 'veteranSocialSecurityNumber', 'veteranDateOfBirth', 'veteranMailingAddress', 'veteranPhone'],
};

export default schema;

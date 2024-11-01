import _ from 'lodash';
import constants from '../../common/constants';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR APPOINTING AN ACCREDITED REPRESENTATIVE',
  definitions: {
    date: {
      format: 'date',
      type: 'string',
    },
  },
  type: 'object',
  properties: {
    attachments: (() => {
      const attachments = _.cloneDeep(definitions.files);
      attachments.items.properties.dd214 = { type: 'boolean' };
      return attachments;
    })(),
    veteranFullName: definitions.hcaFullName,
    veteranSocialSecurityNumber: definitions.ssn,
    veteranVaFileNumber: definitions.vaFileNumber,
    veteranDateOfBirth: {
      $ref: '#/definitions/date',
    },
    veteranServiceNumber: definitions.veteranServiceNumber,
    veteranMailingAddress: definitions.hcaAddress,
    veteranPhone: definitions.hcaPhone,
    veteranEmail: definitions.hcaEmail,

    claimantFullName: definitions.hcaFullName,
    claimantDateOfBirth: {
      $ref: '#/definitions/date',
    },
    claimantRelationship: definitions.relationship,
    claimantMailingAddress: definitions.hcaAddress,
    claimantPhone: definitions.hcaPhone,
    claimantEmail: definitions.hcaEmail,

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

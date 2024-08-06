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
    gender: {
      type: 'string',
      enum: constants.genders.map(option => option.value),
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date',
    },
    maritalStatus: definitions.maritalStatus,
    veteranAddress: definitions.hcaAddress,
    veteranHomeAddress: definitions.hcaAddress,
    email: definitions.hcaEmail,
    homePhone: definitions.hcaPhone,
    mobilePhone: definitions.hcaPhone,

    lastServiceBranch: {
      type: 'string',
      enum: constants.branchesServed.map(option => option.value),
    },
    lastEntryDate: {
      $ref: '#/definitions/date',
    },
    lastDischargeDate: {
      $ref: '#/definitions/date',
    },
    dischargeType: definitions.dischargeType,
  },
  required: ['veteranFullName', 'veteranSocialSecurityNumber', 'veteranDateOfBirth', 'gender', 'veteranAddress'],
};

export default schema;

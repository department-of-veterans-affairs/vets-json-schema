import definitions from '../../common/definitions';
import _ from 'lodash';

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR FAMILY MEMBER TO USE TRANSFERRED BENEFITS',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions,
    'privacyAgreementAccepted',
    'ssn'
  ),
  properties: {
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
  },
  required: ['privacyAgreementAccepted']
};

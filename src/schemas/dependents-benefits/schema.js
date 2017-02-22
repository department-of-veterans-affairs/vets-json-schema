import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' APPLICATION FOR VA EDUCATION BENEFITS",
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions,
    'privacyAgreementAccepted',
    'ssn',
    'gender',
  ),
  properties: _.merge({},
    schemaHelpers.getDefinition('privacyAgreementAccepted'),
    schemaHelpers.getDefinition('ssn', 'relativeSocialSecurityNumber'),
    schemaHelpers.getDefinition('gender'),
  ),
  required: ['privacyAgreementAccepted']
};

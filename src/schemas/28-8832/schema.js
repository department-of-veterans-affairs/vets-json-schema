import constants from '../../common/constants';
import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

let schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'EDUCATIONAL/VOCATIONAL COUNSELING APPLICATION (28-8832)',
    type: 'object',
    additionalProperties: false,
    definitions: _.pick(definitions, [
        'fullName',
        'address',
        'phone',
        'ssn',
        'date',
        'privacyAgreementAccepted'
    ]),
    properties: {

    },
    required: ['privacyAgreementAccepted']
};

[].forEach((args) => {
    schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
import schemaHelpers from '../../common/schema-helpers';

let schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'AUTHORIZATION TO DISCLOSE INFORMATION TO THE DEPARTMENT OF VETERANS AFFAIRS (21-4142)',
    type: 'object',
    definitions: {},
    anyOf: [
        {
            "required" : ["veteranVaFileNumber"]
        },
        {
            "required" : ["veteranSocialSecurityNumber"]
        }
    ],
    additionalProperties: false,
    properties: {
        claimantEmail: {
            type: 'string',
            format: 'email'
        },
        limitedConsent: {
            type: 'string'
        },
    },
    required: ['privacyAgreementAccepted', 'claimantFullName']
};

[
    ['fullName', 'claimantFullName'],
    ['ssn', 'veteranSocialSecurityNumber'],
    ['centralMailVaFile', 'veteranVaFileNumber'],
    ['date', 'veteranDateOfBirth'],
    ['centralMailAddress', 'claimantAddress'],
    ['phone', 'applicantPrimaryPhone'],
    ['privacyAgreementAccepted'],

].forEach((args) => {
    schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;
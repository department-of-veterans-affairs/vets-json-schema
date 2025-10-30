import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
    'address',
    'date',
    'email',
    'fullNameNoSuffix',
    'phone',
    'privacyAgreementAccepted',
    'ssn',
    'usaPhone',
    'yesNoSchema',
    'vaFileNumber'
]);

const schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'Authorize VA to disclose personal information to a third party (VA Form 22-10278)',
    type: 'object',
    additionalProperties: false,
    definitions: pickedDefinitions,
    //required: ['claimantPersonalInformation', 'claimantAddress', 'claimantContactInformation', 'statementOfTruthSignature', 'dateSigned'],
    properties: {
        claimantPersonalInformation: {
            type: 'object',
            required: ['fullName', 'ssn', 'dateOfBirth'],
            properties: {
                fullName: { $ref: '#/definitions/fullNameNoSuffix' },
                ssn: {
                    $ref: '#/definitions/ssn',
                },
                vaFileNumber: {
                    $ref: '#/definitions/vaFileNumber',
                },
                dateOfBirth: {
                    $ref: '#/definitions/date',
                },

            },
        },
        claimantAddress: {
            $ref: '#/definitions/address',
        },
        claimantContactInformation: {
            type: 'object',
            required: ['phoneNumber'],
            properties: {
                phoneNumber: {
                    $ref: '#/definitions/phone',
                },
                emailAddress: {
                    $ref: '#/definitions/email',
                },
            },
        },
        thirdPartyPersonName: {
            $ref: '#/definitions/fullNameNoSuffix',
        },
        thirdPartyPersonAddress: {
            $ref: '#/definitions/address',
        },
        thirdPartyOrganizationInformation: {
            type: 'object',
            required: ['organizationName', 'organizationAddress'],
            properties: {
                organizationName: {
                    type: 'string',
                },
                organizationAddress: {
                    $ref: '#/definitions/address',
                },
            } 
        },
        organizationRepresentatives: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                  fullName: { $ref: '#/definitions/fullNameNoSuffix' },
                },
                required: ['fullName'],
            },
        },
        authorizedOfficial: {
            type: 'object',
            properties: {
                fullName: {
                    $ref: '#/definitions/fullNameNoSuffix',
                },
                title: {
                    type: 'string',
                },
                usPhone: {
                    $ref: '#/definitions/usaPhone',
                },
                internationalPhone: {
                    $ref: '#/definitions/phone',
                },
                email: {
                    $ref: '#/definitions/email',
                },
            },
            required: ['fullName', 'title', 'email'],
            anyOf: [
                {
                    required: ['usPhone'],
                },
                {
                    required: ['internationalPhone'],
                },
            ],
            maxProperties: 4,
        },
        privacyAgreementAccepted: {
            $ref: '#/definitions/privacyAgreementAccepted',
        },
        statementOfTruthSignature: {
            type: 'string',
            minLength: 1,
        },
        dateSigned: {
            $ref: '#/definitions/date',
        },
    },
};

export default schema;

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
    //required: ['agreementType', 'authorizedOfficial', 'mainInstitution', 'statementOfTruthSignature', 'dateSigned'],
    properties: {
        claimantInformation: {
            type: 'object',
            required: ['fullName', 'ssn', 'dateOfBirth', 'mailingAddress', 'phoneNumber'],
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
                mailingAddress: {
                    $ref: '#/definitions/address',
                },
                phoneNumber: {
                    $ref: '#/definitions/phone',
                },
                emailAddress: {
                    $ref: '#/definitions/email',
                },
            },
        },
        thirdPartyInformation: {
            type: 'object',
            required: ['fullName', 'address'],
            properties: {
                fullName: { $ref: '#/definitions/fullNameNoSuffix' },
                address: {
                    $ref: '#/definitions/address',
                },

            }
        },
        additionalInstitutions: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    facilityCode: {
                        type: 'string',
                        pattern: '^[a-zA-Z0-9]{8}$',
                    },
                    institutionName: {
                        type: 'string',
                    },
                    institutionAddress: {
                        $ref: '#/definitions/address',
                    },
                    pointOfContact: {
                        type: 'object',
                        properties: {
                            fullName: {
                                $ref: '#/definitions/fullNameNoSuffix',
                            },
                            email: {
                                $ref: '#/definitions/email',
                            },
                        },
                        required: ['fullName', 'email'],
                    },
                },
                required: ['facilityCode', 'institutionName', 'institutionAddress', 'pointOfContact'],
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

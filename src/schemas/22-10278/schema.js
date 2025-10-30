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
                    minLength: 1,
                    maxLength: 30,
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
        claimInformation: {
            type: 'object',
            required: ['claims'],
            properties: {
                claims: {
                    type: 'string',
                    enum: ['statusOfClaim', 'currentBenefit', 'paymentHistory', 'amountOwed', 'minor', 'other'],
                },
                other: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 30,
                },
            },
             oneOf: [
                {
                    type: 'object',
                    properties: {
                        claims: {
                            enum: ['statusOfClaim', 'currentBenefit', 'paymentHistory', 'amountOwed', 'minor']
                        }
                    },
                    required: ['claims']
                },
                {
                    type: 'object',
                    properties: {
                        claims: {
                            enum: ['other']
                        }
                    },
                    required: ['claims', 'other']
                }
            ]
        },
        lengthOfRelease: {
            type: 'object',
            required: ['lengthOfRelease'],
            properties: {
                lengthOfRelease: {
                    type: 'string',
                    enum: ['ongoing', 'date']
                },
                date: {
                    $ref: '#/definitions/date',
                }
            },
            oneOf: [
                {
                    type: 'object',
                    properties: {
                        lengthOfRelease: {
                            enum: ['ongoing']
                        }
                    },
                    required: ['lengthOfRelease']
                },
                {
                    type: 'object',
                    properties: {
                        lengthOfRelease: {
                            enum: ['date']
                        }
                    },
                    required: ['lengthOfRelease', 'date']
                }
            ]
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

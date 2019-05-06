import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
definitions.educationType.enum.push('cooperativeTraining');

let schema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    title: 'REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING (22-1995-STEM)',
    type: 'object',
    additionalProperties: false,
    definitions: _.pick(definitions, [
        'fullName',
        'address',
        'phone',
        'ssn',
        'school',
        'bankAccount',
        'serviceBefore1977',
        'date',
        'dateRange',
        'educationType',
        'preferredContactMethod',
        'privacyAgreementAccepted'
    ]),
    anyOf: [
        {
            "required" : ["vaFileNumber"]
        },
        {
            "required" : ["veteranSocialSecurityNumber"]
        }
    ],
    properties: {
        veteranFullName: {
            $ref: '#/definitions/fullName'
        },
        veteranAddress: {
            $ref: '#/definitions/address'
        },
        homePhone: {
            $ref: '#/definitions/phone'
        },
        mobilePhone: {
            $ref: '#/definitions/phone'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        preferredContactMethod: {
            $ref: '#/definitions/preferredContactMethod'
        },
        veteranSocialSecurityNumber: {
            $ref: '#/definitions/ssn'
        },
        benefit: {
            type: 'string',
            enum: ['chapter33', 'chapter30', 'chapter1606', 'transferOfEntitlement', 'chapter32', 'chapter1607']
        },
        educationType: {
            $ref: '#/definitions/educationType'
        },
        educationObjective: {
            type: 'string'
        },
        programName: {
            type: 'string'
        },
        newSchool: {
            $ref: '#/definitions/school'
        },
        oldSchool: {
            $ref: '#/definitions/school'
        },
        trainingEndDate: {
            $ref: '#/definitions/date'
        },
        reasonForChange: {
            type: 'string'
        },
        bankAccount: {
            $ref: '#/definitions/bankAccount'
        },
        serviceBefore1977: {
            $ref: '#/definitions/serviceBefore1977'
        },
        toursOfDuty: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    serviceBranch: {
                        type: 'string'
                    },
                    dateRange: {
                        $ref: '#/definitions/dateRange'
                    }
                }
            }
        },
        civilianBenefitsAssistance: {
            type: 'boolean'
        },
        nonVaAssistance: {
            type: 'boolean'
        },
        remarks: {
            type: 'string'
        },
        privacyAgreementAccepted: {
            $ref: '#/definitions/privacyAgreementAccepted'
        }
    },
    required: ['privacyAgreementAccepted', 'veteranFullName']
};

[
    ['vaFileNumber'],
    ['bankAccountChange']
].forEach((args) => {
    schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

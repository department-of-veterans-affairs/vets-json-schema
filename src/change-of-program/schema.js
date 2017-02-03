import definitions from '../common/definitions';
import _ from 'lodash';

definitions.educationType.enum.push('cooperativeTraining');

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'REQUEST FOR CHANGE OF PROGRAM OR PLACE OF TRAINING',
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
    'educationType'
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
    vaFileNumber: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    benefit: {
      type: 'string',
      enum: ['chapter33', 'chapter30', 'chapter32', 'chapter1606', 'chapter1607', 'transferOfEntitlement']
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
    bankAccountChange: {
      type: 'string',
      enum: ['start', 'change', 'stop']
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
        },
        required: ['dateRange', 'serviceBranch']
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
    }
  }
};

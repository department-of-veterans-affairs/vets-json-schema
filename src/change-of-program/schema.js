import definitions from '../../src/common/definitions';
import _ from 'lodash';

module.exports = {
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
    'dateRange'
  ]),
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    },
    dayPhone: {
      $ref: '#/definitions/phone'
    },
    nightPhone: {
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
      type: 'object',
      properties: {
        college: { type: 'boolean' },
        correspondence: { type: 'boolean' },
        apprenticeship: { type: 'boolean' },
        cooperativeTraining: { type: 'boolean' },
        tuitionTopUp: { type: 'boolean' },
        flightTraining: { type: 'boolean' },
        licensingReimbursement: { type: 'boolean' },
        testReimbursement: { type: 'boolean' }
      }
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
    reasonForChange: {
      type: 'string'
    },
    bankAccountChange: {
      type: 'string',
      enum: ['startOrChange', 'stop']
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
          },
          involuntarilyCalledToDuty: {
            type: 'boolean'
          },
          serviceStatus: {
            type: 'string'
          },
          nationalGuardType: {
            type: 'string',
            enum: ['title10', 'title32']
          }
        },
        required: ['dateRange', 'serviceBranch']
      }
    }
  }
};

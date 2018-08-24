import definitions from '../../common/definitions';
import _ from "lodash";


let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'AUTHORIZATION TO DISCLOSE INFORMATION TO THE DEPARTMENT OF VETERANS AFFAIRS (21-4142/21-4142a)',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'fullName',
    'ssn',
    'vaFileNumber',
    'date',
    'address',
    'phone',
    'dateRange',
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
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber'
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    },
    email: {
      type: 'string',
    format: 'email'
    },
    phone: {
      $ref: '#/definitions/phone'
    },
    limitedConsent: {
      type: 'string'
    },
    providerFacility: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          providerFacilityName: {
            type: 'string'
          },
          treatmentDateRange: {
            $ref: '#/definitions/dateRange'
          },
          providerFacilityAddress: {
            $ref: '#/definitions/address'
          }
        }
      }
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    }
  },
  required: ['privacyAgreementAccepted', 'veteranFullName']
};

export default schema;
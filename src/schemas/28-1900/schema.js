import constants from '../../common/constants';
import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DISABLED VETERANS APPLICATION FOR VOCATIONAL REHABILITATION (28-1900)',
	type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'fullName',
    'address',
    'phone',
    'ssn',
    'date',
    'dateRange'
  ]),
  properties: {
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    },
    newVeteranAddress: {
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
    vaRecordsOffice: {
      type: 'string',
    },
    yearsOfEducation: {
      type: 'number',
    },
    previousPrograms: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          program: {
            type: 'string'
          },
          date: {
            $ref: '#/definitions/date'
          }
        }
      }
    },
    employerAddress: {
      $ref: '#/definitions/address'
    },
    jobDuties: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    monthlyIncome: {
      type: 'number',
      minimum: 0
    },
    hospitalAddress: {
      $ref: '#/definitions/address'
    },
    disabilityRating: {
      type: 'number'
    },
    serviceHistory: {
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
          dischargeType: {
            type: 'string',
            'enum': constants.dischargeTypes.map(option => option.value)
          },
        }
      }
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['vaFileNumber'],
  ['privacyAgreementAccepted']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

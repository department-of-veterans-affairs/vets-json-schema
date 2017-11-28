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
    'privacyAgreementAccepted'
  ]),
  properties: {
    veteranFullName: {
      $ref: '#/definition/fullName'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definition/ssn'
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
      items: 'string'
    },
    monthlyIncome: {
      type: 'number'
    },
    hospitalAddress: {
      $ref: '#/definitions/address'
    },
    disabilityRating: {
      type: 'number'
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    }
  },
  required: ['privacyAgreementAccepted', 'veteranFullName']
};

[
  ['vaFileNumber'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

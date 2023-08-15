import _ from 'lodash';
import constants from '../../common/constants';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'HEALTH BENEFITS UPDATE FORM (10-10EZR)',
  definitions: {
    dependent: {
      type: 'object',
      properties: {
        fullName: definitions.hcaFullName,
        dependentRelation: {
          enum: constants.dependentRelationships,
          type: 'string',
        },
        socialSecurityNumber: {
          $ref: '#/definitions/ssn',
        },
        becameDependent: {
          $ref: '#/definitions/date',
        },
        dateOfBirth: {
          $ref: '#/definitions/date',
        },
        disabledBefore18: {
          type: 'boolean',
        },
        attendedSchoolLastYear: {
          type: 'boolean',
        },
        dependentEducationExpenses: {
          $ref: '#/definitions/monetaryValue',
        },
        cohabitedLastYear: {
          type: 'boolean',
        },
        receivedSupportLastYear: {
          type: 'boolean',
        },
        grossIncome: {
          $ref: '#/definitions/monetaryValue',
        },
        netIncome: {
          $ref: '#/definitions/monetaryValue',
        },
        otherIncome: {
          $ref: '#/definitions/monetaryValue',
        },
      },
    },
    monetaryValue: {
      type: 'number',
      minimum: 0,
      maximum: 9999999.99,
    },
  },
  type: 'object',
  properties: {
    spouseFullName: definitions.hcaFullName,
    spouseSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    spouseDateOfBirth: {
      $ref: '#/definitions/date',
    },
    dateOfMarriage: {
      $ref: '#/definitions/date',
    },
    sameAddress: {
      type: 'boolean',
    },
    cohabitedLastYear: {
      type: 'boolean',
    },
    provideSupportLastYear: {
      type: 'boolean',
    },
    spouseAddress: {
      $ref: '#/definitions/address',
    },
    spousePhone: {
      $ref: '#/definitions/phone',
    },
    dependents: {
      type: 'array',
      items: {
        $ref: '#/definitions/dependent',
      },
    },
    veteranGrossIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    veteranNetIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    veteranOtherIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    spouseGrossIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    spouseNetIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    spouseOtherIncome: {
      $ref: '#/definitions/monetaryValue',
    },
    deductibleMedicalExpenses: {
      $ref: '#/definitions/monetaryValue',
    },
    deductibleFuneralExpenses: {
      $ref: '#/definitions/monetaryValue',
    },
    deductibleEducationExpenses: {
      $ref: '#/definitions/monetaryValue',
    },
  },
  required: [
  ],
};

export default schema;

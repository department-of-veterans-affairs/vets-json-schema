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
    'date',
    'dateRange'
  ]),
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    vaRecordsOffice: {
      type: 'string',
    },
    yearsOfEducation: {
      type: 'integer',
    },
    previousPrograms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          program: {
            type: 'string'
          },
          date: {
            $ref: '#/definitions/date' // TODO Change if partial dates disallowed
          }
        }
      }
    },
    jobDuties: { // TODO Determine the correct type to use for jobDuties
      type: 'array',
      items: {
        type: 'string'
      }
    },
    monthlyIncome: {
      type: 'number',
      minimum: 0
    },
    disabilityRating: {
      type: 'number'
    },
    disabilities: { // TODO Determine the correct type to use for disabilities
      type: 'array',
      items: {
        type: 'string'
      }
    },
    dtap: { // disabled transition assistance program
      type: 'boolean'
    },
    // TODO We may not need all these booleans depending on stakeholder feedback
    serviceFlags: { 
      type: 'object',
      properties: {
        ww2: {
          type: 'boolean'
        },
        postWw2: {
          type: 'boolean'
        },
        korea: {
          type: 'boolean'
        },
        postKorea: {
          type: 'boolean'
        },
        vietnam: {
          type: 'boolean'
        },
        postVietnam: {
          type: 'boolean'
        },
        gulf: {
          type: 'boolean'
        },
        operationEnduringFreedom: {
          type: 'boolean'
        },
        operationIraqiFreedom: {
          type: 'boolean'
        }
      }
    }
  },
  required: ['privacyAgreementAccepted'] // TODO Determine set of required fields
};

[
  ['vaFileNumber'],
  ['privacyAgreementAccepted'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['date', 'veteranDateOfBirth'], // TODO Change if partial dates disallowed
  ['address', 'veteranAddress'],
  ['address', 'newVeteranAddress'],
  ['address', 'employerAddress'],
  ['address', 'hospitalAddress'],
  ['phone', 'homePhone'],
  ['phone', 'mobilePhone'],
  ['serviceHistory']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

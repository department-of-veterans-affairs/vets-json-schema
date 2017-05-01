import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'INCOME, NET WORTH, AND EMPLOYMENT STATEMENT',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions,
    'dateRange'
  ),
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    locationOfMarriage: {
      type: 'string'
    },
    spouseIsVeteran: {
      type: 'boolean'
    },
    liveWithSpouse: {
      type: 'boolean'
    },
    reasonForNotLivingWithSpouse: {
      type: 'string'
    },
    monthlySpousePayment: {
      type: 'integer'
    },
    disabilities: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          disabilityStartDate: schemaHelpers.getDefinition('date')
        }
      }
    },
    disabilityPension: {
      type: 'boolean'
    },
    hospitalizations: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dateRange: schemaHelpers.getDefinition('dateRange'),
          facilityName: {
            type: 'string'
          },
          address: schemaHelpers.getDefinition('address')
        }
      }
    },
    currentlyEmployed: {
      type: 'boolean'
    },
    lastEmploymentDate: schemaHelpers.getDefinition('date'),
    selfEmployedBeforeDisability: {
      type: 'boolean'
    },
    selfEmploymentBeforeDisability: {
      type: 'string'
    },
    currentlySelfEmployed: {
      type: 'boolean'
    },
    currentSelfEmployment: {
      type: 'string'
    },
    jobs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          employer: {
            type: 'string'
          },
          address: schemaHelpers.getDefinition('address'),
          jobTitle: {
            type: 'string'
          },
          dateRange: schemaHelpers.getDefinition('dateRange'),
          daysMissed: {
            // making this a string so people can answer in words if they don't know the exact number of days
            type: 'string'
          },
          annualEarnings: {
            type: 'integer'
          }
        }
      }
    },
    highestEducationLevel: {
      type: 'string'
    },
    childrenNotInHousehold: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          childFullName: schemaHelpers.getDefinition('fullName'),
          childAddress: schemaHelpers.getDefinition('address'),
          personWhoLivesWithChild: schemaHelpers.getDefinition('fullName'),
          monthlyPayment: {
            type: 'integer'
          }
        }
      }
    },
    childrenInHousehold: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          childFullName: schemaHelpers.getDefinition('fullName'),
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childPlaceOfBirth: {
            type: 'string'
          },
          childSocialSecurityNumber: schemaHelpers.getDefinition('ssn'),
          biological: {
            type: 'boolean'
          },
          adopted: {
            type: 'boolean'
          },
          stepchild: {
            type: 'boolean'
          },
          attendingCollege: {
            type: 'boolean'
          },
          disabled: {
            type: 'boolean'
          },
          previouslyMarried: {
            type: 'boolean'
          }
        }
      }
    }
  },
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['address', 'veteranAddress'],
  ['phone', 'dayPhone'],
  ['phone', 'nightPhone'],
  ['phone', 'mobilePhone'],
  ['maritalStatus'],
  ['date', 'dateOfMarriage'],
  ['fullName', 'spouseFullName'],
  ['date', 'spouseDateOfBirth'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['vaFileNumber', 'spouseVaFileNumber'],
  ['address', 'spouseAddress'],
  ['marriages'],
  ['marriages', 'spouseMarriages']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

(() => {
  let highestEducationLevelEnum = [];

  _.times(12, (i) => {
    highestEducationLevelEnum.push(`grade${i + 1}`);
  });

  _.times(4, (i) => {
    highestEducationLevelEnum.push(`college${i + 1}`);
  });

  highestEducationLevelEnum.push('college4+');

  schema.properties.highestEducationLevel.enum = highestEducationLevelEnum;
})();

export default schema;

import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'INCOME, NET WORTH, AND EMPLOYMENT STATEMENT',
  type: 'object',
  additionalProperties: false,
  definitions: _.merge(_.pick(definitions,
    'dateRange'
  ), {
    netWorth: {
      type: 'object',
      properties: {
        bank: { type: 'integer' },
        interestBank: { type: 'integer' },
        ira: { type: 'integer' },
        stocks: { type: 'integer' },
        realProperty: { type: 'integer' },
        otherProperty: { type: 'integer' },
        additionalSources: { $ref: '#/definitions/additionalSources' }
      }
    },
    additionalSources: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          amount: {
            type: 'integer'
          }
        }
      }
    },
    monthlyIncome: {
      type: 'object',
      properties: {
        socialSecurity: {
          type: 'integer'
        },
        civilService: {
          type: 'integer'
        },
        railroad: {
          type: 'integer'
        },
        blackLung: {
          type: 'integer'
        },
        serviceRetirement: {
          type: 'integer'
        },
        ssi: {
          type: 'integer'
        },
        additionalSources: { $ref: '#/definitions/additionalSources' }
      }
    },
    expectedIncome: {
      type: 'object',
      properties: {
        salary: {
          type: 'integer'
        },
        interest: {
          type: 'integer'
        },
        other: {
          type: 'integer'
        },
        additionalSources: {
          $ref: '#/definitions/additionalSources'
        }
      }
    }
  }),
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
    children: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          childFullName: schemaHelpers.getDefinition('fullName'),
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childNotInHousehold: {
            type: 'boolean'
          },
          childAddress: schemaHelpers.getDefinition('address'),
          personWhoLivesWithChild: schemaHelpers.getDefinition('fullName'),
          monthlyPayment: {
            type: 'integer'
          },
          monthlyIncome: { $ref: '#/definitions/monthlyIncome' },
          expectedIncome: { $ref: '#/definitions/expectedIncome' },
          netWorth: { $ref: '#/definitions/netWorth' },
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
          },
        }
      }
    },
    otherExperience: {
      type: 'string'
    },
    inNursingHome: {
      type: 'boolean'
    },
    nursingHome: {
      type: 'string'
    },
    nursingHomeAddress: schemaHelpers.getDefinition('address'),
    medicaidCoversNursingHome: {
      type: 'boolean'
    },
    appliedForMedicaid: {
      type: 'boolean'
    },
    disabilityBenefits: {
      type: 'boolean'
    },
    annualIncome: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          interest: {
            type: 'integer'
          },
          workersComp: {
            type: 'integer'
          }
        }
      }
    },
    otherExpenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          amount: {
            type: 'integer'
          },
          purpose: {
            type: 'string'
          },
          paidTo: {
            type: 'string'
          },
          disabilityOrRelationship: {
            type: 'string'
          }
        }
      }
    },
    remarks: {
      type: 'string'
    }
  }
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
  // TODO: make sure they allow dates like 2017-01-XX
  ['date', 'dateOfMarriage'],
  ['fullName', 'spouseFullName'],
  ['date', 'spouseDateOfBirth'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['vaFileNumber', 'spouseVaFileNumber'],
  ['address', 'spouseAddress'],
  ['marriages'],
  ['moneyTransfer', 'recentMoneyTransfer'],
  ['moneyTransfer', 'largeMoneyTransfer'],
  ['marriages', 'spouseMarriages'],
  ['date', 'otherExpenses.date'],
  ['netWorth'],
  ['monthlyIncome'],
  ['expectedIncome'],
  ['netWorth', 'spouseNetWorth'],
  ['monthlyIncome', 'spouseMonthlyIncome'],
  ['expectedIncome', 'spouseExpectedIncome'],
  ['bankAccount'],
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

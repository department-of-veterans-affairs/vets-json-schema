import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
definitions.bankAccount.properties.bankName = { type: 'string' };

const financialNumber = {
  type: 'integer',
  default: 0
};

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR PENSION',
  type: 'object',
  additionalProperties: false,
  definitions: _.merge(_.pick(definitions,
    'dateRange',
    'bankAccount'
  ), {
    netWorth: {
      type: 'object',
      properties: {
        bank: financialNumber,
        interestBank: financialNumber,
        ira: financialNumber,
        stocks: financialNumber,
        realProperty: financialNumber,
        otherProperty: financialNumber,
        additionalSources: { $ref: '#/definitions/additionalSources' }
      }
    },
    additionalSources: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name'],
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
        socialSecurity: financialNumber,
        civilService: financialNumber,
        railroad: financialNumber,
        blackLung: financialNumber,
        serviceRetirement: financialNumber,
        ssi: financialNumber,
        additionalSources: { $ref: '#/definitions/additionalSources' }
      }
    },
    expectedIncome: {
      type: 'object',
      properties: {
        salary: financialNumber,
        interest: financialNumber,
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
    altEmail: {
      type: 'string',
      format: 'email'
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
    serviceBranch: {
      type: 'string'
    },
    previousNames: {
      type: 'array',
      items: schemaHelpers.getDefinition('fullName')
    },
    combatSince911: {
      type: 'boolean'
    },
    // 32. I DO NOT want my claim considered for rapid processing under the FDC Program because I plan to submit further evidence in support of my claim.
    noRapidProcessing: {
      type: 'boolean'
    },
    // 29. I CERTIFY THAT I DO NOT HAVE AN ACCOUNT WITH A FINANCIAL INSTITUTION OR CERTIFIED PAYMENT AGENT
    noBankAccount: {
      type: 'boolean'
    },
    // 13A. ARE YOU CURRENTLY ACTIVATED TO FEDERAL ACTIVE DUTY UNDER THE AUTHORITY OF TITLE 10, U.S.C. (National Guard)?
    nationalGuardActivation: {
      type: 'boolean'
    },
    nationalGuard: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        address: schemaHelpers.getDefinition('address'),
        phone: schemaHelpers.getDefinition('usaPhone'),
        date: schemaHelpers.getDefinition('date')
      }
    },
    // 16A-C. DID YOU RECEIVE ANY TYPE OF SEPARATION/SEVERANCE RETIRED PAY?
    severancePay: {
      type: 'object',
      properties: {
        amount: { type: 'integer' },
        type: {
          type: 'string',
          enum: [
            'Longevity',
            'PDRL',
            'Separation',
            'Severance',
            'TDRL'
          ]
        }
      }
    },
    placeOfSeparation: {
      type: 'string'
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
    vaHospitalTreatments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dates: {
            type: 'array',
            items: schemaHelpers.getDefinition('date')
          },
          name: {
            type: 'string'
          },
          location: {
            type: 'string'
          }
        }
      }
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
    dependents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: schemaHelpers.getDefinition('fullName'),
          dependentRelationship: {
            type: 'string',
            enum: [
              'child',
              'parent'
            ]
          },
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childInHousehold: {
            type: 'boolean'
          },
          childAddress: schemaHelpers.getDefinition('address'),
          personWhoLivesWithChild: _.omit(definitions.fullName, 'required'),
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
          childRelationship: {
            type: 'string',
            enum: [
              'biological',
              'adopted',
              'stepchild'
            ]
          },
          attendingCollege: {
            type: 'boolean'
          },
          disabled: {
            type: 'boolean'
          },
          married: {
            type: 'boolean'
          },
          previouslyMarried: {
            type: 'boolean'
          },
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
          relationship: {
            type: 'string'
          }
        }
      }
    }
  }
};

[
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['address', 'veteranAddress'],
  ['usaPhone', 'dayPhone'],
  ['usaPhone', 'nightPhone'],
  ['usaPhone', 'mobilePhone'],
  ['maritalStatus'],
  ['gender'],
  // TODO: make sure they allow dates like 2017-01-XX
  ['dateRange', 'activeServiceDateRange'],
  ['dateRange', 'powDateRange'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'spouseDateOfBirth'],
  ['ssn', 'spouseSocialSecurityNumber'],
  ['vaFileNumber', 'spouseVaFileNumber'],
  ['address', 'spouseAddress'],
  ['marriages'],
  ['marriages', 'spouseMarriages'],
  ['date', 'otherExpenses.date'],
  ['netWorth'],
  ['monthlyIncome'],
  ['expectedIncome'],
  ['netWorth', 'spouseNetWorth'],
  ['monthlyIncome', 'spouseMonthlyIncome'],
  ['expectedIncome', 'spouseExpectedIncome'],
  ['bankAccount'],
  ['files'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

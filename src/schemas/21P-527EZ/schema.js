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
    date: {
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      type: 'string'
    },
    netWorth: {
      type: 'object',
      required: ['bank', 'interestBank', 'ira', 'stocks', 'realProperty', 'additionalSources'],
      properties: {
        bank: financialNumber,
        interestBank: financialNumber,
        ira: financialNumber,
        stocks: financialNumber,
        realProperty: financialNumber,
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
      required: ['socialSecurity', 'civilService', 'railroad', 'blackLung', 'serviceRetirement', 'ssi'],
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
      required: ['salary', 'interest'],
      properties: {
        salary: financialNumber,
        interest: financialNumber,
        additionalSources: {
          $ref: '#/definitions/additionalSources'
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
          date: {
            $ref: '#/definitions/date'
          }
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
    hasVisitedVAMC: {
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
            'Separation',
            'Severance',
            'PDRL',
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
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childInHousehold: {
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
          otherExpenses: { $ref: '#/definitions/otherExpenses' },
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
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
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
  ['netWorth'],
  ['monthlyIncome'],
  ['expectedIncome'],
  ['otherExpenses'],
  ['netWorth', 'spouseNetWorth'],
  ['monthlyIncome', 'spouseMonthlyIncome'],
  ['expectedIncome', 'spouseExpectedIncome'],
  ['otherExpenses', 'spouseOtherExpenses'],
  ['bankAccount'],
  ['files'],
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

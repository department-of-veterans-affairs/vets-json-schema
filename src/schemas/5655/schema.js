import schemaHelpers from '../../common/schema-helpers';
import definitions from '../../common/definitions';
import { countries, states50AndDC } from '../../common/constants';

const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const employmentHistory = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      occupationName: {
        type: 'string',
      },
      from: {
        type: 'string',
      },
      to: {
        type: 'string',
      },
      employerName: {
        type: 'string',
      },
      employerAddress: definitions.address,
    },
  },
};

const personalData = {
  type: 'object',
  required: [
    'veteranFullName',
    'veteranAddress',
    'phoneNumber',
    'dateOfBirth',
    'married',
  ],
  properties: {
    veteranFullName: definitions.fullName,
    veteranAddress: buildDefinitionReference('address'),
    phoneNumber: buildDefinitionReference('phone'),
    dateOfBirth: buildDefinitionReference('date'),
    married: {
      type: 'boolean',
    },
    spouseFullName: buildDefinitionReference('fullName'),
    agesOfOtherDependents: {
      type: 'array',
      items: {
        type: 'integer',
      },
    },
    employmentHistory: {
      veteran: employmentHistory,
      spouse: employmentHistory,
    },
  },
};

const income = {
  type: 'object',
  properties: {
    monthlyGrossSalary: {
      type: 'integer',
    },
    deductions: {
      type: 'object',
      properties: {
        taxes: {
          type: 'integer',
        },
        retirement: {
          type: 'integer',
        },
        socialSecurity: {
          type: 'integer',
        },
        other: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              deductionName: {
                type: 'string',
              },
              deductionAmount: {
                type: 'integer',
              },
            },
          },
        },
        totalDeductions: {
          type: 'integer',
        },
        netTakeHomePay: {
          type: 'integer',
        },
        otherIncome: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              amount: {
                type: 'integer',
              },
            },
          },
        },
        totalMonthlyNetIncome: {
          type: 'integer'
        }
      },
    },
  },
};

const incomes = {
  type: 'object',
  properties: {
    veteran: income,
    spouse: income,
  },
};

const expenses = {
  type: 'object',
  properties: {
    rentOrMortgage: {
      type: 'integer',
    },
    food: {
      type: 'integer',
    },
    utilities: {
      type: 'integer',
    },
    other: {
      type: ['integer', 'null'],
    },
    installmentContractsAndOtherDebts: {
      type: 'integer',
    },
    totalMonthlyExpenses: {
      type: 'integer',
    },
  },
};

const discretionaryIncome = {
  type: 'object',
  properties: {
    netMonthlyIncomeLessExpenses: {
      type: 'integer',
    },
    amountCanBePaidTowardDebt: {
      type: 'integer',
    },
  },
};

const assets = {
  type: 'object',
  properties: {
    cashInBank: {
      type: 'integer',
    },
    cashOnHand: {
      type: 'integer',
    },
    automobiles: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          make: {
            type: 'string',
          },
          model: {
            type: 'string',
          },
          year: {
            type: 'integer',
          },
          resaleValue: {
            type: 'integer',
          },
        },
      },
    },
    trailerBoatsCampers: {
      type: 'integer',
    },
    usSavingsBonds: {
      type: 'integer',
    },
    stocksAndOtherBonds: {
      type: 'integer',
    },
    realEstateOwned: {
      type: 'integer',
    },
    otherAssets: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          assetName: {
            type: 'string',
          },
          assetValue: {
            type: 'integer',
          },
        },
      },
    },
    totalAssets: {
      type: 'integer',
    },
  },
};

const installmentContractsAndOtherDebts = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      creditorName: {
        type: 'string',
      },
      creditorAddress: buildDefinitionReference('address'),
      dateStarted: buildDefinitionReference('date'),
      purpose: {
        type: 'string',
      },
      originalAmount: {
        type: 'integer',
      },
      unpaidBalance: {
        type: 'integer',
      },
      amountDueMonthly: {
        type: 'integer',
      },
      amountPastDue: {
        type: 'integer',
      },
    },
  },
};

const additionalData = {
  type: 'object',
  properties: {
    bankruptcy: {
      type: 'object',
      properties: {
        hasBeenAdjudicatedBankrupt: {
          type: 'boolean',
        },
        dateDischarged: buildDefinitionReference('date'),
        courtLocation: {
          type: 'string',
        },
        docketNumber: {
          type: 'string',
        },
      },
    },
    additionalComments: {
      type: 'string',
    },
  },
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'FINANCIAL STATUS REPORT',
  type: 'object',
  definitions: {
    addressSchema: {
      type: 'object',
      properties: {
        'view:livesOnMilitaryBase': {
          type: 'boolean',
        },
        'view:livesOnMilitaryBaseInfo': {
          type: 'object',
          properties: {},
        },
        countryName: {
          type: 'string',
          enum: countries.map(country => country.value),
          enumNames: countries.map(country => country.label),
        },
        addressLine1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine2: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine3: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        city: {
          type: 'string',
        },
        stateCode: {
          type: 'string',
          enum: states50AndDC.map(state => state.value),
          enumNames: states50AndDC.map(state => state.label),
        },
        province: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}$',
        },
        internationalPostalCode: {
          type: 'string',
        },
      },
    },
  },
  properties: {
    personalData: {
      type: 'object',
      properties: {
        fullName: definitions.fullName,
        address: definitions.address,
        fileNumber: definitions.vaFileNumber,
        dateOfBirth: definitions.date,
        married: {
          type: 'boolean'
        },
        spouseFullName: definitions.fullName,
        agesOfOtherDependents: {
          type: 'array',
          items: {
            type: 'integer'
          }
        },
        employmentHistory: {
          type: 'object',
          properties: {
            veteran: employmentHistory,
            spouse: employmentHistory,
          },
        },
      },
    },
    income: incomes,
    expenses: expenses,
    discretionaryIncome: discretionaryIncome,
    assets: assets,
  },
};

export default schema;
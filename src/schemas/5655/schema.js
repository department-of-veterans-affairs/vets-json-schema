import schemaHelpers from '../../common/schema-helpers';

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
      employerAddress: buildDefinitionReference('address'),
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
    veteranFullName: buildDefinitionReference('fullname'),
    veteranAddress: buildDefinitionReference('address'),
    phoneNumber: buildDefinitionReference('phone'),
    dateOfBirth: buildDefinitionReference('date'),
    married: {
      type: 'boolean',
    },
    spouseFullName: buildDefinitionReference('fullname'),
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
      type: 'integer',
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
  netMonthlyIncomeLessExpenses: {
    type: 'integer',
  },
  amountCanBePaidTowardDebt: {
    type: 'integer',
  },
};

const assets = {
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
    type: 'intger',
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
  additionalProperties: false,
  anyOf: [
    {
      required: ['vaFileNumber'],
    },
    {
      required: ['veteranSocialSecurityNumber'],
    },
  ],
  required: [
    'personalData',
    'income',
    'expenses',
    'discretionaryIncome',
    'assets',
    'installmentContractsAndOtherDebts',
    'additionalData',
  ],
  properties: {
    personalData: personalData,
    income: incomes,
    expenses: expenses,
    discretionaryIncome: discretionaryIncome,
    assets: assets,
    installmentContractsAndOtherDebts: installmentContractsAndOtherDebts,
    additionalData: additionalData,
  },
};

export default schema;

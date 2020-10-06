import definitions from '../../common/definitions';

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
  properties: {
    fullName: buildDefinitionReference('fullName'),
    address: buildDefinitionReference('address'),
    fileNumber: buildDefinitionReference('vaFileNumber'),
    dateOfBirth: buildDefinitionReference('date'),
    married: {
      type: 'boolean'
    },
    spouseFullName: buildDefinitionReference('fullName'),
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
        dateDischarged: buildDefinitionReference('nullableDate'),
        courtLocation: {
          type: ['string', 'null'],
        },
        docketNumber: {
          type: ['string', 'null'],
        },
      },
    },
    additionalComments: {
      type: ['string', 'null'],
    },
  },
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'FINANCIAL STATUS REPORT',
  type: 'object',
  definitions: {
    fullName: definitions.fullName,
    address: definitions.address,
    vaFileNumber: definitions.vaFileNumber,
    date: definitions.date,
    nullableDate: definitions.nullableDate,
  },
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
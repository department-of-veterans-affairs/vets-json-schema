import definitions from '../../common/definitions';

const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const employmentHistory = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      veteranORSpouse: {
        type: 'string',
      },
      occupationName: {
        type: 'string',
      },
      from: {
        type: 'string',
      },
      to: {
        type: 'string',
      },
      present: {
        type: 'boolean',
      },
      employerName: {
        type: 'string',
      },
      employerAddress: buildDefinitionReference('address'),
    },
  },
};

const address = {
  type: 'object',
  properties: {
    addresslineOne: {
      type: 'string'
    },
    addresslineTwo: {
      type: 'string'
    },
    addresslineThree: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    stateORProvince: {
      type: 'string'
    },
    zipORPostalCode: {
      type: 'string'
    },
    countryName: {
      type: 'string'
    },
  },
};

const personalIdentification = {
  type: 'object',
  properties: {
    sSN: buildDefinitionReference('ssn'),
    fileNumber: buildDefinitionReference('vaFileNumber'),
    fsrReason: {
      type: 'string'
    },
  },
};

const personalData = {
  type: 'object',
  properties: {
    veteranFullName: buildDefinitionReference('fullName'),
    address: buildDefinitionReference('address'),
    telephoneNumber: buildDefinitionReference('phone'),
    dateOfBirth: buildDefinitionReference('date'),
    married: {
      type: 'boolean'
    },
    spouseFullName: buildDefinitionReference('fullName'),
    agesOfOtherDependents: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    employmentHistory: buildDefinitionReference('employmentHistory'),
  },
};

const income = {
  type: 'object',
  properties: {
    veteranORSpouse: {
      type: 'string'
    },
    monthlyGrossSalary: {
      type: 'string',
    },
    deductions: {
      type: 'object',
      properties: {
        taxes: {
          type: 'string',
        },
        retirement: {
          type: 'string',
        },
        socialSecurity: {
          type: 'string',
        },
        otherDeductions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              amount: {
                type: 'string',
              },
            },
          },
        },
        totalDeductions: {
          type: 'string',
        },
        netTakeHomePay: {
          type: 'string',
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
                type: 'string',
              },
            },
          },
        },
        totalMonthlyNetIncome: {
          type: 'string'
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
      type: 'string',
    },
    food: {
      type: 'string',
    },
    utilities: {
      type: 'string',
    },
    otherLivingExpenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          amount: {
            type: 'string',
          },
        },
      },
    },
    installmentContractsAndOtherDebts: {
      type: 'string',
    },
    totalMonthlyExpenses: {
      type: 'string',
    },
  },
};

const discretionaryIncome = {
  type: 'object',
  properties: {
    netMonthlyIncomeLessExpenses: {
      type: 'string',
    },
    amountCanBePaidTowardDebt: {
      type: 'string',
    },
  },
};

const assets = {
  type: 'object',
  properties: {
    cashInBank: {
      type: 'string',
    },
    cashOnHand: {
      type: 'string',
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
            type: 'string',
          },
          resaleValue: {
            type: 'string',
          },
        },
      },
    },
    trailersBoatsCampers: {
      type: 'string',
    },
    usSavingsBonds: {
      type: 'string',
    },
    stocksAndOtherBonds: {
      type: 'string',
    },
    realEstateOwned: {
      type: 'string',
    },
    otherAssets: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          amount: {
            type: 'string',
          },
        },
      },
    },
    totalAssets: {
      type: 'string',
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
        type: 'string',
      },
      unpaidBalance: {
        type: 'string',
      },
      amountDueMonthly: {
        type: 'string',
      },
      amountPastDue: {
        type: 'string',
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
    personalIdentification: definitions.personalIdentification,
    fullName: definitions.fullName,
    address: address,
    phone: definitions.phone,
    vaFileNumber: definitions.vaFileNumber,
    date: definitions.date,
    nullableDate: definitions.nullableDate,
    ssn: definitions.ssn,
    employmentHistory: employmentHistory,
  },
  properties: {
    personalIdentification: personalIdentification,
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
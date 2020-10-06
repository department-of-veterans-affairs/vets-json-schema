import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';

const schema = schemas['5655'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

const validAddress = {
  country: 'USA',
  state: 'MO',
  postalCode: '00000',
  street: '123 Fake Street',
  city: 'Fakerville'
};

const testData = {
  married: {
    valid: [true, false],
    invalid: [0, 'invalid'],
  },
  agesOfOtherDependents: {
    valid: [[8, 20]],
    invalid: [false, 'invalid']
  },
  employmentHistory: {
    valid: [[
      {
        occupationName: 'valid job name',
        from: '2015-10',
        to: '2020-01',
        employerName: 'widgets inc.',
        employerAddress: validAddress,
      },
    ]],
    invalid: [[
      {
        occupationName: false,
        from: 2020,
        to: true,
        employerName: 1.5,
        employerAddress: null,
      },
    ]],
  },
  income: {
    valid: [
      {
        monthlyGrossSalary: 450000,
        deductions: {
          taxes: 67500,
          retirement: 67500,
          socialSecurity: 67500,
          other: [
            {
              deductionName: 'health savings account',
              deductionAmount: 50000,
            },
          ],
        },
        totalDeductions: 252500,
        netTakeHomePay: 197500,
        otherIncome: [
          {
            name: 'VA Disability Compensation',
            amount: 150000,
          },
        ],
        totalMonthlyNetIncome: 347500,
      },
    ],
    invalid: [
      {
        monthlyGrossSalary: true,
        deductions: {
          taxes: 'invalid',
          retirement: 67500,
          socialSecurity: 67500,
          other: [
            {
              deductionName: null,
              deductionAmount: 50000,
            },
          ],
        },
        totalDeductions: 252500,
        netTakeHomePay: 197500,
        otherIncome: [
          {
            name: 'VA Disability Compensation',
            amount: 150000,
          },
        ],
        totalMonthlyNetIncome: 347500,
      },
    ],
  },
  expenses:{
    valid: [
      {
        rentOrMortgage: 100000,
        food: 60000,
        utilities: 30000,
        other: null,
        installmentContractsAndOtherDebts: 50000,
        totalMonthlyExpenses: 240000,
      },
    ],
    invalid: [
      {
        rentOrMortgage: true,
        food: 'no',
        utilities: 30000,
        other: null,
        installmentContractsAndOtherDebts: 50000,
        totalMonthlyExpenses: 240000,
      },
    ],
  },
  discretionaryIncome: {
    valid: [
      {
        netMonthlyIncomeLessExpenses: 107500,
        amountCanBePaidTowardDebt: 107500,
      },
    ],
    invalid: [
      {
        netMonthlyIncomeLessExpenses: null,
        amountCanBePaidTowardDebt: true,
      },
    ],
  },
  assets: {
    valid: [
      {
        cashInBank: 1000000,
        cashOnHand: 300000,
        automobiles: [
          {
            make: 'Pontiac',
            model: 'Grand AM',
            year: 1999,
            resaleValue: 200000
          }
        ],
        trailersBoatsCampers: 0,
        usSavingsBonds: 0,
        stocksAndOtherBonds: 10000000,
        realEstateOwned: 25000000,
        otherAssets: [
          {
            assetName: 'gold',
            assetValue: 2500000
          }
        ],
        totalAssets: 39000000
      },
    ],
    invalid: [
      {
        cashInBank: null,
        cashOnHand: 300000,
        automobiles: [
          {
            make: 77,
            model: 'Grand AM',
            year: 1999,
            resaleValue: 200000
          }
        ],
        trailersBoatsCampers: null,
        usSavingsBonds: null,
        stocksAndOtherBonds: true,
        realEstateOwned: 25000000,
        otherAssets: [
          {
            assetName: 'gold',
            assetValue: 2500000
          }
        ],
        totalAssets: 39000000
      },
    ],
  },
  installmentContractsAndOtherDebts: {
    valid: [[
      {
        creditorName: 'Faker Bank',
        creditorAddress: {
          street: '555 Bogus Street',
          city: 'Fakerville',
          state: 'CO',
          country: 'USA',
          postalCode: '11111'
        },
        dateStarted: '2017-05-01',
        purpose: 'debt consolidation loan',
        originalAmount: 1500000,
        unpaidBalance: 100000,
        amountDueMonthly: 50000,
        amountPastDue: 0
      }
    ]],
    invalid: [[
      {
        creditorName: 'Faker Bank',
        creditorAddress: {
          street: '555 Bogus Street',
          city: 'Fakerville',
          state: 'CO',
          country: 'USA',
          postalCode: '11111'
        },
        dateStarted: null,
        purpose: 'debt consolidation loan',
        originalAmount: 1500000,
        unpaidBalance: 100000,
        amountDueMonthly: 50000,
        amountPastDue: true
      }
    ]],
  },
  additionalData: {
    valid: [
      {
        bankruptcy: {
          hasBeenAdjucatedBankrupt: false,
          dateDischarged: null,
          courtLocation: null,
          docketNumber: null
        },
        additionalComments: null
      }
    ],
    invalid: [
      {
        bankruptcy: {
          hasBeenAdjucatedBankrupt: 1,
          dateDischarged: null,
          courtLocation: 30,
          docketNumber: null
        },
        additionalComments: null
      }
    ],
  },
};

describe('5655 schema', () => {
  sharedTests.runTest('fullName', ['personalData.fullName', 'personalData.spouseFullName']);
  sharedTests.runTest('address', ['personalData.address']);
  sharedTests.runTest('date', ['personalData.dateOfBirth']);
  schemaTestHelper.testValidAndInvalid('personalData.married', testData.married);
  schemaTestHelper.testValidAndInvalid('personalData.agesOfOtherDependents', testData.agesOfOtherDependents);
  schemaTestHelper.testValidAndInvalid('personalData.employmentHistory.veteran', testData.employmentHistory);
  schemaTestHelper.testValidAndInvalid('personalData.employmentHistory.spouse', testData.employmentHistory);
  schemaTestHelper.testValidAndInvalid('income.veteran', testData.income);
  schemaTestHelper.testValidAndInvalid('income.spouse', testData.income);
  schemaTestHelper.testValidAndInvalid('expenses', testData.expenses);
  schemaTestHelper.testValidAndInvalid('discretionaryIncome', testData.discretionaryIncome);
  schemaTestHelper.testValidAndInvalid('assets', testData.assets);
  schemaTestHelper.testValidAndInvalid('installmentContractsAndOtherDebts', testData.installmentContractsAndOtherDebts);
  schemaTestHelper.testValidAndInvalid('additionalData', testData.additionalData);
});

import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);

const financialNumber = {
  type: 'number',
  default: 0,
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'UPDATE INCOME AND ASSETS EVIDENCE',
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
  definitions: _.merge(_.pick(definitions, 'dateRange'), {
    date: {
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      type: 'string',
    },
    relationshipToVeteran: {
      type: 'string',
      enum: ['VETERAN', 'SPOUSE', 'CUSTODIAN', 'CHILD', 'PARENT', 'OTHER'],
    },
    addedFunds: {
      type: 'array',
      items: {
        type: 'object',
        required: ['fundsAddedDate', 'amountAdded'],
        properties: {
          fundsAddedDate: schemaHelpers.getDefinition('date'),
          amountAdded: financialNumber,
        },
      },
    },
    unassociatedIncomes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipientRelationship', 'incomeType', 'grossMonthlyIncome', 'payer'],
        properties: {
          recipientName: { type: 'string' },
          recipientRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherRecipientRelationshipType: { type: 'string' },
          incomeType: {
            type: 'string',
            enum: ['SOCIAL_SECURITY', 'RETIREMENT_PENSION', 'WAGES', 'UNEMPLOYMENT', 'CIVIL_SERVICE', 'OTHER'],
          },
          otherIncomeType: { type: 'string' },
          grossMonthlyIncome: financialNumber,
          payer: { type: 'string' },
        },
      },
    },
    associatedIncomes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipientRelationship', 'incomeType', 'grossMonthlyIncome', 'payer', 'accountValue'],
        properties: {
          recipientName: { type: 'string' },
          recipientRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherRecipientRelationshipType: { type: 'string' },
          incomeType: {
            type: 'string',
            enum: ['INTEREST', 'DIVIDENDS', 'OTHER'],
          },
          otherIncomeType: { type: 'string' },
          grossMonthlyIncome: financialNumber,
          payer: { type: 'string' },
          accountValue: financialNumber,
        },
      },
    },
    ownedAssets: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipientRelationship', 'assetType', 'grossMonthlyIncome', 'payer'],
        properties: {
          recipientName: { type: 'string' },
          recipientRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherRecipientRelationshipType: { type: 'string' },
          assetType: {
            type: 'string',
            enum: ['FARM', 'BUSINESS', 'RENTAL_PROPERTY'],
          },
          otherIncomeType: { type: 'string' },
          grossMonthlyIncome: financialNumber,
          payer: { type: 'string' },
          ownedPortionValue: financialNumber,
        },
      },
    },
    royaltiesAndOtherProperties: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipientRelationship', 'assetType', 'grossMonthlyIncome', 'payer'],
        properties: {
          recipientName: { type: 'string' },
          recipientRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherRecipientRelationshipType: { type: 'string' },
          incomeGenerationMethod: {
            type: 'string',
            enum: ['INTELLECTUAL_PROPERTY', 'MINERALS_LUMBER', 'USE_OF_LAND', 'OTHER'],
          },
          otherIncomeType: { type: 'string' },
          grossMonthlyIncome: financialNumber,
          fairMarketValue: financialNumber,
          canBeSold: { type: 'boolean' },
          mitigatingCircumstances: { type: 'string' },
        },
      },
    },
    assetTransfers: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'originalOwnerRelationship',
          'transferMethod',
          'assetType',
          'payer',
          'newOwnerName',
          'newOwnerRelationship',
          'saleReportedToIrs',
          'transferDate',
          'assetTransferredUnderFairMarketValue',
          'fairMarketValue',
          'saleValue',
          'capitalGainValue',
        ],
        properties: {
          originalOwnerRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherOriginalOwnerRelationshipType: { type: 'string' },
          transferMethod: {
            type: 'string',
            enum: ['SOLD', 'GIFTED', 'CONVEYED', 'TRADED', 'OTHER'],
          },
          otherTransferMethod: { type: 'string' },
          assetType: { type: 'string' },
          newOwnerName: { type: 'string' },
          newOwnerRelationship: { type: 'string' },
          saleReportedToIrs: { type: 'boolean' },
          transferDate: schemaHelpers.getDefinition('date'),
          assetTransferredUnderFairMarketValue: { type: 'boolean' },
          fairMarketValue: financialNumber,
          saleValue: financialNumber,
          capitalGainValue: financialNumber,
        },
      },
    },
    trusts: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'establishmentDate',
          'marketValueAtEstablishment',
          'trustType',
          'addedFundsAfterEstablishment',
          'receivingIncomeFromTrust',
          'trustUsedForMedicalExpenses',
          'trustEstablishedForVeteransChild',
          'haveAuthorityOrControlOfTrust',
        ],
        properties: {
          establishedDate: schemaHelpers.getDefinition('date'),
          marketValueAtEstablishment: financialNumber,
          trustType: {
            type: 'string',
            enum: ['REVOCABLE', 'IRREVOCABLE', 'BURIAL'],
          },
          addedFundsAfterEstablishment: { type: 'boolean' },
          addedFunds: schemaHelpers.getDefinition('addedFunds'),
          receivingIncomeFromTrust: { type: 'boolean' },
          annualReceivedIncome: financialNumber,
          trustUsedForMedicalExpenses: { type: 'boolean' },
          monthlyMedicalReimbursementAmount: financialNumber,
          trustEstablishedForVeteransChild: { type: 'boolean' },
          haveAuthorityOrControlOfTrust: { type: 'boolean' },
        },
      },
    },
    annuities: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'establishedDate',
          'marketValueAtEstablishment',
          'addedFundsAfterEstablishment',
          'revocable',
          'receivingIncomeFromAnnuity',
          'canBeLiquidated',
        ],
        properties: {
          establishedDate: schemaHelpers.getDefinition('date'),
          marketValueAtEstablishment: financialNumber,
          addedFundsAfterEstablishment: { type: 'boolean' },
          addedFunds: schemaHelpers.getDefinition('addedFunds'),
          revocable: { type: 'boolean' },
          receivingIncomeFromAnnuity: { type: 'boolean' },
          annualReceivedIncome: financialNumber,
          canBeLiquidated: { type: 'boolean' },
          surrenderValue: financialNumber,
        },
      },
    },
    unreportedAssets: {
      type: 'array',
      items: {
        type: 'object',
        required: ['assetOwnerRelationship', 'ownedPortionValue', 'assetType', 'assetLocation'],
        properties: {
          assetOwnerRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherAssetOwnerRelationshipType: { type: 'string' },
          ownedPortionValue: financialNumber,
          assetType: { type: 'string' },
          assetLocation: { type: 'string' },
        },
      },
    },
    discontinuedIncomes: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'recipientRelationship',
          'payer',
          'incomeType',
          'incomeFrequency',
          'incomeLastReceivedDate',
          'grossAnnualAmount',
        ],
        properties: {
          recipientRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherRecipientRelationshipType: { type: 'string' },
          recipientName: { type: 'string' },
          payer: { type: 'string' },
          incomeType: { type: 'string' },
          incomeFrequency: {
            type: 'string',
            enum: ['RECURRING', 'IRREGULAR', 'ONE_TIME'],
          },
          incomeLastReceivedDate: schemaHelpers.getDefinition('date'),
          grossAnnualAmount: financialNumber,
        },
      },
    },
    incomeReceiptWaivers: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipientRelationship', 'payer', 'waivedGrossMonthlyIncome'],
        properties: {
          recipientRelationship: schemaHelpers.getDefinition('relationshipToVeteran'),
          otherRecipientRelationshipType: { type: 'string' },
          recipientName: { type: 'string' },
          payer: { type: 'string' },
          expectedIncome: financialNumber,
          paymentResumeDate: schemaHelpers.getDefinition('date'),
          waivedGrossMonthlyIncome: financialNumber,
        },
      },
    },
  }),
  properties: {
    claimantType: {
      type: 'string',
    },
    dateReceivedByVa: { type: 'boolean' },
    hasUnassociatedIncomes: { type: 'boolean' },
    unassociatedIncomes: schemaHelpers.getDefinition('unassociatedIncomes'),
    hasAssociatedIncomes: { type: 'boolean' },
    associatedIncomes: schemaHelpers.getDefinition('associatedIncomes'),
    hasOwnedAssets: { type: 'boolean' },
    ownedAssets: schemaHelpers.getDefinition('ownedAssets'),
    hasRoyaltiesAndOtherProperties: { type: 'boolean' },
    royaltiesAndOtherProperties: schemaHelpers.getDefinition('royaltiesAndOtherProperties'),
    hasAssetTransfers: { type: 'boolean' },
    assetTransfers: schemaHelpers.getDefinition('assetTransfers'),
    hasTrusts: { type: 'boolean' },
    trusts: schemaHelpers.getDefinition('trusts'),
    hasAnnuities: { type: 'boolean' },
    annuities: schemaHelpers.getDefinition('annuities'),
    hasUnreportedAssets: { type: 'boolean' },
    unreportedAssets: schemaHelpers.getDefinition('unreportedAssets'),
    hasDiscontinuedIncomes: { type: 'boolean' },
    discontinuedIncomes: schemaHelpers.getDefinition('discontinuedIncomes'),
    hasIncomeReceiptWaivers: { type: 'boolean' },
    incomeReceiptWaivers: schemaHelpers.getDefinition('incomeReceiptWaivers'),
    statementOfTruthCertified: {
      type: 'string',
    },
    statementOfTruthSignature: {
      type: 'string',
    },
  },
  required: ['veteranFullName', 'statementOfTruthCertified', 'statementOfTruthSignature'],
};

[
  ['fullName', 'veteranFullName'],
  ['fullName', 'claimantFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['ssn', 'claimantSocialSecurityNumber'],
  ['centralMailVaFile', 'vaFileNumber'],
  ['usaPhone', 'claimantPhone'],
  ['dateRange', 'incomeNetWorthDateRange'],
  ['files'],
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

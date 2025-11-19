import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR D.I.C., SURVIVORS PENSION, AND/OR ACCRUED BENEFITS (21P-534EZ)',
  type: 'object',
  definitions: {},
  properties: {
    // Section 1 VETERAN'S INFORMATION
    veteranFullName: definitions.fullName,
    veteranDateOfBirth: definitions.date,
    veteranSocialSecurityNumber: {
      type: 'object',
      properties: {
        ssn: definitions.ssn,
        vaFileNumber: definitions.fileNumber,
      },
    },
    vaClaimsHistory: definitions.yesNo,
    diedOnDuty: definitions.yesNo,
    veteranDateOfDeath: definitions.date,
    // SECTION 2 CLAIMANT'S INFORMATION
    claims: {
      type: 'object',
      properties: {
        dependencyIndemnityComp: definitions.checkbox,
        survivorsPension: definitions.checkbox,
        accruedBenefits: definitions.checkbox,
      },
    },
    claimantRelationship: {
      type: 'string',
      enum: ['SPOUSE', 'CUSTODIAN', 'ADULT_CHILD_STILL_IN_SCHOOL', 'ADULT_CHILD_SERIOUSLY_DISABLED'],
    },
    claimantFullName: definitions.fullName,
    claimantDateOfBirth: definitions.date,
    claimantSocialSecurityNumber: definitions.ssn,
    claimantIsVeteran: definitions.yesNo,
    email: definitions.email,
    primaryPhone: definitions.phone,
    claimantAddress: definitions.address,
    // SECTION 3 MILITARY HISTORY
    nationalGuardActivated: definitions.yesNo,
    dateOfActivation: definitions.date,
    unitName: { type: 'string' },
    unitPhoneNumber: definitions.phone,
    unitAddress: definitions.address,
    powPeriod: {
      type: 'object',
      properties: {
        from: definitions.date,
        to: definitions.date,
      },
    },
    prisonerOfWar: definitions.yesNo,
    branchOfService: {
      type: 'object',
      properties: {
        ARMY: { type: 'boolean' },
        NAVY: { type: 'boolean' },
        AIR_FORCE: { type: 'boolean' },
        COAST_GUARD: { type: 'boolean' },
        MARINE_CORPS: { type: 'boolean' },
        SPACE_FORCE: { type: 'boolean' },
        USPHS: { type: 'boolean' },
        NOAA: { type: 'boolean' },
      },
    },
    dateInitiallyEnteredActiveDuty: definitions.date,
    finalReleaseDateFromActiveDuty: definitions.date,
    cityStateOrForeignCountry: { type: 'string' },
    receivedBenefits: definitions.yesNo,
    otherServiceNames: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          otherServiceName: definitions.fullName,
        },
      },
    },
    // SECTION 4 HOUSEHOLD INFORMATION
    additionalMarriages: definitions.yesNo,
    dependents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentFullName: definitions.fullName,
          dependentSocialSecurityNumber: definitions.ssn,
          noSSN: { type: 'boolean' },
          dateOfBirth: definitions.date,
          bornOutsideUS: { type: 'boolean' },
          birthPlace: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
        },
      },
    },
    awareOfLegalIssues: definitions.yesNo,
    livedContinuouslyWithVeteran: definitions.yesNo,
    marriedAtDeath: definitions.yesNo,
    marriageEndDetails: {
      type: 'object',
      properties: {
        marriageEndReason: {
          type: 'string',
          enum: ['DEATH', 'DIVORCE', 'OTHER'],
        },
        marriageEndOtherReason: { type: 'string' },
      },
    },
    marriageDate: definitions.date,
    marriageEndDate: definitions.date,
    placeOfMarriage: { type: 'string' },
    placeMarriageEnded: { type: 'string' },
    marriageType: {
      type: 'string',
      enum: ['CIVIL_RELIGIOUS', 'OTHER_WAY'],
    },
    marriageTypeOther: { type: 'string' },
    recognizedAsSpouse: definitions.yesNo,
    hadPreviousMarriages: definitions.yesNo,
    previousMarriages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          previousSpouseName: definitions.fullName,
          marriageToVeteranDate: definitions.date,
          marriedOutsideUS: { type: 'boolean' },
          marriageLocation: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
          marriageEndDate: definitions.date,
          marriageEndedOutsideUS: { type: 'boolean' },
          marriageEndLocation: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
          marriageEndReason: { type: 'string' },
          marriageEndOtherExplanation: { type: 'string' },
        },
      },
    },
    separationDueToAssignedReasons: {
      type: 'string',
      enum: ['MEDICAL_FINANCIAL', 'RELATIONSHIP_DIFFERENCES', 'OTHER'],
    },
    remarried: definitions.yesNo,
    remarriageEndReason: {
      type: 'string',
      enum: ['DID_NOT_END', 'SPOUSE_DEATH', 'DIVORCE', 'OTHER'],
    },
    remarriageEndOtherReason: { type: 'string' },
    remarriageDate: definitions.date,
    remarriageEndDate: definitions.date,
    separationExplanation: { type: 'string' },
    separationStartDate: definitions.date,
    separationEndDate: definitions.date,
    courtOrderedSeparation: definitions.yesNo,
    expectingChild: definitions.yesNo,
    hadChildWithVeteran: definitions.yesNo,
    veteranPreviousMarriages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          previousSpouseFullName: definitions.fullName,
          marriageDate: definitions.date,
          marriedOutsideUS: { type: 'boolean' },
          marriageLocation: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
          marriageEndedBy: { type: 'string' },
          marriageEndedOther: { type: 'string' },
          dateOfTermination: definitions.date,
          marriageEndedOutsideUS: { type: 'boolean' },
          marriageEndLocation: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
        },
      },
    },
    // SECTION 5 CLAIM INFORMATION
    dicType: {
      type: 'string',
      enum: ['DIC', 'DIC_1151', 'DIC_REEVALUATION'],
    },
    needRegularAssistance: definitions.yesNo,
    inNursingHome: definitions.yesNo,
    vaMedicalCenters: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          vaMedicalCenterName: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          startDate: definitions.date,
          endDate: definitions.date,
        },
      },
    },
    // SECTION 6 FINANCIAL INFORMATION
    careExpenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          typeOfCare: { type: 'string' },
          recipient: { type: 'string' },
          recipientName: { type: 'string' },
          provider: { type: 'string' },
          careDate: {
            type: 'object',
            properties: {
              from: definitions.date,
              to: definitions.date,
            },
          },
          noEdDate: { type: 'boolean' },
          frequency: { type: 'string' },
          paymentAmount: { type: 'string' },
          hourlyRate: { type: 'string' },
          weeklyHours: { type: 'string' },
        },
      },
    },
    medicalExpenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          recipient: { type: 'string' },
          recipientName: { type: 'string' },
          paymentRecipient: { type: 'string' },
          purpose: { type: 'string' },
          paymentDate: definitions.date,
          frequency: { type: 'string' },
          amount: { type: 'string' },
        },
      },
    },
    incomeSources: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          whoReceives: {
            type: 'string',
            enum: ['SURVIVING_SPOUSE', 'VETERANS_CHILD', 'CUSTODIAN', 'CUSTODIAN_SPOUSE'],
          },
          typeOfIncome: {
            type: 'string',
            enum: ['SOCIAL_SECURITY', 'INTEREST_DIVIDEND', 'CIVIL_SERVICE', 'PENSION_RETIREMENT', 'OTHER'],
          },
          otherTypeExplanation: { type: 'string' },
          payer: { type: 'string' },
          amount: { type: 'string' },
        },
      },
    },
    additionalLandValue: { type: 'string' },
    homeOwnership: definitions.yesNo,
    hasAssetsOverThreshold: definitions.yesNo,
    moreThanFourSources: definitions.yesNo,
    otherIncomeLastYearNoLongerReceive: definitions.yesNo,
    landLotSize: definitions.yesNo,
    additionalLandMarketable: definitions.yesNo,
    whoReceives: {
      type: 'string',
      enum: ['SURVIVING_SPOUSE', 'VETERANS_CHILD', 'CUSTODIAN', 'CUSTODIAN_SPOUSE', 'OTHER'],
    },
    fullName: { type: 'string' },
    typeOfIncome: {
      type: 'string',
      enum: ['SOCIAL_SECURITY', 'INTEREST_DIVIDEND', 'CIVIL_SERVICE', 'PENSION_RETIREMENT', 'OTHER'],
    },
    otherTypeExplanation: { type: 'string' },
    payer: { type: 'string' },
    amount: { type: 'string' },
    totalAssets: { type: 'string' },
    transferredAssets: definitions.yesNo,
    // SECTION 7 ADDITIONAL INFORMATION
    hasBankAccount: definitions.yesNo,
    bankAccount: {
      type: 'object',
      properties: {
        bankName: { type: 'string' },
        accountType: {
          type: 'string',
          enum: ['checking', 'savings'],
        },
        routingNumber: {
          type: 'string',
          pattern: '^\\d{9}$',
        },
        accountNumber: {
          type: 'string',
        },
      },
    },
    files: definitions.files,
  },
  required: [],
};

export default schema;

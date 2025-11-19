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
    claimantHasAdditionalMarriages: definitions.yesNo,
    veteransChildren: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          childFullName: definitions.fullName,
          childSocialSecurityNumber: definitions.ssn,
          noSSN: { type: 'boolean' },
          childDateOfBirth: definitions.date,
          bornOutsideUS: { type: 'boolean' },
          childPlaceOfBirth: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
          childStatusBiological: { type: 'string', enum: ['BIOLOGICAL', 'ADOPTED', 'STEPCHILD'] },
          childStatusDisabled: definitions.yesNo,
          childStatusMarried: definitions.yesNo,
          childStatusSupported: definitions.yesNo,
          childSupport: { type: 'number' },
          childrenLiveTogetherButNotWithSpouse: definitions.yesNo,
          custodianFullName: definitions.fullName,
          custodianAddress: definitions.address,
        },
      },
    },
    validMarriage: definitions.yesNo,
    marriageValidityExplanation: { type: 'string' },
    livedContinuouslyWithVeteran: definitions.yesNo,
    marriedToVeteranAtTimeOfDeath: definitions.yesNo,
    howMarriageEnded: {
      type: 'string',
      enum: ['DEATH', 'DIVORCE', 'OTHER'],
    },
    howMarriageEndedExplanation: { type: 'string' },
    marriageDates: {
      type: 'object',
      properties: {
        from: definitions.date,
        to: definitions.date,
      },
    },
    placeOfMarriage: { type: 'string' },
    placeOfMarriageTermination: { type: 'string' },
    marriageType: {
      type: 'string',
      enum: ['CIVIL_RELIGIOUS', 'OTHER_WAY'],
    },
    marriageTypeExplanation: { type: 'string' },
    recognizedAsSpouse: definitions.yesNo,
    hadPreviousMarriages: definitions.yesNo,
    spouseMarriages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          spouseFullName: definitions.fullName,
          dateOfMarriage: definitions.date,
          marriedOutsideUS: { type: 'boolean' },
          locationOfMarriage: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
          dateOfSeparation: definitions.date,
          marriageEndedOutsideUS: { type: 'boolean' },
          locationOfSeparation: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
          reasonForSeparation: { type: 'string', enum: ['DEATH', 'DIVORCE', 'OTHER'] },
          reasonForSeparationExplanation: { type: 'string' },
        },
      },
    },
    separationDueToAssignedReasonsYes: {
      type: 'string',
      enum: ['MEDICAL_FINANCIAL', 'RELATIONSHIP_DIFFERENCES', 'OTHER'],
    },
    remarriedAfterVeteranDeath: definitions.yesNo,
    remarriageEndCauseDeath: {
      type: 'string',
      enum: ['DID_NOT_END', 'SPOUSE_DEATH', 'DIVORCE', 'OTHER'],
    },
    remarriageEndCauseExplanation: { type: 'string' },
    remarriageDates: {
      type: 'object',
      properties: {
        from: definitions.date,
        to: definitions.date,
      },
    },
    separationExplanation: { type: 'string' },
    separationStartDate: definitions.date,
    separationEndDate: definitions.date,
    courtOrderedSeparation: definitions.yesNo,
    pregnantWithVeteran: definitions.yesNo,
    childWithVeteran: definitions.yesNo,
    veteranMarriages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          spouseFullName: definitions.fullName,
          dateOfMarriage: definitions.date,
          marriedOutsideUS: { type: 'boolean' },
          locationOfMarriage: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' },
            },
          },
          reasonForSeparation: { type: 'string', enum: ['DEATH', 'DIVORCE', 'OTHER'] },
          reasonForSeparationExplanation: { type: 'string' },
          dateOfSeparation: definitions.date,
          marriageEndedOutsideUS: { type: 'boolean' },
          locationOfSeparation: {
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
    claimingMonthlySpecialPension: definitions.yesNo,
    claimantLivesInANursingHome: definitions.yesNo,
    treatments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          facility: { type: 'string' },
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
          careType: {
            type: 'string',
            enum: ['RESIDENTIAL_CARE_FACILITY', 'IN_HOME_CARE_ATTENDANT', 'NURSING_HOME', 'ADULT_DAYCARE'],
          },
          recipient: { type: 'string', enum: ['SURVIVING_SPOUSE', 'OTHER'] },
          recipientName: { type: 'string' },
          provider: { type: 'string' },
          dateRange: {
            type: 'object',
            properties: {
              from: definitions.date,
              to: definitions.date,
            },
          },
          noEndDate: { type: 'boolean' },
          paymentFrequency: { type: 'string', enum: ['MONTHLY', 'YEARLY'] },
          paymentAmount: { type: 'number' },
          paymentRate: { type: 'number' },
          hoursPerWeek: { type: 'number' },
        },
      },
    },
    medicalExpenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          recipient: { type: 'string' },
          childName: { type: 'string' },
          provider: { type: 'string' },
          purpose: { type: 'string' },
          paymentDate: definitions.date,
          paymentFrequency: {
            type: 'string',
            enum: ['MONTHLY', 'YEARLY', 'ONE_TIME'],
          },
          paymentAmount: { type: 'number' },
        },
      },
    },
    incomeSources: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          recipient: {
            type: 'string',
            enum: ['SURVIVING_SPOUSE', 'VETERANS_CHILD', 'CUSTODIAN', 'CUSTODIAN_SPOUSE'],
          },
          incomeType: {
            type: 'string',
            enum: ['SOCIAL_SECURITY', 'INTEREST_DIVIDEND', 'CIVIL_SERVICE', 'PENSION_RETIREMENT', 'OTHER'],
          },
          recipientName: { type: 'string' },
          incomePayer: { type: 'string' },
          monthlyIncome: { type: 'number' },
        },
      },
    },
    homeAcreageValue: { type: 'number' },
    homeOwnership: definitions.yesNo,
    totalNetWorth: definitions.yesNo,
    moreThanFourIncomeSources: definitions.yesNo,
    otherIncome: definitions.yesNo,
    homeAcreageMoreThanTwo: definitions.yesNo,
    landMarketable: definitions.yesNo,
    netWorthEstimation: { type: 'number' },
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

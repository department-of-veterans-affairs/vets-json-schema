import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR D.I.C., SURVIVORS PENSION, AND/OR ACCRUED BENEFITS (21P-534EZ)',
  type: 'object',
  definitions: {
    address: definitions.address,
    date: definitions.date,
    dateRange: definitions.dateRange,
    email: definitions.email,
    fullName: definitions.fullName,
    phone: definitions.phone,
    fullPhone: {
      type: 'object',
      properties: {
        callingCode: {
          type: 'number',
        },
        countryCode: {
          type: 'string',
        },
        contact: {
          type: 'string',
          minLength: 10,
        },
      },
    },
    veteranServiceNumber: definitions.veteranServiceNumber,
    ssn: definitions.ssn,
    vaFileNumber: definitions.vaFileNumber,
  },
  properties: {
    // Section 1: Veteran's Identification Information
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber',
    },
    veteranServiceNumber: {
      $ref: '#/definitions/veteranServiceNumber',
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date',
    },
    vaClaimsHistory: { type: 'boolean' },
    diedOnDuty: { type: 'boolean' },
    veteranDateOfDeath: {
      $ref: '#/definitions/date',
    },
    // Section 2: Claimant's Identification Information
    claimantFullName: {
      $ref: '#/definitions/fullName',
    },
    claimantRelationship: {
      type: 'string',
      enum: [
        'SURVIVING_SPOUSE',
        'CHILD_18-23_IN_SCHOOL',
        'CUSTODIAN_FILING_FOR_CHILD_UNDER_18',
        'HELPLESS_ADULT_CHILD',
      ],
    },
    claimantSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    claimantDateOfBirth: {
      $ref: '#/definitions/date',
    },
    claimantIsVeteran: { type: 'boolean' },
    claimantAddress: {
      $ref: '#/definitions/address',
    },
    claimantPhone: {
      type: 'string',
    },
    claimantInternationalPhone: {
      $ref: '#/definitions/phone',
    },
    claimantEmail: {
      $ref: '#/definitions/email',
    },
    claims: {
      type: 'object',
      properties: {
        DIC: { type: 'boolean' },
        survivorsPension: { type: 'boolean' },
        accruedBenefits: { type: 'boolean' },
      },
    },
    // Section 3: Veteran's Service Information
    veteranHasPreviousNames: { type: 'boolean' },
    veteranPreviousNames: {
      type: 'array',
      items: {
        $ref: '#/definitions/fullName',
      },
    },
    activeServiceDateRange: {
      $ref: '#/definitions/dateRange',
    },
    serviceBranch: {
      type: 'string',
      enum: ['army', 'navy', 'airForce', 'coastGuard', 'marineCorps', 'spaceForce', 'usphs', 'noaa'],
    },
    placeOfSeparation: { type: 'string' },
    nationalGuardActivated: { type: 'boolean' },
    nationalGuardActivationDate: {
      $ref: '#/definitions/date',
    },
    unitNameAndAddress: { type: 'string' },
    unitPhone: {
      type: 'string',
    },
    pow: { type: 'boolean' },
    powDateRange: {
      $ref: '#/definitions/dateRange',
    },
    // Section 4: Marital Information
    validMarriage: { type: 'boolean' },
    marriageValidityExplanation: { type: 'string' },
    marriedToVeteranAtTimeOfDeath: { type: 'boolean' },
    howMarriageEnded: {
      type: 'string',
      enum: ['death', 'divorce', 'other'],
    },
    howMarriageEndedExplanation: { type: 'string' },
    marriageDates: {
      $ref: '#/definitions/dateRange',
    },
    placeOfMarriage: { type: 'string' },
    placeOfMarriageTermination: { type: 'string' },
    marriageType: {
      type: 'string',
      enum: ['ceremonial', 'other'],
    },
    marriageTypeExplanation: { type: 'string' },
    childWithVeteran: { type: 'boolean' },
    pregnantWithVeteran: { type: 'boolean' },
    livedContinuouslyWithVeteran: { type: 'boolean' },
    separationDueToAssignedReasons: { type: 'boolean' },
    separationExplanation: { type: 'string' },
    remarriedAfterVeteralDeath: { type: 'boolean' },
    remarriageDates: {
      $ref: '#/definitions/dateRange',
    },
    remarriageEndCause: {
      type: 'string',
      enum: ['death', 'divorce', 'didNotEnd', 'other'],
    },
    remarriageEndCauseExplanation: { type: 'string' },
    claimantHasAdditionalMarriages: { type: 'boolean' },
    // Section 5: Marital History
    veteranMarriages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          spouseFullName: {
            $ref: '#/definitions/fullName',
          },
          reasonForSeparation: {
            type: 'string',
            enum: ['DEATH', 'DIVORCE', 'OTHER'],
          },
          reasonForSeparationExplanation: { type: 'string' },
          dateOfMarriage: {
            $ref: '#/definitions/date',
          },
          dateOfSeparation: {
            $ref: '#/definitions/date',
          },
          locationOfMarriage: { type: 'string' },
          locationOfSeparation: { type: 'string' },
          veteranHasAdditionalMarriages: { type: 'boolean' },
        },
      },
    },
    spouseMarriages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          spouseFullName: {
            $ref: '#/definitions/fullName',
          },
          reasonForSeparation: {
            type: 'string',
            enum: ['DEATH', 'DIVORCE', 'OTHER'],
          },
          reasonForSeparationExplanation: { type: 'string' },
          dateOfMarriage: {
            $ref: '#/definitions/date',
          },
          dateOfSeparation: {
            $ref: '#/definitions/date',
          },
          locationOfMarriage: { type: 'string' },
          locationOfSeparation: { type: 'string' },
          spouseHasAdditionalMarriages: { type: 'boolean' },
        },
      },
    },
    // Section 6: Children of the Veteran Information
    veteranChildrenCount: { type: 'string' },
    veteransChildren: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          childFullName: {
            $ref: '#/definitions/fullName',
          },
          childDateOfBirth: {
            $ref: '#/definitions/date',
          },
          childSocialSecurityNumber: {
            $ref: '#/definitions/ssn',
          },
          childPlaceOfBirth: { type: 'string' },
          childStatus: { type: 'array', items: { type: 'string' } },
          childSupport: { type: 'number' },
        },
      },
    },
    childrenLiveTogetherButNotWithSpouse: { type: 'boolean' },
    custodianFullName: {
      $ref: '#/definitions/fullName',
    },
    custodianAddress: {
      $ref: '#/definitions/address',
    },
    // Section 7: Dependency and Indemnity Compensation (D.I.C.)
    benefit: {
      type: 'string',
      enum: ['DIC', 'pactActDIC', '1151DIC'],
    },
    treatments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          facility: { type: 'string' },
          startDate: { $ref: '#/definitions/date' },
          endDate: { $ref: '#/definitions/date' },
        },
      },
    },
    // Section 8: Nursing Home or Increased Survivors Entitlement
    claimingMonthlySpecialPension: { type: 'boolean' },
    claimantLivesInANursingHome: { type: 'boolean' },
    // Section 9: Income And Assets (current income entries)
    totalNetWorth: { type: 'boolean' },
    netWorthEstimation: { type: 'number' },
    transferredAssets: { type: 'boolean' },
    homeOwnership: { type: 'boolean' },
    homeAcreageMoreThanTwo: { type: 'boolean' },
    homeAcreageValue: { type: 'number' },
    landMarketable: { type: 'boolean' },
    moreThanFourIncomeSources: { type: 'boolean' },
    otherIncome: { type: 'boolean' },
    incomeEntries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          recipient: {
            type: 'string',
            enum: ['SURVIVING_SPOUSE', 'CHILD'],
          },
          recipientName: { type: 'string' },
          incomeType: {
            type: 'string',
            enum: ['SOCIAL_SECURITY', 'INTEREST_DIVIDENDS', 'CIVIL_SERVICE', 'PENSION_RETIREMENT', 'OTHER'],
          },
          incomePayer: { type: 'string' },
          monthlyIncome: { type: 'number' },
        },
      },
    },
    // Section 10: Information About Your Medical Or Other Expense
    careExpenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          recipient: {
            type: 'string',
            enum: ['SURVIVING_SPOUSE', 'OTHER'],
          },
          recipientName: { type: 'string' },
          provider: { type: 'string' },
          careType: {
            type: 'string',
            enum: ['CARE_FACILITY', 'IN_HOME_CARE_ATTENDANT'],
          },
          ratePerHour: { type: 'number' },
          hoursPerWeek: { type: 'number' },
          careDateRange: {
            $ref: '#/definitions/dateRange',
          },
          noCareEndDate: { type: 'boolean' },
          paymentFrequency: { type: 'string', enum: ['MONTHLY', 'ANNUALLY', 'ONE_TIME'] },
          paymentAmount: { type: 'number' },
        },
      },
    },
    medicalExpenses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          recipient: {
            type: 'string',
            enum: ['SURVIVING_SPOUSE', 'VETERAN', 'CHILD'],
          },
          childName: { type: 'string' },
          provider: { type: 'string' },
          purpose: { type: 'string' },
          paymentDate: { $ref: '#/definitions/date' },
          paymentFrequency: { type: 'string', enum: ['MONTHLY', 'ANNUALLY', 'ONE_TIME'] },
          paymentAmount: { type: 'number' },
        },
      },
    },
    // Section 11: Direct Deposit Information
    bankAccount: {
      type: 'object',
      properties: {
        bankName: { type: 'string' },
        accountNumber: { type: 'string' },
        routingNumber: { type: 'string' },
        accountType: { type: 'string', enum: ['CHECKING', 'SAVINGS', 'NO_ACCOUNT'] },
      },
    },
    // Section 12: Claim Certification And Signature
    dateSigned: { $ref: '#/definitions/date' },
  },
  required: [],
};

export default schema;

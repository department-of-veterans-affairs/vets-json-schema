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
      $ref: '#/definitions/phone',
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
      $ref: '#/definitions/phone',
    },
    pow: { type: 'boolean' },
    powDateRange: {
      $ref: '#/definitions/dateRange',
    },
    // Section 4: Marital Information
    // Section 5: Marital History
    // Section 6: Children of the Veteran Information
    // Section 7: Dependency and Indemnity Compensation (D.I.C.)
    // Section 8: Nursing Home or Increased Survivors Entitlement
    // Section 9: Income And Assets (current income entries)
    // Section 10: Information About Your Medical Or Other Expense
    // Section 11: Direct Deposit Information
    // Section 12: Claim Certification And Signature
  },
  required: [],
};

export default schema;

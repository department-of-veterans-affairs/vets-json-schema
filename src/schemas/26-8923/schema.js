const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  additionalProperties: false,
  definitions: {
    dollarAmount: {
      type: 'number',
      minimum: 0,
      maximum: 9999999.99,
    },
    percentageThreeDecimal: {
      type: 'number',
      minimum: 0,
      maximum: 99.999,
    },
    isoDate: {
      type: 'string',
      format: 'date',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
  },
  properties: {
    loanIdentification: {
      type: 'object',
      additionalProperties: false,
      description: 'Loan identification header fields — VA Loan Number and lender identifying information',
      required: ['vaLoanNumber', 'nameOfLender', 'officerName', 'officerTitle'],
      properties: {
        vaLoanNumber: {
          type: 'string',
          description: 'VA loan number for the existing VA-guaranteed loan being refinanced',
          minLength: 1,
          maxLength: 14,
          pattern: '^[A-Za-z0-9\\-]+$',
        },
        nameOfLender: {
          type: 'string',
          description: 'Full legal name of the VA-approved lending institution',
          minLength: 1,
          maxLength: 100,
        },
        officerName: {
          type: 'string',
          description: 'Full name of the lending institution officer certifying this worksheet',
          minLength: 1,
          maxLength: 100,
        },
        officerTitle: {
          type: 'string',
          description: "Officer's title at the lending institution",
          minLength: 1,
          maxLength: 100,
        },
      },
    },
    sectionI: {
      type: 'object',
      additionalProperties: false,
      description: 'Section I — Initial Computation (Lines 1–3)',
      required: ['line1ExistingLoanBalance', 'line2CashPaymentFromVeteran'],
      properties: {
        line1ExistingLoanBalance: {
          type: 'number',
          description: 'Line 1: Existing VA loan balance plus cost of energy efficient improvements, from servicer payoff statement',
          minimum: 0.01,
          maximum: 9999999.99,
        },
        line2CashPaymentFromVeteran: {
          type: 'number',
          description: 'Line 2: Cash payment from Veteran (amount subtracted from Line 1); enter 0 if none',
          minimum: 0,
          maximum: 9999999.99,
        },
        line3Total: {
          type: 'number',
          description: 'Line 3: Total (Line 1 minus Line 2) — computed value stored for review and PDF generation',
          minimum: 0,
          maximum: 9999999.99,
        },
      },
    },
    sectionII: {
      type: 'object',
      additionalProperties: false,
      description: 'Section II — Preliminary Loan Amount (Lines 4–9)',
      required: [
        'line5DiscountPercent',
        'line6OriginationFeePercent',
        'line7FundingFeePercent',
        'line8OtherClosingCosts',
      ],
      properties: {
        line4CarryForward: {
          type: 'number',
          description: 'Line 4: Total carried forward from Line 3 — computed carry-forward value',
          minimum: 0,
          maximum: 9999999.99,
        },
        line5DiscountPercent: {
          type: 'number',
          description: 'Line 5: Discount points as a percentage of Line 4 (e.g., 1.5 for 1.5%); soft warning above 2% per 38 CFR § 36.4313',
          minimum: 0,
          maximum: 99.999,
        },
        line5DollarAmount: {
          type: 'number',
          description: 'Line 5: Discount dollar amount computed from Line 4 × (Line 5% ÷ 100)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line6OriginationFeePercent: {
          type: 'number',
          description: 'Line 6: Origination fee as a percentage of Line 4; hard cap at 1% per 38 CFR § 36.4313',
          minimum: 0,
          maximum: 1.000,
        },
        line6DollarAmount: {
          type: 'number',
          description: 'Line 6: Origination fee dollar amount computed from Line 4 × (Line 6% ÷ 100)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line7FundingFeePercent: {
          type: 'number',
          description: 'Line 7: VA funding fee percentage; fixed at 0.5% per 38 CFR § 36.4312; 0 for exempt Veterans',
          minimum: 0,
          maximum: 0.500,
          default: 0.5,
        },
        line7DollarAmount: {
          type: 'number',
          description: 'Line 7: VA funding fee dollar amount computed from Line 4 × (Line 7% ÷ 100)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line8OtherClosingCosts: {
          type: 'number',
          description: 'Line 8: Other allowable closing costs and prepaids (title insurance, recording fees, prepaids, etc.) per VA Pamphlet 26-7 Chapter 8',
          minimum: 0,
          maximum: 9999999.99,
        },
        line9PreliminaryTotal: {
          type: 'number',
          description: 'Line 9: Preliminary total (sum of Lines 4 through 8) — computed value',
          minimum: 0,
          maximum: 9999999.99,
        },
      },
    },
    sectionIII: {
      type: 'object',
      additionalProperties: false,
      description: 'Section III — Final Computation (Lines 10–18); all values computed from Section I and Section II inputs',
      properties: {
        line10CarryForward: {
          type: 'number',
          description: 'Line 10: Total carried forward from Line 9',
          minimum: 0,
          maximum: 9999999.99,
        },
        line11DiscountOnLine10: {
          type: 'number',
          description: 'Line 11: Discount percentage applied to Line 10 — Line 10 × (Line 5% ÷ 100)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line12Subtotal: {
          type: 'number',
          description: 'Line 12: Subtotal (Line 10 plus Line 11)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line13SubtractLine5: {
          type: 'number',
          description: 'Line 13: Discount dollar amount from Line 5 being subtracted (stored for display and PDF)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line14Subtotal: {
          type: 'number',
          description: 'Line 14: Subtotal (Line 12 minus Line 5 dollar amount)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line15SubtractLine7: {
          type: 'number',
          description: 'Line 15: VA funding fee dollar amount from Line 7 being subtracted (stored for display and PDF)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line16Subtotal: {
          type: 'number',
          description: 'Line 16: Subtotal (Line 14 minus Line 7 dollar amount) — base for final funding fee calculation',
          minimum: 0,
          maximum: 9999999.99,
        },
        line17FinalFundingFee: {
          type: 'number',
          description: 'Line 17: Final VA funding fee based on Line 16 — Line 16 × (Line 7% ÷ 100)',
          minimum: 0,
          maximum: 9999999.99,
        },
        line18MaxLoanAmount: {
          type: 'number',
          description: 'Line 18: Maximum loan amount — floor(Line 16 + Line 17) rounded DOWN per form note; must never be rounded up',
          minimum: 0,
          maximum: 9999999.99,
        },
      },
    },
    lenderCertification: {
      type: 'object',
      additionalProperties: false,
      description: 'Lender certification — signature block date, acknowledgment, and optional funding fee exemption certification',
      required: ['certificationDate', 'certificationAcknowledged'],
      properties: {
        certificationDate: {
          type: 'string',
          format: 'date',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
          description: 'Date the worksheet is being completed (YYYY-MM-DD format); corresponds to Date field in form signature block',
        },
        certificationAcknowledged: {
          type: 'boolean',
          description: 'Officer of lender certifies that information entered is accurate, Line 18 is rounded down, and transaction will not result in cash disbursed to the Veteran',
        },
        fundingFeeExemptionCertified: {
          type: 'boolean',
          description: 'Required when Line 7 funding fee percent is 0; certifies that the Veteran or eligible surviving spouse is exempt from the VA funding fee and that documentation of exemption is included in the closing package',
        },
      },
    },
    formMetadata: {
      type: 'object',
      additionalProperties: false,
      description: 'System metadata — not rendered on form PDF; used for version tracking and submission lifecycle management',
      properties: {
        formVersion: {
          type: 'string',
          description: 'Tracks which form version logic was applied; must be NOV2024 for November 2024 template',
          enum: ['NOV2024'],
        },
        submissionTimestamp: {
          type: ['string', 'null'],
          format: 'date-time',
          description: 'ISO 8601 timestamp of form submission; set by vets-api response',
        },
        confirmationNumber: {
          type: ['string', 'null'],
          description: 'Confirmation number (UUID) returned by vets-api on successful submission',
          maxLength: 36,
        },
      },
    },
  },
  required: ['loanIdentification', 'sectionI', 'sectionII', 'lenderCertification'],
};

export default schema;
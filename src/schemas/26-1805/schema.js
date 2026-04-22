const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  additionalProperties: false,
  definitions: {
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          example: 'John',
          maxLength: 30,
          pattern: '^[A-Za-z\\-]+$',
        },
        middle: {
          type: ['string', 'null'],
          example: 'A',
          maxLength: 1,
          pattern: '^[A-Za-z]$',
        },
        last: {
          type: 'string',
          example: 'Doe',
          maxLength: 40,
          pattern: "^[A-Za-z\\-\\']+$",
        },
      },
      required: ['first', 'last'],
    },
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
          example: '123 Main St',
          maxLength: 100,
        },
        street2: {
          type: ['string', 'null'],
          example: 'Apt 4',
          maxLength: 50,
        },
        city: {
          type: 'string',
          example: 'Springfield',
          maxLength: 50,
          pattern: '^[A-Za-z\\s\\-\\.]+$',
        },
        state: {
          type: 'string',
          example: 'IL',
          enum: [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
            'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
            'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
            'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
            'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
            'WY', 'PR', 'GU', 'VI', 'AS', 'MP',
          ],
        },
        postalCode: {
          type: 'string',
          example: '62701',
          pattern: '^\\d{5}$',
          minLength: 5,
          maxLength: 5,
        },
      },
      required: ['street', 'city', 'state', 'postalCode'],
    },
    phone: {
      type: 'string',
      example: '5005550006',
      description: '10-digit phone number, no formatting',
      pattern: '^\\d{10}$',
      minLength: 10,
      maxLength: 10,
    },
    email: {
      type: 'string',
      example: 'veteran@example.com',
      description: 'Email address',
      pattern: '^[^@]+@[^@]+\\.[^@]+$',
      maxLength: 100,
    },
    ssn: {
      type: 'string',
      example: '123456789',
      description: 'Social Security Number — 9 digits, no dashes',
      pattern: '^\\d{9}$',
      minLength: 9,
      maxLength: 9,
    },
    date: {
      type: 'string',
      format: 'date',
      example: '1990-01-15',
      description: 'ISO 8601 date string (YYYY-MM-DD)',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },
    vaZIP: {
      type: 'string',
      example: '90210',
      description: '5-digit US ZIP code',
      pattern: '^\\d{5}$',
      minLength: 5,
      maxLength: 5,
    },
  },

  properties: {
    // -----------------------------------------------------------------------
    // Chapter 1 — IRRRL Screening (Screen 2)
    // -----------------------------------------------------------------------
    irrrlScreening: {
      type: 'object',
      description: 'Loan type pre-screen to identify IRRRL appraisal waiver eligibility',
      additionalProperties: false,
      properties: {
        loanTransactionPreScreen: {
          type: 'string',
          description: 'Pre-screen loan transaction type to determine if appraisal is required',
          enum: ['purchase', 'cash-out-refi', 'irrrl', 'new-construction'],
        },
        irrrlAppraisalRequired: {
          type: 'boolean',
          description: 'Lender has confirmed that this IRRRL transaction requires an appraisal (not waiver-eligible)',
        },
      },
      required: ['loanTransactionPreScreen'],
    },

    // -----------------------------------------------------------------------
    // Chapter 2 — Lender Information (Screen 3)
    // -----------------------------------------------------------------------
    lenderInformation: {
      type: 'object',
      description: 'VA-approved lender identity, point of contact, and submission authority',
      additionalProperties: false,
      properties: {
        lenderName: {
          type: 'string',
          description: 'Full legal name of the VA-approved lending institution',
          maxLength: 100,
          example: 'First National Mortgage LLC',
        },
        vaLenderID: {
          type: 'string',
          description: '7-digit VA Lender ID issued by VA Loan Guaranty Service',
          pattern: '^\\d{7}$',
          minLength: 7,
          maxLength: 7,
          example: '1234567',
        },
        lenderType: {
          type: 'string',
          description: 'Type of lending institution',
          enum: [
            'bank_savings',
            'credit_union',
            'mortgage_company',
            'mortgage_broker',
            'government_entity',
            'other',
          ],
        },
        lenderAddress: {
          type: 'object',
          description: "Lender's mailing address",
          additionalProperties: false,
          properties: {
            street: {
              type: 'string',
              description: 'Lender street address',
              maxLength: 100,
            },
            city: {
              type: 'string',
              description: 'Lender city',
              maxLength: 50,
              pattern: '^[A-Za-z\\s\\-\\.]+$',
            },
            state: {
              type: 'string',
              description: 'Lender state',
              enum: [
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
                'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
                'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
                'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
                'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
                'WY', 'PR', 'GU', 'VI', 'AS', 'MP',
              ],
            },
            postalCode: {
              type: 'string',
              description: 'Lender ZIP code',
              pattern: '^\\d{5}$',
              minLength: 5,
              maxLength: 5,
            },
          },
          required: ['street', 'city', 'state', 'postalCode'],
        },
        lenderPOCName: {
          type: 'string',
          description: 'Name of the loan officer or processor VA should contact',
          maxLength: 75,
        },
        lenderPOCPhone: buildDefinitionReference('phone'),
        lenderPOCEmail: buildDefinitionReference('email'),
      },
      required: [
        'lenderName',
        'vaLenderID',
        'lenderType',
        'lenderAddress',
        'lenderPOCName',
        'lenderPOCPhone',
        'lenderPOCEmail',
      ],
    },

    // -----------------------------------------------------------------------
    // Chapter 3 — Veteran Borrower Information (Screen 4)
    // -----------------------------------------------------------------------
    veteranBorrowerInformation: {
      type: 'object',
      description: 'Identity information for the Veteran borrower',
      additionalProperties: false,
      properties: {
        veteranFullName: buildDefinitionReference('fullName'),
        veteranSSN: buildDefinitionReference('ssn'),
        veteranDOB: buildDefinitionReference('date'),
        coeNumber: {
          type: ['string', 'null'],
          description: "Veteran's VA Certificate of Eligibility (COE) number",
          maxLength: 20,
          example: 'COE-1234567',
        },
        survivingSpouse: {
          type: 'boolean',
          description: 'Indicates whether the borrower is an eligible surviving spouse (not the Veteran)',
        },
      },
      required: ['veteranFullName', 'veteranSSN', 'veteranDOB'],
    },

    // -----------------------------------------------------------------------
    // Chapter 4 — Loan Transaction Type (Screen 5)
    // -----------------------------------------------------------------------
    loanTransactionType: {
      type: 'object',
      description: 'Transaction type and loan characteristics driving downstream conditional branches',
      additionalProperties: false,
      properties: {
        transactionType: {
          type: 'string',
          description: 'VA loan transaction type for this appraisal request',
          enum: ['purchase', 'cash_out_refi', 'irrrl', 'new_construction'],
        },
        estimatedValue: {
          type: 'number',
          description: 'Estimated purchase price or estimated value of the property in US dollars',
          minimum: 1,
          maximum: 99999999,
          example: 350000,
        },
        loanFeatures: {
          type: 'object',
          description: 'Special loan feature flags',
          additionalProperties: false,
          properties: {
            energyEfficientMortgage: {
              type: 'boolean',
              description: 'Loan includes an Energy Efficient Mortgage (EEM) component',
            },
            jointLoan: {
              type: 'boolean',
              description: 'This is a joint VA loan involving a non-Veteran co-borrower',
            },
            nativeAmericanDirectLoan: {
              type: 'boolean',
              description: 'This is a Native American Direct Loan (NADL)',
            },
          },
        },
      },
      required: ['transactionType', 'estimatedValue'],
    },

    // -----------------------------------------------------------------------
    // Chapter 5 — Property Information (Screens 6–12)
    // -----------------------------------------------------------------------
    propertyInformation: {
      type: 'object',
      description: 'Subject property address, type, characteristics, and prior appraisal history',
      additionalProperties: false,
      properties: {

        // Screen 6 — Property Address
        propertyAddress: {
          type: 'object',
          description: 'Full address of the subject property',
          additionalProperties: false,
          properties: {
            street: {
              type: 'string',
              description: 'Property street address',
              maxLength: 100,
            },
            unit: {
              type: ['string', 'null'],
              description: 'Unit, apartment, or suite number',
              maxLength: 20,
            },
            city: {
              type: 'string',
              description: 'Property city',
              maxLength: 50,
              pattern: '^[A-Za-z\\s\\-\\.]+$',
            },
            state: {
              type: 'string',
              description: 'Property state or territory',
              enum: [
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
                'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
                'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
                'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
                'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
                'WY', 'PR', 'GU', 'VI', 'AS', 'MP',
              ],
            },
            postalCode: {
              type: 'string',
              description: 'Property ZIP code — used for ZIP-to-RLC routing lookup',
              pattern: '^\\d{5}$',
              minLength: 5,
              maxLength: 5,
            },
          },
          required: ['street', 'city', 'state', 'postalCode'],
        },

        // Screen 7 — Property Type
        propertyType: {
          type: 'string',
          description: 'Structural type of the subject property',
          enum: [
            'single_family_detached',
            'condo',
            'townhouse',
            'manufactured_home',
            '2_unit',
            '3_unit',
            '4_unit',
          ],
        },
        constructionType: {
          type: 'string',
          description: 'Whether the property is existing construction or proposed/new construction',
          enum: ['existing', 'proposed_new_construction'],
        },

        // Screen 8 — Condo Project Check (conditional: propertyType === 'condo')
        condoProjectDetails: {
          type: 'object',
          description: 'Condo project information — required when propertyType is condo',
          additionalProperties: false,
          properties: {
            condoProjectName: {
              type: 'string',
              description: 'Name of the condominium project',
              maxLength: 100,
            },
            hoaName: {
              type: ['string', 'null'],
              description: 'Name of the Homeowners Association (HOA)',
              maxLength: 100,
            },
            vaProjectApprovalId: {
              type: ['string', 'null'],
              description: 'VA condo project approval ID, if known',
              maxLength: 20,
            },
          },
          required: ['condoProjectName'],
        },

        // Screen 9 — Manufactured Home Details (conditional: propertyType === 'manufactured_home')
        manufacturedHomeDetails: {
          type: 'object',
          description: 'Manufactured home specific details — required when propertyType is manufactured_home',
          additionalProperties: false,
          properties: {
            foundationType: {
              type: 'string',
              description: 'Foundation type for the manufactured home — non-permanent foundation is an MPR failure',
              enum: ['permanent_affixed', 'non_permanent'],
            },
            hin: {
              type: ['string', 'null'],
              description: 'HUD Housing Identification Number (HIN) for the manufactured home',
              maxLength: 20,
            },
            acknowledgements: {
              type: 'array',
              description: 'Required acknowledgements for manufactured home submissions',
              items: {
                type: 'string',
                enum: [
                  'specialized_appraiser_acknowledged',
                  'permanent_foundation_confirmed',
                ],
              },
              uniqueItems: true,
            },
          },
          required: ['foundationType'],
        },

        // Screen 10 — New Construction Details (conditional: constructionType === 'proposed_new_construction')
        newConstructionDetails: {
          type: 'object',
          description: 'New construction details — required when constructionType is proposed_new_construction',
          additionalProperties: false,
          properties: {
            builderName: {
              type: 'string',
              description: 'Name of the builder / general contractor',
              maxLength: 100,
            },
            builderAddress: {
              type: 'object',
              description: "Builder's business address",
              additionalProperties: false,
              properties: {
                street: {
                  type: 'string',
                  maxLength: 100,
                },
                city: {
                  type: 'string',
                  maxLength: 50,
                  pattern: '^[A-Za-z\\s\\-\\.]+$',
                },
                state: {
                  type: 'string',
                  enum: [
                    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
                    'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
                    'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
                    'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
                    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
                    'WY', 'PR', 'GU', 'VI', 'AS', 'MP',
                  ],
                },
                postalCode: {
                  type: 'string',
                  pattern: '^\\d{5}$',
                  minLength: 5,
                  maxLength: 5,
                },
              },
              required: ['street', 'city', 'state', 'postalCode'],
            },
            builderLicenseNumber: {
              type: ['string', 'null'],
              description: "Builder's state contractor license number",
              maxLength: 30,
            },
            plansAndSpecsAvailable: {
              type: 'boolean',
              description: 'Whether plans and specifications are available for the appraiser',
            },
            acknowledgements: {
              type: 'array',
              description: 'Required acknowledgements for new construction submissions (CCI workflow)',
              items: {
                type: 'string',
                enum: [
                  'cci_workflow_acknowledged',
                  'rlc_manual_handling_acknowledged',
                ],
              },
              uniqueItems: true,
            },
          },
          required: ['builderName', 'plansAndSpecsAvailable'],
        },

        // Screen 11 — Property Details
        propertyDetails: {
          type: 'object',
          description: 'Additional physical characteristics of the subject property',
          additionalProperties: false,
          properties: {
            yearBuilt: {
              type: ['integer', 'null'],
              description: 'Year the property was built — for existing construction only',
              minimum: 1800,
              maximum: 2100,
              example: 1998,
            },
            occupancyStatus: {
              type: 'string',
              description: 'Current occupancy status of the subject property',
              enum: ['owner_occupied', 'tenant_occupied', 'vacant', 'other'],
            },
            bedrooms: {
              type: 'integer',
              description: 'Number of bedrooms',
              minimum: 0,
              maximum: 20,
            },
            bathrooms: {
              type: 'number',
              description: 'Number of bathrooms (allows 0.5 increments for half-baths)',
              minimum: 0,
              maximum: 20,
            },
            legalDescription: {
              type: ['string', 'null'],
              description: 'Abbreviated legal description of the property',
              maxLength: 500,
            },
          },
          required: ['occupancyStatus'],
        },

        // Screen 12 — Prior VA Appraisal
        priorVaAppraisal: {
          type: 'object',
          description: 'Prior VA appraisal history for the subject property',
          additionalProperties: false,
          properties: {
            hasPriorVaAppraisal: {
              type: 'string',
              description: 'Whether the property was previously appraised by VA',
              enum: ['yes', 'no'],
            },
            priorVaCaseNumber: {
              type: ['string', 'null'],
              description: 'Prior VA case number — required when hasPriorVaAppraisal is yes',
              maxLength: 20,
            },
            priorAppraisalDate: {
              type: ['string', 'null'],
              description: 'Approximate date of prior VA appraisal (YYYY-MM-DD) — conditional on hasPriorVaAppraisal yes',
              format: 'date',
              pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            },
          },
          required: ['hasPriorVaAppraisal'],
        },
      },
      required: [
        'propertyAddress',
        'propertyType',
        'constructionType',
        'propertyDetails',
        'priorVaAppraisal',
      ],
    },

    // -----------------------------------------------------------------------
    // Chapter 6 — Property Access and Appraisal Timing (Screens 13–14)
    // -----------------------------------------------------------------------
    accessAndTiming: {
      type: 'object',
      description: 'Property access contact information and appraisal scheduling timing constraints',
      additionalProperties: false,
      properties: {

        // Screen 13 — Property Access Contact
        propertyAccessContact: {
          type: 'object',
          description: 'Contact who will provide the appraiser access to the subject property',
          additionalProperties: false,
          properties: {
            contactType: {
              type: 'string',
              description: 'Role of the access contact person',
              enum: [
                'listing_agent',
                'seller',
                'current_occupant',
                'property_manager',
                'other',
              ],
            },
            contactName: {
              type: 'string',
              description: 'Full name of the property access contact',
              maxLength: 75,
            },
            contactPhone: buildDefinitionReference('phone'),
            contactPhoneAlt: {
              type: ['string', 'null'],
              description: 'Alternate phone number for the access contact',
              pattern: '^\\d{10}$',
              minLength: 10,
              maxLength: 10,
            },
            contactEmail: {
              type: ['string', 'null'],
              description: 'Email address for the access contact',
              pattern: '^[^@]+@[^@]+\\.[^@]+$',
              maxLength: 100,
            },
            accessInstructions: {
              type: ['string', 'null'],
              description: 'Lockbox info, gate codes, or other access instructions (optional)',
              maxLength: 500,
            },
          },
          required: ['contactType', 'contactName', 'contactPhone'],
        },

        // Screen 14 — Appraisal Timing
        appraisalTiming: {
          type: 'object',
          description: 'Timing urgency and earliest access date for appraisal scheduling',
          additionalProperties: false,
          properties: {
            timingUrgency: {
              type: 'string',
              description: 'Whether the appraisal request is standard or expedited',
              enum: ['standard', 'expedited'],
            },
            expeditedJustification: {
              type: ['string', 'null'],
              description: 'Justification for expedited appraisal scheduling — required when timingUrgency is expedited',
              maxLength: 300,
            },
            earliestAccessDate: buildDefinitionReference('date'),
          },
          required: ['timingUrgency', 'earliestAccessDate'],
        },
      },
      required: ['propertyAccessContact', 'appraisalTiming'],
    },

    // -----------------------------------------------------------------------
    // Chapter 7 — Lender Attestation (Screen 15 — Review and Submit)
    // -----------------------------------------------------------------------
    lenderAttestation: {
      type: 'object',
      description: 'Lender certification and attestation required prior to form submission',
      additionalProperties: false,
      properties: {
        attestationAccepted: {
          type: 'boolean',
          description: 'Lender has checked the attestation checkbox confirming accuracy and submission authority',
        },
      },
      required: ['attestationAccepted'],
    },
  },

  required: [
    'irrrlScreening',
    'lenderInformation',
    'veteranBorrowerInformation',
    'loanTransactionType',
    'propertyInformation',
    'accessAndTiming',
    'lenderAttestation',
  ],
};

export default schema;
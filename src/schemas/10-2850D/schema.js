const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  additionalProperties: false,

  definitions: {
    // Full name definition
    fullName: {
      type: 'object',
      properties: {
        lastName: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        middleName: {
          type: 'string',
          maxLength: 50,
        },
        otherNamesUsed: {
          type: 'string',
          maxLength: 200,
        },
      },
      required: ['lastName', 'firstName'],
    },

    // Present mailing address definition
    presentAddress: {
      type: 'object',
      properties: {
        street1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        street2: {
          type: 'string',
          maxLength: 100,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        state: {
          type: 'string',
          enum: [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
            'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
            'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
            'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
            'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
            'WY', 'AS', 'GU', 'MP', 'PR', 'VI',
          ],
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}(-\\d{4})?$',
        },
      },
      required: ['street1', 'city', 'state', 'zipCode'],
    },

    // Phone number definition (10-digit string)
    phone: {
      type: 'string',
      pattern: '^\\d{10}$',
      minLength: 10,
      maxLength: 10,
    },

    // Email address definition
    email: {
      type: 'string',
      format: 'email',
      maxLength: 254,
    },

    // SSN definition
    ssn: {
      type: 'string',
      pattern: '^\\d{3}-?\\d{2}-?\\d{4}$',
      minLength: 9,
      maxLength: 11,
    },

    // ISO date string definition (YYYY-MM-DD)
    date: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },

    // State code with Federal/DEA option for license issuing state
    issuingState: {
      type: 'string',
      enum: [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
        'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
        'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
        'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
        'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
        'WY', 'AS', 'GU', 'MP', 'PR', 'VI', 'DEA_FEDERAL',
      ],
    },

    // Yes/No answer definition
    yesNo: {
      type: 'string',
      enum: ['Y', 'N'],
    },

    // License entry definition (used for both current and prior licenses)
    licenseEntry: {
      type: 'object',
      properties: {
        licenseType: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        licenseNumber: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        issuingState: buildDefinitionReference('issuingState'),
        expirationDate: buildDefinitionReference('date'),
      },
      required: ['licenseType', 'licenseNumber', 'issuingState', 'expirationDate'],
    },

    // Education history entry definition
    educationEntry: {
      type: 'object',
      properties: {
        schoolName: {
          type: 'string',
          minLength: 1,
          maxLength: 200,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        state: {
          type: 'string',
          maxLength: 100,
        },
        zipCode: {
          type: 'string',
          maxLength: 10,
        },
        startDate: buildDefinitionReference('date'),
        completionDate: buildDefinitionReference('date'),
        degreeType: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        majorFieldOfStudy: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
      },
      required: ['schoolName', 'city', 'startDate', 'completionDate', 'degreeType', 'majorFieldOfStudy'],
    },

    // Training history entry definition
    trainingEntry: {
      type: 'object',
      properties: {
        institutionName: {
          type: 'string',
          minLength: 1,
          maxLength: 200,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        stateOrCountry: {
          type: 'string',
          maxLength: 100,
        },
        specialty: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        startDate: buildDefinitionReference('date'),
        completionDate: buildDefinitionReference('date'),
        monthsCompleted: {
          type: 'integer',
          minimum: 0,
          maximum: 120,
        },
      },
      required: ['institutionName', 'city', 'specialty', 'startDate', 'completionDate', 'monthsCompleted'],
    },

    // Document token array definition (UUID references to uploaded supporting docs)
    documentTokens: {
      type: 'array',
      minItems: 0,
      maxItems: 5,
      items: {
        type: 'string',
        pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      },
    },
  },

  properties: {

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 1 — Applicant Information (Section I: Items 1A–1B, 2, 3A–3B,
    //             4, 5A–5B, 6, 7A–7D)
    // ─────────────────────────────────────────────────────────────────────────
    applicantInformation: {
      type: 'object',
      description: 'Section I — Applicant identification information (Items 1A–1B, 2, 3A–3B, 4, 5A–5B, 6, 7A–7D)',
      additionalProperties: false,
      required: [
        'lastName',
        'firstName',
        'presentAddressStreet1',
        'presentAddressCity',
        'presentAddressState',
        'presentAddressZip',
        'primaryPhone',
        'primaryEmail',
        'ssn',
        'dateOfBirth',
        'vaTrainingFacilityCity',
        'vaTrainingFacilityState',
        'vaTrainingStartDate',
        'vaTrainingEndDate',
        'everEmployedOrAffiliatedWithVaOrFederal',
      ],
      properties: {
        // Item 1A — Name
        lastName: {
          type: 'string',
          description: 'Item 1A: Last name',
          minLength: 1,
          maxLength: 100,
        },
        firstName: {
          type: 'string',
          description: 'Item 1A: First name',
          minLength: 1,
          maxLength: 100,
        },
        middleName: {
          type: 'string',
          description: 'Item 1A: Middle name (optional)',
          maxLength: 50,
        },
        // Item 1B — Other names used
        otherNamesUsed: {
          type: 'string',
          description: 'Item 1B: Other names used (maiden name, aliases, former legal names)',
          maxLength: 200,
        },
        // Item 2 — Present address
        presentAddressStreet1: {
          type: 'string',
          description: 'Item 2: Street address line 1',
          minLength: 1,
          maxLength: 100,
        },
        presentAddressStreet2: {
          type: 'string',
          description: 'Item 2: Street address line 2 (optional)',
          maxLength: 100,
        },
        presentAddressCity: {
          type: 'string',
          description: 'Item 2: City',
          minLength: 1,
          maxLength: 100,
        },
        presentAddressState: {
          type: 'string',
          description: 'Item 2: State (2-letter code or territory abbreviation)',
          enum: [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
            'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
            'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
            'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
            'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI',
            'WY', 'AS', 'GU', 'MP', 'PR', 'VI',
          ],
        },
        presentAddressZip: {
          type: 'string',
          description: 'Item 2: ZIP code (5-digit or ZIP+4)',
          pattern: '^\\d{5}(-\\d{4})?$',
        },
        // Items 3A–3B — Phone numbers
        primaryPhone: {
          type: 'string',
          description: 'Item 3A: Primary phone number (10 digits, include area code)',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
        alternatePhone: {
          type: 'string',
          description: 'Item 3B: Alternate phone number (optional, 10 digits)',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
        // Item 4 — Social Security Number
        ssn: {
          type: 'string',
          description: 'Item 4: Social Security Number — mandatory per Public Law 93-579 and Executive Order 9397',
          pattern: '^\\d{3}-?\\d{2}-?\\d{4}$',
          minLength: 9,
          maxLength: 11,
        },
        // Items 5A–5B — Email addresses
        primaryEmail: {
          type: 'string',
          description: 'Item 5A: Primary email address',
          format: 'email',
          maxLength: 254,
        },
        alternateEmail: {
          type: 'string',
          description: 'Item 5B: Alternate email address (optional)',
          format: 'email',
          maxLength: 254,
        },
        // Item 6 — Date of birth
        dateOfBirth: {
          type: 'string',
          description: 'Item 6: Date of birth (YYYY-MM-DD)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        // Items 7A–7D — VA training facility information
        vaTrainingFacilityCity: {
          type: 'string',
          description: 'Item 7A: VA training facility city',
          minLength: 1,
          maxLength: 100,
        },
        vaTrainingFacilityState: {
          type: 'string',
          description: 'Item 7A: VA training facility state',
          maxLength: 50,
        },
        vaTrainingFacilityId: {
          type: 'string',
          description: 'VA facility station ID (optional — derived programmatically if determinable)',
          maxLength: 20,
        },
        vaTrainingStartDate: {
          type: 'string',
          description: 'Item 7B: VA training start date (YYYY-MM-DD); may be a future date',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        vaTrainingEndDate: {
          type: 'string',
          description: 'Item 7C: VA training end date (YYYY-MM-DD); must be on or after start date',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        everEmployedOrAffiliatedWithVaOrFederal: {
          type: 'string',
          description: 'Item 7D: Ever employed or affiliated with VA or another federal agency (including DOD)?',
          enum: ['Y', 'N'],
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 2 — Military Duty Status (Section II: Items 8A–8C)
    // ─────────────────────────────────────────────────────────────────────────
    militaryStatus: {
      type: 'object',
      description: 'Section II — Military duty status (Items 8A–8C)',
      additionalProperties: false,
      required: ['currentlyInUsMilitary', 'inReservesOrNationalGuard'],
      properties: {
        // Item 8A — Currently in U.S. Military
        currentlyInUsMilitary: {
          type: 'string',
          description: 'Item 8A: Are you currently in the U.S. Military?',
          enum: ['Y', 'N'],
        },
        // Item 8B — Reserves or National Guard
        inReservesOrNationalGuard: {
          type: 'string',
          description: 'Item 8B: Are you currently in the Reserves or National Guard?',
          enum: ['Y', 'N'],
        },
        // Item 8C — Branch of Service (conditional: required if 8A=Y or 8B=Y)
        branchOfService: {
          type: 'string',
          description: 'Item 8C: Branch of service (required when 8A or 8B is Yes)',
          enum: [
            'Army',
            'Navy',
            'Marine Corps',
            'Air Force',
            'Space Force',
            'Coast Guard',
            'National Guard (Army)',
            'National Guard (Air)',
          ],
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 3 — Citizenship (Section III: Items 9A–9C, 10A–10D)
    // ─────────────────────────────────────────────────────────────────────────
    citizenship: {
      type: 'object',
      description: 'Section III — Citizenship status and immigration/visa information (Items 9A–9C, 10A–10D)',
      additionalProperties: false,
      required: ['citizenshipStatus', 'countryOfCitizenship'],
      properties: {
        // Item 9A — Citizenship status
        citizenshipStatus: {
          type: 'string',
          description: 'Item 9A: Citizenship status',
          enum: ['US_BIRTH', 'NATURALIZED', 'NOT_US'],
        },
        // Item 9B — Place of birth (conditional: required when citizenshipStatus=NOT_US)
        placeOfBirth: {
          type: 'string',
          description: 'Item 9B: Place of birth (required when not a U.S. citizen)',
          maxLength: 100,
        },
        // Item 9C — Country of citizenship
        countryOfCitizenship: {
          type: 'string',
          description: 'Item 9C: Country of citizenship',
          minLength: 1,
          maxLength: 100,
        },
        // Visa category routing field (digital-only routing question — maps to 10A/10B/10C)
        visaCategory: {
          type: 'string',
          description: 'Visa/immigration category (digital routing field; drives which of Items 10A, 10B, or 10C is completed)',
          enum: ['IMMIGRANT', 'EXCHANGE_VISITOR', 'OTHER_NONIMMIGRANT'],
        },
        // Item 10A — Immigrant Visa
        immigrantVisaANumber: {
          type: 'string',
          description: 'Item 10A: USCIS Alien Registration "A" Number (format: A followed by 7–9 digits)',
          pattern: '^A\\d{7,9}$',
        },
        immigrantVisaIssueDate: {
          type: 'string',
          description: 'Item 10A: Immigrant visa issue date (YYYY-MM-DD)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        immigrantVisaExpirationDate: {
          type: 'string',
          description: 'Item 10A: Immigrant visa expiration date (YYYY-MM-DD)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        // Item 10B — Exchange Visitor (J-1/J-2) Visa
        exchangeVisitorVisaType: {
          type: 'string',
          description: 'Item 10B: Exchange visitor visa type (e.g., J-1, J-2)',
          maxLength: 10,
        },
        exchangeVisitorVisaNumber: {
          type: 'string',
          description: 'Item 10B: Exchange visitor visa number (8-digit U.S. visa number)',
          pattern: '^\\d{8}$',
        },
        exchangeVisitorVisaIssueDate: {
          type: 'string',
          description: 'Item 10B: Exchange visitor visa issue date (YYYY-MM-DD)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        exchangeVisitorVisaExpirationDate: {
          type: 'string',
          description: 'Item 10B: Exchange visitor visa expiration date (YYYY-MM-DD)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        // Item 10C — Other Non-Immigrant Visa
        otherNonimmigrantVisaType: {
          type: 'string',
          description: 'Item 10C: Other non-immigrant visa type (e.g., H-1B, TN, O-1)',
          maxLength: 10,
        },
        otherNonimmigrantVisaNumber: {
          type: 'string',
          description: 'Item 10C: Other non-immigrant visa number',
          maxLength: 20,
        },
        otherNonimmigrantVisaIssueDate: {
          type: 'string',
          description: 'Item 10C: Other non-immigrant visa issue date (YYYY-MM-DD)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        otherNonimmigrantVisaExpirationDate: {
          type: 'string',
          description: 'Item 10C: Other non-immigrant visa expiration date (YYYY-MM-DD)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        // Item 10D — DS-2019
        hasValidDs2019: {
          type: 'string',
          description: 'Item 10D: Do you have a valid DS-2019? (conditional: shown for all non-citizens)',
          enum: ['Y', 'N'],
        },
        ds2019LastValidationDate: {
          type: 'string',
          description: 'Item 10D: Date of last DS-2019 validation (YYYY-MM-DD; required when hasValidDs2019=Y)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 4 — Licenses and Credentials
    // (Section V: Items 13A–13D; Section VI: Items 14A–14D;
    //  Item 15: NPI; Items 16–17: Adverse history; Section XI explanation)
    // ─────────────────────────────────────────────────────────────────────────
    licensesAndCredentials: {
      type: 'object',
      description: 'Sections V–VI and adverse licensure history — current licenses (Items 13A–13D), prior licenses (Items 14A–14D), NPI (Item 15), adverse history (Items 16–17)',
      additionalProperties: false,
      required: ['licenseActionHistory', 'clinicalPrivilegeActionHistory'],
      properties: {
        // Items 13A–13D — Current licenses (repeating array)
        currentLicenses: {
          type: 'array',
          description: 'Section V (Items 13A–13D): Current licenses, certifications, and DEA registrations',
          minItems: 0,
          items: buildDefinitionReference('licenseEntry'),
        },
        // Items 14A–14D — Prior licenses (repeating array)
        priorLicenses: {
          type: 'array',
          description: 'Section VI (Items 14A–14D): Prior licenses, certifications, and DEA registrations',
          minItems: 0,
          items: buildDefinitionReference('licenseEntry'),
        },
        // Item 15 — NPI (optional)
        npi: {
          type: 'string',
          description: 'Item 15: National Provider Identifier (NPI) — 10-digit CMS identifier (optional)',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
        },
        // Item 16 — Adverse license action history
        licenseActionHistory: {
          type: 'string',
          description: 'Item 16: Has any license, certification, registration, or DEA certificate ever been revoked, suspended, denied, restricted, placed on probation, or voluntarily relinquished?',
          enum: ['Y', 'N'],
        },
        // Item 17 — Clinical privilege action history
        clinicalPrivilegeActionHistory: {
          type: 'string',
          description: 'Item 17: Have clinical privileges ever been revoked, suspended, denied, restricted, limited, placed on probation, or voluntarily relinquished?',
          enum: ['Y', 'N'],
        },
        // Section XI explanation for Items 16/17 (conditional: required if 16=Y or 17=Y)
        licenseAdverseExplanation: {
          type: 'string',
          description: 'Section XI: Explanation for adverse license or privilege history (Items 16/17); required when either is Y; minimum 50 characters',
          minLength: 50,
          maxLength: 4000,
        },
        // Supporting document tokens for adverse licensure explanation (optional, max 5)
        licenseAdverseSupportingDocumentTokens: buildDefinitionReference('documentTokens'),
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 5 — Education
    // (Section VII: Items 18A–18F; Section VIII: Items 19A–19C)
    // ─────────────────────────────────────────────────────────────────────────
    education: {
      type: 'object',
      description: 'Section VII (education history, Items 18A–18F) and Section VIII (international medical school, Items 19A–19C)',
      additionalProperties: false,
      required: ['educationHistory', 'internationalMedicalSchoolGraduate'],
      properties: {
        // Items 18A–18F — Education history (repeating array; minimum 1 entry)
        educationHistory: {
          type: 'array',
          description: 'Section VII (Items 18A–18F): Education and training history; at least one entry required',
          minItems: 1,
          items: buildDefinitionReference('educationEntry'),
        },
        // Item 19A — International medical school graduate
        internationalMedicalSchoolGraduate: {
          type: 'string',
          description: 'Item 19A: Are you a graduate of an international medical school?',
          enum: ['Y', 'N'],
        },
        // Item 19B — ECFMG Certificate Number (conditional: required when 19A=Y)
        ecfmgCertificateNumber: {
          type: 'string',
          description: 'Item 19B: ECFMG certificate number (required when 19A=Y)',
          maxLength: 20,
        },
        // Item 19C — ECFMG Certificate Date (conditional: required when 19A=Y)
        ecfmgCertificateDate: {
          type: 'string',
          description: 'Item 19C: ECFMG certificate date (YYYY-MM-DD; required when 19A=Y)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 6 — Training History (Section IX: Items 20A–20F)
    // ─────────────────────────────────────────────────────────────────────────
    trainingHistory: {
      type: 'object',
      description: 'Section IX — Internship, residency, and fellowship training history (Items 20A–20F)',
      additionalProperties: false,
      properties: {
        // Items 20A–20F — Training entries (repeating array; minimum 0)
        trainingHistory: {
          type: 'array',
          description: 'Section IX (Items 20A–20F): Internship/residency/fellowship history; 0 or more entries',
          minItems: 0,
          items: buildDefinitionReference('trainingEntry'),
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 7 — Additional Questions and Remarks
    // (Section X: Items 21–22; Section XI: explanations and general remarks)
    // ─────────────────────────────────────────────────────────────────────────
    additionalQuestions: {
      type: 'object',
      description: 'Section X — Medicare/Medicaid fraud history (Item 21), malpractice history (Item 22), Section XI explanations, and general remarks',
      additionalProperties: false,
      required: ['medicaidFraudHistory', 'malpracticeHistory'],
      properties: {
        // Item 21 — Medicare/Medicaid fraud history
        medicaidFraudHistory: {
          type: 'string',
          description: 'Item 21: Have you ever been convicted of or investigated for making false, fictitious, or fraudulent statements regarding health care benefits in violation of the Criminal False Claims Act?',
          enum: ['Y', 'N'],
        },
        // Item 22 — Malpractice history
        malpracticeHistory: {
          type: 'string',
          description: 'Item 22: Are you now, or have you ever been, involved in administrative, professional, or judicial proceedings in which malpractice on your part was alleged?',
          enum: ['Y', 'N'],
        },
        // Section XI explanation for Items 21/22 (conditional: required if 21=Y or 22=Y)
        fraudMalpracticeExplanation: {
          type: 'string',
          description: 'Section XI: Explanation for fraud/malpractice history (Items 21/22); required when either is Y; minimum 50 characters; for Item 22 must include name of action, date filed, court/agency, status/outcome, and personal explanation',
          minLength: 50,
          maxLength: 4000,
        },
        // Supporting document tokens for fraud/malpractice explanation (optional, max 5)
        fraudMalpracticeSupportingDocumentTokens: buildDefinitionReference('documentTokens'),
        // General remarks (Section XI — for any other item on the form)
        generalRemarks: {
          type: 'string',
          description: 'Section XI: General remarks for any numbered item on the form; indicate item number at the start of each remark (optional)',
          maxLength: 4000,
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 8 — Certification and Authorization (Section XII, page 4)
    // (Item 23A: Trainee certification; Item 23B: Certification date;
    //  Authorization for Release of Information — 5 clauses + date)
    // ─────────────────────────────────────────────────────────────────────────
    certification: {
      type: 'object',
      description: 'Section XII — Trainee certification (Item 23A–23B) and Authorization for Release of Information (5 individual clauses)',
      additionalProperties: false,
      required: [
        'traineeCertification',
        'traineeCertificationDate',
        'authorizationInquiries',
        'authorizationRelease',
        'authorizationLiabilityRelease',
        'authorizationDisclose',
        'authorizationShareAffiliated',
        'authorizationDate',
      ],
      properties: {
        // Item 23A — Trainee certification acknowledgment (must be true)
        traineeCertification: {
          type: 'boolean',
          description: 'Item 23A: Trainee certifies that all statements are true, correct, complete, and made in good faith (must be true to submit; constitutes electronic signature under ESIGN Act)',
        },
        // Item 23B — Certification date (server-side enforced; client value ignored)
        traineeCertificationDate: {
          type: 'string',
          description: 'Item 23B: Date of trainee certification (YYYY-MM-DD; set server-side to current date — client-supplied value is not used)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
        // Authorization for Release of Information — Clause 1
        authorizationInquiries: {
          type: 'boolean',
          description: 'Authorization Clause 1: Authorizes VA to make lawful inquiries to employers, educational institutions, state licensing boards, professional liability carriers, and other organizations (must be true to submit)',
        },
        // Authorization for Release of Information — Clause 2
        authorizationRelease: {
          type: 'boolean',
          description: 'Authorization Clause 2: Authorizes lawful release of records and documents to VA officials (must be true to submit)',
        },
        // Authorization for Release of Information — Clause 3
        authorizationLiabilityRelease: {
          type: 'boolean',
          description: 'Authorization Clause 3: Releases from liability all persons providing information to VA in good faith (must be true to submit)',
        },
        // Authorization for Release of Information — Clause 4
        authorizationDisclose: {
          type: 'boolean',
          description: 'Authorization Clause 4: Authorizes VA to disclose identifying information to enable credential verification inquiries (must be true to submit)',
        },
        // Authorization for Release of Information — Clause 5
        authorizationShareAffiliated: {
          type: 'boolean',
          description: 'Authorization Clause 5: Authorizes VA to share information about trainee with the affiliated institution or training program official (must be true to submit)',
        },
        // Authorization date (server-side enforced; client value ignored)
        authorizationDate: {
          type: 'string',
          description: 'Date of authorization for release of information (YYYY-MM-DD; set server-side to current date — client-supplied value is not used)',
          pattern: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
    },
  },

  required: [
    'applicantInformation',
    'militaryStatus',
    'citizenship',
    'licensesAndCredentials',
    'education',
    'trainingHistory',
    'additionalQuestions',
    'certification',
  ],
};

export default schema;
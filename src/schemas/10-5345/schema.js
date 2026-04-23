const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 10-5345',
  type: 'object',
  additionalProperties: false,
  definitions: {
    simpleAddress: {
      type: 'object',
      additionalProperties: false,
      properties: {
        street: {
          type: 'string',
          example: '123 Main St',
          maxLength: 50,
        },
        street2: {
          type: 'string',
          example: 'Apt 4',
          maxLength: 50,
        },
        city: {
          type: 'string',
          example: 'Springfield',
          maxLength: 50,
        },
        state: {
          type: 'string',
          example: 'IL',
          maxLength: 2,
          minLength: 2,
        },
        postalCode: {
          type: 'string',
          example: '62701',
          pattern: '^\\d{5}(?:-\\d{4})?$',
          maxLength: 10,
        },
        country: {
          type: 'string',
          example: 'US',
          maxLength: 3,
        },
      },
    },

    phone: {
      type: 'string',
      pattern: '^\\d{10}$',
      minLength: 10,
      maxLength: 10,
      example: '8005551234',
      description: '10-digit US phone number, digits only',
    },

    email: {
      type: 'string',
      format: 'email',
      maxLength: 256,
      example: 'veteran@example.com',
    },

    date: {
      type: 'string',
      format: 'date',
      example: '1980-01-15',
      description: 'ISO 8601 date string (YYYY-MM-DD)',
    },

    uploadedDocument: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
          type: 'string',
          maxLength: 255,
          description: 'Original filename of the uploaded document',
        },
        size: {
          type: 'integer',
          description: 'File size in bytes',
          minimum: 1,
        },
        confirmationCode: {
          type: 'string',
          description: 'Confirmation code returned by the file upload service',
        },
        documentType: {
          type: 'string',
          enum: [
            'legal_guardian_order',
            'healthcare_poa',
            'hipaa_personal_rep',
            'va_fiduciary_appointment',
            'vso_accreditation',
            'next_of_kin_documentation',
            'other',
          ],
          description: 'Category of authorization document uploaded',
        },
      },
      required: ['name', 'confirmationCode', 'documentType'],
    },

    vaFacility: {
      type: 'object',
      additionalProperties: false,
      properties: {
        facilityId: {
          type: 'string',
          description: 'VA facility ID (station number)',
          example: '583',
          maxLength: 10,
        },
        facilityName: {
          type: 'string',
          description: 'Full name of the VA Medical Center',
          example: 'VA Central Iowa Health Care System',
          maxLength: 200,
        },
        isPrimary: {
          type: 'boolean',
          description: 'Whether this is the primary enrolled facility from MPI',
        },
      },
      required: ['facilityId', 'facilityName'],
    },
  },

  properties: {
    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 1: Requestor Identity
    // ─────────────────────────────────────────────────────────────────────────

    requestorType: {
      type: 'string',
      description: 'Who is submitting this request — the Veteran or an authorized representative',
      enum: [
        'veteran',
        'legal_guardian',
        'healthcare_poa',
        'personal_representative',
        'fiduciary',
        'vso',
        'surviving_family',
      ],
    },

    veteran: {
      type: 'object',
      additionalProperties: false,
      description: "Veteran's identifying information and contact details",
      required: ['firstName', 'lastName', 'dateOfBirth', 'ssnLast4'],
      properties: {
        firstName: {
          type: 'string',
          description: "Veteran's legal first name",
          minLength: 1,
          maxLength: 30,
          pattern: "^[A-Za-z\\s'\\-]+$",
          example: 'John',
        },
        middleName: {
          type: 'string',
          description: "Veteran's middle name (optional)",
          maxLength: 30,
          pattern: "^[A-Za-z\\s'\\-]+$",
          example: 'William',
        },
        lastName: {
          type: 'string',
          description: "Veteran's legal last name",
          minLength: 1,
          maxLength: 30,
          pattern: "^[A-Za-z\\s'\\-]+$",
          example: 'Smith',
        },
        dateOfBirth: buildDefinitionReference('date'),
        ssnLast4: {
          type: 'string',
          description: 'Last 4 digits of the Veteran\'s Social Security number — used for identity verification only',
          pattern: '^\\d{4}$',
          minLength: 4,
          maxLength: 4,
          example: '1234',
        },
        vaFileNumber: {
          type: 'string',
          description: "Veteran's VA file number (optional — 7 to 10 digits)",
          pattern: '^\\d{7,10}$',
          minLength: 7,
          maxLength: 10,
          example: '1234567',
        },
        address: buildDefinitionReference('simpleAddress'),
        phone: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
      },
    },

    representative: {
      type: 'object',
      additionalProperties: false,
      description: 'Information about the authorized representative submitting on behalf of the Veteran. Present only when requestorType is not "veteran".',
      required: ['firstName', 'lastName', 'authorityType'],
      properties: {
        firstName: {
          type: 'string',
          description: "Representative's first name",
          minLength: 1,
          maxLength: 30,
          pattern: "^[A-Za-z\\s'\\-]+$",
          example: 'Jane',
        },
        lastName: {
          type: 'string',
          description: "Representative's last name",
          minLength: 1,
          maxLength: 30,
          pattern: "^[A-Za-z\\s'\\-]+$",
          example: 'Doe',
        },
        authorityType: {
          type: 'string',
          description: 'Legal authority type that establishes the representative\'s right to request records',
          enum: [
            'legal_guardian',
            'healthcare_poa',
            'personal_rep_hipaa',
            'va_fiduciary',
            'vso_accredited',
            'surviving_nok',
          ],
        },
        phone: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
        address: buildDefinitionReference('simpleAddress'),
        uploadedDocuments: {
          type: 'array',
          description: 'Legal authorization documents uploaded by the representative',
          minItems: 1,
          items: buildDefinitionReference('uploadedDocument'),
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 2: Records Location
    // ─────────────────────────────────────────────────────────────────────────

    vaFacilities: {
      type: 'array',
      description: 'One or more VA Medical Centers where the Veteran\'s records are held. First item is the primary enrolled facility from MPI.',
      minItems: 1,
      items: buildDefinitionReference('vaFacility'),
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 3: Records Requested
    // ─────────────────────────────────────────────────────────────────────────

    recordTypes: {
      type: 'object',
      additionalProperties: false,
      description: 'Categories of health information authorized for release. At least one must be selected.',
      properties: {
        // General record types
        clinicalNotes: {
          type: 'boolean',
          description: 'Clinical notes and progress notes',
        },
        labResults: {
          type: 'boolean',
          description: 'Laboratory test results',
        },
        imagingRadiology: {
          type: 'boolean',
          description: 'Imaging and radiology reports and images',
        },
        medicationHistory: {
          type: 'boolean',
          description: 'Medication history and prescription records',
        },
        dischargeSummaries: {
          type: 'boolean',
          description: 'Discharge and transfer summaries',
        },
        operativeReports: {
          type: 'boolean',
          description: 'Operative and procedure reports',
        },
        pathologyReports: {
          type: 'boolean',
          description: 'Pathology reports',
        },
        consultationReports: {
          type: 'boolean',
          description: 'Consultation and referral reports',
        },
        immunizationRecords: {
          type: 'boolean',
          description: 'Immunization and vaccination records',
        },
        vitalSigns: {
          type: 'boolean',
          description: 'Vital signs and biometric measurements',
        },
        // Sensitive record types — trigger conditional page
        substanceUseTreatment: {
          type: 'boolean',
          description: 'Substance use disorder / drug and alcohol treatment records (42 CFR Part 2). NOTE: These records require a separate specialized authorization and CANNOT be released on this form.',
        },
        psychotherapyNotes: {
          type: 'boolean',
          description: 'Psychotherapy process notes (45 CFR 164.508(a)(2)). NOTE: These records require a separate specialized authorization and CANNOT be released on this form.',
        },
        hivAidsRecords: {
          type: 'boolean',
          description: 'HIV/AIDS test results and treatment records',
        },
        geneticInformation: {
          type: 'boolean',
          description: 'Genetic test results and genetic counseling notes (GINA)',
        },
        other: {
          type: 'boolean',
          description: 'Other record types not listed above',
        },
        otherDescription: {
          type: 'string',
          description: 'Description of other record types requested (required when "other" is true)',
          maxLength: 200,
        },
      },
    },

    sensitiveRecordsAcknowledgment: {
      type: 'object',
      additionalProperties: false,
      description: 'Explicit acknowledgments for sensitive record categories. Present only when at least one sensitive type is selected on the recordTypes page.',
      properties: {
        hivAidsAcknowledged: {
          type: 'boolean',
          description: 'Veteran/representative acknowledges the implications of releasing HIV/AIDS records',
        },
        geneticInformationAcknowledged: {
          type: 'boolean',
          description: 'Veteran/representative acknowledges the implications of releasing genetic information under GINA',
        },
        substanceUseDeclined: {
          type: 'boolean',
          description: 'User has acknowledged that SUD records under 42 CFR Part 2 cannot be released on this form and has deselected that category',
        },
        psychotherapyDeclined: {
          type: 'boolean',
          description: 'User has acknowledged that psychotherapy process notes cannot be released on this form and has deselected that category',
        },
      },
    },

    recordDateRange: {
      type: 'object',
      additionalProperties: false,
      description: 'Date range for records requested — required HIPAA element under 45 CFR 164.508(c)(1)',
      required: ['rangeType'],
      properties: {
        rangeType: {
          type: 'string',
          description: 'Whether the user specifies an explicit date range or selects "from first treatment to present"',
          enum: ['specific_dates', 'first_treatment_to_present'],
        },
        startDate: {
          $ref: '#/definitions/date',
          description: 'Start date of requested record period (required when rangeType is "specific_dates")',
        },
        endDate: {
          $ref: '#/definitions/date',
          description: 'End date of requested record period (required when rangeType is "specific_dates"). Must be on or after startDate.',
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 4: Disclosure Purpose
    // ─────────────────────────────────────────────────────────────────────────

    purposeOfDisclosure: {
      type: 'object',
      additionalProperties: false,
      description: 'Purpose(s) for which the health information is to be used — required HIPAA element under 45 CFR 164.508(c)(1)(iv)',
      properties: {
        personalReview: {
          type: 'boolean',
          description: 'Personal review of records',
        },
        continuityOfCare: {
          type: 'boolean',
          description: 'Continuity of care with a private healthcare provider',
        },
        legalProceedings: {
          type: 'boolean',
          description: 'Legal proceedings or litigation',
        },
        insurance: {
          type: 'boolean',
          description: 'Insurance — life or disability insurance application or claim',
        },
        socialSecurityDisability: {
          type: 'boolean',
          description: 'Social Security disability claim',
        },
        vaDisabilityClaimSupport: {
          type: 'boolean',
          description: 'VA disability compensation or pension claim support',
        },
        employmentSecurityClearance: {
          type: 'boolean',
          description: 'Employment or security clearance purposes',
        },
        other: {
          type: 'boolean',
          description: 'Other purpose not listed above',
        },
        additionalDescription: {
          type: 'string',
          description: 'Optional narrative description of the purpose of disclosure',
          maxLength: 1000,
        },
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 5: Recipient
    // ─────────────────────────────────────────────────────────────────────────

    recipient: {
      type: 'object',
      additionalProperties: false,
      description: 'Person or organization to whom records are to be released — required HIPAA element under 45 CFR 164.508(c)(1)(ii)',
      required: ['recipientType'],
      properties: {
        recipientType: {
          type: 'string',
          description: 'Category of the recipient receiving the health information',
          enum: [
            'myself',
            'third_party_individual',
            'attorney',
            'private_healthcare_provider',
            'insurance_company',
            'social_security_administration',
            'other_organization',
          ],
        },
        name: {
          type: 'string',
          description: 'Full name of the individual or organization receiving the records',
          maxLength: 200,
          example: 'Dr. Sarah Johnson',
        },
        organizationName: {
          type: 'string',
          description: 'Name of the receiving organization (if applicable)',
          maxLength: 200,
          example: 'Springfield Medical Center',
        },
        address: buildDefinitionReference('simpleAddress'),
        phone: buildDefinitionReference('phone'),
        fax: {
          type: 'string',
          description: 'Recipient fax number (10 digits)',
          pattern: '^\\d{10}$',
          minLength: 10,
          maxLength: 10,
          example: '8005559876',
        },
        secureEmail: buildDefinitionReference('email'),
      },
    },

    // ─────────────────────────────────────────────────────────────────────────
    // Chapter 6: Authorization Terms
    // ─────────────────────────────────────────────────────────────────────────

    authorizationExpiration: {
      type: 'object',
      additionalProperties: false,
      description: 'Expiration of the authorization — required HIPAA element under 45 CFR 164.508(c)(1)(v)',
      required: ['expirationType'],
      properties: {
        expirationType: {
          type: 'string',
          description: 'Whether the authorization expires on a specific date or upon occurrence of a defined event',
          enum: ['specific_date', 'expiration_event'],
        },
        expirationDate: {
          $ref: '#/definitions/date',
          description: 'Specific future date on which the authorization expires (required when expirationType is "specific_date"). Must be a future date.',
        },
        expirationEvent: {
          type: 'string',
          description: 'Description of the event upon which the authorization expires (required when expirationType is "expiration_event")',
          maxLength: 500,
          example: 'Upon completion of litigation',
        },
      },
    },

    additionalInstructions: {
      type: 'object',
      additionalProperties: false,
      description: 'Optional additional instructions and delivery preferences for the ROI office',
      properties: {
        instructions: {
          type: 'string',
          description: 'Free-text additional instructions (e.g., specific treating physician, specific visit dates, urgency)',
          maxLength: 500,
        },
        preferredDeliveryFormat: {
          type: 'string',
          description: 'Preferred format for delivery of released records',
          enum: ['paper', 'cd_dvd', 'electronic_secure_email', 'fax'],
        },
        isUrgent: {
          type: 'boolean',
          description: 'Whether this request should be processed on an urgent basis',
        },
        urgencyReason: {
          type: 'string',
          description: 'Reason for urgent processing (required when isUrgent is true)',
          maxLength: 300,
        },
      },
    },

    rightToRevokeAcknowledged: {
      type: 'boolean',
      description: 'The Veteran or representative has read and acknowledged their right to revoke this authorization at any time, as required by 45 CFR 164.508(c)(2). Must be true for valid submission.',
    },
  },

  required: [
    'requestorType',
    'veteran',
    'vaFacilities',
    'recordTypes',
    'recordDateRange',
    'purposeOfDisclosure',
    'recipient',
    'authorizationExpiration',
    'rightToRevokeAcknowledged',
  ],
};

export default schema;
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
          minLength: 1,
          maxLength: 50,
          pattern: "^[A-Za-z\\-' ]+$",
        },
        middle: {
          type: ['string', 'null'],
          maxLength: 50,
          pattern: "^[A-Za-z\\-' ]*$",
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
          pattern: "^[A-Za-z\\-' ]+$",
        },
      },
      required: ['first', 'last'],
    },

    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        state: {
          type: 'string',
          minLength: 2,
          maxLength: 2,
          enum: [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
            'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
            'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
            'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
            'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
            'WA', 'WV', 'WI', 'WY',
          ],
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}(-\\d{4})?$',
        },
      },
      required: ['street', 'city', 'state', 'zipCode'],
    },

    phone: {
      type: 'string',
      pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
      minLength: 10,
      maxLength: 12,
    },

    date: {
      type: 'string',
      format: 'date',
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    },

    scenarioPreference: {
      type: ['string', 'null'],
      enum: ['yes', 'unsure', 'no', null],
    },

    agentContact: {
      type: 'object',
      properties: {
        fullName: buildDefinitionReference('fullName'),
        relationship: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        address: buildDefinitionReference('address'),
        homePhone: {
          type: ['string', 'null'],
          pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
          maxLength: 12,
        },
        workPhone: {
          type: ['string', 'null'],
          pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
          maxLength: 12,
        },
        mobilePhone: {
          type: ['string', 'null'],
          pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
          maxLength: 12,
        },
      },
      required: ['fullName', 'relationship', 'address'],
    },

    witnessBlock: {
      type: 'object',
      properties: {
        eligibilityConfirmed: {
          type: 'boolean',
          enum: [true],
        },
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        address: buildDefinitionReference('address'),
        signatureName: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        signatureDate: buildDefinitionReference('date'),
      },
      required: [
        'eligibilityConfirmed',
        'name',
        'address',
        'signatureName',
        'signatureDate',
      ],
    },
  },

  properties: {

    // ── Part I: Personal Information ────────────────────────────────────────
    partI: {
      type: 'object',
      description: 'Part I — Veteran Personal Information',
      additionalProperties: false,
      properties: {
        veteranFullName: buildDefinitionReference('fullName'),
        veteranDateOfBirth: buildDefinitionReference('date'),
        veteranAddress: buildDefinitionReference('address'),
        veteranHomePhone: {
          type: ['string', 'null'],
          pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
          maxLength: 12,
        },
        veteranWorkPhone: {
          type: ['string', 'null'],
          pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
          maxLength: 12,
        },
        veteranMobilePhone: {
          type: ['string', 'null'],
          pattern: '^\\d{3}[- .]?\\d{3}[- .]?\\d{4}$',
          maxLength: 12,
        },
      },
      required: [
        'veteranFullName',
        'veteranDateOfBirth',
        'veteranAddress',
      ],
    },

    // ── Part II: Health Care Agent ──────────────────────────────────────────
    partII: {
      type: 'object',
      description: 'Part II — Durable Power of Attorney for Health Care',
      additionalProperties: false,
      properties: {

        // Screen 3 — appointment decision
        appointHealthCareAgent: {
          type: 'string',
          enum: ['appoint', 'decline'],
          description: 'Whether the Veteran chooses to appoint a Health Care Agent',
        },

        // Screen 4 — primary agent (present only when appointHealthCareAgent === "appoint")
        primaryAgent: {
          oneOf: [
            buildDefinitionReference('agentContact'),
            { type: 'null' },
          ],
        },

        // Screen 5 — alternate agent decision
        appointAlternateAgent: {
          type: ['string', 'null'],
          enum: ['appoint_alternate', 'no_alternate', null],
          description: 'Whether the Veteran chooses to appoint an Alternate Health Care Agent',
        },

        // Screen 5 — alternate agent contact (present only when appointAlternateAgent === "appoint_alternate")
        alternateAgent: {
          oneOf: [
            buildDefinitionReference('agentContact'),
            { type: 'null' },
          ],
        },
      },
      required: ['appointHealthCareAgent'],
    },

    // ── Part III: Living Will ───────────────────────────────────────────────
    partIII: {
      type: 'object',
      description: 'Part III — Living Will',
      additionalProperties: false,
      properties: {

        // Section A — Life-Sustaining Treatment Scenarios (Screen 6)
        sectionA: {
          type: 'object',
          description: 'Part III-A — Life-Sustaining Treatment Preferences',
          additionalProperties: false,
          properties: {
            scenarioUnconscious: {
              oneOf: [
                buildDefinitionReference('scenarioPreference'),
              ],
              description: 'Scenario 1: unconscious, coma, or vegetative state with little/no chance of recovery',
            },
            scenarioBrainDamage: {
              oneOf: [
                buildDefinitionReference('scenarioPreference'),
              ],
              description: 'Scenario 2: permanent severe brain damage, unable to recognize family/friends',
            },
            scenarioPermanentDependence: {
              oneOf: [
                buildDefinitionReference('scenarioPreference'),
              ],
              description: 'Scenario 3: permanent condition requiring others to help with daily needs',
            },
            scenarioBreathingMachine: {
              oneOf: [
                buildDefinitionReference('scenarioPreference'),
              ],
              description: 'Scenario 4: breathing machine and bed-bound for rest of life',
            },
            scenarioUnrelievablePain: {
              oneOf: [
                buildDefinitionReference('scenarioPreference'),
              ],
              description: 'Scenario 5: pain or severe symptoms that cannot be relieved',
            },
            scenarioImminentDeath: {
              oneOf: [
                buildDefinitionReference('scenarioPreference'),
              ],
              description: 'Scenario 6: condition that will cause death soon even with treatment',
            },
            scenarioOther: {
              oneOf: [
                buildDefinitionReference('scenarioPreference'),
              ],
              description: 'Scenario 7: other situation described by Veteran',
            },
            scenarioOtherDescription: {
              type: ['string', 'null'],
              maxLength: 500,
              description: 'Free-text description for Scenario 7 "Other" — required when scenarioOther is not null',
            },
          },
        },

        // Section B — Mental Health Preferences (Screen 7)
        sectionB: {
          type: ['string', 'null'],
          maxLength: 4000,
          description: 'Part III-B — Optional mental health care preferences narrative',
        },

        // Section C — Additional Preferences (Screen 8)
        sectionC: {
          type: ['string', 'null'],
          maxLength: 4000,
          description: 'Part III-C — Optional social, cultural, faith-based, or other care preferences narrative',
        },

        // Section D — Strictness of Living Will (Screen 9)
        sectionD: {
          type: ['string', 'null'],
          enum: ['general_guide', 'strictly_followed', null],
          description: 'Part III-D — How strictly the Veteran wants Living Will preferences followed',
        },
      },
    },

    // ── Part IV: Signatures ─────────────────────────────────────────────────
    partIV: {
      type: 'object',
      description: 'Part IV — Signatures and Attestations',
      additionalProperties: false,
      properties: {

        // Section A — Veteran Signature (Screen 10)
        sectionA: {
          type: 'object',
          description: 'Part IV-A — Veteran Attestation and Digital Signature',
          additionalProperties: false,
          properties: {
            veteranAttestation: {
              type: 'boolean',
              enum: [true],
              description: 'Veteran certifies the form accurately describes their preferences',
            },
            veteranSignatureName: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
              description: 'Veteran typed-name digital signature',
            },
            veteranSignatureDate: buildDefinitionReference('date'),
          },
          required: [
            'veteranAttestation',
            'veteranSignatureName',
            'veteranSignatureDate',
          ],
        },

        // Section B — Witness Signatures (Screens 12–13)
        sectionB: {
          type: 'object',
          description: 'Part IV-B — Witness Attestations',
          additionalProperties: false,
          properties: {
            witness1: buildDefinitionReference('witnessBlock'),
            witness2: buildDefinitionReference('witnessBlock'),
          },
          required: ['witness1', 'witness2'],
        },
      },
      required: ['sectionA', 'sectionB'],
    },

    // ── Submission Metadata ─────────────────────────────────────────────────
    metadata: {
      type: 'object',
      description: 'Submission metadata — populated by vets-api / transformForSubmit; not rendered in form UI',
      additionalProperties: false,
      properties: {
        formNumber: {
          type: 'string',
          enum: ['10-0137'],
        },
        formVersion: {
          type: 'string',
          enum: ['MAR2024_10E1E'],
        },
        submissionSource: {
          type: 'string',
          enum: ['va_gov_digital'],
        },
        mviIcn: {
          type: ['string', 'null'],
          maxLength: 17,
          description: 'MVI Integration Control Number — encrypted at rest',
        },
        prefillSource: {
          type: ['string', 'null'],
          enum: ['va_profile', null],
        },
        submissionTimestamp: {
          type: ['string', 'null'],
          format: 'date-time',
          description: 'ISO 8601 timestamp of submission',
        },
        formSessionId: {
          type: ['string', 'null'],
          pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
          description: 'UUID identifying the form session',
        },
      },
    },
  },

  required: ['partI', 'partIV'],
};

export default schema;
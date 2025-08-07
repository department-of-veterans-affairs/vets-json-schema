import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import commonDefinitions from '../../common/definitions';

let definitions = cloneDeep(commonDefinitions);
definitions = pick(
  definitions,
  'address',
  'email',
  'files',
  'fullNameNoSuffix',
  'phone',
  'privacyAgreementAccepted',
  'ssn',
  'ssnLastFour',
  'veteranServiceNumber',
);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DEPENDENTS MANAGEMENT FORM (21-686C & 21-674)',
  type: 'object',
  definitions: merge(definitions, {
    date: {
      type: 'string',
      pattern: '^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$',
    },
    generic_location: {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            outside_usa: {
              type: 'boolean',
              enum: [false],
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                state: { type: 'string' },
              },
              required: ['city', 'state'],
            },
          },
          required: ['location'],
        },
        {
          type: 'object',
          properties: {
            outside_usa: {
              type: 'boolean',
              enum: [true],
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                country: { type: 'string' },
              },
              required: ['city', 'country'],
            },
          },
          required: ['location'],
        },
      ],
    },
    generic_location_alt: {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            outside_usa: {
              type: 'boolean',
              enum: [false],
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                state: { type: 'string' },
                postal_code: { type: 'string' },
              },
              required: ['city', 'state', 'postal_code'],
            },
          },
          required: ['location'],
        },
        {
          type: 'object',
          properties: {
            outside_usa: {
              type: 'boolean',
              enum: [true],
            },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                country: { type: 'string' },
                postal_code: { type: 'string' },
              },
              required: ['city', 'country'],
            },
          },
          required: ['location'],
        },
      ],
    },
  }),
  properties: {
    use_v2: { type: 'boolean' },
    days_till_expires: { type: 'integer' },

    veteran_information: {
      type: 'object',
      properties: {
        full_name: { $ref: '#/definitions/fullNameNoSuffix' },
        birth_date: { $ref: '#/definitions/date' },
        ssnLastFour: { $ref: '#/definitions/ssnLastFour' },
        va_file_last_four: { type: 'string', pattern: '^\\d{4}$' },
      },
    },

    veteran_contact_information: {
      type: 'object',
      properties: {
        veteran_address: { $ref: '#/definitions/address' },
        phone_number: { $ref: '#/definitions/phone' },
        email_address: { $ref: '#/definitions/email' },
      },
      required: ['veteran_address', 'phone_number', 'email_address'],
    },

    spouse_information: {
      type: 'object',
      properties: {
        full_name: { $ref: '#/definitions/fullNameNoSuffix' },
        ssn: { $ref: '#/definitions/ssn' },
        birth_date: { $ref: '#/definitions/date' },
        is_veteran: { type: 'boolean' },
        va_file_number: { type: 'string' },
        service_number: { $ref: '#/definitions/veteranServiceNumber' },
      },
      required: ['full_name', 'ssn', 'birth_date', 'is_veteran'],
    },

    does_live_with_spouse: {
      type: 'object',
      oneOf: [
        {
          type: 'object',
          properties: {
            spouse_does_live_with_veteran: { type: 'boolean', enum: [true] },
            spouse_income: { type: 'string' },
          },
          required: ['spouse_does_live_with_veteran'],
        },
        {
          type: 'object',
          properties: {
            spouse_does_live_with_veteran: { type: 'boolean', enum: [false] },
            spouse_income: { type: 'string' },
            address: { $ref: '#/definitions/address' },
            current_spouse_reason_for_separation: { type: 'string' },
            other: { type: 'string' },
          },
          required: ['spouse_does_live_with_veteran', 'current_spouse_reason_for_separation', 'address'],
        },
      ],
    },

    current_marriage_information: {
      type: 'object',
      oneOf: [
        {
          allOf: [
            { $ref: '#/definitions/generic_location' },
            {
              type: 'object',
              properties: {
                type_of_marriage: {
                  not: {
                    type: 'string',
                    enum: ['OTHER'],
                  },
                },
                date: { $ref: '#/definitions/date' },
              },
              required: ['type_of_marriage', 'location', 'date'],
            },
          ],
        },
        {
          allOf: [
            { $ref: '#/definitions/generic_location' },
            {
              type: 'object',
              properties: {
                type_of_marriage: {
                  type: 'string',
                  enum: ['OTHER'],
                },
                type_other: { type: 'string' },
                date: { $ref: '#/definitions/date' },
              },
              required: ['type_of_marriage', 'type_other', 'location', 'date'],
            },
          ],
        },
      ],
    },

    spouse_marriage_history: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          full_name: { $ref: '#/definitions/fullNameNoSuffix' },
          reason_marriage_ended: { type: 'string' },
          other_reason_marriage_ended: { type: 'string' },
          start_date: { $ref: '#/definitions/date' },
          end_date: { $ref: '#/definitions/date' },
          start_location: { $ref: '#/definitions/generic_location' },
          end_location: { $ref: '#/definitions/generic_location' },
        },
        required: ['start_location', 'end_location', 'end_date', 'start_date', 'reason_marriage_ended', 'full_name'],
        oneOf: [
          {
            type: 'object',
            properties: {
              reason_marriage_ended: { type: 'string', enum: ['Other'] },
            },
            required: ['reason_marriage_ended', 'other_reason_marriage_ended'],
          },
          {
            type: 'object',
            properties: {
              reason_marriage_ended: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
            },
            required: ['reason_marriage_ended'],
          },
        ],
      },
    },

    veteran_marriage_history: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          full_name: { $ref: '#/definitions/fullNameNoSuffix' },
          reason_marriage_ended: { type: 'string' },
          other_reason_marriage_ended: { type: 'string' },
          start_date: { $ref: '#/definitions/date' },
          end_date: { $ref: '#/definitions/date' },
          start_location: { $ref: '#/definitions/generic_location' },
          end_location: { $ref: '#/definitions/generic_location' },
        },
        required: ['end_location', 'start_location', 'end_date', 'start_date', 'reason_marriage_ended', 'full_name'],
        oneOf: [
          {
            type: 'object',
            properties: {
              reason_marriage_ended: { type: 'string', enum: ['Other'] },
            },
            required: ['reason_marriage_ended', 'other_reason_marriage_ended'],
          },
          {
            type: 'object',
            properties: {
              reason_marriage_ended: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
            },
            required: ['reason_marriage_ended'],
          },
        ],
      },
    },

    report_divorce: {
      type: 'object',
      properties: {
        spouse_income: { type: 'string' },
        date: { $ref: '#/definitions/date' },
        divorce_location: { $ref: '#/definitions/generic_location' },
        reason_marriage_ended: { type: 'string' },
        explanation_of_other: { type: 'string' },
        full_name: { $ref: '#/definitions/fullNameNoSuffix' },
        birth_date: { $ref: '#/definitions/date' },
      },
      required: ['date', 'divorce_location', 'reason_marriage_ended', 'full_name', 'birth_date'],
      oneOf: [
        {
          type: 'object',
          properties: {
            reason_marriage_ended: { type: 'string', enum: ['Other'] },
          },
          required: ['reason_marriage_ended', 'explanation_of_other'],
        },
        {
          type: 'object',
          properties: {
            reason_marriage_ended: { type: 'string', enum: ['Death', 'Divorce', 'Annulment'] },
          },
          required: ['reason_marriage_ended'],
        },
      ],
    },

    children_to_add: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          full_name: { $ref: '#/definitions/fullNameNoSuffix' },
          birth_date: { $ref: '#/definitions/date' },
          ssn: { $ref: '#/definitions/ssn' },
          birth_location: {
            $ref: '#/definitions/generic_location_alt',
          },
          is_biological_child: {
            type: 'boolean',
            oneOf: [
              {
                type: 'boolean',
                enum: [true],
                required: ['relationship_to_child'],
              },
              {
                type: 'boolean',
                enum: [false],
              },
            ],
          },
          relationship_to_child: {
            type: 'object',
            properties: {
              adopted: { type: 'boolean' },
              stepchild: { type: 'boolean' },
            },
          },
          is_biological_child_of_spouse: { type: 'boolean' },
          date_entered_household: {
            $ref: '#/definitions/date',
          },
          biological_parent_name: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          biological_parent_ssn: { $ref: '#/definitions/ssn' },
          biological_parent_dob: {
            $ref: '#/definitions/date',
          },
          does_child_have_disability: {
            oneOf: [
              {
                type: 'boolean',
                enum: [true],
                required: ['does_child_have_permanent_disability'],
              },
              {
                type: 'boolean',
                enum: [false],
              },
            ],
          },
          does_child_have_permanent_disability: { type: 'boolean' },
          does_child_live_with_you: {
            type: 'boolean',
            oneOf: [
              {
                type: 'boolean',
                enum: [false],
                required: ['living_with'],
              },
              {
                type: 'boolean',
                enum: [true],
              },
            ],
          },
          has_child_ever_been_married: {
            type: 'boolean',
            oneOf: [
              {
                type: 'boolean',
                enum: [true],
                required: ['marriage_end_date', 'marriage_end_reason'],
              },
              {
                type: 'boolean',
                enum: [false],
              },
            ],
          },
          marriage_end_date: {
            $ref: '#/definitions/date',
          },
          marriage_end_reason: {
            type: 'string',
            oneOf: [
              {
                type: 'string',
                enum: ['Other'],
                required: ['marriage_end_description'],
              },
              {
                type: 'string',
                enum: ['Death', 'Divorce', 'Annulment'],
              },
            ],
          },
          marriage_end_description: { type: 'string' },
          income_in_last_year: { type: 'string' },
          address: {
            $ref: '#/definitions/address',
          },
          living_with: {
            type: 'object',
            required: ['first', 'last'],
            properties: {
              first: { type: 'string' },
              middle: { type: 'string' },
              last: { type: 'string' },
            },
          },
        },
        required: [
          'does_child_live_with_you',
          'has_child_ever_been_married',
          'does_child_have_disability',
          'is_biological_child_of_spouse',
          'date_entered_household',
          'biological_parent_name',
          'biological_parent_ssn',
          'biological_parent_dob',
          'is_biological_child',
          'birth_location',
          'ssn',
          'full_name',
          'birth_date',
        ],
      },
    },

    student_information: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          full_name: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          birth_date: {
            $ref: '#/definitions/date',
          },
          ssn: { $ref: '#/definitions/ssn' },
          is_parent: { type: 'boolean' },
          student_income: { type: 'string' },
          address: {
            $ref: '#/definitions/address',
          },
          was_married: {
            oneOf: [
              {
                type: 'boolean',
                enum: [true],
                required: ['was_married', 'marriage_date'],
              },
              {
                type: 'boolean',
                enum: [false],
                required: ['was_married'],
              },
            ],
          },
          marriage_date: { $ref: '#/definitions/date' },
          type_of_program_or_benefit: {
            type: 'object',
            oneOf: [
              {
                type: 'object',
                properties: {
                  type_of_program_or_benefit: {
                    type: 'object',
                    properties: {
                      other: { type: 'boolean', enum: [true] },
                    },
                  },
                },
                required: ['other_program_or_benefit'],
              },
              {
                type: 'object',
                properties: {
                  type_of_program_or_benefit: {
                    type: 'object',
                    properties: {
                      other: { type: 'boolean', enum: [false] },
                    },
                  },
                },
                anyOf: [
                  {
                    type: 'object',
                    properties: {
                      type_of_program_or_benefit: {
                        type: 'object',
                        properties: { other: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefit_payment_date'],
                  },
                  {
                    type: 'object',
                    properties: {
                      type_of_program_or_benefit: {
                        type: 'object',
                        properties: { ch35: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefit_payment_date'],
                  },
                  {
                    type: 'object',
                    properties: {
                      type_of_program_or_benefit: {
                        type: 'object',
                        properties: { fry: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefit_payment_date'],
                  },
                  {
                    type: 'object',
                    properties: {
                      type_of_program_or_benefit: {
                        type: 'object',
                        properties: { feca: { type: 'boolean', enum: [true] } },
                      },
                    },
                    required: ['benefit_payment_date'],
                  },
                ],
              },
              {
                type: 'object',
                properties: {
                  type_of_program_or_benefit: {
                    type: 'object',
                    properties: {
                      ch35: { type: 'boolean', enum: [false] },
                      fry: { type: 'boolean', enum: [false] },
                      feca: { type: 'boolean', enum: [false] },
                      other: { type: 'boolean', enum: [false] },
                    },
                  },
                },
              },
            ],
          },
          other_program_or_benefit: {
            type: 'string',
          },
          tuition_is_paid_by_gov_agency: { type: 'boolean' },
          benefit_payment_date: {
            $ref: '#/definitions/date',
          },
          school_information: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              student_is_enrolled_full_time: {
                type: 'boolean',
              },
              date_full_time_ended: { $ref: '#/definitions/date' },
              is_school_accredited: { type: 'boolean' },
              current_term_dates: {
                type: 'object',
                properties: {
                  official_school_start_date: { $ref: '#/definitions/date' },
                  expected_student_start_date: { $ref: '#/definitions/date' },
                  expected_graduation_date: { $ref: '#/definitions/date' },
                },
                required: ['official_school_start_date', 'expected_student_start_date', 'expected_graduation_date'],
              },
              student_did_attend_school_last_term: { type: 'boolean' },
              last_term_school_information: {
                type: 'object',
                properties: {
                  term_begin: { type: 'string' },
                  date_term_ended: { type: 'string' },
                },
              },
            },
            required: [
              'name',
              'student_is_enrolled_full_time',
              'student_did_attend_school_last_term',
              'current_term_dates',
              'is_school_accredited',
            ],
            oneOf: [
              {
                type: 'object',
                properties: {
                  student_did_attend_school_last_term: { type: 'boolean', enum: [true] },
                  last_term_school_information: {
                    type: 'object',
                    required: ['term_begin', 'date_term_ended'],
                  },
                },
                required: ['student_did_attend_school_last_term', 'last_term_school_information'],
              },
              {
                type: 'object',
                properties: {
                  student_did_attend_school_last_term: { type: 'boolean', enum: [false] },
                },
                required: ['student_did_attend_school_last_term'],
              },
            ],
          },
          claims_or_receives_pension: { type: 'boolean' },
          student_networth_information: {
            type: 'object',
            properties: {
              savings: { type: 'string' },
              securities: { type: 'string' },
              real_estate: { type: 'string' },
              other_assets: { type: 'string' },
              total_value: { type: 'string' },
            },
          },
          student_expected_earnings_next_year: {
            type: 'object',
            properties: {
              earnings_from_all_employment: { type: 'string' },
              annual_social_security_payments: { type: 'string' },
              other_annuities_income: { type: 'string' },
              all_other_income: { type: 'string' },
            },
          },
          student_earnings_from_school_year: {
            type: 'object',
            properties: {
              earnings_from_all_employment: { type: 'string' },
              annual_social_security_payments: { type: 'string' },
              other_annuities_income: { type: 'string' },
              all_other_income: { type: 'string' },
            },
          },

          remarks: { type: 'string' },
        },
        required: [
          'full_name',
          'birth_date',
          'ssn',
          'is_parent',
          'address',
          'was_married',
          'tuition_is_paid_by_gov_agency',
          'school_information',
          'claims_or_receives_pension',
          'type_of_program_or_benefit',
          'other_program_or_benefit',
          'benefit_payment_date',
        ],
      },
    },

    step_children: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          who_does_the_stepchild_live_with: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          address: { $ref: '#/definitions/address' },
          living_expenses_paid: { type: 'string' },
          supporting_stepchild: { type: 'boolean' },
          full_name: { $ref: '#/definitions/fullNameNoSuffix' },
          ssn: { $ref: '#/definitions/ssn' },
          birth_date: { $ref: '#/definitions/date' },
        },
        required: ['who_does_the_stepchild_live_with', 'address', 'supporting_stepchild', 'full_name', 'ssn', 'birth_date'],
        oneOf: [
          {
            type: 'object',
            properties: {
              supporting_stepchild: { type: 'boolean', enum: [true] },
            },
            required: ['supporting_stepchild', 'living_expenses_paid'],
          },
          {
            type: 'object',
            properties: {
              supporting_stepchild: { type: 'boolean', enum: [false] },
            },
            required: ['supporting_stepchild'],
          },
        ],
      },
    },

    deaths: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependent_death_location: { $ref: '#/definitions/generic_location' },
          deceased_dependent_income: { type: 'string' },
          dependent_death_date: { $ref: '#/definitions/date' },
          dependent_type: { type: 'string' },
          child_status: {
            type: 'object',
            properties: {
              child_under18: { type: 'boolean' },
              step_child: { type: 'boolean' },
            },
          },
          full_name: { $ref: '#/definitions/fullNameNoSuffix' },
          ssn: { $ref: '#/definitions/ssn' },
          birth_date: { $ref: '#/definitions/date' },
        },
        required: ['dependent_death_location', 'dependent_death_date', 'dependent_type', 'full_name', 'ssn', 'birth_date'],
        oneOf: [
          {
            type: 'object',
            properties: {
              dependent_type: { type: 'string', enum: ['CHILD'] },
            },
            required: ['dependent_type', 'child_status'],
          },
          {
            type: 'object',
            properties: {
              dependent_type: { type: 'string', enum: ['SPOUSE', 'DEPENDENT_PARENT'] },
            },
            required: ['dependent_type'],
          },
        ],
      },
    },

    child_marriage: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependent_income: { type: 'string' },
          date_married: {
            $ref: '#/definitions/date',
          },
          full_name: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          ssn: { $ref: '#/definitions/ssn' },
          birth_date: {
            $ref: '#/definitions/date',
          },
        },
        required: ['date_married', 'full_name', 'ssn', 'birth_date'],
      },
    },

    child_stopped_attending_school: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependent_income: { type: 'string' },
          date_child_left_school: {
            $ref: '#/definitions/date',
          },
          full_name: {
            $ref: '#/definitions/fullNameNoSuffix',
          },
          ssn: { $ref: '#/definitions/ssn' },
          birth_date: {
            $ref: '#/definitions/date',
          },
        },
        required: ['date_child_left_school', 'full_name', 'ssn', 'birth_date'],
      },
    },

    spouse_supporting_documents: {
      $ref: '#/definitions/files',
    },
    child_supporting_documents: {
      $ref: '#/definitions/files',
    },
    household_income: { type: 'boolean' },

    statement_of_truth_signature: { type: 'string' },
    statement_of_truth_certified: { type: 'boolean' },
  },
  required: ['statement_of_truth_certified', 'statement_of_truth_signature'],
};

export default schema;
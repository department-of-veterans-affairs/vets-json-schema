import _ from 'lodash';
import definitions from '../../common/definitions';
import constants from '../../common/constants';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'IRIS Ask a Question',
  type: 'object',
  definitions: {
    ..._.pick(definitions, ['address', 'date', 'dateRange', 'email', 'phone', 'ssn', 'privacyAgreementAccepted']),
    first: {
      type: 'string',
      minLength: 1,
      maxLength: 30,
    },
    middle: {
      type: 'string',
      minLength: 1,
      maxLength: 1,
    },
    last: {
      type: 'string',
      minLength: 1,
      maxLength: 30,
    },
    suffix: {
      type: 'string',
      enum: ['Jr.', 'Sr.', 'II', 'III', 'IV'],
    },
    preferredName: {
      type: 'string',
      minLength: 1,
      maxLength: 30,
    },
  },
  additionalProperties: false,
  required: ['contactInformation', 'personalInformation', 'preferredContactMethod', 'topic', 'inquiryType', 'query', 'veteranStatus'],
  properties: {
    contactInformation: {
        type: 'object',
        properties: {
          email: {
            $ref: '#/definitions/email',
          },
          phone: {
            $ref: '#/definitions/phone',
          },
          address: {
            $ref: '#/definitions/address',
          },
        },
        anyOf: [
          {
            required: ['email'],
          },
          {
            required: ['phone'],
          },
          {
            required: ['address'],
          },
        ],
    },
    personalInformation: {
      type: 'object',
      properties: {
        dateOfBirth: {
          $ref: '#/definitions/date',
        },
        first: {
          $ref: '#/definitions/first',
        },
        middle: {
          $ref: '#/definitions/middle',
        },
        last: {
          $ref: '#/definitions/last',
        },
        suffix: {
          $ref: '#/definitions/suffix',
        },
        preferredName: {
          $ref: '#/definitions/preferredName',
        },    
        socialSecurityNumber: {
          $ref: '#/definitions/ssn',
        },
        serviceNumber: {
          type: 'string',
          pattern: '^\\d{0,12}$',
        },
      },
      required: ['first', 'last'],
    },
    avaProfile: {
      type: 'object',
      properties: {
        schoolInfo: {
          type: 'object',
          properties: {
            schoolFacilityCode: {
              type: 'string',
              pattern: '^\\d{8}$',
            },
            schoolName: {
              type: 'string',
              minLength: 1
            }
          },
        },
        businessPhone: {
          $ref: '#/definitions/phone',
        },
        businessEmail: {
          $ref: '#/definitions/email',
        },
      },
    },
    preferredContactMethod: {
      default: 'email',
      type: 'string',
      enum: ['email', 'phone', 'mail'],
      enumNames: ['Email', 'Phone', 'US Mail'],
    },
    topic: {
      type: 'object',
      anyOf: [
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Caregiver Support Program'],
            },
            levelTwo: {
              type: 'string',
              enum: [
                'General Caregiver Support/Education',
                'Comprehensive Family Caregiver Program',
                'VA Supportive Services',
              ],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Health & Medical Issues & Services'],
            },
            levelTwo: {
              type: 'object',
              anyOf: [
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: ['Health/Medical Eligibility & Programs'],
                    },
                    levelThree: {
                      type: 'string',
                      enum: [
                        'Apply for Health Benefits (Dependents)',
                        'Apply for Health Benefits (Veterans)',
                        'CHAMPVA CITI (In house Treatment Initiated)',
                        'CHAMPVA-Civilian Health & Medical Prog',
                        'CHAMPVA Password/Access Problems',
                        'Children of Women Vietnam Vets Healthcare',
                        'Licensed Health Professional Employment',
                        'Medical Care-Overseas Vets (Foreign Med)',
                        'Medical Care for Veterans within USA',
                        'Spina Bifida Program for Children of Vet',
                      ],
                    },
                  },
                },
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: ['Prosthetics, Med Devices & Sensory Aids'],
                    },
                    levelThree: {
                      type: 'string',
                      enum: [
                        'Artificial Limbs/Orthotics',
                        'Automobile Adaptive Equipment',
                        'Clothing Allowance',
                        'Durable Medical Equipment',
                        'Eyeglasses',
                        'Hearing Aids',
                        'Home Improvements & Structural Alterations',
                        'Home Oxygen',
                        'Wheelchairs',
                        'Prosthetics Web Site',
                        'Technical Problems',
                        'Other Prosthetics Issues',
                      ],
                    },
                  },
                },
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: ['Women Veterans Health Care'],
                    },
                    levelThree: {
                      type: 'string',
                      enum: ['Complaint about Women Vets health care', 'General Concern'],
                    },
                  },
                },
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: [
                        'Medical Care Issues at Specific Facility',
                        'My HealtheVet',
                        'Vet Center / Readjustment Counseling Service (RCS)',
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['VA Ctr for Women Vets, Policies & Progs'],
            },
            levelTwo: {
              type: 'string',
              enum: ['Policy Questions', 'Question about Women Veterans Programs'],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Burial & Memorial Benefits (NCA)'],
            },
            levelTwo: {
              type: 'object',
              anyOf: [
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: ['Burial Benefits'],
                    },
                    levelThree: {
                      type: 'string',
                      enum: ['Compensation Request', 'All Other Burial Benefit Inquiries'],
                    },
                  },
                },
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: [
                        'Pre-Need Burial Eligibility',
                        'Headstones & Markers',
                        'Presidential Memorial Certificates',
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Home Loan Guaranty/All VA Mortgage Issues'],
            },
            levelTwo: {
              type: 'object',
              anyOf: [
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: ['Home Loan/Mortgage Web access & Tech problem'],
                    },
                    levelThree: {
                      type: 'string',
                      enum: ['Home Loan VIP Portal Access', 'Web Page Issues'],
                    },
                  },
                },
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: ['Home Loan/Mortgage Certificates of Eligibility', 'Home Loan/Mortgage Guaranty Issues'],
                    },
                  },
                },
              ],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Compensation (Service-Connected Benefits)'],
            },
            levelTwo: {
              type: 'string',
              enum: [
                'Filing for compensation benefits',
                'Status of a pending claim',
                'Issues/Questions about compensation received',
                'Direct deposit inquiries',
                'Aid and Attendance Benefits',
                'Guardianship/Custodians',
              ],
            },
          },
        },
        {
          properties: {
            levelOne: {
              type: 'string',
              enum: ['Education/ GI Bill'],
            },
            levelTwo: {
              type: 'object',
              anyOf: [
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: ['Work Study'],
                    },
                    levelThree: {
                      type: 'string',
                      enum: [
                        'Application',
                        'Inquiries (VAI)',
                        'Position Descriptions',
                        'Time Cards',
                        'Signed Contracts',
                      ],
                    },
                  },
                },
                {
                  properties: {
                    subLevelTwo: {
                      type: 'string',
                      enum: [
                        'Post-9/11 GI Bill',
                        'School Officials Only',
                        'On-the-Job Training (OJT)/Apprenticeship',
                        'Survivors & Dependents',
                        'MGIB - Active Duty (Ch 30)',
                        'MGIB - Selected Reserve (Ch 1606)',
                        'School Certifying Official File Transfer',
                        'Licensing and Certification Tests',
                        'VR&E Counselors',
                        'Transfer of Benefits to Dependents (TEB)',
                        'Tuition Assistance Top-Up',
                        'WAVE',
                        'Counseling',
                        'VEAP (Ch 32)',
                        'Reserve Ed Asst Prog (Ch 1607) (REAP)',
                        'National Testing Programs',
                        'Colmery Section 110',
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
        {},
      ],
      properties: {
        vaMedicalCenter: {
          type: 'string',
          enum: [
            '405HK',
            '405GA',
            '405HA',
            '405HB',
            '405HF',
            '405GC',
            '405',
            '436GA',
            '436GB',
            '436GC',
            '436GD',
            '436GF',
            '436GH',
            '436GI',
            '436GJ',
            '436GK',
            '436A4',
            '436GL',
            '436GM',
            '436HC',
            '436QB',
            '436QC',
            '436QA',
            '436GN',
            '436',
            '437GA',
            '437GB',
            '437GD',
            '437GI',
            '437GF',
            '437GJ',
            '437GK',
            '437GL',
            '437',
            '437GC',
            '618GA',
            '618GB',
            '618GD',
            '618GG',
            '656GA',
            '656GB',
            '437GE',
            '656GC',
            '618GI',
            '618GK',
            '618GL',
            '618GJ',
            '618GN',
            '618QB',
            '618',
            '656',
            '438GA',
            '636A8',
            '636A6',
            '636GP',
            '636GX',
            '438GC',
            '438GD',
            '568A4',
            '568GA',
            '568GB',
            '568HF',
            '568HG',
            '568HJ',
            '568HK',
            '568HP',
            '438GE',
            '438GF',
            '568',
            '438',
            '442GB',
            '636GA',
            '636GB',
            '568HB',
            '568HH',
            '636A4',
            '636A5',
            '636GQ',
            '636GL',
            '636GV',
            '636',
            '442GC',
            '442GD',
            '501GJ',
            '554GB',
            '554GC',
            '554GD',
            '554GE',
            '554GF',
            '554GG',
            '554GH',
            '575GA',
            '554GI',
            '575GB',
            '554QA',
            '442QE',
            '575QC',
            '554',
            '575',
            '459GA',
            '459GB',
            '459GC',
            '459GD',
            '459GG',
            '459',
            '459GE',
            '402GA',
            '402GB',
            '402GC',
            '402GD',
            '402HB',
            '402HC',
            '402HL',
            '402GE',
            '402GF',
            '402',
            '405HC',
            '405HE',
            '608GA',
            '608GC',
            '608GD',
            '608HA',
            '608',
            '463GA',
            '463GB',
            '463GC',
            '463GD',
            '463GE',
            '463',
            '501G2',
            '501GA',
            '501GB',
            '501GC',
            '501GD',
            '501GE',
            '501GH',
            '501GI',
            '501GK',
            '501HB',
            '504BZ',
            '504HA',
            '519GB',
            '756GA',
            '501GM',
            '501GN',
            '501',
            '502GA',
            '502GB',
            '629GA',
            '629GB',
            '629GC',
            '629GD',
            '667GB',
            '629BY',
            '502GG',
            '629GE',
            '629GF',
            '502GF',
            '502GE',
            '502QB',
            '502',
            '629',
            '667',
            '503GA',
            '503GB',
            '503GC',
            '529GA',
            '529GB',
            '529GC',
            '529GD',
            '542GA',
            '542GE',
            '562GA',
            '562GC',
            '646GE',
            '693GG',
            '595GA',
            '595GC',
            '595GD',
            '595GE',
            '642GC',
            '646A4',
            '646GB',
            '646GC',
            '646GD',
            '693GE',
            '529GF',
            '693B4',
            '693GA',
            '693GB',
            '693GC',
            '693GD',
            '693GF',
            '595GF',
            '562GD',
            '562GE',
            '503GD',
            '503GE',
            '642QA',
            '595QA',
            '529A4',
            '642GH',
            '595',
            '503',
            '642',
            '646',
            '693',
            '542',
            '562',
            '529',
            '504BY',
            '504GA',
            '504HB',
            '549GE',
            '549GF',
            '549GH',
            '549GI',
            '580BY',
            '519GA',
            '519GD',
            '519HC',
            '519HD',
            '519HF',
            '549A4',
            '549BY',
            '549GA',
            '549GB',
            '549GC',
            '549GD',
            '635GB',
            '580BZ',
            '580GA',
            '580GC',
            '674GA',
            '674GB',
            '674GC',
            '674GD',
            '671GO',
            '667GC',
            '671A4',
            '671B0',
            '671BY',
            '671BZ',
            '671GA',
            '671GB',
            '671GC',
            '671GD',
            '671GE',
            '671GF',
            '671GG',
            '671GH',
            '671GI',
            '671GJ',
            '671GK',
            '671GL',
            '671GN',
            '549GJ',
            '674HB',
            '740GA',
            '740GC',
            '740GD',
            '740GB',
            '740GE',
            '756GB',
            '580GF',
            '580GG',
            '674A4',
            '674BY',
            '580GD',
            '580GE',
            '580GH',
            '671GP',
            '740GH',
            '740GJ',
            '671GQ',
            '674GF',
            '740GI',
            '549GM',
            '549GL',
            '756QB',
            '580QB',
            '549GK',
            '580GJ',
            '504',
            '519',
            '671',
            '674',
            '756',
            '549',
            '580',
            '740',
            '506GA',
            '539GB',
            '541BY',
            '541BZ',
            '541GB',
            '541GC',
            '541GD',
            '538GA',
            '538GB',
            '538GC',
            '538GD',
            '552GA',
            '552GB',
            '552GD',
            '541GE',
            '541GF',
            '541GG',
            '541GH',
            '541GI',
            '562GB',
            '757GB',
            '541GJ',
            '541GK',
            '757GC',
            '646GA',
            '538GE',
            '757GD',
            '757GA',
            '539GE',
            '539GF',
            '541GL',
            '541GM',
            '538GF',
            '541GN',
            '581GG',
            '539QC',
            '539QD',
            '757',
            '538',
            '539',
            '541',
            '552',
            '506GB',
            '506GC',
            '553GA',
            '553GB',
            '515BY',
            '515GA',
            '515GB',
            '515GC',
            '585GA',
            '585GC',
            '585GD',
            '585HA',
            '585HB',
            '655GA',
            '655GB',
            '655GC',
            '655GD',
            '655GH',
            '655GI',
            '655GF',
            '655GE',
            '655GG',
            '506',
            '515',
            '655',
            '553',
            '585',
            '508GA',
            '508GE',
            '508GF',
            '508GH',
            '509A0',
            '534BY',
            '557GA',
            '557GB',
            '573GA',
            '619GA',
            '509GA',
            '557HA',
            '508GG',
            '573GJ',
            '508GI',
            '508GK',
            '557GC',
            '508GJ',
            '557GE',
            '534GE',
            '557GF',
            '619QB',
            '573GM',
            '508GL',
            '509QA',
            '508',
            '509',
            '557',
            '512GA',
            '512GC',
            '512GD',
            '512GE',
            '512GF',
            '460HM',
            '613GA',
            '613GB',
            '688GD',
            '512A5',
            '688GE',
            '613GG',
            '512GG',
            '512QA',
            '688GF',
            '512',
            '539GA',
            '626GC',
            '581GA',
            '603GD',
            '603GE',
            '596A4',
            '596GA',
            '596HA',
            '603GA',
            '603GC',
            '539GD',
            '596GD',
            '596GC',
            '603GF',
            '603GH',
            '596GB',
            '626GJ',
            '539A4',
            '596',
            '603',
            '539GC',
            '537BY',
            '552GC',
            '610A4',
            '610GB',
            '583GA',
            '583GB',
            '603GB',
            '603GG',
            '610GC',
            '610GD',
            '583GC',
            '583GE',
            '583GD',
            '583QB',
            '583GG',
            '583QD',
            '610BY',
            '610',
            '583',
            '540GA',
            '540GB',
            '540GC',
            '613GD',
            '613GE',
            '613HK',
            '581GB',
            '540HK',
            '540GD',
            '517GB',
            '581GH',
            '517',
            '613',
            '540',
            '581',
            '544BZ',
            '544GB',
            '544GC',
            '544GD',
            '544GE',
            '544GF',
            '534GB',
            '534GC',
            '509GB',
            '534GD',
            '544GG',
            '534GF',
            '544',
            '534',
            '546B0',
            '546BZ',
            '546GA',
            '546GB',
            '546GC',
            '516BZ',
            '516GA',
            '516GB',
            '516GC',
            '516GD',
            '516GE',
            '516GF',
            '573A4',
            '573BY',
            '573GB',
            '573GD',
            '573GE',
            '573GF',
            '573GG',
            '516GH',
            '520BZ',
            '520GB',
            '546GD',
            '546GE',
            '548GA',
            '548GB',
            '548GC',
            '548GD',
            '548GE',
            '548GF',
            '573GI',
            '675GA',
            '675GE',
            '675GF',
            '520GC',
            '573GK',
            '675GD',
            '675GB',
            '675GC',
            '675GG',
            '573GL',
            '673BZ',
            '673GB',
            '673GC',
            '673GF',
            '546GF',
            '546GH',
            '520QA',
            '573GN',
            '673GG',
            '573QK',
            '673GH',
            '516',
            '673',
            '546',
            '548',
            '573',
            '675',
            '528A4',
            '528A5',
            '528A6',
            '528A7',
            '528A8',
            '528GB',
            '528GC',
            '528GD',
            '528GK',
            '528GQ',
            '528GR',
            '526GA',
            '526GB',
            '526GD',
            '630A4',
            '630A5',
            '630GA',
            '630GB',
            '630GC',
            '632GA',
            '632HA',
            '632HB',
            '632HC',
            '632HD',
            '620A4',
            '620GA',
            '620GB',
            '620GD',
            '620GE',
            '620GF',
            '620GG',
            '620GH',
            '620',
            '630',
            '632',
            '526',
            '528',
            '531GE',
            '687GB',
            '668GB',
            '660GA',
            '531GG',
            '531GI',
            '531GJ',
            '531',
            '537GA',
            '537HA',
            '550BY',
            '550GA',
            '550GD',
            '556GA',
            '556GC',
            '578GA',
            '578GD',
            '578GF',
            '578GG',
            '607HA',
            '657A5',
            '657GA',
            '537GD',
            '607GF',
            '550GF',
            '578GC',
            '578GE',
            '537',
            '550',
            '556',
            '578',
            '556GD',
            '585GB',
            '618BY',
            '607GC',
            '607GD',
            '607GE',
            '618GE',
            '676GA',
            '676GB',
            '676GC',
            '695GD',
            '676GD',
            '676GE',
            '695BY',
            '695GA',
            '695GC',
            '695HK',
            '618GH',
            '618GM',
            '607GG',
            '607',
            '676',
            '695',
            '558GA',
            '558GB',
            '558GC',
            '565GA',
            '565GC',
            '659GB',
            '659BY',
            '659GA',
            '565GD',
            '590GC',
            '637GB',
            '565GE',
            '637GA',
            '565GF',
            '565GG',
            '659GC',
            '637GC',
            '565GL',
            '659BZ',
            '558GD',
            '558GE',
            '558GF',
            '565GH',
            '565GI',
            '565GK',
            '565QC',
            '565QD',
            '565GM',
            '637',
            '659',
            '558',
            '565',
            '561A4',
            '561BY',
            '561BZ',
            '561GA',
            '561GB',
            '561GD',
            '561GE',
            '561GF',
            '561GH',
            '561GI',
            '460HE',
            '460HO',
            '561GJ',
            '642GD',
            '561GK',
            '642GA',
            '460HG',
            '460GD',
            '642GF',
            '561',
            '460GA',
            '460HK',
            '460HL',
            '460GC',
            '460',
            '586GA',
            '586GB',
            '586GC',
            '614GA',
            '614GC',
            '520A0',
            '520BY',
            '586GF',
            '586GD',
            '586GE',
            '586UMC',
            '586GG',
            '586QB',
            '586QC',
            '520',
            '586',
            '640A0',
            '640A4',
            '640BY',
            '570GA',
            '570GB',
            '612A4',
            '612B4',
            '612BY',
            '612GD',
            '612GE',
            '612GF',
            '612GG',
            '612GH',
            '605GA',
            '605GB',
            '605GC',
            '605GD',
            '605GE',
            '600GA',
            '600GB',
            '600GC',
            '600GD',
            '654GA',
            '662GE',
            '640HC',
            '600GE',
            '662GF',
            '662GA',
            '662GB',
            '662GC',
            '662GD',
            '664BY',
            '664GA',
            '664GB',
            '664GC',
            '664GD',
            '640GA',
            '640GB',
            '640HA',
            '640HB',
            '691GE',
            '691GF',
            '691GG',
            '691GK',
            '691GL',
            '691GM',
            '691GN',
            '691GO',
            '640GC',
            '654GD',
            '570GC',
            '662GG',
            '612GI',
            '691A4',
            '691GB',
            '691GC',
            '691GD',
            '612GJ',
            '605BZ',
            '612QD',
            '600',
            '605',
            '612',
            '640',
            '662',
            '664',
            '691',
            '570',
            '568HA',
            '666GF',
            '666GB',
            '666GC',
            '666GD',
            '666GE',
            '442MB',
            '442HK',
            '666QA',
            '666QB',
            '666QC',
            '442QD',
            '666',
            '442',
            '518GA',
            '518GB',
            '518GE',
            '518GG',
            '523A4',
            '523A5',
            '523BY',
            '523BZ',
            '523GA',
            '523GB',
            '523GC',
            '523GD',
            '631BY',
            '631GC',
            '631GD',
            '650GA',
            '650GB',
            '631GE',
            '631GF',
            '631QB',
            '518',
            '523',
            '631',
            '613GC',
            '613GF',
            '652GA',
            '688GA',
            '652GE',
            '658GA',
            '658GB',
            '658GC',
            '621GJ',
            '590GB',
            '652GF',
            '658GE',
            '658GD',
            '621GC',
            '652GH',
            '652GG',
            '590GD',
            '652GB',
            '590',
            '652',
            '658',
            '614GB',
            '564GA',
            '564GB',
            '598GD',
            '598A0',
            '598GA',
            '598GB',
            '598GC',
            '598GE',
            '598GF',
            '667GA',
            '614GN',
            '564GD',
            '598GG',
            '598GH',
            '598',
            '564',
            '614GD',
            '621GA',
            '626A4',
            '626GA',
            '626GE',
            '626GF',
            '626GG',
            '626GH',
            '614GF',
            '614GE',
            '621BY',
            '614GG',
            '614GH',
            '614GI',
            '621GI',
            '626GM',
            '626GL',
            '626GK',
            '621GG',
            '621GK',
            '626QA',
            '626QB',
            '626QC',
            '621QE',
            '626GP',
            '626GO',
            '614',
            '621',
            '626',
            '564BY',
            '657A0',
            '657A4',
            '657GB',
            '657GD',
            '589A4',
            '589G1',
            '589GB',
            '589GD',
            '589GZ',
            '564GC',
            '589JB',
            '657GS',
            '589HK',
            '564GF',
            '657GX',
            '657GY',
            '589JF',
            '589',
            '657',
            '520GA',
            '521GA',
            '521GB',
            '521GC',
            '521GD',
            '521GE',
            '521GF',
            '619A4',
            '619GB',
            '521GG',
            '619GD',
            '521GI',
            '521GH',
            '679HK',
            '619GE',
            '679GA',
            '521GJ',
            '521',
            '619',
            '679',
            '653BY',
            '653GA',
            '653GB',
            '648GA',
            '648GB',
            '648GD',
            '692GA',
            '648GF',
            '692GB',
            '648GG',
            '648GE',
            '687GC',
            '648GH',
            '531GH',
            '648GI',
            '648GJ',
            '653QA',
            '648',
            '653',
            '692',
            '623BY',
            '623GA',
            '635GA',
            '635GC',
            '635GD',
            '635HB',
            '564GE',
            '623GB',
            '635GE',
            '635GF',
            '635GG',
            '635QB',
            '623QC',
            '635QC',
            '623',
            '635',
            '654GB',
            '593GC',
            '660GC',
            '654GC',
            '593GD',
            '593GE',
            '593GF',
            '593GG',
            '654GE',
            '593GH',
            '593QC',
            '654QD',
            '593',
            '654',
            '589A5',
            '589A6',
            '589A7',
            '589GC',
            '589G9',
            '589JC',
            '644BY',
            '644GA',
            '644GB',
            '644GC',
            '644GD',
            '649GA',
            '649GB',
            '649GC',
            '649GD',
            '649GE',
            '649HK',
            '678GA',
            '678GB',
            '678GD',
            '678GE',
            '644GF',
            '678GG',
            '678GC',
            '644GE',
            '678GF',
            '644GG',
            '644GH',
            '678QA',
            '644QB',
            '678QB',
            '644',
            '649',
            '678',
            '648A4',
            '687GA',
            '687HA',
            '668GA',
            '663HK',
            '668HK',
            '663A4',
            '663GA',
            '663GB',
            '663GD',
            '663GC',
            '663GE',
            '663',
            '668',
            '687',
            '650GD',
            '650QA',
            '650QB',
            '650',
            '688GB',
            '688QA',
            '688',
            '689A4',
            '689GA',
            '689GB',
            '689GC',
            '689GD',
            '689GE',
            '689HC',
            '689HK',
            '689',
            '660GJ',
            '660GB',
            '660GD',
            '660GE',
            '660GG',
            '660QC',
            '660',
            '672B0',
            '672BZ',
            '672GC',
            '672GE',
            '672GD',
            '672',
            '672GA',
            '672GB',
            '459GF',
            '459GH',
            '358',
          ],
        },
        routeToState: {
          type: 'string',
          enum: constants.usaStates,
        },
        facilityCode: {
          type: 'string',
        },
        stateOfResidence: {
          type: 'string',
          enum: constants.usaStates,
        },
        stateOfSchool: {
          type: 'string',
          enum: constants.usaStates,
        },
        socialSecurityNumber: {
          $ref: '#/definitions/ssn',
        },
      },
    },
    inquiryType: {
      type: 'string',
      enum: [
        'Question',
        'Compliment',
        'Service Complaint',
        'Suggestion',
        'Status of Claim',
        'Status of Appeal at a Local VA Office',
        'Status of Appeals at BVA, Wash DC',
      ],
    },
    query: {
      type: 'string',
    },
    veteranStatus: {
      type: 'object',
      required: ['veteranStatus'],
      properties: {
        veteranStatus: {
          type: 'string',
          enum: ['vet', 'behalf of vet', 'dependent', 'general'],
          enumNames: [
            'For myself as a Veteran',
            'On behalf of a Veteran',
            'For the dependent of a Veteran',
            'A general question',
          ],
        },
        isDependent: {
          type: 'boolean',
        },
        relationshipToVeteran: {
          type: 'string',
          enum: [
            'Attorney',
            'Authorized 3rd Party',
            'Daughter',
            'Dependent Child',
            'Ex-spouse',
            'Father',
            'Funeral Director',
            'General Question; Not Applicable',
            'Guardian/Fiduciary',
            'Helpless Child',
            'Mother',
            'Other',
            'Sibling',
            'Son',
            'Spouse',
            'Surviving Spouse',
            'Veteran',
            'VSO',
          ],
        },
        veteranIsDeceased: {
          type: 'boolean',
        },
        dateOfDeath: {
          $ref: '#/definitions/date',
        },
      },
    },
    dependentInformation: {
      type: 'object',
      properties: {
        relationshipToVeteran: {
          enum: constants.dependentRelationships,
          type: 'string',
        },
        first: {
          $ref: '#/definitions/first',
        },
        last: {
          $ref: '#/definitions/last',
        },
        address: {
          $ref: '#/definitions/address',
        },
        phone: {
          $ref: '#/definitions/phone',
        },
        email: {
          $ref: '#/definitions/email',
        },
      },
    },
    veteranInformation: {
      type: 'object',
      properties: {
        first: {
          $ref: '#/definitions/first',
        },
        last: {
          $ref: '#/definitions/last',
        },
        address: {
          $ref: '#/definitions/address',
        },
        phone: {
          $ref: '#/definitions/phone',
        },
        email: {
          $ref: '#/definitions/email',
        },
      },
    },
    veteranServiceInformation: {
      type: 'object',
      properties: {
        claimNumber: {
          type: 'string',
          pattern: '^\\d{6,8}$',
        },
        branchOfService: {
          type: 'string',
          enum: [
            'Air Force',
            'Air Force Reserves',
            'Air Force National Guard',
            'Air Force Nursing Corps (AFNC)',
            'Army',
            'Army National Guard',
            'Army Reserves',
            'Coast Guard',
            "Coast Guard Women's Reserve (SPARS)",
            'Environmental Services Administration',
            'Marine Corps',
            'Marine Corps Reserves',
            'Natl Oceanic & Atmospheric Admin (NOAA)',
            'Navy',
            'Navy Reserves',
            'Navy Nursing Corps (NNC)',
            'Philippines Guerilla',
            'Philippines Scout',
            'Public Health Service',
            'U. S. Merchant Marine',
            "Women's Air Force Service Pilots (WASPS)",
            "Women's Army Auxiliary Corps (WAAC)",
            "Women's Army Corps (WACs)",
            'Womens Voluntary Emerg Srv (WAVES)',
            'Other',
          ],
        },
        serviceDateRange: {
          $ref: '#/definitions/dateRange',
        },
      },
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
};

export default schema;

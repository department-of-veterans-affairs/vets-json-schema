import _ from 'lodash';
import definitions from '../../common/definitions';

const orig = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(orig, [
  'date',
  'dateRange',
  'fullNameNoSuffix',
  'email',
  'profileAddress',
  'yesNoSchema',
  'phone',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-0976 APPLICATION FOR APPROVAL OF A PROGRAM IN A FOREIGN COUNTRY',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: [
    'submissionReasons',
    'institutionClassification',
    'institutionProfile',
    'institutionDetails',
    'programs',
    'acknowledgement7',
    'acknowledgement8',
    'acknowledgement9',
    'acknowledgement10a',
    'acknowledgement10b',
    'isMedicalSchool',
    'financialRepresentative',
    'schoolCertifyingOfficial',
    'authorizingOfficial',
    'dateSigned',
    'isAuthenticated',
  ],
  properties: {
    // PART I — GENERAL INFORMATION
    submissionReasons: {
      type: 'object',
      additionalProperties: false, // block unknown keys
      properties: {
        initialApplication: { type: 'boolean' },
        approvalOfNewPrograms: { type: 'boolean' },
        reapproval: { type: 'boolean' },
        updateInformation: { type: 'boolean' },
        other: { type: 'boolean' },
        updateInformationText: { type: 'string', maxLength: 500 },
        otherText: { type: 'string', maxLength: 500 },
      },

      allOf: [
        // Require at least one checkbox selected
        {
          anyOf: [
            { required: ['initialApplication'], properties: { initialApplication: { enum: [true] } } },
            { required: ['approvalOfNewPrograms'], properties: { approvalOfNewPrograms: { enum: [true] } } },
            { required: ['reapproval'], properties: { reapproval: { enum: [true] } } },
            { required: ['updateInformation'], properties: { updateInformation: { enum: [true] } } },
            { required: ['other'], properties: { other: { enum: [true] } } },
          ],
        },

        // If "other" is true, require otherText
        {
          anyOf: [
            { not: { properties: { other: { enum: [true] } }, required: ['other'] } },
            { required: ['otherText'], properties: { otherText: { minLength: 1 } } },
          ],
        },

        // If "updateInformation" is true, require updateInformationText
        {
          anyOf: [
            { not: { properties: { updateInformation: { enum: [true] } }, required: ['updateInformation'] } },
            { required: ['updateInformationText'], properties: { updateInformationText: { minLength: 1 } } },
          ],
        },
      ],
    },
    institutionClassification: {
      type: 'string',
      enum: ['public', 'privateForProfit', 'privateNotForProfit'],
    },

    institutionProfile: {
      type: 'object',
      additionalProperties: false,
      properties: {
        isIHL: { $ref: '#/definitions/yesNoSchema' },
        ihlDegreeTypes: { type: 'string', maxLength: 500 },
        participatesInTitleIV: { $ref: '#/definitions/yesNoSchema' },
        opeidNumber: { type: 'string', pattern: '^[0-9]{8}$', minLength: 8, maxLength: 8 },
      },
      allOf: [
        // If isIHL == yes, require ihlDegreeTypes (non-empty)
        {
          anyOf: [
            // Case A: isIHL not true -> no requirement
            { not: { properties: { isIHL: { enum: ['Y', true] } }, required: ['isIHL'] } },
            // Case B: isIHL true -> ihlDegreeTypes required and non-empty
            { required: ['ihlDegreeTypes'], properties: { ihlDegreeTypes: { minLength: 1 } } },
          ],
        },
        // If participatesInTitleIV == yes, require opeidNumber (non-empty)
        {
          anyOf: [
            {
              not: {
                properties: { participatesInTitleIV: { enum: ['Y', true] } },
                required: ['participatesInTitleIV'],
              },
            },
            { required: ['opeidNumber'], properties: { opeidNumber: { minLength: 8 } } },
          ],
        },
      ],
    },
    institutionDetails: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['institutionName', 'physicalAddress'],
        additionalProperties: false,
        properties: {
          institutionName: { type: 'string' },
          vaFacilityCode: { type: 'string', pattern: '^[A-Za-z0-9]{8}$' },
          physicalAddress: { $ref: '#/definitions/profileAddress' },
          //Could be two different ones figma doesn thandle that yet
          mailingAddress: { $ref: '#/definitions/profileAddress' },
        },
      },
    },
    website: { type: 'string', format: 'uri', maxLength: 300 },

    // PART II — DEGREE PROGRAMS
    programs: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['programName', 'totalProgramLength', 'weeksPerTerm', 'entryRequirements', 'creditHours'],
        additionalProperties: false,
        properties: {
          programName: { type: 'string', maxLength: 200 },
          totalProgramLength: { type: 'string', maxLength: 100 }, // e.g., "2 year", "3 year"
          weeksPerTerm: { type: 'integer', minimum: 0, maximum: 100 },
          entryRequirements: { type: 'string', maxLength: 1000 },
          creditHours: {
            type: 'number',
            minimum: 0,
            maximum: 10000,
            multipleOf: 0.01, // allows 2 decimal places
          },
        },
      },
    },

    // PART III — SCHOOL CERTIFICATION & ACKNOWLEDGEMENTS
    acknowledgement7: { type: 'string', minLength: 2, maxLength: 3 },
    acknowledgement8: { type: 'string', minLength: 2, maxLength: 3 },
    acknowledgement9: { type: 'string', minLength: 2, maxLength: 3 },
    acknowledgement10a: {
      type: 'object',
      additionalProperties: false,
      required: ['financiallySound'],
      properties: {
        financiallySound: { $ref: '#/definitions/yesNoSchema' },
        financialSoundnessExplanation: { type: 'string', maxLength: 500 },
      },
      allOf: [
        {
          anyOf: [
            { not: { properties: { financiallySound: { enum: ['N', false] } }, required: ['financiallySound'] } },
            {
              required: ['financialSoundnessExplanation'],
              properties: { financialSoundnessExplanation: { minLength: 1 } },
            },
          ],
        },
      ],
    },
    acknowledgement10b: { type: 'string', minLength: 2, maxLength: 3 },

    //Optional
    governingBodyAndFaculty: {
      type: 'array',
      items: {
        type: 'object',
        required: ['fullName', 'title'],
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
          title: { type: 'string', maxLength: 200 },
        },
      },
    },

    // PART IV — MEDICAL SCHOOL INFORMATION ONLY

    isMedicalSchool: { $ref: '#/definitions/yesNoSchema' },
    listedInWDOMS: { $ref: '#/definitions/yesNoSchema' }, // World Directory of Medical Schools
    accreditingAuthorityName: { type: 'string', maxLength: 100 },
    programAtLeast32Months: { $ref: '#/definitions/yesNoSchema' },
    graduatedLast12Months: { $ref: '#/definitions/yesNoSchema' },
    graduatedClasses: {
      type: 'array',
      minItems: 2,
      maxItems: 2, // last two 12-month periods
      items: {
        type: 'object',
        required: ['graduationDate', 'graduatesCount'],
        additionalProperties: false,
        properties: {
          graduationDate: { $ref: '#/definitions/date' },
          graduatesCount: { type: 'integer', minimum: 0, maximum: 50000 },
        },
      },
    },

    // PART V — INSTITUTION CONTACTS

    financialRepresentative: {
      type: 'object',
      required: ['fullName', 'email'],
      additionalProperties: false,
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        email: { $ref: '#/definitions/email' },
      },
    },

    schoolCertifyingOfficial: {
      type: 'object',
      required: ['fullName', 'email'],
      additionalProperties: false,
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        email: { $ref: '#/definitions/email' },
      },
    },

    // PART VI — CERTIFICATION AND SIGNATURE
    authorizingOfficial: {
      type: 'object',
      required: ['fullName', 'signature'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        signature: { type: 'string', minLength: 1, maxLength: 300 },
      },
    },
    dateSigned: { $ref: '#/definitions/date' },

    isAuthenticated: { type: 'boolean' },
  },
  allOf: [
    // 1) If isMedicalSchool == Yes, require all the medical-school fields
    {
      anyOf: [
        // Case A: Not Yes -> no extra requirements
        { not: { properties: { isMedicalSchool: { enum: ['Y', true] } }, required: ['isMedicalSchool'] } },

        // Case B: Yes -> require the rest (and make the string non-empty)
        {
          required: [
            'listedInWDOMS',
            'accreditingAuthorityName',
            'programAtLeast32Months',
            'graduatedLast12Months',
            'graduatedClasses',
          ],
          properties: {
            accreditingAuthorityName: { minLength: 1 },
          },
        },
      ],
    },

    // 2) If graduatedLast12Months == Yes, enforce exactly 2 class entries
    {
      anyOf: [
        {
          not: { properties: { graduatedLast12Months: { enum: ['Y', true] } }, required: ['graduatedLast12Months'] },
        },
        { required: ['graduatedClasses'], properties: { graduatedClasses: { minItems: 2, maxItems: 2 } } },
      ],
    },
  ],
};

export default schema;

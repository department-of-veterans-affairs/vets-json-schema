import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(origDefinitions, [
  'date',
  'fullNameNoSuffix',
  'usaPhone',
  'phone',
  'yesNoSchema',
  'email',
  'profileAddress',
]);

// Override only the `country` field on profileAddress to be a plain string (no enum)
const profileAddressWithFreeCountry = _.cloneDeep(pickedDefinitions.profileAddress || {});
if (profileAddressWithFreeCountry?.properties?.country) {
  profileAddressWithFreeCountry.properties.country = {
    type: 'string',
    minLength: 2,
    maxLength: 100,
    pattern: '^(?!\\s*$).+', // not just whitespace
  };
  delete profileAddressWithFreeCountry.properties.country.enum;
  delete profileAddressWithFreeCountry.properties.country.enumNames;
}

const textAndNumbersRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$';
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Designation Of Certifying Official(S) (22-8794)',
  type: 'object',
  additionalProperties: false,
  definitions: {
    ...pickedDefinitions,
    profileAddress: profileAddressWithFreeCountry,
  },
  required: [
    'designatingOfficial',
    'institutionDetails',
    'primaryOfficialDetails',
    'statementOfTruthSignature',
    'dateSigned',
  ],
  properties: {
    designatingOfficial: {
      type: 'object',
      required: ['fullName', 'title', 'emailAddress'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        phoneNumber: {
          $ref: '#/definitions/usaPhone',
        },
        internationalPhoneNumber: {
          $ref: '#/definitions/phone',
        },
        emailAddress: definitions.email,
      },
    },
    institutionDetails: {
      type: 'object',
      additionalProperties: false,
      required: ['institutionName', 'hasVaFacilityCode', 'institutionAddress'],
      properties: {
        hasVaFacilityCode: definitions.yesNoSchema,
        facilityCode: {
          oneOf: [
            { type: 'string', pattern: '^[a-zA-Z0-9]{8}$' },
            { type: 'string', enum: [''] }, // keep if UI sends '' when hasVaFacilityCode === false
          ],
        },
        institutionName: { type: 'string' },
        institutionAddress: { $ref: '#/definitions/profileAddress' },
      },
      allOf: [
        {
          anyOf: [
            // hasVaFacilityCode !== true -> facilityCode not required
            {
              type: 'object',
              not: {
                properties: { hasVaFacilityCode: { enum: [true] } },
                required: ['hasVaFacilityCode'],
              },
            },
            // hasVaFacilityCode === true -> facilityCode required & must match pattern
            {
              type: 'object',
              required: ['facilityCode'],
              properties: {
                facilityCode: { type: 'string', pattern: '^[a-zA-Z0-9]{8}$' },
              },
            },
          ],
        },
      ],
    },
    primaryOfficialDetails: {
      type: 'object',
      required: ['fullName', 'title', 'emailAddress'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        phoneNumber: {
          $ref: '#/definitions/usaPhone',
        },
        internationalPhoneNumber: {
          $ref: '#/definitions/phone',
        },
        emailAddress: definitions.email,
      },
    },
    primaryOfficialTraining: {
      type: 'object',
      required: ['trainingCompletionDate', 'trainingExempt'],
      properties: {
        trainingCompletionDate: {
          type: 'string',
          format: 'date',
        },
        trainingExempt: {
          type: 'boolean',
        },
      },
    },
    primaryOfficialBenefitStatus: {
      type: 'object',
      required: ['hasVaEducationBenefits'],
      properties: {
        hasVaEducationBenefits: definitions.yesNoSchema,
      },
    },
    additionalCertifyingOfficials: {
      type: 'array',
      items: {
        type: 'object',
        required: ['additionalCertifyingOfficialsDetails'],
        properties: {
          additionalCertifyingOfficialsDetails: {
            type: 'object',
            required: ['fullName', 'title', 'emailAddress'],
            properties: {
              fullName: { $ref: '#/definitions/fullNameNoSuffix' },
              title: {
                type: 'string',
                minLength: 1,
                maxLength: 50,
              },
              phoneNumber: {
                $ref: '#/definitions/usaPhone',
              },
              internationalPhoneNumber: {
                $ref: '#/definitions/phone',
              },
              emailAddress: definitions.email,
              trainingCompletionDate: {
                type: 'string',
                format: 'date',
              },
              hasVaEducationBenefits: definitions.yesNoSchema,
              trainingExempt: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
    hasReadOnlyCertifyingOfficial: definitions.yesNoSchema,
    readOnlyCertifyingOfficial: {
      type: 'array',
      items: {
        type: 'object',
        required: ['fullName'],
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        },
      },
    },
    remarks: {
      type: 'string',
      maxLength: 500,
      pattern: textAndNumbersRegex,
    },
    statementOfTruthSignature: {
      type: 'string',
    },
    dateSigned: {
      $ref: '#/definitions/date',
    },
  },
};
export default schema;

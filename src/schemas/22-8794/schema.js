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
]);

const textAndNumbersRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$';
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Designation Of Certifying Official(S) (22-8794)',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: [
    'designatingOfficial',
    'institutionDetails',
    'primaryCertifyingOfficial',
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
          pattern: '^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$',
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
      hasVaFacilityCode: definitions.yesNoSchema,
      facilityCode: {
        type: 'string',
        pattern: '^[a-zA-Z0-9]{8}$',
      },
      institutionName: {
        type: 'string',
      },
      address: {
        $ref: '#/definitions/addressSchema',
      },
      required: ['facilityCode', 'institutionName', 'hasVaFacilityCode', 'address'],
    },
    primaryCertifyingOfficial: {
      type: 'object',
      required: ['fullName', 'title', 'emailAddress'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
          pattern: '^(?!\\s)(?!.*?\\s{2,})[a-zA-Z0-9]+$',
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
                pattern: '^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$',
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

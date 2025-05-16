import _, { min } from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(origDefinitions, ['date']);

const textAndNumbersRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$';
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Designation Of Certifying Official(S) (22-8794)',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: ['designatedOfficial', 'institutionDetails', 'statementOfTruthSignature', 'dateSigned'],
  properties: {
    designatedOfficial: {
      type: 'object',
      required: ['first', 'last', 'title', 'phone', 'email'],
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
          pattern: '^(?!\\s)(?!.*?\\s{2,})[a-zA-Z0-9]+$',
        },
        middle: {
          type: 'string',
          maxLength: 50,
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
          pattern: '^(?!\\s)(?!.*?\\s{2,})[a-zA-Z0-9]+$',
        },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
          pattern: '^(?!\\s)(?!.*?\\s{2,})[a-zA-Z0-9]+$',
        },
        phone: {
          type: 'string',
          enum: ['usPhone', 'internationalPhone'],
        },
        usPhone: {
          type: 'string',
          pattern: '^(||d{10}|||+?[0-9])$',
        },
        internationalPhone: {
          type: 'string',
          pattern: '^(||d{15}|||+?[0-9])$',
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
    },
    institutionDetails: {
      type: 'object',
      hasVaFacilityCode: {
        type: 'string',
        enum: ['yes', 'no'],
      },
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
      required: ['facilityCode', 'hasVaFacilityCode', 'address'],
    },
    primaryCertifyingOfficial: {
      type: 'object',
      required: ['first', 'last', 'title', 'phone', 'email'],
      properties: {
        first: {
          type: 'string',
        },
        middle: {
          type: 'string',
        },
        last: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        phone: {
          type: 'string',
          enum: ['usPhone', 'internationalPhone'],
        },
        usPhone: {
          type: 'string',
          pattern: '^(||d{10}|||+?[0-9])$',
        },
        internationalPhone: {
          type: 'string',
          pattern: '^(||d{15}|||+?[0-9])$',
        },
        email: {
          type: 'string',
          format: 'email',
        },
        trainingCompletionDate: {
          type: 'string',
          format: 'date',
        },
        hasVaEducationBenefits: {
          type: 'string',
          enum: ['yes', 'no'],
        },
        trainingExempt: {
          type: 'string',
        },
      },
    },
    additionalCertifyingOfficials: {
      type: 'array',
      items: {
        type: 'object',
        required: [' hasAdditionalCertifyingOfficials'],
        properties: {
          additionalCertifyingOfficials: {
            type: 'object',
            required: ['first', 'last', 'title', 'phone', 'email'],
            properties: {
              first: {
                type: 'string',
              },
              middle: {
                type: 'string',
              },
              last: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              usPhone: {
                type: 'string',
                pattern: '^(||d{10}|||+?[0-9])$',
              },
              internationalPhone: {
                type: 'string',
                pattern: '^(||d{15}|||+?[0-9])$',
              },
              email: {
                type: 'string',
                format: 'email',
              },
              trainingCompletionDate: {
                type: 'string',
                format: 'date',
              },
              hasVaEducationBenefits: {
                type: 'string',
                enum: ['yes', 'no'],
              },
              trainingExempt: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    hasReadOnlyCertifyingOfficial: {
      type: 'string',
      enum: ['yes', 'no'],
    },
    readOnlyCertifyingOfficial: {
      type: 'array',
      items: {
        type: 'object',
        required: ['first', 'last'],
        properties: {
          first: {
            type: 'string',
          },
          middle: {
            type: 'string',
          },
          last: {
            type: 'string',
          },
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

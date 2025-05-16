import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(origDefinitions, ['date']);

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
          description: 'Type of phone number',
        },
        usPhone: {
          type: 'string',
          pattern: '^(||d{10}|||+?[0-9])$',
          description: 'Phone number',
        },
        internationalPhone: {
          type: 'string',
          pattern: '^(||d{15}|||+?[0-9])$',
          description: 'Phone number',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email address',
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
          description: 'Type of phone number',
        },
        usPhone: {
          type: 'string',
          pattern: '^(||d{10}|||+?[0-9])$',
          description: 'Phone number',
        },
        internationalPhone: {
          type: 'string',
          pattern: '^(||d{15}|||+?[0-9])$',
          description: 'Phone number',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email address',
        },
        trainingCompletionDate: {
          type: 'string',
          format: 'date',
          description: '305 training completion date',
        },
        hasVaEducationBenefits: {
          type: 'string',
          enum: ['yes', 'no'],
          description: 'Does the certifying official have VA education benefits?',
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
              phone: {
                type: 'string',
                enum: ['usPhone', 'internationalPhone'],
                description: 'Type of phone number',
              },
              usPhone: {
                type: 'string',
                pattern: '^(||d{10}|||+?[0-9])$',
                description: 'Phone number',
              },
              internationalPhone: {
                type: 'string',
                pattern: '^(||d{15}|||+?[0-9])$',
                description: 'Phone number',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Email address',
              },
              trainingCompletionDate: {
                type: 'string',
                format: 'date',
                description: '305 training completion date',
              },
              hasVaEducationBenefits: {
                type: 'string',
                enum: ['yes', 'no'],
                description: 'Does the certifying official have VA education benefits?',
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
      description: 'Do you have read-only certifying officials?',
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
      description: 'Remarks',
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

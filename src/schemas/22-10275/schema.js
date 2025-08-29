import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
  'address',
  'date',
  'email',
  'fullNameNoSuffix',
  'phone',
  'privacyAgreementAccepted',
  'ssn',
  'usaPhone',
  'yesNoSchema',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10275 PRINCIPLES OF EXCELLENCE FOR EDUCATIONAL INSTITUTIONS',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    agreementType: {
      type: 'string',
      enum: ['newCommitment', 'withdrawal'],
    },
    mainInstitution: {
      type: 'object',
      properties: {
        facilityCode: {
          type: 'string',
          pattern: '^[a-zA-Z0-9]{8}$',
        },
        institutionName: {
          type: 'string',
        },
        institutionAddress: {
          $ref: '#/definitions/address',
        },
      },
      required: ['facilityCode', 'institutionName', 'institutionAddress'],
    },
    additionalInstitutions: {
      type: 'array',
      maxItems: 6,
      items: {
        type: 'object',
        properties: {
          facilityCode: {
            type: 'string',
            pattern: '^[a-zA-Z0-9]{8}$',
          },
          institutionName: {
            type: 'string',
          },
          institutionAddress: {
            $ref: '#/definitions/address',
          },
          pointOfContact: {
            type: 'object',
            properties: {
              fullName: {
                $ref: '#/definitions/fullNameNoSuffix',
              },
              email: {
                $ref: '#/definitions/email',
              },
            },
            required: ['fullName', 'email'],
          },
        },
        required: ['facilityCode', 'institutionName', 'institutionAddress', 'pointOfContact'],
      },
    },
    authorizedOfficial: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullNameNoSuffix',
        },
        title: {
          type: 'string',
        },
        usPhone: {
          $ref: '#/definitions/usaPhone',
        },
        internationalPhone: {
          $ref: '#/definitions/phone',
        },
        email: {
          $ref: '#/definitions/email',
        },
      },
      required: ['fullName', 'title', 'email'],
      anyOf: [
        {
          required: ['usPhone'],
        },
        {
          required: ['internationalPhone'],
        },
      ],
      maxProperties: 4,
    },
    newCommitment: {
      type: 'object',
      properties: {
        principlesOfExcellencePointOfContact: {
          type: 'object',
          properties: {
            fullName: {
              $ref: '#/definitions/fullNameNoSuffix',
            },
            title: {
              type: 'string',
            },
            usPhone: {
              $ref: '#/definitions/usaPhone',
            },
            internationalPhone: {
              $ref: '#/definitions/phone',
            },
            email: {
              $ref: '#/definitions/email',
            },
          },
          required: ['fullName', 'title', 'email'],
          anyOf: [
            {
              required: ['usPhone'],
            },
            {
              required: ['internationalPhone'],
            },
          ],
          maxProperties: 4,
        },
        schoolCertifyingOfficial: {
          type: 'object',
          properties: {
            fullName: {
              $ref: '#/definitions/fullNameNoSuffix',
            },
            title: {
              type: 'string',
            },
            usPhone: {
              $ref: '#/definitions/usaPhone',
            },
            internationalPhone: {
              $ref: '#/definitions/phone',
            },
            email: {
              $ref: '#/definitions/email',
            },
          },
          required: ['fullName', 'title', 'email'],
          anyOf: [
            {
              required: ['usPhone'],
            },
            {
              required: ['internationalPhone'],
            },
          ],
          maxProperties: 4,
        },
      },
      required: ['principlesOfExcellencePointOfContact', 'schoolCertifyingOfficial'],
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
    statementOfTruthSignature: {
      type: 'string',
      minLength: 1,
    },
    dateSigned: {
      $ref: '#/definitions/date',
    },
  },
  required: ['agreementType', 'authorizedOfficial', 'mainInstitution', 'statementOfTruthSignature', 'dateSigned'],
};

export default schema;

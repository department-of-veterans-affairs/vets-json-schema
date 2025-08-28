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

/*

- facilityCode format/definition ok, need to include dashes?

- additionalInstitutions, top level or nested in newCommitment?
  - in mockups only available in newCommitment, but pdf is unclear whether withdrawl applies only to main institution or additional institutions
  - not relevant to schema as it's optional either way -- should clarify with design 
*/

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
      maxItems: 6, // TODO verify
      items: {
        type: 'object',
        properties: {
          facilityCode: {
            type: 'string',
            pattern: '', // TODO verify pattern, include dashes? Search for exising regex definition.
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
    },
    dateSigned: {
      $ref: '#/definitions/date',
    },
  },
  dependencies: {
    newCommitment: {
      properties: {
        agreementType: {
          enum: ['newCommitment'],
        },
      },
    },
  },
  required: ['agreementType', 'authorizedOfficial', 'mainInstitution', 'statementOfTruthSignature', 'dateSigned'],
};

export default schema;

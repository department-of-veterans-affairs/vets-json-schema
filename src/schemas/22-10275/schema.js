import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
  'address',
  'date',
  'email',
  'fullNameNoSuffix',
  'privacyAgreementAccepted',
  'ssn',
  'usaPhone',
  'yesNoSchema',
]);

/*

- authorizedOfficial is required for both newCommitment and withdrawal
  - need to include in top level required array? Or ok in nested required arrays

- 'statementOfTruthSignature' ok name, or 'signature' preferred?

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
    mainInstituion: {
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
    newCommitment: {
      type: 'object',
      properties: {
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
          oneOf: [{ usPhone }, { internationalPhone }],
        },
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
            isAuthorizedOfficial: {
              $ref: '#/definitions/yesNoSchema',
            },
          },
          required: ['fullName', 'title', 'email'],
          oneOf: [{ usPhone }, { internationalPhone }],
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
            isAuthorizedOfficial: {
              $ref: '#/definitions/yesNoSchema',
            },
          },
          required: ['fullName', 'title', 'email'],
          oneOf: [{ usPhone }, { internationalPhone }],
        },
      },
      anyOf: [{ principlesOfExcellencePointOfContact }, { schoolCertifyingOfficial }],
      required: ['institutions', 'authorizedOfficial'],
    },
    withdrawal: {
      type: 'object',
      properties: {
        facilityCode: {
          type: 'string',
          pattern: '', // TODO verify pattern, include dashes or no?
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
          },
          required: ['fullName', 'title'],
          oneOf: [{ usPhone }, { internationalPhone }],
        },
      },
      required: ['facilityCode', 'authorizedOfficial'],
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
  oneOf: [{ newCommitment }, { withdrawal }],
  required: ['agreementType', 'mainInstitution', 'privacyAgreementAccepted', 'statementOfTruthSignature', 'dateSigned'],
};

export default schema;

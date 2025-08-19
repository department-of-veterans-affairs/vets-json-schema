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
    newCommitment: {
      type: 'object',
      properties: {
        institutions: { // is there one primary institution than others that are optional?
          type: 'array',
          maxItems: 6, // TODO verify
          items: {
            type: 'object',
            properties: {
              facilityCode: {
                type: 'string',
                pattern: '', // TODO verify pattern, include dashes?
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
        associatedOfficial: {
          type: 'object',
          properties: {
            fullName: {
              $ref: '#/definitions/fullNameNoSuffix',
            },
            title: {
              type: 'string',
            },
            usPhone: {
              // TODO, refactor implementation to only require one of usPhone or internationalPhone
              $ref: '#/definitions/usaPhone',
            },
            internationalPhone: {
              $ref: '#/definitions/phone',
            },
            principalPointOfContact: { // refactor to include in list and loop?
              $ref: '#/definitions/yesNoSchema'
            },
            schoolCertifyingOfficial: { // refactor to include in list and loop?
              $ref: '#/definitions/yesNoSchema'
            },
          },
          required: ['fullName', 'title', 'usPhone'],
        },
      },
    },
    withdrawal: {
      type: 'object',
      properties: {
        facilityCode: {
          type: 'string',
          pattern: '', // TODOverify pattern, include dashes or no?
        },
        authorizingOfficial: {
          type: 'object',
          properties: {
            fullName: {
              $ref: '#/definitions/fullNameNoSuffix',
            },
            title: {
              type: 'string',
            },
            usPhone: {
              // TODO, refactor implementation to only require one of usPhone or internationalPhone
              $ref: '#/definitions/usaPhone',
            },
            internationalPhone: {
              $ref: '#/definitions/phone',
            },
          },
          required: ['fullName', 'title', 'usPhone'],
        },
      },
      required: ['facilityCode', 'authorizingOfficial'],
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

  /* 
  
  if agreementType is withdrawl, then only signature and facilityCode required.
  If agreementType is newCommitment, then all fields are required.
  
  */
  oneOf: [{ newCommitment }, { withdrawal }],
  required: ['agreementType', 'privacyAgreementAccepted', 'statementOfTruthSignature', 'dateSigned'],
};

export default schema;

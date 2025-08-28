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

- institution objects are idential whether withdrawal or new commitment.
    - should institution object be nested in withdrawl/newCommitment or remain outside at top level?

- multiple institutions are allowed, but first institution stands outside of list and loop
    - should initial institution be it's own field, THEN list and loop within an additionalInstitutions field
    - OR should all institutions be nested in an instituions field?
    - pdf separates them

- associatedOfficial and authorizingOfficial are identical whether withdrawal or new commitment.
    - should they be nested in institution object or remain outside at top level?
    - should they be unified to be one "institutionOfficial" object?
    - currently using 2 since associatedOffical question has additional questions -- principalPointOfContact and schoolCertifyingOfficial

- Need to include principles of excellence in schema?
  - pdf says signature counts as agreeing to principles of excellence
Check pdf for guidance 

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
    newCommitment: {
      type: 'object',
      properties: {
        institutions: {
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
              $ref: '#/definitions/usaPhone',
            },
            internationalPhone: {
              $ref: '#/definitions/phone',
            },
            email: {
              $ref: '#/definitions/email',
            },
            principalPointOfContact: {
              // refactor to include in list and loop?
              $ref: '#/definitions/yesNoSchema',
            },
            schoolCertifyingOfficial: {
              // refactor to include in list and loop?
              $ref: '#/definitions/yesNoSchema',
            },
          },
          required: ['fullName', 'title'],
          oneOf: [{ usPhone }, { internationalPhone }],
        },
      },
    },
    withdrawal: {
      type: 'object',
      properties: {
        facilityCode: {
          type: 'string',
          pattern: '', // TODO verify pattern, include dashes or no?
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
  
  How to handle required fields?
  - If agreementType is withdrawl, then only signature and facilityCode required.
  - If agreementType is newCommitment, then all fields are required.
  
  */
  oneOf: [{ newCommitment }, { withdrawal }],
  required: ['agreementType', 'privacyAgreementAccepted', 'statementOfTruthSignature', 'dateSigned'],
};

export default schema;

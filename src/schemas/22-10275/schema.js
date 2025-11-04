import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
  'date',
  'email',
  'fullNameNoSuffix',
  'phone',
  'privacyAgreementAccepted',
  'ssn',
  'usaPhone',
  'yesNoSchema',
  'profileAddress',
]);

// Make `country` on profileAddress a free-text string (no enum), not just whitespace
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

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10275 PRINCIPLES OF EXCELLENCE FOR EDUCATIONAL INSTITUTIONS',
  type: 'object',
  additionalProperties: false,
  definitions: {
    ...pickedDefinitions,
    profileAddress: profileAddressWithFreeCountry,
  },
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
          $ref: '#/definitions/profileAddress',
        },
      },
      required: ['facilityCode', 'institutionName', 'institutionAddress'],
    },
    additionalInstitutions: {
      type: 'array',
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
            $ref: '#/definitions/profileAddress',
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

import _ from 'lodash';
import definitions from '../../common/definitions';

const claimantRelationshipOptions = [
  'currentSpouse',
  'child18To23InSchool',
  'custodianForChildUnder18',
  'childOver18Incapable',
  'dependentParent',
  'other',
];

const nonOtherClaimantRelationshipOptions = claimantRelationshipOptions.filter(
  option => option !== 'other',
);

const apportionmentReasonOptions = [
  'veteranIncarcerated',
  'survivingBeneficiaryIncarcerated',
  'veteranIncompetentInCare',
  'veteranReceivingPensionInCare',
  'beneficiaryInEnemyTerritory',
  'veteranDisappeared',
];

const convictionTypeOptions = ['felony', 'misdemeanor'];

const convictionReasonOptions = [
  'veteranIncarcerated',
  'survivingBeneficiaryIncarcerated',
];

const nonConvictionReasonOptions = apportionmentReasonOptions.filter(
  option => !convictionReasonOptions.includes(option),
);

const facilityReasonOptions = [
  'veteranIncarcerated',
  'survivingBeneficiaryIncarcerated',
  'veteranIncompetentInCare',
  'veteranReceivingPensionInCare',
];

const nonFacilityReasonOptions = apportionmentReasonOptions.filter(
  option => !facilityReasonOptions.includes(option),
);

const affirmativeCheckbox = {
  type: 'boolean',
  enum: [true],
};

const fullNameWithMiddleInitial = _.cloneDeep(definitions.fullNameNoSuffix);
if (fullNameWithMiddleInitial?.properties?.middle) {
  fullNameWithMiddleInitial.properties.middle.maxLength = 1;
}

const internationalPhone = {
  type: 'object',
  additionalProperties: false,
  properties: {
    callingCode: {
      type: 'number',
    },
    countryCode: {
      type: 'string',
    },
    contact: {
      type: 'string',
    },
  },
  required: ['callingCode', 'countryCode', 'contact'],
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "INFORMATION REGARDING APPORTIONMENT OF BENEFICIARY'S AWARD (21-0788)",
  type: 'object',
  definitions: _.merge(
    {
      affirmativeCheckbox,
      fullNameWithMiddleInitial,
      internationalPhone,
    },
    _.pick(definitions, [
      'address',
      'date',
      'email',
      'ssn',
      'vaFileNumber',
    ]),
  ),
  additionalProperties: false,
  properties: {
    formPurposeAcknowledged: {
      $ref: '#/definitions/affirmativeCheckbox',
    },
    privacyActAcknowledged: {
      $ref: '#/definitions/affirmativeCheckbox',
    },
    veteran: {
      type: 'object',
      additionalProperties: false,
      properties: {
        fullName: {
          $ref: '#/definitions/fullNameWithMiddleInitial',
        },
        dateOfBirth: {
          $ref: '#/definitions/date',
        },
        ssn: {
          $ref: '#/definitions/ssn',
        },
        vaFileNumber: {
          $ref: '#/definitions/vaFileNumber',
        },
      },
      required: ['fullName', 'dateOfBirth', 'ssn'],
    },
    claimant: {
      type: 'object',
      additionalProperties: false,
      properties: {
        fullName: {
          $ref: '#/definitions/fullNameWithMiddleInitial',
        },
        relationshipType: {
          type: 'string',
          enum: claimantRelationshipOptions,
        },
        otherRelationshipDescription: {
          type: 'string',
          maxLength: 100,
        },
        address: {
          $ref: '#/definitions/address',
        },
        phone: {
          $ref: '#/definitions/internationalPhone',
        },
        email: {
          $ref: '#/definitions/email',
        },
      },
      required: ['fullName', 'relationshipType', 'address', 'phone', 'email'],
      anyOf: [
        {
          type: 'object',
          properties: {
            relationshipType: {
              type: 'string',
              enum: nonOtherClaimantRelationshipOptions,
            },
          },
        },
        {
          type: 'object',
          properties: {
            relationshipType: {
              type: 'string',
              enum: ['other'],
            },
          },
          required: ['otherRelationshipDescription'],
        },
      ],
    },
    requestedApportionmentPeople: {
      type: 'array',
      minItems: 1,
      maxItems: 4,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          fullName: {
            $ref: '#/definitions/fullNameWithMiddleInitial',
          },
          ssn: {
            $ref: '#/definitions/ssn',
          },
          veteranRelationshipDescription: {
            type: 'string',
            maxLength: 100,
          },
          receivesApportionmentNow: {
            type: 'boolean',
          },
          stepchildLivesWithVeteran: {
            type: 'boolean',
          },
          stepchildDepartureDate: {
            $ref: '#/definitions/date',
          },
          adoptedChildrenQuestion: {
            type: 'boolean',
          },
        },
        required: [
          'fullName',
          'ssn',
          'veteranRelationshipDescription',
          'receivesApportionmentNow',
          'adoptedChildrenQuestion',
        ],
        allOf: [
          {
            anyOf: [
              {
                type: 'object',
                properties: {
                  receivesApportionmentNow: {
                    type: 'boolean',
                    enum: [false],
                  },
                },
              },
              {
                type: 'object',
                properties: {
                  receivesApportionmentNow: {
                    type: 'boolean',
                    enum: [true],
                  },
                },
                required: ['stepchildLivesWithVeteran'],
              },
            ],
          },
          {
            anyOf: [
              {
                type: 'object',
                properties: {
                  stepchildLivesWithVeteran: {
                    type: 'boolean',
                    enum: [true],
                  },
                },
              },
              {
                type: 'object',
                properties: {
                  stepchildLivesWithVeteran: {
                    type: 'boolean',
                    enum: [false],
                  },
                },
                required: ['stepchildDepartureDate'],
              },
            ],
          },
        ],
      },
    },
    apportionment: {
      type: 'object',
      additionalProperties: false,
      properties: {
        apportionmentClaimReason: {
          type: 'string',
          enum: apportionmentReasonOptions,
        },
        incarcerationConvictionType: {
          type: 'string',
          enum: convictionTypeOptions,
        },
        facilityName: {
          type: 'string',
          maxLength: 150,
        },
        facilityAddress: {
          type: 'string',
          maxLength: 500,
        },
      },
      required: ['apportionmentClaimReason'],
      allOf: [
        {
          anyOf: [
            {
              type: 'object',
              properties: {
                apportionmentClaimReason: {
                  type: 'string',
                  enum: nonConvictionReasonOptions,
                },
              },
            },
            {
              type: 'object',
              properties: {
                apportionmentClaimReason: {
                  type: 'string',
                  enum: convictionReasonOptions,
                },
              },
              required: ['incarcerationConvictionType'],
            },
          ],
        },
        {
          anyOf: [
            {
              type: 'object',
              properties: {
                apportionmentClaimReason: {
                  type: 'string',
                  enum: nonFacilityReasonOptions,
                },
              },
            },
            {
              type: 'object',
              properties: {
                apportionmentClaimReason: {
                  type: 'string',
                  enum: facilityReasonOptions,
                },
              },
              required: ['facilityName', 'facilityAddress'],
            },
          ],
        },
      ],
    },
    remarks: {
      type: 'string',
      maxLength: 2000,
    },
    certifyStatement: {
      $ref: '#/definitions/affirmativeCheckbox',
    },
  },
  required: [
    'formPurposeAcknowledged',
    'privacyActAcknowledged',
    'veteran',
    'claimant',
    'requestedApportionmentPeople',
    'apportionment',
    'certifyStatement',
  ],
};

export default schema;

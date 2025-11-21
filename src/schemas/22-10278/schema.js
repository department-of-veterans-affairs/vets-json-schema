import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
  'address',
  'profileAddress',
  'date',
  'email',
  'fullNameNoSuffix',
  'phone',
  'privacyAgreementAccepted',
  'ssn',
  'usaPhone',
  'yesNoSchema',
  'vaFileNumber',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title:
    'Authorize VA to disclose personal information to a third party (VA Form 22-10278)',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: [
    'claimantPersonalInformation',
    'claimantAddress',
    'claimantContactInformation',
    'discloseInformation',
    'claimInformation',
    'lengthOfRelease',
    'securityQuestion',
    'securityAnswer',
    'privacyAgreementAccepted',
    'statementOfTruthSignature',
    'dateSigned',
    'isAuthenticated',
  ],
  properties: {
    claimantPersonalInformation: {
      type: 'object',
      required: ['fullName', 'ssn', 'dateOfBirth'],
      properties: {
        fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        ssn: {
          $ref: '#/definitions/ssn',
        },
        vaFileNumber: {
          $ref: '#/definitions/vaFileNumber',
        },
        dateOfBirth: {
          $ref: '#/definitions/date',
        },
      },
    },
    claimantAddress: {
      $ref: '#/definitions/profileAddress',
    },
    claimantContactInformation: {
      type: 'object',
      required: ['phoneNumber'],
      properties: {
        phoneNumber: {
          type: 'string',
        },
        emailAddress: {
          $ref: '#/definitions/email',
        },
      },
    },
    discloseInformation: {
      type: 'object',
      required: ['authorize'],
      properties: {
        authorize: {
          type: 'string',
          enum: ['person', 'organization'],
        },
      },
    },
    thirdPartyPersonName: {
      $ref: '#/definitions/fullNameNoSuffix',
    },
    thirdPartyPersonAddress: {
      $ref: '#/definitions/address',
    },
    thirdPartyOrganizationInformation: {
      type: 'object',
      required: ['organizationName', 'organizationAddress'],
      properties: {
        organizationName: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        organizationAddress: {
          $ref: '#/definitions/address',
        },
      },
    },
    organizationRepresentatives: {
      type: 'array',
      minItems: 1,
      maxItems: 6,
      items: {
        type: 'object',
        properties: {
          fullName: { $ref: '#/definitions/fullNameNoSuffix' },
        },
        required: ['fullName'],
      },
    },
    claimInformation: {
      type: 'object',
      properties: {
        statusOfClaim: { type: 'boolean' },
        currentBenefit: { type: 'boolean' },
        paymentHistory: { type: 'boolean' },
        amountOwed: { type: 'boolean' },
        minor: { type: 'boolean'},
        other: { type: 'boolean' },
        otherText: { type: 'string', minLength: 1, maxLength: 30 },
      },
     allOf: [
        // Require at least one checkbox selected
        {
          anyOf: [
            { type: 'object', required: ['statusOfClaim'], properties: { statusOfClaim: { enum: [true] } } },
            {
              type: 'object',
              required: ['currentBenefit'],
              properties: { currentBenefit: { enum: [true] } },
            },
            { type: 'object', required: ['paymentHistory'], properties: { paymentHistory: { enum: [true] } } },
            { type: 'object', required: ['amountOwed'], properties: { amountOwed: { enum: [true] } } },
            { type: 'object', required: ['minor'], properties: { minor: { enum: [true] } } },
            { type: 'object', required: ['other'], properties: { other: { enum: [true] } } },
          ],
        },

        // If "other" is true, require otherText
        {
          anyOf: [
            { type: 'object', not: { properties: { other: { enum: [true] } }, required: ['other'] } },
            { type: 'object', required: ['otherText'], properties: { otherText: { type: 'string', minLength: 1, maxLength: 30 } } },
          ],
        },
      ],
    },
    lengthOfRelease: {
      type: 'object',
      required: ['lengthOfRelease'],
      properties: {
        lengthOfRelease: {
          type: 'string',
          enum: ['ongoing', 'date'],
        },
        date: {
          $ref: '#/definitions/date',
        },
      },
      oneOf: [
        {
          type: 'object',
          properties: {
            lengthOfRelease: {
              enum: ['ongoing'],
            },
          },
          required: ['lengthOfRelease'],
        },
        {
          type: 'object',
          properties: {
            lengthOfRelease: {
              enum: ['date'],
            },
          },
          required: ['lengthOfRelease', 'date'],
        },
      ],
    },
    securityQuestion: {
      type: 'object',
      required: ['question'],
      properties: {
        question: {
          type: 'string',
          enum: [
            'pin',
            'motherBornLocation',
            'highSchool',
            'petName',
            'teacherName',
            'fatherMiddleName',
            'create',
          ],
        },
      },
    },
    securityAnswer: {
      type: 'object',
      properties: {
        securityAnswerText: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        securityAnswerLocation: {
          type: 'object',
          required: ['city', 'state'],
          properties: {
            city: {
              type: 'string',
              minLength: 1,
              maxLength: 30,
            },
            state: {
              type: 'string',
              minLength: 2,
              maxLength: 2,
            },
          },
        },
        securityAnswerCreate: {
          type: 'object',
          required: ['question', 'answer'],
          properties: {
            question: {
              type: 'string',
              minLength: 1,
              maxLength: 100,
            },
            answer: {
              type: 'string',
              minLength: 1,
              maxLength: 30,
            },
          },
        },
      },
      // oneOf: [
      //   { required: ['securityAnswerLocation'] },
      //   { required: ['securityAnswerCreate'] },
      //   { required: ['securityAnswerText'] },
      // ],
      allOf: [{
        oneOf: [
          {
            type: 'object',
            required: ['securityAnswerLocation'],
            not: { anyOf: [{ required: ['securityAnswerText'] }, { required: ['securityAnswerCreate'] }] }
          },
          {
            type: 'object',
            required: ['securityAnswerCreate'],
            not: { anyOf: [{ required: ['securityAnswerText'] }, { required: ['securityAnswerLocation'] }] }
          },
          {
            type: 'object',
            required: ['securityAnswerText'],
            not: { anyOf: [{ required: ['securityAnswerLocation'] }, { required: ['securityAnswerCreate'] }] }
          }
        ]
      }]
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
    isAuthenticated: { type: 'boolean' },
  },
  allOf: [
    {
      oneOf: [
        {
          properties: {
            discloseInformation: {
              type: 'object',
              properties: {
                authorize: { enum: ['person'] },
              },
              required: ['authorize'],
            },
          },
          required: [
            'discloseInformation',
            'thirdPartyPersonName',
            'thirdPartyPersonAddress',
          ],
        },
        {
          properties: {
            discloseInformation: {
              type: 'object',
              properties: {
                authorize: { enum: ['organization'] },
              },
              required: ['authorize'],
            },
          },
          required: [
            'discloseInformation',
            'thirdPartyOrganizationInformation',
            'organizationRepresentatives',
          ],
        },
      ],
    },
    {
      oneOf: [
        {
          properties: {
            securityQuestion: {
              type: 'object',
              properties: {
                question: { enum: ['motherBornLocation'] },
              },
              required: ['question'],
            },
            securityAnswer: {
              type: 'object',
              required: ['securityAnswerLocation'],
            },
          },
          required: ['securityQuestion', 'securityAnswer'],
        },
        {
          properties: {
            securityQuestion: {
              type: 'object',
              properties: {
                question: { enum: ['create'] },
              },
              required: ['question'],
            },
            securityAnswer: {
              type: 'object',
              required: ['securityAnswerCreate'],
            },
          },
          required: ['securityQuestion', 'securityAnswer'],
        },
        {
          properties: {
            securityQuestion: {
              type: 'object',
              properties: {
                question: {
                  enum: [
                    'pin',
                    'highSchool',
                    'petName',
                    'teacherName',
                    'fatherMiddleName',
                  ],
                },
              },
              required: ['question'],
            },
            securityAnswer: {
              type: 'object',
              required: ['securityAnswerText'],
            },
          },
          required: ['securityQuestion', 'securityAnswer'],
        },
      ],
    },
  ],
};

export default schema;
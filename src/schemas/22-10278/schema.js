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
      $ref: '#/definitions/address',
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
      required: ['claims'],
      properties: {
        claims: {
          type: 'string',
          enum: [
            'statusOfClaim',
            'currentBenefit',
            'paymentHistory',
            'amountOwed',
            'minor',
            'other',
          ],
        },
        other: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
      },
      anyOf: [
        {
          type: 'object',
          properties: {
            claims: {
              enum: [
                'statusOfClaim',
                'currentBenefit',
                'paymentHistory',
                'amountOwed',
                'minor',
              ],
            },
          },
          required: ['claims'],
        },
        {
          type: 'object',
          properties: {
            claims: {
              enum: ['other'],
            },
          },
          required: ['claims', 'other'],
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
      oneOf: [
        { required: ['securityAnswerLocation'] },
        { required: ['securityAnswerCreate'] },
        { required: ['securityAnswerText'] },
      ],
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
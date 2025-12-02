import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep, omit } from 'lodash';
import schema from '../../../src/schemas/22-10278/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, ['required', 'allOf']));

const base = {
    claimantPersonalInformation: {
        fullName: {
            first: 'John',
            middle: 'Michael',
            last: 'Doe',
        },
    },
    claimantAddress: {
        street: '123 Main St',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
    },
    claimantContactInformation:
    {
        phoneNumber: '+1 1234567890 (US)',
        emailAddress: 'test@email.com',
    },
    discloseInformation: { authorize: 'person' },
    thirdPartyPersonName: {
        first: 'Sarah',
        last: 'Wilson',
    },
    thirdPartyPersonAddress: {
        street: '123 Main St',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
    },
    claimInformation: {
        statusOfClaim: true,
        currentBenefit: true,
        paymentHistory: true,
        amountOwed: true,
        minor: true,
        other: true,
        otherText: 'Other text example',
    },
    lengthOfRelease: {
        lengthOfRelease: 'ongoing',
    },
    securityQuestion: { question: 'pin' },
    securityAnswer: {
        securityAnswerText: '1234'
    },
    privacyAgreementAccepted: true,
    statementOfTruthSignature: 'John Michael Doe',
    dateSigned: '2025-08-01',
    isAuthenticated: true,
}

const testData = {
  claimantPersonalInformation: {
    valid: [
      {
        fullName: {
          first: 'John',
          middle: 'Michael',
          last: 'Doe',
        },
        ssn: '123121234',
        dateOfBirth: '1990-01-01',
      },
      {
        fullName: {
          first: 'Jane',
          last: 'Doe',
        },
        ssn: '123121234',
        vaFileNumber: '123456789',
        dateOfBirth: '1990-01-01',
      },
    ],
    invalid: [
      //Missing first name
      {
        fullName: {
          first: '',
          last: 'Doe',
        },
        ssn: '123121234',
        dateOfBirth: '1990-01-01',
      },
      //Missing last name
      {
        fullName: {
          first: 'John',
          last: '',
        },
        ssn: '123121234',
        dateOfBirth: '1990-01-01',
      },
      //Missing ssn
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        ssn: '',
        dateOfBirth: '1990-01-01',
      },
      //Missing date of birth
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        ssn: '123121234',
        dateOfBirth: '',
      },
    ],
  },
  claimantAddress: {
    valid: [
      {
        street: '123 Main St',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
      {
        street: '456 Oak Ave',
        city: 'Boston',
        state: 'MA',
        postalCode: '02108',
        country: 'USA',
      },
    ],
    invalid: [
      // Country is whitespace-only (fails "not just whitespace" pattern)
      {
        street: '123 Anywhere',
        city: 'Nowhere',
        postalCode: '00000',
        country: '   ',
      },
      // Missing street
      {
        street: '',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
      // Missing city
      {
        street: '123 Main St',
        city: '',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
    ],
  },
  claimantContactInformation: {
    valid: [
      {
        phoneNumber: '+1 1234567890 (US)',
        emailAddress: 'test@email.com',
      },
      {
        phoneNumber: '+44 7654321 (GB)',
      },
    ],
    invalid: [
      {
        phoneNumber: null,
        emailAddress: 'test@email.com',
      },
      {
        phoneNumber: 1234567890,
        emailAddress: 'test@email.com',
      },
    ],
  },
  discloseInformation: {
    valid: [{ authorize: 'person' }, { authorize: 'organization' }],
    invalid: [{ authorize: 'persons' }, {}],
  },
  thirdPartyPersonName: {
    valid: [
      {
        first: 'Sarah',
        last: 'Wilson',
      },
      {
        first: 'Michael',
        middle: 'James',
        last: 'Brown',
      },
    ],
    invalid: [
      {
        first: null,
        last: 'Wilson',
      },
      {
        first: 'Sarah',
        last: null,
      },
    ],
  },
  thirdPartyPersonAddress: {
    valid: [
      {
        street: '123 Main St',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
      {
        street: '456 Oak Ave',
        city: 'Boston',
        state: 'MA',
        postalCode: '02108',
        country: 'USA',
      },
      // International: free-text country (ENGLAND)
      {
        street: '10 Downing St',
        city: 'London',
        postalCode: 'SW1A 2AA',
        country: 'ENGLAND',
      },
      // International: misspelled country allowed; postalCode omitted (optional)
      {
        street: '1 Queen St',
        city: 'Auckland',
        country: 'NEW ZEALEDN',
      },
    ],
    invalid: [
      // Missing street
      {
        street: '',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
      // Missing city
      {
        street: '123 Main St',
        city: '',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
    ],
  },
  thirdPartyOrganizationInformation: {
    valid: [
      {
        organizationName: 'Sample Organization',
        organizationAddress: {
          street: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'USA',
        },
      },
    ],
    invalid: [
      //Missing organizationName
      {
        organizationName: null,
        organizationAddress: {
          street: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'USA',
        },
      },
      //Missing organizationAddress
      {
        organizationName: 'Sample Organization',
        organizationAddress: null,
      },
    ],
  },
  organizationRepresentatives: {
    valid: [
      //Single item
      [
        {
          fullName: {
            first: 'John',
            last: 'Doe',
          },
        },
      ],
      //Multiple items
      [
        {
          fullName: {
            first: 'John',
            last: 'Doe',
          },
        },
        {
          fullName: {
            first: 'Jacob',
            middle: 'Michael',
            last: 'Doe',
          },
        },
      ],
    ],
    invalid: [
      //Single item, missing first name
      [
        {
          fullName: {
            first: null,
            last: 'Doe',
          },
        },
      ],
      //Multiple items, missing last name
      [
        {
          fullName: {
            first: 'John',
            last: 'Doe',
          },
        },
        {
          fullName: {
            first: 'Jacob',
            middle: 'Michael',
            last: null,
          },
        },
      ],
    ],
  },
  claimInformation: {
    valid: [
      //All Selected
      {
        statusOfClaim: true,
        currentBenefit: true,
        paymentHistory: true,
        amountOwed: true,
        minor: true,
        other: true,
        otherText: 'Other text example',
      },
      //Some selected
      {
        statusOfClaim: false,
        currentBenefit: false,
        paymentHistory: true,
        amountOwed: true,
        minor: false,
        other: false,
      },
    ],
    invalid: [
      //None selected
      {
        statusOfClaim: false,
        currentBenefit: false,
        paymentHistory: false,
        amountOwed: false,
        minor: false,
        other: false,
      },
      //Other selected and no text provided
      {
        statusOfClaim: false,
        currentBenefit: true,
        paymentHistory: false,
        amountOwed: true,
        minor: true,
        other: true,
      },
    ],
  },
  lengthOfRelease: {
    valid: [
      {
        lengthOfRelease: 'ongoing',
      },
      {
        lengthOfRelease: 'date',
        date: '2022-01-01',
      },
    ],
    invalid: [
      {
        // invalid enum value
        lengthOfRelease: 'invalid',
      },
      {
        lengthOfRelease: 'date',
        date: null,
      },
         {
        lengthOfRelease: 'ongoing',
        date: '2022-01-01',
      },
    ],
  },
  securityQuestion: {
    valid: [
      { question: 'pin' },
      { question: 'motherBornLocation' },
      { question: 'highSchool' },
      { question: 'petName' },
      { question: 'teacherName' },
      { question: 'fatherMiddleName' },
      { question: 'create' },
    ],
    invalid: [{ question: 'pinCode' }, { question: '' }, {}],
  },
  securityAnswer: {
      valid: [
          {
              securityAnswerText: '1234'
          },
          {
              securityAnswerLocation: {
                city: 'City',
                state: 'CA'
              }
          },
          {
              securityAnswerCreate: {
                question: 'Test question',
                answer: 'Test answer'
              }
          }
      ],
      invalid: [
          {
              securityAnswerText: null
          },
          {
              securityAnswerLocation: null
          },
          {
              securityAnswerCreate: null
          },
          // Two types of answers
          {
            securityAnswerText: '1234',
           securityAnswerLocation: {
                city: 'City',
                state: 'CA'
              }
          }
      ]
  },
  dateSigned: {
    valid: ['2025-01-31', '2024-12-01'],
    invalid: ['01/31/2025', '2025-13-01', null],
  },
};

const requires = (obj, keys) => keys.every(k => Object.prototype.hasOwnProperty.call(obj, k));

describe('22-10278 Schema', () => {
   it('base payload includes all root-required keys', () => {
      const payload = cloneDeep(base);
      const requiredRoot = [
      'claimantPersonalInformation',
      'claimantAddress',
      'claimantContactInformation',
      'discloseInformation',
      'thirdPartyPersonName',
      'thirdPartyPersonAddress',
      'claimInformation',
      'lengthOfRelease',
      'securityQuestion',
      'securityAnswer',
      'privacyAgreementAccepted',
      'statementOfTruthSignature',
      'dateSigned',
      'isAuthenticated',
      ];
      expect(requires(payload, requiredRoot)).to.equal(true);
    });

    it('if authorize == organization, includes required keys)', () => {
        const payload = {
            ...cloneDeep(base),
            discloseInformation: { authorize: 'organization' },
            thirdPartyOrganizationInformation: {
                organizationName: 'Sample Organization',
                organizationAddress: {
                    street: '123 Main St',
                    city: 'Seattle',
                    state: 'WA',
                    postalCode: '98101',
                    country: 'USA',
                },
            },
            organizationRepresentatives: [
                {
                    fullName: {
                        first: 'John',
                        last: 'Doe',
                    },
                },
            ],
        };
        delete payload.thirdPartyPersonName;
        delete payload.thirdPartyPersonAddress;

        expect(
            requires(payload, [
                'claimantPersonalInformation',
                'claimantAddress',
                'claimantContactInformation',
                'discloseInformation',
                'thirdPartyOrganizationInformation',
                'organizationRepresentatives',
                'claimInformation',
                'lengthOfRelease',
                'securityQuestion',
                'securityAnswer',
                'privacyAgreementAccepted',
                'statementOfTruthSignature',
                'dateSigned',
                'isAuthenticated',
            ]),
        ).to.equal(true);
        expect(payload.discloseInformation.authorize).to.equal('organization');
    });

  schemaTestHelper.testValidAndInvalid('claimantPersonalInformation', testData.claimantPersonalInformation);
  schemaTestHelper.testValidAndInvalid('claimantAddress', testData.claimantAddress);
  schemaTestHelper.testValidAndInvalid('claimantContactInformation', testData.claimantContactInformation);
  schemaTestHelper.testValidAndInvalid('discloseInformation', testData.discloseInformation);
  schemaTestHelper.testValidAndInvalid('thirdPartyPersonName', testData.thirdPartyPersonName);
  schemaTestHelper.testValidAndInvalid('thirdPartyPersonAddress', testData.thirdPartyPersonAddress);
  schemaTestHelper.testValidAndInvalid('thirdPartyOrganizationInformation', testData.thirdPartyOrganizationInformation);
  schemaTestHelper.testValidAndInvalid('organizationRepresentatives', testData.organizationRepresentatives);
  schemaTestHelper.testValidAndInvalid('claimInformation', testData.claimInformation);
  schemaTestHelper.testValidAndInvalid('lengthOfRelease', testData.lengthOfRelease);
  schemaTestHelper.testValidAndInvalid('securityQuestion', testData.securityQuestion);
  schemaTestHelper.testValidAndInvalid('securityAnswer', testData.securityAnswer);
  schemaTestHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});
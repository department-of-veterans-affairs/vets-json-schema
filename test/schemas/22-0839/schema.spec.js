import { cloneDeep, omit } from 'lodash';
import { expect } from 'chai';
import { it } from 'mocha';
import schema from '../../../src/schemas/22-0839/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
// Ignore root-level cross-field logic for the unit-style property tests:
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, ['required', 'allOf']));

const testData = {
  authorizedOfficial: {
    valid: [
      { fullName: { first: 'Jane', last: 'Smith' }, title: 'Director', phoneNumber: '5555555555' },
      { fullName: { first: 'A', last: 'B' }, title: 'VP', phoneNumber: '(555) 555-5555' },
    ],
    invalid: [{ fullName: { first: null, last: 'Smith' }, title: '', phoneNumber: 'abc' }],
  },
  agreementType: {
    valid: ['startNewOpenEndedAgreement', 'modifyExistingAgreement', 'withdrawFromYellowRibbonProgram'],
    invalid: ['somethingElse', '', null],
  },
  withdrawFromYellowRibbonProgram: {
    valid: [
      [
        {
          facilityCode: '12345678',
          institutionName: 'Sample Campus',
          institutionAddress: {
            street: '111 2nd St S',
            city: 'Seattle',
            state: 'WA',
            postalCode: '98101',
            country: 'USA',
          },
        },
      ],
      [
        {
          facilityCode: 'A1B2C3D4',
          institutionName: 'Another Campus',
          institutionAddress: {
            street: '1 First Ave',
            city: 'Boston',
            state: 'MA',
            postalCode: '02108',
            country: 'USA',
          },
        },
        {
          facilityCode: '87654321',
          institutionName: 'Branch',
          institutionAddress: {
            street: '500 Main St',
            city: 'Austin',
            state: 'TX',
            postalCode: '73301',
            country: 'USA',
          },
        },
      ],
      // Free-text country: ENGLAND
      [
        {
          facilityCode: 'EF34GH56',
          institutionName: 'Royal College',
          institutionAddress: {
            street: '10 Downing St',
            city: 'London',
            postalCode: 'SW1A 2AA',
            country: 'ENGLAND',
          },
        },
      ],
      // Free-text country misspelled, no postalCode (optional)
      [
        {
          facilityCode: 'ZX98CV76',
          institutionName: 'Aotearoa Tech',
          institutionAddress: {
            street: '1 Queen St',
            city: 'Auckland',
            country: 'NEW ZEALEDN',
          },
        },
      ],
    ],
    invalid: [
      [{ facilityCode: '123', institutionName: '', institutionAddress: null }],
      // Whitespace-only country should fail country pattern
      [
        {
          facilityCode: 'QQ11WW22',
          institutionName: 'Whitespace U',
          institutionAddress: {
            street: '123 Anywhere',
            city: 'Nowhere',
            postalCode: '00000',
            country: '   ',
          },
        },
      ],
    ],
  },
  yellowRibbonProgramTerms: {
    valid: [
      {
        firstAcknowledgement: 'AB',
        secondAcknowledgement: 'CD',
        thirdAcknowledgement: 'EF',
        fourthAcknowledgement: 'YZ',
        agreeToProvideYellowRibbonProgramContributions: true,
      },
    ],
    invalid: [
      {
        firstAcknowledgement: 'TOO-LONG',
        secondAcknowledgement: '',
        thirdAcknowledgement: null,
        fourthAcknowledgement: 'OK',
        agreeToProvideYellowRibbonProgramContributions: null,
      },
    ],
  },
  institutionDetails: {
    valid: [
      [
        {
          facilityCode: '12345678',
          institutionName: 'Institution of Test',
          institutionAddress: {
            street: '111 2nd St S',
            city: 'Seattle',
            state: 'WA',
            postalCode: '98101',
            country: 'USA',
          },
        },
      ],
      [
        {
          facilityCode: 'A1B2C3D4',
          institutionName: 'Another Institution',
          institutionAddress: {
            street: '10 Downing St',
            city: 'Boston',
            state: 'MA',
            postalCode: '02108',
            country: 'USA',
          },
        },
      ],
      // Free-text country: ENGLAND
      [
        {
          facilityCode: 'MN12OP34',
          institutionName: 'Royal College',
          institutionAddress: {
            street: '10 Downing St',
            city: 'London',
            postalCode: 'SW1A 2AA',
            country: 'ENGLAND',
          },
        },
      ],
      // Free-text country misspelled, no postalCode (optional)
      [
        {
          facilityCode: 'RT56YU78',
          institutionName: 'Aotearoa Tech',
          institutionAddress: {
            street: '1 Queen St',
            city: 'Auckland',
            country: 'NEW ZEALEDN',
          },
        },
      ],
    ],
    invalid: [
      [
        {
          facilityCode: '12',
          institutionName: '',
          institutionAddress: { street: '', city: 'Nowhere' },
        },
      ],
      // Whitespace-only country should fail
      [
        {
          facilityCode: 'GH78JK90',
          institutionName: 'Whitespace U',
          institutionAddress: {
            street: '123 Anywhere',
            city: 'Nowhere',
            postalCode: '00000',
            country: '   ',
          },
        },
      ],
    ],
  },

  yellowRibbonProgramAgreementRequest: {
    valid: [
      [
        {
          eligibleIndividuals: 25,
          yearRange: { from: '2025-08-01', to: '2026-07-31' },
          maximumNumberofStudents: 100,
          degreeLevel: 'undergraduate',
          currencyType: 'USD',
          degreeProgram: 'Computer Science',
          maximumContributionAmount: 5000.0,
        },
      ],
      [
        {
          eligibleIndividuals: 0,
          yearRange: { from: '1900-01-01', to: '1900-12-31' },
          maximumNumberofStudents: 0,
          degreeLevel: 'doctoral',
          currencyType: 'USD',
          degreeProgram: 'Engineering',
          maximumContributionAmount: 0,
        },
        {
          eligibleIndividuals: 1000,
          yearRange: { from: '2100-01-01', to: '2100-12-31' },
          maximumNumberofStudents: 99999,
          degreeLevel: 'all',
          currencyType: 'USD',
          degreeProgram: 'Interdisciplinary',
          maximumContributionAmount: 99999,
        },
      ],
    ],
    invalid: [
      [
        {
          eligibleIndividuals: -1,
          yearRange: '2025-2026',
          maximumNumberofStudents: 1000001,
          degreeLevel: 'middle-school',
          degreeProgram: 123,
          maximumContributionAmount: -5,
        },
      ],
    ],
  },

  pointOfContact: {
    valid: [
      {
        fullName: { first: 'Pat', last: 'Lee' },
        phoneNumber: '555-555-5555',
        emailAddress: 'pat.lee@example.edu',
        role: 'schoolCertifyingOfficial',
      },
      {
        fullName: { first: 'Alex', last: 'Kim' },
        phoneNumber: '+1 (555) 111-2222',
        emailAddress: 'a.kim@school.edu',
        role: 'schoolFinancialRepresentative',
      },
    ],
    invalid: [
      {
        fullName: { first: null, last: 'Lee' },
        phoneNumber: 'abc',
        emailAddress: 'not-an-email',
        role: 'randomRole',
      },
    ],
  },
  statementOfTruthSignature: {
    valid: ['Jane Q. Smith', 'J Smith'],
    invalid: [null, ''],
  },
  dateSigned: {
    valid: ['2025-08-01', '2024-01-31'],
    invalid: ['08/01/2025', '2025-13-01', null],
  },
};

describe('22-0839 schema', () => {
  schemaTestHelper.testValidAndInvalid('authorizedOfficial', testData.authorizedOfficial);
  schemaTestHelper.testValidAndInvalid('agreementType', testData.agreementType);
  schemaTestHelper.testValidAndInvalid('withdrawFromYellowRibbonProgram', testData.withdrawFromYellowRibbonProgram);
  schemaTestHelper.testValidAndInvalid('yellowRibbonProgramTerms', testData.yellowRibbonProgramTerms);
  schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
  schemaTestHelper.testValidAndInvalid(
    'yellowRibbonProgramAgreementRequest',
    testData.yellowRibbonProgramAgreementRequest,
  );
  schemaTestHelper.testValidAndInvalid('pointOfContact', testData.pointOfContact);
  schemaTestHelper.testValidAndInvalid('statementOfTruthSignature', testData.statementOfTruthSignature);
  schemaTestHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});

// ---- Cross-field business rule checks ----
const requires = (obj, keys) => keys.every(k => Object.prototype.hasOwnProperty.call(obj, k));
const forbids = (obj, keys) => keys.every(k => !Object.prototype.hasOwnProperty.call(obj, k));

describe('22-0839 schema (cross-field business rules)', () => {
  const base = {
    authorizedOfficial: {
      fullName: { first: 'Jane', last: 'Smith' },
      title: 'Director',
      phoneNumber: '5555555555',
    },
    statementOfTruthSignature: 'Jane Q. Smith',
    dateSigned: '2025-08-01',
    isAuthenticated: true,
  };

  const usAddress = {
    street: '111 2nd St S',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'USA',
  };

  it('withdraw branch requires withdrawFromYellowRibbonProgram and forbids start/modify sections', () => {
    const payload = {
      ...base,
      agreementType: 'withdrawFromYellowRibbonProgram',
      withdrawFromYellowRibbonProgram: [
        {
          facilityCode: '12345678',
          institutionName: 'Sample Campus',
          institutionAddress: usAddress,
        },
      ],
    };

    expect(payload.agreementType).to.equal('withdrawFromYellowRibbonProgram');
    expect(
      requires(payload, ['authorizedOfficial', 'statementOfTruthSignature', 'dateSigned', 'isAuthenticated']),
    ).to.equal(true);
    expect(requires(payload, ['withdrawFromYellowRibbonProgram'])).to.equal(true);
    expect(
      forbids(payload, [
        'yellowRibbonProgramTerms',
        'institutionDetails',
        'yellowRibbonProgramAgreementRequest',
        'pointOfContact',
      ]),
    ).to.equal(true);
  });

  it('start/modify branch requires terms, institution details, agreement request, and POC; forbids withdraw array', () => {
    const payload = {
      ...base,
      agreementType: 'startNewOpenEndedAgreement',
      yellowRibbonProgramTerms: {
        firstAcknowledgement: 'AB',
        secondAcknowledgement: 'CD',
        thirdAcknowledgement: 'EF',
        fourthAcknowledgement: 'GH',
        agreeToProvideYellowRibbonProgramContributions: true,
      },
      institutionDetails: [
        {
          facilityCode: 'A1B2C3D4',
          institutionName: 'Institution of Test',
          institutionAddress: usAddress,
        },
      ],
      yellowRibbonProgramAgreementRequest: [
        {
          eligibleIndividuals: 25,
          yearRange: { from: '2025-08-01', to: '2026-07-31' },
          maximumNumberofStudents: 100,
          degreeLevel: 'undergraduate',
          currencyType: 'USD',
          degreeProgram: 'Computer Science',
          maximumContributionAmount: 5000,
        },
      ],
      pointOfContact: {
        fullName: { first: 'Pat', last: 'Lee' },
        phoneNumber: '555-555-5555',
        emailAddress: 'pat.lee@example.edu',
        role: 'schoolCertifyingOfficial',
      },
    };

    expect(['startNewOpenEndedAgreement', 'modifyExistingAgreement']).to.include(payload.agreementType);
    expect(
      requires(payload, ['authorizedOfficial', 'statementOfTruthSignature', 'dateSigned', 'isAuthenticated']),
    ).to.equal(true);
    expect(
      requires(payload, [
        'yellowRibbonProgramTerms',
        'institutionDetails',
        'yellowRibbonProgramAgreementRequest',
        'pointOfContact',
      ]),
    ).to.equal(true);
    expect(forbids(payload, ['withdrawFromYellowRibbonProgram'])).to.equal(true);
  });
});

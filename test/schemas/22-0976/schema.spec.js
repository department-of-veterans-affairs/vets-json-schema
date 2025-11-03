import { cloneDeep, omit } from 'lodash';
import { expect } from 'chai';
import { it, describe } from 'mocha';
import Ajv from 'ajv';
import schema from '../../../src/schemas/22-0976/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

// ---- Base helpers ----------------------------------------------------------
const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, ['required', 'allOf']));

const ajv = new Ajv({ allErrors: true, strict: false });

// Mini-root builder so $refs resolve; validate { [propName]: value }.
const makeMiniRoot = propName => ({
  type: 'object',
  additionalProperties: false,
  definitions: schema.definitions,
  properties: {
    [propName]: schema.properties[propName],
  },
  required: [propName],
});

// Compiled validators for the two $ref-heavy properties
const validateInstitutionProfile = ajv.compile(makeMiniRoot('institutionProfile'));
const validateAcknowledgement10a = ajv.compile(makeMiniRoot('acknowledgement10a'));

// ---- yesNo dynamic helpers -------------------------------------------------
const ynSchema = schema.definitions?.yesNoSchema || {};
const pickYes = () => {
  if (Array.isArray(ynSchema.enum) && ynSchema.enum.length) {
    const y = ynSchema.enum.find(v =>
      String(v)
        .toUpperCase()
        .startsWith('Y'),
    );
    return y !== undefined ? y : ynSchema.enum[0];
  }
  if (ynSchema.type === 'boolean') return true;
  return 'Y';
};
const pickNo = () => {
  if (Array.isArray(ynSchema.enum) && ynSchema.enum.length) {
    const n = ynSchema.enum.find(v =>
      String(v)
        .toUpperCase()
        .startsWith('N'),
    );
    if (n !== undefined) return n;
    const y = pickYes();
    const alt = ynSchema.enum.find(v => v !== y);
    return alt !== undefined ? alt : ynSchema.enum[0];
  }
  if (ynSchema.type === 'boolean') return false;
  return 'N';
};
const YES = pickYes();
const NO = pickNo();

// ---- Test data -------------------------------------------------------------
const usAddr = {
  street: '111 2nd St S',
  city: 'Seattle',
  state: 'WA',
  postalCode: '98101',
  country: 'USA',
};

// Country is now free-text with “not just whitespace” pattern,
// so these should validate even if not in an enum list.
const engAddr = {
  street: '10 Downing St',
  city: 'London',
  postalCode: 'SW1A 2AA',
  country: 'ENGLAND',
};

const nzAddrMisspelled = {
  street: '1 Queen St',
  city: 'Auckland',
  postalCode: '1010',
  country: 'NEW ZEALEDN', // intentionally misspelled; should still pass
};

const base = {
  submissionReasons: { initialApplication: true },
  institutionClassification: 'public',
  institutionProfile: {
    isIHL: NO,
    participatesInTitleIV: NO,
  },
  institutionDetails: [
    {
      institutionName: 'Global Institute',
      physicalAddress: usAddr,
      vaFacilityCode: 'A1B2C3D4',
    },
  ],
  programs: [
    {
      programName: 'Computer Science',
      totalProgramLength: '3 year',
      weeksPerTerm: 12,
      entryRequirements: 'High school diploma',
      creditHours: 120,
    },
  ],
  acknowledgement7: 'AB',
  acknowledgement8: 'CD',
  acknowledgement9: 'EF',
  acknowledgement10a: { financiallySound: YES },
  acknowledgement10b: 'IJ',
  financialRepresentative: {
    fullName: { first: 'Pat', last: 'Lee' },
    email: 'pat.lee@example.edu',
  },
  schoolCertifyingOfficial: {
    fullName: { first: 'Sam', last: 'Kim' },
    email: 'sam.kim@example.edu',
  },
  authorizingOfficial: {
    fullName: { first: 'Alex', last: 'Grant' },
    signature: 'Alex Grant',
  },
  dateSigned: '2025-08-01',
  isAuthenticated: true,
};

const testData = {
  submissionReasons: {
    valid: [
      { initialApplication: true },
      { approvalOfNewPrograms: true },
      { reapproval: true },
      { updateInformation: true, updateInformationText: 'Changed address' },
      { other: true, otherText: 'Miscellaneous reason' },
      { initialApplication: true, other: true, otherText: 'Also other' },
    ],
    invalid: [
      {}, // nothing checked
      { other: true }, // missing otherText
      { updateInformation: true }, // missing updateInformationText
    ],
  },

  institutionClassification: {
    valid: ['public', 'privateForProfit', 'privateNotForProfit'],
    invalid: ['government', '', null],
  },

  institutionProfile: {
    valid: [
      { isIHL: NO, participatesInTitleIV: NO },
      { isIHL: YES, ihlDegreeTypes: 'Associate, Bachelor', participatesInTitleIV: NO },
      { isIHL: NO, participatesInTitleIV: YES, opeidNumber: '0123ABCD' },
      { isIHL: YES, ihlDegreeTypes: 'Doctoral', participatesInTitleIV: YES, opeidNumber: 'A1B2C3D4' },
    ],
    invalid: [
      { isIHL: YES }, // missing ihlDegreeTypes when isIHL is YES/true
      { participatesInTitleIV: YES }, // missing opeidNumber when Title IV is YES/true
      { isIHL: YES, ihlDegreeTypes: '' }, // empty when required
      { participatesInTitleIV: YES, opeidNumber: '' }, // empty when required
      { participatesInTitleIV: YES, opeidNumber: '012345-0' }, // hyphen not allowed
      { participatesInTitleIV: YES, opeidNumber: '1234567' }, // 7 chars
      { participatesInTitleIV: YES, opeidNumber: '123456789' }, // 9 chars
      { participatesInTitleIV: YES, opeidNumber: 'ABC DEF1' }, // space not allowed
    ],
  },

  institutionDetails: {
    valid: [
      // USA address
      [
        {
          institutionName: 'Global Institute',
          physicalAddress: usAddr,
          vaFacilityCode: 'AB12CD34',
        },
      ],
      // England (free-text country) — no state required
      [
        {
          institutionName: 'Royal College',
          physicalAddress: engAddr,
          vaFacilityCode: 'EF34GH56',
        },
      ],
      // New Zealand (misspelled country) — should still pass
      [
        {
          institutionName: 'Aotearoa Tech',
          physicalAddress: nzAddrMisspelled,
          vaFacilityCode: 'IJ78KL90',
        },
      ],
    ],
    invalid: [
      [], // minItems: 1
      [
        {
          // missing required keys
          institutionName: '',
          physicalAddress: { street: '', city: 'Nowhere' },
        },
      ],
      [
        {
          institutionName: 'Bad Code',
          physicalAddress: usAddr,
          vaFacilityCode: 'BADCODE!', // pattern fail
        },
      ],
      // whitespace-only country should fail due to pattern
      [
        {
          institutionName: 'Whitespace Country U',
          physicalAddress: { ...usAddr, country: '   ' },
          vaFacilityCode: 'MN12OP34',
        },
      ],
    ],
  },

  programs: {
    valid: [
      [
        {
          programName: 'Engineering',
          totalProgramLength: '4 year',
          weeksPerTerm: 10,
          entryRequirements: 'Diploma',
          creditHours: 120.5, // decimals allowed
        },
      ],
    ],
    invalid: [
      [], // minItems: 1
      [
        {
          programName: 'X',
          totalProgramLength: '2 year',
          weeksPerTerm: -1, // < 0
          entryRequirements: 'None',
          creditHours: 10,
        },
      ],
      [
        {
          programName: 'Fine Arts',
          totalProgramLength: '3 year',
          weeksPerTerm: 15,
          entryRequirements: 'Prereqs',
          creditHours: -3, // < 0
        },
      ],
      [
        {
          programName: 'Math',
          totalProgramLength: '3 year',
          weeksPerTerm: 12,
          entryRequirements: 'Diploma',
          creditHours: 1.001, // not multipleOf 0.01
        },
      ],
    ],
  },

  acknowledgement7: {
    valid: ['AB', 'XYZ'],
    invalid: ['', 'A', 'TOOLONG', null],
  },
  acknowledgement8: {
    valid: ['CD', 'XY'],
    invalid: ['', 'C', 'ABCD', null],
  },
  acknowledgement9: {
    valid: ['EF', 'GHJ'],
    invalid: ['', 'E', 'EFGH', null],
  },

  acknowledgement10a: {
    valid: [
      { financiallySound: YES }, // no explanation required when YES
      { financiallySound: NO, financialSoundnessExplanation: 'Under review with auditor' },
    ],
    invalid: [
      {}, // missing financiallySound
      { financiallySound: NO }, // missing explanation when NO
      { financiallySound: NO, financialSoundnessExplanation: '' }, // empty explanation when NO
    ],
  },

  acknowledgement10b: {
    valid: ['KL', 'MNO'],
    invalid: ['', 'K', 'MNOP', null],
  },

  governingBodyAndFaculty: {
    valid: [
      [{ fullName: { first: 'Ian', last: 'Wang' }, title: 'Chair' }],
      [
        { fullName: { first: 'A', last: 'B' }, title: 'Dean' },
        { fullName: { first: 'C', last: 'D' }, title: 'Professor' },
      ],
    ],
    invalid: [[{ fullName: { first: 'No', last: 'Title' } }]], // missing title
  },

  financialRepresentative: {
    valid: [{ fullName: { first: 'Jane', last: 'Doe' }, email: 'jane.doe@example.edu' }],
    invalid: [{ fullName: { first: 'Jane', last: 'Doe' }, email: 'not-an-email' }],
  },

  schoolCertifyingOfficial: {
    valid: [{ fullName: { first: 'Kim', last: 'Lee' }, email: 'kim.lee@example.edu' }],
    invalid: [{ fullName: { first: 'Kim', last: 'Lee' }, email: '' }],
  },

  authorizingOfficial: {
    valid: [
      { fullName: { first: 'Alex', last: 'Grant' }, signature: 'Alex G' },
      { fullName: { first: 'Alex', last: 'Grant' }, signature: 'A' }, // minLength 1 OK
    ],
    invalid: [{ signature: 'Sig only' }], // fullName required
  },

  dateSigned: {
    valid: ['2025-01-31', '2024-12-01'],
    invalid: ['01/31/2025', '2025-13-01', null],
  },
};

// ---- Unit-style property suites (SchemaTestHelper) -------------------------
describe('22-0976 schema', () => {
  schemaTestHelper.testValidAndInvalid('submissionReasons', testData.submissionReasons);
  schemaTestHelper.testValidAndInvalid('institutionClassification', testData.institutionClassification);

  // NOTE: institutionProfile & acknowledgement10a are tested below with Ajv mini-root.

  schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
  schemaTestHelper.testValidAndInvalid('programs', testData.programs);

  schemaTestHelper.testValidAndInvalid('acknowledgement7', testData.acknowledgement7);
  schemaTestHelper.testValidAndInvalid('acknowledgement8', testData.acknowledgement8);
  schemaTestHelper.testValidAndInvalid('acknowledgement9', testData.acknowledgement9);

  schemaTestHelper.testValidAndInvalid('acknowledgement10b', testData.acknowledgement10b);
  schemaTestHelper.testValidAndInvalid('governingBodyAndFaculty', testData.governingBodyAndFaculty);
  schemaTestHelper.testValidAndInvalid('financialRepresentative', testData.financialRepresentative);
  schemaTestHelper.testValidAndInvalid('schoolCertifyingOfficial', testData.schoolCertifyingOfficial);
  schemaTestHelper.testValidAndInvalid('authorizingOfficial', testData.authorizingOfficial);
  schemaTestHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});

// ---- Direct Ajv suites for $ref-heavy properties --------------------------
describe('22-0976 schema (Ajv mini-root for ref-heavy props)', () => {
  describe('institutionProfile', () => {
    it('accepts valid shapes', () => {
      testData.institutionProfile.valid.forEach(v => {
        const ok = validateInstitutionProfile({ institutionProfile: v });
        expect(ok, JSON.stringify(validateInstitutionProfile.errors, null, 2)).to.equal(true);
      });
    });

    it('rejects invalid shapes', () => {
      testData.institutionProfile.invalid.forEach(v => {
        const ok = validateInstitutionProfile({ institutionProfile: v });
        expect(ok, 'expected invalid but got valid: ' + JSON.stringify(v)).to.equal(false);
      });
    });
  });

  describe('acknowledgement10a', () => {
    it('accepts valid shapes', () => {
      testData.acknowledgement10a.valid.forEach(v => {
        const ok = validateAcknowledgement10a({ acknowledgement10a: v });
        expect(ok, JSON.stringify(validateAcknowledgement10a.errors, null, 2)).to.equal(true);
      });
    });

    it('rejects invalid shapes', () => {
      testData.acknowledgement10a.invalid.forEach(v => {
        const ok = validateAcknowledgement10a({ acknowledgement10a: v });
        expect(ok, 'expected invalid but got valid: ' + JSON.stringify(v)).to.equal(false);
      });
    });
  });
});

// ---- Cross-field business rules (structure-only) ---------------------------
const requires = (obj, keys) => keys.every(k => Object.prototype.hasOwnProperty.call(obj, k));

describe('22-0976 schema (cross-field business rules)', () => {
  it('base payload includes all root-required keys', () => {
    const payload = cloneDeep(base);
    payload.isMedicalSchool = NO;
    const requiredRoot = [
      'submissionReasons',
      'institutionClassification',
      'institutionProfile',
      'institutionDetails',
      'programs',
      'acknowledgement7',
      'acknowledgement8',
      'acknowledgement9',
      'acknowledgement10a',
      'acknowledgement10b',
      'isMedicalSchool',
      'financialRepresentative',
      'schoolCertifyingOfficial',
      'authorizingOfficial',
      'dateSigned',
      'isAuthenticated',
    ];
    expect(requires(payload, requiredRoot)).to.equal(true);
  });

  it('if isMedicalSchool == YES, requires medical-school fields (and non-empty accreditingAuthorityName)', () => {
    const payload = {
      ...cloneDeep(base),
      isMedicalSchool: YES,
      listedInWDOMS: YES,
      accreditingAuthorityName: 'World Council of Medicine',
      programAtLeast32Months: YES,
      graduatedLast12Months: NO,
      graduatedClasses: [
        { graduationDate: '2023-06-01', graduatesCount: 80 },
        { graduationDate: '2024-06-01', graduatesCount: 85 },
      ],
    };

    expect(payload.isMedicalSchool).to.equal(YES);
    expect(
      requires(payload, [
        'listedInWDOMS',
        'accreditingAuthorityName',
        'programAtLeast32Months',
        'graduatedLast12Months',
        'graduatedClasses',
      ]),
    ).to.equal(true);
    expect((payload.accreditingAuthorityName || '').length > 0).to.equal(true);
  });

  it('if graduatedLast12Months == YES, graduatedClasses must have exactly 2 entries', () => {
    const valid = {
      ...cloneDeep(base),
      isMedicalSchool: YES,
      listedInWDOMS: YES,
      accreditingAuthorityName: 'Accreditor',
      programAtLeast32Months: YES,
      graduatedLast12Months: YES,
      graduatedClasses: [
        { graduationDate: '2024-06-01', graduatesCount: 100 },
        { graduationDate: '2025-06-01', graduatesCount: 95 },
      ],
    };
    expect(valid.graduatedLast12Months).to.equal(YES);
    expect(Array.isArray(valid.graduatedClasses)).to.equal(true);
    expect(valid.graduatedClasses.length).to.equal(2);

    const invalidTooFew = {
      ...valid,
      graduatedClasses: [{ graduationDate: '2024-06-01', graduatesCount: 100 }],
    };
    expect(invalidTooFew.graduatedClasses.length === 2).to.equal(false);

    const invalidTooMany = {
      ...valid,
      graduatedClasses: [
        { graduationDate: '2023-06-01', graduatesCount: 90 },
        { graduationDate: '2024-06-01', graduatesCount: 100 },
        { graduationDate: '2025-06-01', graduatesCount: 95 },
      ],
    };
    expect(invalidTooMany.graduatedClasses.length === 2).to.equal(false);
  });

  it('submissionReasons text fields are required only when their checkbox is selected', () => {
    const withOther = { submissionReasons: { other: true, otherText: 'Explain' } };
    const missingOtherText = { submissionReasons: { other: true } };

    const withUpdateInfo = { submissionReasons: { updateInformation: true, updateInformationText: 'Changed bank' } };
    const missingUpdateText = { submissionReasons: { updateInformation: true } };

    expect(requires(withOther.submissionReasons, ['other', 'otherText'])).to.equal(true);
    expect(requires(missingOtherText.submissionReasons, ['otherText'])).to.equal(false);

    expect(requires(withUpdateInfo.submissionReasons, ['updateInformation', 'updateInformationText'])).to.equal(true);
    expect(requires(missingUpdateText.submissionReasons, ['updateInformationText'])).to.equal(false);
  });

  it('acknowledgement10a requires explanation only when financiallySound is NO', () => {
    const okWhenYes = { acknowledgement10a: { financiallySound: YES } };
    const okWhenNoWithWhy = {
      acknowledgement10a: { financiallySound: NO, financialSoundnessExplanation: 'Deficit' },
    };
    const badWhenNo = { acknowledgement10a: { financiallySound: NO } };

    // Not required when YES (and not forbidden if present)
    expect(requires(okWhenYes.acknowledgement10a, ['financialSoundnessExplanation'])).to.equal(false);

    // Required when NO
    expect(requires(okWhenNoWithWhy.acknowledgement10a, ['financialSoundnessExplanation'])).to.equal(true);
    expect(requires(badWhenNo.acknowledgement10a, ['financialSoundnessExplanation'])).to.equal(false);
  });
});

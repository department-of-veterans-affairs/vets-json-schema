import { cloneDeep, omit } from 'lodash';
import schema from '../../../src/schemas/22-1919/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, 'required'));

const testData = {
  certifyingOfficial: {
    valid: [
      {
        first: 'John',
        last: 'Doe',
        role: { level: 'certifying official' },
      },
    ],
    invalid: [
      {
        first: '',
        last: 'Doe',
        role: { level: '' },
      },
    ],
  },
  aboutYourInstitution: {
    valid: [true],
    invalid: [null],
  },
  institutionDetails: {
    valid: [
      {
        facilityCode: '12345678',
        institutionName: 'Institution of Test',
        institutionAddress: {
          street: '111 2nd St S',
          city: 'Seattle',
          state: 'WA',
          postalCode: '33771',
          county: 'Washington',
        },
      },
    ],
    invalid: [
      {
        facilityCode: '1234567!',
        institutionName: 'Test Institution',
        institutionAddress: {
          street: '',
          city: 123,
          state: 'CAL',
          postalCode: '',
          county: null,
        },
      },
    ],
  },
  isProprietaryProfit: {
    valid: [true],
    invalid: [null],
  },
  isProfitConflictOfInterest: {
    valid: [true],
    invalid: [null],
  },
  proprietaryProfitConflicts: {
    valid: [
      [
        {
          affiliatedIndividuals: {
            first: 'Alice',
            last: 'Smith',
            title: 'Director of Admissions',
            individualAssociationType: 'va',
          },
        },
        {
          affiliatedIndividuals: {
            first: 'Bob',
            last: 'Johnson',
            title: 'Registrar',
            individualAssociationType: 'saa',
          },
        },
      ],
    ],
    invalid: [
      [
        {
          affiliatedIndividuals: {
            first: '',
            last: 'Smith',
            title: '',
            individualAssociationType: 'invalid',
          },
        },
      ],
      [
        {
          affiliatedIndividuals: {
            first: 'John',
            last: 'Public',
            title: 'Owner',
          },
        },
      ],
    ],
  },
  allProprietaryConflictOfInterest: {
    valid: [true],
    invalid: [null],
  },
  allProprietaryProfitConflicts: {
    valid: [
      [
        {
          certifyingOfficial: {
            first: 'Jane',
            last: 'Doe',
            title: 'Dean of Students',
          },
          fileNumber: '123456789',
          enrollmentPeriod: {
            from: '2024-01-01',
            to: '2024-12-31',
          },
        },
      ],
    ],
    invalid: [
      [
        {
          certifyingOfficial: {
            first: '',
            last: 'Doe',
            title: 'Dean of Students',
          },
          fileNumber: 'invalid-ssn',
          enrollmentPeriod: {
            from: 'bad-date',
            to: '2024-12-31',
          },
        },
      ],
      [
        {
          certifyingOfficial: {
            first: 'John',
            last: 'Smith',
          },
          enrollmentPeriod: {
            from: '2024-01-01',
            to: '2024-12-31',
          },
        },
      ],
    ],
  },
  statementOfTruthSignature: {
    valid: ['John Doe'],
    invalid: [null],
  },
  dateSigned: {
    valid: ['2024-01-01'],
    invalid: ['invalid-date'],
  },
};

describe('Schema 22-1919', () => {
  schemaTestHelper.testValidAndInvalid('certifyingOfficial', testData.certifyingOfficial);
  schemaTestHelper.testValidAndInvalid('aboutYourInstitution', testData.aboutYourInstitution);
  schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
  schemaTestHelper.testValidAndInvalid('isProprietaryProfit', testData.isProprietaryProfit);
  schemaTestHelper.testValidAndInvalid('isProfitConflictOfInterest', testData.isProfitConflictOfInterest);
  schemaTestHelper.testValidAndInvalid('proprietaryProfitConflicts', testData.proprietaryProfitConflicts);
  schemaTestHelper.testValidAndInvalid('allProprietaryConflictOfInterest', testData.allProprietaryConflictOfInterest);
  schemaTestHelper.testValidAndInvalid('allProprietaryProfitConflicts', testData.allProprietaryProfitConflicts);
  schemaTestHelper.testValidAndInvalid('statementOfTruthSignature', testData.statementOfTruthSignature);
  schemaTestHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});

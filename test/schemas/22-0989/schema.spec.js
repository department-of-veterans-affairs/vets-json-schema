import { cloneDeep, omit } from 'lodash';
import { expect } from 'chai';
import { it } from 'mocha';
import schema from '../../../src/schemas/22-0989/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
// Ignore root-level cross-field logic for the unit-style property tests:
const schemaTestHelper = new SchemaTestHelper(schemaClone);

const testData = {
  applicantName: {
    valid: [
      { first: 'Joe', last: 'Smith' },
      { first: 'A', last: 'B' },
    ],
    invalid: [{ first: null, last: null }],
  },
  statementOfTruthSignature: {
    valid: ['Jane Q. Smith', 'J Smith'],
    invalid: [null, ''],
  },
  dateSigned: {
    valid: ['2025-08-01', '2024-01-31'],
    invalid: ['08/01/2025', '2025-13-01', null],
  },
  ssn: {
    valid: ['123456789'],
    invalid: ['abc', '123'],
  },
  vaFileNumber: {
    valid: ['123456789'],
    invalid: ['abc', '123'],
  },
  mailingAddress: {
    valid: [
      {
        street: '111 2nd St S',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
    ],
    invalid: [
      {
        street: null,
        city: 'Seattle',
        state: 'WA',
        postalCode: '',
        country: 'USA',
      },
    ],
  },
  emailAddress: {
    valid: ['test@example.com'],
    invalid: ['', 'not-an-email'],
  },
  homePhone: {
    valid: ['5553334444'],
    invalid: ['', '12345'],
  },
  mobilePhone: {
    valid: ['5553334444'],
    invalid: ['', '12345'],
  },
  schoolWasClosed: {
    valid: [true, false],
    invalid: [''],
  },
  closedSchoolName: {
    valid: ['State U'],
    invalid: [null, ''],
  },
  closedSchoolAddress: {
    valid: [
      {
        street: '111 2nd St S',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
    ],
    invalid: [
      {
        street: null,
        city: 'Seattle',
        state: 'WA',
        postalCode: '',
        country: 'USA',
      },
    ],
  },
  didCompleteProgramOfStudy: {
    valid: [true, false],
    invalid: [''],
  },
  didReceiveCredit: {
    valid: [true, false],
    invalid: [''],
  },
  wasEnrolledWhenSchoolClosed: {
    valid: [true, false],
    invalid: [''],
  },
  wasOnApprovedLeave: {
    valid: [true, false],
    invalid: [''],
  },
  withdrewPriorToClosing: {
    valid: [true, false],
    invalid: [''],
  },
  dateOfWithdraw: {
    valid: ['2025-08-01', '2024-01-31'],
    invalid: ['08/01/2025', '2025-13-01', null],
  },
  enrolledAtNewSchool: {
    valid: [true, false],
    invalid: [''],
  },
  newSchoolName: {
    valid: ['State U'],
    invalid: [null, ''],
  },
  newProgramName: {
    valid: ['Chemistry'],
    invalid: [null, ''],
  },
  isUsingTeachoutAgreement: {
    valid: [true, false],
    invalid: [''],
  },
  newSchoolGrants12OrMoreCredits: {
    valid: [true, false],
    invalid: [''],
  },
  schoolDidTransferCredits: {
    valid: [true, false],
    invalid: [''],
  },
  lastDateOfAttendance: {
    valid: ['2025-08-01', '2024-01-31'],
    invalid: ['08/01/2025', '2025-13-01', null],
  },
  attestationName: {
    valid: ['John Doe'],
    invalid: [null, ''],
  },
  attestationDate: {
    valid: ['2025-08-01', '2024-01-31'],
    invalid: ['08/01/2025', '2025-13-01', null],
  },
};

describe('22-0839 schema', () => {
  const validationHelper = new SchemaTestHelper(omit(schemaClone, ['required', 'oneOf', 'anyOf']));
  validationHelper.testValidAndInvalid('applicantName', testData.applicantName);
  validationHelper.testValidAndInvalid('statementOfTruthSignature', testData.statementOfTruthSignature);
  validationHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
  validationHelper.testValidAndInvalid('ssn', testData.ssn);
  validationHelper.testValidAndInvalid('vaFileNumber', testData.vaFileNumber);
  validationHelper.testValidAndInvalid('mailingAddress', testData.mailingAddress);
  validationHelper.testValidAndInvalid('emailAddress', testData.emailAddress);
  validationHelper.testValidAndInvalid('homePhone', testData.homePhone);
  validationHelper.testValidAndInvalid('mobilePhone', testData.mobilePhone);
  validationHelper.testValidAndInvalid('schoolWasClosed', testData.schoolWasClosed);
  validationHelper.testValidAndInvalid('closedSchoolName', testData.closedSchoolName);
  validationHelper.testValidAndInvalid('closedSchoolAddress', testData.closedSchoolAddress);
  validationHelper.testValidAndInvalid('didCompleteProgramOfStudy', testData.didCompleteProgramOfStudy);
  validationHelper.testValidAndInvalid('didReceiveCredit', testData.didReceiveCredit);
  validationHelper.testValidAndInvalid('wasEnrolledWhenSchoolClosed', testData.wasEnrolledWhenSchoolClosed);
  validationHelper.testValidAndInvalid('wasOnApprovedLeave', testData.wasOnApprovedLeave);
  validationHelper.testValidAndInvalid('withdrewPriorToClosing', testData.withdrewPriorToClosing);
  validationHelper.testValidAndInvalid('dateOfWithdraw', testData.dateOfWithdraw);
  validationHelper.testValidAndInvalid('enrolledAtNewSchool', testData.enrolledAtNewSchool);
  validationHelper.testValidAndInvalid('newSchoolName', testData.newSchoolName);
  validationHelper.testValidAndInvalid('newProgramName', testData.newProgramName);
  validationHelper.testValidAndInvalid('isUsingTeachoutAgreement', testData.isUsingTeachoutAgreement);
  validationHelper.testValidAndInvalid('newSchoolGrants12OrMoreCredits', testData.newSchoolGrants12OrMoreCredits);
  validationHelper.testValidAndInvalid('schoolDidTransferCredits', testData.schoolDidTransferCredits);
  validationHelper.testValidAndInvalid('lastDateOfAttendance', testData.lastDateOfAttendance);
  validationHelper.testValidAndInvalid('attestationName', testData.attestationName);
  validationHelper.testValidAndInvalid('attestationDate', testData.attestationDate);
});

describe('22-0989 schema test inputs', () => {
  const base = {
    applicantName: {
      first: 'John',
      last: 'Doe',
    },
    mailingAddress: {
      street: '111 2nd St S',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'USA',
    },
    statementOfTruthSignature: 'John Doe',
    dateSigned: '2025-01-01',
    ssn: '123456789',
  };

  describe('when the school was closed', () => {
    const data = {
      ...base,
      schoolWasClosed: true,
      closedSchoolName: 'Test U',
      closedSchoolAddress: {
        street: '111 2nd St S',
        city: 'Seattle',
        state: 'WA',
        postalCode: '98101',
        country: 'USA',
      },
      didCompleteProgramOfStudy: true,
      didReceiveCredit: true,
      wasEnrolledWhenSchoolClosed: true,
      wasOnApprovedLeave: true,
      withdrewPriorToClosing: false,
      enrolledAtNewSchool: false,
      schoolDidTransferCredits: true,
      lastDateOfAttendance: '2025-01-01',
      attestationName: 'John Doe',
      attestationDate: '2025-01-01',
    };

    it('is valid when all required fields are given', () => {
      expect(schemaTestHelper.validateSchema(data)).to.equal(true);
    });

    it('is invalid ssn and vafilenumber are missing', () => {
      const payload = {
        ...data,
        ssn: '',
        vaFileNumber: '',
      };
      expect(schemaTestHelper.validateSchema(payload)).to.equal(false);
    });

    it('is invalid when a required field is missing', () => {
      const payload = {
        ...data,
        closedSchoolName: '',
      };
      expect(schemaTestHelper.validateSchema(payload)).to.equal(false);
    });

    it('is valid when user withdrew and date is given', () => {
      const payload = {
        ...data,
        withdrewPriorToClosing: true,
        dateOfWithdraw: '2020-01-01',
      };
      expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
    });

    it('is invalid when user withdrew and no date is given', () => {
      const payload = {
        ...data,
        withdrewPriorToClosing: true,
      };
      expect(schemaTestHelper.validateSchema(payload)).to.equal(false);
    });

    it('is valid when user enrolled at new school and new school info is given', () => {
      const payload = {
        ...data,
        enrolledAtNewSchool: true,
        newSchoolName: 'New School',
        newProgramName: 'Physics 2.0',
        isUsingTeachoutAgreement: true,
        newSchoolGrants12OrMoreCredits: true,
      };
      expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
    });

    it('is invalid when user enrolled at new school and new school info is not given', () => {
      const payload = {
        ...data,
        enrolledAtNewSchool: true,
        newSchoolName: '',
        newProgramName: '',
        isUsingTeachoutAgreement: true,
        newSchoolGrants12OrMoreCredits: true,
      };
      expect(schemaTestHelper.validateSchema(payload)).to.equal(false);
    });
  });

  describe('when the school was not closed', () => {
    const data = { ...base, schoolWasClosed: false };

    it('is valid no other data is given', () => {
      expect(schemaTestHelper.validateSchema(data)).to.equal(true);
    });

    it('is valid when remarks are given', () => {
      const payload = {
        ...data,
        remarks: 'lorem ipsum',
      };
      expect(schemaTestHelper.validateSchema(payload)).to.equal(true);
    });
  });
});

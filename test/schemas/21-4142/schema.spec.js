import _ from 'lodash';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';
import fixtures from '../../support/fixtures';

const schema = schemas['21-4142'];
const usAddressFixture = {
  ...fixtures.address,
  state: 'AL',
  postalCode: '54321',
};

const schemaDefaults = {
  veteran: {
    fullName: {
      first: 'Test',
      last: 'Name',
    },
    ssn: fixtures.ssn,
    address: usAddressFixture,
    homePhone: fixtures.phone,
  },
  patientIdentification: {
    isRequestingOwnMedicalRecords: false,
  },
  preparerIdentification: {
    relationshipToVeteran: "I am the service member/Veteran"
  },
  acknowledgeToReleaseInformation: true,
  privacyAgreementAccepted: true,
};

const veteranData = {
  address: {
    valid: [
      {
        country: 'USA',
        street: '123 at home dr',
        street2: 'apt 1',
        city: 'a city',
        state: 'AL',
        postalCode: '12345',
      },
    ],
    invalid: [
      {
        country: 'ABC',
        street: true,
        city: null,
        state: false,
        postalCode: 12345,
      },
    ],
  },
};

// need to remove any required props from schema first,
// in order for sharedTests.runTest to work.
const schemaTestHelper = new SchemaTestHelper(
  _.omit(
    schema,
    'required',
    'properties.veteran.required',
    'properties.veteran.anyOf',
    'properties.patientIdentification.required',
    'properties.preparerIdentification.required',
  ),
  schemaDefaults,
);
const sharedTests = new SharedTests(schemaTestHelper);

describe('21-4142 Authorization to Disclose Information json-schema', () => {
  [
    ['date', ['veteran.dateOfBirth']],
    ['email', ['veteran.email']],
    ['fullName', ['veteran.fullName']],
    ['phone', ['veteran.homePhone']],
    ['ssn', ['veteran.ssn', 'patientIdentification.patientSsn']],
    ['vaFileNumber', ['veteran.vaFileNumber', 'patientIdentification.patientVaFileNumber']],
  ].forEach(test => {
    sharedTests.runTest(...test);
  });

  schemaTestHelper.testValidAndInvalid('veteran.address', veteranData.address);

  schemaTestHelper.testValidAndInvalid('patientIdentification', {
    valid: [
      {
        isRequestingOwnMedicalRecords: false,
        patientFullName: fixtures.fullName,
        patientSsn: '123456789',
        patientVaFileNumber: 'c123456789',
        veteranServiceNumber: '123456789',
      },
      {
        isRequestingOwnMedicalRecords: true,
      },
    ],
    invalid: [
      {
        isRequestingOwnMedicalRecords: false,
        patientFullName: 23456,
        patientSsn: 1234,
        patientVaFileNumber: 23423,
        veteranServiceNumber: '123asdf9',
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('providerFacility', {
    valid: [
      [
        {
          providerFacilityName: 'Test',
          providerFacilityAddress: usAddressFixture,
          treatmentDateRange: [fixtures.dateRange],
          conditionsTreated: 'Test',
        },
      ],
    ],
    invalid: [
      [
        {
          providerFacilityName: 3456,
          providerFacilityAddress: usAddressFixture,
          treatmentDateRange: fixtures.dateRange,
          conditionsTreated: ['Test', 'Test 2'],
        },
      ],
    ],
  });

  schemaTestHelper.testValidAndInvalid('preparerIdentification', {
    valid: [
      {
        relationshipToVeteran: "I am the service member/Veteran",
      },
      {
        relationshipToVeteran: "Spouse",
        preparerFullName: fixtures.fullName,
        preparerAddress: usAddressFixture
      },
      {
        relationshipToVeteran: "Third-party",
        preparerFullName: fixtures.fullName,
        preparerTitle: "full title",
        preparerOrganization: "name of org",
        courtAppointmentInfo: "this date, this time, docket #",
        preparerAddress: usAddressFixture
      },
    ],
    invalid: [
      {
        relationshipToVeteran: true,
        preparerFullName: 23456,
        preparerAddress: usAddressFixture
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('patientIdentification.isRequestingOwnMedicalRecords', {
    valid: [true, false],
    invalid: ['yes', 'no', '0', '1'],
  });

  schemaTestHelper.testValidAndInvalid('acknowledgeToReleaseInformation', {
    valid: [true],
    invalid: [false, 'yes', 'no', '0', '1'],
  });

  schemaTestHelper.testValidAndInvalid('privacyAgreementAccepted', {
    valid: [true],
    invalid: [false, 'yes', 'no', '0', '1'],
  });
});

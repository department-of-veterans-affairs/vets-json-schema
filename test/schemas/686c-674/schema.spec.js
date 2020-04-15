import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';

const schema = schemas['686C-674'];

let schemaTestHelper = new SchemaTestHelper(schema);

describe('686c-674 schema', () => {

  schemaTestHelper.testValidAndInvalid('veteranInformation', {
    valid: [{
      first: 'John',
      middle: 'Jane',
      last: 'Doe',
      suffix: 'Jr',
      ssn: fixtures.ssn,
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('veteranAddress', {
    valid: [{
      countryName: 'United States',
      addressLine1: '123 Some street',
      addressLine2: 'NA',
      addressLine3: 'NA',
      city: 'Someplace',
      stateCode: 'CA',
      province: 'NA',
      zipCode: '12345',
      internationalPostalCode: 'NA',
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('optionSelection', {
    valid: [{ 
      addChild: true,
      addSpouse: true,
      reportDivorce: true,
      reportDeath: true,
      reportStepchildNotInHousehold: true,
      reportMarriageOfChildUnder18: true,
      reportChild18orOlderIsNotAttendingSchool: true,
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('addChildInformation', {
    valid: [{
      first: 'John',
      middle: 'Jane',
      last: 'Doe',
      suffix: 'Jr',
      ssn: fixtures.ssn,
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('addChildPlaceOfBirth', {
    valid: [{
      state: 'California',
      city: 'Arroyo Grande',
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('addChildPlaceOfBirth', {
    valid: [{
      state: 'California',
      city: 'Arroyo Grande',
      childStatus: {
        biological: true,
      },
      childPreviouslyMarried: 'Yes',
      childPreviousMarriageDetails: {
        dateMarriageEnded: fixtures.date,
        reasonMarriageEnded: 'Divorce',
        otherReasonMarriageEnded: 'Some other reason',
      },
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('addChildAdditionalInformation', {
    valid: [{
      doesChildLiveWithYou: true,
      childAddressInfo: {
        countryName: 'United States',
        addressLine1: '123 Some street',
        addressLine2: 'NA',
        addressLine3: 'NA',
        city: 'Someplace',
        stateCode: 'CA',
        province: 'NA',
        zipCode: '12345',
        internationalPostalCode: 'NA',
      },
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('childAdditionalEvidence', {
    valid: [{
      supportingDocuments: ['file']
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('spouseNameInformation', {
    valid: [{
      spouseFullName: {
        first: 'John',
        middle: 'Jane',
        last: 'Doe',
        suffix: 'Jr',
        ssn: fixtures.ssn,
      },
      spouseSSN: fixtures.ssn,
      spouseDOB: fixtures.date,
      isSpouseVeteran: true,
      spouseVAFileNumber: '000-00-000',
      spouseServiceNumber: '000-00-000'
    }],
    invalid: [],
  });

  schemaTestHelper.testValidAndInvalid('currentMarriageInformation', {
    valid: [{
      dateOfMarriage: fixtures.date,
      locationOfMarriage: {
        state: 'California',
        city: 'Arroyo Grande',
      },
      marriageType: 'CEREMONIAL',
      marriageTypeOther: 'NA',
    }],
    invalid: [],
  });

});

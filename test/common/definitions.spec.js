import { cloneDeep } from 'lodash';
import SchemaTestHelper from '../support/schema-test-helper';
import { definitions as originalDefinitions } from '../../dist/schemas';
import fixtures from '../support/fixtures';
import testData from '../support/test-data';

function stringGenerate(length) {
  return new Array(length + 1).join('a');
}

const definitions = cloneDeep(originalDefinitions);

definitions.teraQuestions = {
  type: 'object',
  properties: originalDefinitions.teraQuestions,
};

describe('schema definitions', () => {
  const testValidAndInvalidDefinitions = (definitionName, fields) => {
    const schemaTestHelper = new SchemaTestHelper({
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'object',
      definitions,
      properties: {
        [definitionName]: definitions[definitionName],
      },
    });

    schemaTestHelper.testValidAndInvalid(definitionName, fields);
  };

  testValidAndInvalidDefinitions('teraQuestions', {
    valid: [
      { otherToxicExposure: 'foo' },
      { otherToxicExposure: 'foo bar' },
      { otherToxicExposure: 'Foo123' },
      { otherToxicExposure: 'Foo123, Bar123' },
    ],
    invalid: [{ otherToxicExposure: '$' }],
  });

  testValidAndInvalidDefinitions('insuranceProvider', {
    valid: [
      {
        insuranceName: stringGenerate(100),
        insurancePolicyHolderName: stringGenerate(50),
        insurancePolicyNumber: stringGenerate(30),
        insuranceGroupCode: stringGenerate(30),
      },
      { insurancePolicyNumber: '123' },
      { insuranceGroupCode: '123' },
    ],
    invalid: [
      {
        insuranceName: stringGenerate(101),
        insurancePolicyHolderName: stringGenerate(51),
        insurancePolicyNumber: stringGenerate(31),
        insuranceGroupCode: stringGenerate(31),
      },
      {},
      { insuranceName: ' ' },
      { insurancePolicyHolderName: ' ' },
      { insuranceGroupCode: ' ' },
      { insurancePolicyNumber: ' ' },
    ],
  });

  testValidAndInvalidDefinitions('fullName', {
    valid: [
      {
        first: 'john',
        last: 'doe',
      },
    ],
    invalid: [
      {
        first: 'john',
      },
    ],
  });

  testValidAndInvalidDefinitions('address', {
    valid: [
      fixtures.address,
      {
        street: '123 a rd',
        city: 'abc',
        state: 'VA',
        country: 'USA',
      },
      {
        city: 'foo',
        country: 'USA',
      },
    ],
    invalid: [
      {
        street: '123 a rd',
        city: 'abc',
        state: 'foo',
        country: 'USA',
      },
    ],
  });

  testValidAndInvalidDefinitions('phone', {
    valid: ['5555555555', '555-555-5555', '555 555 5555'],
    invalid: ['1234'],
  });

  testValidAndInvalidDefinitions('ssn', {
    valid: ['123456789'],
    invalid: ['123-45-6789', '12345678', 'aaa223333'],
  });

  testValidAndInvalidDefinitions('school', {
    valid: [
      {
        name: 'foo',
        address: fixtures.address,
      },
    ],
    invalid: [
      {
        name: true,
      },
    ],
  });

  testValidAndInvalidDefinitions('bankAccount', {
    valid: [
      {
        accountType: 'checking',
        routingNumber: '123456789',
        accountNumber: '1234',
      },
    ],
    invalid: [
      {
        accountType: 'foo',
        routingNumber: '123456789',
        accountNumber: '1234',
      },
    ],
  });

  testValidAndInvalidDefinitions('serviceBefore1977', {
    valid: [
      {
        married: true,
        haveDependents: true,
        parentDependent: false,
      },
    ],
    invalid: [
      {
        married: true,
      },
    ],
  });

  testValidAndInvalidDefinitions('dateRange', {
    valid: [
      fixtures.dateRange,
      {
        from: '2000-01-01',
        to: '2001-03-02',
      },
      {
        from: '2000-01-01',
      },
    ],
    invalid: [
      {
        from: 'foo',
        to: 'bar',
      },
      {
        from: '2000-01-01',
        to: 'future',
      },
    ],
  });

  testValidAndInvalidDefinitions('date', {
    valid: [
      '2000-01-02',
      '2000-01-31',
      '2000-11-02',
      '2000-11-25',
      'XXXX-11-25',
      'XXXX-XX-25',
      '2001-11-XX',
      '2001-XX-01',
    ],
    invalid: [
      '4/6/1998',
      'Fri Aug 19 2016 15:09:46 GMT-0400 (EDT)',
      '2000-1-02',
      '2000-13-01',
      '2000-12-32',
      '2000-12-00',
      '2000-00-01',
      '2000-01-9',
    ],
  });

  testValidAndInvalidDefinitions('usaPostalCode', {
    valid: ['12345', '12345-1234'],
    invalid: ['1234', '12345 1234', '12345-123', '443342333', '44334-', '2345', ''],
  });

  testValidAndInvalidDefinitions('educationType', {
    valid: ['college', 'correspondence'],
    invalid: ['foo'],
  });

  testValidAndInvalidDefinitions('privacyAgreementAccepted', {
    valid: [true],
    invalid: [false],
  });

  testValidAndInvalidDefinitions('gender', {
    valid: ['M', 'F'],
    invalid: ['male'],
  });

  testValidAndInvalidDefinitions('postHighSchoolTrainings', {
    valid: [
      [
        {
          name: 'college',
          dateRange: fixtures.dateRange,
          city: 'new york',
          hoursType: 'semester',
          state: 'NY',
        },
      ],
    ],
    invalid: [
      [
        {
          name: 'college',
          dateRange: {},
          city: 'new york',
          hoursType: 'semester',
          state: 'ABC',
        },
      ],
    ],
  });

  testValidAndInvalidDefinitions('nonMilitaryJobs', {
    valid: [
      [
        {
          name: 'president',
          months: 9999,
          postMilitaryJob: true,
        },
      ],
    ],
    invalid: [
      [
        {
          postMilitaryJob: true,
          months: 'a',
        },
      ],
    ],
  });

  testValidAndInvalidDefinitions('secondaryContact', {
    valid: [
      {
        fullName: 'john doe',
        sameAddress: true,
        address: fixtures.address,
        phone: fixtures.phone,
      },
    ],
    invalid: [
      {
        fullName: 1,
      },
    ],
  });

  testValidAndInvalidDefinitions('vaFileNumber', {
    valid: [
      '1234567',
      '12345678',
      '123456789',
      'c1234567',
      'c12345678',
      'c123456789',
      'C1234567',
      'C12345678',
      'C123456789',
    ],
    invalid: ['123', 'd12345678', '1234567890'],
  });

  testValidAndInvalidDefinitions('relationship', {
    valid: ['spouse', 'child'],
    invalid: ['brother'],
  });

  testValidAndInvalidDefinitions('netWorthAccount', {
    valid: [
      {
        amount: 1,
        interest: true,
      },
    ],
    invalid: [
      {
        amount: false,
      },
    ],
  });

  testValidAndInvalidDefinitions('otherIncome', {
    valid: [fixtures.otherIncome],
    invalid: [
      {
        name: 1,
      },
    ],
  });

  [
    'toursOfDuty',
    'centralMailVaFile',
    'currentlyActiveDuty',
    'bankAccountChange',
    'usaPhone',
    'maritalStatus',
    'relationshipAndChildName',
    'marriages',
    'serviceHistory',
    'dischargeType',
    'centralMailAddress',
    'files',
    'email',
  ].forEach(definition => {
    testValidAndInvalidDefinitions(definition, testData[definition].data);
  });

  testValidAndInvalidDefinitions('hcaFullName', {
    valid: [
      {
        first: stringGenerate(25),
        middle: stringGenerate(30),
        last: stringGenerate(35),
      },
      // Two-letter last names are valid
      {
        first: stringGenerate(25),
        last: stringGenerate(2),
      },
    ],
    invalid: [
      {
        first: stringGenerate(26),
        middle: stringGenerate(31),
        last: stringGenerate(36),
      },
      // One-letter last names are invalid
      {
        first: stringGenerate(25),
        last: stringGenerate(1),
      },
      // Only spaces are invalid
      {
        first: '  ',
        middle: stringGenerate(30),
        last: '  ',
      },
    ],
  });

  testValidAndInvalidDefinitions('hcaMonetaryValue', {
    valid: [2500.83, 90843],
    invalid: [10000000],
  });

  testValidAndInvalidDefinitions('hcaDependents', {
    valid: [
      [
        {
          fullName: {
            first: stringGenerate(25),
            middle: stringGenerate(30),
            last: stringGenerate(35),
          },
          dependentRelation: 'Stepdaughter',
          socialSecurityNumber: '123456789',
          becameDependent: '2018-01-10',
          dateOfBirth: '2018-01-10',
          disabledBefore18: false,
          attendedSchoolLastYear: true,
          dependentEducationExpenses: 1000.21,
          cohabitedLastYear: true,
          receivedSupportLastYear: true,
          grossIncome: 0,
          netIncome: 0,
          otherIncome: 0,
        },
      ],
    ],
    invalid: [
      [
        {
          fullName: {
            first: stringGenerate(26),
            middle: stringGenerate(30),
            last: stringGenerate(35),
          },
          dependentRelation: 'Stepfather',
          socialSecurityNumber: '1234567891',
          becameDependent: '10/10/2010',
          dateOfBirth: '10/10/2010',
          disabledBefore18: false,
          attendedSchoolLastYear: true,
          dependentEducationExpenses: 1000.21,
          cohabitedLastYear: true,
          receivedSupportLastYear: true,
          grossIncome: 0,
          netIncome: 0,
          otherIncome: 0,
        },
      ],
    ],
  });

  testValidAndInvalidDefinitions('hcaAddress', {
    valid: [
      {
        country: 'USA',
        state: 'AK',
        street: stringGenerate(23),
        street2: stringGenerate(13),
        street3: stringGenerate(5),
        city: stringGenerate(27),
        postalCode: stringGenerate(5),
      },
    ],
    invalid: [
      {
        country: 'NZ',
        provinceCode: stringGenerate(52),
        street: stringGenerate(31),
        street2: stringGenerate(31),
        street3: stringGenerate(31),
        city: stringGenerate(31),
        postalCode: stringGenerate(52),
      },
      // doesn't allow street, cities, or provinces with only spaces
      {
        street: '   ',
        city: '    ',
        country: '     ',
        provinceCode: '     ',
      },
      // doesn't allow postalCode with only spaces
      {
        country: 'USA',
        state: 'AK',
        street: stringGenerate(23),
        street2: stringGenerate(13),
        street3: stringGenerate(5),
        city: stringGenerate(27),
        postalCode: '   ',
      },
    ],
  });

  testValidAndInvalidDefinitions('sigiGenders', {
    valid: ['M'],
    invalid: ['Female'],
  });

  testValidAndInvalidDefinitions('hcaPhone', {
    valid: ['1234567890'],
    invalid: ['238A439434', 'abcdefghij', '123-456-7890', 1234567890, ''],
  });

  testValidAndInvalidDefinitions('hcaEmail', {
    valid: ['a@a.com', 'a@a.net', 'a+2@a.com', 'Foo@foo.com', 'foo.bar@foo.org'],
    invalid: ['@', 'foo', 'foo.com', 'a@a', 'a@a.', '@a.com'],
  });

  testValidAndInvalidDefinitions('minimumYearDateRange', {
    valid: [
      { startDate: '2009-03-22', endDate: '2010-06-22'},
      { startDate: '2009-03-22'},
      { endDate: '2010-06-22'},
      { startDate: '2009-03-XX', endDate: '2010-06-22'},
      { startDate: '2009-03-22', endDate: '2010-06-XX'},
      { startDate: '2009-XX-XX', endDate: '2010-06-22'},
      { startDate: '2009-03-22', endDate: '2010-XX-XX'},
      { startDate: '2009-XX-XX'},
      { endDate: '2010-XX-XX'},
      { startDate: '2009-XX-22', endDate: '2010-XX-22'},
    ],
    invalid: [
      { startDate: 'XXXX-01-02' },
      { endDate: '79-01-02' },
      { startDate: '2009-03-22', endDate: 'XXXX-01-02' },
      { startDate: '79-01-02', endDate: '2009-03-XX' },
    ]
  });
});

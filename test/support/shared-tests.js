import fixtures from './fixtures';

const testData = {
  phone: {
    fields: ['homePhone', 'mobilePhone'],
    data: {
      valid: ['5555555555', '555-555-5555', '555 555 5555'],
      invalid: ['1234']
    }
  },
  ssn: {
    fields: ['veteranSocialSecurityNumber'],
    data: {
      valid: ['123456789'],
      invalid: ['123-45-6789', '12345678']
    }
  },
  gender: {
    data: {
      valid: ['M', 'F'],
      invalid: ['Z']
    }
  },
  date: {
    fields: ['veteranDateOfBirth'],
    data: {
      valid: [
        '2000-01-02',
        '2000-01-31',
        '2000-11-02',
        '2000-11-25',
        'XXXX-11-25',
        'XXXX-XX-25',
        '2001-11-XX',
        '2001-XX-01'
      ],
      invalid: [
        '4/6/1998',
        'Fri Aug 19 2016 15:09:46 GMT-0400 (EDT)',
        '2000-1-02',
        '2000-13-01',
        '2000-12-32',
        '2000-12-00',
        '2000-00-01',
        '2000-01-9'
      ]
    }
  },
  fullName: {
    fields: ['veteranFullName'],
    data: {
      valid: [{
        first: 'john',
        last: 'doe'
      }],
      invalid: [{
        first: 'john'
      }]
    }
  },
  address: {
    fields: ['veteranAddress'],
    data: {
      valid: [{
        street: '123 a rd',
        city: 'abc',
        country: 'USA'
      }],
      invalid: [{
        city: 'foo',
        country: 'USA'
      }]
    }
  },
  email: {
    data: {
      valid: [
        'foo@foo.com',
        'foo+1@foo.com'
      ],
      invalid: ['foo']
    }
  },
  bankAccount: {
    data: {
      valid: [{
        accountType: 'checking',
        routingNumber: '123456789',
        accountNumber: '1234'
      }],
      invalid: [{
        accountType: 'foo',
        routingNumber: '123456789',
        accountNumber: '1234'
      }]
    }
  },
  educationType: {
    data: {
      valid: ['college', 'tuitionTopUp'],
      invalid: ['foo', 'cooperativeTraining']
    }
  },
  school: {
    data: {
      valid: [{
        name: 'harvard'
      }],
      invalid: [{
        name: true
      }]
    }
  },
  postHighSchoolTrainings: {
    data: {
      valid: [[{
        name: 'college',
        dateRange: fixtures.dateRange,
        city: 'new york',
        hoursType: 'semester',
        state: 'NY'
      }]],
      invalid: [
        [{
          name: 'college',
          dateRange: {},
          city: 'new york',
          hoursType: 'semester',
          state: 'ABC'
        }]
      ]
    }
  },
  nonMilitaryJobs: {
    data: {
      valid: [[{
        name: 'president',
        months: 9999,
        postMilitaryJob: true
      }]],
      invalid: [[{
        postMilitaryJob: true,
        months: 'a'
      }]]
    }
  }
};

export default class SharedTests {
  constructor(schemaTestHelper) {
    this.schemaTestHelper = schemaTestHelper;
  }

  runTest(name, fields) {
    const testDatum = testData[name];
    fields = fields || testDatum.fields || [name];

    fields.forEach((field) => {
      this.schemaTestHelper.testValidAndInvalid(field, testDatum.data);
    });
  }
};

import fixtures from './fixtures';

export default {
  phone: {
    fields: ['homePhone', 'mobilePhone'],
    data: {
      valid: ['5555555555', '555-555-5555', '555 555 5555'],
      invalid: ['1234']
    }
  },
  preferredContactMethod: {
    fields: ['preferredContactMethod'],
    data: {
      valid: ['mail', 'phone'],
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
  addressWithRequiredZip: {
    data: {
      valid: [
        {
          street: '123 a rd',
          city: 'abc',
          state: 'VA',
          country: 'USA',
          postalCode: '12345'
        }
      ],
      invalid: [
        fixtures.address
      ]
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
        city: 1
      }]
    }
  },
  usaPhone: {
    data: {
      valid: ['0123456789'],
      invalid: ['012345678x', '01234567899', '012345678']
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
  educationProgram: {
    data: {
      valid: [{
        educationType: 'college',
        name: 'Test',
        address: {
          country: 'USA',
          state: 'MT',
          street: '123',
          city: 'Test'
        }
      }],
      invalid: [{
        educationType: 'blahblah',
        name: 'Test'
      }]
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
  dateRange: {
    data: {
      valid: [fixtures.dateRange],
      invalid: [{
        from: false
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
  },
  secondaryContact: {
    data: {
      valid: [{
        fullName: 'john doe',
        sameAddress: true,
        address: fixtures.address,
        phone: fixtures.phone
      }],
      invalid: [{
        fullName: 1
      }]
    }
  },
  vaFileNumber: {
    data: {
      valid: [
        '1234567',
        '12345678',
        '123456789',
      ],
      invalid: [
        '123',
        '1234567890',
      ]
    }
  },
  relationship: {
    data: {
      valid: [
        'spouse'
      ],
      invalid: [
        'foo'
      ]
    }
  },
  currentlyActiveDuty: {
    data: {
      valid: [{
        yes: true,
        onTerminalLeave: true,
        nonVaAssistance: true
      }],
      invalid: [{
        yes: 1
      }]
    }
  },
  bankAccountChange: {
    data: {
      valid: ['noChange', 'startUpdate', 'stop'],
      invalid: ['foo']
    }
  },
  maritalStatus: {
    data: {
      valid: [
        'Married',
        'Never Married',
        'Separated',
        'Widowed',
        'Divorced'
      ],
      invalid: ['foo']
    }
  },
  relationshipAndChildName: {
    data: {
      valid: [fixtures.relationshipAndChildName],
      invalid: [{
        relationship: 'foo'
      }]
    }
  },
  marriages: {
    data: {
      valid: [[{
        otherExplanation: 'explanation',
        dateOfMarriage: fixtures.date,
        locationOfMarriage: 'ny, ny',
        marriageType: 'common law',
        spouseFullName: fixtures.fullName,
        dateOfSeparation: fixtures.date,
        locationOfSeparation: 'ny, ny',
        reasonForSeparation: 'divorce'
      }]],
      invalid: [[{
        dateOfMarriage: false
      }]]
    }
  },
  toursOfDuty: {
    data: {
      valid: [[{
        dateRange: fixtures.dateRange,
        serviceBranch: 'navy',
        serviceStatus: 'active',
        benefitsToApplyTo: 'chapter30'
      }]],
      invalid: [
        [{
          serviceBranch: 'navy',
          serviceStatus: 'active',
        }],
        [{
          dateRange: fixtures.dateRange,
          serviceBranch: 1,
          serviceStatus: 'active',
        }],
        [{
          dateRange: fixtures.dateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          benefitsToApplyTo: ['chapter85968568']
        },
        {
          dateRange: fixtures.dateRange,
          serviceBranch: 'navy',
          serviceStatus: 'active',
          involuntarilyCalledToDuty: 'yes',
          benefitsToApplyTo: 'chapter30'
        }]
      ],
    }
  },
  dischargeType: {
    data: {
      valid: [
        'honorable',
        'general'
      ],
      invalid: [
        'foo'
      ]
    }
  },
  serviceHistory: {
    data: {
      valid: [
        [{
          serviceBranch: 'navy',
          dateRange: fixtures.dateRange,
          dischargeType: 'honorable'
        }]
      ],
      invalid: [
        [{
          serviceBranch: 'navy',
          dateRange: { from: 'foo', to: 'bar' },
          dischargeType: 'honorable'
        }], [{
          serviceBranch: 'navy',
          dateRange: fixtures.dateRange,
          dischargeType: 'foo'
        }]
      ]

    }

  },
  files: {
    data: {
      valid: [[{
        confirmationCode: 'testing',
        name: 'testing',
        size: 1
      }]],
      invalid: [[{
        size: 'asdf'
      }]]
    }
  }
};

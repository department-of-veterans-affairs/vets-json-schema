import fixtures from './fixtures';

export default {
  phone: {
    fields: ['homePhone', 'mobilePhone'],
    data: {
      valid: ['5555555555', '555-555-5555', '555 555 5555'],
      invalid: ['1234'],
    },
  },
  preferredContactMethod: {
    fields: ['preferredContactMethod'],
    data: {
      valid: ['mail', 'phone'],
      invalid: ['1234'],
    },
  },
  ssn: {
    fields: ['veteranSocialSecurityNumber'],
    data: {
      valid: ['123456789'],
      invalid: ['123-45-6789', '12345678'],
    },
  },
  gender: {
    data: {
      valid: ['M', 'F'],
      invalid: ['Z'],
    },
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
    },
  },
  fullName: {
    fields: ['veteranFullName'],
    data: {
      valid: [
        { first: 'john', last: 'doe' },
        { first: 'john', middle: 'A', last: 'doe' },
        { first: 'john', middle: 'A', last: 'doe', suffix: 'Jr.' },
      ],
      invalid: [{ first: 'john' }, { last: 'john' }, { middle: 'john' }],
    },
  },
  fullNameNoSuffix: {
    fields: ['veteranFullName'],
    data: {
      valid: [
        { first: 'john', last: 'doe' },
        { first: 'john', middle: 'A', last: 'doe' },
      ],
      invalid: [
        { first: 'john' },
        { last: 'john' },
        { middle: 'john' },
        { first: 'john', middle: 'A', last: 'doe', suffix: 'Jr.' },
      ],
    },
  },
  centralMailAddress: {
    data: {
      valid: [
        {
          street: '123 a rd',
          city: 'abc',
          postalCode: '12345-1234',
          country: 'USA',
        },
        {
          street: '123 a rd',
          city: 'abc',
          postalCode: '12345',
          country: 'USA',
        },
      ],
      invalid: [
        {
          street: '123 a rd',
          city: 'abc',
          postalCode: '12345 1245',
          country: 'USA',
        },
        {
          street: '123 a rd',
          city: 'abc',
          country: 'USA',
        },
      ],
    },
  },
  address: {
    fields: ['veteranAddress'],
    data: {
      valid: [
        {
          street: '123 a rd',
          city: 'abc',
          country: 'USA',
        },
      ],
      invalid: [
        {
          city: 1,
        },
      ],
    },
  },
  usAddress: {
    fields: ['veteranAddress'],
    data: {
      valid: [
        { street: '123 5th St. N.', city: 'St. Petersburg', state: 'FL', postalCode: '33701' },
        { street: '123 5th St. N.', city: 'St. Petersburg', state: 'FL', postalCode: '33701-1234' },
        { street: '123 5th St. N.', street2: '#501', city: 'St. Petersburg', state: 'FL', postalCode: '33701' },
        { street: '123 5th St. N.', street2: '#501', city: 'St. Petersburg', state: 'FL', postalCode: '33701-1234' },
        { street: '123 5th St. N.', street2: '#501', city: 'St. Petersburg', state: 'DC', postalCode: '33701-1234' },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: American Samoa',
          state: 'AS',
          postalCode: '33701-1234',
        },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Armed Forces Americas (AA)',
          state: 'AA',
          postalCode: '33701-1234',
        },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Armed Forces Europe (AE)',
          state: 'AE',
          postalCode: '33701-1234',
        },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Armed Forces Pacific (AP)',
          state: 'AP',
          postalCode: '33701-1234',
        },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Federated States Of Micronesia',
          state: 'FM',
          postalCode: '33701-1234',
        },
        { street: '123 5th St. N.', street2: '#501', city: 'City in: Guam', state: 'GU', postalCode: '33701-1234' },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Marshall Islands',
          state: 'MH',
          postalCode: '33701-1234',
        },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Northern Mariana Islands',
          state: 'MP',
          postalCode: '33701-1234',
        },
        { street: '123 5th St. N.', street2: '#501', city: 'City in: Palau', state: 'PW', postalCode: '33701-1234' },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Puerto Rico',
          state: 'PR',
          postalCode: '33701-1234',
        },
        {
          street: '123 5th St. N.',
          street2: '#501',
          city: 'City in: Virgin Islands',
          state: 'VI',
          postalCode: '33701-1234',
        },
      ],
      invalid: [
        { street: '123' },
        { street2: '123' },
        { city: 'FL' },
        { state: 'FL' },
        { postalCode: 'FL' },
        { city: 'St. Petersburg', state: 'FL', postalCode: '33701' },
        { street: '123 5th St. N.', state: 'FL', postalCode: '33701' },
        { street: '123 5th St. N.', city: 'St. Petersburg', postalCode: '33701' },
        { street: '123 5th St. N.', city: 'St. Petersburg', state: 'FL' },
        { street: '123 5th St. N.', city: 'St. Petersburg', state: 'FL', postalCode: '3370101234' },
        { street: '123 5th St. N.', city: 'St. Petersburg', state: 'FL', postalCode: '33701 1234' },
        { street: '123 5th St. N.', city: 'St. Petersburg', state: 'FL', postalCode: '33701A1234' },
      ],
    },
  },
  usaPhone: {
    data: {
      valid: ['0123456789'],
      invalid: ['012345678x', '01234567899', '012345678'],
    },
  },
  email: {
    data: {
      valid: ['foo@foo.com', 'foo+1@foo.com'],
      invalid: ['foo'],
    },
  },
  bankAccount: {
    data: {
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
    },
  },
  educationType: {
    data: {
      valid: ['college', 'tuitionTopUp'],
      invalid: ['foo', 'cooperativeTraining'],
    },
  },
  educationProgram: {
    data: {
      valid: [
        {
          educationType: 'college',
          name: 'Test',
          address: {
            country: 'USA',
            state: 'MT',
            street: '123',
            city: 'Test',
          },
        },
      ],
      invalid: [
        {
          educationType: 'blahblah',
          name: 'Test',
        },
      ],
    },
  },
  school: {
    data: {
      valid: [
        {
          name: 'harvard',
        },
      ],
      invalid: [
        {
          name: true,
        },
      ],
    },
  },
  dateRange: {
    data: {
      valid: [fixtures.dateRange],
      invalid: [
        {
          from: false,
        },
      ],
    },
  },
  postHighSchoolTrainings: {
    data: {
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
    },
  },
  nonMilitaryJobs: {
    data: {
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
    },
  },
  secondaryContact: {
    data: {
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
    },
  },
  centralMailVaFile: {
    data: {
      valid: ['12345678', '123456789'],
      invalid: ['1234567', '1234567890', 'C12345678'],
    },
  },
  vaFileNumber: {
    data: {
      valid: ['1234567', '12345678', '123456789'],
      invalid: ['123', '1234567890'],
    },
  },
  relationship: {
    data: {
      valid: ['spouse'],
      invalid: ['foo'],
    },
  },
  currentlyActiveDuty: {
    data: {
      valid: [
        {
          yes: true,
          onTerminalLeave: true,
          nonVaAssistance: true,
        },
      ],
      invalid: [
        {
          yes: 1,
        },
      ],
    },
  },
  bankAccountChange: {
    data: {
      valid: ['noChange', 'startUpdate', 'stop'],
      invalid: ['foo'],
    },
  },
  maritalStatus: {
    data: {
      valid: ['Married', 'Never Married', 'Separated', 'Widowed', 'Divorced'],
      invalid: ['foo'],
    },
  },
  relationshipAndChildName: {
    data: {
      valid: [fixtures.relationshipAndChildName],
      invalid: [
        {
          relationship: 'foo',
        },
      ],
    },
  },
  marriages: {
    data: {
      valid: [
        [
          {
            otherExplanation: 'explanation',
            dateOfMarriage: fixtures.date,
            locationOfMarriage: 'ny, ny',
            marriageType: 'common law',
            spouseFullName: fixtures.fullName,
            dateOfSeparation: fixtures.date,
            locationOfSeparation: 'ny, ny',
            reasonForSeparation: 'divorce',
          },
        ],
      ],
      invalid: [
        [
          {
            dateOfMarriage: false,
          },
        ],
      ],
    },
  },
  toursOfDuty: {
    data: {
      valid: [
        [
          {
            dateRange: fixtures.dateRange,
            serviceBranch: 'navy',
            serviceStatus: 'active',
            benefitsToApplyTo: 'chapter30',
          },
        ],
      ],
      invalid: [
        [
          {
            serviceBranch: 'navy',
            serviceStatus: 'active',
          },
        ],
        [
          {
            dateRange: fixtures.dateRange,
            serviceBranch: 1,
            serviceStatus: 'active',
          },
        ],
        [
          {
            dateRange: fixtures.dateRange,
            serviceBranch: 'navy',
            serviceStatus: 'active',
            benefitsToApplyTo: ['chapter85968568'],
          },
          {
            dateRange: fixtures.dateRange,
            serviceBranch: 'navy',
            serviceStatus: 'active',
            involuntarilyCalledToDuty: 'yes',
            benefitsToApplyTo: 'chapter30',
          },
        ],
      ],
    },
  },
  dischargeType: {
    data: {
      valid: ['honorable', 'general'],
      invalid: ['foo'],
    },
  },
  serviceHistory: {
    data: {
      valid: [
        [
          {
            serviceBranch: 'navy',
            dateRange: fixtures.dateRange,
            dischargeType: 'honorable',
          },
        ],
      ],
      invalid: [
        [
          {
            serviceBranch: 'navy',
            dateRange: { from: 'foo', to: 'bar' },
            dischargeType: 'honorable',
          },
        ],
        [
          {
            serviceBranch: 'navy',
            dateRange: fixtures.dateRange,
            dischargeType: 'foo',
          },
        ],
      ],
    },
  },
  files: {
    data: {
      valid: [
        [
          {
            confirmationCode: 'testing',
            name: 'testing',
            size: 1,
          },
        ],
      ],
      invalid: [
        [
          {
            size: 'asdf',
          },
        ],
      ],
    },
  },
  email: {
    data: {
      valid: [
        'name@example.com',
        'name@example.org',
        'name@example.net',
        'my.name@example.com',
        'my.name@mail.example.com', // sub domain
        'x@example.com', // single char local part
        'fully-qualified-domain@example.com', // hyphenated local
        'example-indeed@strange-example.com', // hyphenated domain name
        'other.email-with-hyphen@example.com',
        'example@s.example', // nontraditional TLD
      ],
      invalid: [
        // BELOW: Invalid emails
        'Abc.example.com',
        'A@b@c@example.com',
        'a"b(c)d,e:f;g<h>i[jk]l@example.com',
        'just"not"right@example.com',
        'this is"notallowed@example.com',
        'this still"not\\allowed@example.com',
        // '.dotfirst@gmail.com',
        // 'John..Doe@example.com',
        // 'admin@mailserver1', // local network domain name with no TLD
        // '123456789012345678901234567890123456789012345678901234567890123456789@example.com', // local > 64 characters
        // BELOW: Valid email formats, NOT accepted by our email regex
        // 'user.name+tag+sorting@example.com',
        // 'disposable.style.email.with+symbol@example.com',
        // 'mailhost!username@example.org', // bangified host route used for uucp mailers
        // 'user%example.com@example.org', // % escaped mail route to user@example.com via example.org
        '"John..Doe"@example.com',
        'john.smith(comment)@example.com', // Equal to 'john.smith@example.com'
        '" "@example.org',
      ],
    },
  },
  boolean: {
    data: {
      valid: [true, false],
      invalid: [null, 'some string', 42],
    },
  },
  uuid: {
    data: {
      valid: [
        'abcdefab-1234-1233-9abc-123456789012',
        'abcdefab-1234-2233-9abc-123456789012',
        'abcdefab-1234-3233-9abc-123456789012',
        'abcdefab-1234-4233-8abc-123456789012',
        'abcdefab-1234-4233-9abc-123456789012',
        'abcdefab-1234-4233-Aabc-123456789012',
        'abcdefab-1234-4233-Babc-123456789012',
        'abcdefab-1234-4233-Eabc-123456789012', // warning: invalid v4 uuid can pass validation
      ],
      invalid: [
        null,
        false,
        true,
        0,
        '',
        'random-string',
        'xbcdefab-1234-4233-9abc-123456789012',
      ],
    },
  },
};

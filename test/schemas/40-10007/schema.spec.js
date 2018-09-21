import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['40-10007'];
let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.properties.application.required;
delete schemaWithoutRequired.properties.application.properties.applicant.required;
delete schemaWithoutRequired.properties.application.properties.claimant.required;
delete schemaWithoutRequired.properties.application.properties.veteran.required;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('preneeds schema', () => {
  sharedTests.runTest('centralMailVaFile', ['application.veteran.vaClaimNumber']);

  schemaTestHelper.testValidAndInvalid('application.applicant.applicantEmail', {
    valid: [
      'foo@foo.com',
      'foo@foo.net',
      'foo+13@foo.com',
      'foo@bar.co.uk',
      'foo.foo@foo.com'
    ],
    invalid: [
      'bad'
    ]
  });

  schemaTestHelper.testValidAndInvalid('application.applicant.applicantPhoneNumber', {
    valid: [
      '415555-2671'
    ],
    invalid: [
      'bad'
    ]
  });

  schemaTestHelper.testValidAndInvalid('application.claimant.ssn', {
    valid: [
      '000-12-3456'
    ],
    invalid: [
      'bad'
    ]
  });

  ['application.applicant.mailingAddress', 'application.claimant.address', 'application.veteran.address'].forEach((property) => {
    schemaTestHelper.testValidAndInvalid(property, {
      valid: [
        {
          street: '123 main',
          city: 'Shelbyville',
          postalCode: '11111',
          state: 'AK',
          country: 'USA'
        }
      ],
      invalid: [
        {
          // city too long
          street: '123 main',
          city: 'a really long city name',
          postalCode: '11111',
          state: 'AK',
          country: 'USA'
        },
        {
          // zip too long
          street: '123 main',
          city: 'Shelbyville',
          postalCode: '11111-8765',
          state: 'AK',
          country: 'USA'
        },
        {
          // missing state
          street: '123 main',
          city: 'Shelbyville',
          postalCode: '11111',
          country: 'USA'
        },
        {
          // missing country
          street: '123 main',
          city: 'Shelbyville',
          postalCode: '11111',
          state: 'AK',
        },
        {
          // missing street
          street2: '123 main',
          city: 'Shelbyville',
          postalCode: '11111',
          state: 'AK',
          country: 'USA'
        },
        {
          // street too long
          street: '123 main out in the country',
          city: 'Shelbyville',
          postalCode: '11111',
          state: 'AK',
          country: 'USA'
        },
        {
          // street2 too long
          street: '123 main',
          street2: 'apt 123456789098765432123',
          city: 'Shelbyville',
          postalCode: '11111',
          state: 'AK',
          country: 'USA'
        },
        {
          // state too long
          street: '123 main',
          city: 'Shelbyville',
          postalCode: '11111',
          state: 'Alaska',
          country: 'USA'
        }
      ]
    });
  });
  
  [
   'application.applicant.name', 'application.claimant.name',
   'application.veteran.currentName', 'application.veteran.serviceName',
  ].forEach((name) => {
    let valid = [
      {
        first: 'jon',
        middle: "bob",
        last: 'doe',
        suffix: 'Jr.'
      }
    ]
    let invalid = [
      {
        // first name too long
        first: 'jonathan seagull',
        last: 'doe',
        middle: 'bob',
        suffix: 'Jr.'
      },
      {
        // last name too long
        first: 'jon',
        middle: "bob",
        last: 'doexxxxxxxxxxxxxxxxxxxxxxxx',
        suffix: 'Jr.'
      },
      {
        // middle name too long
        first: 'jon',
        middle: "bobxxxxxxxxxxxxxxxxxx",
        last: 'doe',
        suffix: 'Jr.'
      },
      {
        // suffix not in enum
        first: 'jon',
        middle: "bob",
        last: 'doe',
        suffix: 'VI'
      }
    ]

    if (['application.veteran.currentName', 'application.claimant.name'].includes(name)) {
      valid[0].maiden = 'smith'
      invalid = invalid.concat(
        [
          {
            // maiden name too long
            first: 'jon',
            middle: "bob",
            last: 'doe',
            suffix: 'Jr.',
            maiden: 'smith-jones-doe-wilson'
          } 
        ]
      )
    }

    schemaTestHelper.testValidAndInvalid(name, {
      valid,
      invalid
    });
  });

  ['application.veteran.dateOfBirth', 'application.veteran.dateOfDeath'].forEach((testDate) => {
    schemaTestHelper.testValidAndInvalid(testDate, {
      valid: [
        '2000-12-12'
      ],
      invalid: [
        '01-01-2000',
        '01/01/2000',
        '2000/01/01'
      ]
    });
  });
  
  schemaTestHelper.testValidAndInvalid('application.veteran.serviceRecords', {
    valid: [
      [{
        serviceBranch: 'AF',
        dischargeType: '1',
        highestRank: 'General',
        nationalGuardState: 'AK'
      }]
    ],
    invalid: [
      [{
        // rank too long
        serviceBranch: 'AF',
        dischargeType: '1',
        highestRank: 'General AAAAAAAAAAAAAAAAAAAAAA',
        nationalGuardState: 'AK'
      }],
      [{
        // nationalGuardState too long
        serviceBranch: 'AF',
        dischargeType: '1',
        highestRank: 'General',
        nationalGuardState: 'Alaska'
      }]
    ]
  });

  schemaTestHelper.testValidAndInvalid('application.veteran.placeOfBirth', {
    valid: ['anywhere, kentuck'],
    invalid: ['Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uakitanatahu, New Zealand']
  });

  schemaTestHelper.testValidAndInvalid('application.preneedAttachments', {
    valid: [
      [{
        attachmentId: '1',
        confirmationCode: 'jkl34jkl34',
        name: 'my_attachment_name.pdf'
      }]
    ],
    invalid: [
      // attachment name too long
      [{
        attachmentId: '1',
        confirmationCode: 'jkl34jkl34',
        name: 'my_attachment_name_that_is_really_really_long_DD214.pdf'
      }]
    ]
  });

});

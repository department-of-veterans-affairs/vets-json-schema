import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep, omit } from 'lodash';
import schema from '../../../src/schemas/22-10275/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, 'required'));

const testData = {
  agreementType: {
    valid: ['newCommitment', 'withdrawal'],
    invalid: ['invalidType', '', null, 'commitment'],
  },
  mainInstitution: {
    valid: [
      {
        facilityCode: '12345678',
        institutionName: 'Sample University',
        institutionAddress: {
          street: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'USA',
        },
      },
      {
        facilityCode: 'ABCD1234',
        institutionName: 'Another College',
        institutionAddress: {
          street: '456 Oak Ave',
          city: 'Boston',
          state: 'MA',
          postalCode: '02108',
          country: 'USA',
        },
      },
      // International: free-text country (ENGLAND)
      {
        facilityCode: 'ZXCV1234',
        institutionName: 'Royal College',
        institutionAddress: {
          street: '10 Downing St',
          city: 'London',
          postalCode: 'SW1A 2AA',
          country: 'ENGLAND',
        },
      },
      // International: misspelled country allowed; postalCode omitted (optional)
      {
        facilityCode: 'EF34GH56',
        institutionName: 'Aotearoa Tech',
        institutionAddress: {
          street: '1 Queen St',
          city: 'Auckland',
          country: 'NEW ZEALEDN',
        },
      },
    ],
    invalid: [
      // Bad facility code (7 chars)
      {
        facilityCode: '1234567',
        institutionName: 'Sample University',
        institutionAddress: {
          street: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'USA',
        },
      },
      // Bad facility code (9 chars)
      {
        facilityCode: '123456789',
        institutionName: 'Sample University',
        institutionAddress: {
          street: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'USA',
        },
      },
      // Missing institutionName
      {
        facilityCode: '12345678',
        institutionName: null,
        institutionAddress: {
          street: '123 Main St',
          city: 'Seattle',
          state: 'WA',
          postalCode: '98101',
          country: 'USA',
        },
      },
      // Missing institutionAddress
      {
        facilityCode: '12345678',
        institutionName: 'Sample University',
        institutionAddress: null,
      },
      // Country is whitespace-only (fails "not just whitespace" pattern)
      {
        facilityCode: 'QQ11WW22',
        institutionName: 'Whitespace U',
        institutionAddress: {
          street: '123 Anywhere',
          city: 'Nowhere',
          postalCode: '00000',
          country: '   ',
        },
      },
    ],
  },
  additionalInstitutions: {
    valid: [
      // Single US item
      [
        {
          facilityCode: '87654321',
          institutionName: 'Branch Campus',
          institutionAddress: {
            street: '789 Pine St',
            city: 'Portland',
            state: 'OR',
            postalCode: '97201',
            country: 'USA',
          },
          pointOfContact: {
            fullName: {
              first: 'Jane',
              last: 'Smith',
            },
            email: 'jane.smith@example.com',
          },
        },
      ],
      // Mixed list: international free-text & US
      [
        {
          facilityCode: 'A1B2C3D4',
          institutionName: 'International Branch',
          institutionAddress: {
            street: '10 University Blvd',
            city: 'Toronto',
            postalCode: 'M5S 1A1',
            country: 'CANADA', // free-text allowed
          },
          pointOfContact: {
            fullName: {
              first: 'John',
              middle: 'Michael',
              last: 'Doe',
            },
            email: 'john.doe@example.ca',
          },
        },
        {
          facilityCode: 'E5F6G7H8',
          institutionName: 'Online Campus',
          institutionAddress: {
            street: '100 Virtual Way',
            city: 'Online',
            state: 'CA',
            postalCode: '90210',
            country: 'USA',
          },
          pointOfContact: {
            fullName: {
              first: 'Alice',
              last: 'Johnson',
            },
            email: 'alice.johnson@online.edu',
          },
        },
      ],
      // International: misspelled country; omit postalCode
      [
        {
          facilityCode: 'PL90MN12',
          institutionName: 'Kiwi Institute',
          institutionAddress: {
            street: '1 Queen St',
            city: 'Auckland',
            country: 'NEW ZEALEDN',
          },
          pointOfContact: {
            fullName: { first: 'Kiri', last: 'Te Kanawa' },
            email: 'kiri@example.nz',
          },
        },
      ],
    ],
    invalid: [
      // Bad facility code pattern
      [
        {
          facilityCode: '1234567',
          institutionName: 'Branch Campus',
          institutionAddress: {
            street: '789 Pine St',
            city: 'Portland',
            state: 'OR',
            postalCode: '97201',
            country: 'USA',
          },
          pointOfContact: {
            fullName: {
              first: 'Jane',
              last: 'Smith',
            },
            email: 'jane.smith@example.com',
          },
        },
      ],
      // Missing pointOfContact
      [
        {
          facilityCode: '87654321',
          institutionName: 'Branch Campus',
          institutionAddress: {
            street: '789 Pine St',
            city: 'Portland',
            state: 'OR',
            postalCode: '97201',
            country: 'USA',
          },
          pointOfContact: null,
        },
      ],
      // Invalid email; whitespace-only country
      [
        {
          facilityCode: '87654321',
          institutionName: 'Branch Campus',
          institutionAddress: {
            street: '789 Pine St',
            city: 'Portland',
            state: 'OR',
            postalCode: '97201',
            country: '   ',
          },
          pointOfContact: {
            fullName: {
              first: 'Jane',
              last: 'Smith',
            },
            email: 'invalid-email', // invalid email format
          },
        },
      ],
    ],
  },
  authorizedOfficial: {
    valid: [
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: 'President',
        usPhone: '5551234567',
        email: 'john.doe@university.edu',
      },
      {
        fullName: {
          first: 'Jane',
          middle: 'Marie',
          last: 'Smith',
        },
        title: 'Vice President',
        usPhone: '5551234567',
        email: 'jane.smith@university.edu',
      },
      {
        fullName: {
          first: 'Robert',
          last: 'Johnson',
        },
        title: 'Dean',
        internationalPhone: '+1-555-123-4567',
        email: 'robert.johnson@university.edu',
      },
    ],
    invalid: [
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: null, // missing required field
        email: 'john.doe@university.edu',
      },
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: 'President',
        email: 'invalid-email', // invalid email format
      },
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: 'President',
        usPhone: '123', // invalid phone format
        email: 'john.doe@university.edu',
      },
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: 'President',
        usPhone: '5551234567',
        internationalPhone: '+1-555-123-4567', // both phone types (maxProperties: 4)
        email: 'john.doe@university.edu',
      },
    ],
  },
  newCommitment: {
    valid: [
      {
        principlesOfExcellencePointOfContact: {
          fullName: {
            first: 'Sarah',
            last: 'Wilson',
          },
          title: 'Director of Student Affairs',
          usPhone: '5551234567',
          email: 'sarah.wilson@university.edu',
        },
        schoolCertifyingOfficial: {
          fullName: {
            first: 'Michael',
            middle: 'James',
            last: 'Brown',
          },
          title: 'Registrar',
          usPhone: '5559876543',
          email: 'michael.brown@university.edu',
        },
      },
      {
        principlesOfExcellencePointOfContact: {
          fullName: {
            first: 'Lisa',
            last: 'Davis',
          },
          title: 'Veteran Services Coordinator',
          internationalPhone: '+1-555-987-6543',
          email: 'lisa.davis@university.edu',
        },
        schoolCertifyingOfficial: {
          fullName: {
            first: 'David',
            last: 'Miller',
          },
          title: 'Assistant Registrar',
          usPhone: '5551234567',
          email: 'david.miller@university.edu',
        },
      },
    ],
    invalid: [
      {
        principlesOfExcellencePointOfContact: {
          fullName: {
            first: 'Sarah',
            last: 'Wilson',
          },
          title: null,
          email: 'sarah.wilson@university.edu',
        },
        schoolCertifyingOfficial: {
          fullName: {
            first: 'Michael',
            last: 'Brown',
          },
          title: 'Registrar',
          email: 'michael.brown@university.edu',
        },
      },
      {
        principlesOfExcellencePointOfContact: {
          fullName: {
            first: 'Sarah',
            last: 'Wilson',
          },
          title: 'Director of Student Affairs',
          email: 'invalid-email',
        },
        schoolCertifyingOfficial: {
          fullName: {
            first: 'Michael',
            last: 'Brown',
          },
          title: 'Registrar',
          email: 'michael.brown@university.edu',
        },
      },
    ],
  },
  privacyAgreementAccepted: {
    valid: [true],
    invalid: [false, null, 'true', 1],
  },
  statementOfTruthSignature: {
    valid: ['John Q. Doe', 'Jane Marie Smith', 'Robert Johnson'],
    invalid: ['', null, 123],
  },
  dateSigned: {
    valid: ['2024-01-15', '2024-12-31', '2025-06-01'],
    invalid: ['2024-13-01', '2024-00-01', '2024-01-32', '01/15/2024', null],
  },
};

describe('22-10275 Schema', () => {
  it('should have required fields', () => {
    expect(schema.required).to.deep.equal([
      'agreementType',
      'authorizedOfficial',
      'mainInstitution',
      'statementOfTruthSignature',
      'dateSigned',
    ]);
    expect(schema.properties.mainInstitution.required).to.deep.equal([
      'facilityCode',
      'institutionName',
      'institutionAddress',
    ]);
    expect(schema.properties.additionalInstitutions.items.required).to.deep.equal([
      'facilityCode',
      'institutionName',
      'institutionAddress',
      'pointOfContact',
    ]);
    expect(schema.properties.authorizedOfficial.required).to.deep.equal(['fullName', 'title', 'email']);
    expect(schema.properties.newCommitment.required).to.deep.equal([
      'principlesOfExcellencePointOfContact',
      'schoolCertifyingOfficial',
    ]);
  });

  schemaTestHelper.testValidAndInvalid('agreementType', testData.agreementType);
  schemaTestHelper.testValidAndInvalid('mainInstitution', testData.mainInstitution);
  schemaTestHelper.testValidAndInvalid('additionalInstitutions', testData.additionalInstitutions);
  schemaTestHelper.testValidAndInvalid('authorizedOfficial', testData.authorizedOfficial);
  schemaTestHelper.testValidAndInvalid('newCommitment', testData.newCommitment);
  schemaTestHelper.testValidAndInvalid('privacyAgreementAccepted', testData.privacyAgreementAccepted);
  schemaTestHelper.testValidAndInvalid('statementOfTruthSignature', testData.statementOfTruthSignature);
  schemaTestHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});

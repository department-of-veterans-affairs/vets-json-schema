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
    ],
    invalid: [
      {
        facilityCode: '1234567', // too short
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
        facilityCode: '123456789', // too long
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
      {
        facilityCode: '12345678',
        institutionName: 'Sample University',
        institutionAddress: null,
      },
    ],
  },
  additionalInstitutions: {
    valid: [
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
      [
        {
          facilityCode: 'A1B2C3D4',
          institutionName: 'International Branch',
          institutionAddress: {
            street: '10 University Blvd',
            city: 'Toronto',
            state: 'ON',
            postalCode: 'M5S 1A1',
            country: 'CAN',
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
    ],
    invalid: [
      [
        {
          facilityCode: '1234567', // too short
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
          pointOfContact: null, // missing required field
        },
      ],
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
          title: null, // missing required field
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
          email: 'invalid-email', // invalid email format
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

  // Test individual field validations
  schemaTestHelper.testValidAndInvalid('agreementType', testData.agreementType);
  schemaTestHelper.testValidAndInvalid('mainInstitution', testData.mainInstitution);
  schemaTestHelper.testValidAndInvalid('additionalInstitutions', testData.additionalInstitutions);
  schemaTestHelper.testValidAndInvalid('authorizedOfficial', testData.authorizedOfficial);
  schemaTestHelper.testValidAndInvalid('newCommitment', testData.newCommitment);
  schemaTestHelper.testValidAndInvalid('privacyAgreementAccepted', testData.privacyAgreementAccepted);
  schemaTestHelper.testValidAndInvalid('statementOfTruthSignature', testData.statementOfTruthSignature);
  schemaTestHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});

// Cross-field business rule tests
describe('22-10275 Schema (cross-field business rules)', () => {
  const baseValidData = {
    agreementType: 'newCommitment',
    authorizedOfficial: {
      fullName: {
        first: 'John',
        last: 'Doe',
      },
      title: 'President',
      usPhone: '5551234567',
      email: 'john.doe@university.edu',
    },
    mainInstitution: {
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
    statementOfTruthSignature: 'John Q. Doe',
    dateSigned: '2024-01-15',
  };

  it('should allow withdrawal without newCommitment section', () => {
    const withdrawalPayload = {
      ...baseValidData,
      agreementType: 'withdrawal',
    };

    expect(schemaTestHelper.validateSchema(withdrawalPayload)).to.equal(true);
  });

  it('should reject newCommitment with withdrawal agreement type', () => {
    const invalidPayload = {
      ...baseValidData,
      agreementType: 'withdrawal',
      newCommitment: {
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
            last: 'Brown',
          },
          title: 'Registrar',
          usPhone: '5559876543',
          email: 'michael.brown@university.edu',
        },
      },
    };

    expect(schemaTestHelper.validateSchema(invalidPayload)).to.equal(false);
  });

  it('should require either usPhone or internationalPhone for authorized official', () => {
    const validWithUsPhone = {
      ...baseValidData,
      authorizedOfficial: {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: 'President',
        usPhone: '5551234567',
        email: 'john.doe@university.edu',
      },
    };

    const validWithInternationalPhone = {
      ...baseValidData,
      authorizedOfficial: {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: 'President',
        internationalPhone: '+1-555-123-4567',
        email: 'john.doe@university.edu',
      },
    };

    const invalidWithBothPhones = {
      ...baseValidData,
      authorizedOfficial: {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        title: 'President',
        usPhone: '5551234567',
        internationalPhone: '+1-555-123-4567',
        email: 'john.doe@university.edu',
      },
    };

    expect(schemaTestHelper.validateSchema(validWithUsPhone)).to.equal(true);
    expect(schemaTestHelper.validateSchema(validWithInternationalPhone)).to.equal(true);
    expect(schemaTestHelper.validateSchema(invalidWithBothPhones)).to.equal(false);
  });
});

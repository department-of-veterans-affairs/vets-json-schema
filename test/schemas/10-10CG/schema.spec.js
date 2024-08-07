import { expect } from 'chai';
import { cloneDeep } from 'lodash';
import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schema from '../../../src/schemas/10-10CG/schema';

const testData = {
  gender: {
    valid: ['M', 'F'],
    invalid: ['A', 'BB', 'CCC', 'U', null],
  },
  plannedClinic: {
    valid: ['636', '636A6', '740', '603'],
    invalid: [[], {}, 358, true],
  },
  vetRelationship: {
    valid: [
      'Spouse',
      'Father',
      'Mother',
      'Son',
      'Daughter',
      'Brother',
      'Sister',
      'Significant Other',
      'Relative - Other',
      'Friend/Neighbor',
      'Grandchild',
    ],
    invalid: ['foo', 'bar'],
  },
  boolean: {
    valid: [true, false],
    invalid: [null, 'some string', 42],
  },
  string: max => {
    const breakingTestString = 'A'.repeat(max + 1);

    return {
      valid: ['foo', 'bar'],
      invalid: [null, 42, true, false, breakingTestString],
    };
  },
  signature: {
    valid: [
      'Kevin Mircovich',
      'Some really long signature that has many names and characters'
    ],
    invalid: [
      null, 42, true, false, 'A'.repeat(150 + 1)
    ],
  },
  certifications: {
    veteran: {
      valid: [
        undefined,
        ['information-is-correct-and-true', 'consent-to-caregivers-to-perform-care'],
      ],
      invalid: [
        null,
        '',
        12,
        {}, // wrong type
        [], // empty / too few items
        ['information-is-correct-and-true'], // only one item
        ['consent-to-caregivers-to-perform-care'], // only one item
        ['information-is-correct-and-true', 'consent-to-caregivers-to-perform-care', 'at-least-18-years-of-age'], // too many items
        ['information-is-correct-and-true', 'at-least-18-years-of-age'], // one invalid item
        ['have-understanding-of-non-employment-relationship', 'at-least-18-years-of-age'], // two invalid items
        ['at-least-18-years-of-age', 'at-least-18-years-of-age'], // contains duplicate
      ],
    },
    primaryCaregiver: {
      valid: [
        undefined,
        [
          // Family Member of Veteran
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'member-of-veterans-family',
          'agree-to-perform-services--as-primary',
          'understand-revocable-status--as-primary',
          'have-understanding-of-non-employment-relationship',
        ],
        [
          // Non-Family Member of Veteran
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-primary',
          'agree-to-perform-services--as-primary',
          'understand-revocable-status--as-primary',
          'have-understanding-of-non-employment-relationship',
        ],
      ],
      invalid: [
        null,
        '',
        12,
        {}, // wrong type
        [], // empty / too few items
        [
          // Too few items
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'member-of-veterans-family',
          'agree-to-perform-services--as-primary',
          'understand-revocable-status--as-primary',
        ],
        [
          // Too many items
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-primary',
          'agree-to-perform-services--as-primary',
          'understand-revocable-status--as-primary',
          'have-understanding-of-non-employment-relationship',
          'consent-to-caregivers-to-perform-care',
        ],
        [
          // Contains Duplicate
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-primary',
          'agree-to-perform-services--as-primary',
          'understand-revocable-status--as-primary',
          'have-understanding-of-non-employment-relationship',
          'information-is-correct-and-true',
        ],
        [
          // Contains secondary caregiver specific assertions (family-member example)
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'member-of-veterans-family',
          'agree-to-perform-services--as-secondary',
          'understand-revocable-status--as-secondary',
        ],
        [
          // Contains secondary caregiver specific assertions (non-family-member example)
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-secondary',
          'agree-to-perform-services--as-secondary',
          'understand-revocable-status--as-secondary',
          'have-understanding-of-non-employment-relationship',
        ]
      ],
    },
    secondaryCaregiver: {
      valid: [
        undefined,
        [
          // Family Member of Veteran
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'member-of-veterans-family',
          'agree-to-perform-services--as-secondary',
          'understand-revocable-status--as-secondary',
          'have-understanding-of-non-employment-relationship',
        ],
        [
          // Non-Family Member of Veteran
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-secondary',
          'agree-to-perform-services--as-secondary',
          'understand-revocable-status--as-secondary',
          'have-understanding-of-non-employment-relationship',
        ],
      ],
      invalid: [
        null,
        '',
        12,
        {}, // wrong type
        [], // empty / too few items
        [
          // Too few items
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'member-of-veterans-family',
          'agree-to-perform-services--as-secondary',
          'understand-revocable-status--as-secondary',
        ],
        [
          // Too many items
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-secondary',
          'agree-to-perform-services--as-secondary',
          'understand-revocable-status--as-secondary',
          'have-understanding-of-non-employment-relationship',
          'consent-to-caregivers-to-perform-care',
        ],
        [
          // Contains Duplicate
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-secondary',
          'agree-to-perform-services--as-secondary',
          'understand-revocable-status--as-secondary',
          'have-understanding-of-non-employment-relationship',
          'information-is-correct-and-true',
        ],
        [
          // Contains primary caregiver specific assertions (family-member example)
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'member-of-veterans-family',
          'agree-to-perform-services--as-primary',
          'understand-revocable-status--as-primary',
        ],
        [
          // Contains primary caregiver specific assertions (non-family-member example)
          'information-is-correct-and-true',
          'at-least-18-years-of-age',
          'not-member-of-veterans-family',
          'currently-or-will-reside-with-veteran--as-primary',
          'agree-to-perform-services--as-primary',
          'understand-revocable-status--as-primary',
          'have-understanding-of-non-employment-relationship',
        ]
      ],
    },
  },
};

describe('10-10CG json schema', () => {
  it('should have the right required fields for each section', () => {
    expect(schema.required).to.deep.equal(['veteran']);
    expect(schema.anyOf).to.include({ required: ['primaryCaregiver']});
    expect(schema.anyOf).to.include({ required: ['secondaryCaregiverOne']});

    expect(schema.properties.veteran.required).to.deep.equal([
      'fullName',
      'ssnOrTin',
      'dateOfBirth',
      'address',
      'primaryPhoneNumber',
      'plannedClinic',
    ]);

    expect(schema.properties.primaryCaregiver.required).to.deep.equal([
      'fullName',
      'dateOfBirth',
      'address',
      'primaryPhoneNumber',
      'vetRelationship',
    ]);

    expect(schema.properties.secondaryCaregiverOne.required).to.deep.equal([
      'fullName',
      'dateOfBirth',
      'address',
      'primaryPhoneNumber',
      'vetRelationship',
    ]);

    expect(schema.properties.secondaryCaregiverTwo.required).to.deep.equal([
      'fullName',
      'dateOfBirth',
      'address',
      'primaryPhoneNumber',
      'vetRelationship',
    ]);
  });

  it('should not accept additional properties', () => {
    expect(schema.additionalProperties).to.equal(false);
    expect(schema.properties.veteran.additionalProperties).to.equal(false);
    expect(schema.properties.primaryCaregiver.additionalProperties).to.equal(false);
    expect(schema.properties.secondaryCaregiverOne.additionalProperties).to.equal(false);
    expect(schema.properties.secondaryCaregiverTwo.additionalProperties).to.equal(false);
  });

  describe('accepted properties', () => {
    const unrestrictedSchema = cloneDeep(schema);

    // Removed these restrictions so the attrs can be checked
    delete unrestrictedSchema.required;
    delete unrestrictedSchema.anyOf;
    delete unrestrictedSchema.properties.veteran.required;
    delete unrestrictedSchema.properties.primaryCaregiver.required;
    delete unrestrictedSchema.properties.secondaryCaregiverOne.required;
    delete unrestrictedSchema.properties.secondaryCaregiverTwo.required;

    const schemaTestHelper = new SchemaTestHelper(unrestrictedSchema);
    const sharedTests = new SharedTests(schemaTestHelper);

    // Veteran Info
    sharedTests.runTest('fullName', ['veteran.fullName']);
    sharedTests.runTest('ssn', ['veteran.ssnOrTin']);
    sharedTests.runTest('date', ['veteran.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('veteran.gender', testData.gender);
    schemaTestHelper.testValidAndInvalid('veteran.plannedClinic', testData.plannedClinic);
    sharedTests.runTest('usAddress', ['veteran.address']);
    sharedTests.runTest('phone', ['veteran.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['veteran.alternativePhoneNumber']);
    sharedTests.runTest('email', ['veteran.email']);
    schemaTestHelper.testValidAndInvalid('veteran.signature', testData.signature);
    schemaTestHelper.testValidAndInvalid('veteran.certifications', testData.certifications.veteran);
    // Primary Caregiver Info
    sharedTests.runTest('fullName', ['primaryCaregiver.fullName']);
    sharedTests.runTest('ssn', ['primaryCaregiver.ssnOrTin']);
    sharedTests.runTest('date', ['primaryCaregiver.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.gender', testData.gender);
    sharedTests.runTest('usAddress', ['primaryCaregiver.address']);
    sharedTests.runTest('phone', ['primaryCaregiver.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['primaryCaregiver.alternativePhoneNumber']);
    sharedTests.runTest('email', ['primaryCaregiver.email']);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.signature', testData.signature);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.certifications', testData.certifications.primaryCaregiver);
    // Secondary One Caregiver Info
    sharedTests.runTest('fullName', ['secondaryCaregiverOne.fullName']);
    sharedTests.runTest('ssn', ['secondaryCaregiverOne.ssnOrTin']);
    sharedTests.runTest('date', ['secondaryCaregiverOne.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverOne.gender', testData.gender);
    sharedTests.runTest('usAddress', ['secondaryCaregiverOne.address']);
    sharedTests.runTest('phone', ['secondaryCaregiverOne.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryCaregiverOne.alternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryCaregiverOne.email']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverOne.vetRelationship', testData.vetRelationship);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverOne.signature', testData.signature);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverOne.certifications', testData.certifications.secondaryCaregiver);
    // Secondary Two Caregiver Info
    sharedTests.runTest('fullName', ['secondaryCaregiverTwo.fullName']);
    sharedTests.runTest('ssn', ['secondaryCaregiverTwo.ssnOrTin']);
    sharedTests.runTest('date', ['secondaryCaregiverTwo.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverTwo.gender', testData.gender);
    sharedTests.runTest('usAddress', ['secondaryCaregiverTwo.address']);
    sharedTests.runTest('phone', ['secondaryCaregiverTwo.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryCaregiverTwo.alternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryCaregiverTwo.email']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverTwo.vetRelationship', testData.vetRelationship);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverTwo.signature', testData.signature);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverTwo.certifications', testData.certifications.secondaryCaregiver);
    sharedTests.runTest('uuid', ['poaAttachmentId']);
  });

  describe('conditional validation:', () => {
    const validDataExample = {
      veteran: {
        fullName: { first: 'John', last: 'Doe', suffix: 'Jr.' },
        ssnOrTin: '789787893',
        dateOfBirth: '1978-01-15',
        gender: 'M',
        address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771', county: 'Washington' },
        primaryPhoneNumber: '8887775544',
        alternativePhoneNumber: '8887775544',
        email: 'veteranEmail@email.com',
        plannedClinic: '636',
      },
      primaryCaregiver: {
        fullName: { first: 'Joan', last: 'Doe', suffix: 'Sr.' },
        dateOfBirth: '1978-07-03',
        gender: 'F',
        address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771', county: 'Washington' },
        primaryPhoneNumber: '8887775544',
        alternativePhoneNumber: '8887775544',
        email: 'primaryCaregiverEmail@email.com',
        vetRelationship: 'Spouse',
      },
      secondaryCaregiverOne: {
        fullName: { first: 'Jane', last: 'Smith', suffix: 'II' },
        dateOfBirth: '1980-01-01',
        gender: 'F',
        address: { street: '123 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771', county: 'Washington' },
        primaryPhoneNumber: '1234567890',
        alternativePhoneNumber: '8887775544',
        vetRelationship: 'Friend/Neighbor',
      },
      secondaryCaregiverTwo: {
        fullName: { first: 'Michael', last: 'Smith', suffix: 'III' },
        dateOfBirth: '1980-01-01',
        gender: 'M',
        address: { street: '123 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771', county: 'Washington' },
        primaryPhoneNumber: '1234567890',
        alternativePhoneNumber: '8887775544',
        vetRelationship: 'Friend/Neighbor',
      },
    };

    it('is invalid with only a "veteran"', () => {
      SchemaTestHelper.expect(schema, { veteran: validDataExample.veteran }, false);
    });

    describe('with application for primaryCaregiver', () => {
      it('requires additional fields if "secondaryCaregiverOne" is present', () => {
        const data = {
          veteran: validDataExample.veteran,
          primaryCaregiver: validDataExample.primaryCaregiver,
        };

        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverOne: {} }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverOne: { ssnOrTin: '123456789' } }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverOne: { vetRelationship: 'Friend/Neighbor', dateOfBirth: '1990-01-01' } }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverOne: validDataExample.secondaryCaregiverOne }, true);
      });

      it('requires additional fields if "secondaryCaregiverTwo" is present', () => {
        const data = {
          veteran: validDataExample.veteran,
          primaryCaregiver: validDataExample.primaryCaregiver,
          secondaryCaregiverOne: validDataExample.secondaryCaregiverOne,
        };

        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: {} }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: { ssnOrTin: '123456789' } }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: { vetRelationship: 'Friend/Neighbor', dateOfBirth: '1990-01-01' } }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: validDataExample.secondaryCaregiverTwo }, true);
      });
    });

    describe('with application for secondaryCaregiverOne', () => {
      it('requires additional fields if "primaryCaregiver" is present', () => {
        const data = {
          veteran: validDataExample.veteran,
          secondaryCaregiverOne: validDataExample.secondaryCaregiverOne,
        };

        SchemaTestHelper.expect(schema, { ...data, primaryCaregiver: {} }, false);
        SchemaTestHelper.expect(schema, { ...data, primaryCaregiver: { ssnOrTin: '123456789' } }, false);
        SchemaTestHelper.expect(schema, { ...data, primaryCaregiver: { vetRelationship: 'Friend/Neighbor', dateOfBirth: '1990-01-01' } }, false);
        SchemaTestHelper.expect(schema, { ...data, primaryCaregiver: validDataExample.primaryCaregiver }, true);
      });

      it('requires additional fields if "secondaryCaregiverTwo" is present', () => {
        const data = {
          veteran: validDataExample.veteran,
          secondaryCaregiverOne: validDataExample.secondaryCaregiverOne,
        };

        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: {} }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: { ssnOrTin: '123456789' } }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: { vetRelationship: 'Friend/Neighbor', dateOfBirth: '1990-01-01' } }, false);
        SchemaTestHelper.expect(schema, { ...data, secondaryCaregiverTwo: validDataExample.secondaryCaregiverTwo }, true);
      });
    });

    const successfulTestCases = [
      'veteran primaryCaregiver',
      'veteran primaryCaregiver secondaryCaregiverOne',
      'veteran primaryCaregiver secondaryCaregiverOne secondaryCaregiverTwo',
      'veteran secondaryCaregiverOne',
      'veteran secondaryCaregiverOne secondaryCaregiverTwo',
    ].forEach((testCase) => {
      const formSubjects = testCase.split(' ');

      it(`is valid with: ${testCase}`, () => {
        const data = formSubjects.reduce((acc, formSubject) => {
          acc[formSubject] = validDataExample[formSubject];
          return acc;
        }, {});

        SchemaTestHelper.expect(schema, data, true);        
      });
    });
  });
});

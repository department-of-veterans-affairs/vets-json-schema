import { expect } from 'chai';
import { cloneDeep } from 'lodash';
import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schema from '../../../src/schemas/10-10CG/schema';

const testData = {
  gender: {
    valid: ['M', 'F', 'U'],
    invalid: ['A', 'BB', 'CCC'],
  },
  plannedClinic: {
    valid: ['636', '636A6', '740', '603'],
    invalid: ['405HK', '436GA', '501GJ', '358', '123RE'],
  },
  lastTreatmentFacility: {
    valid: [
      { name: 'My Hospital', type: 'hospital' },
      { name: 'My Clinic', type: 'clinic' },
      { name: 'random stringsssss', type: 'clinic' },
      { name: 'random stringsssss', type: 'clinic' },
    ],
    invalid: [
      {},
      { name: 'Some Hospital Name' },
      { name: 'Some Clinic Name', type: 'non-enum' },
      { name: 'Some Hospital Name', type: 'hospital', extraProp: 'not allowed' },
      {
        // Hit max char count
        name: 'A'.repeat(101),
        type: 'clinic',
      },
      {
        // Hit min char count
        name: '',
        type: 'clinic'
      }
    ],
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
    invalid: [
      'foo',
      'bar',
    ],
  },
  boolean: {
    valid: [true, false],
    invalid: [null, 'some string', 42],
  },
  string: (max) => {
    const breakingTestString = 'A'.repeat(max + 1);

    return {
      valid: ['foo', 'bar'],
      invalid: [null, 42, true, false, breakingTestString],
    };
  },
};

describe('10-10CG json schema', () => {
  it('should have the right required fields for each section', () => {
    expect(schema.required).to.deep.equal([
      'veteran',
      'primaryCaregiver'
    ]);

    expect(schema.properties.veteran.required).to.deep.equal([
      'fullName',
      'ssnOrTin',
      'dateOfBirth',
      'gender',
      'address',
      'plannedClinic'
    ]);

    expect(schema.properties.veteran.properties.lastTreatmentFacility.required).to.deep.equal([
      'name',
      'type'
    ]);

    expect(schema.properties.primaryCaregiver.required).to.deep.equal([
      'fullName',
      'ssnOrTin',
      'dateOfBirth',
      'gender',
      'address',
      'vetRelationship',
      'medicaidEnrolled',
      'medicareEnrolled',
      "tricareEnrolled",
      "champvaEnrolled",
    ]);

    expect(schema.properties.secondaryCaregiverOne.required).to.deep.equal([
      'fullName',
      'ssnOrTin',
      'dateOfBirth',
      'gender',
      'address',
      'vetRelationship'
    ]);

    expect(schema.properties.secondaryCaregiverTwo.required).to.deep.equal([
      'fullName',
      'ssnOrTin',
      'dateOfBirth',
      'gender',
      'address',
      'vetRelationship'
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
    delete unrestrictedSchema.properties.veteran.required;
    delete unrestrictedSchema.properties.primaryCaregiver.required;
    delete unrestrictedSchema.properties.secondaryCaregiverOne.required;
    delete unrestrictedSchema.properties.secondaryCaregiverTwo.required;

    const schemaTestHelper = new SchemaTestHelper(unrestrictedSchema);
    const sharedTests = new SharedTests(schemaTestHelper);

    // Veteran Info
    sharedTests.runTest('fullNameNoSuffix', ['veteran.fullName'])
    sharedTests.runTest('ssn', ['veteran.ssnOrTin']);
    sharedTests.runTest('date', ['veteran.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('veteran.gender', testData.gender);
    schemaTestHelper.testValidAndInvalid('veteran.plannedClinic', testData.plannedClinic);
    schemaTestHelper.testValidAndInvalid('veteran.lastTreatmentFacility', testData.lastTreatmentFacility);
    sharedTests.runTest('usAddress', ['veteran.address']);
    sharedTests.runTest('phone', ['veteran.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['veteran.alternativePhoneNumber']);
    sharedTests.runTest('email', ['veteran.email']);
    // Primary Caregiver Info
    sharedTests.runTest('fullNameNoSuffix', ['primaryCaregiver.fullName']);
    sharedTests.runTest('ssn', ['primaryCaregiver.ssnOrTin']);
    sharedTests.runTest('date', ['primaryCaregiver.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.gender', testData.gender);
    sharedTests.runTest('usAddress', ['primaryCaregiver.address']);
    sharedTests.runTest('phone', ['primaryCaregiver.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['primaryCaregiver.alternativePhoneNumber']);
    sharedTests.runTest('email', ['primaryCaregiver.email']);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.vetRelationship', testData.vetRelationship);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.medicaidEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.medicareEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.tricareEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.champvaEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.otherHealthInsuranceName', testData.string(100));
    // Secondary One Caregiver Info
    sharedTests.runTest('fullNameNoSuffix', ['secondaryCaregiverOne.fullName']);
    sharedTests.runTest('ssn', ['secondaryCaregiverOne.ssnOrTin']);
    sharedTests.runTest('date', ['secondaryCaregiverOne.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverOne.gender', testData.gender);
    sharedTests.runTest('usAddress', ['secondaryCaregiverOne.address']);
    sharedTests.runTest('phone', ['secondaryCaregiverOne.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryCaregiverOne.alternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryCaregiverOne.email']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverOne.vetRelationship', testData.vetRelationship);
    // Secondary Two Caregiver Info
    sharedTests.runTest('fullNameNoSuffix', ['secondaryCaregiverTwo.fullName']);
    sharedTests.runTest('ssn', ['secondaryCaregiverTwo.ssnOrTin']);
    sharedTests.runTest('date', ['secondaryCaregiverTwo.dateOfBirth']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverTwo.gender', testData.gender);
    sharedTests.runTest('usAddress', ['secondaryCaregiverTwo.address']);
    sharedTests.runTest('phone', ['secondaryCaregiverTwo.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryCaregiverTwo.alternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryCaregiverTwo.email']);
    schemaTestHelper.testValidAndInvalid('secondaryCaregiverTwo.vetRelationship', testData.vetRelationship);

    it('"plannedClinic" should use the "caregiverProgramFacilities" enum list', () => {
      expect(!!schema.properties.veteran.properties.plannedClinic.enum).to.be.true;
      expect(schema.properties.veteran.properties.plannedClinic.enum.length > 100).to.be.true;
      expect(schema.properties.veteran.properties.plannedClinic.enum.length < 200).to.be.true;
    });
  });

  describe('conditional validation:', () => {
    let schemaTestHelper;
    let validSecondaryCaregiverOneData;
    let validSecondaryCaregiverTwoData;

    before(() => {
      schemaTestHelper = new SchemaTestHelper(schema, {
        veteran: {
          fullName: { first: 'John', last: 'Doe' },
          ssnOrTin: '789787893',
          dateOfBirth: '1978-01-15',
          gender: 'M',
          address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
          primaryPhoneNumber: '8887775544',
          alternativePhoneNumber: '8887775544',
          email: 'veteranEmail@email.com',
          plannedClinic: '636',
          lastTreatmentFacility: { name: 'My Hospital', type: 'hospital' },
        },
        primaryCaregiver: {
          fullName: { first: 'Joan', last: 'Doe' },
          ssnOrTin: '202901412',
          dateOfBirth: '1978-07-03',
          gender: 'F',
          address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
          primaryPhoneNumber: '8887775544',
          alternativePhoneNumber: '8887775544',
          email: 'primaryCaregiverEmail@email.com',
          vetRelationship: 'Spouse',
          medicaidEnrolled: false,
          medicareEnrolled: false,
          champvaEnrolled: false,
          tricareEnrolled: true,
        }
      });

      validSecondaryCaregiverOneData = {
        fullName: { first: 'Jane', last: 'Smith' },
        ssnOrTin: '389484893',
        dateOfBirth: '1980-01-01',
        gender: 'F',
        address: { street: '123 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
        vetRelationship: 'Friend/Neighbor',
      }

      validSecondaryCaregiverTwoData = {
        fullName: { first: 'Michael', last: 'Smith' },
        ssnOrTin: '558853340',
        dateOfBirth: '1980-01-01',
        gender: 'M',
        address: { street: '123 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
        vetRelationship: 'Friend/Neighbor',
      }
    });

    it('is valid with only "veteran" and "primaryCaregiver"', () => {
      schemaTestHelper.schemaExpect(true);
    });

    it('requires additional fields if "secondaryCaregiverOne" is present', () => {
      schemaTestHelper.schemaExpect(false, { secondaryCaregiverOne: {} });
      schemaTestHelper.schemaExpect(false, { secondaryCaregiverOne: { ssnOrTin: '123456789' } });
      schemaTestHelper.schemaExpect(false, { secondaryCaregiverOne: {  ssnOrTin: '123456789', dateOfBirth: '1990-01-01' } });
      schemaTestHelper.schemaExpect(true, { secondaryCaregiverOne: validSecondaryCaregiverOneData });
    });

    it('requires additional fields if "secondaryCaregiverTwo" is present', () => {
      schemaTestHelper.defaults = {
        ...schemaTestHelper.defaults,
        secondaryCaregiverOne: validSecondaryCaregiverOneData,
      }

      schemaTestHelper.schemaExpect(false, { secondaryCaregiverTwo: {} });
      schemaTestHelper.schemaExpect(false, { secondaryCaregiverTwo: { ssnOrTin: '123456789' } });
      schemaTestHelper.schemaExpect(false, { secondaryCaregiverTwo: { ssnOrTin: '123456789', dateOfBirth: '1990-01-01' } });
      schemaTestHelper.schemaExpect(true, { secondaryCaregiverTwo: validSecondaryCaregiverTwoData });
    });
  });
});
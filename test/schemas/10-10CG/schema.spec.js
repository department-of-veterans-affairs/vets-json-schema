import { expect } from 'chai';
import { cloneDeep } from 'lodash';
import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schema from '../../../src/schemas/10-10CG/schema';

const testData = {
  veteranFacilityType: {
    valid: ['hospital', 'clinic'],
    invalid: [null, 'some string', 42, true, false],
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
      'Significant - Other',
      'Relative - Other',
      'Friend/Neighbor',
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
  string: {
    valid: ['foo', 'bar'],
    invalid: [null, 42, true, false],
  },
};

describe('10-10CG json schema', () => {
  describe('accepted properties', () => {
    const unrestrictedSchema = cloneDeep(schema);

    // Removed these restrictions so the attrs can be checked
    delete unrestrictedSchema.required;
    delete unrestrictedSchema.properties.veteran.required;
    delete unrestrictedSchema.properties.primaryCaregiver.required;
    delete unrestrictedSchema.properties.secondaryOneCaregiver.required;
    delete unrestrictedSchema.properties.secondaryTwoCaregiver.required;

    const schemaTestHelper = new SchemaTestHelper(unrestrictedSchema);
    const sharedTests = new SharedTests(schemaTestHelper);

    // Veteran Info
    sharedTests.runTest('fullName', ['veteran.fullName'])
    sharedTests.runTest('ssn', ['veteran.ssnOrTin']);
    sharedTests.runTest('date', ['veteran.dateOfBirth']);
    sharedTests.runTest('gender', ['veteran.gender']);
    schemaTestHelper.testValidAndInvalid('veteran.vaEnrolled', testData.boolean);
    // TODO: [veteranPlannedClinic] there is a va-medical-facilities enum/type in /common we can use
    schemaTestHelper.testValidAndInvalid('veteran.plannedClinic', testData.string);
    schemaTestHelper.testValidAndInvalid('veteran.facilityType', testData.veteranFacilityType);
    // TODO: [veteranPreviousTreatmentFacility] there is a va-medical-facilities enum/type in /common we can use
    schemaTestHelper.testValidAndInvalid('veteran.previousTreatmentFacility', testData.string);
    sharedTests.runTest('address', ['veteran.address']);
    sharedTests.runTest('phone', ['veteran.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['veteran.alternativePhoneNumber']);
    sharedTests.runTest('email', ['veteran.email']);
    // Primary Caregiver Info
    sharedTests.runTest('fullName', ['primaryCaregiver.fullName']);
    sharedTests.runTest('ssn', ['primaryCaregiver.ssnOrTin']);
    sharedTests.runTest('date', ['primaryCaregiver.dateOfBirth']);
    sharedTests.runTest('gender', ['primaryCaregiver.gender']);
    sharedTests.runTest('address', ['primaryCaregiver.address']);
    sharedTests.runTest('phone', ['primaryCaregiver.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['primaryCaregiver.alternativePhoneNumber']);
    sharedTests.runTest('email', ['primaryCaregiver.email']);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.vetRelationship', testData.vetRelationship);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.medicaidEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.medicareEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.tricareEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.champvaEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.otherHealthInsurance', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiver.otherHealthInsuranceName', testData.string);
    // Secondary One Caregiver Info
    sharedTests.runTest('fullName', ['secondaryOneCaregiver.fullName']);
    sharedTests.runTest('ssn', ['secondaryOneCaregiver.ssnOrTin']);
    sharedTests.runTest('date', ['secondaryOneCaregiver.dateOfBirth']);
    sharedTests.runTest('gender', ['secondaryOneCaregiver.gender']);
    sharedTests.runTest('address', ['secondaryOneCaregiver.address']);
    sharedTests.runTest('phone', ['secondaryOneCaregiver.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryOneCaregiver.alternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryOneCaregiver.email']);
    schemaTestHelper.testValidAndInvalid('secondaryOneCaregiver.vetRelationship', testData.vetRelationship);
    // Secondary Two Caregiver Info
    sharedTests.runTest('fullName', ['secondaryTwoCaregiver.fullName']);
    sharedTests.runTest('ssn', ['secondaryTwoCaregiver.ssnOrTin']);
    sharedTests.runTest('date', ['secondaryTwoCaregiver.dateOfBirth']);
    sharedTests.runTest('gender', ['secondaryTwoCaregiver.gender']);
    sharedTests.runTest('address', ['secondaryTwoCaregiver.address']);
    sharedTests.runTest('phone', ['secondaryTwoCaregiver.primaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryTwoCaregiver.alternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryTwoCaregiver.email']);
    schemaTestHelper.testValidAndInvalid('secondaryTwoCaregiver.vetRelationship', testData.vetRelationship);
  });

  it('should have the right required fields for each section', () => {
    expect(schema.required).to.deep.equal(['veteran', 'primaryCaregiver']);
    expect(schema.properties.veteran.required).to.deep.equal(['ssnOrTin', 'dateOfBirth']);
    expect(schema.properties.primaryCaregiver.required).to.deep.equal(['ssnOrTin', 'dateOfBirth']);
    expect(schema.properties.secondaryOneCaregiver.required).to.deep.equal(['ssnOrTin', 'dateOfBirth']);
    expect(schema.properties.secondaryTwoCaregiver.required).to.deep.equal(['ssnOrTin', 'dateOfBirth']);
  });

  it('should not accept additional properties', () => {
    expect(schema.additionalProperties).to.equal(false);
    expect(schema.properties.veteran.additionalProperties).to.equal(false);
    expect(schema.properties.primaryCaregiver.additionalProperties).to.equal(false);
    expect(schema.properties.secondaryOneCaregiver.additionalProperties).to.equal(false);
    expect(schema.properties.secondaryTwoCaregiver.additionalProperties).to.equal(false);
  });

  describe('conditional validation', () => {
    xit('requires additional fields if "secondaryOneCaregiver" is present', () => {

    });

    xit('requires additional fields if "secondaryTwoCaregiver" is present', () => {

    });
  });
});
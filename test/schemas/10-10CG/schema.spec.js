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

  describe('conditional validation', () => {
    let schemaTestHelper;
    let validSecondaryOneCaregiverData;
    let validSecondaryTwoCaregiverData;

    before(() => {
      schemaTestHelper = new SchemaTestHelper(schema, {
        veteran: {
          fullName: { first: 'Jane Doe', last: 'Doe' },
          ssnOrTin: '789787893',
          dateOfBirth: '1990-07-03',
          gender: 'M',
          address: { street: '111 2nd St S', city: 'Seattle', country: 'USA', state: 'WA', postalCode: '33771' },
          primaryPhoneNumber: '8887775544',
          alternativePhoneNumber: '8887775544',
          email: 'veteranEmail@email.com',
          vaEnrolled: true,
          plannedClinic: 'My Clinic',
          facilityType: 'hospital',
          previousTreatmentFacility: 'adsadad',
        },
        primaryCaregiver: {
          fullName: { first: 'Joan', last: 'Doe' },
          ssnOrTin: '202901412',
          dateOfBirth: '1978-07-03',
          gender: 'F',
          address: { street: '111 2nd St S', city: 'Seattle', country: 'USA', state: 'WA', postalCode: '33771' },
          primaryPhoneNumber: '8887775544',
          alternativePhoneNumber: '8887775544',
          email: 'primaryCaregiverEmail@email.com',
          vetRelationship: 'Spouse',
          medicaidEnrolled: false,
          medicareEnrolled: false,
          champvaEnrolled: false,
          tricareEnrolled: true,
          otherHealthInsurance: false,
        }
      });

      validSecondaryOneCaregiverData = { ssnOrTin: '123456789', dateOfBirth: '1990-01-01' }
      validSecondaryTwoCaregiverData = { ssnOrTin: '123456789', dateOfBirth: '1990-01-01' }
    });

    it('is valid with only "veteran" and "primaryCaregiver"', () => {
      schemaTestHelper.schemaExpect(true);
    });

    it('requires additional fields if "secondaryOneCaregiver" is present', () => {
      schemaTestHelper.schemaExpect(false, { secondaryOneCaregiver: {} });
      schemaTestHelper.schemaExpect(false, { secondaryOneCaregiver: { ssnOrTin: '123456789' } });
      schemaTestHelper.schemaExpect(false, { secondaryOneCaregiver: {  dateOfBirth: '1990-01-01' } });
      schemaTestHelper.schemaExpect(true, { secondaryOneCaregiver: validSecondaryOneCaregiverData });
    });

    it('requires additional fields if "secondaryTwoCaregiver" is present', () => {
      schemaTestHelper.defaults = {
        ...schemaTestHelper.defaults,
        secondaryOneCaregiver: validSecondaryOneCaregiverData,
      }

      schemaTestHelper.schemaExpect(false, { secondaryTwoCaregiver: {} });
      schemaTestHelper.schemaExpect(false, { secondaryTwoCaregiver: { ssnOrTin: '123456789' } });
      schemaTestHelper.schemaExpect(false, { secondaryTwoCaregiver: { dateOfBirth: '1990-01-01' } });
      schemaTestHelper.schemaExpect(true, { secondaryTwoCaregiver: validSecondaryTwoCaregiverData });
    });
  });
});
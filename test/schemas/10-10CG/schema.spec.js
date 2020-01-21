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

    // Removed these so the attrs can be checked
    delete unrestrictedSchema.required;
    delete unrestrictedSchema.dependencies;

    const schemaTestHelper = new SchemaTestHelper(unrestrictedSchema);
    const sharedTests = new SharedTests(schemaTestHelper);

    // Veteran Info
    sharedTests.runTest('fullName', ['veteranFullName'])
    sharedTests.runTest('ssn', ['veteranSsnOrTin']);
    sharedTests.runTest('date', ['veteranDateOfBirth']);
    sharedTests.runTest('gender', ['veteranGender']);
    schemaTestHelper.testValidAndInvalid('veteranVaEnrolled', testData.boolean);
    // TODO: [veteranPlannedClinic] there is a va-medical-facilities enum/type in /common we can use
    schemaTestHelper.testValidAndInvalid('veteranPlannedClinic', testData.string);
    schemaTestHelper.testValidAndInvalid('veteranFacilityType', testData.veteranFacilityType);
    // TODO: [veteranPreviousTreatmentFacility] there is a va-medical-facilities enum/type in /common we can use
    schemaTestHelper.testValidAndInvalid('veteranPreviousTreatmentFacility', testData.string);
    sharedTests.runTest('address', ['veteranAddress']);
    sharedTests.runTest('phone', ['veteranPrimaryPhoneNumber']);
    sharedTests.runTest('phone', ['veteranAlternativePhoneNumber']);
    sharedTests.runTest('email', ['veteranEmail']);
    // Primary Caregiver Info
    sharedTests.runTest('fullName', ['primaryCaregiverFullName']);
    sharedTests.runTest('ssn', ['primaryCaregiverSsnOrTin']);
    sharedTests.runTest('date', ['primaryCaregiverDateOfBirth']);
    sharedTests.runTest('gender', ['primaryCaregiverGender']);
    sharedTests.runTest('address', ['primaryCaregiverAddress']);
    sharedTests.runTest('phone', ['primaryCaregiverPrimaryPhoneNumber']);
    sharedTests.runTest('phone', ['primaryCaregiverAlternativePhoneNumber']);
    sharedTests.runTest('email', ['primaryCaregiverEmail']);
    schemaTestHelper.testValidAndInvalid('primaryCaregiverVetRelationship', testData.vetRelationship);
    schemaTestHelper.testValidAndInvalid('primaryCaregiverMedicaidEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiverMedicareEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiverTricareEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiverChampvaEnrolled', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiverOtherHealthInsurance', testData.boolean);
    schemaTestHelper.testValidAndInvalid('primaryCaregiverOtherHealthInsuranceName', testData.string);
    // Secondary One Caregiver Info
    schemaTestHelper.testValidAndInvalid('hasSecondaryOneCaregiver', testData.boolean);
    sharedTests.runTest('fullName', ['secondaryOneCaregiverFullName']);
    sharedTests.runTest('ssn', ['secondaryOneCaregiverSsnOrTin']);
    sharedTests.runTest('date', ['secondaryOneCaregiverDateOfBirth']);
    sharedTests.runTest('gender', ['secondaryOneCaregiverGender']);
    sharedTests.runTest('address', ['secondaryOneCaregiverAddress']);
    sharedTests.runTest('phone', ['secondaryOneCaregiverPrimaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryOneCaregiverAlternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryOneCaregiverEmail']);
    schemaTestHelper.testValidAndInvalid('secondaryOneCaregiverVetRelationship', testData.vetRelationship);
    // Secondary Two Caregiver Info
    schemaTestHelper.testValidAndInvalid('hasSecondaryTwoCaregiver', testData.boolean);
    sharedTests.runTest('fullName', ['secondaryTwoCaregiverFullName']);
    sharedTests.runTest('ssn', ['secondaryTwoCaregiverSsnOrTin']);
    sharedTests.runTest('date', ['secondaryTwoCaregiverDateOfBirth']);
    sharedTests.runTest('gender', ['secondaryTwoCaregiverGender']);
    sharedTests.runTest('address', ['secondaryTwoCaregiverAddress']);
    sharedTests.runTest('phone', ['secondaryTwoCaregiverPrimaryPhoneNumber']);
    sharedTests.runTest('phone', ['secondaryTwoCaregiverAlternativePhoneNumber']);
    sharedTests.runTest('email', ['secondaryTwoCaregiverEmail']);
    schemaTestHelper.testValidAndInvalid('secondaryTwoCaregiverVetRelationship', testData.vetRelationship);
  });

  describe('required properties', () => {
    xit('should have the right required fields', () => {
      expect(schema.required).to.deep.equal([
        'veteranDateOfBirth',
        'veteranPlannedClinic',
      ]);
    });

    xit('requires additional fields if "hasSecondaryOneCaregiver" is true', () => {

    });

    xit('requires additional fields if "hasSecondaryTwoCaregiver" is true', () => {

    });
  });
});
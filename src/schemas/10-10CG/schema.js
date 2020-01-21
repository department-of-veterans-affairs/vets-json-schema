import definitions from '../../common/definitions';

const buildDataType = type => ({ type });
const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const vetRelationships = [
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
];

const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)",
  type: "object",
  additionalProperties: false,
  definitions: {
    tin: buildDataType('string'),
    fullName: definitions.fullName,
    ssn: definitions.ssn,
    date: definitions.date,
    gender: definitions.gender,
    phone: definitions.phone,
    email: definitions.email,
    address: definitions.address,
    vetRelationship: {
      type: 'string',
      enum: vetRelationships,
    },
  },
  dependencies: {
    secondaryOneCaregiverFullName: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverSsnOrTin: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverTin: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverDateOfBirth: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverGender: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverAddress: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverPrimaryPhoneNumber: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverAlternativePhoneNumber: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverEmail: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverVetRelationship: ['hasSecondaryOneCaregiver'],
    secondaryTwoCaregiverFullName: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverSsnOrTin: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverTin: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverDateOfBirth: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverGender: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverAddress: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverPrimaryPhoneNumber: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverAlternativePhoneNumber: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverEmail: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverVetRelationship: ['hasSecondaryTwoCaregiver'],
  },
  required: [
    'veteranDateOfBirth',
    'veteranPlannedClinic',
  ],
  properties: {
    // Veteran Info
    veteranFullName: buildDefinitionReference('fullName'),
    veteranSsnOrTin: buildDefinitionReference('ssn'),
    veteranDateOfBirth: buildDefinitionReference('date'),
    veteranGender: buildDefinitionReference('gender'),
    veteranVaEnrolled: buildDataType('boolean'),
    // TODO: [veteranPlannedClinic] there is a va-medical-facilities enum/type in /common we can use
    veteranPlannedClinic: buildDataType('string'),
    veteranFacilityType: {
      type: 'string',
      enum: ['hospital', 'clinic']
    },
    // TODO: [veteranPreviousTreatmentFacility] there is a va-medical-facilities enum/type in /common we can use
    veteranPreviousTreatmentFacility: buildDataType('string'),
    veteranAddress: buildDefinitionReference('address'),
    veteranPrimaryPhoneNumber: buildDefinitionReference('phone'),
    veteranAlternativePhoneNumber: buildDefinitionReference('phone'),
    veteranEmail: buildDefinitionReference('email'),
    // Primary Caregiver Info
    primaryCaregiverFullName: buildDefinitionReference('fullName'),
    primaryCaregiverSsnOrTin: buildDefinitionReference('ssn'),
    primaryCaregiverDateOfBirth: buildDefinitionReference('date'),
    primaryCaregiverGender: buildDefinitionReference('gender'),
    primaryCaregiverAddress: buildDefinitionReference('address'),
    primaryCaregiverPrimaryPhoneNumber: buildDefinitionReference('phone'),
    primaryCaregiverAlternativePhoneNumber: buildDefinitionReference('phone'),
    primaryCaregiverEmail: buildDefinitionReference('email'),
    primaryCaregiverVetRelationship: buildDefinitionReference('vetRelationship'),
    primaryCaregiverMedicaidEnrolled: buildDataType('boolean'),
    primaryCaregiverMedicareEnrolled: buildDataType('boolean'),
    primaryCaregiverTricareEnrolled: buildDataType('boolean'),
    primaryCaregiverChampvaEnrolled: buildDataType('boolean'),
    primaryCaregiverOtherHealthInsurance: buildDataType('boolean'),
    primaryCaregiverOtherHealthInsuranceName: buildDataType('string'),
    // Secondary One Caregiver Info
    hasSecondaryOneCaregiver: buildDataType('boolean'),
    secondaryOneCaregiverFullName: buildDefinitionReference('fullName'),
    secondaryOneCaregiverSsnOrTin: buildDefinitionReference('ssn'),
    secondaryOneCaregiverDateOfBirth: buildDefinitionReference('date'),
    secondaryOneCaregiverGender: buildDefinitionReference('gender'),
    secondaryOneCaregiverAddress: buildDefinitionReference('address'),
    secondaryOneCaregiverPrimaryPhoneNumber: buildDefinitionReference('phone'),
    secondaryOneCaregiverAlternativePhoneNumber: buildDefinitionReference('phone'),
    secondaryOneCaregiverEmail: buildDefinitionReference('email'),
    secondaryOneCaregiverVetRelationship: buildDefinitionReference('vetRelationship'),
    // Secondary Two Caregiver Info
    hasSecondaryTwoCaregiver: buildDataType('boolean'),
    secondaryTwoCaregiverFullName: buildDefinitionReference('fullName'),
    secondaryTwoCaregiverSsnOrTin: buildDefinitionReference('ssn'),
    secondaryTwoCaregiverDateOfBirth: buildDefinitionReference('date'),
    secondaryTwoCaregiverGender: buildDefinitionReference('gender'),
    secondaryTwoCaregiverAddress: buildDefinitionReference('address'),
    secondaryTwoCaregiverPrimaryPhoneNumber: buildDefinitionReference('phone'),
    secondaryTwoCaregiverAlternativePhoneNumber: buildDefinitionReference('phone'),
    secondaryTwoCaregiverEmail: buildDefinitionReference('email'),
    secondaryTwoCaregiverVetRelationship: buildDefinitionReference('vetRelationship'),
  },
};

export default schema;

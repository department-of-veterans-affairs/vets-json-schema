import definitions from "../../common/definitions";

const buildDataType = type => ({ type });
const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const ENTITY_IDNTIFIERS = {
  SOCIAL_SECURITY_NUMBER: "Social Security Number",
  TAX_IDENTIFICATION_NUMBER:  "Tax Identification Number",
};

/**
 * When `field` is `enum` require `requirement`
 * ex:   When "primaryCaregiverSsnOrTin" is ENTITY_IDNTIFIERS.SOCIAL_SECURITY_NUMBER require the property "primaryCaregiverSsn"
 * ex:   When "primaryCaregiverSsnOrTin" is ENTITY_IDNTIFIERS.TAX_IDENTIFICATION_NUMBER require the property "primaryCaregiverTin"
 */
const ssnAndTinImplications = [
  // Vetern (may be removed since we likely won't have TIN's for veterns)
  { field: 'veteranSsnOrTin', enum: ENTITY_IDNTIFIERS.SOCIAL_SECURITY_NUMBER, requiredProperty: 'veteranSsn' },
  { field: 'veteranSsnOrTin', enum: ENTITY_IDNTIFIERS.TAX_IDENTIFICATION_NUMBER, requiredProperty: 'veteranTin' },
  // Primary Caregiver
  { field: 'primaryCaregiverSsnOrTin', enum: ENTITY_IDNTIFIERS.SOCIAL_SECURITY_NUMBER, requiredProperty: 'primaryCaregiverSsn' },
  { field: 'primaryCaregiverSsnOrTin', enum: ENTITY_IDNTIFIERS.TAX_IDENTIFICATION_NUMBER, requiredProperty: 'primaryCaregiverTin' },
  // Secondary One Caregiver
  { field: 'secondaryOneSsnOrTin', enum: ENTITY_IDNTIFIERS.SOCIAL_SECURITY_NUMBER, requiredProperty: 'secondaryOneSsn' },
  { field: 'secondaryOneSsnOrTin', enum: ENTITY_IDNTIFIERS.TAX_IDENTIFICATION_NUMBER, requiredProperty: 'secondaryOneTin' },
  // Secondary Two Caregiver
  { field: 'secondaryTwoCaregiverSsnOrTin', enum: ENTITY_IDNTIFIERS.SOCIAL_SECURITY_NUMBER, requiredProperty: 'secondaryTwoCaregiverSsn' },
  { field: 'secondaryTwoCaregiverSsnOrTin', enum: ENTITY_IDNTIFIERS.TAX_IDENTIFICATION_NUMBER, requiredProperty: 'secondaryTwoCaregiverTin' },
].reduce((implications, conditions) => {
  const conditionalRequirement = {
    properties: {
      [conditions.field]: { const: conditions.enum }
    },
    require: [conditions.requiredProperty]
  };

  implications.push(conditionalRequirement);
  return implications;
}, []);

const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)",
  type: "object",
  additionalProperties: false,
  definitions: {
    ssnOrTin: {
      type: "string",
      enum: [
        ENTITY_IDNTIFIERS.SOCIAL_SECURITY_NUMBER,
        ENTITY_IDNTIFIERS.TAX_IDENTIFICATION_NUMBER
      ]
    },
    tin: buildDataType('string'),
    fullName: definitions.fullName,
    ssn: definitions.ssn,
    date: definitions.date,
    gender: definitions.gender,
    phone: definitions.phone,
    email: definitions.email,
    address: definitions.address,
    // TODO: what are the list of acceptable vet relationships?
    vetRelationship: buildDataType('string'),
  },
  dependencies: {
    secondaryOneCaregiverFullName: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverSsnOrTin: ['hasSecondaryOneCaregiver'],
    secondaryOneCaregiverSsn: ['hasSecondaryOneCaregiver'],
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
    secondaryTwoCaregiverSsn: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverTin: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverDateOfBirth: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverGender: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverAddress: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverPrimaryPhoneNumber: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverAlternativePhoneNumber: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverEmail: ['hasSecondaryTwoCaregiver'],
    secondaryTwoCaregiverVetRelationship: ['hasSecondaryTwoCaregiver'],
  },
  anyOf: [
    ...ssnAndTinImplications,
  ],
  required: [
    'veteranDateOfBirth',
    'veteranPlannedClinic',
  ],
  properties: {
    // Veteran Info
    veteranFullName: buildDefinitionReference('fullName'),
    veteranSsnOrTin: buildDefinitionReference('ssnOrTin'),
    veteranSsn: buildDefinitionReference('ssn'),
    veteranTin: buildDefinitionReference('tin'),
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
    primaryCaregiverSsnOrTin: buildDefinitionReference('ssnOrTin'),
    primaryCaregiverSsn: buildDefinitionReference('ssn'),
    primaryCaregiverTin: buildDefinitionReference('tin'),
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
    secondaryOneCaregiverSsnOrTin: buildDefinitionReference('ssnOrTin'),
    secondaryOneCaregiverSsn: buildDefinitionReference('ssn'),
    secondaryOneCaregiverTin: buildDefinitionReference('tin'),
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
    secondaryTwoCaregiverSsnOrTin: buildDefinitionReference('ssnOrTin'),
    secondaryTwoCaregiverSsn: buildDefinitionReference('ssn'),
    secondaryTwoCaregiverTin: buildDefinitionReference('tin'),
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

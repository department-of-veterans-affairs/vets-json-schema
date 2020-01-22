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
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)',
  type: 'object',
  additionalProperties: false,
  required: ['veteran', 'primaryCaregiver'],
  definitions: {
    tin: buildDataType('string'),
    fullName: definitions.fullName,
    ssn: definitions.ssn,
    date: definitions.date,
    gender: definitions.gender,
    phone: definitions.phone,
    email: definitions.email,
    address: definitions.address,
    vetRelationship: { type: 'string', enum: vetRelationships },
  },
  properties: {
    veteran: {
      type: 'object',
      additionalProperties: false,
      required: ['ssnOrTin', 'dateOfBirth'],
      properties: {
        fullName: buildDefinitionReference('fullName'),
        ssnOrTin: buildDefinitionReference('ssn'),
        dateOfBirth: buildDefinitionReference('date'),
        gender: buildDefinitionReference('gender'),
        vaEnrolled: buildDataType('boolean'),
        // TODO: [veteranPlannedClinic] there is a va-medical-facilities enum/type in /common we can use
        plannedClinic: buildDataType('string'),
        facilityType: { type: 'string', enum: ['hospital', 'clinic'] },
        // TODO: [veteranPreviousTreatmentFacility] there is a va-medical-facilities enum/type in /common we can use
        previousTreatmentFacility: buildDataType('string'),
        address: buildDefinitionReference('address'),
        primaryPhoneNumber: buildDefinitionReference('phone'),
        alternativePhoneNumber: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
      },
    },
    primaryCaregiver: {
      type: 'object',
      additionalProperties: false,
      required: ['ssnOrTin', 'dateOfBirth'],
      properties: {
        fullName: buildDefinitionReference('fullName'),
        ssnOrTin: buildDefinitionReference('ssn'),
        dateOfBirth: buildDefinitionReference('date'),
        gender: buildDefinitionReference('gender'),
        address: buildDefinitionReference('address'),
        primaryPhoneNumber: buildDefinitionReference('phone'),
        alternativePhoneNumber: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
        vetRelationship: buildDefinitionReference('vetRelationship'),
        medicaidEnrolled: buildDataType('boolean'),
        medicareEnrolled: buildDataType('boolean'),
        tricareEnrolled: buildDataType('boolean'),
        champvaEnrolled: buildDataType('boolean'),
        otherHealthInsurance: buildDataType('boolean'),
        otherHealthInsuranceName: buildDataType('string'),
      },
    },
    secondaryOneCaregiver: {
      type: 'object',
      additionalProperties: false,
      required: ['ssnOrTin', 'dateOfBirth'],
      properties: {
        fullName: buildDefinitionReference('fullName'),
        ssnOrTin: buildDefinitionReference('ssn'),
        dateOfBirth: buildDefinitionReference('date'),
        gender: buildDefinitionReference('gender'),
        address: buildDefinitionReference('address'),
        primaryPhoneNumber: buildDefinitionReference('phone'),
        alternativePhoneNumber: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
        vetRelationship: buildDefinitionReference('vetRelationship'),
      },
    },
    secondaryTwoCaregiver: {
      type: 'object',
      additionalProperties: false,
      required: ['ssnOrTin', 'dateOfBirth'],
      properties: {
        fullName: buildDefinitionReference('fullName'),
        ssnOrTin: buildDefinitionReference('ssn'),
        dateOfBirth: buildDefinitionReference('date'),
        gender: buildDefinitionReference('gender'),
        address: buildDefinitionReference('address'),
        primaryPhoneNumber: buildDefinitionReference('phone'),
        alternativePhoneNumber: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
        vetRelationship: buildDefinitionReference('vetRelationship'),
      },
    },
  },
};

export default schema;

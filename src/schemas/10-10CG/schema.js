import definitions from '../../common/definitions';
import { caregiverProgramFacilities } from '../../common/constants';

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
  'Significant Other',
  'Relative - Other',
  'Friend/Neighbor',
];

const caregiverProgramFacilityIds = Object.keys(caregiverProgramFacilities)
  .reduce((acc, stateId) => {
    const stateFacilities = caregiverProgramFacilities[stateId];
    const facilityIds = stateFacilities.map(facility => facility.code);

    Array.prototype.push.apply(acc, facilityIds);

    return acc;
  }, []);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)',
  type: 'object',
  additionalProperties: false,
  required: ['veteran', 'primaryCaregiver'],
  definitions: {
    tin: buildDataType('string'),
    fullName: definitions.fullNameNoSuffix,
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
      required: [
        'fullName',
        'ssnOrTin',
        'dateOfBirth',
        'gender',
        'address',
        'plannedClinic'
      ],
      properties: {
        fullName: buildDefinitionReference('fullName'),
        ssnOrTin: buildDefinitionReference('ssn'),
        dateOfBirth: buildDefinitionReference('date'),
        gender: buildDefinitionReference('gender'),
        address: buildDefinitionReference('address'),
        primaryPhoneNumber: buildDefinitionReference('phone'),
        alternativePhoneNumber: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
        plannedClinic: { type: 'string', enum: caregiverProgramFacilityIds },
        lastTreatmentFacility: {
          type: 'object',
          additionalProperties: false,
          required: ['name', 'type'],
          properties: {
            name: buildDataType('string'),
            type: {
              type: 'string',
              enum: ['hospital', 'clinic']
            },
          },
        },
      },
    },
    primaryCaregiver: {
      type: 'object',
      additionalProperties: false,
      required: [
        'fullName',
        'ssnOrTin',
        'dateOfBirth',
        'gender',
        'address',
        'vetRelationship',
        'medicaidEnrolled',
        'medicareEnrolled',
      ],
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
        // TODO: not on 1010CG Field Map. Get Confirmation that this is needed (does it fall into otherHealthIn...Name)
        tricareEnrolled: buildDataType('boolean'),
        // TODO: not on 1010CG Field Map. Get Confirmation that this is needed (does it fall into otherHealthIn...Name)
        champvaEnrolled: buildDataType('boolean'),
        otherHealthInsuranceName: buildDataType('string'),
      },
    },
    secondaryOneCaregiver: {
      type: 'object',
      additionalProperties: false,
      required: [
        'fullName',
        'ssnOrTin',
        'dateOfBirth',
        'gender',
        'address',
        'vetRelationship'
      ],
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
      required: [
        'fullName',
        'ssnOrTin',
        'dateOfBirth',
        'gender',
        'address',
        'vetRelationship'
      ],
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

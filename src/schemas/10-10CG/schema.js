import definitions from '../../common/definitions';
import { caregiverProgramFacilities } from '../../common/constants';

const buildDataType = (type, additionals = {}) => {
  return { type, ...additionals };
};

const buildDefinitionReference = referenceId => ({ $ref: `#/definitions/${referenceId}` });

const gender = {
  type: 'string',
  enum: ['F', 'M', 'U'],
};

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
  'Grandchild',
];

const caregiverProgramFacilityIds = Object.keys(caregiverProgramFacilities)
  .reduce((acc, stateId) => {
    const stateFacilities = caregiverProgramFacilities[stateId];
    const facilityIds = stateFacilities.map(facility => facility.code);

    Array.prototype.push.apply(acc, facilityIds);

    return acc;
  }, []);

const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)',
  type: 'object',
  additionalProperties: false,
  required: ['veteran', 'primaryCaregiver'],
  definitions: {
    fullName: definitions.fullNameNoSuffix,
    ssn: definitions.ssn,
    date: definitions.date,
    gender: gender,
    phone: definitions.phone,
    email: definitions.email,
    address: definitions.usAddress,
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
            name: buildDataType('string', { minLength: 1, maxLength: 100 }),
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
        'tricareEnrolled',
        'champvaEnrolled',
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
        otherHealthInsuranceName: buildDataType('string', { minLength: 1, maxLength: 100 }),
      },
    },
    secondaryCaregiverOne: {
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
    secondaryCaregiverTwo: {
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

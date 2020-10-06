import definitions from '../../common/definitions';
import form1010cgCertifications from '../../common/form-10-10cg-certifications';
import { caregiverProgramFacilities } from '../../common/constants';

const buildDataType = (type, additionals = {}) => {
  return { type, ...additionals };
};

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
  'Grandchild',
];

const caregiverProgramFacilityIds = Object.keys(caregiverProgramFacilities).reduce((acc, stateId) => {
  const stateFacilities = caregiverProgramFacilities[stateId];
  const facilityIds = stateFacilities.map(facility => facility.code);

  Array.prototype.push.apply(acc, facilityIds);

  return acc;
}, []);

const certificationSchemas = [
  'veteran',
  'primaryCaregiver',
  'secondaryCaregiverOne',
  'secondaryCaregiverTwo',
].reduce((certificationSchemasAcc, formSubject) => {
  const minItemsRequired = formSubject === 'veteran' ? 2 : 6;
  const maxItemsRequired = formSubject === 'veteran' ? 2 : 7;

  const relevantCertificationIds = Object.keys(form1010cgCertifications)
    .reduce((relevantCertificationIdsAcc, certId) => {
      const certificationDefinition = form1010cgCertifications[certId];
      const isAvailableForFormSubject = certificationDefinition.availableFor.indexOf(formSubject) > -1;

      if (isAvailableForFormSubject) {
        relevantCertificationIdsAcc.push(certId);
      }

      return relevantCertificationIdsAcc;
    }, []);

  certificationSchemasAcc[formSubject] = {
    type: 'array',
    additionalItems: false,
    uniqueItems: true,
    minItems: minItemsRequired,
    maxItems: maxItemsRequired,
    items: {
      type: 'string',
      enum: relevantCertificationIds,
    },
  };

  return certificationSchemasAcc;
}, {});

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)',
  type: 'object',
  additionalProperties: false,
  required: ['veteran', 'primaryCaregiver'],
  definitions: {
    fullName: definitions.fullNameNoSuffix,
    ssn: definitions.ssn,
    date: definitions.date,
    gender: definitions.gender,
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
        'address',
        'primaryPhoneNumber',
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
              enum: ['hospital', 'clinic'],
            },
          },
        },
        certifications: certificationSchemas['veteran'],
      },
    },
    primaryCaregiver: {
      type: 'object',
      additionalProperties: false,
      required: [
        'fullName',
        'dateOfBirth',
        'address',
        'primaryPhoneNumber',
        'vetRelationship',
        'hasHealthInsurance',
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
        hasHealthInsurance: buildDataType('boolean'),
        certifications: certificationSchemas['primaryCaregiver'],
      },
    },
    secondaryCaregiverOne: {
      type: 'object',
      additionalProperties: false,
      required: [
        'fullName',
        'dateOfBirth',
        'address',
        'primaryPhoneNumber',
        'vetRelationship',
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
        certifications: certificationSchemas['secondaryCaregiverOne'],
      },
    },
    secondaryCaregiverTwo: {
      type: 'object',
      additionalProperties: false,
      required: [
        'fullName',
        'dateOfBirth',
        'address',
        'primaryPhoneNumber',
        'vetRelationship',
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
        certifications: certificationSchemas['secondaryCaregiverTwo'],
      },
    },
  },
};

export default schema;

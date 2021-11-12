import definitions from '../../common/definitions';
import form1010cgCertifications from '../../common/form-10-10cg-certifications';

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
const certificationSchemas = ['veteran', 'primaryCaregiver', 'secondaryCaregiverOne', 'secondaryCaregiverTwo'].reduce(
  (certificationSchemasAcc, formSubject) => {
    const minItemsRequired = formSubject === 'veteran' ? 2 : 6;
    const maxItemsRequired = formSubject === 'veteran' ? 2 : 7;

    const relevantCertificationIds = Object.keys(form1010cgCertifications).reduce(
      (relevantCertificationIdsAcc, certId) => {
        const certificationDefinition = form1010cgCertifications[certId];
        const isAvailableForFormSubject = certificationDefinition.availableFor.indexOf(formSubject) > -1;

        if (isAvailableForFormSubject) {
          relevantCertificationIdsAcc.push(certId);
        }

        return relevantCertificationIdsAcc;
      },
      [],
    );

    // eslint-disable-next-line no-param-reassign
    certificationSchemasAcc[formSubject] = {
      type: 'array',
      uniqueItems: true,
      minItems: minItemsRequired,
      maxItems: maxItemsRequired,
      items: {
        type: 'string',
        enum: relevantCertificationIds,
      },
    };

    return certificationSchemasAcc;
  },
  {},
);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)',
  type: 'object',
  additionalProperties: false,
  required: ['veteran'],
  anyOf: [{ required: ['primaryCaregiver'] }, { required: ['secondaryCaregiverOne'] }],
  definitions: {
    fullName: definitions.fullNameNoSuffix,
    ssn: definitions.ssn,
    date: definitions.date,
    gender: definitions.gender,
    phone: definitions.phone,
    email: definitions.email,
    address: definitions.usAddress,
    vetRelationship: { type: 'string', enum: vetRelationships },
    uuid: definitions.uuid,
    signature: buildDataType('string', { minLength: 1, maxLength: 150 }),
  },
  properties: {
    veteran: {
      type: 'object',
      additionalProperties: false,
      required: ['fullName', 'ssnOrTin', 'dateOfBirth', 'address', 'primaryPhoneNumber', 'plannedClinic'],
      properties: {
        fullName: buildDefinitionReference('fullName'),
        ssnOrTin: buildDefinitionReference('ssn'),
        dateOfBirth: buildDefinitionReference('date'),
        gender: buildDefinitionReference('gender'),
        address: buildDefinitionReference('address'),
        primaryPhoneNumber: buildDefinitionReference('phone'),
        alternativePhoneNumber: buildDefinitionReference('phone'),
        email: buildDefinitionReference('email'),
        plannedClinic: { type: 'string' },
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
        signature: buildDefinitionReference('signature'),
        certifications: certificationSchemas.veteran,
      },
    },
    primaryCaregiver: {
      type: 'object',
      additionalProperties: false,
      required: ['fullName', 'dateOfBirth', 'address', 'primaryPhoneNumber', 'vetRelationship', 'hasHealthInsurance'],
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
        signature: buildDefinitionReference('signature'),
        certifications: certificationSchemas.primaryCaregiver,
      },
    },
    secondaryCaregiverOne: {
      type: 'object',
      additionalProperties: false,
      required: ['fullName', 'dateOfBirth', 'address', 'primaryPhoneNumber', 'vetRelationship'],
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
        signature: buildDefinitionReference('signature'),
        certifications: certificationSchemas.secondaryCaregiverOne,
      },
    },
    secondaryCaregiverTwo: {
      type: 'object',
      additionalProperties: false,
      required: ['fullName', 'dateOfBirth', 'address', 'primaryPhoneNumber', 'vetRelationship'],
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
        signature: buildDefinitionReference('signature'),
        certifications: certificationSchemas.secondaryCaregiverTwo,
      },
    },
    poaAttachmentId: buildDefinitionReference('uuid'),
  },
};

export default schema;

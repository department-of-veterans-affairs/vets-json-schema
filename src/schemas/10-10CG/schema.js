import constants from '../../common/constants';
import definitions from '../../common/definitions';
import form1010cgCertifications from '../../common/form-10-10cg-certifications';

const buildDataType = (type, additionals = {}) => ({ type, ...additionals });
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
    const schemas = { ...certificationSchemasAcc };
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

    schemas[formSubject] = {
      type: 'array',
      uniqueItems: true,
      minItems: minItemsRequired,
      maxItems: maxItemsRequired,
      items: {
        type: 'string',
        enum: relevantCertificationIds,
      },
    };

    return schemas;
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
    fullName: {
      type: 'object',
      additionalProperties: false,
      required: ['first', 'last'],
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        middle: {
          type: 'string',
          maxLength: 30,
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        suffix: {
          type: 'string',
          enum: constants.suffixes,
        },
      },
    },
    ssn: definitions.ssn,
    date: definitions.date,
    gender: definitions.gender,
    phone: {
      type: 'string',
      minLength: 10,
      maxLength: 40,
    },
    email: {
      type: 'string',
      maxLength: 80,
      format: 'email',
    },
    address: {
      type: 'object',
      additionalProperties: false,
      required: ['street', 'city', 'state', 'postalCode'],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 40,
        },
        state: {
          type: 'string',
          enum: constants.usaStates,
        },
        postalCode: definitions.usaPostalCode,
        county: {
          type: 'string',
          maxLength: 60,
        },
      },
    },
    mailingAddress: {
      type: 'object',
      additionalProperties: false,
      required: ['street', 'city', 'state', 'postalCode'],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 40,
        },
        state: {
          type: 'string',
          enum: constants.usaStates,
        },
        postalCode: definitions.usaPostalCode,
        county: {
          type: 'string',
          maxLength: 60,
        },
      },
    },
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
        signature: buildDefinitionReference('signature'),
        certifications: certificationSchemas.veteran,
      },
    },
    primaryCaregiver: {
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
    signAsRepresentative: buildDataType('boolean'),
  },
};

export default schema;

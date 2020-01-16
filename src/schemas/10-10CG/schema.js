import definitions from '../../common/definitions';

const ssnOrTin = {
  type: 'string',
  enum: ['Social Security Number', 'Tax Identification Number'],
};

const tin = {
  type: 'string',
};

const booleanType = {
  type: 'boolean',
};

const fullName = {
  $ref: '#/definitions/fullName',
};

const ssn = {
  $ref: '#/definitions/ssn',
};

const dateOfBirth = {
  $ref: '#/definitions/dateOfBirth',
};

const gender = {
  $ref: '#/definitions/gender',
};

const phone = {
  $ref: '#/definitions/phone',
};

const email = {
  $ref: '#/definitions/email',
};

const address = {
  $ref: '#/definitions/address',
};

const vetRelationship = {
  type: 'string',
};

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)',
  type: 'object',
  additionalProperties: false,
  definitions: {
    veteranFullName: fullName,
    veteranSsnOrTin: ssnOrTin,
    veteranSsn: ssn,
    veteranTin: tin,
    veteranDateOfBirth: dateOfBirth,
    veteranGender: gender,
    veteranAddress: fullName,
    veteranPrimaryPhoneNumber: phone,
    veteranAlternativePhoneNumber: phone,
    veteranEmail: email,
  },
  veteranVaEnrolled: {
    type: 'boolean',
  },
  veteranPlannedClinic: {
    type: 'string',
  },
  veteranFacilityType: {
    type: 'string',
    enum: ['hospital', 'clinic'],
  },
  veteranPreviousTreatmentFacility: {
    type: 'string',
  },
  primaryFullName: fullName,
  primarySsnOrTin: ssnOrTin,
  primarySsn: ssn,
  primaryTin: tin,
  primaryDateOfBirth: dateOfBirth,
  primaryGender: gender,
  primaryAddress: address,
  primaryPrimaryPhoneNumber: phone,
  primaryAlternativePhoneNumber: phone,
  primaryEmail: email,
  primaryVetRelationship: {
    type: 'string',
  },
  primaryMedicaidEnrolled: booleanType,
  primaryMedicareEnrolled: booleanType,
  primaryTricareEnrolled: booleanType,
  primaryChampvaEnrolled: booleanType,
  primaryOtherHealthInsurance: booleanType,
  primaryOtherHealthInsuranceName: {
    type: 'string',
  },
  hasSecondaryOneCaregiver: booleanType,
  secondaryOneFullName: fullName,
  ssnOrTin,
  secondaryOneSsn: ssn,
  secondaryOneTin: tin,
  secondaryOneDateOfBirth: dateOfBirth,
  secondaryOneGender: gender,
  secondaryOneAddress: address,
  secondaryOnePrimaryPhoneNumber: phone,
  secondaryOneAlternativePhoneNumber: phone,
  secondaryOneEmail: email,
  vetRelationship,
  hasSecondaryTwoCaregiver: booleanType,
  secondaryTwoFullName: fullName,
  secondaryTwoSsnOrTin: ssnOrTin,
  secondaryTwoSsn: ssn,
  secondaryTwoTin: tin,
  secondaryTwoDateOfBirth: dateOfBirth,
  secondaryTwoGender: gender,
  secondaryTwoAddress: address,
  secondaryTwoPrimaryPhoneNumber: phone,
  secondaryTwoAlternativePhoneNumber: phone,
  secondaryTwoEmail: email,
  secondaryTwoVetRelationship: vetRelationship,
};

export default schema;

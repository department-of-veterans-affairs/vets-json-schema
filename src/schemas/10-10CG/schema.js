import definitions from "../../common/definitions";

const ssnOrTin = {
  type: "string",
  enum: ["Social Security Number", "Tax Identification Number"]
};

const tin = {
  type: "string"
};

const booleanType = {
  type: 'boolean'
};

const fullName = {
  $ref: "#/definitions/fullName"
};

const ssn = {
  $ref: "#/definitions/ssn"
};

const dateOfBirth = {
  $ref: '#/definitions/dateOfBirth'
};

const gender = {
  $ref: "#/definitions/gender"
};

const phone = {
  $ref: "#/definitions/phone"
};

const email = {
  $ref: "#/definitions/email"
};

const address = {
  $ref: "#/definitions/address"
};

const vetRelationship = {
  type: 'string',
};


const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title:
    "Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)",
  type: "object",
  additionalProperties: false,
  definitions: {
    veteranInfoOne: {
      type: "object",
      required: [],
      properties: {
        fullName: fullName,
        ssnOrTin: ssnOrTin,
        ssn: ssn,
        tin: tin,
        dateOfBirth: dateOfBirth,
        gender: gender
      }
    },
    veteranInfoTwo: {
      type: "object",
      required: [],
      properties: {
        fullName: fullName,
        primaryPhoneNumber: phone,
        alternativePhoneNumber: phone,
        email: email
      }
    },
    veteranInfoThree: {
      type: "object",
      required: [],
      properties: {
        vaEnrolled: {
          type: 'boolean'
        },
        plannedClinic: {
          type: 'string'
        },
        facilityType: {
          type: 'string',
          enum: ['hospital', 'clinic']
        },
        previousTreatmentFacility: {
          type: 'string'
        }
      }
    },
    primaryCaregiverInfoOne: {
      type: "object",
      required: [],
      properties: {
        fullName: fullName,
        ssnOrTin: ssnOrTin,
        ssn: ssn,
        tin: tin,
        dateOfBirth: dateOfBirth,
        gender: gender
      }
    },
    primaryCaregiverInfoTwo: {
      type: "object",
      required: [],
      properties: {
        primaryPhoneNumber: phone,
        alternativePhoneNumber: phone,
        email: email,
        vetRelationship: {
          type: 'string',
        },
        medicaidEnrolled: booleanType,
        medicareEnrolled: booleanType,
        tricareEnrolled: booleanType,
        champvaEnrolled: booleanType,
        otherHealthInsurance: booleanType,
        otherHealthInsuranceName: {
          type: 'string',
        },
        hasSecondaryOneCaregiver: booleanType,
      }
    },
    secondaryOneCaregiverInfo: {
      type: "object",
      required: [],
      properties: {
        fullName: fullName,
        ssnOrTin: ssnOrTin,
        ssn: ssn,
        tin: tin,
        dateOfBirth: dateOfBirth,
        gender: gender,
        address: address,
        primaryPhoneNumber: phone,
        alternativePhoneNumber: phone,
        email: email,
        vetRelationship: vetRelationship,
      }
    },
    secondaryTwoCaregiverInfo: {
      type: "object",
      required: [],
      properties: {
        fullName: fullName,
        ssnOrTin: ssnOrTin,
        ssn: ssn,
        tin: tin,
        dateOfBirth: dateOfBirth,
        gender: gender,
        address: address,
        primaryPhoneNumber: phone,
        alternativePhoneNumber: phone,
        email: email,
        vetRelationship: vetRelationship,
        hasSecondaryOneCaregiver: booleanType,
      }
    },
  }
};

export default schema;

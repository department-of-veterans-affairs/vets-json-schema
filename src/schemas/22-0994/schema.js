import _ from "lodash/fp";
import { countries } from "../../common/constants";
import definitions from "../../common/definitions";
import {
  pciuCountries,
  pciuStates
} from "../../common/constants";

const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title:
    "APPLICATION FOR VETERAN EMPLOYMENT THROUGH TECHNOLOGY EDUCATION COURSES (VET TEC) HIGH TECHNOLOGY PROGRAM",
  type: "object",
  definitions: {
    phone: definitions.usaPhone,
    date: definitions.date,
    fullName: definitions.fullName,
    ssn: definitions.ssn,
    bankAccount: definitions.bankAccount,
    gender: definitions.gender,
    email: {
      type: "string",
      minLength: 6,
      maxLength: 80,
      pattern:
        "^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
    },
    address: definitions.address,
    privacyAgreementAccepted: definitions.privacyAgreementAccepted
  },
  properties: {
    applicantFullName: {
      $ref: "#/definitions/fullName"
    },
    applicantSocialSecurityNumber: {
      $ref: "#/definitions/ssn"
    },
    mailingAddress: {
      $ref: "#/definitions/address"
    },
    applicantGender: {
      $ref: "#/definitions/gender"
    },
    dateOfBirth: {
      $ref: "#/definitions/date"
    },
    emailAddress: {
      $ref: "#/definitions/email"
    },
    dayTimePhone: {
      $ref: "#/definitions/phone"
    },
    nightTimePhone: {
      $ref: "#/definitions/phone"
    },
    appliedForVAEducationBenefits: {
      type: "boolean"
    },
    activeDuty: {
      type: "boolean"
    },
    activeDutyDuringVetTec: {
      type: "boolean"
    },
    bankAccount: {
      $ref: "#/definitions/bankAccount"
    },
    vetTecProgram: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'string',
        enum: ["program1", "program2", "program3", "program4", "program5"]
      }
    },
    vetTecProgramLocations: {
      type: "object",
      properties: {
        city: {
          type: "string",
          maxLength: 30,
          pattern: "^([-a-zA-Z0-9'.#]([-a-zA-Z0-9'.# ])?)+$"
        },
        state: {
          type: "string",
          enum: pciuStates.map(state => state.value),
          enumNames: pciuStates.map(state => state.label)
        }
      }
    },
    plannedStartDate: {
      $ref: "#/definitions/date"
    },
    currentEmployment: {
      type: "boolean"
    },
    currentHighTechnologyEmployment: {
      type: "boolean"
    },
    highTechnologyEmploymentType: {
      type: "string",
      enum: [
        "computerProgramming",
        "dataProcessing",
        "computerSoftware",
        "informationSciences",
        "mediaApplication"
      ]
    },
    currentSalary: {
      type: "string",
      enum: [
        "lessThanTwenty",
        "twentyToThirtyFive",
        "thirtyFiveToFifty",
        "fiftyToSeventyFive",
        "moreThanSeventyFive"
      ]
    },
    highestLevelofEducation: {
      type: "string"
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    }
  },
  required: ['privacyAgreementAccepted', 'applicantFullName']
};

export default schema;

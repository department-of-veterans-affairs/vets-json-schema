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
    appliedForVaEducationBenefits: {
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
    vetTecPrograms: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'object',
        properties: {
          providerName: {
            type: 'string',
          },
          programName: {
            type: 'string',
          },
          courseType: {
            type: 'string',
            enum: ['inPerson', 'online', 'both'],
          },
          location: {
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
        },
      },
    },
    currentHighTechnologyEmployment: {
      type: "boolean"
    },
    pastHighTechnologyEmployment: {
      type: "boolean"
    },
    highTechnologyEmploymentTypes: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "computerProgramming",
          "dataProcessing",
          "computerSoftware",
          "informationSciences",
          "mediaApplication"
        ]
      }
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
      type: "string",
      enum: [
        'high_school_diploma_or_GED',
        'some_college',
        'associates_degree',
        'bachelors_degree',
        'masters_degree',
        'doctoral_degree',
        'other',
      ],
      enumNames: [
        'High school diploma or GED',
        'Some college',
        'Associate’s degree',
        'Bachelor’s degree',
        'Master’s degree',
        'Doctoral degree',
        'Other',
      ],
    },
    otherEducation: {
      type: 'string',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    }
  },
  required: [
    'privacyAgreementAccepted',
    'applicantFullName',
    'appliedForVaEducationBenefits',
    'activeDuty',
    'dayTimePhone',
    'emailAddress'
  ]
};

export default schema;

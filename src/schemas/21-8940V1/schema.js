import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR INCREASED COMPENSATION BASED ON UNEMPLOYABILITY (21-8940)',
  type: 'object',
  properties: {
    // Section I Veteran's Information
    veteranFullName: {
      type: 'object',
      first: {
        type: 'string',
        maxLength: 12,
      },
      middleinitial: {
        type: 'string',
        maxLength: 1,
      },
      last: {
        type: 'string',
        maxLength: 18,
      },
    },
    veteranSocialSecurityNumber: definitions.ssn,
    vaFileNumber: definitions.vaFileNumber,
    dateOfBirth: schemaHelpers.getDefinition('date'),
    // no good address def for 2 charatcher country code "US"
    // backend has a extract_country helper to get 2 letter country codes
    veteranAddress: definitions.address,
    // veteranAddress: {
    //   $ref: '#/definitions/usAddress',
    //   country: {
    //     type: 'string',
    //     maxLength: 2,
    //   },
    // },
    electronicCorrespondance: {
      type: 'boolean',
    },
    // may need some altering? email is 2 lines in the form
    // emailAddresses: {email1: "", email2: "", max length: 36? },
    email: {
      type: 'string',
      format: 'email',
    },
    veteranPhone: definitions.usaPhone,
    internationalPhone: {
      type: 'string',
    },

    // Section II  DISABILITY AND MEDICAL TREATMENT
    listOfDisabilities: {
      maxLength: 81,
      type: 'string',
    },
    doctorsCareInLastYTD: {
      type: 'boolean',
      // type: 'string',
      // enum: ['Yes', 'No']
    },
    doctorsTreatmentDates: definitions.dateRange,
    nameAndAddressesOfDoctors: {
      maxLength: 135,
      type: 'string',
    },
    nameAndAddressesOfHospitals: {
      maxLength: 127,
      type: 'string',
    },
    hospitalCareDateRanges: definitions.dateRange,
    // SECTION III -  EMPLOYMENT STATEMENT
    disabilityAffectEmployFTDate: schemaHelpers.getDefinition('date'),
    lastWorkedFullTimeDate: schemaHelpers.getDefinition('date'),
    becameTooDisabledToWorkDate: schemaHelpers.getDefinition('date'),
    mostEarningsInAYear: {
      type: 'integer',
    },
    yearOfMostEarnings: {
      maxLength: 4,
      type: 'integer',
    },
    occupationDuringMostEarnings: {
      type: 'string',
      maxLength: 27,
    },
    previousEmployers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nameAndAddress: {
            maxLength: 110,
            type: 'string',
          },
          typeOfWork: {
            maxLength: 39,
            type: 'string',
          },
          hoursPerWeek: {
            type: 'integer',
          },
          datesOfEmployment: definitions.dateRange,
          timeLostFromIllness: {
            type: 'integer',
          },
          mostEarningsInAMonth: {
            type: 'integer',
          },
        },
      },
    },
    preventMilitaryDuties: {
      type: 'boolean',
      // type: 'string',
      // enum: ['Yes', 'No'],
    },
    past12MonthsEarnedIncome: {
      type: 'integer',
    },
    currentMonthlyEarnedIncome: {
      type: 'integer',
    },
    leftLastJobDueToDisability: {
      type: 'boolean',
      // type: 'string',
      // enum: ['Yes', 'No'],
    },
    expectDisabilityRetirement: {
      type: 'boolean',
      // type: 'string',
      // enum: ['Yes', 'No'],
    },
    receiveExpectWorkersCompensation: {
      type: 'boolean',
      // type: 'string',
      // enum: ['Yes', 'No'],
    },
    attemptedEmploy: {
      type: 'boolean',
      // type: 'string',
      // enum: ['Yes', 'No'],
    },
    appliedEmployers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nameAndAddress: {
            maxLength: 110,
            type: 'string',
          },
          typeOfWork: {
            maxLength: 62,
            type: 'string',
          },
          dateApplied: schemaHelpers.getDefinition('date'),
        },
      },
    },
    // SECTION IV - SCHOOLING AND OTHER TRAINING
    education: {
      type: 'object',
      gradeSchool: {
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      highSchool: {
        enum: [9, 10, 11, 12],
      },
      college: {
        enum: ['Fresh', 'Soph', 'Jr', 'Sr'],
      },
    },
    trainingPreDisabled: {
      type: 'boolean',
      // enum: ['Yes', 'No'],
    },
    educationTrainingPreUnemployability: {
      type: 'object',
      name: {
        maxLength: 12,
        type: 'string',
      },
      dateOfTraining: definitions.dateRange,
    },
    trainingPostUnemployment: {
      type: 'boolean',
      // enum: ['Yes', 'No'],
    },
    educationTrainingPostUnemployability: {
      type: 'object',
      name: {
        maxLength: 12,
        type: 'string',
      },
      datesOfTraining: definitions.dateRange,
    },
    //  SECTION V - REMARKS
    remarks: {
      type: 'string',
      maxLength: 603,
    },
    //  SECTION VI - AUTHORIZATION, CERTIFICATION, AND SIGNATURE
    signature: {
      type: 'string',
    },
    signatureDate: schemaHelpers.getDefinition('date'),
    witnessSignature1: {
      type: 'object',
      signature: {
        maxLength: 38,
        type: 'string',
      },
      address: {
        type: 'string',
        maxLength: 34,
      },
    },
    witnessSignature2: {
      type: 'object',
      signature: {
        maxLength: 38,
        type: 'string',
      },
      address: {
        type: 'string',
        maxLength: 34,
      },
    },
    files: definitions.files,
  },
  // required: [],
};
export default schema;

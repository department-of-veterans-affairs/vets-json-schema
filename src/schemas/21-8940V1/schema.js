import definitions from '../../common/definitions';
// import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR INCREASED COMPENSATION BASED ON UNEMPLOYABILITY (21-8940)',
  type: 'object',
  definitions: {
    date: definitions.date,
    dateRange: definitions.dateRange,
    email: definitions.email,
    ssn: definitions.ssn,
    vaFileNumber: definitions.vaFileNumber,
    address: definitions.address,
    usaPhone: definitions.usaPhone,
    fullName: definitions.fullName,
    files: definitions.files,
  },
  properties: {
    // Section I Veteran's Information
    veteranFullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
        },
        middleinitial: {
          type: 'string',
        },
        last: {
          type: 'string',
        },
      },
    },
    veteranSocialSecurityNumber: { $ref: '#/definitions/ssn' },
    vaFileNumber: { $ref: '#/definitions/vaFileNumber' },
    dateOfBirth: {
      $ref: '#/definitions/date',
    },
    // no good address def for 2 character country code "US"
    // backend has a extract_country helper to get 2 letter country codes
    veteranAddress: { $ref: '#/definitions/address' },
    electronicCorrespondence: {
      type: 'boolean',
    },
    // may need some altering? email is 2 lines in the form
    // emailAddresses: {email1: "", email2: "", max length: 36? },
    email: {
      type: 'string',
      format: 'email',
    },
    veteranPhone: { $ref: '#/definitions/usaPhone' },
    internationalPhone: {
      type: 'string',
    },

    // Section II  DISABILITY AND MEDICAL TREATMENT
    listOfDisabilities: {
      type: 'string',
    },
    doctorsCareInLastYTD: {
      type: 'boolean',
    },
    doctorsCare: {
      type: 'array',
      items: 'object',
      properties: {
        doctorsTreatmentDates: {
          type: 'Array',
          items: 'object',
          properties: {
            $ref: '#/definitions/dateRange',
          },
        },
        nameAndAddressOfDoctor: {
          type: 'string',
        },
      },
    },
    hospitalsCare: {
      type: 'array',
      items: 'object',
      properties: {
        hospitalTreatmentDates: {
          type: 'Array',
          items: 'object',
          properties: {
            $ref: '#/definitions/dateRange',
          },
        },
        nameAndAddressOfHospitals: {
          type: 'string',
        },
      },
    },
    // SECTION III -  EMPLOYMENT STATEMENT
    disabilityAffectEmployFTDate: {
      $ref: '#/definitions/date',
    },
    lastWorkedFullTimeDate: {
      $ref: '#/definitions/date',
    },
    becameTooDisabledToWorkDate: {
      $ref: '#/definitions/date',
    },
    mostEarningsInAYear: {
      type: 'integer',
    },
    yearOfMostEarnings: {
      type: 'integer',
    },
    occupationDuringMostEarnings: {
      type: 'string',
    },
    previousEmployers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nameAndAddress: {
            type: 'string',
          },
          typeOfWork: {
            type: 'string',
          },
          hoursPerWeek: {
            type: 'integer',
          },
          datesOfEmployment: { $ref: '#/definitions/dateRange' },
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
    },
    past12MonthsEarnedIncome: {
      type: 'integer',
    },
    currentMonthlyEarnedIncome: {
      type: 'integer',
    },
    leftLastJobDueToDisability: {
      type: 'boolean',
    },
    expectDisabilityRetirement: {
      type: 'boolean',
    },
    receiveExpectWorkersCompensation: {
      type: 'boolean',
    },
    attemptedEmploy: {
      type: 'boolean',
    },
    appliedEmployers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nameAndAddress: {
            type: 'string',
          },
          typeOfWork: {
            type: 'string',
          },
          dateApplied: {
            $ref: '#/definitions/date',
          },
        },
      },
    },
    // SECTION IV - SCHOOLING AND OTHER TRAINING
    education: {
      type: 'object',
      properties: {
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
    },
    trainingPreDisabled: {
      type: 'boolean',
    },
    educationTrainingPreUnemployability: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        datesOfTraining: { $ref: '#/definitions/dateRange' },
      },
    },
    trainingPostUnemployment: {
      type: 'boolean',
    },
    educationTrainingPostUnemployability: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        datesOfTraining: { $ref: '#/definitions/dateRange' },
      },
    },
    //  SECTION V - REMARKS
    remarks: {
      type: 'string',
    },
    //  SECTION VI - AUTHORIZATION, CERTIFICATION, AND SIGNATURE
    statementOfTruthCertified: {
      type: 'boolean',
    },
    statementOfTruthSignature: {
      type: 'string',
    },
    signature: {
      type: 'string',
    },
    signatureDate: {
      $ref: '#/definitions/date',
    },
    witnessSignature1: {
      type: 'object',
      properties: {
        signature: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
      },
    },
    witnessSignature2: {
      type: 'object',
      properties: {
        signature: {
          type: 'string',
        },
        address: {
          type: 'string',
        },
      },
    },
    files: { $ref: '#/definitions/files' },
  },
  // required: [],
};
export default schema;

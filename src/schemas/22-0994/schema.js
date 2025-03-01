import { formProfileStates } from '../../common/constants';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR VETERAN EMPLOYMENT THROUGH TECHNOLOGY EDUCATION COURSES (VET TEC) HIGH TECHNOLOGY PROGRAM',
  type: 'object',
  definitions: {
    phone: definitions.usaPhone,
    date: definitions.date,
    fullName: {
      ...definitions.fullName,
      properties: {
        ...definitions.fullName.properties,
        first: {
          ...definitions.fullName.properties.first,
          ...definitions.rejectOnlyWhitespace,
        },
        last: {
          ...definitions.fullName.properties.last,
          ...definitions.rejectOnlyWhitespace,
        },
      },
    },
    ssn: definitions.ssn,
    bankAccount: definitions.bankAccount,
    gender: definitions.gender,
    email: {
      type: 'string',
      minLength: 6,
      maxLength: 80,
      pattern: '^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$',
    },
    address: {
      ...definitions.address,
      properties: {
        ...definitions.address.properties,
        street: {
          ...definitions.address.properties.street,
          ...definitions.rejectOnlyWhitespace,
        },
        street3: definitions.address.properties.street2,
        city: {
          ...definitions.address.properties.city,
          ...definitions.rejectOnlyWhitespace,
        },
      },
    },
    privacyAgreementAccepted: definitions.privacyAgreementAccepted,
  },
  properties: {
    applicantFullName: {
      $ref: '#/definitions/fullName',
    },
    applicantSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    mailingAddress: {
      $ref: '#/definitions/address',
    },
    applicantGender: {
      $ref: '#/definitions/gender',
    },
    dateOfBirth: {
      $ref: '#/definitions/date',
    },
    expectedReleaseDate: {
      $ref: '#/definitions/date',
    },
    expectedActiveDutyStatusChange: {
      type: 'boolean',
    },
    emailAddress: {
      $ref: '#/definitions/email',
    },
    mobilePhone: {
      $ref: '#/definitions/phone',
    },
    homePhone: {
      $ref: '#/definitions/phone',
    },
    appliedForVaEducationBenefits: {
      type: 'boolean',
    },
    activeDuty: {
      type: 'boolean',
    },
    activeDutyDuringVetTec: {
      type: 'boolean',
    },
    hasSelectedPrograms: {
      type: 'boolean',
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    prefillBankAccount: {
      type: 'object',
      properties: {
        bankAccountType: {
          type: 'string',
          enum: ['checking', 'savings'],
        },
        bankAccountNumber: {
          type: 'string',
        },
        bankRoutingNumber: {
          type: 'string',
        },
        bankName: {
          type: 'string',
        },
      },
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
            type: 'object',
            properties: {
              city: {
                type: 'string',
                maxLength: 30,
                ...definitions.rejectOnlyWhitespace,
              },
              state: {
                type: 'string',
                enum: formProfileStates.map(state => state.value),
                enumNames: formProfileStates.map(state => state.label),
              },
            },
          },
          plannedStartDate: {
            $ref: '#/definitions/date',
          },
        },
      },
    },
    pastHighTechnologyEmployment: {
      type: 'boolean',
    },
    currentHighTechnologyEmployment: {
      type: 'boolean',
    },
    highTechnologyEmploymentTypes: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['computerProgramming', 'dataProcessing', 'computerSoftware', 'informationSciences', 'mediaApplication'],
      },
    },
    currentSalary: {
      type: 'string',
      enum: ['lessThanTwenty', 'twentyToThirtyFive', 'thirtyFiveToFifty', 'fiftyToSeventyFive', 'moreThanSeventyFive'],
    },
    highestLevelofEducation: {
      type: 'string',
      enum: [
        'some_high_school',
        'high_school_diploma_or_GED',
        'some_college',
        'associates_degree',
        'bachelors_degree',
        'masters_degree',
        'doctoral_degree',
        'other',
      ],
      enumNames: [
        'Some high school',
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
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: [
    'privacyAgreementAccepted',
    'applicantFullName',
    'applicantSocialSecurityNumber',
    'dateOfBirth',
    'appliedForVaEducationBenefits',
    'activeDuty',
    'mobilePhone',
    'emailAddress',
  ],
};

export default schema;

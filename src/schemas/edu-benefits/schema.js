import constants from '../../common/constants';
import _ from 'lodash';
import definitions from '../../common/definitions';

const benefits = ['chapter33', 'chapter30', 'chapter1606', 'chapter32'];

export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Education Benefits Claim',
  type: 'object',
  definitions: _.merge({
    year: {
      type: 'integer',
      minimum: 1900
    }
  }, _.pick(definitions, [
    'address',
    'fullName',
    'phone',
    'ssn',
    'school',
    'bankAccount',
    'serviceBefore1977',
    'date',
    'dateRange',
    'educationType',
    'preferredContactMethod',
    'privacyAgreementAccepted',
    'gender',
    'postHighSchoolTrainings'
  ])),
  additionalProperties: false,
  properties: {
    chapter33: {
      type: 'boolean'
    },
    chapter30: {
      type: 'boolean'
    },
    chapter1606: {
      type: 'boolean'
    },
    chapter32: {
      type: 'boolean'
    },
    benefitsRelinquished: {
      type: 'string',
      'enum': ['chapter1607', 'unknown', ..._.without(benefits, 'chapter33', 'chapter32')]
    },
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    gender: {
      $ref: '#/definitions/gender'
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date'
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    homePhone: {
      $ref: '#/definitions/phone'
    },
    mobilePhone: {
      $ref: '#/definitions/phone'
    },
    preferredContactMethod: {
      $ref: '#/definitions/preferredContactMethod'
    },
    secondaryContact: {
      type: 'object',
      properties: {
        fullName: {
          type: 'string'
        },
        sameAddress: {
          type: 'boolean'
        },
        address: {
          $ref: '#/definitions/address'
        },
        phone: {
          $ref: '#/definitions/phone'
        },
      }
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount'
    },
    school: {
      $ref: '#/definitions/school'
    },
    educationStartDate: {
      $ref: '#/definitions/date'
    },
    educationObjective: {
      type: 'string'
    },
    educationType: {
      $ref: '#/definitions/educationType'
    },
    currentlyActiveDuty: {
      type: 'object',
      properties: {
        yes: {
          type: 'boolean'
        },
        onTerminalLeave: {
          type: 'boolean'
        },
        nonVaAssistance: {
          type: 'boolean'
        }
      }
    },
    highSchoolOrGedCompletionDate: {
      $ref: '#/definitions/date'
    },
    faaFlightCertificatesInformation: {
      type: 'string'
    },
    serviceAcademyGraduationYear: {
      $ref: '#/definitions/year'
    },
    seniorRotc: {
      type: 'object',
      properties: {
        commissionYear: {
          $ref: '#/definitions/year'
        },
        rotcScholarshipAmounts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              year: {
                type: 'integer'
              },
              amount: {
                type: 'number'
              },
            }
          }
        }
      },
      required: ['rotcScholarshipAmounts']
    },
    seniorRotcScholarshipProgram: {
      type: 'boolean'
    },
    civilianBenefitsAssistance: {
      type: 'boolean'
    },
    additionalContributions: {
      type: 'boolean'
    },
    activeDutyKicker: {
      type: 'boolean'
    },
    reserveKicker: {
      type: 'boolean'
    },
    activeDutyRepayingPeriod: {
      $ref: '#/definitions/dateRange'
    },
    serviceBefore1977: {
      $ref: '#/definitions/serviceBefore1977'
    },
    toursOfDuty: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dateRange: {
            $ref: '#/definitions/dateRange'
          },
          serviceBranch: {
            type: 'string'
          },
          serviceStatus: {
            type: 'string'
          },
          applyPeriodToSelected: {
            type: 'boolean'
          },
          benefitsToApplyTo: {
            type: 'string'
          },
        },
        required: ['dateRange', 'serviceBranch']
      }
    },
    postHighSchoolTrainings: {
      $ref: '#/definitions/postHighSchoolTrainings'
    },
    nonMilitaryJobs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          months: {
            type: 'number'
          },
          licenseOrRating: {
            type: 'string'
          },
          postMilitaryJob: {
            type: 'boolean'
          },
        }
      }
    },
    applyingUsingOwnBenefits: {
      type: "boolean"
    },
    benefitsRelinquishedDate: {
      '$ref': '#/definitions/date'
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted'
    }
  },
  required: ['privacyAgreementAccepted']
};

import constants from '../common/constants';
import _ from 'lodash';
import definitions from '../../src/common/definitions';

const benefits = ['chapter33', 'chapter30', 'chapter1606', 'chapter32'];

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Education Benefits Claim',
  type: 'object',
  definitions: {
    address: definitions.address,
    year: {
      type: 'integer',
      minimum: 1900
    },
    date: {
      pattern: '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
      type: 'string'
    },
    dateRange: {
      type: 'object',
      properties: {
        from: {
          $ref: '#/definitions/date'
        },
        to: {
          oneOf: [
            {
              $ref: '#/definitions/date'
            },
            {
              type: 'string',
              enum: ['present']
            }
          ]
        }
      }
    },
    fullName: definitions.fullName,
    phone: {
      type: 'string',
      minLength: 10
    },
    ssn: {
      type: 'string',
      pattern: '^[0-9]{9}$'
    }
  },
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
      type: 'string',
      'enum': ['M', 'F']
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
      type: 'string',
      enum: ['mail', 'email', 'phone']
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
      type: 'object',
      properties: {
        accountType: {
          type: 'string',
          'enum': ['checking', 'savings']
        },
        routingNumber: {
          type: 'string',
          pattern: '^\\d{9}$'
        },
        accountNumber: {
          type: 'string'
        }
      }
    },
    school: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        address: {
          $ref: '#/definitions/address'
        }
      }
    },
    educationStartDate: {
      $ref: '#/definitions/date'
    },
    educationObjective: {
      type: 'string'
    },
    educationType: {
      type: 'string',
      enum: ['college', 'correspondence', 'apprenticeship', 'flightTraining', 'testReimbursement', 'licensingReimbursement', 'tuitionTopUp']
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
      type: 'object',
      properties: {
        married: {
          type: 'boolean'
        },
        haveDependents: {
          type: 'boolean'
        },
        parentDependent: {
          type: 'boolean'
        }
      },
      required: ['married', 'haveDependents', 'parentDependent']
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
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          city: {
            type: 'string'
          },
          state: {
            type: 'string',
            enum: _.map(constants.states.USA, (stateData) => { return stateData.value })
          },
          dateRange: {
            $ref: '#/definitions/dateRange'
          },
          hours: {
            type: 'number'
          },
          hoursType: {
            type: 'string',
            'enum': ['semester', 'quarter', 'clock']
          },
          degreeReceived: {
            type: 'string'
          },
          major: {
            type: 'string'
          },
        }
      }
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
      type: "boolean",
      enum: [true]
    }
  },
  required: ['privacyAgreementAccepted']
};

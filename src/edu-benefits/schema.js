import constants from '../common/constants';
import _ from 'lodash';

const countries = constants.countries.map(object => object.value);
const countriesWithAnyState = Object.keys(constants.states).filter(x => _.includes(countries, x));
const benefits = ['chapter33', 'chapter30', 'chapter1606', 'chapter32'];
const countryStateProperites = _.map(constants.states, (value, key) => ({
  properties: {
    country: {
      'enum': [key]
    },
    state: {
      'enum': value.map(x => x.value)
    },
    zipcode: {
      type: 'string',
      maxLength: 50
    }
  }
}));
countryStateProperites.push(
  {
    properties: {
      country: {
        not: {
          'enum': countriesWithAnyState
        }
      },
      provinceCode: {
        type: 'string',
        maxLength: 51
      },
      postalCode: {
        type: 'string',
        maxLength: 51
      },
    },
  });

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Education Benefits Claim',
  type: 'object',
  definitions: {
    address: {
      type: 'object',
      oneOf: countryStateProperites,
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 51
        }
      },
      required: [
        'street',
        'city',
        'country'
      ]
    },
    year: {
      type: 'integer',
      minimum: 1900
    },
    date: {
      format: 'date',
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
      },
      required: ['from', 'to']
    },
    fullName: {
      type: 'object',
      properties: {
        salutation: {
          type: 'string'
        },
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30
        },
        middle: {
          type: 'string'
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 30
        },
        suffix: {
          'enum': constants.suffixes
        },
      },
      required: [
        'first',
        'last'
      ]
    },
    phone: {
      type: 'string',
      pattern: '^[0-9]{10}$'
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
    fullName: {
      $ref: '#/definitions/fullName'
    },
    gender: {
      type: 'string',
      'enum': ['M', 'F']
    },
    birthday: {
      $ref: '#/definitions/date'
    },
    socialSecurityNumber: {
      $ref: '#/definitions/ssn'
    },
    address: {
      $ref: '#/definitions/address'
    },
    email: {
      type: 'string',
      format: 'email'
    },
    phone: {
      $ref: '#/definitions/phone'
    },
    mobile: {
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
          $ref: '#/definitions/fullName'
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
        bankName: {
          type: 'string'
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
        },
        startDate: {
          $ref: '#/definitions/date'
        },
        educationObjective: {
          type: 'string'
        }
      },
      required: ['name']
    },
    educationType: {
      type: 'object',
      properties: {
        college: {
          type: 'boolean'
        },
        correspondence: {
          type: 'boolean'
        },
        apprenticeship: {
          type: 'boolean'
        },
        flightTraining: {
          type: 'boolean'
        },
        testReimbursement: {
          type: 'boolean'
        },
        licensingReimbursement: {
          type: 'boolean'
        },
        tuitionTopUp: {
          type: 'boolean'
        }
      }
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
            },
            required: ['year', 'amount']
          }
        }
      },
      required: ['commissionYear', 'rotcScholarshipAmounts']
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
    remarks: {
      type: 'string'
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
            // TODO enum for this field?
          },
          serviceStatus: {
            type: 'string'
          },
          benefitsToApplyTo: {
            type: 'array',
            items: {
              type: 'string',
              'enum': benefits
            }
          },
          involuntarilyCalledToDuty: {
            type: 'boolean'
          }
        },
        required: ['dateRange', 'serviceBranch', 'serviceStatus', 'involuntarilyCalledToDuty']
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
            type: 'string'
          },
          dateRange: {
            $ref: '#/definitions/dateRange'
          },
          hours: {
            type: 'integer'
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
        },
        required: ['name', 'dateRange', 'city']
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
            type: 'integer'
          },
          licenseOrRating: {
            type: 'string'
          },
          postMilitaryJob: {
            type: 'boolean'
          },
        },
        required: ['name', 'months', 'postMilitaryJob']
      }
    }
  }
};

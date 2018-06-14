import constants from './constants';
import _ from 'lodash';
import schemaHelpers from './schema-helpers';

const fullName = {
  type: 'object',
  properties: {
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
      type: 'string',
      'enum': constants.suffixes
    },
  },
  required: [
    'first',
    'last'
  ]
};

const rejectOnlyWhitespace = {
  pattern: '^.*\\S.*'
};

const usaPostalCode = {
  type: 'string',
  anyOf: [
    {
      pattern: '^\\d{5}$'
    },
    {
      pattern: '^\\d{5}-\\d{4}$'
    }
  ]
};

const address = (() => {
  const countries = constants.countries.map(object => object.value);
  const countriesWithAnyState = Object.keys(constants.states).filter(x => _.includes(countries, x));
  const countryStateProperties = _.map(constants.states, (value, key) => ({
    properties: {
      country: {
        type: 'string',
        'enum': [key]
      },
      state: {
        type: 'string',
        'enum': value.map(x => x.value)
      },
      postalCode: {
        type: 'string',
        maxLength: 10
      }
    }
  }));
  countryStateProperties.push({
    properties: {
      country: {
        not: {
          type: 'string',
          'enum': countriesWithAnyState
        }
      },
      state: {
        type: 'string',
        maxLength: 51
      },
      postalCode: {
        type: 'string',
        maxLength: 51
      },
    },
  });

  return {
    type: 'object',
    oneOf: countryStateProperties,
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
    }
  };
})();

let centralMailAddress = _.cloneDeep(address);
centralMailAddress.required = ['postalCode'];
for (let i = 0, len = centralMailAddress.oneOf.length; i < len; i++) {
  let properties = centralMailAddress.oneOf[i].properties;

  if (properties.country.enum && properties.country.enum[0] === 'USA') {
    properties.postalCode = usaPostalCode;
  }
}

const phone = {
  type: 'string',
  minLength: 10
};

const ssn = {
  type: 'string',
  pattern: '^[0-9]{9}$'
};

const school = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    address: {
      $ref: '#/definitions/address'
    }
  }
};

const bankAccount = {
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
};

const serviceBefore1977 = {
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
};

const dateRange = {
  type: 'object',
  properties: {
    from: {
      $ref: '#/definitions/date'
    },
    to: {
      $ref: '#/definitions/date'
    }
  }
};

const date = {
  pattern: '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
  type: 'string'
};

const educationType = {
  type: 'string',
  enum: ['college', 'correspondence', 'apprenticeship', 'flightTraining', 'testReimbursement', 'licensingReimbursement', 'tuitionTopUp']
};

const preferredContactMethod = {
  type: 'string',
  enum: [
    'mail',
    'email',
    'phone'
  ]
};

const privacyAgreementAccepted = {
  type: "boolean",
  enum: [true]
};

const gender = {
  type: 'string',
  'enum': ['F', 'M']
};

const postHighSchoolTrainings = {
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
        enum: constants.usaStates
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
};

const nonMilitaryJobs = {
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
};

const secondaryContact = {
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
};

const vaFileNumber = {
  type: 'string',
  pattern: '^[cC]{0,1}\\d{7,9}$'
};

const centralMailVaFile = {
  type: 'string',
  pattern: '^\\d{8,9}$'
};

const relationship = {
  type: 'string',
  'enum': ['spouse', 'child']
};

const relationshipAndChildName = {
  type: 'object',
  properties: {
    relationship: {
      type: 'string',
      enum: relationship.enum.concat(['self'])
    },
    childFullName: schemaHelpers.getDefinition('fullName')
  }
};

const netWorthAccount = {
  type: 'object',
  properties: {
    amount: {
      type: 'integer'
    },
    interest: {
      type: 'boolean'
    }
  }
};

const toursOfDuty = {
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
  },
};

const educationProgram = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    address: {
      $ref: '#/definitions/address'
    },
    educationType: {
      $ref: '#/definitions/educationType'
    }
  }
};

const currentlyActiveDuty = {
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
};

const bankAccountChange = {
  type: 'string',
  enum: ['noChange', 'startUpdate', 'stop']
};

const maritalStatus = {
  type: 'string',
  'enum': constants.maritalStatuses
};

const otherIncome = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    amount: {
      type: 'integer'
    }
  }
};

const marriages = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      dateOfMarriage: {
        $ref: '#/definitions/date'
      },
      locationOfMarriage: {
        type: 'string'
      },
      otherExplanation: {
        type: 'string'
      },
      marriageType: {
        type: 'string'
      },
      spouseFullName: {
        $ref: '#/definitions/fullName'
      },
      dateOfSeparation: {
        $ref: '#/definitions/date'
      },
      locationOfSeparation: {
        type: 'string'
      },
      reasonForSeparation: {
        type: 'string'
      }
    }
  }
};

const usaPhone = {
  type: 'string',
  pattern: '^\\d{10}$'
};

const files = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      size: {
        type: 'integer'
      },
      confirmationCode: {
        type: 'string'
      }
    }
  }
};

const dischargeType = {
  type: 'string',
  'enum': constants.dischargeTypes.map(option => option.value)
};

const serviceHistory = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      serviceBranch: {
        type: 'string'
      },
      dateRange: {
        $ref: '#/definitions/dateRange'
      },
      dischargeType
    }
  }
};

const requiredServiceHistory = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['serviceBranch', 'dischargeType'],
    properties: {
      serviceBranch: {
        type: 'string'
      },
      dateRange: {
        type: 'object',
        required: ['from', 'to'],
        properties: {
          from: {
            $ref: '#/definitions/date'
          },
          to: {
            $ref: '#/definitions/date'
          }
        }
      },
      dischargeType
    }
  }
};

const year = {
  type: 'integer',
  minimum: 1900
};

export default {
  usaPhone,
  fullName,
  otherIncome,
  address,
  phone,
  ssn,
  school,
  centralMailVaFile,
  bankAccount,
  serviceBefore1977,
  dateRange,
  date,
  rejectOnlyWhitespace,
  dischargeType,
  educationType,
  preferredContactMethod,
  privacyAgreementAccepted,
  gender,
  postHighSchoolTrainings,
  nonMilitaryJobs,
  secondaryContact,
  vaFileNumber,
  relationship,
  toursOfDuty,
  educationProgram,
  currentlyActiveDuty,
  bankAccountChange,
  maritalStatus,
  netWorthAccount,
  relationshipAndChildName,
  marriages,
  files,
  requiredServiceHistory,
  serviceHistory,
  usaPostalCode,
  centralMailAddress,
  year
};

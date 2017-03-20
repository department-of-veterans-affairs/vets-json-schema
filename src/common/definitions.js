import constants from './constants';
import _ from 'lodash';

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

const address = (() => {
  const countries = constants.countries.map(object => object.value);
  const countriesWithAnyState = Object.keys(constants.states).filter(x => _.includes(countries, x));
  const countryStateProperites = _.map(constants.states, (value, key) => ({
    properties: {
      country: {
        'enum': [key]
      },
      state: {
        'enum': value.map(x => x.value)
      },
      postalCode: {
        type: 'string',
        maxLength: 10
      }
    }
  }));
  countryStateProperites.push({
    properties: {
      country: {
        not: {
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
    }
  };
})();

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
  pattern: '^[cC]{0,1}\\d{8}$'
};

const relationship = {
  type: 'string',
  'enum': ['spouse', 'child']
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

export default {
  fullName,
  address,
  phone,
  ssn,
  school,
  bankAccount,
  serviceBefore1977,
  dateRange,
  date,
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
  currentlyActiveDuty
};

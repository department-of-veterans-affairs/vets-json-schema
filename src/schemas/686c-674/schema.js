import {
  countries, 
  states50AndDC, 
  suffixes,
} from '../../common/constants';

// patterns
const textOnlyPattern = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*0-9]+$';
const numberAndDashPattern = '^[0-9]*[-]*[0-9]*[-]*[0-9]*$';
const datePattern =
  '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$';

const phonePattern = '^[0-9]{10}$';
const currencyAmountPattern = '^\\d+(\\.\\d{1,2})?$';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-686C & 21-674)',
  type: 'object',
  definitions: {
    genericLocation: {
      type: 'object',
      required: ['city', 'state'],
      properties: {
        state: {
          type: 'string',
          maxLength: 30,
          pattern: textOnlyPattern,
        },
        city: {
          type: 'string',
          maxLength: 30,
          pattern: textOnlyPattern,
        },
      },
    },
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
          pattern: textOnlyPattern,
        },
        middle: {
          type: 'string',
          maxLength: 20,
          pattern: textOnlyPattern,
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
          pattern: textOnlyPattern,
        },
        suffix: {
          type: 'string',
          enum: suffixes,
        },
      },
      required: ['first', 'last'],
    },
    genericTextInput: {
      type: 'string',
      maxLength: 50,
    },
    genericTrueFalse: {
      type: 'boolean',
    },
    genericNumberAndDashInput: {
      type: 'string',
      maxLength: 50,
      minLength: 4,
      pattern: numberAndDashPattern,
    },
    genericUSAStateDropdown: {
      type: 'string',
      enum: states50AndDC.map (state => state.value),
      default: states50AndDC.map (state => state.label),
    },
    countryDropdown: {
      type: 'string',
      enum: countries.map (country => country.label),
    },
    date: {
      type: 'string',
      pattern: datePattern,
    },
    emailInput: {
      type: 'string',
      format: 'email',
    },
    phoneInput: {
      type: 'string',
      pattern: phonePattern,
    },
    currencyInput: {
      type: 'string',
      pattern: currencyAmountPattern,
    },
    fileSchema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {type: 'string'},
          size: {type: 'integer'},
          confirmationCode: {type: 'string'},
        },
      },
    },
    addressSchema: {
      type: 'object',
      properties: {
        'view:livesOnMilitaryBase': {
          type: 'boolean',
        },
        'view:livesOnMilitaryBaseInfo': {
          type: 'object',
          properties: {},
        },
        countryName: {
          type: 'string',
          enum: countries.map (country => country.label),
        },
        addressLine1: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine2: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        addressLine3: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          pattern: '^.*\\S.*',
        },
        city: {
          type: 'string',
        },
        stateCode: {
          type: 'string',
          enum: states50AndDC.map (state => state.value),
          enumNames: states50AndDC.map (state => state.label),
        },
        province: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
          pattern: '^\\d{5}$',
        },
        internationalPostalCode: {
          type: 'string',
        },
      },
    },
  },
  properties: {
    optionSelection: {
      type: 'object',
      'view:selectable686Options': {
        type: 'object',
        properties: {
          addChild: {type: 'boolean', default: false},
          addSpouse: {type: 'boolean', default: false},
          reportDivorce: {type: 'boolean', default: false},
          reportDeath: {type: 'boolean', default: false},
          reportStepchildNotInHousehold: {type: 'boolean', default: false},
          reportMarriageOfChildUnder18: {type: 'boolean', default: false},
          reportChild18OrOlderIsNotAttendingSchool: {
            type: 'boolean',
            default: false,
          },
          report674: {
            type: 'boolean',
            default: false,
          },
        },
      },
    },

    veteranInformation: {
      type: 'object',
      properties: {
        veteranInformation: {
          type: 'object',
          properties: {
            first: {
              $ref: '#/definitions/genericTextInput',
            },
            middle: {
              $ref: '#/definitions/genericTextInput',
            },
            last: {
              $ref: '#/definitions/genericTextInput',
            },
            suffix: {
              type: 'string',
              enum: suffixes,
            },
            ssn: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            vaFileNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            serviceNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            birthDate: {
              $ref: '#/definitions/date',
            },
          },
        },
      },
      veteranAddress: {
        type: 'object',
        properties: {
          veteranAddress: {
            $ref: '#/definitions/addressSchema',
          },
          phoneNumber: {
            $ref: '#/definitions/phoneInput',
          },
          emailAddress: {
            $ref: '#/definitions/emailInput',
          },
        },
      },
    },

    addChild: {
      type: 'object',
      properties: {
        addChildInformation: {
          type: 'object',
          properties: {
            childrenToAdd: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                properties: {
                  first: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  middle: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  last: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  suffix: {
                    type: 'string',
                    enum: suffixes,
                  },
                  ssn: {
                    $ref: '#/definitions/genericNumberAndDashInput',
                  },
                  birthDate: {
                    $ref: '#/definitions/date',
                  },
                },
              },
            },
          },
        },
      },

      addChildPlaceOfBirth: {
        type: 'object',
        properties: {
          childrenToAdd: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                childPlaceOfBirth: {
                  type: 'object',
                  properties: {
                    state: {
                      $ref: '#/definitions/genericTextInput',
                    },
                    city: {
                      $ref: '#/definitions/genericTextInput',
                    },
                  },
                },
                childStatus: {
                  type: 'object',
                  properties: {
                    biological: {
                      $ref: '#/definitions/genericTrueFalse',
                    },
                    adopted: {
                      $ref: '#/definitions/genericTrueFalse',
                    },
                    notCapable: {
                      $ref: '#/definitions/genericTrueFalse',
                    },
                    stepchild: {
                      $ref: '#/definitions/genericTrueFalse',
                    },
                    dateBecameDependent: {
                      $ref: '#/definitions/date',
                    },
                  },
                },
                'view:childStatusInformation': {
                  type: 'object',
                  properties: {},
                },
                childPreviouslyMarried: {
                  type: 'string',
                  enum: ['Yes', 'No'],
                  default: 'No',
                },

                childPreviousMarriageDetails: {
                  type: 'object',
                  properties: {
                    dateMarriageEnded: {
                      $ref: '#/definitions/date',
                    },
                    reasonMarriageEnded: {
                      type: 'string',
                      enum: ['Divorce', 'Death', 'Annulment', 'Other'],
                      default: 'Divorce',
                    },
                    otherReasonMarriageEnded: {
                      $ref: '#/definitions/genericTextInput',
                    },
                  },
                },
              },
            },
          },
        },
      },

      addChildAdditionalInformation: {
        type: 'object',
        properties: {
          childrenToAdd: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                doesChildLiveWithYou: {
                  type: 'boolean',
                },
                childAddressInfo: {
                  $ref: '#/definitions/addressSchema',
                },
              },
            },
          },
        },
      },

      childAdditionalEvidence: {
        type: 'object',
        properties: {
          'view:additionalEvidenceDescription': {
            type: 'object',
            properties: {},
          },
          supportingDocuments: {
            $ref: '#/definitions/fileSchema',
          },
        },
      },
    },

    addSpouse: {
      type: 'object',
      properties: {
        spouseNameInformation: {
          type: 'object',
          properties: {
            spouseFullName: '#/definitions/fullName',
            spouseSSN: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            spouseDOB: {
              $ref: '#/definitions/date',
            },
            isSpouseVeteran: {
              type: 'boolean',
            },
            spouseVAFileNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            spouseServiceNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
          },
        },
      },

      currentMarriageInformation: {
        type: 'object',
        properties: {
          dateOfMarriage: {
            $ref: '#/definitions/date',
          },
          locationOfMarriage: {
            $ref: '#/definitions/genericLocation',
          },
          marriageType: {
            type: 'string',
            enum: ['CEREMONIAL', 'COMMON-LAW', 'TRIBAL', 'PROXY', 'OTHER'],
            enumNames: ['Ceremonial', 'Common-law', 'Tribal', 'Proxy', 'Other'],
          },
          marriageTypeOther: {
            $ref: '#/definitions/genericTextInput',
          },
          'view:marriageTypeInformation': {
            type: 'object',
            properties: {},
          },
        },
      },

      doesLiveWithSpouse: {
        type: 'object',
        properties: {
          spouseDoesLiveWithVeteran: {
            type: 'boolean',
          },
          currentSpouseReasonForSeparation: {
            $ref: '#/definitions/genericTextInput',
          },
          currentSpouseAddress: {
            $ref: '#/definitions/addressSchema',
          },
        },
      },

      spouseMarriageHistory: {
        type: 'object',
        properties: {
          spouseWasMarriedBefore: {
            type: 'boolean',
          },
          spouseMarriageHistory: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                formerSpouseName: '#/definitions/fullName',
              },
            },
          },
        },
      },

      spouseMarriageHistoryDetails: {
        type: 'object',
        properties: {
          spouseMarriageHistory: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                marriageStartDate: {
                  $ref: '#/definitions/date',
                },
                marriageStartLocation: {
                  $ref: '#/definitions/genericLocation',
                },
                reasonMarriageEnded: {
                  type: 'string',
                  enum: ['DIVORCE', 'DEATH', 'ANNULMENT', 'OTHER'],
                  enumNames: ['Divorce', 'Death', 'Annulment', 'Other'],
                },
                reasonMarriageEndedOther: {
                  $ref: '#/definitions/genericTextInput',
                },
                marriageEndDate: {
                  $ref: '#/definitions/date',
                },
                marriageEndLocation: {
                  $ref: '#/definitions/genericLocation',
                },
              },
            },
          },
        },
      },

      veteranMarriageHistory: {
        type: 'object',
        properties: {
          veteranWasMarriedBefore: {
            type: 'boolean',
          },
          veteranMarriageHistory: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                formerSpouseName: '#/definitions/fullName',
              },
            },
          },
        },
      },

      veteranMarriageHistoryDetails: {
        type: 'object',
        properties: {
          veteranMarriageHistory: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                marriageStartDate: {
                  $ref: '#/definitions/date',
                },
                marriageStartLocation: {
                  $ref: '#/definitions/genericLocation',
                },
                reasonMarriageEnded: {
                  type: 'string',
                  enum: ['DIVORCE', 'DEATH', 'ANNULMENT', 'OTHER'],
                  enumNames: ['Divorce', 'Death', 'Annulment', 'Other'],
                },
                reasonMarriageEndedOther: {
                  $ref: '#/definitions/genericTextInput',
                },
                marriageEndDate: {
                  $ref: '#/definitions/date',
                },
                marriageEndLocation: {
                  $ref: '#/definitions/genericLocation',
                },
              },
            },
          },
        },
      },

      marriageAdditionalEvidence: {
        type: 'object',
        properties: {
          'view:additionalEvidenceDescription': {
            type: 'object',
            properties: {},
          },
          supportingDocuments: {
            $ref: '#/definitions/fileSchema',
          },
        },
      },
    },

    reportDivorce: {
      type: 'object',
      properties: {
        formerSpouseName: '#/definitions/fullName',
        dateOfDivorce: {
          $ref: '#/definitions/date',
        },
        locationOfDivorce: {
          $ref: '#/definitions/genericLocation',
        },
        isMarriageAnnulledOrVoid: {
          $ref: '#/definitions/genericTrueFalse',
        },
        explanationOfAnnullmentOrVoid: {
          type: 'string',
          maxLength: 500,
          pattern: '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$',
        },
      },
    },

    deceasedDependents: {
      type: 'object',
      properties: {
        dependentInformation: {
          type: 'object',
          properties: {
            deaths: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                properties: {
                  fullName: '#/definitions/fullName',
                  dependentType: {
                    type: 'string',
                    enum: ['SPOUSE', 'DEPENDENT_PARENT', 'CHILD'],
                    enumNames: ['Spouse', 'Dependent Parent', 'Child'],
                  },
                  childStatus: {
                    type: 'object',
                    properties: {
                      childUnder18: {
                        $ref: '#/definitions/genericTrueFalse',
                      },
                      stepChild: {
                        $ref: '#/definitions/genericTrueFalse',
                      },
                      adopted: {
                        $ref: '#/definitions/genericTrueFalse',
                      },
                      disabled: {
                        $ref: '#/definitions/genericTrueFalse',
                      },
                      childOver18InSchool: {
                        $ref: '#/definitions/genericTrueFalse',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      dependentAdditionalInformation: {
        type: 'object',
        properties: {
          deaths: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                deceasedDateOfDeath: {
                  $ref: '#/definitions/date',
                },
                deceasedLocationOfDeath: {
                  $ref: '#/definitions/genericLocation',
                },
              },
            },
          },
        },
      },
    },

    reportChildMarriage: {
      type: 'object',
      properties: {
        marriedChildName: '#/definitions/fullName',
        dateChildMarried: {
          $ref: '#/definitions/date',
        },
      },
    },

    reportChildStoppedAttendingSchool: {
      type: 'object',
      properties: {
        childNoLongerAtSchoolName: '#/definitions/fullName',
        dateChildLeftSchool: {
          $ref: '#/definitions/date',
        },
      },
    },

    reportStepchildNotInHousehold: {
      type: 'object',
      properties: {
        stepchildren: {
          type: 'object',
          properties: {
            stepChildren: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                properties: {
                  first: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  middle: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  last: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  suffix: {
                    type: 'string',
                    enum: suffixes,
                  },
                },
              },
            },
          },
        },
      },

      stepchildInformation: {
        type: 'object',
        properties: {
          stepChildren: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              properties: {
                stillSupportingStepchild: {
                  type: 'boolean',
                  default: false,
                },
                stepchildLivingExpensesPaid: {
                  type: 'string',
                  enum: ['More than half', 'Half', 'Less than half'],
                  default: 'More than half',
                },
                whoDoesTheStepchildLiveWith: {
                  type: 'object',
                  properties: {
                    first: {
                      $ref: '#/definitions/genericTextInput',
                    },
                    middle: {
                      $ref: '#/definitions/genericTextInput',
                    },
                    last: {
                      $ref: '#/definitions/genericTextInput',
                    },
                  },
                },
                stepchildAddress: {
                  $ref: '#/definitions/addressSchema',
                },
              },
            },
          },
        },
      },
    },

    report674: {
      type: 'object',
      properties: {
        studentNameAndSSN: {
          type: 'object',
          properties: {
            'view:674Information': {
              type: 'object',
              properties: {},
            },
            studentFullName: '#/definitions/fullName',
            studentSSN: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            studentDOB: {
              $ref: '#/definitions/date',
            },
          },
        },

        studentAddressMarriageTuition: {
          type: 'object',
          properties: {
            studentAddress: {
              $ref: '#/definitions/addressSchema',
            },
            studentWasMarried: {
              type: 'boolean',
            },
            marriageDate: {
              $ref: '#/definitions/date',
            },
            tuitionIsPaidByGovAgency: {
              type: 'boolean',
            },
            agencyName: {
              $ref: '#/definitions/genericTextInput',
            },
            datePaymentsBegan: {
              $ref: '#/definitions/date',
            },
          },
        },

        studentSchoolAddress: {
          type: 'object',
          properties: {
            schoolInformation: {
              type: 'object',
              properties: {
                schoolName: {
                  $ref: '#/definitions/genericTextInput',
                },
                trainingProgram: {
                  $ref: '#/definitions/genericTextInput',
                },
                schoolAddress: {
                  $ref: '#/definitions/addressSchema',
                },
              },
            },
          },
        },

        studentTermDates: {
          type: 'object',
          properties: {
            termDates: {
              type: 'object',
              properties: {
                officialSchoolStartDate: {
                  $ref: '#/definitions/date',
                },
                expectedStudentStartDate: {
                  $ref: '#/definitions/date',
                },
                expectedGraduationDate: {
                  $ref: '#/definitions/date',
                },
              },
            },
            programInformation: {
              type: 'object',
              properties: {
                studentIsEnrolledFullTime: {
                  type: 'boolean',
                },
                courseOfStudy: {
                  $ref: '#/definitions/genericTextInput',
                },
                classesPerWeek: {
                  type: 'number',
                },
                hoursPerWeek: {
                  type: 'number',
                },
              },
            },
          },
        },

        studentLastTerm: {
          type: 'object',
          properties: {
            studentDidAttendSchoolLastTerm: {
              type: 'boolean',
            },
            lastTermSchoolInformation: {
              type: 'object',
              properties: {
                schoolName: {
                  $ref: '#/definitions/genericTextInput',
                },
                schoolAddress: {
                  $ref: '#/definitions/addressSchema',
                },
                dateTermBegan: {
                  $ref: '#/definitions/date',
                },
                dateTermEnded: {
                  $ref: '#/definitions/date',
                },
                classesPerWeek: {
                  type: 'number',
                },
                hoursPerWeek: {
                  type: 'number',
                },
              },
            },
          },
        },

        studentIncomeInformation: {
          type: 'object',
          properties: {
            studentDoesEarnIncome: {
              type: 'boolean',
            },
            studentEarningsFromSchoolYear: {
              type: 'object',
              properties: {
                earningsFromAllEmployment: {
                  $ref: '#/definitions/currencyInput',
                },
                annualSocialSecurityPayments: {
                  $ref: '#/definitions/currencyInput',
                },
                otherAnnuitiesIncome: {
                  $ref: '#/definitions/currencyInput',
                },
                allOtherIncome: {
                  $ref: '#/definitions/currencyInput',
                },
              },
            },
            studentWillEarnIncomeNextYear: {
              type: 'boolean',
            },
            studentExpectedEarningsNextYear: {
              type: 'object',
              properties: {
                earningsFromAllEmployment: {
                  $ref: '#/definitions/currencyInput',
                },
                annualSocialSecurityPayments: {
                  $ref: '#/definitions/currencyInput',
                },
                otherAnnuitiesIncome: {
                  $ref: '#/definitions/currencyInput',
                },
                allOtherIncome: {
                  $ref: '#/definitions/currencyInput',
                },
              },
            },
          },
        },

        studentNetworthInformation: {
          type: 'object',
          properties: {
            studentDoesHaveNetworth: {
              type: 'boolean',
            },
            networthInformation: {
              type: 'object',
              properties: {
                savings: {
                  $ref: '#/definitions/currencyInput',
                },
                securities: {
                  $ref: '#/definitions/currencyInput',
                },
                realEstate: {
                  $ref: '#/definitions/currencyInput',
                },
                otherAssets: {
                  $ref: '#/definitions/currencyInput',
                },
                remarks: {
                  type: 'string',
                  maxLength: 500,
                  pattern: '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$',
                },
              },
            },
          },
        },
      },
    },
  },
};

export default schema;

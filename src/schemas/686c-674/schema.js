import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import { countries, states50AndDC } from '../../common/constants';
import commonDefinitions from '../../common/definitions';

// patterns
const textOnlyPattern = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*0-9]+$';
const numberAndDashPattern = '^[0-9]*[-]*[0-9]*[-]*[0-9]*$';

const currencyAmountPattern = '^\\d+(\\.\\d{1,2})?$';

let definitions = cloneDeep(commonDefinitions);
definitions = pick(definitions, 'fullName', 'phone', 'date', 'email', 'files', 'privacyAgreementAccepted', 'ssn');
const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-686C & 21-674)',
  type: 'object',
  definitions: merge(definitions, {
    genericLocation: {
      type: 'object',
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
    currencyInput: {
      type: 'string',
      pattern: currencyAmountPattern,
    },
    addressSchema: {
      type: 'object',
      properties: {
        'view:livesOnMilitaryBase': {
          $ref: '#/definitions/genericTrueFalse',
        },
        'view:livesOnMilitaryBaseInfo': {
          type: 'object',
          properties: {},
        },
        countryName: {
          type: 'string',
          enum: countries.map(country => country.label),
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
          enum: states50AndDC.map(state => state.value),
          enumNames: states50AndDC.map(state => state.label),
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
  }),
  properties: {
    optionSelection: {
      type: 'object',
      'view:selectable686Options': {
        type: 'object',
        properties: {
          addChild: { $ref: '#/definitions/genericTrueFalse', default: false },
          addSpouse: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportDivorce: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportDeath: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportStepchildNotInHousehold: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportMarriageOfChildUnder18: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportChild18OrOlderIsNotAttendingSchool: {
            $ref: '#/definitions/genericTrueFalse',
            default: false,
          },
          report674: {
            $ref: '#/definitions/genericTrueFalse',
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
            veteranFullName: {
              $ref: '#/definitions/fullName',
            },
            ssn: {
              $ref: '#/definitions/ssn',
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
        veteranAddress: {
          type: 'object',
          properties: {
            veteranAddress: {
              $ref: '#/definitions/addressSchema',
            },
            phoneNumber: {
              $ref: '#/definitions/phone',
            },
            emailAddress: {
              $ref: '#/definitions/email',
            },
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
                  childFullName: {
                    $ref: '#/definitions/fullName',
                  },
                  ssn: {
                    $ref: '#/definitions/ssn',
                  },
                  birthDate: {
                    $ref: '#/definitions/date',
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
                    $ref: '#/definitions/genericLocation',
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
                    $ref: '#/definitions/genericTrueFalse',
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
              $ref: '#/definitions/files',
            },
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
            spouseFullName: {
              $ref: '#/definitions/fullName',
            },
            spouseSSN: {
              $ref: '#/definitions/ssn',
            },
            spouseDOB: {
              $ref: '#/definitions/date',
            },
            isSpouseVeteran: {
              $ref: '#/definitions/genericTrueFalse',
            },
            spouseVAFileNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            spouseServiceNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
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
              $ref: '#/definitions/genericTrueFalse',
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
              $ref: '#/definitions/genericTrueFalse',
            },
            spouseMarriageHistory: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  formerSpouseName: {
                    $ref: '#/definitions/fullName',
                  },
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
              $ref: '#/definitions/genericTrueFalse',
            },
            veteranMarriageHistory: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  formerSpouseName: {
                    $ref: '#/definitions/fullName',
                  },
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
              $ref: '#/definitions/files',
            },
          },
        },
      },
    },

    reportDivorce: {
      type: 'object',
      properties: {
        formerSpouseName: {
          $ref: '#/definitions/fullName',
        },
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
                  fullName: {
                    $ref: '#/definitions/fullName',
                  },
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
    },

    reportChildMarriage: {
      type: 'object',
      properties: {
        marriedChildName: {
          $ref: '#/definitions/fullName',
        },
        dateChildMarried: {
          $ref: '#/definitions/date',
        },
      },
    },

    reportChildStoppedAttendingSchool: {
      type: 'object',
      properties: {
        childNoLongerAtSchoolName: {
          $ref: '#/definitions/fullName',
        },
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
                  stepchildName: {
                    $ref: '#/definitions/fullName',
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
                    $ref: '#/definitions/genericTrueFalse',
                    default: false,
                  },
                  stepchildLivingExpensesPaid: {
                    type: 'string',
                    enum: ['More than half', 'Half', 'Less than half'],
                    default: 'More than half',
                  },
                  whoDoesTheStepchildLiveWith: {
                    $ref: '#/definitions/fullName',
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
            studentFullName: {
              $ref: '#/definitions/fullName',
            },
            studentSSN: {
              $ref: '#/definitions/ssn',
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
              $ref: '#/definitions/genericTrueFalse',
            },
            marriageDate: {
              $ref: '#/definitions/date',
            },
            tuitionIsPaidByGovAgency: {
              $ref: '#/definitions/genericTrueFalse',
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
                  $ref: '#/definitions/genericTrueFalse',
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
              $ref: '#/definitions/genericTrueFalse',
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
              $ref: '#/definitions/genericTrueFalse',
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
              $ref: '#/definitions/genericTrueFalse',
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
              $ref: '#/definitions/genericTrueFalse',
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

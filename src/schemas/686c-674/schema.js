import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import { countries, states50AndDC } from '../../common/constants';
import commonDefinitions from '../../common/definitions';

// patterns
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
        isOutsideUs: {
          type: 'boolean',
          default: false,
        },
        country: {
          type: 'string',
          enum: countries.filter(country => country.value !== 'USA').map(country => country.value),
          enumNames: countries.filter(country => country.label !== 'United States').map(country => country.label),
        },
        state: {
          type: 'string',
          enum: states50AndDC.map(state => state.value),
          enumNames: states50AndDC.map(state => state.label),
        },
        city: {
          type: 'string',
          maxLength: 30,
          pattern: '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*0-9]+$',
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
          enum: countries.map(country => country.value),
          enumNames: countries.map(country => country.label),
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
          addSpouse: { $ref: '#/definitions/genericTrueFalse', default: false },
          addChild: { $ref: '#/definitions/genericTrueFalse', default: false },
          report674: {
            $ref: '#/definitions/genericTrueFalse',
            default: false,
          },
          reportDivorce: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportStepchildNotInHousehold: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportDeath: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportMarriageOfChildUnder18: { $ref: '#/definitions/genericTrueFalse', default: false },
          reportChild18OrOlderIsNotAttendingSchool: {
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
          properties: {},
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
                  fullName: {
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
                  placeOfBirth: {
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
                  previouslyMarried: {
                    type: 'string',
                    enum: ['Yes', 'No'],
                  },

                  previousMarriageDetails: {
                    type: 'object',
                    properties: {
                      dateMarriageEnded: {
                        $ref: '#/definitions/date',
                      },
                      reasonMarriageEnded: {
                        type: 'string',
                        enum: ['Divorce', 'Death', 'Annulment', 'Other'],
                      },
                      otherReasonMarriageEnded: {
                        $ref: '#/definitions/genericTextInput',
                      },
                    },
                  },
                  childIncome: {
                    $ref: '#/definitions/genericTrueFalse',
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
                    type: 'object',
                    properties: {
                      personChildLivesWith: {
                        $ref: '#/definitions/fullName',
                      },
                      address: {
                        $ref: '#/definitions/addressSchema',
                      },
                    },
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
            childEvidenceDocumentType: {
              type: 'string',
              enum: ['13', '25', '58', '59', '663', '10'],
              enumNames: [
                'Adoption Decree',
                'Birth Certificate',
                'Medical Treatment Record - Government Facility',
                'Medical Treatment Record - Non-Government Facility',
                'Medical Opinion',
                'Unknown',
              ],
            },
            childSupportingDocuments: {
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
            fullName: {
              $ref: '#/definitions/fullName',
            },
            ssn: {
              $ref: '#/definitions/ssn',
            },
            birthDate: {
              $ref: '#/definitions/date',
            },
            isVeteran: {
              $ref: '#/definitions/genericTrueFalse',
            },
            vaFileNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
            serviceNumber: {
              $ref: '#/definitions/genericNumberAndDashInput',
            },
          },
        },
        currentMarriageInformation: {
          type: 'object',
          properties: {
            date: {
              $ref: '#/definitions/date',
            },
            location: {
              $ref: '#/definitions/genericLocation',
            },
            type: {
              type: 'string',
              enum: ['CEREMONIAL', 'COMMON-LAW', 'TRIBAL', 'PROXY', 'OTHER'],
              enumNames: [
                'Religious or civil ceremony (minister, justice of the peace, etc.)',
                'Common-law',
                'Tribal',
                'Proxy',
                'Other',
              ],
            },
            typeOther: {
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
              type: 'string',
              enum: ['Death', 'Divorce', 'Other'],
            },
            address: {
              $ref: '#/definitions/addressSchema',
            },
            spouseIncome: {
              $ref: '#/definitions/genericTrueFalse',
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
                  fullName: {
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
                  startDate: {
                    $ref: '#/definitions/date',
                  },
                  startLocation: {
                    $ref: '#/definitions/genericLocation',
                  },
                  reasonMarriageEnded: {
                    type: 'string',
                    enum: ['Divorce', 'Death', 'Other'],
                    enumNames: ['Divorce', 'Death', 'Annulment/Other'],
                  },
                  reasonMarriageEndedOther: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  endDate: {
                    $ref: '#/definitions/date',
                  },
                  endLocation: {
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
                  fullName: {
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
                  startDate: {
                    $ref: '#/definitions/date',
                  },
                  startLocation: {
                    $ref: '#/definitions/genericLocation',
                  },
                  reasonMarriageEnded: {
                    type: 'string',
                    enum: ['Divorce', 'Death', 'Other'],
                    enumNames: ['Divorce', 'Death', 'Annulment/Other'],
                  },
                  reasonMarriageEndedOther: {
                    $ref: '#/definitions/genericTextInput',
                  },
                  endDate: {
                    $ref: '#/definitions/date',
                  },
                  endLocation: {
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
            spouseEvidenceDocumentType: {
              type: 'string',
              enum: ['14', '61', '119', '10'],
              enumNames: [
                'Affidavit',
                'Marriage Certificate / License',
                'VA 21-4171 Supporting Statement Regarding Marriage',
                'Unknown',
              ],
            },
            spouseSupportingDocuments: {
              $ref: '#/definitions/files',
            },
          },
        },
      },
    },

    reportDivorce: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        ssn: {
          $ref: '#/definitions/ssn',
        },
        birthDate: {
          $ref: '#/definitions/date',
        },
        date: {
          $ref: '#/definitions/date',
        },
        location: {
          $ref: '#/definitions/genericLocation',
        },
        reasonMarriageEnded: {
          type: 'string',
          enum: ['Divorce', 'Other'],
          enumNames: ['Divorce', 'Annulment/Other'],
        },
        explanationOfOther: {
          $ref: '#/definitions/genericTextInput',
        },
        spouseIncome: {
          $ref: '#/definitions/genericTrueFalse',
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
                  ssn: {
                    $ref: '#/definitions/ssn',
                  },
                  birthDate: {
                    $ref: '#/definitions/date',
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
                  date: {
                    $ref: '#/definitions/date',
                  },
                  location: {
                    $ref: '#/definitions/genericLocation',
                  },
                  dependentIncome: {
                    $ref: '#/definitions/genericTrueFalse',
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
        fullName: {
          $ref: '#/definitions/fullName',
        },
        ssn: {
          $ref: '#/definitions/ssn',
        },
        birthDate: {
          $ref: '#/definitions/date',
        },
        dateMarried: {
          $ref: '#/definitions/date',
        },
        dependentIncome: {
          $ref: '#/definitions/genericTrueFalse',
        },
      },
    },

    reportChildStoppedAttendingSchool: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        ssn: {
          $ref: '#/definitions/ssn',
        },
        birthDate: {
          $ref: '#/definitions/date',
        },
        dateChildLeftSchool: {
          $ref: '#/definitions/date',
        },
        dependentIncome: {
          $ref: '#/definitions/genericTrueFalse',
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
                  fullName: {
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
        stepchildInformation: {
          type: 'object',
          properties: {
            stepChildren: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                properties: {
                  supportingStepchild: {
                    $ref: '#/definitions/genericTrueFalse',
                    default: false,
                  },
                  livingExpensesPaid: {
                    type: 'string',
                    enum: ['More than half', 'Half', 'Less than half'],
                  },
                  whoDoesTheStepchildLiveWith: {
                    $ref: '#/definitions/fullName',
                  },
                  address: {
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
        studentNameAndSsn: {
          type: 'object',
          properties: {
            'view:674Information': {
              type: 'object',
              properties: {},
            },
            fullName: {
              $ref: '#/definitions/fullName',
            },
            ssn: {
              $ref: '#/definitions/ssn',
            },
            birthDate: {
              $ref: '#/definitions/date',
            },
            isParent: {
              $ref: '#/definitions/genericTrueFalse',
            },
            dependentIncome: {
              $ref: '#/definitions/genericTrueFalse',
            },
          },
        },

        studentAddressMarriageTuition: {
          type: 'object',
          properties: {
            address: {
              $ref: '#/definitions/addressSchema',
            },
            wasMarried: {
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
                name: {
                  $ref: '#/definitions/genericTextInput',
                },
                schoolType: {
                  type: 'string',
                  enum: ['HighSch', 'College', 'HomeSch'],
                  enumNames: ['High School', 'Postsecondary', 'Home School'],
                },
                trainingProgram: {
                  $ref: '#/definitions/genericTextInput',
                },
                address: {
                  $ref: '#/definitions/addressSchema',
                },
              },
            },
          },
        },

        studentTermDates: {
          type: 'object',
          properties: {
            currentTermDates: {
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
                name: {
                  $ref: '#/definitions/genericTextInput',
                },
                address: {
                  $ref: '#/definitions/addressSchema',
                },
                termBegin: {
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
            studentNetworthInformation: {
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

    householdIncome: {
      type: 'object',
      properties: {
        householdIncome: {
          $ref: '#/definitions/genericTrueFalse',
        },
      },
    },
  },
};

export default schema;

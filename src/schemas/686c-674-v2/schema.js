export default {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'SUPPLEMENTAL CLAIM FOR COMPENSATION (21-686C & 21-674)',
  type: 'object',
  definitions: {},
  properties: {
    spouseSupportingDocuments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          confirmationCode: { type: 'string' },
          attachmentId: { type: 'string' },
          isEncrypted: { type: 'boolean' },
        },
        required: ['name', 'confirmationCode', 'attachmentId', 'isEncrypted'],
      },
    },
    childSupportingDocuments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          confirmationCode: { type: 'string' },
          attachmentId: { type: 'string' },
          isEncrypted: { type: 'boolean' },
        },
        required: ['name', 'confirmationCode', 'attachmentId', 'isEncrypted'],
      },
    },
    householdIncome: { type: 'boolean' },

    reportDivorce: {
      type: 'object',
      properties: {
        spouseIncome: { type: 'string' },
        date: { type: 'string', format: 'date' },
        divorceLocation: {
          type: 'object',
          properties: {
            outsideUsa: { type: 'boolean' },
            location: {
              type: 'object',
              properties: {
                city: { type: 'string' },
                state: { type: 'string' },
                country: { type: 'string' },
              },
              required: ['city'],
            },
          },
          required: ['location', 'outsideUsa'],
        },
        reasonMarriageEnded: { type: 'string' },
        explanationOfOther: { type: 'string' },
        fullName: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
          required: ['first', 'last'],
        },
        birthDate: { type: 'string', format: 'date' },
      },
      required: [
        'spouseIncome',
        'date',
        'divorceLocation',
        'reasonMarriageEnded',
        'explanationOfOther',
        'fullName',
        'birthDate',
      ],
    },

    currentMarriageInformation: {
      type: 'object',
      properties: {
        typeOfMarriage: { type: 'string' },
        location: {
          type: 'object',
          properties: {
            city: { type: 'string' },
            state: { type: 'string' },
          },
          required: ['city', 'state'],
        },
        date: { type: 'string', format: 'date' },
      },
      required: ['typeOfMarriage', 'location', 'date'],
    },

    doesLiveWithSpouse: {
      type: 'object',
      properties: {
        spouseIncome: { type: 'string' },
        spouseDoesLiveWithVeteran: { type: 'boolean' },
        address: {
          type: 'object',
          properties: {
            // The address fields structure can be more detailed if you wish
          },
        },
      },
      required: ['spouseIncome', 'spouseDoesLiveWithVeteran', 'address'],
    },

    spouseInformation: {
      type: 'object',
      properties: {
        ssn: { type: 'string' },
        vaFileNumber: { type: 'string' },
        serviceNumber: { type: 'string' },
        birthDate: { type: 'string', format: 'date' },
        isVeteran: { type: 'boolean' },
        fullName: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            last: { type: 'string' },
          },
          required: ['first', 'last'],
        },
      },
      required: ['ssn', 'vaFileNumber', 'serviceNumber', 'birthDate', 'isVeteran', 'fullName'],
    },

    veteranContactInformation: {
      type: 'object',
      properties: {
        veteranAddress: {
          type: 'object',
          properties: {
            isMilitary: { type: 'boolean' },
            country: { type: 'string' },
            street: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            postalCode: { type: 'string' },
          },
          required: ['isMilitary', 'country', 'street', 'city', 'state', 'postalCode'],
        },
        phoneNumber: { type: 'string' },
        emailAddress: { type: 'string' },
      },
      required: ['veteranAddress', 'phoneNumber', 'emailAddress'],
    },

    spouseMarriageHistory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          startLocation: {
            type: 'object',
            properties: {
              outsideUsa: { type: 'boolean' },
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  country: { type: 'string' },
                  state: { type: 'string' },
                },
                required: ['city'],
              },
            },
            required: ['location'],
          },
          endLocation: {
            type: 'object',
            properties: {
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  state: { type: 'string' },
                },
                required: ['city'],
              },
            },
            required: ['location'],
          },
          endDate: { type: 'string', format: 'date' },
          startDate: { type: 'string', format: 'date' },
          reasonMarriageEnded: { type: 'string' },
          otherReasonMarriageEnded: { type: 'string' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
        },
        required: [
          'startLocation',
          'endLocation',
          'endDate',
          'startDate',
          'reasonMarriageEnded',
          'otherReasonMarriageEnded',
          'fullName',
        ],
      },
    },

    childrenToAdd: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          incomeInLastYear: { type: 'string' },
          marriageEndDescription: { type: 'string' },
          marriageEndDate: { type: 'string', format: 'date' },
          marriageEndReason: { type: 'string' },
          doesChildLiveWithYou: { type: 'boolean' },
          hasChildEverBeenMarried: { type: 'boolean' },
          doesChildHaveDisability: { type: 'boolean' },
          isBiologicalChildOfSpouse: { type: 'boolean' },
          dateEnteredHousehold: { type: 'string', format: 'date' },
          biologicalParentName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          biologicalParentSsn: { type: 'string' },
          biologicalParentDob: { type: 'string', format: 'date' },
          relationshipToChild: {
            type: 'object',
            properties: {
              adopted: { type: 'boolean' },
              stepchild: { type: 'boolean' },
            },
          },
          isBiologicalChild: { type: 'boolean' },
          birthLocation: {
            type: 'object',
            properties: {
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  state: { type: 'string' },
                  postalCode: { type: 'string' },
                },
                required: ['city'],
              },
            },
            required: ['location'],
          },
          ssn: { type: 'string' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          birthDate: { type: 'string', format: 'date' },
        },
        required: [
          'incomeInLastYear',
          'marriageEndDescription',
          'marriageEndDate',
          'marriageEndReason',
          'doesChildLiveWithYou',
          'hasChildEverBeenMarried',
          'doesChildHaveDisability',
          'isBiologicalChildOfSpouse',
          'dateEnteredHousehold',
          'biologicalParentName',
          'biologicalParentSsn',
          'biologicalParentDob',
          'relationshipToChild',
          'isBiologicalChild',
          'birthLocation',
          'ssn',
          'fullName',
          'birthDate',
        ],
      },
    },

    studentInformation: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          studentNetworthInformation: {
            type: 'object',
            properties: {
              savings: { type: 'string' },
              securities: { type: 'string' },
              realEstate: { type: 'string' },
              otherAssets: { type: 'string' },
              totalValue: { type: 'string' },
            },
            required: ['savings', 'securities', 'realEstate', 'otherAssets', 'totalValue'],
          },
          studentExpectedEarningsNextYear: {
            type: 'object',
            properties: {
              earningsFromAllEmployment: { type: 'string' },
              annualSocialSecurityPayments: { type: 'string' },
              otherAnnuitiesIncome: { type: 'string' },
              allOtherIncome: { type: 'string' },
            },
            required: [
              'earningsFromAllEmployment',
              'annualSocialSecurityPayments',
              'otherAnnuitiesIncome',
              'allOtherIncome',
            ],
          },
          studentEarningsFromSchoolYear: {
            type: 'object',
            properties: {
              earningsFromAllEmployment: { type: 'string' },
              annualSocialSecurityPayments: { type: 'string' },
              otherAnnuitiesIncome: { type: 'string' },
              allOtherIncome: { type: 'string' },
            },
            required: [
              'earningsFromAllEmployment',
              'annualSocialSecurityPayments',
              'otherAnnuitiesIncome',
              'allOtherIncome',
            ],
          },
          claimsOrReceivesPension: { type: 'boolean' },
          schoolInformation: {
            type: 'object',
            properties: {
              studentDidAttendSchoolLastTerm: { type: 'boolean' },
              dateFullTimeEnded: { type: 'string', format: 'date' },
              studentIsEnrolledFullTime: { type: 'boolean' },
              currentTermDates: {
                type: 'object',
                properties: {
                  officialSchoolStartDate: { type: 'string', format: 'date' },
                  expectedStudentStartDate: { type: 'string', format: 'date' },
                  expectedGraduationDate: { type: 'string', format: 'date' },
                },
                required: ['officialSchoolStartDate', 'expectedStudentStartDate', 'expectedGraduationDate'],
              },
              isSchoolAccredited: { type: 'boolean' },
              name: { type: 'string' },
            },
            required: [
              'studentDidAttendSchoolLastTerm',
              'dateFullTimeEnded',
              'studentIsEnrolledFullTime',
              'currentTermDates',
              'isSchoolAccredited',
              'name',
            ],
          },
          typeOfProgramOrBenefit: {
            type: 'object',
            properties: {
              ch35: { type: 'boolean' },
              fry: { type: 'boolean' },
              feca: { type: 'boolean' },
              other: { type: 'boolean' },
            },
            required: ['ch35', 'fry', 'feca', 'other'],
          },
          otherProgramOrBenefit: { type: 'string' },
          tuitionIsPaidByGovAgency: { type: 'boolean' },
          ssn: { type: 'string' },
          isParent: { type: 'boolean' },
          wasMarried: { type: 'boolean' },
          address: {
            type: 'object',
            properties: {
              country: { type: 'string' },
              street: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              postalCode: { type: 'string' },
            },
            required: ['country', 'street', 'city', 'state', 'postalCode'],
          },
          remarks: { type: 'string' },
          benefitPaymentDate: { type: 'string', format: 'date' },
          marriageDate: { type: 'string', format: 'date' },
          studentIncome: { type: 'string' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          birthDate: { type: 'string', format: 'date' },
        },
        required: [
          'studentNetworthInformation',
          'studentExpectedEarningsNextYear',
          'studentEarningsFromSchoolYear',
          'claimsOrReceivesPension',
          'schoolInformation',
          'typeOfProgramOrBenefit',
          'otherProgramOrBenefit',
          'tuitionIsPaidByGovAgency',
          'ssn',
          'isParent',
          'wasMarried',
          'address',
          'remarks',
          'benefitPaymentDate',
          'marriageDate',
          'studentIncome',
          'fullName',
          'birthDate',
        ],
      },
    },

    veteranMarriageHistory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          endLocation: {
            type: 'object',
            properties: {
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  state: { type: 'string' },
                },
                required: ['city'],
              },
            },
            required: ['location'],
          },
          startLocation: {
            type: 'object',
            properties: {
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  state: { type: 'string' },
                },
                required: ['city'],
              },
            },
            required: ['location'],
          },
          endDate: { type: 'string', format: 'date' },
          startDate: { type: 'string', format: 'date' },
          reasonMarriageEnded: { type: 'string' },
          otherReasonMarriageEnded: { type: 'string' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
        },
        required: [
          'endLocation',
          'startLocation',
          'endDate',
          'startDate',
          'reasonMarriageEnded',
          'otherReasonMarriageEnded',
          'fullName',
        ],
      },
    },

    stepChildren: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          whoDoesTheStepchildLiveWith: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          address: {
            type: 'object',
            properties: {
              country: { type: 'string' },
              street: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              postalCode: { type: 'string' },
            },
            required: ['country', 'street', 'city', 'state', 'postalCode'],
          },
          livingExpensesPaid: { type: 'string' },
          supportingStepchild: { type: 'boolean' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          ssn: { type: 'string' },
          birthDate: { type: 'string', format: 'date' },
        },
        required: [
          'whoDoesTheStepchildLiveWith',
          'address',
          'livingExpensesPaid',
          'supportingStepchild',
          'fullName',
          'ssn',
          'birthDate',
        ],
      },
    },

    deaths: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentDeathLocation: {
            type: 'object',
            properties: {
              outsideUsa: { type: 'boolean' },
              location: {
                type: 'object',
                properties: {
                  city: { type: 'string' },
                  state: { type: 'string' },
                },
                required: ['city'],
              },
            },
            required: ['outsideUsa', 'location'],
          },
          deceasedDependentIncome: { type: 'string' },
          dependentDeathDate: { type: 'string', format: 'date' },
          dependentType: { type: 'string' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          ssn: { type: 'string' },
          birthDate: { type: 'string', format: 'date' },
        },
        required: [
          'dependentDeathLocation',
          'deceasedDependentIncome',
          'dependentDeathDate',
          'dependentType',
          'fullName',
          'ssn',
          'birthDate',
        ],
      },
    },

    childMarriage: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentIncome: { type: 'string' },
          dateMarried: { type: 'string', format: 'date' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          ssn: { type: 'string' },
          birthDate: { type: 'string', format: 'date' },
        },
        required: ['dependentIncome', 'dateMarried', 'fullName', 'ssn', 'birthDate'],
      },
    },

    childStoppedAttendingSchool: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          dependentIncome: { type: 'string' },
          dateChildLeftSchool: { type: 'string', format: 'date' },
          fullName: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              last: { type: 'string' },
            },
            required: ['first', 'last'],
          },
          ssn: { type: 'string' },
          birthDate: { type: 'string', format: 'date' },
        },
        required: ['dependentIncome', 'dateChildLeftSchool', 'fullName', 'ssn', 'birthDate'],
      },
    },

    statementOfTruthSignature: { type: 'string' },
    statementOfTruthCertified: { type: 'boolean' },

    veteranInformation: {
      type: 'object',
      properties: {
        fullName: {
          type: 'object',
          properties: {
            first: { type: 'string' },
            middle: { type: 'string' },
            last: { type: 'string' },
          },
          required: ['first', 'last'],
        },
        ssn: { type: 'string' },
        birthDate: { type: 'string', format: 'date' },
        ssnLastFour: { type: 'string' },
        vaFileLastFour: { type: 'string' },
      },
      required: ['fullName', 'ssn', 'birthDate', 'ssnLastFour', 'vaFileLastFour'],
    },

    useV2: { type: 'boolean' },
    daysTillExpires: { type: 'integer' },
    metadata: {
      type: 'object',
      properties: {
        formerMarriagesForceRenderTimestamp: { type: 'integer' },
      },
      required: ['formerMarriagesForceRenderTimestamp'],
    },
    privacyAgreementAccepted: { type: 'boolean' },
  },
  required: [
    'spouseSupportingDocuments',
    'childSupportingDocuments',
    'householdIncome',
    'reportDivorce',
    'currentMarriageInformation',
    'doesLiveWithSpouse',
    'spouseInformation',
    'veteranContactInformation',
    'spouseMarriageHistory',
    'childrenToAdd',
    'studentInformation',
    'veteranMarriageHistory',
    'stepChildren',
    'deaths',
    'childMarriage',
    'childStoppedAttendingSchool',
    'statementOfTruthSignature',
    'statementOfTruthCertified',
    'veteranInformation',
    'useV2',
    'daysTillExpires',
    'metadata',
    'privacyAgreementAccepted',
  ],
};

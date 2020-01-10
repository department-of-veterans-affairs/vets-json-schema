import schemaHelpers from '../../common/schema-helpers';
import originalDefinitions from '../../common/definitions';
import constants from '../../common/constants';
import _ from 'lodash';

const { states: constStates, states50AndDC, pciuCountries } = constants;

// lists of countries and states are from EVSS ReferenceDataService
// if any of these countries are selected, addressType should be 'INTERNATIONAL'
const nonUSACountries = pciuCountries.filter(country => country !== 'USA');
const countryUSA = pciuCountries.find(country => country === 'USA'); // if selected, addressType should be 'DOMESTIC'
const countryNotInList = "Country Not In List"; // if selected, addressType should be 'INTERNATIONAL'

const states = constStates.USA.concat(
  [{ value: "UM", label: "United States Minor Outlying Islands"}]
).sort((stateA, stateB) => (stateA.label.localeCompare(stateB.label)))

const textRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*0-9]+$';
const textAndNumbersRegex = '^(?!\\s)(?!.*?\\s{2,})[^<>%$#@!^&*]+$';

let definitions = _.cloneDeep(originalDefinitions);
definitions =  _.pick(definitions, 'fullName', 'date', 'ssn', 'veteranServiceNumber');

definitions.fullName.properties.first.pattern = textRegex;
definitions.fullName.properties.last.pattern = textRegex;
definitions.fullName.properties.middle.pattern = textRegex;
definitions.fullName.properties.first.maxLength = 30;
definitions.fullName.properties.last.maxLength = 30;
definitions.fullName.properties.middle.maxLength = 20;
delete definitions.fullName.properties.suffix;

const commonAddressFields = {
  required: ['addressType', 'street', 'city', 'countryDropdown'],
  properties: {
    addressType: {
      type: 'string',
      'enum': [
        'DOMESTIC',
        'MILITARY',
        'INTERNATIONAL'
      ],
      enumNames: [
        'Domestic',
        'Military',
        'International'
      ]
    },
    street: {
      type: 'string',
      minLength: 1,
      maxLength: 20,
      pattern: textAndNumbersRegex
    },
    street2: {
      type: 'string',
      maxLength: 20,
      pattern: textAndNumbersRegex
    },
    street3: {
      type: 'string',
      maxLength: 20,
      pattern: textAndNumbersRegex
    },
    city: {
      type: 'string',
      maxLength: 30,
      pattern: textRegex
    },
    countryDropdown: {
      type: 'string',
      maxLength: 50,
      'enum': [countryUSA, countryNotInList].concat(nonUSACountries)
    }
  }
}

// 4494 NOTE: It isn't immediately clear to me why these definitions are used for marriage instead
// of the ones found in ../common/definitions.js. This will require additional investigation. 
// For now, I've added marriageType directly to the defintion below.

const commonMarriageDef = {
  required: ['dateOfMarriage', 'locationOfMarriage', 'spouseFullName', 'marriageType'],
  properties: {
    dateOfMarriage: schemaHelpers.getDefinition('date'),
    locationOfMarriage: {
      $ref: '#/definitions/genericLocation'
    },
    marriageType: {
      type: 'string'
    },
    spouseFullName: schemaHelpers.getDefinition('fullName')
  }
}

const commonMarriagesDef = {
  type: 'array',
  items: {
    type: 'object',
    required: [...commonMarriageDef.required],
    properties: {
      ...commonMarriageDef.properties,
      dateOfSeparation: schemaHelpers.getDefinition('date'),
      locationOfSeparation: {
        $ref: '#/definitions/genericLocation'
      }
    },
    oneOf: [
      {
        properties: {
          reasonForSeparation: {
            type: 'string',
            'enum': [
              'Death',
              'Divorce'
            ]
          }
        }
      },
      {
        required: ['explainSeparation'],
        properties: {
          reasonForSeparation: {
            type: 'string',
            'enum': [
              'Other'
            ]
          },
          explainSeparation: {
            type: 'string',
            maxLength: 500,
            pattern: textAndNumbersRegex
          }
        }
      }
    ]
  }
}

const addressDefs = [
  { $ref: '#/definitions/domesticAddress' },
  { $ref: '#/definitions/militaryAddress' },
  { $ref: '#/definitions/internationalAddressDropDown' },
  { $ref: '#/definitions/internationalAddressText' }
]

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'DECLARATION OF STATUS OF DEPENDENTS',
  type: 'object',
  additionalProperties: false,
  definitions: _.merge(definitions,
    {
      domesticAddress: {
        type: 'object',
        required: [...commonAddressFields.required, 'state', 'postalCode'],
        properties: {
          ...commonAddressFields.properties,
          addressType: {
            type: 'string',
            'enum': ['DOMESTIC'],
            default: 'DOMESTIC'
          },
          state: {
            type: 'string',
            maxLength: 50,
            'enum': states.map(state => state.value),
            enumNames: states.map(state => state.label)
          },
          postalCode: {
            $ref: '#/definitions/postalCode'
          },
          countryDropdown: {
            type: 'string',
            maxLength: 50,
            default: countryUSA
          }
        },
        additionalProperties: false
      },
      militaryAddress: {
        type: 'object',
        required: [...commonAddressFields.required, 'postOffice', 'postalType', 'postalCode'],
        properties: {
          ...commonAddressFields.properties,
          addressType: {
            type: 'string',
            enum: ['MILITARY'],
            default: 'MILITARY'
          },
          postOffice: {
            type: 'string',
            'enum': [
              'APO',
              'DPO',
              'FPO'
            ],
            enumNames: [
              'Ashore Post Office',
              'Diplomatic Post Office',
              'Fleet Post Office'
            ]
          },
          postalType: {
            type: 'string',
            'enum': [
              'AA',
              'AE',
              'AP'
            ],
            enumNames: [
              'Armed Forces Americas (except Canada)',
              'Armed Forces Europe, Middle East, Canada & Africa',
              'Armed Forces Pacific'
            ]
          },
          postalCode: {
            $ref: '#/definitions/postalCode'
          },
        },
        additionalProperties: false
      },
      internationalAddressDropDown: {
        type: 'object',
        required: [...commonAddressFields.required],
        properties: {
          ...commonAddressFields.properties,
          addressType: {
            type: 'string',
            enum: ['INTERNATIONAL'],
            default: 'INTERNATIONAL'
          },
          countryDropdown: {
            type: 'string',
            'enum': nonUSACountries
          }
        },
        additionalProperties: false
      },
      internationalAddressText: {
        type: 'object',
        required: [...commonAddressFields.required, 'countryText'],
        properties: {
          ...commonAddressFields.properties,
          addressType: {
            type: 'string',
            enum: ['INTERNATIONAL'],
            default: 'INTERNATIONAL'
          },
          countryDropdown: {
            type: 'string',
            'enum': [countryNotInList],
            default: countryNotInList
          },
          countryText: {
            type: 'string',
            maxLength: 50,
            minLength: 1,
            pattern: textRegex
          }
        },
        additionalProperties: false
      },
      postalCode: {
        type: 'string',
        maxLength: 10,
        pattern: '^\\d{5}(?:[- ]?\\d{4})?$'
      },
      genericLocation: {
        type: 'string',
          maxLength: 250,
          pattern: textAndNumbersRegex  
      },
      location: {
        type: 'object',
        properties: {},
        oneOf: [
          {
            required: ['countryDropdown', 'city', 'state'],
            properties: {
              countryDropdown: {
                type: 'string',
                'enum': [countryUSA],
                default: countryUSA
              },
              city: {
                type: 'string',
                maxLength: 30,
                minLength: 1,
                pattern: textRegex
              },
              state: {
                type: 'string',
                maxLength: 50,
                'enum': states50AndDC.map(state => state.value),
                enumNames: states50AndDC.map(state => state.label)
              }
            },
            additionalProperties: false
          },
          {
            required: ['countryDropdown', 'countryText'],
            properties: {
              countryDropdown: {
                type: 'string',
                'enum': [countryNotInList],
                default: countryNotInList
              },
              countryText: {
                type: 'string',
                maxLength: 50,
                minLength: 1,
                pattern: textRegex
              }
            },
            additionalProperties: false
          },
          {
            required: ['countryDropdown'],
            properties: {
              countryDropdown: {
                type: 'string',
                'enum': nonUSACountries
              }
            },
            additionalProperties: false
          }
        ]
      },
      marriages: {...commonMarriagesDef},
      previousMarriages: {
        ...commonMarriagesDef,
        items: {
          ...commonMarriagesDef.items,
          required: [...commonMarriageDef.required, 'reasonForSeparation', 'dateOfSeparation', 'locationOfSeparation']
        }
      },
    }
  ),
  properties: {
    veteranAddress: {
      type: 'object',
      oneOf: addressDefs
    },
    veteranEmail: {
      type: 'string',
      format: 'email'
    },
    veteranSocialSecurityNumber: { $ref: '#/definitions/ssn' },
    maritalStatus: {
      type: 'string',
      'enum': [
        'MARRIED',
        'DIVORCED',
        'WIDOWED',
        'SEPARATED',
        'NEVERMARRIED'
      ],
      enumNames: [
        'Married',
        'Divorced',
        'Widowed',
        'Separated',
        'Never Married'
      ]
    },
    currentMarriage: {
      type: 'object',
      properties: {
        spouseAddress: {
          type: 'object',
          anyOf: addressDefs
        },
        spouseIsVeteran: {
          type: 'boolean'
        },
        liveWithSpouse: {
          type: 'boolean'
        },
        spouseSocialSecurityNumber: { $ref: '#/definitions/ssn' },
        spouseHasNoSsnReason: {
          type: 'string',
          'enum': [
            'NONRESIDENTALIEN',
            'NOSSNASSIGNEDBYSSA'
          ],
          enumNames: [
            // TODO: review these wordings with @peggygannon
            'Spouse who is not a US citizen, not residing in the US',
            'Spouse who is not a US citizen, residing in the US'
          ]
        },
        spouseDateOfBirth: schemaHelpers.getDefinition('date'),
        spouseVaFileNumber: schemaHelpers.getDefinition('vaFileNumber')
      },
      anyOf: [
        {
          required: ['spouseHasNoSsnReason'],
          properties: {
            spouseHasNoSsn: {
              type: 'boolean',
              enum: [true]
            },

          }
        },
        {
          required: ['spouseSocialSecurityNumber'],
          properties: {
            spouseHasNoSsn: {
              type: 'boolean',
              enum: [false]
            }
          }
        }
      ]
    },
    // TRANSLATE: the `spouseMarriages` array should be added to the
    // `currentMarriage` object. To work with the form system's ability to show
    // a page for each item in the array, the array must live on the top level
    // of the schema.
    spouseMarriages: {
      $ref: '#/definitions/previousMarriages'
    },
    // TRANSLATE: if `maritalStatus` is 'MARRIED' or 'SEPARATED', then the last
    // item in the `marriages` array should be popped off and merged with the
    // `currentMarriage` object.
    // TRANSLATE: regardless of if the last object in this array needs to be
    // merged with the `currentMarriage` object, the `marriages` array should be
    // renamed to `previousMarriages`
    marriages: {
      $ref: '#/definitions/marriages'
    },
    dependents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          fullName: schemaHelpers.getDefinition('fullName'),
          childDateOfBirth: schemaHelpers.getDefinition('date'),
          childPlaceOfBirth: {
            $ref: '#/definitions/genericLocation'
          },
          childSocialSecurityNumber: { $ref: '#/definitions/ssn' },
          childRelationship: {
            type: 'string',
            enum: [
              'biological',
              'adopted',
              'stepchild'
            ]
          },
          isSupportingStepchild: {
            type: 'boolean'
          },
          dateStepchildLeftHousehold: {
            $ref: '#/definitions/date'
          },
          financialSupportProvided: {
            type: 'string',
            enum: [
              'More than half',
              'Half',
              'Less than half'
            ]
          },
          attendingCollege: {
            type: 'boolean'
          },
          disabled: {
            type: 'boolean'
          },
          previouslyMarried: {
            type: 'boolean'
          },
          dateMarriageEnded: schemaHelpers.getDefinition('date'),
          childInHousehold: {
            type: 'boolean'
          },
          childAddress: {
            type: 'object',
            oneOf: addressDefs
          },
          personWhoLivesWithChild: schemaHelpers.getDefinition('fullName'),
          childHasNoSsnReason: {
            type: 'string',
            'enum': [
              'NONRESIDENTALIEN',
              'NOSSNASSIGNEDBYSSA'
            ],
            enumNames: [
              // TODO: review these wordings with @peggygannon
              'Child who is not a US citizen, not residing in the US',
              'Child who is not a US citizen, residing in the US'
            ]
          }

        },
        allOf: [
          {
            type: 'object',
            oneOf: [
              {
                required: ['dateMarriageEnded'],
                properties: {
                  previouslyMarried: {
                    type: 'boolean',
                    enum: [true]
                  },
                  reasonMarriageEnded: {
                    type: 'string',
                    enum: [
                      'Annulled',
                      'Declared void'
                    ]
                  }
                }
              },
              {
                required: ['dateMarriageEnded'],
                properties: {
                  previouslyMarried: {
                    type: 'boolean',
                    enum: [true]
                  },
                  reasonMarriageEnded: {
                    type: 'string',
                    enum: [
                      'Other',
                    ]
                  },
                  explainSeparation: {
                    type: 'string',
                    maxLength: 500,
                    pattern: textAndNumbersRegex
                  }
                }
              },
              {
                properties: {
                  previouslyMarried: {
                    type: 'boolean',
                    enum: [false]
                  }
                }
              }
            ]
          },
          {
            type: 'object',
            oneOf: [
              {
                required: ['childHasNoSsnReason'],
                properties: {
                  childHasNoSsn: {
                    type: 'boolean',
                    enum: [true]
                  }
                },
              },
              {
                properties: {
                  childHasNoSsn: {
                    type: 'boolean',
                    enum: [false]
                  }
                },
              }
            ]
          }
        ]
      }
    }
  },
  required: [
    'privacyAgreementAccepted',
    'veteranFullName',
    'veteranAddress',
    'maritalStatus'
  ],
  anyOf: [
    {
      "required" : ["vaFileNumber"]
    },
    {
      "required" : ["veteranSocialSecurityNumber"]
    }
  ]
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'veteranFullName'],
  ['usaPhone', 'dayPhone'],
  ['usaPhone', 'nightPhone'],
  ['vaFileNumber']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

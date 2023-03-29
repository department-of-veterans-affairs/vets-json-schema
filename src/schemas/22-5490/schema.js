import _ from 'lodash';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const definitions = _.cloneDeep(originalDefinitions);
definitions.educationType.enum.push('farmCoop');
const modifiedToursOfDuty = definitions.toursOfDuty;
delete modifiedToursOfDuty.items.properties.benefitsToApplyTo;

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: "DEPENDENTS' APPLICATION FOR VA EDUCATION BENEFITS (22-5490)",
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, ['dateRange','address', 'educationType',]),
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    currentSameAsPrevious: {
      type: 'boolean',
    },
    serviceBranch: {
      type: 'string',
    },
    currentlyActiveDuty: {
      type: 'boolean',
    },
    outstandingFelony: {
      type: 'boolean',
    },
    restorativeTraining: {
      type: 'boolean',
    },
    vocationalTraining: {
      type: 'boolean',
    },
    trainingState: {
      type: 'string',
    },
    educationObjective: {
      type: 'string',
    },
    educationalCounseling: {
      type: 'boolean',
    },
    spouseInfo: {
      type: 'object',
      properties: {
        marriageDate: {
          $ref: '#/definitions/date',
        },
        divorcePending: {
          type: 'boolean',
        },
        remarried: {
          type: 'boolean',
        },
      },
    },
    benefit: {
      type: 'string',
      enum: ['chapter35', 'chapter33'],
    },
    previousBenefits: {
      type: 'object',
      properties: {
        disability: {
          type: 'boolean',
        },
        dic: {
          type: 'boolean',
        },
        chapter31: {
          type: 'boolean',
        },
        ownServiceBenefits: {
          type: 'string',
        },
        chapter35: {
          type: 'boolean',
        },
        chapter33: {
          type: 'boolean',
        },
        transferOfEntitlement: {
          type: 'boolean',
        },
        other: {
          type: 'string',
        },
      },
    },
    highSchool: {
      type: 'object',
      properties: _.merge(_.omit(definitions.postHighSchoolTrainings.items.properties, 'major'), {
        status: {
          type: 'string',
          enum: ['graduated', 'discontinued', 'graduationExpected', 'ged', 'neverAttended'],
        },
      }),
    },
    toursOfDuty: modifiedToursOfDuty,
    civilianBenefitsAssistance: {
      type: 'boolean',
    },
    civilianBenefitsSource: {
      type: 'string',
    },
    remarks: {
      type: 'string',
    },
    eduBenefitsPamphlet: {
      type: 'boolean',
    },
    sponsorStatus: {
      type: 'string',
      enum: ['diedOnDuty', 'diedFromDisabilityOrOnReserve', 'powOrMia'],
    },
    minorHighSchoolQuestions: {
      type: 'object',
      properties: {
        minorHighSchoolQuestion: {
          type: 'boolean',
        },
        highSchoolGedGradDate: {
          $ref: '#/definitions/date',
        },
        highSchoolGedExpectedGradDate: {
          $ref: '#/definitions/date',
        },
      },
    },
    minorQuestions: {
      type: 'object',
      properties: {
        guardianFirstName: {
          type: 'string',
        },
        guardianMiddleName: {
          type: 'string',
        },
        guardianLastName: {
          type: 'string',
        },
        guardianAddress: {
          // type: 'object',
          $ref: '#/definitions/address'
        },
        guardianMobilePhone: {
          $ref: '#/definitions/phone',
        },
        guardianHomePhone: {
          $ref: '#/definitions/phone',
        },
        email: {
          type: 'string',
          format: 'email',
        },
      },
    },
  },
  required: ['privacyAgreementAccepted', 'relativeFullName'],
};

[
  ['privacyAgreementAccepted'],
  ['ssn', 'relativeSocialSecurityNumber'],
  ['gender'],
  ['date', 'relativeDateOfBirth'],
  ['fullName', 'relativeFullName'],
  ['address', 'relativeAddress'],
  ['phone', 'homePhone'],
  ['phone', 'mobilePhone'],
  ['bankAccount'],
  ['secondaryContact'],
  ['fullName', 'veteranFullName'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['vaFileNumber'],
  ['date', 'veteranDateOfBirth'],
  ['date', 'veteranDateOfDeath'],
  ['date', 'educationStartDate'],
  ['relationship'],
  ['date', 'spouseInfo.remarriageDate'],
  ['date', 'benefitsRelinquishedDate'],
  ['fullName', 'previousBenefits.veteranFullName'],
  ['vaFileNumber', 'previousBenefits.vaFileNumber'],
  ['ssn', 'previousBenefits.veteranSocialSecurityNumber'],
  ['date', 'highSchool.highSchoolOrGedCompletionDate'],
  ['postHighSchoolTrainings'],
  ['nonMilitaryJobs'],
  ['educationProgram'],
  ['preferredContactMethod'],
  // ['address','minorQuestions.guardianAddress']
].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

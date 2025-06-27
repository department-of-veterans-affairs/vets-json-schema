import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
  'address',
  'bankAccount',
  'date',
  'email',
  'fullNameNoSuffix',
  'privacyAgreementAccepted',
  'ssn',
  'usaPhone',
  'vaFileNumber',
  'yesNoSchema',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '22-10297 APPLICATION FOR HIGH TECHNOLOGY VETERANS EDUCATION, TRAINING AND SKILLS (HITECH VETS) PROGRAM',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    applicantFullName: {
      $ref: '#/definitions/fullNameNoSuffix',
    },
    dateOfBirth: {
      $ref: '#/definitions/date',
    },
    applicantSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    applicantFileNumber: {
      $ref: '#/definitions/vaFileNumber',
    },
    mailingAddress: {
      $ref: '#/definitions/address',
    },
    contactInfo: {
      type: 'object',
      properties: {
        mobilePhone: {
          $ref: '#/definitions/usaPhone',
        },
        homePhone: {
          $ref: '#/definitions/usaPhone',
        },
        emailAddress: {
          $ref: '#/definitions/email',
        },
      },
      required: ['mobilePhone'],
    },
    hasCompletedActiveDuty: {
      $ref: '#/definitions/yesNoSchema',
    },
    hasCompletedByDischarge: {
      $ref: '#/definitions/yesNoSchema',
    },
    dateReleasedFromActiveDuty: {
      $ref: '#/definitions/date',
    },
    activeDutyDuringHitechVets: {
      $ref: '#/definitions/yesNoSchema',
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    hitechVetsPrograms: {
      type: 'object',
      properties: {
        programs: {
          type: 'array',
          maxItems: 4,
          items: {
            type: 'object',
            properties: {
              providerName: {
                type: 'string',
              },
              providerAddress: {
                $ref: '#/definitions/address',
              },
            },
            required: ['providerName', 'providerAddress'],
          },
        },
        plannedStartDate: {
          $ref: '#/definitions/date',
        },
      },
      required: ['programs', 'plannedStartDate'],
    },
    isEmployed: {
      $ref: '#/definitions/yesNoSchema',
    },
    isInTechnologyIndustry: {
      $ref: '#/definitions/yesNoSchema',
    },
    technologyAreaOfFocus: {
      type: 'string',
      enum: [
        'computerProgramming',
        'computerSoftware',
        'mediaApplication',
        'dataProcessing',
        'informationSciences',
        'somethingElse',
      ],
    },
    currentSalary: {
      type: 'string',
      enum: ['lessThanTwenty', 'twentyToThirtyFive', 'thirtyFiveToFifty', 'fiftyToSeventyFive', 'moreThanSeventyFive'],
    },
    highestLevelOfEducation: {
      type: 'string',
      enum: ['HS', 'AD', 'BD', 'MD', 'DD', 'NA'],
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: [
    'applicantFullName',
    'dateOfBirth',
    'ssn',
    'mailingAddress',
    'contactInfo',
    'hasCompletedActiveDuty',
    'dateReleasedFromActiveDuty',
    'activeDutyDuringHitechVets',
    'bankAccount',
    'hitechVetsPrograms',
    'isEmployed',
    'highestLevelOfEducation',
    'privacyAgreementAccepted',
  ],
};

export default schema;

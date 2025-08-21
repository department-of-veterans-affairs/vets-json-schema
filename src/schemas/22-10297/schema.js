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
    ssn: {
      $ref: '#/definitions/ssn',
    },
    vaFileNumber: {
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
    },
    veteranStatus: {
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
    trainingProviders: {
      type: 'object',
      properties: {
        providers: {
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
      required: ['providers'],
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
    statementOfTruthSignature: {
      type: 'string',
    },
    dateSigned: {
      $ref: '#/definitions/date',
    },
  },
  required: [
    'applicantFullName',
    'dateOfBirth',
    'mailingAddress',
    'dateReleasedFromActiveDuty',
    'activeDutyDuringHitechVets',
    'bankAccount',
    'veteranStatus',
    'isEmployed',
    'highestLevelOfEducation',
    'privacyAgreementAccepted',
    'statementOfTruthSignature',
    'dateSigned',
  ],
  anyOf: [{ required: ['ssn'] }, { required: ['vaFileNumber'] }],
};

export default schema;

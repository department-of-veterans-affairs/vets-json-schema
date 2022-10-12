import _ from 'lodash';
import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const benefits = ['chapter33', 'chapter30', 'chapter1606', 'chapter32'];

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR VA EDUCATION BENEFITS (22-1990)',
  type: 'object',
  definitions: _.merge(
    {
      year: {
        type: 'integer',
        minimum: 1900,
      },
    },
    _.pick(definitions, [
      'address',
      'fullName',
      'usaPhone',
      'ssn',
      'bankAccount',
      'serviceBefore1977',
      'date',
      'dateRange',
      'educationType',
      'educationProgram',
      'preferredContactMethod',
      'privacyAgreementAccepted',
      'gender',
      'postHighSchoolTrainings',
      'nonMilitaryJobs',
    ]),
  ),
  additionalProperties: false,
  properties: {
    chapter33: {
      type: 'boolean',
    },
    chapter30: {
      type: 'boolean',
    },
    chapter1606: {
      type: 'boolean',
    },
    chapter32: {
      type: 'boolean',
    },
    benefitsRelinquished: {
      type: 'string',
      enum: ['unknown', ..._.without(benefits, 'chapter33', 'chapter32'), 'chapter1607'],
    },
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    gender: {
      $ref: '#/definitions/gender',
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date',
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    veteranAddress: {
      $ref: '#/definitions/address',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    homePhone: {
      $ref: '#/definitions/usaPhone',
    },
    mobilePhone: {
      $ref: '#/definitions/usaPhone',
    },
    preferredContactMethod: {
      $ref: '#/definitions/preferredContactMethod',
    },
    bankAccount: {
      $ref: '#/definitions/bankAccount',
    },
    educationStartDate: {
      $ref: '#/definitions/date',
    },
    educationObjective: {
      type: 'string',
    },
    educationType: {
      $ref: '#/definitions/educationType',
    },
    educationProgram: {
      $ref: '#/definitions/educationProgram',
    },
    highSchoolOrGedCompletionDate: {
      $ref: '#/definitions/date',
    },
    faaFlightCertificatesInformation: {
      type: 'string',
    },
    serviceAcademyGraduationYear: {
      $ref: '#/definitions/year',
    },
    seniorRotc: {
      type: 'object',
      properties: {
        commissionYear: {
          $ref: '#/definitions/year',
        },
        rotcScholarshipAmounts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              year: {
                type: 'integer',
              },
              amount: {
                type: 'number',
              },
            },
          },
        },
      },
    },
    seniorRotcScholarshipProgram: {
      type: 'boolean',
    },
    civilianBenefitsAssistance: {
      type: 'boolean',
    },
    additionalContributions: {
      type: 'boolean',
    },
    activeDutyKicker: {
      type: 'boolean',
    },
    reserveKicker: {
      type: 'boolean',
    },
    activeDutyRepayingPeriod: {
      $ref: '#/definitions/dateRange',
    },
    serviceBefore1977: {
      $ref: '#/definitions/serviceBefore1977',
    },
    postHighSchoolTrainings: {
      $ref: '#/definitions/postHighSchoolTrainings',
    },
    nonMilitaryJobs: {
      $ref: '#/definitions/nonMilitaryJobs',
    },
    applyingUsingOwnBenefits: {
      type: 'boolean',
    },
    benefitsRelinquishedDate: {
      $ref: '#/definitions/date',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: ['privacyAgreementAccepted', 'veteranFullName'],
};

[['toursOfDuty'], ['currentlyActiveDuty']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

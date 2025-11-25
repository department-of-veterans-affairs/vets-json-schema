import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, [
  'date',
  'phone',
  'yesNoSchema',
  'email',
  'address',
  'profileAddress',
  'vaFileNumber',
  'fullNameNoSuffix',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-10272',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    // PART I - IDENTIFICATION INFORMATION
    applicantName: {
      $ref: '#/definitions/fullNameNoSuffix',
    },
    mailingAddress: {
      $ref: '#/definitions/profileAddress',
    },
    emailAddress: {
      $ref: '#/definitions/email',
    },
    homePhone: {
      $ref: '#/definitions/phone',
    },
    mobilePhone: {
      $ref: '#/definitions/phone',
    },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber',
    },
    payeeNumber: {
      type: 'string',
      maxLength: 2,
    },

    // PART II - VA EDUCATION INFORMATION
    hasPreviouslyApplied: {
      $ref: '#/definitions/yesNoSchema',
    },
    vaBenefitProgram: {
      type: 'string',
      minLength: 1,
      maxLength: 500,
    },

    // PART III - LICENSING OR CERTIFICATION TEST
    testName: {
      type: 'string',
      minLength: 1,
    },
    organizationName: {
      type: 'string',
      minLength: 1,
    },
    organizationAddress: {
      $ref: '#/definitions/address',
    },

    // PART IV - PREP COURSE INFORMATION
    prepCourseName: {
      type: 'string',
      minLength: 1,
    },
    prepCourseOrganizationName: {
      type: 'string',
      minLength: 1,
    },
    prepCourseOrganizationAddress: {
      $ref: '#/definitions/address',
    },
    prepCourseTakenOnline: {
      $ref: '#/definitions/yesNoSchema',
    },
    prepCourseStartDate: {
      $ref: '#/definitions/date',
    },
    prepCourseEndDate: {
      $ref: '#/definitions/date',
    },
    prepCourseCost: {
      type: 'number',
      minimum: 0,
    },

    remarks: {
      type: 'string',
      maxLength: 500,
    },

    // PART V - CERTIFICATION AND SIGNATURE
    statementOfTruthSignature: {
      type: 'string',
      minLength: 1,
    },
    dateSigned: {
      $ref: '#/definitions/date',
    },
  },

  required: [
    'applicantName',
    'mailingAddress',
    'vaFileNumber',
    'hasPreviouslyApplied',
    'testName',
    'organizationName',
    'organizationAddress',
    'prepCourseName',
    'prepCourseOrganizationName',
    'prepCourseOrganizationAddress',
    'prepCourseStartDate',
    'prepCourseEndDate',
    'prepCourseCost',
    'prepCourseTakenOnline',
    'statementOfTruthSignature',
    'dateSigned',
  ],

  // If they've previously applied, they must indicate which benefit
  oneOf: [
    {
      type: 'object',
      properties: { hasPreviouslyApplied: { enum: [true] } },
      required: ['vaBenefitProgram'],
    },
    {
      type: 'object',
      properties: { hasPreviouslyApplied: { enum: [false] } },
    },
  ],
};

export default schema;

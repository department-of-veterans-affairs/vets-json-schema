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
  'ssn',
  'vaFileNumber',
  'fullNameNoSuffix',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-0803',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  properties: {
    applicantName: {
      $ref: '#/definitions/fullNameNoSuffix',
    },
    statementOfTruthSignature: { type: 'string', minLength: 1 },
    dateSigned: {
      $ref: '#/definitions/date',
    },
    hasPreviouslyApplied: {
      $ref: '#/definitions/yesNoSchema',
    },
    vaBenefitProgram: {
      type: 'string',
      enum: ['chapter30', 'chapter33', 'chapter35', 'chapter1606'],
    },
    ssn: {
      $ref: '#/definitions/ssn',
    },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber',
    },
    payeeNumber: {
      type: 'string',
      maxLength: 2,
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
    testDate: {
      $ref: '#/definitions/date',
    },
    testName: {
      type: 'string',
      minLength: 1,
    },
    organizationAddress: {
      $ref: '#/definitions/address',
    },
    organizationName: {
      type: 'string',
      minLength: 1,
    },
    testCost: {
      type: 'number',
      minimum: 0,
    },
    remarks: {
      type: 'string',
      maxLength: 500,
    },
  },
  required: [
    'applicantName',
    'hasPreviouslyApplied',
    'mailingAddress',
    'testName',
    'testDate',
    'organizationName',
    'organizationAddress',
    'testCost',
    'statementOfTruthSignature',
    'dateSigned',
  ],
  anyOf: [
    {
      required: ['ssn'],
    },
    {
      required: ['vaFileNumber'],
    },
  ],
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

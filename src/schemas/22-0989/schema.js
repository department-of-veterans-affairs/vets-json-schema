import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);
const pickedDefinitions = _.pick(origDefinitions, [
  'date',
  'phone',
  'yesNoSchema',
  'email',
  'profileAddress',
  'ssn',
  'vaFileNumber',
  'fullNameNoSuffix',
]);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-0989',
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
    ssn: {
      $ref: '#/definitions/ssn',
    },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber',
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
    schoolWasClosed: {
      $ref: '#/definitions/yesNoSchema',
    },
    closedSchoolName: {
      type: 'string',
      minLength: 1,
    },
    closedSchoolAddress: {
      $ref: '#/definitions/profileAddress',
    },
    didCompleteProgramOfStudy: {
      $ref: '#/definitions/yesNoSchema',
    },
    didReceiveCredit: {
      $ref: '#/definitions/yesNoSchema',
    },
    wasEnrolledWhenSchoolClosed: {
      $ref: '#/definitions/yesNoSchema',
    },
    wasOnApprovedLeave: {
      $ref: '#/definitions/yesNoSchema',
    },
    withdrewPriorToClosing: {
      $ref: '#/definitions/yesNoSchema',
    },
    dateOfWithdraw: {
      $ref: '#/definitions/date',
    },
    enrolledAtNewSchool: {
      $ref: '#/definitions/yesNoSchema',
    },
    newSchoolName: {
      type: 'string',
      minLength: 1,
    },
    newProgramName: {
      type: 'string',
      minLength: 1,
    },
    isUsingTeachoutAgreement: {
      $ref: '#/definitions/yesNoSchema',
    },
    newSchoolGrants12OrMoreCredits: {
      $ref: '#/definitions/yesNoSchema',
    },
    schoolDidTransferCredits: {
      $ref: '#/definitions/yesNoSchema',
    },
    lastDateOfAttendance: {
      $ref: '#/definitions/date',
    },
    attestationName: {
      type: 'string',
      minLength: 1,
    },
    attestationDate: {
      $ref: '#/definitions/date',
    },
    remarks: {
      type: 'string',
      maxLength: 500,
    },
  },
  required: ['applicantName', 'mailingAddress', 'statementOfTruthSignature', 'dateSigned', 'schoolWasClosed'],
  anyOf: [
    {
      required: ['ssn'],
    },
    {
      required: ['vaFileNumber'],
    },
  ],
  // Kind of odd case here: the user answers 'no' to the first question and are
  // warned that they likely won't be able to apply, but are able to complete
  // the form anyway. So pretty much the entire form is required, but it's
  // all conditional on this first answer.
  oneOf: [
    {
      type: 'object',
      properties: { schoolWasClosed: { enum: [true] } },
      required: [
        'closedSchoolName',
        'closedSchoolAddress',
        'didCompleteProgramOfStudy',
        'didReceiveCredit',
        'wasEnrolledWhenSchoolClosed',
        'wasOnApprovedLeave',
        'withdrewPriorToClosing',
        'enrolledAtNewSchool',
        'schoolDidTransferCredits',
        'lastDateOfAttendance',
        'attestationName',
        'attestationDate',
      ],
      allOf: [
        {
          oneOf: [
            {
              type: 'object',
              properties: { withdrewPriorToClosing: { enum: [true] } },
              required: ['dateOfWithdraw'],
            },
            {
              type: 'object',
              properties: { withdrewPriorToClosing: { enum: [false] } },
            },
          ],
        },
        {
          oneOf: [
            {
              type: 'object',
              properties: { enrolledAtNewSchool: { enum: [true] } },
              required: [
                'newSchoolName',
                'newProgramName',
                'isUsingTeachoutAgreement',
                'newSchoolGrants12OrMoreCredits',
              ],
            },
            {
              type: 'object',
              properties: { enrolledAtNewSchool: { enum: [false] } },
            },
          ],
        },
      ],
    },
    {
      type: 'object',
      properties: { schoolWasClosed: { enum: [false] } },
    },
  ],
};
export default schema;

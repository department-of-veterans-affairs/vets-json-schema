import definitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL EXPENSE REPORT (21P-8416)',
  type: 'object',
  definitions: {
    date: definitions.date,
    email: definitions.email,
    ssn: definitions.ssn,
    vaFileNumber: definitions.vaFileNumber,
    address: definitions.address,
    fullName: definitions.fullName,
    files: definitions.files
  },
  properties: {
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    veteranDateOfBirth: {
      $ref: '#/definitions/date'
    },
    veteranAddress: {
      $ref: '#/definitions/address'
    },
    veteranFullName: {
      $ref: '#/definitions/fullName'
    },
    claimantNotVeteran: { type: 'boolean' },
    claimantFullName: {
      $ref: '#/definitions/fullName'
    },
    firstTimeReporting: { type: 'boolean' },
    statementOfTruthSignature: { type: 'string' },
    statementOfTruthCertified: { type: 'boolean' },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber',
    },
    email: {
      $ref: '#/definitions/email',
    },
    careExpenses: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipient', 'provider'],
        properties: {
          recipient: {
            type: 'string',
            enum: ['VETERAN', 'SPOUSE', 'DEPENDENT', 'OTHER'],
          },
          recipientName: { type: 'string' },
          provider: { type: 'string' },
          hourlyRate: { type: 'number' },
          weeklyHours: { type: 'number' },
          careDateRange: schemaHelpers.getDefinition('dateRange'),
          monthlyAmount: { type: 'number' },
        },
      },
    },
    medicalExpenses: {
      type: 'array',
      items: {
        type: 'object',
        required: ['recipient', 'provider', 'purpose', 'paymentDate', 'paymentFrequency', 'paymentAmount'],
        properties: {
          recipient: {
            type: 'string',
            enum: ['VETERAN', 'SPOUSE', 'DEPENDENT', 'OTHER'],
          },
          recipientName: { type: 'string' },
          provider: { type: 'string' },
          purpose: { type: 'string' },
          paymentDate: { $ref: '#/definitions/date' },
          paymentFrequency: { type: 'string', enum: ['ONCE_MONTH', 'ONCE_YEAR', 'ONE_TIME'] },
          paymentAmount: { type: 'number' },
        },
      },
    },
    mileageExpenses: {
      type: 'array',
      items: {
        type: 'object',
        require: ['travaler', 'travelerLocation'],
        properties: {
          traveler: {
            type: 'string',
            enum: ['VETERAN', 'SPOUSE', 'DEPENDENT', 'OTHER'],
          },
          travelerName: { type: 'string' },
          travelLocation: {
            type: 'string',
            enum: ['HOSPITAL', 'CLINIC', 'PHARMACY', 'OTHER'],
          },
          travelLocationOther: { type: 'string' },
          travelMilesTraveled: { type: 'string', pattern: '^\\d*$' },
          travelDate: {
            $ref: '#/definitions/date'
          },
          travelReimbursementAmount: { type: 'number' }
        }
      }
    },
    files: { $ref: '#/definitions/files' }
  },
  required: ['statementOfTruthSignature', 'statementOfTruthCertified', 'veteranSocialSecurityNumber'],
};

export default schema;

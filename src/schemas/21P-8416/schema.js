import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL EXPENSE REPORT (21P-8416)',
  type: 'object',
  definitions: {
    email: definitions.email,
    ssn: definitions.ssn,
    vaFileNumber: definitions.vaFileNumber,
  },
  properties: {
    claimantNotVeteran: { type: 'boolean' },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
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
    // TODO: Add remaining properties after reviewing IA guidance.
    // veteranFullName
    // primaryPhone
    // claimantFullName
    // claimantAddress
    // careExpenses
    // medicalExpenses
    // mileageExpenses
    // files
  },
  required: ['statementOfTruthSignature', 'statementOfTruthCertified', 'veteranSocialSecurityNumber'],
};

export default schema;

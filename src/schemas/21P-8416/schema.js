import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL EXPENSE REPORT (21P-8416)',
  type: 'object',
  definitions: {},
  properties: {
    claimantNotVeteran: { type: 'boolean' },
    veteranSocialSecurityNumber: definitions.ssn,
    firstTimeReporting: { type: 'boolean' },
    statementOfTruthSignature: { type: 'string' },
    statementOfTruthCertified: { type: 'boolean' },
  },
  required: ['statementOfTruthSignature', 'statementOfTruthCertified'],
};

export default schema;

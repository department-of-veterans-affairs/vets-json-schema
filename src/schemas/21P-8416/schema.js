import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'MEDICAL EXPENSE REPORT (21P-8416)',
  type: 'object',
  definitions: {},
  properties: {
    // Section I VETERAN'S IDENTIFICATION INFORMATION
    veteran: {
      type: 'object',
      properties: {
        veteranFullName: definitions.fullName,
        veteranSsn: definitions.ssn,
        veteranFileNumber: definitions.fileNumber,
      },
    },
  },
  required: ['privacyAgreementAccepted', 'veteranFullName', 'veteranSsn', 'veteranFileNumber'],
};

export default schema;

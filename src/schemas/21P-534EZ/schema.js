import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR D.I.C., SURVIVORS PENSION, AND/OR ACCRUED BENEFITS (21P-534EZ)',
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

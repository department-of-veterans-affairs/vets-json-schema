import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';

const schema = schemas['28-8832'];

let schemaTestHelper = new SchemaTestHelper(
  schema,
  {
    privacyAgreementAccepted: true
  }
);
let sharedTests = new SharedTests(schemaTestHelper);

describe('disabled veterans vocational rehabilitation schema', () => {
  [
    ['fullName', ['applicantFullName', 'veteranFullName', 'previousVeteranBenefitsFullName']],
    ['ssn', ['applicantSocialSecurityNumber', 'veteranSocialSecurityNumber']],
    ['date', ['applicantDateOfBirth', 'veteranDateOfBirth', 'veteranDateOfDeathMIAPOW']],
    ['address', ['applicantAddress']],
    ['phone', ['applicantHomePhone', 'applicantMobilePhone']],
    ['gender', ['applicantGender']],
    ['email', ['applicantEmail']],
    ['vaFileNumber', ['applicantVaFileNumber', 'veteranVaFileNumber', 'previousBenefitsVaFileNumber']],
    ['serviceHistory', ['applicantServiceHistory']]
  ].forEach((args) => {
    sharedTests.runTest(...args);
  });
});
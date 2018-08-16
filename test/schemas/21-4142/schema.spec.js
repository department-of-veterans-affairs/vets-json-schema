import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import fixtures from '../../support/fixtures';
import _ from 'lodash';
import SharedTests from '../../support/shared-tests';

const schema = schemas['21-4142'];

let schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.anyOf;

let schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
let sharedTests = new SharedTests(schemaTestHelper);

describe('21-4142 schema', () => {

    // Veteran Full Name
    sharedTests.runTest('fullName', ['claimantFullName']);

    // Veteran Social Security Number
    sharedTests.runTest('ssn', ['veteranSocialSecurityNumber']);

    // Veteran VA File Number
    sharedTests.runTest('centralMailVaFile', ['veteranVaFileNumber']);

    // Veteran Date of Birth
    sharedTests.runTest('date', ['veteranDateOfBirth']);

    // Veteran Address
    sharedTests.runTest('centralMailAddress', ['claimantAddress']);

    // Veteran Phone
    sharedTests.runTest('phone', ['applicantPrimaryPhone']);

    // Veteran Email
    sharedTests.runTest('email', ['claimantEmail']);
});

//Limited Consent
schemaTestHelper.testValidAndInvalid('limitedConsent', {
    valid: ['whatever'],
    invalid: [3, false]
});
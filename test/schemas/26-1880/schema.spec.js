import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';
import schemas from '../../../dist/schemas';
import { testData } from './testData';

const schema = schemas['686C-674'];
const schemaTestHelper = new SchemaTestHelper(schema);
const sharedTests = new SharedTests(schemaTestHelper);

describe('COE schema', () => {
  schemaTestHelper.testValidAndInvalid('personalInformation', testData.personalInformation);
  schemaTestHelper.testValidAndInvalid(
    'contactInformation.mailingAddress.applicantAddress',
    testData.contactInformation,
  );
});

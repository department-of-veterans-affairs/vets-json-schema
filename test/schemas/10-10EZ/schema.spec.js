import { omit } from 'lodash';
import schemas from '../../../dist/schemas';
import SchemaTestHelper from '../../support/schema-test-helper';

const applicationSchema = schemas['10-10EZ'];

const schemaTestHelper = new SchemaTestHelper(omit(applicationSchema, 'required'));

// TODO: These should be cross checked against what's generated by common/veteran.js and possibly
// what's in utils/validations.js for a more inter-connected verification that we're sending and
// getting what's expected all around.
describe('healthcare-application json schema', () => {
  schemaTestHelper.testValidAndInvalid('attachments', {
    valid: [
      [
        {
          dd214: true,
          confirmationCode: 'testing',
          name: 'testing',
          size: 1,
        },
      ],
    ],
    invalid: [1],
  });

  schemaTestHelper.testValidAndInvalid('lastServiceBranch', {
    valid: [
      'air force',
      'army',
      'coast guard',
      'marine corps',
      'merchant seaman',
      'navy',
      'noaa',
      'space force',
      'usphs',
      'f.commonwealth',
      'f.guerilla',
      'f.scouts new',
      'f.scouts old',
    ],
    invalid: [null, 3, 'random-string'],
  });
});

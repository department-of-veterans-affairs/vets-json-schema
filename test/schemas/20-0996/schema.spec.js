import { cloneDeep } from 'lodash';

import schema from '../../../dist/20-0996-schema.json';
import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaCopy = cloneDeep(schema);

delete schemaCopy.properties.data.properties.attributes.required;
delete schemaCopy.properties.data.properties.attributes.veteran.required;
delete schemaCopy.properties.data.properties.attributes.veteran.properties.address.required;
delete schemaCopy.properties.data.properties.attributes.informalConferenceRep.minItems;
delete schemaCopy.properties.data.properties.attributes.informalConferenceTimes.minItems;
delete schemaCopy.properties.included.items.requred;
delete schemaCopy.properties.included.items.properties.attributes.required;
delete schemaCopy.properties.included.minItems;

const flatSchema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'HIGHER-LEVEL REVIEW',
  properties: {
    ...schemaCopy.properties.data.properties.attributes,
    included: schemaCopy.properties.included,
  },
};

delete flatSchema.properties.type;

const schemaTestHelper = new SchemaTestHelper(flatSchema);
const sharedTests = new SharedTests(schemaTestHelper);

const phoneData = {
  valid: [
    { phoneNumberCountryCode: '999999' },
    { areaCode: '999' },
    { phoneNumber: '1234' },
    { phoneNumber: '5551212' },
    { phoneNumberExt: 'abc1234567' },
    { phoneNumberExt: 'abcdefghij' },
    { phonenumberCountryCode: '1', areaCode: '800', phoneNumber: '5551212', phoneNumberExt: 'x123' },
  ],
  invalid: [
    { phoneNumberCountryCode: 'abc' },
    { phoneNumberCountryCode: 123 },
    { areaCode: '1' },
    { areaCode: '123' },
    { areaCode: '9876' },
    { areaCode: 456 },
    { phoneNumber: '' },
    { phoneNumber: '123456789012345' },
    { phoneNumberExt: '12345678901' },
  ],
};

describe('20-0996 (Higher-Level Review) schema', () => {
  // Not testing this entry since ajv doesn't seem to like an entry with the
  // key of "type"
  // schemaTestHelper.testValidAndInvalid('type', {
  //   valid: ['HigherLevelReview'],
  //   invalid: [null, 'anything else', 1234],
  // });

  schemaTestHelper.testValidAndInvalid('benefitType', {
    valid: ['compensation'],
    invalid: [null, 'anything else', 1234],
  });

  schemaTestHelper.testValidAndInvalid('veteran.address.zipCode5', {
    valid: ['12345', '98765'],
    invalid: [null, '123', 1234, {}],
  });

  schemaTestHelper.testValidAndInvalid('veteran.phone', phoneData);

  sharedTests.runTest('email', ['veteran.emailAddressText']);

  schemaTestHelper.testValidAndInvalid('veteran.timeZone', {
    valid: ['EST', 'Etc/GMT-10', 'Pacific/Samoa'],
    // The schema isn't including full enum list of all time zones, so any
    // string will pass here; the front-end is using
    // `Intl.DateTimeFormat().resolvedOptions().timeZone` to pass the time zone
    // on submission; so the user has no control over it
    invalid: [null, 1234, {}],
  });

  schemaTestHelper.testValidAndInvalid('sameOffice', {
    valid: [true, false],
    invalid: [null, 'foo', 1234, {}],
  });

  schemaTestHelper.testValidAndInvalid('informalConference', {
    valid: [true, false],
    invalid: ['foo', 1234, {}],
  });

  schemaTestHelper.testValidAndInvalid('informalConferenceRep', {
    valid: [{ name: 'foo' }, { name: 'foozus barrius' }, { name: 'foo bar, III' }],
    invalid: [{ name: null }, { name: 123 }, { name: {} }],
  });

  schemaTestHelper.testValidAndInvalid('informalConferenceRep.phone', phoneData);

  schemaTestHelper.testValidAndInvalid('informalConferenceTimes', {
    valid: [['800-1000 ET'], ['1000-1230 ET', '1230-1400 ET'], ['1400-1630 ET']],
    invalid: [
      [''],
      ['1200'],
      ['1000-430 ET'],
      ['800-1000 ET', '800-1000 ET'],
      ['800-1000 ET', '1000-1230 ET', '1230-1400 ET'],
    ],
  });

  schemaTestHelper.testValidAndInvalid('included', {
    valid: [
      [
        {
          type: 'ContestableIssue',
          attributes: {},
        },
      ],
      [
        {
          type: 'ContestableIssue',
          attributes: {
            issue: 'Lorem ipsum',
            decisionIssueId: 12345,
            ratingIssueId: '012345',
            ratingDecisionIssueId: '67890',
          },
        },
      ],
    ],
    invalid: [
      [{}],
      [
        {
          type: 'ContestableIssuez',
          attributes: {},
        },
      ],
    ],
  });
});

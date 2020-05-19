/* global it:false */
/* eslint-disable no-unused-expressions */
import ajv from 'ajv';
import { expect } from 'chai';
import _ from 'lodash';

import schemas from '../../../dist/schemas';
import SharedTests from '../../support/shared-tests';
import SchemaTestHelper from '../../support/schema-test-helper';

const schema = _.cloneDeep(schemas['20-0996']);
// Flatten schema
const flatSchema = {
  ...schema,
  properties: {
    type: schema.properties.data.properties.type,
    included: schema.properties.included,
    ...schema.properties.data.properties.attributes.properties,
  },
};
delete flatSchema.properties.veteran.required;
delete flatSchema.properties.included.required;
const schemaTestHelper = new SchemaTestHelper(flatSchema);
const sharedTests = new SharedTests(schemaTestHelper);

const jsonValidator = ajv({
  allErrors: true,
  errorDataPath: 'property',
  removeAdditional: true,
  useDefaults: true,
});

function definitionValidator(field) {
  const properties = {
    field: schema.definitions[field],
  };
  const tinySchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties,
  };

  return function validator(value) {
    const fn = jsonValidator.compile(tinySchema);
    return fn({
      field: value,
    });
  };
}

function stringGenerate(length, char = 'a') {
  return new Array(length + 1).join(char);
}

describe('20-0996 (Higher-Level Review) schema', () => {
  // Definitions:
  [
    {
      name: 'formType',
      valid: ['HigherLevelReview'],
      invalid: [null, '', 'something-else'],
    },
    {
      name: 'benefitType',
      valid: ['compensation'],
      invalid: ['something-else'],
    },
    {
      name: 'addressLine1',
      valid: ['foo'],
      invalid: [stringGenerate(51)],
    },
    {
      name: 'addressLine2',
      valid: ['bar'],
      invalid: [stringGenerate(21)],
    },
    {
      name: 'city',
      valid: ['foo city'],
      invalid: ['', stringGenerate(52)],
    },
    {
      name: 'state',
      valid: ['AL'],
      invalid: ['ZZZZ'],
    },
    {
      name: 'zipCode',
      valid: ['12345', '12345-9999'],
      invalid: ['', '123', 12345, 'abcde', '12345-1', '12345-12345'],
    },
    {
      name: 'country',
      valid: ['Bahamas'],
      invalid: ['Candyland'],
    },
    {
      name: 'phone',
      valid: ['0123456789'],
      invalid: ['', 'abcdefghij', '1-456-7890', 1234567890],
    },
    {
      name: 'phoneCountryCode',
      valid: ['1'],
      invalid: [stringGenerate(11), stringGenerate(11, '1')],
    },
    {
      name: 'phoneExt',
      valid: ['x1234'],
      invalid: [stringGenerate(11), stringGenerate(11, '1')],
    },
    {
      name: 'email',
      valid: ['email@emal.com'],
      invalid: ['', 'email', 'email@', '@email.com'],
    },
    {
      name: 'date',
      valid: ['2020-01-01'],
      invalid: ['', '01-01-2020', '2020'],
    },
  ].forEach(definition => {
    describe(definition.name, () => {
      const validator = definition.extra
        ? definitionValidator(definition.name, definition.extra)
        : definitionValidator(definition.name);
      definition.valid.forEach(value => {
        it(`validates "${value}" as correct`, () => {
          expect(validator(value)).to.be.true;
        });
      });

      definition.invalid.forEach(value => {
        it(`validates "${value}" as incorrect`, () => {
          expect(validator(value)).to.be.false;
        });
      });
    });
  });

  // Properties
  sharedTests.runTest('date', ['receiptDate']);
  // ** These shared tests are not working properly **
  // sharedTests.runTest('usaPhone', ['phoneNumber']);
  // sharedTests.runTest('usaPostalCode', ['zipPostalCode']);
  // sharedTests.runTest('email', ['emailAddress']);

  schemaTestHelper.testValidAndInvalid('type', {
    valid: ['HigherLevelReview'],
    invalid: ['anything else', 1234],
  });

  schemaTestHelper.testValidAndInvalid('benefitType', {
    valid: ['compensation'],
    invalid: ['anything else', 1234],
  });

  schemaTestHelper.testValidAndInvalid('legacyOptInApproved', {
    valid: [true, false],
    invalid: ['foo', 1234, {}],
  });

  schemaTestHelper.testValidAndInvalid('sameOffice', {
    valid: [true, false],
    invalid: ['foo', 1234, {}],
  });

  schemaTestHelper.testValidAndInvalid('informalConference', {
    valid: [true, false],
    invalid: ['foo', 1234, {}],
  });

  schemaTestHelper.testValidAndInvalid('veteran', {
    valid: [
      {
        addressLine1: 'foo',
        city: 'bar',
        countryCode: 'USA',
      },
      {
        addressLine1: 'foo',
        city: 'bar',
        countryCode: 'USA',
      },
      {
        addressLine1: 'foo',
        addressLine2: 'foz',
        city: 'Some City',
        stateOrProvinceCode: 'GU',
        countryCode: 'USA',
        phoneNumber: '1234567890',
        phoneNumberCountryCode: '1',
        phoneNumberExt: 'x9876',
        emailAddress: 'a@bc.com',
      },
    ],
    invalid: [
      {
        addressLine1: null,
        city: 'bar',
        countryCode: 'USA',
      },
      {
        addressLine1: 'foo',
        city: '',
        countryCode: 'USA',
      },
      {
        addressLine1: 'foo',
        city: 'bar',
        countryCode: '',
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('informalConferenceRep', {
    valid: [
      {
        name: 'foo',
        phoneNumber: '0123456789',
      },
      {
        name: 'bar',
        phoneNumber: '0123456789',
        phoneNumberCountryCode: '1',
        phoneNumberExt: 'x123',
      },
    ],
    invalid: [
      {
        name: '',
        phoneNumber: '',
      },
    ],
  });

  schemaTestHelper.testValidAndInvalid('informalConferenceTimes', {
    valid: [['800-1000'], ['1000-1230', '1230-200'], ['200-430']],
    invalid: [[], [''], ['1200'], ['1000-430'], ['800-1000', '800-1000'], ['800-1000', '1000-1230', '1230-200']],
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
            notes: 'Lorem ipsum',
            decisionIssueId: 12345,
            ratingIssueId: '012345',
            ratingDecisionIssueId: '67890',
          },
        },
      ],
    ],
    invalid: [
      [],
      [
        {
          type: 'ContestableIssuez',
          attributes: {},
        },
      ],
    ],
  });
});

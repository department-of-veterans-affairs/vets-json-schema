import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep, omit } from 'lodash';
import schema from '../../../src/schemas/22-10297/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, 'required'));

const testData = {
  applicantFullName: {
    valid: [
      {
        first: 'John',
        middle: 'Williams',
        last: 'Doe',
      },
    ],
    invalid: [
      {
        first: '',
        title: '',
        last: 'Doe',
      },
      {
        first: 'John',
        title: '',
        last: '',
      },
    ],
  },
  dateOfBirth: {
    valid: ['1990-01-01'],
    invalid: ['', null],
  },
  applicantSocialSecurityNumber: {
    valid: ['111223333'],
    invalid: ['', null],
  },
  applicantFileNumber: {
    valid: ['C1234567'],
    invalid: ['', null],
  },
  // country not required
  mailingAddress: {
    valid: [
      {
        country: 'USA',
        street: 'Some Street',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94102',
      },
    ],
    invalid: [
      {
        country: 'USA',
        street: '',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94102',
      },
      {
        country: 'USA',
        street: 'Some Street',
        city: '',
        state: 'CA',
        postalCode: '94102',
      },
      {
        country: 'USA',
        street: 'Some Street',
        city: 'San Francisco',
        state: '',
        postalCode: '94102',
      },
      {
        country: 'USA',
        street: 'Some Street',
        city: 'San Francisco',
        state: '',
        postalCode: '',
      },
    ],
  },
  contactInfo: {
    valid: [
      {
        mobilePhone: '1234567890',
        homePhone: '1112223333',
        emailAddress: 'test@email.com',
      },
    ],
    invalid: [
      {
        mobilePhone: '',
        homePhone: '1112223333',
        emailAddress: 'test@email.com',
      },
    ],
  },
  dateReleasedFromActiveDuty: {
    valid: ['2025-06-26'],
    invalid: ['', null],
  },
  bankAccount: {
    valid: [
      {
        accountType: 'checking',
        routingNumber: '123456789',
        accountNumber: '12123434',
      },
      {
        accountType: 'savings',
        routingNumber: '123456789',
        accountNumber: '12123434',
      },
    ],
    invalid: [
      {
        accountType: 'cd',
        routingNumber: '123456789',
        accountNumber: '12123434',
      },
      {
        accountType: 'checking',
        routingNumber: '',
        accountNumber: '12123434',
      },
      {
        accountType: 'savings',
        routingNumber: '123456789',
        accountNumber: null,
      },
    ],
  },
  trainingProviders: {
    valid: [
      {
        providers: [
          {
            providerName: 'First Program',
            providerAddress: {
              country: 'USA',
              street: 'First Address',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94102',
            },
          },
        ],
        plannedStartDate: '2025-08-25',
      },
      {
        providers: [],
        plannedStartDate: '2025-08-25',
      },
    ],
    invalid: [
      {
        providers: [
          {
            providerName: 'First Program',
            providerAddress: {
              country: 'USA',
              street: 'First Address',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94102',
            },
          },
          {
            providerName: 'Second Program',
            providerAddress: {
              country: 'USA',
              street: 'Second Address',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94102',
            },
          },
          {
            providerName: 'Third Program',
            providerAddress: {
              country: 'USA',
              street: 'Third Address',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94102',
            },
          },
          {
            providerName: 'Fourth Program',
            providerAddress: {
              country: 'USA',
              street: 'Fourth Address',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94102',
            },
          },
          {
            providerName: 'Fifth Program',
            providerAddress: {
              country: 'USA',
              street: 'Fifth Address',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94102',
            },
          },
        ],
        plannedStartDate: '2025-08-25',
      },
      {
        providers: [
          {
            providerName: 'First Program',
            providerAddress: {
              country: 'USA',
              street: 'First Address',
              city: 'San Francisco',
              state: 'CA',
              postalCode: '94102',
            },
          },
        ],
        plannedStartDate: null,
      },
    ],
  },
  technologyAreaOfFocus: {
    valid: [
      'computerProgramming',
      'computerSoftware',
      'mediaApplication',
      'dataProcessing',
      'informationSciences',
      'somethingElse',
    ],
    invalid: ['', null, 'engineer', 'computerScience', 'technology'],
  },
  currentSalary: {
    valid: ['lessThanTwenty', 'twentyToThirtyFive', 'thirtyFiveToFifty', 'fiftyToSeventyFive', 'moreThanSeventyFive'],
    invalid: ['', null, 'twentyFive', 50, 'overFifty'],
  },
  highestLevelOfEducation: {
    valid: ['HS', 'AD', 'BD', 'MD', 'DD', 'NA'],
    invalid: ['', null, 'AA', 'BB', 'CC'],
  },
  privacyAgreementAccepted: {
    valid: [true],
    invalid: [false, '', null],
  },
  dateSigned: {
    valid: ['2025-06-30'],
    invalid: ['', null],
  },
  yesNoSchema: {
    valid: [true, false],
    invalid: ['', null],
  },
};

describe('10297 schema', () => {
  it('should have required fields', () => {
    expect(schema.properties.contactInfo.required).to.deep.equal(['mobilePhone']);
    expect(schema.properties.trainingProviders.properties.providers.items.required).to.deep.equal([
      'providerName',
      'providerAddress',
    ]);
    expect(schema.properties.trainingProviders.required).to.deep.equal(['providers', 'plannedStartDate']);
    expect(schema.required).to.deep.equal([
      'applicantFullName',
      'dateOfBirth',
      'ssn',
      'mailingAddress',
      'contactInfo',
      'hasCompletedActiveDuty',
      'dateReleasedFromActiveDuty',
      'activeDutyDuringHitechVets',
      'bankAccount',
      'trainingProviders',
      'isEmployed',
      'highestLevelOfEducation',
      'privacyAgreementAccepted',
      'statementOfTruthSignature',
      'dateSigned',
    ]);
  });

  schemaTestHelper.testValidAndInvalid('applicantFullName', testData.applicantFullName);
  schemaTestHelper.testValidAndInvalid('dateOfBirth', testData.dateOfBirth);
  schemaTestHelper.testValidAndInvalid('applicantSocialSecurityNumber', testData.applicantSocialSecurityNumber);
  schemaTestHelper.testValidAndInvalid('applicantFileNumber', testData.applicantFileNumber);
  schemaTestHelper.testValidAndInvalid('mailingAddress', testData.mailingAddress);
  schemaTestHelper.testValidAndInvalid('contactInfo', testData.contactInfo);
  schemaTestHelper.testValidAndInvalid('hasCompletedActiveDuty', testData.yesNoSchema);
  schemaTestHelper.testValidAndInvalid('hasCompletedByDischarge', testData.yesNoSchema);
  schemaTestHelper.testValidAndInvalid('dateReleasedFromActiveDuty', testData.dateReleasedFromActiveDuty);
  schemaTestHelper.testValidAndInvalid('activeDutyDuringHitechVets', testData.yesNoSchema);
  schemaTestHelper.testValidAndInvalid('bankAccount', testData.bankAccount);
  schemaTestHelper.testValidAndInvalid('trainingProviders', testData.trainingProviders);
  schemaTestHelper.testValidAndInvalid('isEmployed', testData.yesNoSchema);
  schemaTestHelper.testValidAndInvalid('isInTechnologyIndustry', testData.yesNoSchema);
  schemaTestHelper.testValidAndInvalid('technologyAreaOfFocus', testData.technologyAreaOfFocus);
  schemaTestHelper.testValidAndInvalid('currentSalary', testData.currentSalary);
  schemaTestHelper.testValidAndInvalid('highestLevelOfEducation', testData.highestLevelOfEducation);
  schemaTestHelper.testValidAndInvalid('privacyAgreementAccepted', testData.privacyAgreementAccepted);
  schemaTestHelper.testValidAndInvalid('dateSigned', testData.dateSigned);
});

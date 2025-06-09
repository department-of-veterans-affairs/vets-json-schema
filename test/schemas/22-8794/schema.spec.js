import { cloneDeep, omit } from 'lodash';
import schema from '../../../src/schemas/22-8794/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, 'required'));

const testData = {
  designatingOfficial: {
    valid: [
      {
        fullName: { first: 'John', last: 'Doe' },
        title: 'President',
        phoneNumber: '5555555555',
        internationalPhoneNumber: '+442012345678',
        emailAddress: 'john.doe@gmail.com',
      },
    ],
    invalid: [
      {
        fullName: { first: null, last: 'Doe' },
        title: null,
        phoneNumber: null,
        internationalPhoneNumber: null,
        emailAddress: 'johndoegmail.com',
      },
    ],
  },
  institutionDetails: {
    valid: [
      {
        hasVaFacilityCode: true,
        facilityCode: '12345678',
        institutionName: 'Institution of Test',
        institutionAddress: {
          street: '111 2nd St S',
          city: 'Seattle',
          state: 'WA',
          postalCode: '33771',
          county: 'Washington',
        },
      },
      {
        hasVaFacilityCode: false,
        facilityCode: '',
        institutionName: 'Institution of Test',
        institutionAddress: {
          street: '111 2nd St S',
          city: 'Seattle',
          state: 'WA',
          postalCode: '33771',
          county: 'Washington',
        },
      },
    ],
    invalid: [
      {
        hasVaFacilityCode: null,
        facilityCode: '12345678',
        institutionName: 'Institution of Test',
      },
      {
        hasVaFacilityCode: '',
        facilityCode: '',
        institutionName: '',
      },
    ],
  },
  primaryOfficialDetails: {
    valid: [
      {
        fullName: { first: 'John', last: 'Doe' },
        title: 'President',
        phoneNumber: '5555555555',
        internationalPhoneNumber: '+442012345678',
        emailAddress: 'john.doe@gmail.com',
        // primaryOfficialTraining: {
        //   trainingDate: '2024-11-25',
        //   hasVaEducationBenefits: true,
        //   trainingExempt: false,
        // },
      },
    ],
    invalid: [
      {
        fullName: { first: null, last: 'Doe' },
        title: null,
        phoneNumber: null,
        internationalPhoneNumber: null,
        emailAddress: 'johndoegmail.com',
        // primaryOfficialTraining: {
        //   trainingDate: 'march-28-2024',
        //   hasVaEducationBenefits: null,
        //   trainingExempt: null,
        // },
      },
    ],
  },
  primaryOfficialTraining: {
    valid: [
      {
        trainingCompletionDate: '2024-11-25',
        trainingExempt: false,
      },
    ],
    invalid: [
      {
        trainingCompletionDate: 'march-28-2024',
        trainingExempt: null,
      },
    ],
  },
  primaryOfficialBenefitStatus: {
    valid: [
      {
        hasVaEducationBenefits: true,
      },
      {
        hasVaEducationBenefits: false,
      },
    ],
    invalid: [
      {
        hasVaEducationBenefits: null,
      },
    ],
  },

  //  the rest of schema tests to update when the UI is done.
  additionalCertifyingOfficials: {
    valid: [
      [
        {
          additionalCertifyingOfficialsDetails: {
            fullName: { first: 'John', last: 'Doe' },
            title: 'President',
            phoneNumber: '5555555555',
            internationalPhoneNumber: '+442012345678',
            emailAddress: 'john.doe@gmail.com',
            hasVaEducationBenefits: true,
            trainingCompletionDate: '2024-11-25',
            trainingExempt: false,
          },
        },
      ],
      [
        {
          additionalCertifyingOfficialsDetails: {
            fullName: { first: 'Jane', last: 'Doe' },
            title: 'VicePresident',
            phoneNumber: '5555555555',
            internationalPhoneNumber: '+442012345678',
            emailAddress: 'jane.doe@gmail.com',
            hasVaEducationBenefits: false,
            trainingCompletionDate: '2024-10-10',
            trainingExempt: true,
          },
        },
      ],
    ],
    invalid: [
      [
        {
          additionalCertifyingOfficialsDetails: {
            fullName: { first: null, last: 'Doe' },
            title: null,
            phoneNumber: 'null',
            internationalPhoneNumber: '+4412345678900098',
            emailAddress: 'john.stvegmail.com',
            hasVaEducationBenefits: null,
            trainingCompletionDate: 'march-28-2024',
            trainingExempt: null,
          },
        },
        {
          additionalCertifyingOfficialsDetails: {
            fullName: { first: 'Jane', last: 'Doe' },
            title: 'Vice President',
            phoneNumber: '0987654321345',
            internationalPhoneNumber: '+4412345678900123',
            emailAddress: 'johndoegmail.com',
            hasVaEducationBenefits: null,
            trainingCompletionDate: '2024-feb-25',
            trainingExempt: null,
          },
        },
      ],
    ],
  },
  hasReadOnlyCertifyingOfficial: {
    valid: [true],
    invalid: [null],
  },
  readOnlyCertifyingOfficial: {
    valid: [[{ fullName: { first: 'John', last: 'Doe' } }, { fullName: { first: 'Jane', last: 'Doe' } }]],
    invalid: [[{ fullName: { first: null, last: 'Doe' } }, { fullName: { first: null, last: 'Doe' } }]],
  },
  remarks: {
    valid: ['This is another remark', 'This is a remark'],
    invalid: [null, ''],
  },
};
describe('22-8794 schema', () => {
  schemaTestHelper.testValidAndInvalid('designatingOfficial', testData.designatingOfficial);
  schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
  schemaTestHelper.testValidAndInvalid('primaryOfficialDetails', testData.primaryOfficialDetails);
  schemaTestHelper.testValidAndInvalid('primaryOfficialTraining', testData.primaryOfficialTraining);
  schemaTestHelper.testValidAndInvalid('primaryOfficialBenefitStatus', testData.primaryOfficialBenefitStatus);
  schemaTestHelper.testValidAndInvalid('additionalCertifyingOfficials', testData.additionalCertifyingOfficials);
  schemaTestHelper.testValidAndInvalid('hasReadOnlyCertifyingOfficial', testData.hasReadOnlyCertifyingOfficial);
  schemaTestHelper.testValidAndInvalid('readOnlyCertifyingOfficial', testData.readOnlyCertifyingOfficial);
  schemaTestHelper.testValidAndInvalid('remarks', testData.remarks);
});

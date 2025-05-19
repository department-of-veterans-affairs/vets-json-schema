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
        hasVaFacilityCode: 'yes',
        facilityCode: '12345678',
        institutionName: 'Institution of Test',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'CA',
          zipCode: '12345',
        },
      },
      {
        hasVaFacilityCode: 'no',
        facilityCode: '',
        institutionName: 'Institution of Test',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'CA',
          zipCode: '12345',
        },
      },
    ],
    invalid: [
      {
        hasVaFacilityCode: null,
        facilityCode: '12345678',
        institutionName: 'Institution of Test',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'CA',
          zipCode: '12345',
        },
      },
      {
        hasVaFacilityCode: '',
        facilityCode: '',
        institutionName: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        },
      },
    ],
  },
  primaryCertifyingOfficial: {
    valid: [
      {
        fullName: { first: 'John', last: 'Doe' },
        title: 'President',
        phoneNumber: '5555555555',
        internationalPhoneNumber: '+442012345678',
        emailAddress: 'john.doe@gmail.com',
        trainingCompletionDate: '2024-11-25',
        hasVaEducationBenefits: 'yes',
        trainingExempt: false,
      },
    ],
    invalid: [
      {
        fullName: { first: null, last: 'Doe' },
        title: null,
        phoneNumber: null,
        internationalPhoneNumber: null,
        emailAddress: 'johndoegmail.com',
        trainingCompletionDate: null,
        hasVaEducationBenefits: null,
        trainingExempt: null,
      },
    ],
  },
  additionalCertifyingOfficials: {
    valid: [
      [
        {
          additionalCertifyingOfficial: {
            fullName: { first: 'John', last: 'Doe' },
            title: 'President',
            usPhone: '1234567890',
            internationalPhone: '+441234567890',
            email: 'john.doe@gmail.com',
            hasVaEducationBenefits: 'yes',
            trainingCompletionDate: '2024-11-25',
            trainingExempt: false,
          },
        },
        {
          additionalCertifyingOfficial: {
            fullName: { first: 'Jane', last: 'Doe' },
            title: 'Vice President',
            usPhone: '0987654321',
            internationalPhone: '+441234567890',
            email: 'jane.doe12@gmail.com',
            hasVaEducationBenefits: 'no',
            trainingCompletionDate: '2024-11-25',
            trainingExempt: true,
          },
        },
      ],
    ],
    invalid: [
      [
        {
          additionalCertifyingOfficial: {
            fullName: { first: null, last: 'Doe' },
            title: null,
            usPhone: '1234567890235',
            internationalPhone: '+4412345678900098',
            email: 'john.stvegmail.com',
            hasVaEducationBenefits: null,
            trainingCompletionDate: 'march-28-2024',
            trainingExempt: null,
          },
        },
        {
          additionalCertifyingOfficial: {
            fullName: { first: 'Jane', last: 'Doe' },
            title: 'Vice President',
            usPhone: '0987654321345',
            internationalPhone: '+4412345678900123',
            email: 'johndoegmail.com',
            hasVaEducationBenefits: null,
            trainingCompletionDate: '2024-feb-25',
            trainingExempt: null,
          },
        },
      ],
    ],
  },
  hasReadOnlyCertifyingOfficial: {
    valid: [{ hasReadOnlyCertifyingOfficial: 'yes' }, { hasReadOnlyCertifyingOfficial: 'no' }],
    invalid: [{ hasReadOnlyCertifyingOfficial: null }, { hasReadOnlyCertifyingOfficial: '' }],
  },
  readOnlyCertifyingOfficial: {
    valid: [[{ fullName: { first: 'John', last: 'Doe' } }, { fullName: { first: 'Jane', last: 'Doe' } }]],
    invalid: [[{ fullName: { first: null, last: 'Doe' } }, { fullName: { first: 'null', last: 'Doe' } }]],
  },
  remarks: {
    valid: [{ remarks: 'This is a remark' }, { remarks: 'This is another remark' }],
    invalid: [{ remarks: null }, { remarks: '' }, { remarks: ' ' }],
  },

  //   additionalCertifyingOfficials: {
  //     valid: [
  //       [
  //         {
  //           additionalCertifyingOfficial: {
  //             fullName: { first: 'John', last: 'Doe' },
  //             title: 'President',
  //             usPhone: '1234567890',
  //             internationalPhone: '+441234567890',
  //             email: 'john.doe@gmail.com',
  //             hasVaEducationBenefits: 'yes',
  //             trainingCompletionDate: '2024-11-25',
  //             trainingExempt: false,
  //           },
  //         },
  //         {
  //           additionalCertifyingOfficial: {
  //             fullName: { first: 'Jane', last: 'Doe' },
  //             title: 'Vice President',
  //             usPhone: '0987654321',
  //             internationalPhone: '+441234567890',
  //             email: 'john.steve@gmail.com',
  //             hasVaEducationBenefits: 'no',
  //             trainingCompletionDate: '2024-11-25',
  //             trainingExempt: true,
  //           },
  //         },
  //       ],
  //     ],
  //     invalid: [
  //       [
  //         {
  //           additionalCertifyingOfficial: {
  //             fullName: { first: 'John', last: 'null' },
  //             title: '',
  //             usPhone: '1234567890235',
  //             internationalPhone: '+4412345678900098',
  //             email: 'john.stevegmail.com',
  //             hasVaEducationBenefits: '',
  //             trainingCompletionDate: 'march-28-2024',
  //             trainingExempt: null,
  //           },
  //         },
  //         {
  //           additionalCertifyingOfficial: {
  //             fullName: { first: 'Jane', last: 'Doe' },
  //             title: 'Vice President',
  //             usPhone: '0987654321345',
  //             internationalPhone: '+4412345678900123',
  //             email: 'johndoegmail.com',
  //             hasVaEducationBenefits: null,
  //             trainingCompletionDate: '2024-feb-25',
  //             trainingExempt: null,
  //           },
  //         },
  //       ],
  //     ],
  //   },
  //   hasReadOnlyCertifyingOfficial: {
  //     valid: [{ hasReadOnlyCertifyingOfficial: 'yes' }, { hasReadOnlyCertifyingOfficial: 'no' }],
  //     invalid: [{ hasReadOnlyCertifyingOfficial: null }, { hasReadOnlyCertifyingOfficial: '' }],
  //   },
  //   readOnlyCertifyingOfficial: {
  //     valid: [[{ fullName: { first: 'John', last: 'Doe' } }, { fullName: { first: 'Jane', last: 'Doe' } }]],
  //     invalid: [[{ fullName: { first: 'John', last: 'null' } }, { fullName: { first: 'null', last: 'Doe' } }]],
  //   },
  //   remarks: {
  //     valid: [{ remarks: 'This is a remark' }, { remarks: 'This is another remark' }],
  //     invalid: [{ remarks: null }, { remarks: '' }, { remarks: ' ' }],
  //   },
};
describe('22-8794 schema', () => {
  schemaTestHelper.testValidAndInvalid('designatingOfficial', testData.designatingOfficial);
  //   sharedTests.testValidSchema(testData.institutionDetails, 'institutionDetails');
  //   sharedTests.testValidSchema(testData.primaryCertifyingOfficial, 'primaryCertifyingOfficial');
  //   sharedTests.testValidSchema(testData.additionalCertifyingOfficials, 'additionalCertifyingOfficials');
  //   sharedTests.testValidSchema(testData.hasReadOnlyCertifyingOfficial, 'hasReadOnlyCertifyingOfficial');
  //   sharedTests.testValidSchema(testData.readOnlyCertifyingOfficial, 'readOnlyCertifyingOfficial');
  //   sharedTests.testValidSchema(testData.remarks, 'remarks');
});

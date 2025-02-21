import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep } from 'lodash';
import schema from '../../../src/schemas/22-10216/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaWithoutRequired = cloneDeep(schema);

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);

const testData = {
  institutionOfficial: {
    valid: [
      {
        first: 'John',
        last: 'Doe',
        title: 'President',
      },
    ],
    invalid: [
      {
        first: 'John',
        last: 'Doe',
        title: null,
      },
      {
        first: '',
        last: 'Doe',
        title: null,
      },
      {
        first: 'John',
        last: '',
        title: 'some title',
      },
    ],
  },
  institutionDetails: {
    valid: [
      {
        institutionName: 'Test Institution',
        facilityCode: '12345678',
        termStartDate: '2024-01-01',
      },
    ],
    invalid: [
      {
        institutionName: 'Test Institution',
        facilityCode: '12345f6g',
        termStartDate: '2024-01-01',
      },
    ],
  },
  studentRatioCalcChapter: {
    valid: [
      {
        beneficiaryStudent: 1,
        numOfStudent: 1,
        dateOfCalculation: '2024-01-01',
      },
    ],
    invalid: [
      {
        beneficiaryStudent: '1r',
        numOfStudent: '1r',
        dateOfCalculation: '20230101',
      },
      {
        institutionName: 'Institution of Test',
        facilityCode: 'IoT 123',
        termStartDate: 'start date',
      },
    ],
  },
};
describe('10216 schema', () => {
  it('should have required fields', () => {
    expect(schema.properties.institutionDetails.required).to.deep.equal([
      'certifyingOfficial',
      'institutionDetails',
      'statementOfTruthSignature',
      'dateSigned',
    ]);
    expect(schema.properties.studentRatioCalcChapter.required).to.deep.equal([
      'beneficiaryStudent',
      'numOfStudent',
      'dateOfCalculation',
    ]);
    schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
    schemaTestHelper.testValidAndInvalid('studentRatioCalcChapter', testData.studentRatioCalcChapter);
  });
});

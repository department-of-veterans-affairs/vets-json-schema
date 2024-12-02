import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep } from 'lodash';
import schema from '../../../src/schemas/22-10215/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaWithoutRequired = cloneDeep(schema);
delete schemaWithoutRequired.required;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);

const testData = {
  institutionDetails: {
    institutionName: {
      valid: 'Institution of Test',
      invalid: null,
    },
    facilityCode: {
      valid: 'IoT 123',
      invalid: 123456,
    },
    termStartDate: {
      valid: '2024-11-25',
      invalid: 'start date',
    },
    dateOfCalculations: {
      valid: '2024-11-28',
      invalid: 20241128,
    },
  },
};

describe('22-10215 Schema', () => {
  it('should have required fields', () => {
    expect(schema.required).to.deep.equal('institutionName', 'facilityCode', 'termStartDate', 'dateOfCalculations');
  });

  schemaTestHelper.testValidAndInvalid('institutionName', testData.institutionName);
  schemaTestHelper.testValidAndInvalid('facilityCode', testData.facilityCode);
  schemaTestHelper.testValidAndInvalid('termStartDate', testData.termStartDate);
  schemaTestHelper.testValidAndInvalid('dateOfCalculations', testData.dateOfCalculations);
});

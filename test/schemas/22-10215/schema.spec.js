import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep } from 'lodash';
import schema from '../../../src/schemas/22-10215/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);

const schemaTestHelper = new SchemaTestHelper(schemaClone);

const testData = {
  institutionDetails: {
    valid: [
      {
        institutionName: 'Institution of Test',
        facilityCode: 'IoT 123',
        termStartDate: '2024-11-25',
        dateOfCalculations: '2024-11-28',
      },
    ],
    invalid: [
      {
        institutionName: null,
        facilityCode: 'IoT 123',
        termStartDate: '2024-11-25',
        dateOfCalculations: '2024-11-28',
      },
      {
        institutionName: 'Institution of Test',
        facilityCode: 123456,
        termStartDate: '2024-11-25',
        dateOfCalculations: '2024-11-28',
      },
      {
        institutionName: 'Institution of Test',
        facilityCode: 'IoT 123',
        termStartDate: 'start date',
        dateOfCalculations: '2024-11-28',
      },
      {
        institutionName: 'Institution of Test',
        facilityCode: 'IoT 123',
        termStartDate: '2024-11-25',
        dateOfCalculations: 20241128,
      },
    ],
  },
};

describe('22-10215 Schema', () => {
  it('should have required fields', () => {
    expect(schema.properties.institutionDetails.required).to.deep.equal([
      'institutionName',
      'facilityCode',
      'termStartDate',
      'dateOfCalculations',
    ]);
  });

  schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
});

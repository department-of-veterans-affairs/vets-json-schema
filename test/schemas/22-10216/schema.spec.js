import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep } from 'lodash';
import schema from '../../../src/schemas/22-10216/schema';

const schemaWithoutRequired = cloneDeep(schema);
delete schemaWithoutRequired.required;

describe('10216 schema', () => {
  it('should have required fields', () => {
    expect(schema.properties.institutionDetails.required).to.deep.equal([
      'institutionName',
      'facilityCode',
      'termStartDate',
    ]);
    expect(schema.properties.studentRatioCalcChapter.required).to.deep.equal([
      'beneficiaryStudent',
      'numOfStudent',
      'dateOfCalculation',
    ]);
  });
});

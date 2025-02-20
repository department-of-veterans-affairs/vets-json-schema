import { expect } from 'chai';
import { it } from 'mocha';
import { cloneDeep, omit } from 'lodash';
import schema from '../../../src/schemas/22-10215/schema';
import SchemaTestHelper from '../../support/schema-test-helper';

const schemaClone = cloneDeep(schema);
const schemaTestHelper = new SchemaTestHelper(omit(schemaClone, 'required'));

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
        first: 'John',
        last: '',
        title: null,
      },
    ],
  },
  institutionDetails: {
    valid: [
      {
        institutionName: 'Institution of Test',
        facilityCode: '12345678',
        termStartDate: '2024-11-25',
        dateOfCalculations: '2024-11-28',
      },
      {
        institutionName: 'Institution of Test',
        facilityCode: '23456789',
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
  programs: {
    valid: [
      [{
        programName: 'Computer Science',
        studentsEnrolled: 100,
        supportedStudents: 80,
        fte: {
          supported: 20,
          nonSupported: 10,
          totalFTE: 30,
          supportedPercentageFTE: 66.67,
        },
      }],
      [{
        programName: 'Computer Science',
        studentsEnrolled: 10,
        supportedStudents: 8,
      }],
    ],
    invalid: [
      [{
        programName: null,
        studentsEnrolled: 100,
        supportedStudents: 80,
        fte: {
          supported: 9.5,
          nonSupported: 7,
          totalFTE: 80,
          supportedPercentageFTE: 62.5,
        },
      }],
      [{
        programName: 'Computer Science',
        studentsEnrolled: '100',
        supportedStudents: 80,
        fte: {
          supported: 9,
          nonSupported: 7,
        },
      }],
      [{
        programName: 'Computer Science',
        studentsEnrolled: null,
        supportedStudents: 80,
        fte: {
          supported: 50,
          nonSupported: 30,
          totalFTE: 80,
          supportedPercentageFTE: 62.5,
        },
      }],
      [{
        programName: 'Computer Science',
        studentsEnrolled: 100,
        supportedStudents: undefined,
        fte: {
          supported: 50,
          nonSupported: 30,
          totalFTE: 80,
          supportedPercentageFTE: 62.5,
        },
      }],
    ],
  },
};

describe('22-10215 Schema', () => {
  it('should have required fields', () => {
    expect(schema.required).to.deep.equal([
      'certifyingOfficial',
      'institutionDetails',
      'programs',
      'statementOfTruthSignature',
    ]);
    expect(schema.properties.institutionDetails.required).to.deep.equal([
      'institutionName',
      'facilityCode',
      'termStartDate',
      'dateOfCalculations',
    ]);
    expect(schema.properties.programs.items.required).to.deep.equal([
      'programName', 
      'studentsEnrolled', 
      'supportedStudents'
    ]);
  });

  schemaTestHelper.testValidAndInvalid('institutionDetails', testData.institutionDetails);
  schemaTestHelper.testValidAndInvalid('programs', testData.programs);
});

/* global it */
import _ from 'lodash';
import { expect } from 'chai';
import SchemaTestHelper from '../../support/schema-test-helper';
import SharedTests from '../../support/shared-tests';
import testData from '../../support/test-data';
import fixtures from '../../support/fixtures';

import schema from '../../../dist/21-526EZ-ALLCLAIMS-schema.json';

const makeString = (maxLength = 100, fill = 'abcd') => {
  const size = Math.ceil(maxLength / fill.length);
  return new Array(size)
    .fill(fill)
    .join('')
    .substring(0, maxLength);
};

const makeAttachments = (ids = [], isEnum = true) => {
  const len = ids.length - 1;
  const randomId = () => ids[Math.floor(Math.random() * len)];
  const invalid = [[{}], [{ name: null }], [{ name: 123 }]];
  if (isEnum) {
    invalid.push([{ name: 'abc', attachmentId: 'L0XYZ' }]);
    invalid.push([{ name: 123, attachmentId: 'L01534553' }]);
  }
  return {
    valid: [
      [{ name: 'abc', attachmentId: randomId() }],
      [
        { name: 'abc', attachmentId: randomId() },
        { name: 'def', attachmentId: randomId() },
        { name: 'ghi', attachmentId: randomId(), confirmationCode: '123' },
      ],
    ],
    invalid,
  };
};

const validAddress = {
  addressLine1: '123 a rd',
  addressLine2: 'foo',
  addressLine3: 'bar',
  city: 'abc',
  state: 'AA',
  zipCode: '12345',
  country: 'Spain',
};

const data = {
  string: (maxLength, fill = 'abcd') => {
    const valid = ['foo', 'bar'];
    const invalid = [null, 123, {}, []];
    if (maxLength) {
      valid.push(makeString(maxLength, fill));
      invalid.push(makeString(maxLength + 5, fill));
    }
    return { valid, invalid };
  },
  nonRequiredPhone: {
    valid: ['5555555555', '1234567890', ''],
    invalid: ['1234', '555-555-5555', '555 555 5555'],
  },
  phone: {
    valid: ['5555555555', '1234567890'],
    invalid: ['1234', '555-555-5555', '555 555 5555', ''],
  },
  country: {
    valid: ['USA', 'Spain', 'Japan'],
    invalid: ['', 'Xxxx', 'Foo'],
  },
  state: {
    valid: ['AL', 'KS', 'CA'],
    invalid: [null, '12', 'ABC'],
  },
  address: {
    valid: [
      {
        addressLine1: '123 a rd',
        city: 'abc',
        postalCode: '12345-1234',
        country: 'USA',
      },
      validAddress,
    ],
    invalid: [
      {},
      { addressLine1: '123 a rd' },
      { addressLine1: '123 a rd', country: 'USA' },
      { addressLine1: '123 a rd', city: 'abc' },
      { country: 'USA', city: 'abc' },
      {
        addressLine1: '123 a rd',
        city: 'abc',
        state: 'XX',
        country: 'USA',
      },
      {
        addressLine1: '123 a rd',
        city: 'abc',
        country: 'XXX',
      },
    ],
    invalidNoRequired: [
      {
        addressLine1: '123 a rd',
        city: 'abc',
        state: 'XX',
        country: 'USA',
      },
      {
        addressLine1: '123 a rd',
        city: 'abc',
        country: 'XXX',
      },
    ],
  },
  dateRangeAllRequired: {
    valid: testData.dateRange.data.valid,
    invalid: [
      {},
      { from: fixtures.dateRange },
      { to: fixtures.dateRange },
      { from: fixtures.dateRange, to: 'foo' },
      { from: 'bar', to: fixtures.dateRange },
    ],
  },
  minimumYearDateRange: {
    valid: testData.minimumYearDateRange.data.valid,
    invalid: [
      { startDate: 'XXXX-01-02' },
      { endDate: '79-01-02' },
      { startDate: fixtures.minimumYearDateRange.startDate, endDate: 'XXXX-01-02' },
      { startDate: '79-01-02', endDate: fixtures.minimumYearDateRange.endDate },
    ],
  },
  gulfWar1990Details: {
    valid: [
      { afghanistan: fixtures.minimumYearDateRange },
      { bahrain: fixtures.minimumYearDateRange },
      { egypt: fixtures.minimumYearDateRange },
      { iraq: fixtures.minimumYearDateRange },
      { israel: fixtures.minimumYearDateRange },
      { jordan: fixtures.minimumYearDateRange },
      { kuwait: fixtures.minimumYearDateRange },
      { neutralzone: fixtures.minimumYearDateRange },
      { oman: fixtures.minimumYearDateRange },
      { qatar: fixtures.minimumYearDateRange },
      { saudiarabia: fixtures.minimumYearDateRange },
      { somalia: fixtures.minimumYearDateRange },
      { syria: fixtures.minimumYearDateRange },
      { uae: fixtures.minimumYearDateRange },
      { turkey: fixtures.minimumYearDateRange },
      { waters: fixtures.minimumYearDateRange },
      { airspace: fixtures.minimumYearDateRange },
      { airspace: fixtures.minimumYearDateRange, jordan: fixtures.minimumYearDateRange },
      { airspace: fixtures.minimumYearDateRange, jordan: fixtures.minimumYearDateRange, syria: fixtures.minimumYearDateRange },
    ],
    invalid: [
      { afghanistan: { startDate: 'XXXX-01-01', endDate: '79-01-02' } },
      { turkey: { startDate: '79-01-02' } },
      { qatar: { startDate: 'XXXX-01-02', endDate: '1999-01-02' } },
      { qatar: { startDate: 'XXXX-01-02', endDate: '1999-01-02' }, turkey: { startDate: '1999-01-02' } },
    ]
  },
  gulfWar2001Details: {
    valid: [
      { djibouti: fixtures.minimumYearDateRange },
      { lebanon: fixtures.minimumYearDateRange },
      { uzbekistan: fixtures.minimumYearDateRange },
      { yemen: fixtures.minimumYearDateRange },
      { airspace: fixtures.minimumYearDateRange },
      { airspace: fixtures.minimumYearDateRange, uzbekistan: fixtures.minimumYearDateRange },
      { airspace: fixtures.minimumYearDateRange, uzbekistan: fixtures.minimumYearDateRange, djibouti: fixtures.minimumYearDateRange },
    ],
    invalid: [
      { yemen: { startDate: 'XXXX-01-01', endDate: '79-01-02' } },
      { djibouti: { startDate: '79-01-02' } },
      { lebanon: { startDate: 'XXXX-01-02', endDate: '1999-01-02' } },
      { lebanon: { startDate: '1999-01-02', endDate: '79-01-02' }, turkey: { startDate: '1999-01-02' } },
      { lebanon: { startDate: 'XXXX-01-02', endDate: '1999-01-02' }, turkey: { endDate: '1999-01-02' } },
    ]
  },
  herbicideDetails: {
    valid: [
      { cambodia: fixtures.minimumYearDateRange },
      { guam: fixtures.minimumYearDateRange },
      { koreandemilitarizedzone: fixtures.minimumYearDateRange },
      { johnston: fixtures.minimumYearDateRange },
      { laos: fixtures.minimumYearDateRange },
      { c123: fixtures.minimumYearDateRange },
      { thailand: fixtures.minimumYearDateRange },
      { vietnam: fixtures.minimumYearDateRange },
      { vietnam: fixtures.minimumYearDateRange, laos: fixtures.minimumYearDateRange },
      { vietnam: fixtures.minimumYearDateRange, laos: fixtures.minimumYearDateRange, koreandemilitarizedzone: fixtures.minimumYearDateRange },
    ],
    invalid: [
      { guam: { startDate: 'XXXX-01-01', endDate: '79-01-02' } },
      { koreandemilitarizedzone: { startDate: '79-01-02' } },
      { laos: { startDate: 'XXXX-01-02', endDate: '1999-01-02' } },
      { laos: { startDate: '1999-01-02', endDate: '79-01-02' }, turkey: { endDate: '1999-01-02' } },
      { laos: { startDate: 'XXXX-01-02', endDate: '1999-01-02' }, turkey: { startDate: '1999-01-02' } },
    ]
  },
  otherExposuresDetails: {
    valid: [
      { asbestos: fixtures.minimumYearDateRange },
      { chemical: fixtures.minimumYearDateRange },
      { mos: fixtures.minimumYearDateRange },
      { mustardgas: fixtures.minimumYearDateRange },
      { radiation: fixtures.minimumYearDateRange },
      { water: fixtures.minimumYearDateRange },
      { water: fixtures.minimumYearDateRange, mos: fixtures.minimumYearDateRange },
      { water: fixtures.minimumYearDateRange, mos: fixtures.minimumYearDateRange, chemical: fixtures.minimumYearDateRange },
    ],
    invalid: [
      { water: { startDate: 'XXXX-01-01', endDate: '79-01-02' } },
      { mustardgas: { startDate: '79-01-02' } },
      { asbestos: { startDate: 'XXXX-01-02', endDate: '1999-01-02' } },
      { asbestos: { startDate: '1999-01-02', endDate: '79-01-02' }, radiation: { endDate: '1999-01-02' } },
      { asbestos: { startDate: 'XXXX-01-02', endDate: '1999-01-02' }, radiation: { startDate: '1999-01-02' } },
    ]
  },
  alternateNames: {
    valid: [
      [{ first: 'john', last: 'doe' }],
      [
        { first: 'john', middle: 'A', last: 'doe' },
        { first: 'john', middle: 'B', last: 'doe' },
      ],
    ],
    invalid: [[], [{ first: '' }], [{ last: '_ $' }], [{ middle: 'abcdefghijklmnopqrstuvwxyzaabbc' }]],
  },
  servicePeriods: {
    valid: [
      [
        {
          serviceBranch: 'Air Force Reserve',
          dateRange: fixtures.dateRange,
        },
        {
          serviceBranch: 'Air National Guard',
          dateRange: fixtures.dateRange,
        },
      ],
    ],
    invalid: [
      [{ serviceBranch: 123456, dateRange: fixtures.dateRange }],
      [{ serviceBranch: 'Air Force' }],
      [{ serviceBranch: 'Air Force', dateRange: { from: '2015-01-01' } }],
      [{ dateRange: {} }],
    ],
  },
  separationLocation: {
    valid: [
      { separationLocationCode: '123603', separationLocationName: 'Andersen AFB - Air Force / Guam' },
      { separationLocationCode: '98360', separationLocationName: 'Ft. Harrison' },
      { separationLocationCode: '98382', separationLocationName: 'Kitsap NS* (formerly Bremerton NB)' },
      { separationLocationCode: '123646', separationLocationName: 'Nellis AFB, NV/Creech AFB, NV' },
    ],
    invalid: [
      { separationLocationCode: 1234 },
      { separationLocationName: '^' },
      { separationLocationCode: '12345', separationLocationName: '$@' },
      { separationLocationCode: '12345', separationLocationName: makeString(270) },
    ],
  },
  reservesNationalGuardService: {
    valid: [
      { unitName: 'test', obligationTermOfServiceDateRange: fixtures.dateRange },
      {
        unitName: 'test2',
        obligationTermOfServiceDateRange: fixtures.dateRange,
        receivingTrainingPay: true,
        title10Activation: {
          title10ActivationDate: fixtures.date,
          anticipatedSeparationDate: fixtures.date,
        },
      },
    ],
    invalid: [{}, { unitName: 1234 }, { obligationTermOfServiceDateRange: { from: '2020-01-01' } }],
  },
  confinements: {
    valid: [[fixtures.dateRange], [fixtures.dateRange, { from: '2015-03-21', to: '2018-07-21' }]],
    invalid: [[], [{}], [{ from: '2001-03-21' }], [{ to: '2014-07-21' }]],
  },
  branch: {
    valid: [
      'Air Force',
      'Army',
      'Coast Guard',
      'Marine Corps',
      'National Oceanic and Atmospheric Administration',
      'Navy',
      'Public Health Service',
    ],
    invalid: [1234, null],
  },
  specialIssues: {
    valid: [['ALS', 'HEPC', 'POW'], ['PTSD/1', 'PTSD/2', 'PTSD/3', 'PTSD/4'], ['MST']],
    invalid: [[null], [''], [123], [{}]],
  },
  ratedDisabilities: {
    valid: [
      [
        { name: 'issue 1', disabilityActionType: 'NONE' },
        { name: 'issue 2', disabilityActionType: 'NEW' },
        { name: 'issue 3', disabilityActionType: 'SECONDARY' },
      ],
      [
        {
          name: 'issue 4',
          disabilityActionType: 'INCREASE',
          specialIssues: ['ALS'],
          ratedDisabilityId: '123',
          diagnosticCode: 123,
          classificationCode: '234',
          secondaryDisabilities: [],
        },
      ],
      [{ name: 'issue 5', disabilityActionType: 'REOPEN' }],
    ],
    invalid: [
      [],
      [{}],
      [{ name: 1234 }],
      [{ name: 1234, disabilityActionType: 'NEW' }],
      [{ name: 'foo', disabilityActionType: 'BAR' }],
      [{ name: 'foo', disabilityActionType: 1234 }],
    ],
  },
  newDisabilities: {
    valid: [
      [
        { condition: 'issue 1', cause: 'NEW' },
        { condition: 'issue 2', cause: 'SECONDARY' },
      ],
      [
        {
          condition: 'issue 3',
          cause: 'WORSENED',
          classificationCode: '123',
          primaryDescription: 'foo',
          causedByDisability: 'bar',
          causedByDisabilityDescription: 'bas',
          specialIssues: ['MST'],
          worsenedDescription: 'bat',
          worsenedEffects: 'bau',
          vaMistreatmentDescription: 'bav',
          vaMistreatmentLocation: 'baw',
          vaMistreatmentDate: 'XXXX-XX-XX',
        },
      ],
      [{ condition: 'issue 4', cause: 'VA' }],
    ],
    invalid: [
      // [{}],
      // [{ condition: 1234 }],
      // [{ condition: 1234, cause: 'NEW' }],
      // [{ condition: 'issue 5' }],
      // [{ condition: 'issue 6', cause: 'XYZ' }],
      // [{ condition: 'issue 7', cause: 123 }],
    ],
  },
  ptsdIncident: {
    valid: [
      {},
      { incidentDate: fixtures.date },
      {
        incidentDate: fixtures.date,
        incidentDescription: 'foo',
        unitAssigned: 'bar',
        unitAssignedDates: fixtures.dateRange,
      },
    ],
    invalid: [
      null,
      { incidentDate: 'baz' },
      { unitAssigned: 1234 },
      { unitAssignedDates: { from: 'xx', to: 123 } },
      { unitAssignedDates: { from: 123, to: 'xx' } },
    ],
  },
  secondaryPtsdIncident: {
    valid: [
      {},
      { sources: [{ name: 'foo' }] },
      {
        sources: [{ name: 'foo' }],
        incidentDate: fixtures.date,
        description: 'bar',
        unitAssigned: 'baz',
        unitAssignedDates: fixtures.dateRange,
      },
    ],
    invalid: [
      null,
      { sources: '' },
      { incidentDate: 'foo' },
      { unitAssignedDates: { from: 'xx', to: 123 } },
      { unitAssignedDates: { from: 123, to: 'xx' } },
    ],
  },
  vaTreatmentCenterAddress: {
    valid: [{ country: 'USA' }, { country: 'Spain', city: 'abc' }, { country: 'Spain', city: 'xyz', state: 'AL' }],
    invalid: [
      {},
      { country: 'XYZ' },
      { country: 'Spain', state: 'AB' },
      { state: 'AL' },
      { country: 'USA', city: 1234 },
    ],
  },
  homelessOrAtRisk: {
    valid: ['no', 'homeless', 'atRisk'],
    invalid: ['', 'foo', 1234],
  },
  homelessHousingSituation: {
    valid: ['shelter', 'notShelter', 'anotherPerson', 'other'],
    invalid: ['', 'foo', 1234],
  },
  atRiskHousingSituation: {
    valid: ['losingHousing', 'leavingShelter', 'other'],
    invalid: ['', 'foo', 1234],
  },
  vaTreatmentFacilities: {
    valid: [
      [{ treatmentCenterName: 'abc', treatedDisabilityNames: ['xyz'] }],
      [
        { treatmentCenterName: 'abc', treatedDisabilityNames: ['xyz'] },
        {
          treatmentCenterName: makeString(100, 'abc123'),
          treatedDisabilityNames: ['xyz'],
          treatmentDateRange: fixtures.dateRange,
          vaTreatmentCenterAddress: { country: 'USA' },
        },
      ],
    ],
    invalid: [[], [{}], [{ treatmentCenterName: 1234 }], [{ treatmentCenterName: 'foo', treatedDisabilityNames: [] }]],
  },
  bankAccountType: {
    valid: ['Checking', 'Savings'],
    invalid: [null, [], '', 'foo', 123],
  },
  bankAccountNumber: {
    valid: ['1234', '123456789', '12345678901234567', '123 abc'],
    invalid: ['', '123', makeString(20)],
  },
  bankRoutingNumber: {
    valid: ['123456789', '987654321', '*****1234'],
    invalid: [null, '', '123', 'abcdefghi', 123456789],
  },
  bankName: {
    valid: ['1234', 'abcd', 'xxxx yyyy', makeString(35)],
    invalid: [null, 123, makeString(40)],
  },
  education: {
    valid: [
      'Some elementary school',
      'Some high school',
      'High school diploma or GED',
      'Some college',
      "Associate's degree",
      'Bachelor’s degree',
      'Master’s degree',
      'Doctoral degree',
      'Other',
    ],
    invalid: [null, 123, 'foo', {}],
  },
  form0781: {
    valid: [
      {},
      { remarks: '0123' },
      {
        remarks: 'a',
        additionalIncidentText: 'b',
        additionalSecondaryIncidentText: 'c',
        otherInformation: ['d', 'e'],
        incidents: [
          { personalAssault: true },
          {
            personalAssault: false,
            medalsCitations: 'f',
            incidentDate: fixtures.date,
            incidentLocation: {
              country: 'USA',
              city: 'ghi',
              state: 'AL',
              additionalDetails: 'jkl',
            },
            incidentDescription: 'mno',
            unitAssigned: 'pqr',
            unitAssignedDates: fixtures.dateRange,
            personsInvolved: [
              {},
              {
                name: fixtures.fullName,
                rank: 'st',
                injuryDeath: 'other',
                injuryDeathOther: 'uv',
                injuryDeathDate: fixtures.date,
                unitAssigned: 'wx',
                description: 'yz',
              },
            ],
            sources: [
              {
                name: 'foo',
                address: validAddress,
              },
            ],
          },
        ],
      },
    ],
    invalid: [
      null,
      { remarks: 123 },
      { otherInformation: [123] },
      { incidents: [{ personalAssault: 'true' }] },
      { incidents: [{ personalAssault: true, personsInvolved: [{ name: 'foo ' }] }] },
    ],
  },
  form4142: {
    valid: [
      {},
      { limitedConsent: 'abc' },
      {
        limitedConsent: 'def',
        providerFacility: [
          {
            providerFacilityName: 'abc',
            providerFacilityAddress: { ...fixtures.address, state: 'AL', postalCode: '12345' },
            treatmentDateRange: [fixtures.dateRange],
          },
          {
            providerFacilityName: 'def',
            providerFacilityAddress: { ...fixtures.address, state: 'FL', postalCode: '54321' },
            treatmentDateRange: [fixtures.dateRange, fixtures.dateRange],
          },
        ],
      },
    ],
    invalid: [
      { limitedConsent: 123 },
      { limitedConsent: 'abc', providerFacility: [] },
      {
        limitedConsent: 'abc',
        providerFacility: [{ providerFacilityName: 'abc' }],
      },
      {
        limitedConsent: 'abc',
        providerFacility: [{ providerFacilityName: 'abc', providerFacilityAddress: {} }],
      },
      {
        limitedConsent: 'abc',
        providerFacility: [{ providerFacilityName: 'abc', treatmentDateRange: fixtures.dateRange }],
      },
      {
        limitedConsent: 'abc',
        providerFacility: [
          {
            providerFacilityName: 'abc',
            providerFacilityAddress: { ...fixtures.address, state: 'AL', postalCode: '12345' },
            treatmentDateRange: {},
          },
        ],
      },
    ],
  },
  form8940: {
    valid: [
      {},
      {
        unemployability: {
          mostIncome: 1234,
          yearEarned: '1234',
          job: 'foo',
          disabilityPreventingEmployment: 'bar',
          underDoctorHopitalCarePast12M: true,
          doctorProvidedCare: [{ name: 'baz', address: validAddress, dates: 'zoo' }],
          hospitalProvidedCare: [{ name: 'foz', address: validAddress, dates: 'zoa' }],
          disabilityAffectedEmploymentFullTimeDate: fixtures.date,
          lastWorkedFullTimeDate: fixtures.date,
          becameTooDisabledToWorkDate: fixtures.date,
          mostEarningsInAYear: '1234',
          yearOfMostEarnings: '1234',
          occupationDuringMostEarnings: '1234',
          previousEmployers: [
            {
              name: 'foy',
              employerAddress: validAddress,
              phone: '8005551212',
              typeOfWork: 'fot',
              hoursPerWeek: 998,
              dates: fixtures.dateRange,
              timeLostFromIllness: '1234',
              mostEarningsInAMonth: 1,
              inBusiness: true,
            },
          ],
          disabilityPreventMilitaryDuties: true,
          past12MonthsEarnedIncome: 1,
          currentMonthlyEarnedIncome: 99999,
          leftLastJobDueToDisability: true,
          leftLastJobDueToDisabilityRemarks: 'fox',
          receiveExpectDisabilityRetirement: true,
          receiveExpectWorkersCompensation: false,
          attemptedToObtainEmploymentSinceUnemployability: true,
          appliedEmployers: [{ name: 'foo', address: validAddress, workType: 'bar', date: fixtures.date }],
          education: 'Other',
          receivedOtherEducationTrainingPreUnemployability: true,
          otherEducationTrainingPreUnemployability: [{ name: 'baz', dates: fixtures.dateRange }],
          receivedOtherEducationTrainingPostUnemployability: true,
          otherEducationTrainingPostUnemployability: [{ name: 'bas', dates: fixtures.dateRange }],
          remarks: 'fooz',
        },
      },
    ],
    invalid: [
      { unemployability: '' },
      { unemployability: { mostIncome: 'xxxx' } },
      { unemployability: { doctorProvidedCare: '' } },
      { unemployability: { hospitalProvidedCare: '' } },
      { unemployability: { appliedEmployers: '' } },
      { unemployability: { education: 'foo' } },
      { unemployability: { otherEducationTrainingPostUnemployability: '' } },
    ],
  },
};

const schemaWithoutRequired = _.cloneDeep(schema);
delete schemaWithoutRequired.required;
delete schemaWithoutRequired.properties.serviceInformation.required;

const schemaTestHelper = new SchemaTestHelper(schemaWithoutRequired);
const sharedTests = new SharedTests(schemaTestHelper);

const testValidAndInvalid = (definitionName, fields) => {
  schemaTestHelper.testValidAndInvalid(definitionName, fields || data[definitionName]);
};

/* Modified from definitions.spec.js */
const testValidAndInvalidDefinitions = (definitionName, fields) => {
  const schemaDefinitionTestHelper = new SchemaTestHelper({
    $schema: 'http://json-schema.org/draft-04/schema#',
    type: 'object',
    definitions: schema.definitions,
    properties: {
      [definitionName]: schema.definitions[definitionName],
    },
  });
  schemaDefinitionTestHelper.testValidAndInvalid(
    definitionName,
    fields || data[definitionName] || (testData[definitionName] && testData[definitionName].data),
  );
};

describe('21-526-ALLCLAIMS schema', () => {
  it('should have the right required fields', () => {
    expect(schema.required).to.deep.equal(['isVaEmployee', 'standardClaim']);
  });

  testValidAndInvalidDefinitions('phone');
  testValidAndInvalidDefinitions('nonRequiredPhone');
  testValidAndInvalidDefinitions('date', testData.date.data);
  testValidAndInvalidDefinitions('fullName', testData.fullName.data);
  testValidAndInvalidDefinitions('email');
  testValidAndInvalidDefinitions('specialIssues');
  testValidAndInvalidDefinitions('country');
  testValidAndInvalidDefinitions('state');
  testValidAndInvalidDefinitions('address');
  testValidAndInvalidDefinitions('addressNoRequiredFields', {
    valid: data.address.valid,
    invalid: data.address.invalidNoRequired,
  });
  testValidAndInvalidDefinitions('vaTreatmentCenterAddress');
  testValidAndInvalidDefinitions('dateRange');
  testValidAndInvalidDefinitions('dateRangeAllRequired');
  testValidAndInvalidDefinitions('minimumYearDateRange');
  testValidAndInvalidDefinitions('ratedDisabilities');
  testValidAndInvalidDefinitions('newDisabilities');
  testValidAndInvalidDefinitions('unitAssigned', data.string(100));
  testValidAndInvalidDefinitions('unitAssignedDates', testData.dateRange.data);
  testValidAndInvalidDefinitions('ptsdIncident');
  testValidAndInvalidDefinitions('secondaryPtsdIncident');

  sharedTests.runTest('boolean', [
    'waiveRetirementPay',
    'hasSeparationPay',
    'hasTrainingPay',
    'waiveTrainingPay',
    'needToLeaveHousing',
    'isTerminallyIll',
    'isVaEmployee',
    'standardClaim',
    'mentalChanges.depression',
    'mentalChanges.obsessive',
    'mentalChanges.prescription',
    'mentalChanges.substance',
    'mentalChanges.hypervigilance',
    'mentalChanges.agoraphobia',
    'mentalChanges.fear',
    'mentalChanges.other',
    'mentalChanges.noneApply',
  ]);

  testValidAndInvalid('alternateNames');
  testValidAndInvalid('serviceInformation.servicePeriods', data.servicePeriods);
  testValidAndInvalid('serviceInformation.separationLocation', data.separationLocation);
  testValidAndInvalid('serviceInformation.reservesNationalGuardService', data.reservesNationalGuardService);
  testValidAndInvalid('toxicExposure.gulfWar1990Details', data.gulfWar1990Details);
  testValidAndInvalid('toxicExposure.gulfWar2001Details', data.gulfWar2001Details);
  testValidAndInvalid('toxicExposure.herbicideDetails', data.herbicideDetails);
  testValidAndInvalid('toxicExposure.otherExposuresDetails', data.otherExposuresDetails);
  testValidAndInvalid('toxicExposure.otherHerbicideLocations', testData.minimumYearDateRange.data);
  testValidAndInvalid('toxicExposure.specifyOtherExposures', testData.minimumYearDateRange.data);
  testValidAndInvalid('confinements');
  testValidAndInvalid('militaryRetiredPayBranch', data.branch);

  // separationPayDate is set as a plain string, but it eventually contain a
  // date string in this format YYYY-XX-XX, since only the year is required
  // testValidAndInvalid('separationPayDate', testData.date.data);

  testValidAndInvalid('separationPayBranch', data.branch);
  testValidAndInvalid('ratedDisabilities');
  testValidAndInvalid('newPrimaryDisabilities', data.newDisabilities);
  testValidAndInvalid('newSecondaryDisabilities', data.newDisabilities);
  // forwardingAddress disabled on the front-end
  testValidAndInvalid('forwardingAddress', {
    valid: data.address.valid,
    invalid: [{ country: 'Foo' }, { state: 'AB' }, { zipCode: '123456' }, { effectiveDate: '' }],
  });
  testValidAndInvalid('homelessOrAtRisk');
  testValidAndInvalid('homelessHousingSituation');
  testValidAndInvalid('otherHomelessHousing', data.string(500));
  testValidAndInvalid('atRiskHousingSituation');
  testValidAndInvalid('otherAtRiskHousing', data.string(500));
  testValidAndInvalid('homelessnessContact.name', data.string(100), 'abc123 ');
  testValidAndInvalid('homelessnessContact.phoneNumber', data.phone);
  testValidAndInvalid('vaTreatmentFacilities');

  testValidAndInvalid(
    'attachments',
    makeAttachments([
      'L015',
      'L018',
      'L029',
      'L702',
      'L703',
      'L034',
      'L478',
      'L048',
      'L049',
      'L023',
      'L070',
      'L450',
      'L451',
      'L222',
      'L228',
      'L229',
      'L102',
      'L107',
      'L827',
      'L115',
      'L117',
      'L159',
      'L133',
      'L139',
      'L149',
    ]),
  );

  testValidAndInvalid('bankAccountType');
  testValidAndInvalid('bankAccountNumber');
  testValidAndInvalid('bankRoutingNumber');
  testValidAndInvalid('bankName');
  testValidAndInvalid('mentalChanges.otherExplanation', data.string());
  testValidAndInvalid('form0781');
  testValidAndInvalid('form4142');
  testValidAndInvalid('form8940.unemployability.education', data.education);
  testValidAndInvalid('form8940');
  testValidAndInvalid('privateMedicalRecordAttachments', makeAttachments(['L107', 'L023']));
  testValidAndInvalid('completedFormAttachments', makeAttachments(['abc'], false));
  testValidAndInvalid(
    'secondaryAttachment',
    makeAttachments(['L229', 'L018', 'L034', 'L048', 'L049', 'L029', 'L023', 'L015']),
  );
  testValidAndInvalid('unemployabilityAttachments', makeAttachments(['L149', 'L023']));
  testValidAndInvalid('employmentRequestAttachments', makeAttachments(['L115']));
});

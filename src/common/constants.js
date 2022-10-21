import vaMedicalFacilities from './va-medical-facilities';
import caregiverProgramFacilities from './caregiver-program-facilities';

import {
  addressPou,
  addressTypes,
  militaryStates,
  militaryCities,
  countries,
  pciuCountries,
  states,
  pciuStates,
  salesforceStates,
  salesforceCountries,
  usaStates,
  states50AndDC,
} from './address';

const maritalStatuses = ['Married', 'Never Married', 'Separated', 'Widowed', 'Divorced'];

const marriageTypes = {
  ceremonial: 'CEREMONIAL',
  commonLaw: 'COMMON-LAW',
  tribal: 'TRIBAL',
  proxy: 'PROXY',
  other: 'OTHER',
};

const branchesServed = [
  { value: 'air force', label: 'Air Force' },
  { value: 'army', label: 'Army' },
  { value: 'coast guard', label: 'Coast Guard' },
  { value: 'marine corps', label: 'Marine Corps' },
  { value: 'merchant seaman', label: 'Merchant Seaman' },
  { value: 'navy', label: 'Navy' },
  { value: 'noaa', label: 'Noaa' },
  { value: 'space force', label: 'Space Force' },
  { value: 'usphs', label: 'USPHS' },
  { value: 'f.commonwealth', label: 'Filipino Commonwealth Army' },
  { value: 'f.guerilla', label: 'Filipino Guerilla Forces' },
  { value: 'f.scouts new', label: 'Filipino New Scout' },
  { value: 'f.scouts old', label: 'Filipino Old Scout' },
  { value: 'other', label: 'Other' },
];

const dischargeTypes = [
  { value: 'honorable', label: 'Honorable' },
  { value: 'general', label: 'General' },
  { value: 'other', label: 'Other Than Honorable' },
  { value: 'bad-conduct', label: 'Bad Conduct' },
  { value: 'dishonorable', label: 'Dishonorable' },
  { value: 'undesirable', label: 'Undesirable' },
];

const suffixes = ['Jr.', 'Sr.', 'II', 'III', 'IV'];

const genders = [
  { label: 'Female', value: 'F' },
  { label: 'Male', value: 'M' },
];

const sigiGenders = [
  { label: 'Non-binary', value: 'NB' },
  { label: 'Man', value: 'M' },
  { label: 'Woman', value: 'F' },
  { label: 'Transgender man', value: 'TM' },
  { label: 'Transgender woman', value: 'TF' },
  { label: 'A gender not listed here', value: 'O' },
  { label: 'Prefer not to answer', value: 'NA' },
];

const months = [
  { label: 'Jan', value: 1 },
  { label: 'Feb', value: 2 },
  { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 },
  { label: 'May', value: 5 },
  { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 },
  { label: 'Aug', value: 8 },
  { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 },
  { label: 'Nov', value: 11 },
  { label: 'Dec', value: 12 },
];

const twentyNineDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
];
const thirtyDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
];
const thirtyOneDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];

const days = {
  1: thirtyOneDays,
  2: twentyNineDays,
  3: thirtyOneDays,
  4: thirtyDays,
  5: thirtyOneDays,
  6: thirtyDays,
  7: thirtyOneDays,
  8: thirtyOneDays,
  9: thirtyDays,
  10: thirtyOneDays,
  11: thirtyDays,
  12: thirtyOneDays,
};

const dependentRelationships = ['Daughter', 'Son', 'Stepson', 'Stepdaughter', 'Father', 'Mother', 'Spouse', 'Other'];

const yesNo = [
  { label: 'Yes', value: 'Y' },
  { label: 'No', value: 'N' },
];

const documentTypes526 = [
  { value: 'L015', label: 'Buddy/Lay Statement' },
  { value: 'L018', label: 'Civilian Police Reports' },
  { value: 'L029', label: 'Copy of a DD214' },
  { value: 'L702', label: 'Disability Benefits Questionnaire (DBQ)' },
  { value: 'L703', label: 'Goldmann Perimetry Chart/Field Of Vision Chart' },
  { value: 'L034', label: 'Military Personnel Record' },
  { value: 'L478', label: 'Medical Treatment Records - Furnished by SSA' },
  { value: 'L048', label: 'Medical Treatment Record - Government Facility' },
  { value: 'L049', label: 'Medical Treatment Record - Non-Government Facility' },
  { value: 'L023', label: 'Other Correspondence' },
  { value: 'L070', label: 'Photographs' },
  { value: 'L450', label: 'STR - Dental - Photocopy' },
  { value: 'L451', label: 'STR - Medical - Photocopy' },
  {
    value: 'L222',
    label: 'VA Form 21-0779 - Request for Nursing Home Information in Connection with Claim for Aid & Attendance',
  },
  { value: 'L228', label: 'VA Form 21-0781 - Statement in Support of Claim for PTSD' },
  { value: 'L229', label: 'VA Form 21-0781a - Statement in Support of Claim for PTSD Secondary to Personal Assault' },
  {
    value: 'L102',
    label: 'VA Form 21-2680 - Examination for Housebound Status or Permanent Need for Regular Aid & Attendance',
  },
  { value: 'L107', label: 'VA Form 21-4142 - Authorization To Disclose Information' },
  { value: 'L827', label: 'VA Form 21-4142a - General Release for Medical Provider Information' },
  {
    value: 'L115',
    label: 'VA Form 21-4192 - Request for Employment Information in Connection with Claim for Disability',
  },
  {
    value: 'L117',
    label:
      'VA Form 21-4502 - Application for Automobile or Other Conveyance and Adaptive Equipment Under 38 U.S.C. 3901-3904',
  },
  {
    value: 'L159',
    label: 'VA Form 26-4555 - Application in Acquiring Specially Adapted Housing or Special Home Adaptation Grant',
  },
  { value: 'L133', label: 'VA Form 21-674 - Request for Approval of School Attendance' },
  { value: 'L139', label: 'VA Form 21-686c - Declaration of Status of Dependents' },
  {
    value: 'L149',
    label: 'VA Form 21-8940 - Veterans Application for Increased Compensation Based on Un-employability',
  },
];

// These definitions match caseflow:
// https://github.com/department-of-veterans-affairs/caseflow/blob/master/client/constants/BENEFIT_TYPES.json
const benefitTypes = [
  { value: 'compensation', label: 'Compensation' },
  { value: 'pension', label: 'Pension/survivors benefits' },
  { value: 'fiduciary', label: 'Fiduciary' },
  { value: 'education', label: 'Education' },
  { value: 'vha', label: 'Veterans Health Administration' },
  { value: 'voc_rehab', label: 'Vocational rehabilitation and employment' },
  { value: 'loan_guaranty', label: 'Loan guaranty' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'nca', label: 'National Cemetary Administration' },
];

module.exports = {
  addressPou,
  addressTypes,
  benefitTypes,
  branchesServed,
  caregiverProgramFacilities,
  countries,
  days,
  dependentRelationships,
  dischargeTypes,
  documentTypes526,
  genders,
  sigiGenders,
  maritalStatuses,
  marriageTypes,
  militaryCities,
  militaryStates,
  months,
  pciuCountries,
  pciuStates,
  salesforceCountries,
  salesforceStates,
  states,
  states50AndDC,
  suffixes,
  usaStates,
  vaMedicalFacilities,
  yesNo,
};

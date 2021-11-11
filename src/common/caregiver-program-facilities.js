import * as vaMedicalFacilities from './va-medical-facilities';

const caregiverFacilitesCodesByState = {
  TX: ['740', '756', '580', '504', '519', '549', '671', '674'],
  SD: ['568A4', '438', '568'],
  KS: ['589A6', '589A5', '589A7'],
  CA: ['612A4', '570', '640', '662', '600', '605', '664', '691'],
  ME: ['402'],
  VT: ['405'],
  MA: ['518', '523', '631'],
  NH: ['608'],
  RI: ['650'],
  CT: ['689'],
  MI: ['506', '515', '553', '655', '585'],
  OH: ['538', '539', '541', '552', '757'],
  IN: ['583', '610'],
  IL: ['537', '550', '556', '578', '657A5'],
  WI: ['607', '676', '695'],
  MO: ['589', '589A4', '657A4'],
  LA: ['502', '629', '667'],
  MS: ['520', '586'],
  AR: ['564', '598'],
  MT: ['436'],
  WY: ['442', '666'],
  CO: ['554', '575'],
  OK: ['623', '635'],
  UT: ['660'],
  NY: ['526', '528', '528A5', '528A6', '528A7', '528A8', '620', '630', '632'],
  NJ: ['561'],
  AK: ['463'],
  ID: ['531'],
  OR: ['648', '653', '692'],
  WA: ['663', '668', '687'],
  HI: ['459'],
  NV: ['593', '654'],
  NM: ['501'],
  AZ: ['644', '649', '678'],
  ND: ['437'],
  MN: ['618', '656'],
  NE: ['636'],
  IA: ['636A6', '636A8'],
  DE: ['460'],
  PA: ['503', '529', '542', '562', '595', '642', '646', '693'],
  MD: ['512'],
  WV: ['517', '540', '581', '613'],
  DC: ['688'],
  NC: ['558', '565', '637', '659'],
  VA: ['590', '652', '658'],
  GA: ['508', '509', '557'],
  AL: ['521', '619', '679'],
  SC: ['534', '544'],
  FL: ['516', '546', '548', '573', '673', '675'],
  PR: ['672'],
  KY: ['596', '603'],
  TN: ['614', '621', '626'],
};

const caregiverProgramFacilities = {};

Object.keys(caregiverFacilitesCodesByState).forEach(stateId => {
  const stateFacilityCodes = caregiverFacilitesCodesByState[stateId];

  caregiverProgramFacilities[stateId] = stateFacilityCodes.map(targetFacilityCode => {
    const matchingVaMedicalFacility = vaMedicalFacilities[stateId].find(
      vaMedicalFacility => vaMedicalFacility.value === targetFacilityCode,
    );

    if (!matchingVaMedicalFacility) {
      throw `The code ${targetFacilityCode} was not found in "vaMedicalFacilities". Add this facility to the "caregiverProgramFacilities" manually.`;
    }

    return {
      code: matchingVaMedicalFacility.value,
      label: matchingVaMedicalFacility.label,
    };
  });
});

// If there is a Caregiver Program Facility that is not listed in vaMedicalFacilities,
// add it to this list in the following format:
// { stateId: 'TX', facilities: [{ code: '123Z0', label: 'Water Lake County VA Medical Center' }] }
[
  // The Caregiver Program requested that this facility use the label "VA St. Louis Health Care System".
  //
  // These codes are currently serving two purposes: It defines what VA facility an online 10-10CG submission gets
  // routed to for processing, and it is used for the applicant to signify where they plan to, or currently, receive care.
  //
  // In the long term we plan to add a "processing" facility code to each individual facility. This way
  // the applicant chooses a single facility (where to get care), and we know what facility to send the
  // application to (where the application gets processed).
  //
  // When that happens, we can have both "John Cochran Veterans Hospital" and "St. Louis VA Medical Center-Jefferson Barracks"
  // as individual facilites the applicant can select while sending both to 657 (John Cochran Veterans Hospital) for processing.
  //
  { stateId: 'MO', facilities: [{ code: '657', label: 'VA St. Louis Health Care System' }] },
].forEach(additionalFacilitiesDefinition => {
  Array.prototype.push.apply(
    caregiverProgramFacilities[additionalFacilitiesDefinition.stateId],
    additionalFacilitiesDefinition.facilities,
  );
});

module.exports = caregiverProgramFacilities;

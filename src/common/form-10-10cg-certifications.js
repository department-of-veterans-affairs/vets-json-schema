const form1010cgCertificationsWithoutIdProperty = {
  'information-is-correct-and-true': {
    text: 'I certify that the information provided in this form is correct and true to the best of my knowledge and belief.',
    availableFor: [
      'veteran',
      'primaryCaregiver',
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
  'consent-to-caregivers-to-perform-care': {
    text: "I certify that I give consent to the individual(s) named in this application to perform personal care services for me (or if the Veteran's Representative, the Veteran) upon being approved as a Primary and/or Secondary Family Caregiver(s) in the Program of Comprehensive Assistance for Family Caregivers.",
    availableFor: [
      'veteran',
    ],
  },
  'at-least-18-years-of-age': {
    text: 'I certify that I am at least 18 years of age.',
    availableFor: [
      'primaryCaregiver',
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
  'member-of-veterans-family': {
    text: "I certify that I am a member of the Veteran's family (including a parent, spouse, a son or daughter, a step-family member, or an extended family member).",
    availableFor: [
      'primaryCaregiver',
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
  'not-member-of-veterans-family': {
    text: "I certify that I am a member of the Veteran's family (including a parent, spouse, a son or daughter, a step-family member, or an extended family member).",
    availableFor: [
      'primaryCaregiver',
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
  'currently-or-will-reside-with-veteran--as-primary': {
    text: "I reside with the Veteran full-time or will do so upon designation as the Veteran's Primary Family Caregiver.",
    availableFor: [
      'primaryCaregiver',
    ],
  },
  'currently-or-will-reside-with-veteran--as-secondary': {
    text: "I reside with the Veteran full-time or will do so upon designation as the Veteran's Secondary Family Caregiver.",
    availableFor: [
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
  'agree-to-perform-services--as-primary': {
    text: "I agree to perform personal care services as the Primary Family Caregiver for the Veteran named on this application.",
    availableFor: [
      'primaryCaregiver',
    ],
  },
  'agree-to-perform-services--as-secondary': {
    text: "I agree to perform personal care services as the Secondary Family Caregiver for the Veteran named on this application.",
    availableFor: [
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
  'understand-revokable-status--as-primary': {
    text: "I understand that the Veteran or the Veteran's surrogate may request my discharge from the Program of Comprehensive Assistance for Family Caregivers (PCAFC) at any time and that my designation as a Primary Family Caregiver may be revoked or I may be discharged from PCAFC by the Secretary of Veterans Affairs (or designee) as set forth in 38 CFR 71.45.",
    availableFor: [
      'primaryCaregiver',
    ],
  },
  'understand-revokable-status--as-secondary': {
    text: "I understand that the Veteran or the Veteran's surrogate may request my discharge from the Program of Comprehensive Assistance for Family Caregivers (PCAFC) at any time and that my designation as a Secondary Family Caregiver may be revoked or I may be discharged from PCAFC by the Secretary of Veterans Affairs (or designee) as set forth in 38 CFR 71.45.",
    availableFor: [
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
  'have-understanding-of-non-employment-relationship': {
    text: 'I understand that participation in the PCAFC does not create an employment relationship between me and the Department of Veterans Affairs.',
    availableFor: [
      'primaryCaregiver',
      'secondaryCaregiverOne',
      'secondaryCaregiverTwo',
    ],
  },
};

// Add "id" as a property to each value in the map
const form1010cgCertifications = Object.keys(form1010cgCertificationsWithoutIdProperty).reduce((acc, id) => {
  const properties = form1010cgCertificationsWithoutIdProperty[id];
  acc[id] = { id, ...properties };
  return acc;
}, {});

module.exports = form1010cgCertifications;

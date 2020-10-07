const example = {
  veteran: {
    fullName: { first: 'Jane Doe', last: 'Doe' },
    ssnOrTin: '789787893',
    dateOfBirth: '1990-07-03',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
    primaryPhoneNumber: '8887775544',
    plannedClinic: '740',
    certifications: [
      'information-is-correct-and-true',
      'consent-to-caregivers-to-perform-care',
    ],
  },
  primaryCaregiver: {
    fullName: { first: 'Joan', last: 'Doe' },
    dateOfBirth: '1978-07-03',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
    primaryPhoneNumber: '8887775544',
    vetRelationship: 'Spouse',
    hasHealthInsurance: true,
    certifications: [
      'information-is-correct-and-true',
      'at-least-18-years-of-age',
      'member-of-veterans-family',
      'agree-to-perform-services--as-primary',
      'understand-revocable-status--as-primary',
      'have-understanding-of-non-employment-relationship',
    ],
  },
  secondaryCaregiverOne: {
    fullName: { first: 'John Doe', middle: 'A', last: 'Doe' },
    dateOfBirth: '1989-11-06',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771-1234' },
    primaryPhoneNumber: '8887775544',
    vetRelationship: 'Friend/Neighbor',
    certifications: [
      'information-is-correct-and-true',
      'at-least-18-years-of-age',
      'not-member-of-veterans-family',
      'currently-or-will-reside-with-veteran--as-secondary',
      'agree-to-perform-services--as-secondary',
      'understand-revocable-status--as-secondary',
      'have-understanding-of-non-employment-relationship',
    ],
  },
};

export default example;

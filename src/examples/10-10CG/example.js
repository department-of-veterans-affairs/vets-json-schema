const example = {
  veteran: {
    fullName: { first: 'Jane Doe', last: 'Doe' },
    ssnOrTin: '789787893',
    dateOfBirth: '1990-07-03',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
    primaryPhoneNumber: '8887775544',
    alternativePhoneNumber: '8887775544',
    email: 'veteranEmail@email.com',
    plannedClinic: '740',
    lastTreatmentFacility: { name: 'My Hospital', type: 'hospital' },
  },
  primaryCaregiver: {
    fullName: { first: 'Joan', last: 'Doe' },
    ssnOrTin: '202901412',
    dateOfBirth: '1978-07-03',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
    primaryPhoneNumber: '8887775544',
    alternativePhoneNumber: '8887775544',
    email: 'primaryCaregiverEmail@email.com',
    vetRelationship: 'Spouse',
    medicaidEnrolled: false,
    medicareEnrolled: false,
    champvaEnrolled: false,
    tricareEnrolled: true,
  },
  secondaryCaregiverOne: {
    fullName: { first: 'John Doe', middle: 'A', last: 'Doe' },
    ssnOrTin: '787787854',
    dateOfBirth: '1989-11-06',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771-1234' },
    primaryPhoneNumber: '8887775544',
    alternativePhoneNumber: '8887775544',
    email: 'secondaryOneCaregiverEmail@email.com',
    vetRelationship: 'Daughter',
  },
};

export default example;

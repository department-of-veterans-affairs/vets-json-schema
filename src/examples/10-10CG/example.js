const example = {
  veteran: {
    fullName: { first: 'Jane Doe', last: 'Doe' },
    ssnOrTin: '789787893',
    dateOfBirth: '1990-07-03',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
    primaryPhoneNumber: '8887775544',
    plannedClinic: '740',
  },
  primaryCaregiver: {
    fullName: { first: 'Joan', last: 'Doe' },
    dateOfBirth: '1978-07-03',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771' },
    primaryPhoneNumber: '8887775544',
    vetRelationship: 'Spouse',
    hasHealthInsurance: true,
  },
  secondaryCaregiverOne: {
    fullName: { first: 'John Doe', middle: 'A', last: 'Doe' },
    dateOfBirth: '1989-11-06',
    address: { street: '111 2nd St S', city: 'Seattle', state: 'WA', postalCode: '33771-1234' },
    primaryPhoneNumber: '8887775544',
    vetRelationship: 'Daughter',
  },
};

export default example;

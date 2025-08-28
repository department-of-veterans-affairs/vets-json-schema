const testDataRequired = {
  agreementType: 'newCommitment',
  authorizedOfficial: {
    fullName: {
      first: 'Nick',
      middle: 'John',
      last: 'Hibbits',
    },
    title: 'Admin',
    usPhone: '2102753628',
    email: 'n@gmail.com',
  },
  mainInstitution: {
    facilityCode: '12345678',
    institutionName: 'Sample Campus',
    institutionAddress: {
      street: '111 2nd St S',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'USA',
    },
  },
  statementOfTruthSignature: 'Nick Hibbits',
  dateSigned: '2024-08-28',
};

// write test specs
// test with required and unrequired fields
// check against other test files for guidance on data variation/structures

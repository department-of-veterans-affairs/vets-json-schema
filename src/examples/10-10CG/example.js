const example = {
  veteranInfoOne: {
    veteranFullName: { first: 'Jane Doe', last: 'Doe' },
    veteranSsnOrTin: 'Tax Identification Number',
    veteranTin: '789',
    veteranDateOfBirth: '1990-07-03',
    veteranGender: 'Male',
  },
  veteranInfoTwo: {
    veteranAddress: { street: '111 2nd St S', city: 'Seattle', country: 'USA', state: 'IN', postalCode: '33771' },
    veteranPrimaryPhoneNumber: '8887775544',
    veteranAlternativePhoneNumber: '8887775544',
    veteranEmail: 'test@email.com',
  },
  veteranInfoThree: {
    // TODO: instead of "*InfoOne, *InfoTwo, etc. Sould we just nest all into "veteranInfo"?
    veteranVaEnrolled: true,
    // veteranPlannedClinic: null,
    veteranFacilityType: 'hospital',
    veteranPreviousTreatmentFacility: 'adsadad',
  },
  primaryCaregiverInfoOne: {
    primaryFullName: { first: 'Joan', last: 'Doe' },
    primarySsnOrTin: 'Tax Identification Number',
    primaryDateOfBirth: '1978-07-03',
    primaryGender: 'Female',
  },
  primaryCaregiverInfoTwo: {
    // TODO: since this is nested in "primaryCaregiverInfoTwo", we should not have attrs namespaced
    primaryAddress: { street: '111 2nd St S', city: 'Seattle', country: 'USA', state: 'IL', postalCode: '33771' },
    primaryPrimaryPhoneNumber: '8887775544',
    primaryAlternativePhoneNumber: '8887775544',
    primaryEmail: 'test@email.com',
    primaryVetRelationship: 'asd',
    primaryMedicaidEnrolled: true,
    primaryMedicareEnrolled: true,
    primaryChampvaEnrolled: true,
    primaryTricareEnrolled: true,
    primaryOtherHealthInsurance: true,
    primaryOtherHealthInsuranceName: 'asdasd',
    hasSecondaryOneCaregiver: true,
  },
  secondaryOneCaregiverInfo: {
    secondaryOneFullName: { first: 'John Doe', last: 'Doe', suffix: 'II' },
    // TODO: This below prop wasn't here. Shouldn't this be required?
    // ssnOrTin: "Social Security Number",
    secondaryOneSsn: '787787854',
    secondaryOneDateOfBirth: '1989-11-06',
    secondaryOneGender: 'Male',
    secondaryOneAddress: { street: '111 2nd St S', city: 'Seattle', country: 'USA', state: 'IL', postalCode: '33771' },
    secondaryOnePrimaryPhoneNumber: '8887775544',
    secondaryOneAlternativePhoneNumber: '8887775544',
    secondaryOneEmail: 'test@email.com',
    // TODO: This is not namespaced like the props above (above namespaces should be removed)
    vetRelationship: 'asdasdas',
    // TODO: This below prop should not be here
    hasSecondaryTwoCaregiver: true,
  },
  secondaryTwoCaregiverInfo: {
    secondaryTwoFullName: { first: 'John Doe', last: 'Doe' },
    // secondaryTwoSsnOrTin (missing)
    secondaryTwoSsn: '585784787',
    secondaryTwoDateOfBirth: '1994-08-04',
    secondaryTwoGender: 'Male',
    secondaryTwoAddress: {
      street: '111 2nd St S',
      city: 'Seattle',
      country: 'USA',
      state: 'Florida',
      postalCode: '33771',
    },
    secondaryTwoPrimaryPhoneNumber: '8887775544',
    secondaryTwoAlternativePhoneNumber: '8887775544',
    secondaryTwoEmail: 'test@email.com',
    secondaryTwoVetRelationship: 'asdasdas',
  },
};

export default example;

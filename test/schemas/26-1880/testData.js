export const testData = {
  personalInformation: {
    valid: [
      {
        fullName: {
          firstName: 'John',
          lastName: 'Doe',
        },
        dateOfBirth: '2001-01-02',
      },
    ],
    invalid: [{}],
  },
  contactInformation: {
    valid: [
      {
        mailingAddress: {
          applicantAddress: {
            isMilitary: false,
            country: 'AFG',
            street: '123 someplace ave',
            street2: 'Unit 1',
            street3: 'A',
            city: 'Someplace',
            state: 'AZ',
            postalCode: '12345',
          },
        },
      },
    ],
    invalid: [
      {
        mailingAddress: {
          applicantAddress: {
            isMilitary: 45,
            country: false,
            street: 34,
            street2: true,
            street3: NaN,
            city: true,
            state: 234,
            postalCode: false,
          },
        },
      },
    ],
  },
};

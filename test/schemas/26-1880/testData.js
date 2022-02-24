export const testData = {
  personalInformation: {
    valid: [
      {
        fullName: {
          first: 'John',
          last: 'Doe',
        },
        dateOfBirth: '2001-01-02',
      },
    ],
    invalid: [],
  },
  contactInformation: {
    valid: [
      {
        mailingAddress: {
          applicantAddress: {
            isMilitary: false,
            country: 'US',
            street: '123 someplace ave',
            street2: '',
            street3: '',
            city: 'Someplace',
            state: 'Arizona',
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

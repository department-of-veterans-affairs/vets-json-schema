
const ssnOrTin = {
  type: "string",
  enum: ['Social Security Number', 'Tax Identification Number'],
};

const tin = {
  type: 'string'
};

const schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  title: "Application for Comprehensive Assistance for Family Caregivers Program (10-10CG)",
  type: "object",
  additionalProperties: false,
  definitions: {
  veteranInfoOne: {
    type: "object",
    required: [],
    properties: {
      address: "common/ref",
      primaryPhoneNumber: 'common/ref',
      alternativePhoneNumber: 'common/ref',
      email: 'common/ref',
    }
  },
  veteranInfoTwo: {
    type: "object",
    required: [],
    properties: {
      fullName: "common/ref",
      ssnOrTin: ssnOrTin,
      ssn: 'common/ref',
      tin: tin,
      dateOfBirth: 'common/ref',
      gender: 'common/ref',
    }
    },
    address: {
      type: "object",
      oneOf: [
        {
          properties: {
            country: {
              type: "string",
              enum: ["CAN"]
            },
            state: {
              type: "string",
              enum: [
                "AB",
                "BC",
                "MB",
                "NB",
                "NF",
                "NT",
                "NV",
                "NU",
                "ON",
                "PE",
                "QC",
                "SK",
                "YT"
              ]
            },
            postalCode: {
              type: "string",
              maxLength: 10
            }
          }
        },
        {
          properties: {
            country: {
              type: "string",
              enum: ["MEX"]
            },
            state: {
              type: "string",
              enum: [
                "aguascalientes",
                "baja-california-norte",
                "baja-california-sur",
                "campeche",
                "chiapas",
                "chihuahua",
                "coahuila",
                "colima",
                "distrito-federal",
                "durango",
                "guanajuato",
                "guerrero",
                "hidalgo",
                "jalisco",
                "mexico",
                "michoacan",
                "morelos",
                "nayarit",
                "nuevo-leon",
                "oaxaca",
                "puebla",
                "queretaro",
                "quintana-roo",
                "san-luis-potosi",
                "sinaloa",
                "sonora",
                "tabasco",
                "tamaulipas",
                "tlaxcala",
                "veracruz",
                "yucatan",
                "zacatecas"
              ]
            },
            postalCode: {
              type: "string",
              maxLength: 10
            }
          }
        },
        {
          properties: {
            country: {
              type: "string",
              enum: ["USA"]
            },
            state: {
              type: "string",
              enum: [
                "AL",
                "AK",
                "AS",
                "AZ",
                "AR",
                "AA",
                "AE",
                "AP",
                "CA",
                "CO",
                "CT",
                "DE",
                "DC",
                "FM",
                "FL",
                "GA",
                "GU",
                "HI",
                "ID",
                "IL",
                "IN",
                "IA",
                "KS",
                "KY",
                "LA",
                "ME",
                "MH",
                "MD",
                "MA",
                "MI",
                "MN",
                "MS",
                "MO",
                "MT",
                "NE",
                "NV",
                "NH",
                "NJ",
                "NM",
                "NY",
                "NC",
                "ND",
                "MP",
                "OH",
                "OK",
                "OR",
                "PW",
                "PA",
                "PR",
                "RI",
                "SC",
                "SD",
                "TN",
                "TX",
                "UT",
                "VT",
                "VI",
                "VA",
                "WA",
                "WV",
                "WI",
                "WY"
              ]
            },
            postalCode: {
              type: "string",
              "ui:title": "Postal Code",
              maxLength: 10
            }
          }
        },
        {
          properties: {
            country: {
              not: {
                type: "string",
                enum: ["CAN", "MEX", "USA"]
              }
            },
            state: {
              type: "string",
              maxLength: 51
            },
            postalCode: {
              type: "string",
              maxLength: 51
            }
          }
        }
      ],
      properties: {
        street: {
          type: "string",
          minLength: 1,
          maxLength: 50
        },
        street2: {
          "ui:title": "Street Two",
          type: "string",
          minLength: 1,
          maxLength: 50
        },
        city: {
          type: "string",
          minLength: 1,
          maxLength: 51
        }
      }
    }
  }
};


export default schema;

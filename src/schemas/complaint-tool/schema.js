{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "GI BILL SCHOOL COMPLAINT TOOL",
  "type": "object",
  "additionalProperties": false,
  "definitions": {
    "address": {
      "type": "object",
      "oneOf": [
        {
          "properties": {
            "country": {
              "type": "string",
              "enum": [
                "CAN"
              ]
            },
            "state": {
              "type": "string",
              "enum": [
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
            "postalCode": {
              "type": "string",
              "maxLength": 10
            }
          }
        },
        {
          "properties": {
            "country": {
              "type": "string",
              "enum": [
                "MEX"
              ]
            },
            "state": {
              "type": "string",
              "enum": [
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
            "postalCode": {
              "type": "string",
              "maxLength": 10
            }
          }
        },
        {
          "properties": {
            "country": {
              "type": "string",
              "enum": [
                "USA"
              ]
            },
            "state": {
              "type": "string",
              "enum": [
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
            "postalCode": {
              "type": "string",
              "maxLength": 10
            }
          }
        },
        {
          "properties": {
            "country": {
              "not": {
                "type": "string",
                "enum": [
                  "CAN",
                  "MEX",
                  "USA"
                ]
              }
            },
            "state": {
              "type": "string",
              "maxLength": 51
            },
            "postalCode": {
              "type": "string",
              "maxLength": 51
            }
          }
        }
      ],
      "properties": {
        "street": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "street2": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        },
        "city": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20
        }
      },
      "required": [
        "street"
      ]
    },
    "dateRange": {
      "type": "object",
      "properties": {
        "from": {
          "$ref": "#/definitions/date"
        },
        "to": {
          "$ref": "#/definitions/date"
        }
      }
    },
    "fullName": {
      "type": "object",
      "properties": {
        "first": {
          "type": "string",
          "minLength": 1,
          "maxLength": 15
        },
        "middle": {
          "type": "string",
          "maxLength": 15
        },
        "last": {
          "type": "string",
          "minLength": 1,
          "maxLength": 25
        },
        "suffix": {
          "type": "string",
          "enum": [
            "Jr.",
            "Sr.",
            "II",
            "III",
            "IV"
          ]
        }
      },
      "required": [
        "first",
        "last"
      ]
    },
    "phone": {
      "type": "string",
      "minLength": 0,
      "maxLength": 20,
      "pattern": "^[0-9+\\s-]{0,20}$"
    },
    "date": {
      "type": "string",
      "format": "date"
    }
  },
  "properties": {
    "application": {
      "type": "object",
      "required": [
        "applicant",
        "claimant",
        "school"
      ],
      "properties": {
        "applicant": {
          "type": "object",
          "required": [
            "applicantRelationshipToClaimant",
            "email",
            "mailingAddress",
            "name",
            "completingReason",
            "completingReasonType",
            "completingFeedback"
          ],
          "properties": {
            "email": {
              "type": "string",
              "maxLength": 50,
              "format": "email"
            },
            "phoneNumber": {
              "$ref": "#/definitions/phone"
            },
            "applicantRelationshipToClaimant": {
              "type": "string",
              "enum": [
                "Myself",
                "Someone else",
                "I want to submit my complaint anonymously."
              ]
            },
            "completingReasonType": {
              "type": "string",
              "enum": [
                "Recruiting/Marketing Practices",
                "Accreditation",
                "Financial Issues (e.g. Tuition/Fee Charges)",
                "Student Loans",
                "Post-Graduation Job Opportunities",
                "Change in degree/plan requirements",
                "Quality of Education",
                "Grade Policy",
                "Release of Transcripts"
              ]
            },
            "completingReason": {
              "type": "string",
              "maxLength": 256
            },
            "completingFeedback": {
              "type": "string",
              "maxLength": 256
            },
            "mailingAddress": {
              "$ref": "#/definitions/address"
            },
            "name": {
              "$ref": "#/definitions/fullName"
            },
            "applicantIsVeteran": {
              "type": "boolean"
            },
            "serviceRecord": {
              "type": "object",
              "properties": {
                "dateRange": {
                  "$ref": "#/definitions/dateRange"
                },
                "serviceBranch": {
                  "type": "string",
                  "enum": [
                    "AL",
                    "FS",
                    "FT",
                    "ES",
                    "CM",
                    "C3",
                    "C2",
                    "C4",
                    "C7",
                    "C5",
                    "GS",
                    "CI",
                    "FP",
                    "CS",
                    "CV",
                    "XG",
                    "CB",
                    "FF",
                    "GP",
                    "MO",
                    "NO",
                    "NN",
                    "NM",
                    "PA",
                    "PG",
                    "KC",
                    "PS",
                    "RO",
                    "CF",
                    "CE",
                    "AF",
                    "XF",
                    "AG",
                    "AR",
                    "AC",
                    "AA",
                    "AT",
                    "NG",
                    "XR",
                    "CO",
                    "CA",
                    "CC",
                    "GC",
                    "CG",
                    "XC",
                    "MC",
                    "MM",
                    "NA",
                    "XA",
                    "CD",
                    "PH",
                    "GU",
                    "WP",
                    "WA",
                    "WS",
                    "WR"
                  ]
                }
              }
            }
          }
        },
        "claimant": {
          "type": "object",
          "required": [
            "educationBenefitsUsed"
          ],
          "properties": {
            "educationBenefitsUsed": {
              "type": "object",
              "properties": {
                "chapter30ActiveDuty": {
                  "type": "boolean"
                },
                "chapter30SelectedReserve": {
                  "type": "boolean"
                },
                "chapter31": {
                  "type": "boolean"
                },
                "chapter33": {
                  "type": "string"
                },
                "chapter35": {
                  "type": "boolean"
                },
                "tuitionAssistanceTopUp": {
                  "type": "boolean"
                }
              }
            },
            "militaryTuitionAssistanceBenefitsUsed": {
              "type": "object",
              "properties": {
                "TA": {
                  "type": "boolean"
                },
                "TAAGR": {
                  "type": "boolean"
                },
                "MyCAA": {
                  "type": "boolean"
                },
                "federalFinancialAid": {
                  "type": "string"
                }
              }
            }
          }
        },
        "school": {
          "type": "object",
          "required": [
            "schoolName",
            "address"
          ],
          "properties": {
            "address": {
              "$ref": "#/definitions/address"
            },
            "schoolName": {
              "type": "string"
            }
          }
        }
      }
    }
  }
}

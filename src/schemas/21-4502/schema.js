import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR AUTOMOBILE OR OTHER CONVEYANCE AND ADAPTIVE EQUIPMENT (21-4502)',
  type: 'object',
  definitions: {
    date: definitions.date,
    email: definitions.email,
    ssn: definitions.ssn,
    vaFileNumber: definitions.vaFileNumber,
    address: definitions.address,
    usaPhone: definitions.usaPhone,
    fullName: definitions.fullName,
    veteranServiceNumber: definitions.veteranServiceNumber,
  },
  properties: {
    formNumber: {
      type: 'string',
    },
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
        },
        middleinitial: {
          type: 'string',
        },
        last: {
          type: 'string',
        },
      },
    },
    dob: {
      $ref: '#/definitions/date',
    },
    ssn: {
      $ref: '#/definitions/ssn',
    },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber',
    },
    vaServiceNumber: {
      $ref: '#/definitions/veteranServiceNumber',
    },
    phoneNumber: {
      $ref: '#/definitions/usaPhone',
    },
    internationalPhoneNumber: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    electronicCorrespondence: {
      type: 'boolean',
    },
    currentMailingAddress: {
      $ref: '#/definitions/address',
    },
    plannedMailingAddress: {
      $ref: '#/definitions/address',
    },
    branchOfService: {
      type: 'string',
    },
    activeDuty: {
      type: 'boolean',
    },
    placeOfEntry: {
      type: 'string',
    },
    dateOfEntry: {
      $ref: '#/definitions/date',
    },
    placeOfRelease: {
      type: 'string',
    },
    dateOfRelease: {
      $ref: '#/definitions/date',
    },
    appliedForCompensation: {
      type: 'boolean',
    },
    dateAppliedForCompensation: {
      $ref: '#/definitions/date',
    },
    locationOfOffice: {
      type: 'string',
    },
    vehicleType: {
      type: 'string',
    },
    previouslyApplied: {
      type: 'boolean',
    },
    dateOfPreviousApplication: {
      $ref: '#/definitions/date',
    },
    previousApplicationLocation: {
      type: 'string',
    },
    veteranWillOperateVehicle: {
      type: 'boolean',
    },
    statementOfTruthSignature: {
      type: 'string',
    },
    signatureDate: {
      $ref: '#/definitions/date',
    },
  },
};

export default schema;

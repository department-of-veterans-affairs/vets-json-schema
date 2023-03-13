import pick from 'lodash/pick';
import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Authorize the release of medical information to the VA',
  type: 'object',
  definitions: pick(
    definitions,
    'address',
    'date',
    'email',
    'fullName',
    'fullNameNoSuffix',
    'phone',
    'privacyAgreementAccepted',
    'profileAddress',
    'ssn',
    'vaFileNumber',
  ),
  properties: {
    veteran: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullName',
        },
        dateOfBirth: {
          $ref: '#/definitions/date',
        },
        ssn: {
          $ref: '#/definitions/ssn',
        },
        vaFileNumber: {
          $ref: '#/definitions/vaFileNumber',
        },
        address: { $ref: '#/definitions/profileAddress' },
        homePhone: {
          $ref: '#/definitions/phone',
        },
        internationalPhone: {
          $ref: '#/definitions/phone',
        },
        email: {
          $ref: '#/definitions/email',
        },
      },
      required: ['fullName', 'address', 'homePhone'],
    },
    patientIdentification: {
      type: 'object',
      properties: {
        isRequestingOwnMedicalRecords: {
          type: 'boolean',
        },
        patientFullName: {
          $ref: '#/definitions/fullNameNoSuffix',
        },
        patientSsn: {
          $ref: '#/definitions/ssn',
        },
        patientVaFileNumber: {
          $ref: '#/definitions/vaFileNumber',
        },
      },
      required: ['isRequestingOwnMedicalRecords'],
    },
    providerFacility: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          providerFacilityName: {
            type: 'string',
          },
          conditionsTreated: {
            type: 'string',
          },
          treatmentDateRange: {
            type: 'object',
            properties: {
              from: {
                $ref: '#/definitions/date',
              },
              to: {
                $ref: '#/definitions/date',
              },
            },
            required: ['from', 'to'],
          },
          providerFacilityAddress: {
            $ref: '#/definitions/address',
          },
        },
      },
      required: ['conditionsTreated', 'providerFacilityName', 'treatmentDateRange', 'providerFacilityAddress'],
    },
    acknowledgeToReleaseInformation: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
    limitedConsent: {
      type: 'string',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: [
    'veteran',
    'patientIdentification',
    'acknowledgeToReleaseInformation',
    'providerFacility',
    'privacyAgreementAccepted',
  ],
};

export default schema;

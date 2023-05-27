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
    'fullNameNoSuffix',
    'phone',
    'ssn',
    'vaFileNumber',
    'veteranServiceNumber',
    'privacyAgreementAccepted',
  ),
  properties: {
    veteran: {
      type: 'object',
      properties: {
        fullName: {
          $ref: '#/definitions/fullNameNoSuffix',
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
        veteranServiceNumber: {
          $ref: '#/definitions/veteranServiceNumber',
        },
      },
      required: ['fullName'],
      anyOf: [
        {
          required: ['ssn'],
        },
        {
          required: ['vaFileNumber'],
        },
      ],
    },
    claimant: {
      type: 'object',
      properties: {
        claimantFullName: {
          $ref: '#/definitions/fullName',
        },
        claimantAddress: { $ref: '#/definitions/address' },
        claimantPhone: {
          $ref: '#/definitions/phone',
        },
        claimantInternationalPhone: {
          $ref: '#/definitions/phone',
        },
        claimantEmail: {
          $ref: '#/definitions/email',
        },
        claimantEmailConsent: {
          type: 'boolean',
        },
      },
      required: ['claimantFullName', 'claimantAddress', 'claimantPhone'],
    },
    authorizedEntityType: {
      type: 'string',
    },
    person: {
      type: 'object',
      properties: {
        personFullName: {
          $ref: '#/definitions/fullName',
        },
        personAddress: { $ref: '#/definitions/address' },
      },
      required: ['personFullName', 'personAddress'],
    },
    organization: {
      type: 'object',
      properties: {
        organizationFullName: {
          $ref: '#/definitions/fullName',
        },
        organizationAddress: { $ref: '#/definitions/address' },
      },
      required: ['organizationFullName', 'organizationAddress'],
    },
    informationScope: {
      type: 'string',
    },
    informationTypes: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    otherInformationType: {
      type: 'string',
    },
    releaseTerm: {
      type: 'string',
    },
    releaseTermDate: {
      $ref: '#/definitions/date',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
  },
  required: [
    'veteran',
    'claimant',
    'authorizedEntityType',
    'informationScope',
    'informationTypes',
    'releaseTerm',
    'privacyAgreementAccepted',
  ],
  oneOf: [
    {
      required: ['person'],
    },
    {
      required: ['organization'],
    },
  ],
};

export default schema;

import definitions from '../../common/definitions';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR ACCREDITATION AS A CLAIMS AGENT OR ATTORNEY (VA21a)',
  definitions: {
    date: {
      format: 'date',
      type: 'string',
    },
    dateRange: definitions.dateRange,
    account: {
      type: 'object',
      properties: {
        id: definitions.uuid,
        text: {
          type: 'string',
        },
      },
      required: ['id'],
    },
    accreditationTypeDescriptor: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        text: {
          type: 'string',
        },
      },
      required: ['id'],
    },
    accreditedEntityDescriptor: {
      type: 'object',
      properties: {
        id: definitions.uuid,
        text: {
          type: 'string',
        },
        accreditationType: {
          type: 'string',
        },
        number: {
          type: 'integer',
        },
        poa: {
          type: 'string',
        },
      },
      required: ['id', 'number'],
    },
    applicationStatusTypeDescriptor: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        text: {
          type: 'string',
        },
      },
      required: ['id'],
    },
    caseMatterDescriptor: {
      type: 'object',
      properties: {
        id: definitions.uuid,
        text: {
          type: 'string',
        },
        caseNo: {
          type: 'integer',
        },
        dateCaseReceived: {
          $ref: '#/definitions/date',
        },
        caseStatus: {
          type: 'string',
        },
        assignedTo: {
          $ref: '#/definitions/userDescriptor',
        },
        mostRecentOpenedTask: {
          $ref: '#/definitions/caseTaskDescriptor',
        },
        root: {
          $ref: '#/definitions/rootDescriptor',
        },
        productCategory: {
          $ref: '#/definitions/productCategoryDescriptor',
        },
        relatedCases: {
          type: 'array',
          items: {
            $ref: '#/definitions/caseMatterDescriptor',
          },
        },
      },
      required: ['id', 'caseNo', 'assignedTo', 'mostRecentOpenedTask', 'root', 'productCategory'],
    },
    caseTaskDescriptor: {
      type: 'object',
      properties: {
        id: definitions.uuid,
        text: {
          type: 'string',
        },
        status: {
          type: 'string',
        },
        dateOpened: {
          $ref: '#/definitions/date',
        },
        assignedTo: {
          $ref: '#/definitions/userDescriptor',
        },
      },
      required: ['id', 'assignedTo'],
    },
    characterReferenceDetail: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        address: definitions.address,
        phoneNumber: {
          type: 'string',
        },
        extension: {
          type: 'string',
        },
        relationshipToApplicant: {
          type: 'string',
        },
      },
      required: ['id', 'address'],
    },
    employmentStatusTypeDetail: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        name: {
          type: 'string',
        },
        isActive: {
          type: 'boolean',
        },
        sortOrder: {
          type: 'integer',
        },
      },
      required: ['id', 'sortOrder'],
    },
    productCategoryDescriptor: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        text: {
          type: 'string',
        },
      },
      required: ['id'],
    },
    rootDescriptor: {
      type: 'object',
      properties: {
        id: definitions.uuid,
        text: {
          type: 'string',
        },
        rootType: {
          type: 'string',
        },
      },
      required: ['id'],
    },
    userDescriptor: {
      type: 'object',
      properties: {
        id: definitions.uuid,
        text: {
          type: 'string',
        },
        loginName: {
          type: 'string',
        },
      },
      required: ['id'],
    },
  },
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    dateCreated: {
      $ref: '#/definitions/date',
    },
    formType: {
      type: 'string',
    },
    account: {
      $ref: '#/definitions/account',
    },
    lastName: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    middleName: {
      type: 'string',
    },
    suffix: {
      type: 'string',
    },
    fullName: {
      type: 'string',
    },
    signature: {
      type: 'string',
    },
    pdfImage: {
      type: 'string',
    },
    dateSubmitted: {
      $ref: '#/definitions/date',
    },
    homeAddress: definitions.address,
    businessAddress: definitions.address,
    applicationStatus: {
      $ref: '#/definitions/applicationStatusTypeDescriptor',
    },
    accreditationType: {
      $ref: '#/definitions/accreditationTypeDescriptor',
    },
    accreditedRepCaseMatter: {
      $ref: '#/definitions/caseMatterDescriptor',
    },
    accreditedEntity: {
      $ref: '#/definitions/accreditedEntityDescriptor',
    },
    serviceBranches: definitions.serviceHistory,
    agentAttorneyEmail: {
      type: 'string',
    },
    agentAttorneyPhone: {
      type: 'string',
    },
    birthDate: {
      $ref: '#/definitions/date',
    },
    birthPlace: {
      type: 'string',
    },
    wasImprisoned: {
      type: 'boolean',
    },
    imprisonedExplanation: {
      type: 'string',
    },
    wasConvictedMilitary: {
      type: 'string',
    },
    militaryConvictionExplanation: {
      type: 'string',
    },
    isCurrentlyCharged: {
      type: 'boolean',
    },
    chargesExplanation: {
      type: 'string',
    },
    wasSuspended: {
      type: 'boolean',
    },
    wasDisciplined: {
      type: 'boolean',
    },
    hasResignedRetiredQuit: {
      type: 'boolean',
    },
    wasAgentAttorney: {
      type: 'boolean',
    },
    wasReprimanded: {
      type: 'boolean',
    },
    hasAppliedForAccreditation: {
      type: 'boolean',
    },
    hasPreviouslyAppliedForAccreditation: {
      type: 'boolean',
    },
    hasImpairments: {
      type: 'boolean',
    },
    impairmentsExplanation: {
      type: 'string',
    },
    hasPhysicalLimitations: {
      type: 'boolean',
    },
    physicalLimitationsExplanation: {
      type: 'string',
    },
    employmentStatus: {
      $ref: '#/definitions/employmentStatusTypeDetail',
    },
    characterReferences: {
      type: 'array',
      items: {
        $ref: '#/definitions/characterReferenceDetail',
      },
    },
  },
  required: [
    'id',
    'dateCreated',
    'account',
    'dateSubmitted',
    'homeAddress',
    'businessAddress',
    'applicationStatus',
    'accreditationType',
    'accreditedRepCaseMatter',
    'accreditedEntity',
    'birthDate',
    'wasImprisoned',
    'isCurrentlyCharged',
    'wasSuspended',
    'wasDisciplined',
    'hasResignedRetiredQuit',
    'wasAgentAttorney',
    'wasReprimanded',
    'hasAppliedForAccreditation',
    'hasPreviouslyAppliedForAccreditation',
    'hasImpairments',
    'hasPhysicalLimitations',
    'employmentStatus',
  ],
};

export default schema;

import schemaHelpers from '../../common/schema-helpers';

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'IRIS Ask a Question',
  type: 'object',
  definitions: {},
  additionalProperties: false,
  anyOf: [
    {
      required: ['email'],
    },
    {
      required: ['phone'],
    },
    {
      required: ['address'],
    },
  ],
  required: ['fullName', 'preferredContactMethod'],
  properties: {
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        suffix: {
          type: 'string',
          enum: ['Jr.', 'Sr.', 'II', 'III', 'IV'],
        },
      },
      required: ['first', 'last'],
    },
    preferredContactMethod: {
      default: 'email',
      type: 'string',
      enum: ['email', 'mail', 'phone'],
      enumNames: ['Email', 'US Mail', 'Phone'],
    },
    topic: {
      type: 'string',
      enum: [
        'Policy Question',
        'Question about Women Veterans Programs',
        'Compensation Request',
        'All Other Burial Benefit Inquiries',
        'Pre-Need Burial Eligibility Determination',
        'Headstones & Markers',
        'Presidential Memorial Certificates',
        'General Caregiver Support/Education',
        'Comprehensive Family Caregiver Program',
        'VA Supportive Services',
        "Can't Register (Not in DEERS msg.)",
        'About eBenefits',
        'Error messages',
        'eBenefits Accounts and Passwords',
        'Need help navigating eBenefits Site',
        'Home Loan/Mortgage Certificates of Elig',
        'Homeloan VIP Portal Access',
        'Web Page Issues',
        'Dividends',
        'Insurance Claims',
        'Insurance Premiums',
        'Insurance Web Site Technical Issues',
        'Online Policy Access Issues',
        'Other Issue',
        'Policy Loan',
        'Service Disabled Veterans’ Life Insuranc',
        'Servicemembers Group Life Ins (SGLI)',
        'SGLI Family Coverage',
        'Veterans’ Group Life Insurance (VGLI)',
        'Veterans’ Mortgage Life Insurance',
        'Filing for pension benefits',
        'Issues/Questions about pension received',
        'Apply for Direct Deposit',
        'Change Direct Deposit Destination',
        'Aid and Attendance Benefits',
        'Guardianship/Custodianship Issues',
        'Orientation',
        'Servicemembers',
        'Cannot Login',
        'Address Issue',
        'Claim Access Issue',
        'Other Technical Issue',
        'Home Loan Guaranty VIP Portal Access',
        'Home Loan Guaranty Web Page Issues',
        'E-Benefits Website Technical Issue',
        'MyHealtheVet Website Technical Issue',
        'VA Dept Website - Report Broken Links (provide link inform',
        'VA Dept Website - Unable to access web page',
        'Can I get a link on VA site to my site',
        'Correction to posted information needed',
        'May I link to www.va.gov',
        'Use of VA logo or VA seal',
        'Use of images on VA websites',
        'All other Web related technical issues',
        'VBA Website - Report Broken Links (provide link inform',
        'VBA Website - Unable to access web page',
        'Can I get a link on VBA site to my site',
        'E-Benefits Password/Access Problem',
        'Education Password/Access Problems',
        'VBA Homeloan VIP Portal Access',
        'Life Insurance Password/Access Problem',
        'MyHealtheVet Password/Access Problem',
        'VONAPP Password/Access Problem',
      ],
    },
    inquiryType: {
      type: 'string',
      enum: [
        'Question',
        'Compliment',
        'Service Complaint',
        'Suggestion',
        'Status of Claim',
        'Status of Appeal at a Local VA Office',
        'Status of Appeals at BVA, Wash DC',
      ],
    },
    query: {
      type: 'string',
    },
    veteranStatus: {
      type: 'object',
      required: ['veteranStatus'],
      properties: {
        veteranStatus: {
          type: 'string',
          enum: ['vet', 'behalf of vet', 'dependent', 'general'],
          enumNames: [
            'For myself as a Veteran',
            'On behalf of a Veteran',
            'For the dependent of a Veteran',
            'A general question',
          ],
        },
        isDependent: {
          type: 'boolean',
        },
        relationshipToVeteran: {
          type: 'string',
          enum: [
            'Attorney',
            'Authorized 3rd Party',
            'Daughter',
            'Dependent Child',
            'Ex-spouse',
            'Father',
            'Funeral Director',
            'General Question; Not Applicable',
            'Guardian/Fiduciary',
            'Helpless Child',
            'Mother',
            'Other',
            'Sibling',
            'Son',
            'Spouse',
            'Surviving Spouse',
            'Veteran',
            'VSO',
          ],
        },
        veteranIsDeceased: {
          type: 'boolean',
        },
        branchOfService: {
          type: 'string',
          enum: [
            'Air Force',
            'Air Force Reserves',
            'Air Force National Guard',
            'Air Force Nursing Corps (AFNC)',
            'Army',
            'Army National Guard',
            'Army Reserves',
            'Coast Guard',
            "Coast Guard Women's Reserve (SPARS)",
            'Environmental Services Administration',
            'Marine Corps',
            'Marine Corps Reserves',
            'Natl Oceanic & Atmospheric Admin (NOAA)',
            'Navy',
            'Navy Reserves',
            'Navy Nursing Corps (NNC)',
            'Philippines Guerilla',
            'Philippines Scout',
            'Public Health Service',
            'U. S. Merchant Marine',
            "Women's Air Force Service Pilots (WASPS)",
            "Women's Army Auxiliary Corps (WAAC)",
            "Women's Army Corps (WACs)",
            'Womens Voluntary Emerg Srv (WAVES)',
            'Other',
          ],
        },
      },
    },
  },
};

[['email'], ['phone'], ['address'], ['date', 'dateOfDeath'], ['privacyAgreementAccepted']].forEach(args => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

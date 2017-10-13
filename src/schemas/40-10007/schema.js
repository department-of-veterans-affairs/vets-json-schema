import constants from '../../common/constants';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
let modifiedToursOfDuty = definitions.toursOfDuty;
modifiedToursOfDuty.items.required = ['serviceBranch'];
delete modifiedToursOfDuty.items.properties.benefitsToApplyTo;
delete modifiedToursOfDuty.items.properties.applyPeriodToSelected;
delete modifiedToursOfDuty.items.properties.serviceStatus;

_.merge(modifiedToursOfDuty, {
  items: {
    properties: {
      dischargeType: {
        type: 'string',
        'enum': constants.dischargeTypes.map(option => option.value)
      },
      highestRank: {
        type: 'string'
      }
    }
  }
});

definitions =  _.pick(definitions, [
  'address',
  'date',
  'dateRange',
  'files',
  'fullName',
  'phone',
  'ssn',
  'vaFileNumber'
]);

definitions.email = {
  type: 'string',
  pattern: '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_+-]+\\.[a-zA-Z]+'
};

definitions.fullName.properties.first.maxLength = 15;
definitions.fullName.properties.last.maxLength = 25;
definitions.fullName.properties.middle.maxLength = 25;
definitions.fullName.properties.maiden = { type: 'string', maxLength: 15 };

definitions.phone.minLength = 0;
definitions.phone.maxLength = 20;
definitions.phone.pattern = '[0-9+\\s-]{0,20}';

definitions.ssn.pattern = '\\d{3}-\\d{2}-\\d{4}';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR PRE-NEED DETERMINATION OF ELIGIBILITY IN A VA NATIONAL CEMETERY',
  type: 'object',
  additionalProperties: false,
  definitions,
  properties: {
    applications: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'applicant',
          'claimant',
          'currentlyBuriedPersons',
          'hasAttachments',
          'hasCurrentlyBuried',
          'veteran'
        ],
        properties: {
          applicant: {
            type: 'object',
            required: [
              'applicantEmail',
              'applicantPhoneNumber',
              'applicantRelationshipToClaimant',
              'mailingAddress',
              'name'
            ],
            properties: {
              applicantEmail: schemaHelpers.getDefinition('email'),
              applicantPhoneNumber: schemaHelpers.getDefinition('phone'),
              applicantRelationshipToClaimant: {
                type: 'string',
                'enum': [
                  'Self',
                  'Authorized Agent/Rep'
                ]
              },
              completingReason: { type: 'string', maxLength: 256 },
              mailingAddress: schemaHelpers.getDefinition('address'),
              name: schemaHelpers.getDefinition('fullName')
            }
          },
          claimant: {
            type: 'object',
            required: [
              'address',
              'dateOfBirth',
              'name',
              'relationshipToVet',
              'ssn'
            ],
            properties: {
              address: schemaHelpers.getDefinition('address'),
              dateOfBirth: { type: 'string', format: 'date' },
              desiredCemetery: { type: 'string', pattern: '^\\d{3}$' },
              email: schemaHelpers.getDefinition('email'),
              name: schemaHelpers.getDefinition('fullName'),
              phoneNumber: schemaHelpers.getDefinition('phone'),
              relationshipToVet: {
                type: 'string',
                'enum': [
                  '1', // Veteran
                  '2', // Spouse/Surviving Spouse
                  '3', // Unmarried Adult Child
                  '4'  // Other
                ]
              },
              ssn: schemaHelpers.getDefinition('ssn')
            }
          },
          veteran: {
            type: 'object',
            required: [
              'currentName',
              'gender',
              'isDeceased',
              'maritalStatus',
              'serviceName',
              'serviceRecords',
              'ssn',
              'militaryStatus'
            ],
            properties: {
              address: schemaHelpers.getDefinition('address'),
              currentName: schemaHelpers.getDefinition('fullName'),
              dateOfBirth: { type: 'string', format: 'date' },
              dateOfDeath: { type: 'string', format: 'date' },
              gender: {
                type: 'string',
                'enum': ['Female', 'Male']
              },
              isDeceased: {
                type: 'string',
                'enum': ['yes', 'no', 'unsure']
              },
              maritalStatus: {
                type: 'string',
                'enum': [
                  'Single',
                  'Separated',
                  'Married',
                  'Divorced',
                  'Widowed'
                ]
              },
              militaryServiceNumber: { type: 'string', maxLength: 9 },
              militaryStatus: {
                type: 'object',
                properties: {
                  veteran: { type: 'boolean' },
                  retiredActiveDuty: { type: 'boolean' },
                  diedOnActiveDuty: { type: 'boolean' },
                  retiredReserve: { type: 'boolean' },
                  retiredNationalGuard: { type: 'boolean' },
                  deathInactiveDuty: { type: 'boolean' },
                  other: { type: 'boolean' }
                }
              },
              placeOfBirth: { type: 'string', maxLength: 100 },
              serviceName: schemaHelpers.getDefinition('fullName'),
              serviceRecords: modifiedToursOfDuty,
              ssn: schemaHelpers.getDefinition('ssn'),
              vaClaimNumber: schemaHelpers.getDefinition('vaFileNumber'),
            }
          },
          hasCurrentlyBuried: {
            type: 'string',
            'enum': [
              '1', // Yes
              '2', // No
              '3'  // Don't know
            ]
          },
          currentlyBuriedPersons: {
            type: 'array',
            minItems: 0,
            items: {
              type: 'object',
              required: ['name'],
              properties: {
                cemeteryNumber: { type: 'string', pattern: '^\\d{3}$' },
                name: { type: 'string' }
              }
            }
          },
          hasAttachments: { type: 'boolean' },
          attachments: schemaHelpers.getDefinition('files')
        }
      }
    }
  }
};

export default schema;


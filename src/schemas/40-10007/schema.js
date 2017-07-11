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

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR PRE-NEED DETERMINATION OF ELIGIBILITY IN A VA NATIONAL CEMETERY',
  type: 'object',
  additionalProperties: false,
  definitions: _.pick(definitions, [
    'address',
    'date',
    'dateRange',
    'files',
    'fullName',
    'gender',
    'phone',
    'ssn',
    'vaFileNumber'
  ]),
  properties: {
    applications: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          applicant: {
            type: 'object',
            properties: {
              applicantEmail: { type: 'string', format: 'email' },
              applicantPhoneNumber: schemaHelpers.getDefinition('phone'),
              applicationRelationshipToClaimant: {
                type: 'string',
                'enum': [
                  'self',
                  'Authorized Agent/Rep'
                ]
              },
              completingReason: { type: 'string' },
              mailingAddress: schemaHelpers.getDefinition('address'),
              name: schemaHelpers.getDefinition('name')
            }
          },
          claimant: {
            type: 'object',
            properties: {
              address: schemaHelpers.getDefinition('address'),
              dateOfBirth: schemaHelpers.getDefinition('date'),
              desiredCemetery: { type: 'integer' },
              email: { type: 'string', format: 'email' },
              name: schemaHelpers.getDefinition('fullName'),
              maidenName: { type: 'string' },
              phoneNumber: schemaHelpers.getDefinition('phone'),
              relationshipToVet: {
                type: 'object',
                required: ['type'],
                properties: {
                  type: {
                    type: 'integer',
                    enum: [
                      1, // Veteran
                      2, // Spouse/Surviving Spouse
                      3  // Unmarried Adult Child
                    ]
                  },
                  other: { type: 'string' }
                }
              },
              ssn: schemaHelpers.getDefinition('ssn')
            }
          },
          veteran: {
            type: 'object',
            properties: {
              address: schemaHelpers.getDefinition('address'),
              currentName: schemaHelpers.getDefinition('fullName'),
              dateOfBirth: schemaHelpers.getDefinition('date'),
              dateOfDeath: schemaHelpers.getDefinition('date'),
              gender: schemaHelpers.getDefinition('gender'),
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
              militaryServiceNumber: { type: 'string' },
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
              placeOfBirth: { type: 'string' },
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
                cemeteryNumber: { type: 'string', pattern: '^\d{3}$' },
                name: { type: 'string' }
              }
            }
          },
          hasAttachments: {
            type: 'string',
            'enum': [
              'true',
              'false'
            ]
          },
          attachments: schemaHelpers.getDefinition('files')
        }
      }
    }
  }
};

export default schema;


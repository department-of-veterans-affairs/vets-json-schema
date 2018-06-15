import constants from '../../common/constants';
import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
let modifiedToursOfDuty = definitions.toursOfDuty;

_.merge(modifiedToursOfDuty, {
  minItems: 1,
  items: {
    properties: {
      serviceBranch: {
        // All branches active during WWII and later as returned by EOAS getBranchesOfService
        'enum': [
          'AL', // ALLIED FORCES
          'FS', // AMERICAN FIELD SERVICE
          'FT', // AMERICAN VOL GRP FLYING TIGERS
          'ES', // AMERICAN VOLUNTEER GUARD
          'CM', // CADET OR MIDSHIPMAN
          'C3', // CIV AIR TRANSPORT CMD (TWA)
          'C2', // CIV AIR TRANSPORT CMD (UNITED)
          'C4', // CIV AIR TRANSPORT CMD (VULTEE)
          'C7', // CIV AIR TRANSPORT COMMAND (NORTHWEST)
          'C5', // CIV AIR TRANSPRT CMD(AMERICAN)
          'GS', // CIV CREW OF USCGS VESSELS
          'CI', // CIV ID FRIEND/FOE (IFF) TECH
          'FP', // CIVILIAN FERRY PILOT
          'CS', // CIVILIAN W/STRATEGIC SVC (OSS)
          'CV', // CIVILIAN WAKE ISLAND NAS
          'XG', // US COAST GUARD RESERVE
          'CB', // DEFENSE OF BATAAN
          'FF', // FOREIGN FORCES
          'GP', // GUAM COMBAT PATROL
          'MO', // MERCHANT SN IN OPER MULBERRY
          'NO', // NATIONAL OCEAN/ATMOSPHER ADMIN
          'NN', // NAVY NURSE CORPS
          'NM', // NON-MILITARY CIVILIAN
          'PA', // PHILIPPINE ARMY
          'PG', // PHILIPPINE GUERILLA
          'KC', // QRTRMASTER CORPS KESWICK CREW
          'PS', // REGULAR PHILIPPINE SCOUTS
          'RO', // ROTC OF ARMY NAVY OR AF
          'CF', // ROYAL CANADIAN AIR FORCE
          'CE', // ROYAL CANADIAN CORPS SIGNAL
          'AF', // US AIR FORCE
          'XF', // US AIR FORCE RESERVE
          'AG', // US AIR NATIONAL GUARD
          'AR', // US ARMY
          'AC', // US ARMY AIR CORPS
          'AA', // US ARMY AIR FORCES
          'AT', // US ARMY AIR FORCES (ATC)
          'NG', // US ARMY NATIONAL GUARD
          'XR', // US ARMY RESERVE
          'CO', // US ARMY TRANSPORT SERVICE
          'CA', // US CITIZEN WHO SERVED W/ALLIES
          'CC', // US CIV OF AFS WWII
          'GC', // US COAST & GEODETIC SURVEY
          'CG', // US COAST GUARD
          'XC', // US MARINE CORP RESERVE
          'MC', // US MARINE CORPS
          'MM', // US MERCHANT MARINE
          'NA', // US NAVY
          'XA', // US NAVY RESERVE
          'CD', // US NAVY TRANSPORT SERVICE
          'PH', // US PUBLIC HEALTH SERVICE
          'GU', // WAKE ISLAND DEFENDERS-GUAM
          'WP', // WOMEN AIR FORCE SERVICE PILOTS
          'WA', // WOMEN'S ARMY AUX CORPS
          'WS', // WOMEN'S ARMY CORPS
          'WR' // WOMEN'S RESERVE OF NAVY,MC,CG
        ]
      },
      dischargeType: {
        type: 'string',
        'enum': [
          '1', // Honorable
          '2', // General
          '3', // Entry Level Separation/Uncharacterized
          '4', // Other Than Honorable
          '5', // Bad Conduct
          '6', // Dishonorable
          '7'  // Other
        ]
      },
      highestRank: {
        type: 'string'
      },
      nationalGuardState: {
        type: 'string'
      }
    }
  }
});

modifiedToursOfDuty.items.required = ['serviceBranch'];
delete modifiedToursOfDuty.items.properties.benefitsToApplyTo;
delete modifiedToursOfDuty.items.properties.applyPeriodToSelected;
delete modifiedToursOfDuty.items.properties.serviceStatus;

definitions =  _.pick(definitions, [
  'address',
  'dateRange',
  'files',
  'fullName',
  'phone',
  'ssn',
  'centralMailVaFile'
]);

const emailFormat = {
  type: 'string',
  maxLength: 50,
  format: 'email'
};

definitions.address.required = ['street'];
definitions.address.properties.street.maxLength = 20;
definitions.address.properties.street2.maxLength = 20;
definitions.address.properties.city.maxLength = 20;

definitions.date = {
  type: 'string',
  format: 'date'
};

definitions.fullName.properties.first.maxLength = 15;
definitions.fullName.properties.last.maxLength = 25;
definitions.fullName.properties.middle.maxLength = 15;

definitions.phone.minLength = 0;
definitions.phone.maxLength = 20;
definitions.phone.pattern = '^[0-9+\\s-]{0,20}$';

definitions.ssn.pattern = '^\\d{3}-\\d{2}-\\d{4}$';

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'APPLICATION FOR PRE-NEED DETERMINATION OF ELIGIBILITY IN A VA NATIONAL CEMETERY',
  type: 'object',
  additionalProperties: false,
  definitions,
  properties: {
    application: {
      type: 'object',
      required: [
        'applicant',
        'claimant',
        'hasCurrentlyBuried',
        'veteran'
      ],
      properties: {
        applicant: {
          type: 'object',
          required: [
            'applicantRelationshipToClaimant',
            'applicantEmail',
            'applicantPhoneNumber',
            'mailingAddress',
            'name'
          ],
          properties: {
            applicantEmail: emailFormat,
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
            dateOfBirth: schemaHelpers.getDefinition('date'),
            desiredCemetery: { type: 'string', pattern: '^\\d{3}$' },
            email: emailFormat,
            name: _.merge({}, definitions.fullName, {
              properties: {
                maiden: {
                  type: 'string',
                  maxLength: 15
                }
              }
            }),
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
            currentName: _.merge({}, definitions.fullName, {
              properties: {
                maiden: {
                  type: 'string',
                  maxLength: 15
                }
              }
            }),
            dateOfBirth: schemaHelpers.getDefinition('date'),
            dateOfDeath: schemaHelpers.getDefinition('date'),
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
              type: 'string',
              minLength: 1,
              maxLength: 1,
              'enum': [
                'A', // Active Duty
                'I', // Death Related To Inactive Duty Training
                'D', // Died On Active Duty
                'S', // Reserve/National Guard
                'R', // Retired
                'E', // Retired Active Duty
                'O', // Retired Reserve Or National Guard
                'V', // Veteran
                'X'  // Other (Or Unknown)
              ]
            },
            placeOfBirth: { type: 'string', maxLength: 100 },
            serviceName: schemaHelpers.getDefinition('fullName'),
            serviceRecords: modifiedToursOfDuty,
            ssn: schemaHelpers.getDefinition('ssn'),
            vaClaimNumber: schemaHelpers.getDefinition('centralMailVaFile'),
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
          items: {
            type: 'object',
            required: ['name'],
            properties: {
              name: schemaHelpers.getDefinition('fullName'),
              cemeteryNumber: { type: 'string', pattern: '^\\d{3}$' }
            }
          }
        },
        preneedAttachments: _.merge({}, originalDefinitions.files, {
          items: {
            required: ['attachmentId', 'confirmationCode'],
            properties: {
              attachmentId: {
                type: 'string'
              }
            }
          }
        })
      }
    }
  }
};

export default schema;

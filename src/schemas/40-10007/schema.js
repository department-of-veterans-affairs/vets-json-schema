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
          'AC', // US ARMY AIR CORPS
          'AF', // US AIR FORCE
          'AR', // US ARMY
          'CG', // US COAST GUARD
          'CV', // CIVILIAN WAKE ISLAND NAS
          'FP', // CIVILIAN FERRY PILOT
          'MM', // US MERCHANT MARINE
          'PH', // US PUBLIC HEALTH SERVICE
          'NN', // NAVY NURSE CORPS
          'WA', // WOMEN'S ARMY AUX CORPS
          'WS', // WOMEN'S ARMY CORPS
          'CF', // ROYAL CANADIAN AIR FORCE
          'RO', // ROTC OF ARMY NAVY OR AF
          'CA', // US CITIZEN WHO SERVED W/ALLIES
          'WR', // WOMEN'S RESERVE OF NAVY,MC,CG
          'CS', // CIVILIAN W/STRATEGIC SVC (OSS)
          'KC', // QRTRMASTER CORPS KESWICK CREW
          'CB', // DEFENSE OF BATAAN
          'CO', // US ARMY TRANSPORT SERVICE
          'CI', // CIV ID FRIEND/FOE (IFF) TECH
          'CC', // AMERICAN FIELD SERVICE
          'GS', // CIV CREW OF USCGS VESSELS
          'FT', // AMERICAN VOL GRP FLYING TIGERS
          'CE', // ROYAL CANADIAN CORPS SIGNAL
          'C2', // CIV AIR TRANSPORT CMD (UNITED)
          'C3', // CIV AIR TRANSPORT CMD (TWA)
          'C4', // CIV AIR TRANSPORT CMD (VULTEE)
          'C5', // CIV AIR TRANSPRT CMD(AMERICAN)
          'C7', // CIV AIR TRANSPORT COMMAND (NORTHWEST)
          'CD', // US NAVY TRANSPORT SERVICE
          'NM', // NON-MILITARY CIVILIAN
          'AL', // ALLIED FORCES
          'AA', // US ARMY AIR FORCES
          'AT', // US ARMY AIR FORCES (ATC)
          'GP', // GUAM COMBAT PATROL
          'MC', // US MARINE CORPS
          'NO', // NATIONAL OCEAN/ATMOSPHER ADMIN
          'PS', // REGULAR PHILIPPINE SCOUTS
          'CM', // CADET OR MIDSHIPMAN
          'WP', // WOMEN AIR FORCE SERVICE PILOTS
          'GU', // WAKE ISLAND DEFENDERS-GUAM
          'MO', // MERCHANT SN IN OPER MULBERRY
          'FS', // AMERICAN FIELD SERVICE
          'ES', // AMERICAN VOLUNTEER GUARD
          'FF', // FOREIGN FORCES
          'GC', // US COAST & GEODETIC SURVEY
          'PA', // PHILIPPINE ARMY
          'AG', // US AIR NATIONAL GUARD
          'NG', // US ARMY NATIONAL GUARD
          'PG', // PHILIPPINE GUERILLA
          'XA', // US NAVY RESERVE
          'XR', // US ARMY RESERVE
          'XF', // US AIR FORCE RESERVE
          'XC', // US MARINE CORP RESERVE
          'XG'  // US COAST GUARD RESERVE
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
  'vaFileNumber'
]);

definitions.address.required = ['street'];
definitions.address.properties.street.maxLength = 35;
definitions.address.properties.street2.maxLength = 35;
definitions.address.properties.city.maxLength = 30;

definitions.date = {
  type: 'string',
  format: 'date'
};

definitions.email = {
  type: 'string',
  maxLength: 50,
  pattern: '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_+-]+\\.[a-zA-Z]+'
};

definitions.fullName.properties.first.maxLength = 15;
definitions.fullName.properties.last.maxLength = 25;
definitions.fullName.properties.middle.maxLength = 15;
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
            dateOfBirth: schemaHelpers.getDefinition('date'),
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
                'R', // Retired
                'S', // Reserve/National Guard
                'V', // Veteran
                'X', // Other (Or Unknown)
                'E', // Retired Active Duty
                'D', // Died On Active Duty
                'O', // Retired Reserve Or National Guard
                'I'  // Death Related To Inactive Duty Training
              ]
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
          items: {
            type: 'object',
            required: ['name'],
            properties: {
              name: schemaHelpers.getDefinition('fullName'),
              cemeteryNumber: { type: 'string', pattern: '^\\d{3}$' }
            }
          }
        },
        preneedAttachments: _.merge(schemaHelpers.getDefinition('files'), {
          attachmentId: {
            type: 'string',
            'enum': [
              '1',
              '2',
              '3',
              // Skipping 4 because it says "VA PRENEED FORM" and that doesn't seem useful?
              '5',
              '6'
            ]
          }
        })
      }
    }
  }
};

export default schema;

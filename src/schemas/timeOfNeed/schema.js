import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import { states50AndDC } from '../../common/constants';
import _ from 'lodash';

let definitions = _.cloneDeep(originalDefinitions);
let modifiedToursOfDuty = definitions.toursOfDuty;

const nationalGuardStates = states50AndDC.concat([
    { label: 'Guam', value: 'GU' },
    { label: 'Puerto Rico', value: 'PR' },
    { label: 'Virgin Islands', value: 'VI' }
]).sort((stateA, stateB) => (stateA.label.localeCompare(stateB.label)))

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
                type: 'string',
                maxLength: 3,
                'enum': nationalGuardStates.map(state => state.value),
                enumNames: nationalGuardStates.map(state => state.label)
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
    title: 'APPLICATION FOR TIME OF NEED BENEFITS IN A VA NATIONAL CEMETERY',
    type: 'object',
    additionalProperties: false,
    definitions,
    properties: {
        application: {
            type: 'object',
            required: [
                'decedent'
            ],
            properties: {
                decedent: {
                    type: 'object',
                    required: [
                        'name'
                    ]
                }
            }
        }
    }
};

export default schema;

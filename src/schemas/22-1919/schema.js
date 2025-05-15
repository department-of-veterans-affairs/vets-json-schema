import _ from 'lodash';
import definitions from '../../common/definitions';

const origDefinitions = _.cloneDeep(definitions);

const pickedDefinitions = _.pick(origDefinitions, ['date']);

const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VA Form 22-1919',
  type: 'object',
  additionalProperties: false,
  definitions: pickedDefinitions,
  required: ['designatedOfficial', 'institutionDetails', 'statementOfTruthSignature', 'dateSigned'],
  properties: {
    institutionDetails: {
      type: 'object',
      required: ['first', 'last', 'role', 'hasFacilityCode', 'facilityCode'],
      properties: {
        first: {
          type: 'string',
        },
        last: {
          type: 'string',
        },

    }
  },
}
};
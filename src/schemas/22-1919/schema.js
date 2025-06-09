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
  required: ['institutionDetails', 'statementOfTruthSignature', 'dateSigned'],
  properties: {
    certifyingOfficial: {
      type: 'object',
      required: ['first', 'last', 'role'],
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
        role: {
          type: 'object',
          properties: {
            level: {
              type: 'string',
              enum: ['Certifying Official', 'Owner', 'Officer', 'other'],
            },
            other: {
              type: 'string',
              minLength: 0,
              maxLength: 30,
            },
          },
        },
      },
    },
    institutionDetails: {
      type: 'object',
      required: ['aboutYourInstitution', 'facilityCode', 'insitutionName', 'address'],
      properties: {
        aboutYourInstitution: {
          type: definitions.yesNoSchema,
        },
        facilityCode: {
          type: 'string',
          pattern: '^[a-zA-Z0-9]{8}$',
        },
        institutionName: {
          type: 'string',
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            state: {
              type: 'string',
              pattern: '^[A-Z]{2}$',
            },
            zip: {
              type: 'string',
              pattern: '^\\d{5}(-\\d{4})?$',
            },
          },
        },
      },
    },
    proprietaryProfitSchoolsOnly: {
      isProprietaryProfit: definitions.yesNoSchema,
    },
    // Need this property? or enough to judge if conflictingIndividuals array is empty? Align ui config once deciding
    proprietaryProfitSchoolsOnlyHasConflictOfInterest: {
      hasConflictingIndividuals: definitions.yesNoSchema,
    },
    proprietaryProfitSchoolsOnlyConflictingIndividuals: {
      type: 'array',
      items: {
        type: 'object',
        required: ['first', 'last', 'title', 'association'],
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
          title: {
            type: 'string',
            minLength: 1,
            maxLength: 50,
          },
          association: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['vaEmployee', 'saaEmployee'],
            },
          },
        },
      },
    },
    // Need this property? or enough to judge if conflictingIndividuals array is empty? Align ui config once deciding
    allProprietarySchoolsHasConflictOfInterest: {
      hasConflictOfInterest: definitions.yesNoSchema,
    },
    allProprietarySchoolsConflictingIndividuals: {
      type: 'array',
      items: {
        type: 'object',
        required: ['allProprietarySchoolsEmployeeInfo', 'fileNumber', 'enrollmentPeriod'],
        properties: {
          allProprietarySchoolsEmployeeInfo: {
            type: 'object',
            required: ['first', 'last', 'title'],
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
              title: {
                type: 'string',
                minLength: 1,
                maxLength: 50,
              },
            },
          },
          fileNumber: {
            type: 'string',
            pattern: definitions.ssn || definitions.centralMailVaFile, // TODO: syntax ok? add custom regex to cover both if unit test fails
          },
          enrollmentPeriod: definitions.dateRange,
        },
      },
    },
    statementOfTruthSignature: {
      // match 10215
      type: 'string',
    },
    dateSigned: definitions.date,
  },
};

export default schema;

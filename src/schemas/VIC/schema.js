import originalDefinitions from '../../common/definitions';
import schemaHelpers from '../../common/schema-helpers';
import _ from 'lodash';
import constants from '../../common/constants';

const address = (() => {
  const countries = constants.salesforceCountries.map(object => object.value);
  const countriesWithStates = Object.keys(constants.salesforceStates).filter(x => _.includes(countries, x));
  const countriesWithNoState = _.difference(countries, countriesWithStates);
  const countryStateProperties = _.map(constants.salesforceStates, (value, key) => ({
    properties: {
      country: {
        type: 'string',
        'enum': [key]
      },
      state: {
        type: 'string',
        'enum': value.map(x => x.value)
      },
      postalCode: {
        type: 'string',
        maxLength: 10
      }
    }
  }));
  countryStateProperties.push({
    properties: {
      country: {
        not: {
          type: 'string',
          'enum': countriesWithStates
        }
      },
      country: {
        type: 'string',
        'enum': countriesWithNoState
      },
      postalCode: {
        type: 'string',
        maxLength: 51
      }
    }
  });

  return {
    type: 'object',
    oneOf: countryStateProperties,
    properties: {
      street: {
        type: 'string',
        minLength: 1,
        maxLength: 50
      },
      street2: {
        type: 'string',
        minLength: 1,
        maxLength: 50
      },
      city: {
        type: 'string',
        minLength: 1,
        maxLength: 51
      }
    }
  };
})();

let schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'VETERAN IDENTIFICATION CARD FORM',
  type: 'object',
  additionalProperties: false,
  definitions: {
    address: address
  },
  properties: {
    serviceBranch: {
      type: 'string',
      enum: [
        'F', // Air Force
        'A', // Army
        'C', // Coast Guard
        'M', // Marine Corps
        'N', // Navy
      ]
    },
    email: {
      type: 'string',
      format: 'email'
    },
    photo: originalDefinitions.files.items,
    dd214: Object.assign({}, originalDefinitions.files, {
      minItems: 1
    }),
    veteranDateOfBirth: {
      type: 'string',
      format: 'date'
    }
  },
  required: ['privacyAgreementAccepted']
};

[
  ['privacyAgreementAccepted'],
  ['fullName', 'veteranFullName'],
  ['address', 'veteranAddress'],
  ['ssn', 'veteranSocialSecurityNumber'],
  ['phone'],
  ['gender']
].forEach((args) => {
  schemaHelpers.addDefinitionToSchema(schema, ...args);
});

export default schema;

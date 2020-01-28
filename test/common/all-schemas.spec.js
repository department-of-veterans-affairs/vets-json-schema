import schemas from '../../dist/schemas';
import { expect } from 'chai';
import _ from 'lodash';

describe('all schema tests', () => {
  it('schema properties should have types', () => {
    const skipTypeArr = [
      'allOf',
      'anyOf',
      'oneOf',
      'not'
    ];

    const checkObjectTypes = (key, obj, skipTypeCheck = false) => {
      const lastKey = _.tap(key.split('.'), keyArr => {
        return keyArr[keyArr.length - 1];
      });

      _.tap(Object.keys(obj), objKeys => {
        if (
          !skipTypeCheck &&
          objKeys.length === 1 &&
          _.includes(skipTypeArr, objKeys[0])
        ) {
          skipTypeCheck = true;
        }
      });

      if (!skipTypeCheck && obj.type == null) {
        throw new Error(`${key} needs type`);
      }

      for (let k in obj) {
        let v = obj[k];
        let skipNextTypeCheck = false;

        if (_.isPlainObject(v) && v['$ref'] == null) {
          if (obj['$schema'] && k === 'definitions') skipNextTypeCheck = true;

          if (!skipNextTypeCheck && lastKey !== 'properties' && k === 'properties') skipNextTypeCheck = true;

          checkObjectTypes(`${key}.${k}`, v, skipNextTypeCheck);
        } else if (_.isArray(v)) {
          if (_.includes(skipTypeArr, k) && obj.type != null) skipNextTypeCheck = true;

          v.forEach((item) => {
            if (_.isPlainObject(item)) checkObjectTypes(`${key}.${k}`, item, skipNextTypeCheck);
          });
        }
      }
    };

    for (let k in schemas) {
      // skip "checkObjectTypes" for these dist files used as enums
      if (['definitions', 'constants', 'vaMedicalFacilities'].includes(k)) continue;

      // skip "checkObjectTypes" for dist files that contains "-example" (used for example data) AND does not contain "schema"
      if (k.indexOf('-example') > -1 && k.indexOf('schema') === -1) continue;

      checkObjectTypes(k, schemas[k]);
    }
  });
});

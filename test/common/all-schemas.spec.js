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

      if (Object.keys(obj).length === 1 && !skipTypeCheck) {
        for (let i = 0, len = skipTypeArr.length; i < len; i++) {
          if (skipTypeCheck) break;

          let key = skipTypeArr[i];

          if (obj[key] != null) skipTypeCheck = true;
        }
      }

      if (!skipTypeCheck && obj.type == null) {
        throw `${key} needs type`;
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
      if (k === 'definitions') continue;

      checkObjectTypes(k, schemas[k]);
    }
  });
});

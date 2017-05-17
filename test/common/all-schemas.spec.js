import schemas from '../../dist/schemas';
import { expect } from 'chai';
import _ from 'lodash';

describe('all schema tests', () => {
  describe('types test', () => {
    const iterateObject = (key, obj, skipTypeCheck = false) => {
      if (!skipTypeCheck && obj.type == null) {
        throw `${key} needs type`;
      }

      for (let k in obj) {
        let v = obj[k];

        if (_.isPlainObject(v) && v['$ref'] == null) {
          let skipNextTypeCheck = false;

          if (obj['$schema'] && k === 'definitions') skipNextTypeCheck = true;
          if (k === 'properties') skipNextTypeCheck = true;

          iterateObject(`${key}.${k}`, v, skipNextTypeCheck);
        } else if (_.isArray(v)) {
          v.forEach((item) => {
            iterateObject(`${key}.${k}`, item);
          });
        }
      }
    };

    for (let k in schemas) {
      iterateObject(k, schemas[k]);
    }
  });
});

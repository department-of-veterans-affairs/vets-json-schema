import schemas from '../../dist/schemas';
import { expect } from 'chai';
import { get, object_error, is_object } from './all-schemas.spec.helpers.js';

// recurse through object and check each object* found using object_error.
// checks the root of an object (empty path) too.
// * object that isn't an array. a thing with keys -> values
const check_object_recursively = (root_obj, path = []) => {
  const obj = get(root_obj, path);

  if (Array.isArray(obj)) {
    const array = obj;
    array.forEach((_, i) => check_object_recursively(root_obj, [...path, i]));
    return;
  }

  if (!is_object(obj)) return;

  const error = object_error(root_obj, path); // ensure object's have a type (or $ref/const/enum)
  if (error) throw new Error(error);

  for (const prop in obj) if (obj.hasOwnProperty(prop)) check_object_recursively(root_obj, [...path, prop]);
};

describe('all schema tests', () => {
  for (let k in schemas) {
    if (!schemas.hasOwnProperty(k)) continue;

    // skip "checkObjectTypes" for these dist files used as enums
    if (
      [
        'HLR-CREATE-REQUEST-BODY_V1',
        'HLR-CREATE-RESPONSE-200_V1',
        'HLR-SHOW-RESPONSE-200_V1',
        'NOD-CREATE-REQUEST-BODY_V1',
        'NOD-CREATE-RESPONSE-200_V1',
        'NOD-SHOW-RESPONSE-200_V1',
        'SC-CREATE-REQUEST-BODY_V1',
        'SC-CREATE-RESPONSE-200_V1',
        'SC-SHOW-RESPONSE-200_V1',
        'definitions',
        'constants',
        'vaMedicalFacilities',
        'caregiverProgramFacilities',
        'form1010cgCertifications',
      ].includes(k)
    )
      continue;

    // skip "checkObjectTypes" for dist files that contains "-example" (used for example data) AND does not contain "schema"
    if (k.indexOf('-example') > -1 && k.indexOf('schema') === -1) continue;

    it(`${k} - schema properties should have types (or $ref/const/enum)`, () => check_object_recursively(schemas, [k]));
  }
});

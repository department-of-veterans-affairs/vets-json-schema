import schemas from '../../dist/schemas';
import { expect } from 'chai';
import _ from 'lodash';
import {
  get,
  is_definitions_path,
  is_a_properties_object,
  object_has_at_least_one_of_the_following_properties,
  inside_an_allOf_anyOf_oneOf_or_not,
  a_sibling_has_at_least_one_of_the_following_properties,
  object_error,
} from './all-schemas.spec.helpers.js';

// recurse through object and check each object* found using object_error.
// checks the root of an object (empty path) too.
// * object that isn't an array. a thing with keys -> values
const check_object_recursively = (root_obj, path = []) => {
  const obj = get(root_obj, path);

  if (Array.isArray(obj)) {
    const array = obj;
    array.forEach((_, i) => check_object_recursively(root_obj, [...path, i]));
  } else if (_.isObject(obj)) {
    const error = object_error(root_obj, path); // ensure object's have a type (or $ref/const/enum)
    if (error) throw new Error(error);
    for (const prop in obj) if (obj.hasOwnProperty(prop)) check_object_recursively(root_obj, [...path, prop]);
  }
};

describe('all schema tests', () => {
  it('schema properties should have types (or $ref/const/enum)', () => {
    for (let k in schemas) {
      if (!schemas.hasOwnProperty(k)) continue;

      // skip "checkObjectTypes" for these dist files used as enums
      if (['definitions', 'constants', 'vaMedicalFacilities', 'caregiverProgramFacilities'].includes(k)) continue;

      // skip "checkObjectTypes" for dist files that contains "-example" (used for example data) AND does not contain "schema"
      if (k.indexOf('-example') > -1 && k.indexOf('schema') === -1) continue;

      check_object_recursively(schemas, [k]);
    }
  });
});

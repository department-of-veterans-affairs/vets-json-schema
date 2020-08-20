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
  object_error
} from './all-schemas.spec.helpers.js';

const check_object_recursively = (root_obj, path = []) => {
  const obj = get(root_obj, path);

  //console.log(JSON.stringify(path));
  if (Array.isArray(obj)) {
    //console.log('  array');
    const array = obj;
    //console.log(JSON.stringify(array));
    array.forEach((_, i) => check_object_recursively(root_obj, [...path, i]));
  } else if (_.isObject(obj)) {
    //console.log('  object');
    //console.log(JSON.stringify(obj));
    //console.log('  checking object for errors');
    const error = object_error(root_obj, path);
    if (error) throw new Error(error);
    //console.log('    ok');
    for (const prop in obj) if (obj.hasOwnProperty(prop)) check_object_recursively(root_obj, [...path, prop]);
  }
  //console.log('  other');
};

describe('all schema tests', () => {
  it('schema properties should have types', () => {
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

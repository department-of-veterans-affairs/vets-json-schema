import schemas from '../../dist/schemas';
import { expect } from 'chai';
import _ from 'lodash';
import {
  is_definitions_path,
  is_a_properties_object,
  object_has_property_type_or_is_an_allowed_exception,
  inside_an_allOf_anyOf_oneOf_or_not,
  a_sibling_has_at_least_one_of_the_following_properties,
} from './all-schemas.spec.helpers.js';

const check_object_recursively = (root_obj, path = []) => {
  const obj = get(root_obj, path);

  if (_.isObject(obj)) {
    object_has_property_type_or_is_an_allowed_exception(root_obj, path);
    for (const prop in obj) if (obj.hasOwnProperty(prop)) check_object_recursively(root_obj, [...path, prop]);
  } else if (Array.isArray(obj)) {
    const array = obj;
    array.forEach((_, i) => check_object_recursively(root_obj, [...path, i]));
  }
};

const object_has_property_type_or_is_an_allowed_exception = (root_obj, path_to_obj_being_inspected) => {
  const path = path_to_obj_being_inspected;
  const obj = get(root_obj, path);

  if (
    is_definitions_path(path) ||
    is_a_properties_object(path) ||
    object_has_at_least_one_of_the_following_properties(
      ['type', '$ref', 'enum', 'const', 'allOf', 'anyOf', 'oneOf', 'not'],
      obj,
    )
  )
    return;

  const inside = inside_an_allOf_anyOf_oneOf_or_not(path);

  if (!inside)
    throw new Error(
      [
        'object should probably have property "type"',
        `(path: ${JSON.stringify(path)}`,
        `object: ${JSON.stringify(obj)})`,
      ].join(' '),
    );

  // inside an allOf/anyOf/oneOf/not
  //
  // we are in one of these spots:
  //
  //   { allOf: [ X ] }
  //   { anyOf: [ X ] }
  //   { oneOf: [ X ] }
  //   { not:  X  }
  //
  // example paths:
  //   [..., 'allOf', 7]
  //   [..., 'oneOf', 0]
  //   [..., 'not']

  if (inside === 'not') {
    // type/$ref/enum/const needs to be somewhere (X)
    //
    //   { X, not: { X } }    // inside the "not" or at the same level
    //
    // inside the not would have been caught above (the first if statement)

    const obj_one_level_up = get(root_obj, path.slice(0, -1));

    if (object_has_at_least_one_of_the_following_properties(['type', '$ref', 'enum', 'const'], obj_one_level_up))
      return;

    throw new Error('a "not" needs either a type/$ref/const/enum somewhere');
  }

  // inside an allOf/anyOf/oneOf array
  //
  // type/$ref/enum/const needs to be somewhere (X)
  //
  //   { X, allOf: [..., X, ...] }  // a sibling element to the current object, or at the same level as allOf
  //
  // inside the current object would have been caught above (the first if statement)

  const obj_two_levels_up = get(root_obj, path.slice(0, -2));
  if (
    a_sibling_has_at_least_one_of_the_following_properties(['type', '$ref', 'enum', 'const'], root_obj, path) ||
    object_has_at_least_one_of_the_following_properties(['type', '$ref', 'enum', 'const'], obj_two_levels_up)
  )
    return;

  throw new Error('allOf/anyOf/oneOf needs either a type/$ref/const/enum somewhere');
};

describe('all schema tests', () => {
  it('schema properties should have types', () => {
    throw new Error(`${Object.keys(schemas)}`);
    for (let k in schemas) {
      // skip "checkObjectTypes" for these dist files used as enums
      if (['definitions', 'constants', 'vaMedicalFacilities', 'caregiverProgramFacilities'].includes(k)) continue;

      // skip "checkObjectTypes" for dist files that contains "-example" (used for example data) AND does not contain "schema"
      if (k.indexOf('-example') > -1 && k.indexOf('schema') === -1) continue;

      check_object_recursively(k);
    }
  });
});

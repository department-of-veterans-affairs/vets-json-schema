const get = (object, path) => {
  // unlike lodash's get, empty path returns object
  if (!Array.isArray(path)) throw new Error('path must be an array');

  const length = path.length;
  let i = 0;
  while (i < length) object = object[path[i++]];

  return object;
};

const is_definitions_path = path => Array.isArray(path) && path.length === 2 && path[1] === 'definitions';

const object_has_at_least_one_of_the_following_properties = (properties, obj) => {
  if (!Array.isArray(properties)) throw new Error('properties should be an array');
  if (Array.isArray(obj)) throw new Error('obj should not be an array');

  return properties.find(property => obj.hasOwnProperty(property));
};

const starting_at_end_of_array_number_of_elements_that_are_the_string_properties = path => {
  if (!Array.isArray(path)) throw new Error('path must be an array');

  let properties = 0;
  for (let i = path.length - 1; i >= 0; i--) {
    if (path[i] !== 'properties') break;
    properties++;
  }
  return properties;
};

const has_odd_number_of_properties_at_the_end = path =>
  starting_at_end_of_array_number_of_elements_that_are_the_string_properties(path) % 2 === 1;
const is_a_properties_object = has_odd_number_of_properties_at_the_end;

const last_element = array => array[array.length - 1];

const last_element_is_an_integer = array => Number.isInteger(last_element(array));

const has_penultimate_element = array => array.length > 1;

const penultimate_element = array => array[array.length - 2];

const inside_an_xOf = x => path =>
  has_penultimate_element(path) && penultimate_element(path) === x && last_element_is_an_integer(path);
const inside_an_allOf = inside_an_xOf('allOf');
const inside_an_anyOf = inside_an_xOf('anyOf');
const inside_a_oneOf = inside_an_xOf('oneOf');
const inside_a_not = path => last_element(path) === 'not';

const a_sibling_has_at_least_one_of_the_following_properties = (properties, root_obj, path) => {
  if (!Array.isArray(properties)) throw new Error('properties must be an array');
  if (!Array.isArray(path)) throw new Error('path must be an array');

  const array_path = path.slice(0, -1);
  const array = get(root_obj, array_path);
  if (!Array.isArray(array)) throw new Error('path does not lead to element of an array');

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (object_has_at_least_one_of_the_following_properties(properties, element)) return [...array_path, i];
  }

  return false;
};

// an object should have a type (or $ref/const/enum) (there are a few exceptions (which are handled))
// NOTE: this returns null when there is no problem or a string error message when there is
const object_error = (root_obj, path_to_obj_being_inspected) => {
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
    return null;

  if (inside_a_not(path)) {
    // type/$ref/enum/const needs to be inside the "not" or at the same level
    //
    //   { X, not: { X } }
    //
    // inside the not (current obj) would have been caught above (the first if statement)

    const obj_one_level_up = get(root_obj, path.slice(0, -1));

    return object_has_at_least_one_of_the_following_properties(['type', '$ref', 'enum', 'const'], obj_one_level_up)
      ? null
      : 'a "not" needs a type/$ref/const/enum inside the not object or at the same level as the not';
  }

  const obj_two_levels_up = get(root_obj, path.slice(0, -2));

  if (inside_an_allOf(path)) {
    // inside an allOf array
    //
    // type/$ref/enum/const needs to be in a sibling element to the current object,
    // or at the same level as allOf
    //
    //   { X, allOf: [..., X, ...] }
    //
    // inside the current object would have been caught above (the first if statement)

    return a_sibling_has_at_least_one_of_the_following_properties(['type', '$ref', 'enum', 'const'], root_obj, path) ||
      object_has_at_least_one_of_the_following_properties(['type', '$ref', 'enum', 'const'], obj_two_levels_up)
      ? null
      : 'allOf needs a type/$ref/const/enum somewhere';
  }

  if (inside_an_anyOf(path) || inside_a_oneOf(path)) {
    // inside an anyOf/oneOf array
    //
    // type/$ref/enum/const needs to either be in each member of the array OR at the (any|one)Of level
    //
    //   { X, (any|one)Of: [X, X, X, ...] }
    //
    // inside the current object would have been caught above (the first if statement)
    // therefore, type/$ref/const/enum needs to be at the (any|one)Of level

    return object_has_at_least_one_of_the_following_properties(['type', '$ref', 'enum', 'const'], obj_two_levels_up)
      ? null
      : 'anyOf/oneOf needs a single type/$ref/const/enum outside the array or each member of the array needs one';
  }

  return [
    'should object (or its parent) have type/$ref/enum/const?',
    `(path: ${JSON.stringify(path)}`,
    `object: ${JSON.stringify(obj)})`,
  ].join(' ');
};

const is_object = obj => typeof obj === 'object' && obj !== null;

export {
  get,
  is_definitions_path,
  object_has_at_least_one_of_the_following_properties,
  starting_at_end_of_array_number_of_elements_that_are_the_string_properties,
  is_a_properties_object,
  last_element,
  last_element_is_an_integer,
  has_penultimate_element,
  penultimate_element,
  inside_an_allOf,
  inside_an_anyOf,
  inside_a_oneOf,
  inside_a_not,
  a_sibling_has_at_least_one_of_the_following_properties,
  object_error,
  is_object,
};

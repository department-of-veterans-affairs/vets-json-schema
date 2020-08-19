const simpleTester = function_name => (expected, ...input) => {
  const received = eval(`${function_name}(...input)`);
  if (JSON.stringify(received) === JSON.stringify(expected)) return;
  throw new Error(
    [
      `${function_name} is broken.`,
      ...['input', 'expected', 'received'].map(s => `${s}: ${JSON.stringify(eval(s))}`),
    ].join(' '),
  );
};

let test;

const get = (object, path) => {
  // simpler than lodash's *and* empty path returns object
  if (!Array.isArray(path)) throw new Error('path must be an array');

  const length = path.length;
  let i = 0;
  while (i < length) object = object[path[i++]];

  return object;
};
test = simpleTester('get');
test(3, { x: { y: { z: 3 } } }, ['x', 'y', 'z']);
{
  const error = 'bad path should have thrown an error';
  try {
    test(3, { x: { y: { z: 3 } } }, ['x', 'z', 'y']);
    throw error;
  } catch (e) {
    if (e === error) throw e;
  }
}
test({ x: { y: { z: 3 } } }, { x: { y: { z: 3 } } }, []);

const is_definitions_path = path => Array.isArray(path) && path.length === 1 && path[0] === 'definitions';
test = simpleTester('is_definitions_path');
test(false, ['a', 'definitions']);
test(false, []);
test(true, ['definitions']);

const object_has_at_least_one_of_the_following_properties = (properties, obj) => {
  if (!Array.isArray(properties)) throw new Error('properties should be an array');
  if (Array.isArray(obj)) throw new Error('obj should not be an array');

  return properties.find(property => obj.hasOwnProperty(property));
};
test = simpleTester('object_has_at_least_one_of_the_following_properties');
test(undefined, {}, ['type']);
test('not', { not: 0 }, ['type', '$ref', 'enum', 'const', 'allOf', 'anyOf', 'oneOf', 'not']);

const starting_at_end_of_array_number_of_elements_that_are_the_string_properties = path => {
  if (!Array.isArray(path)) throw new Error('path must be an array');

  let properties = 0;
  for (let i = path.length - 1; i >= 0; i--) {
    if (path[i] !== 'properties') break;
    properties++;
  }
  return properties;
};
test = simpleTester('starting_at_end_of_array_number_of_elements_that_are_the_string_properties');
test(0, ['a', 'b', 'c']);
test(1, ['a', 'b', 'c', 'properties']);
test(2, ['a', 'b', 'c', 'properties', 'properties']);
test(0, ['a', 'b', 'c', 'properties', 'properties', 'd']);
test(0, ['properties', 'properties', 'properties', 'x']);
test(1, ['properties', 'properties', 'properties', 'x', 'properties']);

const has_odd_number_of_properties_at_the_end = path =>
  starting_at_end_of_array_number_of_elements_that_are_the_string_properties(path) % 2 === 1;
const is_a_properties_object = has_odd_number_of_properties_at_the_end;
test = simpleTester('is_a_properties_object');
test(false, ['a', 'b', 'c']);
test(true, ['a', 'b', 'c', 'properties']);
test(false, ['a', 'b', 'c', 'properties', 'properties']);
test(false, ['a', 'b', 'c', 'properties', 'properties', 'd']);
test(true, ['properties', 'properties', 'properties']);
test(true, ['properties']);
test(false, []);

const last_element = array => array[array.length - 1];
test = simpleTester('last_element');
test('c', ['a', 'b', 'c']);
test('a', ['a']);
test(undefined, []);

const last_element_of_path_is_an_integer = path => Number.isInteger(last_element(path));
test = simpleTester('last_element_of_path_is_an_integer');
test(false, ['a', 'b', 'c']);
test(true, [9]);
test(false, [9.9]);
test(false, []);

const has_penultimate_element = array => array.length > 1;
test = simpleTester('has_penultimate_element');
test(true, ['a', 'b', 'c']);
test(false, [9]);
test(true, [1, 2]);
test(false, []);

const penultimate_element = array => array[array.length - 2];
test = simpleTester('penultimate_element');
test('b', ['a', 'b', 'c']);
test(undefined, [9]);
test(1, [1, 2]);
test(undefined, []);

const penultimate_element_is_either_allOf_anyOf_or_oneOf = path =>
  has_penultimate_element(path) &&
  ['allOf', 'anyOf', 'oneOf'].includes(penultimate_element(path)) &&
  penultimate_element(path);
test = simpleTester('penultimate_element_is_either_allOf_anyOf_or_oneOf');
test(false, ['a', 'b', 'oneOf']);
test(false, ['ofOf', 0]);
test('anyOf', ['anyOf', 'x']);
test(false, [1, 2]);
test(false, []);
test(false, ['not', 'hi']);

const inside_an_allOf_anyOf_or_oneOf = path =>
  last_element_of_path_is_an_integer(path) && penultimate_element_is_either_allOf_anyOf_or_oneOf(path);
test = simpleTester('inside_an_allOf_anyOf_or_oneOf');
test(false, ['a', 'b', 'oneOf']);
test(false, ['ofOf', 0]);
test(false, ['anyOf', 'x']);
test(false, ['not', 0]);
test(false, [1, 2]);
test(false, []);
test(false, ['not']);
test('allOf', ['allOf', 9]);

const is_not = path => last_element(path) === 'not' && 'not';
test = simpleTester('is_not');
test(false, ['a', 'b', 'c']);
test('not', ['a', 'b', 'not']);
test('not', ['not']);
test(false, []);

const inside_an_allOf_anyOf_oneOf_or_not = path => inside_an_allOf_anyOf_or_oneOf(path) || is_not(path);
test = simpleTester('inside_an_allOf_anyOf_oneOf_or_not');
test(false, ['a', 'b', 'oneOf']);
test(false, ['ofOf', 0]);
test(false, ['anyOf', 'x']);
test(false, [1, 2]);
test(false, []);
test('not', ['not']);
test('allOf', ['allOf', 9]);
test(false, ['not', 9]);

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

test = simpleTester('a_sibling_has_at_least_one_of_the_following_properties');
test([1], ['type', 'const', '$ref', 'enum'], [{ x: 1 }, { type: 2 }], [1]);
{
  const obj = {
    a: 1,
    b: 2,
    c: {
      d: [{ e: 1 }, { oneOf: 2 }, { f: 3 }],
    },
  };
  const properties_we_are_looking_for = ['type', '$ref', 'enum', 'const', 'allOf', 'anyOf', 'oneOf', 'not'];
  const path_to_element_that_has_a_property_we_are_looking_for = ['c', 'd', 1];
  test(path_to_element_that_has_a_property_we_are_looking_for, properties_we_are_looking_for, obj, ['c', 'd', 0]);
  test(
    path_to_element_that_has_a_property_we_are_looking_for,
    properties_we_are_looking_for,
    obj,
    path_to_element_that_has_a_property_we_are_looking_for,
  );
}

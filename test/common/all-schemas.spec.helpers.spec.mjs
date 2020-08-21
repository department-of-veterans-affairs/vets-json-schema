import {
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
} from './all-schemas.spec.helpers.mjs';

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

test = simpleTester('is_definitions_path');
test(true, ['a', 'definitions']);
test(false, []);
test(false, ['definitions']);

test = simpleTester('object_has_at_least_one_of_the_following_properties');
test(undefined, ['type'], {});
test('not', ['type', '$ref', 'enum', 'const', 'allOf', 'anyOf', 'oneOf', 'not'], { not: 0 });

test = simpleTester('starting_at_end_of_array_number_of_elements_that_are_the_string_properties');
test(0, ['a', 'b', 'c']);
test(1, ['a', 'b', 'c', 'properties']);
test(2, ['a', 'b', 'c', 'properties', 'properties']);
test(0, ['a', 'b', 'c', 'properties', 'properties', 'd']);
test(0, ['properties', 'properties', 'properties', 'x']);
test(1, ['properties', 'properties', 'properties', 'x', 'properties']);

test = simpleTester('is_a_properties_object');
test(false, ['a', 'b', 'c']);
test(true, ['a', 'b', 'c', 'properties']);
test(false, ['a', 'b', 'c', 'properties', 'properties']);
test(false, ['a', 'b', 'c', 'properties', 'properties', 'd']);
test(true, ['properties', 'properties', 'properties']);
test(true, ['properties']);
test(false, []);

test = simpleTester('last_element');
test('c', ['a', 'b', 'c']);
test('a', ['a']);
test(undefined, []);

test = simpleTester('last_element_is_an_integer');
test(false, ['a', 'b', 'c']);
test(true, [9]);
test(false, [9.9]);
test(false, []);

test = simpleTester('has_penultimate_element');
test(true, ['a', 'b', 'c']);
test(false, [9]);
test(true, [1, 2]);
test(false, []);

test = simpleTester('penultimate_element');
test('b', ['a', 'b', 'c']);
test(undefined, [9]);
test(1, [1, 2]);
test(undefined, []);

test = simpleTester('inside_an_allOf');
test(false, ['a', 'b', 'oneOf']);
test(false, ['ofOf', 0]);
test(false, ['anyOf', 'x']);
test(false, [1, 2]);
test(false, []);
test(false, ['not']);
test(true, ['allOf', 9]);
test(false, ['not', 9]);

test = simpleTester('inside_an_anyOf');
test(false, ['a', 'b', 'oneOf']);
test(false, ['ofOf', 0]);
test(false, ['anyOf', 'x']);
test(false, [1, 2]);
test(false, []);
test(false, ['not']);
test(true, ['anyOf', 0]);
test(false, ['not', 9]);

test = simpleTester('inside_a_oneOf');
test(false, ['a', 'b', 'oneOf']);
test(false, ['ofOf', 0]);
test(false, ['oneOf', 'x']);
test(false, [1, 2]);
test(false, []);
test(false, ['not']);
test(true, ['oneOf', 10]);
test(false, ['not', 9]);

test = simpleTester('inside_a_not');
test(false, ['a', 'b', 'c']);
test(true, ['a', 'b', 'not']);
test(true, ['not']);
test(false, []);

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

// an object should have a type (or $ref/const/enum) (there are a few exceptions (which are handled))
// NOTE: this returns null when there is no problem or a string error message when there is
test = simpleTester('object_error');

let json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "definitions": {
    "person": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "dateOfBirth": {
          "type": "string",
          "format": "date"
        }
      },
      "additionalProperties": false
    }
  },
  "properties": {
    "person": {
      "$ref": "#/definitions/person"
    }
  },
  "additionalProperties": false
}
`);
test(null, json, ['properties']);
json.definitions.person.properties.name = {};
test(
  'should object (or its parent) have type/$ref/enum/const?' +
    ' (path: ["definitions","person","properties","name"] object: {})',
  json,
  ['definitions', 'person', 'properties', 'name'],
);

json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "allOf": [
    { "maxLength": 10 },
    { "minLength": 2 }
  ]
}
`);
test('allOf needs a type/$ref/const/enum somewhere', json, ['allOf', 1]);

json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "string",
  "allOf": [
    { "maxLength": 10 },
    { "minLength": 2 }
  ]
}
`);
test(null, json, ['allOf', 1]);

json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "allOf": [
    { "maxLength": 10, "type": "string" },
    { "minLength": 2 }
  ]
}
`);
test(null, json, ['allOf', 1]);

json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "allOf": [
    { "maxLength": 10 },
    { "minLength": 2 },
    { "type": "string" }
  ]
}
`);
test(null, json, ['allOf', 0]);

json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "string",
  "oneOf": [
    { "maxLength": 10 },
    { "minLength": 2 }
  ]
}
`);
test(null, json, ['oneOf', 0]);

json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "oneOf": [
    { "maxLength": 10, "type": "string" },
    { "minLength": 2 }
  ]
}
`);
test('anyOf/oneOf needs a single type/$ref/const/enum outside the array or each member of the array needs one', json, [
  'oneOf',
  1,
]);

json = JSON.parse(`
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "oneOf": [
    { "maxLength": 10, "type": "string" },
    { "const": 44 }
  ]
}
`);
test(null, json, ['oneOf', 0]);

test = simpleTester('is_object');
test(true, {});
test(true, []);
test(false, 'cat');
test(false, undefined);
test(false, 0);
test(false, 1);
test(false, null);

var fs = require('fs');
var codingInflector = require('coding-inflector');

var schemas = {
  definitions: require('./definitions.json')
};

fs.readdirSync('src/schemas').forEach((schema) => {
  schemas[codingInflector.camelize(schema)] = require('./' + schema + '-schema.json');
});

module.exports = schemas;

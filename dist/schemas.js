var fs = require('fs');
var codingInflector = require('coding-inflector');

var schemas = {};

fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName === 'schemas.js') return;

  schemas[codingInflector.camelize(fileName.replace('.json', '').replace('-schema', ''))] = require('./' + fileName);
});

module.exports = schemas;

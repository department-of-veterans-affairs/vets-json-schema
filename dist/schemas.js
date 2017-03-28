var fs = require('fs');

var schemas = {};

fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName === 'schemas.js') return;

  schemas[fileName.replace('.json', '').replace('-schema', '')] = require('./' + fileName);
});

module.exports = schemas;

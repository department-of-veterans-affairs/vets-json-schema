var fs = require('fs');

var schemas = {};

fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName === 'schemas.js') return;

  if (fileName === 'versions') return;

  schemas[fileName.replace('.json', '').replace('-schema', '')] = require('./' + fileName);
});

var versions = {};
fs.readdirSync(`${__dirname}/versions`).forEach((version) => {
  versions[version] = [];
  fs.readdirSync(`${__dirname}/versions/${version}`).forEach((fileName) => {
  if (fileName === 'schemas.js') return;

    versions[version][fileName.replace('.json', '').replace('-schema', '')] = require('./' + fileName);
  });
});

schemas.versions = versions;

module.exports = schemas;

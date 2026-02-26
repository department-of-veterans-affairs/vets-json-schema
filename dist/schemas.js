var fs = require('fs');

var schemas = {};

fs.readdirSync(__dirname).forEach((fileName) => {
  if (fileName === 'schemas.js') return;

  // The Fully Digital Forms initiative is temporarily hosting a non-schema JSON file here.
  // It will be removed after an initial March 2026 pilot.
  // See department-of-veterans-affairs/va.gov-team#117360 or join DSVA #benefits-fullydigitalforms
  if (fileName.endsWith('-template.json')) return;

  schemas[fileName.replace('.json', '').replace('-schema', '')] = require('./' + fileName);
});

module.exports = schemas;

import jsonfile from 'jsonfile';

['edu-benefits', 'healthcare-application', 'change-of-program'].forEach((schema) => {
  jsonfile.writeFileSync(`dist/${schema}-schema.json`, require(`./${schema}/schema`).default, { spaces: 2 });
});

console.log('json built');

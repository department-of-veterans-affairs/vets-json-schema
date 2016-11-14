import jsonfile from 'jsonfile';

['edu-benefits', 'healthcare-application'].forEach((schema) => {
  jsonfile.writeFileSync(`dist/${schema}-schema.json`, require(`./${schema}/schema`), { spaces: 2 });
});

console.log('json built');

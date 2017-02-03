import jsonfile from 'jsonfile';
import definitions from './common/definitions';

['edu-benefits', 'healthcare-application', 'change-of-program'].forEach((schema) => {
  jsonfile.writeFileSync(`dist/${schema}-schema.json`, require(`./${schema}/schema`).default, { spaces: 2 });
});

jsonfile.writeFileSync('dist/definitions.json', definitions, { spaces: 2 });

console.log('json built');

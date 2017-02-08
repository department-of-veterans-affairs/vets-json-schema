import jsonfile from 'jsonfile';
import definitions from './common/definitions';
import fs from 'fs';

fs.readdir('src/schemas', (err, files) => {
  if (err) throw err;

  files.forEach((schema) => {
    jsonfile.writeFileSync(`dist/${schema}-schema.json`, require(`./schemas/${schema}/schema`).default, { spaces: 2 });
  });

  jsonfile.writeFileSync('dist/definitions.json', definitions, { spaces: 2 });

  console.log('json built');
});

import jsonfile from 'jsonfile';
import definitions from './common/definitions';
import constants from './common/constants';
import vaMedicalFacilities from './common/va-medical-facilities';
import fs from 'fs';

const files = { definitions, constants, vaMedicalFacilities };

fs.readdirSync('src/schemas').forEach((schema) => {
  jsonfile.writeFileSync(`dist/${schema.toUpperCase()}-schema.json`, require(`./schemas/${schema}/schema`).default, { spaces: 2 });
});

for (let file in files) {
  jsonfile.writeFileSync(`dist/${file}.json`, files[file], { spaces: 2 });
}

console.log('json built');

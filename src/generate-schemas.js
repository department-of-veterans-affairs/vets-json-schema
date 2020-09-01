import jsonfile from 'jsonfile';
import fs from 'fs';
import definitions from './common/definitions';
import constants from './common/constants';
import vaMedicalFacilities from './common/va-medical-facilities';
import caregiverProgramFacilities from './common/caregiver-program-facilities';

const files = { definitions, constants, vaMedicalFacilities, caregiverProgramFacilities };

fs.readdirSync('src/schemas').forEach(schema => {
  jsonfile.writeFileSync(`dist/${schema.toUpperCase()}-schema.json`, require(`./schemas/${schema}/schema`).default, {
    spaces: 2,
  });
});

fs.readdirSync('src/examples').forEach(schema => {
  jsonfile.writeFileSync(`dist/${schema.toUpperCase()}-example.json`, require(`./examples/${schema}/example`).default, {
    spaces: 2,
  });
});

// eslint-disable-next-line guard-for-in,no-restricted-syntax
for (const file in files) {
  jsonfile.writeFileSync(`dist/${file}.json`, files[file], { spaces: 2 });
}

// eslint-disable-next-line no-console
console.info('json built');

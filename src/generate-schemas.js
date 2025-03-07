import jsonfile from 'jsonfile';
import fs from 'fs';
import path from 'path';
import definitions from './common/definitions';
import constants from './common/constants';
import vaMedicalFacilities from './common/va-medical-facilities';
import caregiverProgramFacilities from './common/caregiver-program-facilities';
import form1010cgCertifications from './common/form-10-10cg-certifications';
import { dist_examples as distExamples } from './examples';
import distVersions from './versions';

const files = { definitions, constants, vaMedicalFacilities, caregiverProgramFacilities, form1010cgCertifications };

fs.readdirSync('src/schemas').forEach(schema => {
  if (schema !== '.DS_Store') {
    // write default schemafile
    jsonfile.writeFileSync(`dist/${schema.toUpperCase()}-schema.json`, require(`./schemas/${schema}/schema`).default, {
      spaces: 2,
    });

    // write default examples
    const examples = distExamples(path.resolve(__dirname, '..'), schema);
    Object.keys(examples).forEach(key => {
      jsonfile.writeFileSync(`dist/${key}`, examples[key], { spaces: 2 });
    });
  }
});

distVersions();

// eslint-disable-next-line guard-for-in,no-restricted-syntax
for (const file in files) {
  jsonfile.writeFileSync(`dist/${file}.json`, files[file], { spaces: 2 });
}

// eslint-disable-next-line no-console
console.info('json built');

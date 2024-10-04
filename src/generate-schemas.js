import jsonfile from 'jsonfile';
import fs from 'fs';
import path from 'path';
import { version } from '../package.json';
import definitions from './common/definitions';
import constants from './common/constants';
import vaMedicalFacilities from './common/va-medical-facilities';
import caregiverProgramFacilities from './common/caregiver-program-facilities';
import form1010cgCertifications from './common/form-10-10cg-certifications';
import { dist_examples as distExamples } from './examples';

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

fs.mkdir(`dist/${version}/`, err => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.log('Version folder already exists. Did you update the version number in package.json?');
    } else {
      throw new Error('Error creating version folder:', err);
    }
  } else {
    fs.readdirSync('src/schemas').forEach(schema => {
      if (schema !== '.DS_Store') {
        // store schemafile under version
        jsonfile.writeFileSync(
          `dist/${version}/${schema.toUpperCase()}-schema.json`,
          require(`./schemas/${schema}/schema`).default,
        );
        // store examples under version
        const examples = distExamples(path.resolve(__dirname, '..'), schema);
        Object.keys(examples).forEach(key => {
          jsonfile.writeFileSync(`dist/${version}/${key}`, examples[key]);
        });
      }
    });
  }
});

// eslint-disable-next-line guard-for-in,no-restricted-syntax
for (const file in files) {
  jsonfile.writeFileSync(`dist/${file}.json`, files[file], { spaces: 2 });
}

console.info('json built');

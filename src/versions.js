import fs from 'fs';
import jsonfile from 'jsonfile';
import path from 'path';
import { version } from '../package.json';
import { dist_examples as distExamples } from './examples';

const versionsRoot = 'dist/versions';

const versionDir = currentVersion => `${versionsRoot}/${currentVersion}/`;

const addExamplesAndSchemaToCurrentVersion = () => {
  fs.readdirSync('src/schemas').forEach(schema => {
    if (schema !== '.DS_Store') {
      // store schemafile under version
      jsonfile.writeFileSync(
        `${versionDir(version)}${schema.toUpperCase()}-schema.json`,
        require(`./schemas/${schema}/schema`).default,
      );
      // store examples under version
      const examples = distExamples(path.resolve(__dirname, '..'), schema);
      Object.keys(examples).forEach(key => {
        jsonfile.writeFileSync(`${versionDir(version)}${key}`, examples[key]);
      });
    }
  });
};

const storeCurrentVersion = () => {
  if (!fs.existsSync(versionDir(version))) {
    fs.mkdir(versionDir(version), err => {
      if (err) {
        throw new Error('Error creating version folder:', err);
      } else {
        addExamplesAndSchemaToCurrentVersion();
      }
    });
  } else {
    console.log(`Overwriting current stored version: ${version}`);
    addExamplesAndSchemaToCurrentVersion();
  }
};

export default () => {
  if (!fs.existsSync(versionsRoot)) {
    fs.mkdirSync(versionsRoot, err => {
      if (err) {
        throw new Error('Error creating version folder:', err);
      } else {
        storeCurrentVersion();
      }
    });
  } else {
    storeCurrentVersion();
  }
};

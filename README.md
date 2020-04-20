# vets-json-schema [![Build Status](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema.svg?branch=master)](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema)

## Development

### Enviornment
node v6.11.1

### I want to...

| I want to... | Then you should... |
| ------------ | ------------------ |
| clone the site | `git clone https://github.com/department-of-veterans-affairs/vets-json-schema.git` followed by `cd vets-json-schema`, `npm install`. Run `npm install` anytime `package.json` changes. |
| build the json schemas and examples | `npm run build` |
| watch for changes and rebuild when they happen | `npm run watch` |
| run tests on the built schemas | `npm run test` |

### Updating Version
- Update the "version" property in `package.json` with the new version. Please follow [semver](https://semver.org/#summary) practices.
- Run `npm update` or `yarn update` to update `package-lock.json`.
- Commit the changes to `package.json` and `package-lock.json`

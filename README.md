# vets-json-schema [![Build Status](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema.svg?branch=master)](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema)

## Development

### Environment
node v6.11.1

### I want to...

| I want to... | Then you should... |
| ------------ | ------------------ |
| clone the site | `git clone https://github.com/department-of-veterans-affairs/vets-json-schema.git` followed by `cd vets-json-schema`, `npm install`. Run `npm install` anytime `package.json` changes. |
| build the json schemas and examples | `npm run build` |
| watch for changes and rebuild when they happen | `npm run watch` |
| run tests on the built schemas | `npm run test` |
| create a new schema | https://github.com/department-of-veterans-affairs/va.gov-team/blob/master/platform/engineering/frontend/vets-website/creating-form-schema.md |

### Updating Version
- Update the "version" property in `package.json` with the new version. Please follow [Semantic Versioning](https://semver.org/#summary) practices.
  - If implementing a major version update, add a link in your vets-json-schema PR that references the vets-api, or vets-website, PR that addresses the breaking changes.
  - Breaking changes include:
    - Removing a property from a schema
    - Adding a property to a schema that has `additionalProperties` set to false
    - Making a property required that was not previously required on that schema
    - Changing the `type` on a schema's property
    - Removing values in the `enum` key of a schema's property
    - ect.
- Run `npm update` update `package-lock.json`.
- Commit the changes to `package.json` and `package-lock.json`
- After changes to `vets-json-schema` have been merged into master:
    + update `vets-website` to point to the latest `vets-json-schema` version by running `yarn update:schema` and making a PR
    + update `vets-api` by running `bundle update vets_json_schema` and making a PR.  _Caution: verify that you changes are only related to vets_json_schema version. If you see sidekiq changes, follow [these instructions](https://github.com/department-of-veterans-affairs/va.gov-team-sensitive/blob/master/platform/engineering/sidekiq-enterprise-setup.md)_

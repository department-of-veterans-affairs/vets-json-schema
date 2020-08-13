# vets-json-schema [![Build Status](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema.svg?branch=master)](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema)

## Purpose

Forms on VA.gov use JSON schema to define a common contract for data validation between the front and back ends. This is where those schemas are kept.

## Development

### Workflow

1. Clone the repo
1. Make a branch for your changes
1. Make the changes needed for your form
1. Update the version number in `package.json`
1. Submit a PR
1. Once that PR is merged
   1. Create a PR in `vets-website` to update the `vets-json-schema` dependency
      - This can be done with `yarn update:schema`
   1. If adding or removing a form, update [forms tests](https://github.com/department-of-veterans-affairs/vets-website/blob/master/src/platform/forms/tests/forms.unit.spec.js) in `vets-website`
   1. Create a PR in `vets-api` to update the dependency

### Environment

node v6.11.1

### I want to...

| I want to...                                   | Then you should...                                                                                                                                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clone the repo                                 | `git clone https://github.com/department-of-veterans-affairs/vets-json-schema.git` followed by `cd vets-json-schema`, `npm install`. Run `npm install` any time `package.json` changes. |
| build the json schemas and examples            | `npm run build`                                                                                                                                                                         |
| watch for changes and rebuild when they happen | `npm run watch`                                                                                                                                                                         |
| run tests on the built schemas                 | `npm run test`                                                                                                                                                                          |
| create a new schema                            | https://github.com/department-of-veterans-affairs/va.gov-team/blob/master/platform/engineering/frontend/vets-website/creating-form-schema.md                                            |

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
  - update `vets-website` to point to the latest `vets-json-schema` version by running `yarn update:schema` and making a PR
  - update `vets-api` by running `bundle update vets_json_schema` and making a PR. _Caution: verify that you changes are only related to vets_json_schema version. If you see sidekiq changes, follow [these instructions](https://github.com/department-of-veterans-affairs/va.gov-team-sensitive/blob/master/platform/engineering/sidekiq-enterprise-setup.md)_

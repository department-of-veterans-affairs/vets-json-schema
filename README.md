# vets-json-schema [![Build Status](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema.svg?branch=master)](https://travis-ci.org/department-of-veterans-affairs/vets-json-schema)

## Purpose

Forms on VA.gov use JSON schema to define a common contract for data validation between the front and back ends. This is where those schemas are kept.

## Development

### Workflow

1. Clone the `vets-json-schema` repository
2. Create a new branch for your changes
3. Make any required changes needed for your form schema
4. Update the version number in this repo's `package.json`
   1. Ensure that you run `yarn build` to generate the `dist/` directory where your form schema will be pulled from
   2. Commit your changes to your branch
5. Submit a Pull Request in `vets-json-schema`
6. Once that PR is merged into `vets-json-schema` at `master`

   1. In `vets-website` to update the `vets-json-schema` dependency do the following:

      1. Create a new branch
      2. Find the latest commit hash for `vets-json-schema#master` ([see all commits](https://github.com/department-of-veterans-affairs/vets-json-schema/commits/master))
      3. Run `yarn remove vets-json-schema`
      4. Run `yarn add https://github.com/department-of-veterans-affairs/vets-json-schema.git\#<commit-hash>`
      5. Run `yarn update:schema`
      6. Create a Pull Request

   2. In `vets-api` to update the `vets-json-schema` dependency do the following:
      1. Create a new branch
      2. Run `bundle update vets_json_schema`

> If adding or removing a form, update [forms tests](https://github.com/department-of-veterans-affairs/vets-website/blob/master/src/platform/forms/tests/forms.unit.spec.js) in `vets-website`

### Environment

node v8.10.0

### I want to...

| I want to...                                   | Then you should...                                                                                                                                                                        |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clone the repo                                 | `git clone https://github.com/department-of-veterans-affairs/vets-json-schema.git` followed by `cd vets-json-schema`, `yarn install`. Run `yarn install` any time `package.json` changes. |
| build the json schemas and examples            | `yarn run build`                                                                                                                                                                          |
| watch for changes and rebuild when they happen | `yarn run watch`                                                                                                                                                                          |
| run tests on the built schemas                 | `yarn run test`                                                                                                                                                                           |
| create a new schema                            | https://github.com/department-of-veterans-affairs/va.gov-team/blob/master/platform/engineering/frontend/vets-website/creating-form-schema.md                                              |

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
- Run `yarn update`.
- Commit the changes to `package.json` and `yarn.lock`
- After changes to `vets-json-schema` have been merged into master:
  - update `vets-website` to point to the latest `vets-json-schema` version by running `yarn update:schema` and making a PR
  - update `vets-api` by running `bundle update vets_json_schema` and making a PR. _Caution: verify that you changes are only related to vets_json_schema version. If you see sidekiq changes, follow [these instructions](https://github.com/department-of-veterans-affairs/va.gov-team-sensitive/blob/master/platform/engineering/sidekiq-enterprise-setup.md)_

## Not a member of the repository and want to be added?
- If you're on a VA.gov Platform team, contact your Program Manager.
- If you're on a VFS team, you must complete [Platform Orientation](https://depo-platform-documentation.scrollhelp.site/getting-started/platform-orientation) to be added to this repository. This includes completing your Platform Orientation ticket(s) in GitHub.

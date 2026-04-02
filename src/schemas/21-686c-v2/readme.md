**# Overview**

This schema is meant to used in two places.

1. Fully Digital Forms
2. Vets-API

Currently, the Dependents form is storing the schema [locally on vets-api](https://github.com/department-of-veterans-affairs/vets-api/tree/master/modules/dependents_benefits/schema), but with the shared usage between Fully Digital Forms and Vets-API, we need to change that.

To add to the confusion, [this schema](src/schemas/686c-674-v2/schema.js) is what is currently (4/2/26) used on the Dependents form since we haven't enabled the modularization work.

import { danger, fail } from "danger";
import * as fs from "fs"
import * as semver from "semver"

const git = danger.git;
const modifiedFiles = git.modified_files;
const touchedFiles = modifiedFiles.concat(git.created_files).concat(git.deleted_files);

const packageFile = "package.json";
// startsWith("package") to exclude package*.json:
const jsonOnly = file => { return !file.startsWith("package") && file.includes(".json") };
const touchedJSONFiles = touchedFiles.filter(jsonOnly);
const schemaSourcesOnly = file => { return file.includes("src/schemas/") };
const touchedSchemaSources = touchedFiles.filter(schemaSourcesOnly);
const schemaChanges = touchedJSONFiles.concat(touchedSchemaSources);

git.JSONDiffForFile(packageFile).then(diff => {
  let message = "";

  // if there is a version change, check that it increments
  if (diff.version && !semver.gt(diff.version.after, diff.version.before)) {
    message = "Version appears to be decremented.";
  }

  // if there are schema changes, check for version change
  if (!diff.version && schemaChanges.length > 0) {
    message = `Schema changes were detected in the following files: ${schemaChanges.toString()}.`;
  }

  // add semver message, filename, and line number to the failure
  if (message != "") {
    const packageFileLines = fs.readFileSync(packageFile).toString().split("\n");
    const includesVersion = (line) => line.includes('"version":');
    const lineNumber = packageFileLines.findIndex(includesVersion);

    message = message.concat(" Please increment the package version, according to [Semver](https://semver.org/) guidelines.");
    fail(message, packageFile, lineNumber);
  }
});

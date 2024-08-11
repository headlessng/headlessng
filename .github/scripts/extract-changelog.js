const { resolve } = require('path');
const { readFileSync } = require('fs');

// Result example: '@headlessng/primitives-v0.0.0'
const tag = '@headlessng/primitives-v0.0.0';

// Result example: '0.0.0'
const versionFromTag = tag.slice(tag.indexOf('-v') + 2, tag.length);

// Result example: '@headlessng-primitives'
const packageName = tag.slice(0, tag.indexOf('-')).replace('/', '-');

// Result example: '{__dirname}/packages/@headlessng-primitives';
const packagePath = resolve(__dirname, '../..', 'packages', packageName);

// Result example: '{__dirname}/packages/@headlessng-primitives/package.json'
const packageJsonPath = resolve(packagePath, 'package.json');

// The result is the contents of the file package.json
const packageJson = require(packageJsonPath);

// Result example: '0.0.0'
const versionFromPackageJson = packageJson.version;

// Check if the version from the tag matches the version in the package.json file.
if (versionFromTag !== versionFromPackageJson) {
  throw new Error('The package version from the tag does not match the version in the package.json file.');
}

// Result example: '{__dirname}/packages/@headlessng-primitives/CHANGELOG.md'
const changelogPath = resolve(packagePath, 'CHANGELOG.md');

// The result is the contents of the file CHANGELOG.md.
const changelog = readFileSync(changelogPath, 'utf-8');

// Check if the changelog contains sections for the selected package version.
const startRegex = new RegExp(`## \\[${versionFromPackageJson}\\] - (\\d{4}-\\d{2}-\\d{2})`);
const startMatch = changelog.match(startRegex);
if (!startMatch) {
  throw new Error('No section found in the changelog that matches the selected package version.')
}

// Cut out everything before the heading for your chosen version including the heading.
const startSlice = changelog.slice(startMatch.index + startMatch[0].length);

// Check if the changelog contains a section about the previous version of the package.
const endRegex = new RegExp('## \\[\\d\.\\d\.\\d\\] - (\\d{4}-\\d{2}-\\d{2})');
const endMatch = startSlice.match(endRegex);

// If there is a section with a previous version of the package, cut everything after it including the header.
const result = (endMatch ? startSlice.slice(0, endMatch.index) : startSlice).trim();

console.log(result);

"use strict";

const path = require("node:path");

const eslintPackageJsonPath = require.resolve("eslint/package.json");
const eslintPackageDir = path.dirname(eslintPackageJsonPath);

const createOptions = require(path.join(eslintPackageDir, "lib/options.js"));

module.exports = createOptions(false);

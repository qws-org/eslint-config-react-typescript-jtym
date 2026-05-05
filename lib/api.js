"use strict";

const path = require("node:path");

const eslintPackageJsonPath = require.resolve("eslint/package.json");
const eslintPackageDir = path.dirname(eslintPackageJsonPath);

module.exports = require(path.join(eslintPackageDir, "lib/cli-engine/index.js"));

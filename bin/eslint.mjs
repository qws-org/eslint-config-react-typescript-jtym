#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const packageJsonPath = require.resolve('eslint/package.json');
const cliPath = join(dirname(packageJsonPath), 'bin', 'eslint.js');
const result = spawnSync(process.execPath, [cliPath, ...process.argv.slice(2)], {
    stdio: 'inherit',
});

if (result.signal) {
    process.kill(process.pid, result.signal);
}

process.exit(result.status ?? 1);

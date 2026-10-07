// Usage: node scripts/build-redirect-stub.mjs --mode interim|final --out <dir>
import { mkdirSync, rmSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { buildStub, loadConfig } from './lib/redirects.mjs';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};

const mode = opt('mode');
const out = opt('out');
if (!mode || !out) {
  console.error('Usage: node scripts/build-redirect-stub.mjs --mode interim|final --out <dir>');
  process.exit(2);
}

let files;
try {
  files = buildStub(loadConfig(), mode); // build first so a failure never touches the output dir
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const outDir = resolve(out);
// Refuse to wipe anything that is not an earlier stub (or empty).
if (existsSync(outDir)) {
  const entries = readdirSync(outDir).filter((n) => n !== '.git');
  const isStub = entries.length === 0 || entries.includes('404.html');
  if (!isStub) {
    console.error(`Refusing to write into ${outDir}: it is not empty and does not look like a stub.`);
    process.exit(1);
  }
  for (const name of entries) rmSync(join(outDir, name), { recursive: true, force: true });
}

for (const [rel, content] of files) {
  const target = join(outDir, rel);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
}
console.log(`Wrote ${files.size} files (${mode} mode) to ${outDir}`);

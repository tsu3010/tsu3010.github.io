// Run after `astro build`: every old path must resolve to a real page in dist/.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadConfig, onSitePath } from './lib/redirects.mjs';

const config = loadConfig();
const dist = 'dist';
const errors = [];

const pageFile = (path) => join(dist, path, 'index.html');

for (const r of config.redirects) {
  const landing = onSitePath(r, config);

  if (!existsSync(pageFile(landing))) {
    errors.push(`${r.from}: landing page ${landing} is missing from dist/`);
    continue;
  }

  if (r.live && r.fragment) {
    const html = readFileSync(pageFile(landing), 'utf8');
    if (!new RegExp(`id=["']${r.fragment}["']`).test(html)) {
      errors.push(`${r.from}: ${landing} has no element with id="${r.fragment}"`);
    }
  }

  if (r.from !== landing) {
    // The old path must exist on this domain as a redirect page.
    if (!existsSync(pageFile(r.from))) {
      errors.push(`${r.from}: no redirect page in dist/`);
    } else {
      const html = readFileSync(pageFile(r.from), 'utf8');
      const expected = r.live && r.fragment ? `${landing}#${r.fragment}` : landing;
      if (!html.includes(`url=${expected}`) && !html.includes(`url=${config.site}${expected}`)) {
        errors.push(`${r.from}: redirect page does not point at ${expected}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`check-redirects: ${errors.length} problem(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`check-redirects: ok (${config.redirects.length} entries)`);

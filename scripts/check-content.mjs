// Rules the schema can't express. Schema validation itself runs in `astro check` / `astro build`.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const REQUIRED = ['Problem', 'Approach', 'Result', 'Reflection'];
const MAX_FEATURED = 4;
const errors = [];

function mdxFiles(dir) {
  try {
    return readdirSync(dir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_'));
  } catch {
    return [];
  }
}

function split(source) {
  const m = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { front: m[1], body: m[2] } : { front: '', body: source };
}

const isDraft = (front) => /^draft:\s*true\s*$/m.test(front);
const isFeatured = (front) => /^featured:\s*true\s*$/m.test(front);

let featured = 0;
let checked = 0;

for (const collection of ['projects', 'writing']) {
  const dir = join('src', 'content', collection);
  for (const file of mdxFiles(dir)) {
    const path = join(dir, file);
    const { front, body } = split(readFileSync(path, 'utf8'));
    const draft = isDraft(front);
    checked += 1;

    if (!draft && /\bTODO\b/.test(front + body)) {
      errors.push(`${path}: contains TODO but is not a draft`);
    }

    if (collection === 'projects') {
      const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
      const sections = headings.filter((h) => REQUIRED.includes(h));
      if (sections.join('|') !== REQUIRED.join('|')) {
        errors.push(`${path}: needs "## ${REQUIRED.join('", "## ')}" in that order (found: ${sections.join(', ') || 'none'})`);
      }
      if (!draft && isFeatured(front)) featured += 1;
    }
  }
}

if (featured > MAX_FEATURED) {
  errors.push(`${featured} published projects are featured; the home page shows at most ${MAX_FEATURED}`);
}

if (errors.length) {
  console.error(`check-content: ${errors.length} problem(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`check-content: ok (${checked} files)`);

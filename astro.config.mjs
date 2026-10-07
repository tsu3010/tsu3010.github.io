import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadConfig, onSitePath } from './scripts/lib/redirects.mjs';

const legacy = loadConfig();

// Old paths that still resolve on this domain (the Jekyll URLs). Entries whose
// target page isn't live yet land on the fallback instead of a 404.
const redirects = {};
for (const r of legacy.redirects) {
  const destination = onSitePath(r, legacy);
  if (r.from === destination) continue;
  redirects[r.from] = r.live && r.fragment ? `${destination}#${r.fragment}` : destination;
}

export default defineConfig({
  site: legacy.site,
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  redirects,
});

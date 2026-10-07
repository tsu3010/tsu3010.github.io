// Generates the stub in memory and asserts its structure. No dependencies.
import assert from 'node:assert/strict';
import { buildStub, loadConfig, stubTarget } from './lib/redirects.mjs';

const config = loadConfig();

for (const mode of ['interim', 'final']) {
  const pending = config.redirects.filter((r) => !r.live);
  if (mode === 'final' && pending.length) {
    assert.throws(() => buildStub(config, 'final'), /not live yet/, 'final mode must refuse pending entries');
    continue;
  }
  const files = buildStub(config, mode);

  for (const r of config.redirects) {
    const html = files.get(`${r.from.slice(1)}index.html`);
    assert.ok(html, `${mode}: missing stub for ${r.from}`);
    const target = stubTarget(r, config, mode);
    const canonical = target.split('#')[0];
    assert.ok(html.includes(`<meta http-equiv="refresh" content="0; url=${target}">`), `${mode}: refresh for ${r.from}`);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`), `${mode}: canonical for ${r.from}`);
    assert.ok(!html.includes(`href="${canonical}#`), `${mode}: canonical must not carry a fragment`);
  }

  const notFound = files.get('404.html');
  assert.ok(notFound.includes(config.site), `${mode}: 404.html points at the new site`);
  assert.ok(files.has('.nojekyll'), `${mode}: .nojekyll present`);
}

// Interim stubs always point at the same path on the new site.
const interim = buildStub(config, 'interim');
for (const r of config.redirects) {
  assert.ok(
    interim.get(`${r.from.slice(1)}index.html`).includes(`url=${config.site}${r.from}"`),
    `interim target for ${r.from}`,
  );
}

console.log(`test-redirects: ok (${config.redirects.length} entries, ${config.redirects.filter((r) => r.live).length} live)`);

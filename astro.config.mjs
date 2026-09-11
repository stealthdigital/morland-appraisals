// @ts-check
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://morlandappraisals.org';

/**
 * `lastmod` for a sitemap entry.
 *
 * Prefer live git, which is accurate whenever the full history is present.
 * Vercel builds from a shallow clone where git has nothing to report, so fall
 * back to the snapshot `scripts/generate-lastmod.mjs` commits, and only then to
 * the build time. Without the snapshot every page would claim to change on
 * every deploy, which is worse than no `lastmod` at all.
 */
const buildDate = new Date().toISOString();
const snapshot = JSON.parse(
  readFileSync(fileURLToPath(new URL('./src/data/lastmod.json', import.meta.url)), 'utf8'),
);

const lastmodOf = (url) => {
  const route = url.replace(SITE, '').replace(/\/$/, '') || '/';
  const src = fileURLToPath(
    new URL(`./src/pages${route === '/' ? '/index' : route}.astro`, import.meta.url),
  );
  if (existsSync(src)) {
    try {
      const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', src], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      if (out) return new Date(out).toISOString();
    } catch {
      /* fall through to the snapshot */
    }
  }
  return snapshot[route] ?? buildDate;
};

// Netlify serves these pages without a trailing slash, so canonicals, internal
// links and the sitemap all use the bare `/about-us` form.
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thank-you'),
      serialize: (item) => {
        const url = item.url.replace(/(?<!\/)\/$/, '');
        return { ...item, url, lastmod: lastmodOf(url) };
      },
    }),
  ],
});

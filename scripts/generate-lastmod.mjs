/**
 * Snapshot each page's last commit date into `src/data/lastmod.json`.
 *
 * Vercel builds from a shallow clone, so `git log` there has nothing to report
 * and every page would fall back to the build time, i.e. "everything changed"
 * on every deploy. Running this locally, where the full history exists, commits
 * the real dates so the build can read them back in CI.
 *
 * Runs automatically before `npm run build`. Where git cannot answer it leaves
 * the committed snapshot untouched rather than overwriting it with guesses.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pagesDir = fileURLToPath(new URL('../src/pages/', import.meta.url));
const outFile = fileURLToPath(new URL('../src/data/lastmod.json', import.meta.url));

const commitDate = (file) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out ? new Date(out).toISOString() : null;
  } catch {
    return null;
  }
};

const pages = readdirSync(pagesDir).filter((f) => f.endsWith('.astro'));
const next = {};
for (const file of pages) {
  const date = commitDate(pagesDir + file);
  if (!date) continue;
  const route = file === 'index.astro' ? '/' : `/${file.replace(/\.astro$/, '')}`;
  next[route] = date;
}

if (Object.keys(next).length === 0) {
  console.log('[lastmod] git unavailable, keeping the committed snapshot');
  process.exit(0);
}

const previous = existsSync(outFile) ? readFileSync(outFile, 'utf8') : '';
const serialized = JSON.stringify(next, Object.keys(next).sort(), 2) + '\n';
if (serialized !== previous) {
  writeFileSync(outFile, serialized);
  console.log(`[lastmod] wrote ${Object.keys(next).length} routes`);
} else {
  console.log('[lastmod] unchanged');
}

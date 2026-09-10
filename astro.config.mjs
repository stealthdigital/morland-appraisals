// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Netlify serves these pages without a trailing slash, so canonicals, internal
// links and the sitemap all use the bare `/about-us` form.
export default defineConfig({
  site: 'https://morlandappraisals.org',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      serialize: (item) => ({ ...item, url: item.url.replace(/(?<!\/)\/$/, '') }),
    }),
  ],
});

import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config.mjs';

export default defineConfig({
  site: site.url,
  output: 'static',
  integrations: [
    sanity({
      projectId: site.sanity.projectId,
      dataset: site.sanity.dataset,
      useCdn: false,
      apiVersion: '2026-01-01',
      studioBasePath: '/admin',
    }),
    react(),
    sitemap({ filter: (page) => !page.includes('/admin') }),
  ],
});

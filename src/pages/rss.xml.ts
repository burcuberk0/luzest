import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../lib/sanity';
import { site } from '../config.mjs';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((p) => ({
      title: p.title,
      pubDate: new Date(p.publishedAt),
      description: p.excerpt ?? '',
      link: `/yazi/${p.slug}/`,
    })),
    customData: '<language>tr-TR</language>',
  });
}

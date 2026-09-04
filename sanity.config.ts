import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schema';
import { site, categories } from './src/config.mjs';

export default defineConfig({
  name: 'luzest',
  title: 'Luzest Yönetim Paneli',
  projectId: site.sanity.projectId,
  dataset: site.sanity.dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('İçerik')
          .items([
            S.listItem()
              .title('Tüm Yazılar')
              .child(S.documentTypeList('post').title('Tüm Yazılar').defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])),
            S.divider(),
            ...categories.map((c) =>
              S.listItem()
                .title(c.title)
                .child(
                  S.documentTypeList('post')
                    .title(c.title)
                    .filter('_type == "post" && category == $slug')
                    .params({ slug: c.slug })
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('post-by-category', { category: c.slug })])
                )
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'post-by-category',
        title: 'Kategoriye göre yazı',
        schemaType: 'post',
        parameters: [{ name: 'category', type: 'string' }],
        value: (params: { category: string }) => ({ category: params.category }),
      },
    ],
  },
});

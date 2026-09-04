import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';

export type Post = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  featured?: boolean;
  mainImage?: any;
  body?: any[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source).auto('format');

const postFields = `
  _id, title, "slug": slug.current, category, excerpt, author, publishedAt,
  featured, mainImage, tags, seoTitle, seoDescription
`;

// Sanity'ye ulaşılamazsa site boş listeyle derlenir; yayın hiç durmaz.
async function safeFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (import.meta.env.LUZEST_MOCK) return mock(query, params) as T;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err) {
    console.warn('[luzest] Sanity isteği başarısız, boş içerikle devam ediliyor:', (err as Error).message);
    return fallback;
  }
}

export const getAllPosts = () =>
  safeFetch<Post[]>(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { ${postFields} }`,
    {},
    []
  );

export const getPostsByCategory = (category: string) =>
  safeFetch<Post[]>(
    `*[_type == "post" && category == $category && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) { ${postFields} }`,
    { category },
    []
  );

export const getPost = (slug: string) =>
  safeFetch<Post | null>(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields}, body }`,
    { slug },
    null
  );

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

export const readingTime = (body?: any[]) => {
  if (!body) return 1;
  const words = body
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children ?? [])
    .map((c: any) => c.text ?? '')
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

// Sadece test amaçlı örnek içerik (LUZEST_MOCK=1 ile derlenince kullanılır).
function mock(query: string, params: Record<string, unknown>) {
  const body = [
    { _type: 'block', _key: 'a', style: 'normal', children: [{ _type: 'span', _key: 'a1', text: 'Sonbahar geldiğinde gardırobun dili değişir. Bu sezon kalın örgüler, toprak tonları ve gün boyu taşıyabileceğin katmanlar öne çıkıyor.', marks: [] }] },
    { _type: 'block', _key: 'b', style: 'h2', children: [{ _type: 'span', _key: 'b1', text: 'Katmanlamanın altın kuralı', marks: [] }] },
    { _type: 'block', _key: 'c', style: 'normal', children: [{ _type: 'span', _key: 'c1', text: 'İnce bir bluz, üstüne yelek, en üste ceket. ', marks: [] }, { _type: 'span', _key: 'c2', text: 'Üç parça', marks: ['strong'] }, { _type: 'span', _key: 'c3', text: ' yeter.', marks: [] }] },
    { _type: 'block', _key: 'd', style: 'blockquote', children: [{ _type: 'span', _key: 'd1', text: 'Stil, giydiğin şey değil; giydiğin şeyle nasıl durduğun.', marks: [] }] },
    { _type: 'block', _key: 'e', style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: 'e1', text: 'Bej trençkot', marks: [] }] },
    { _type: 'block', _key: 'f', style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: 'f1', text: 'Bordo botlar', marks: [] }] },
  ];
  const cats = ['moda', 'seyahat', 'ask-iliskiler', 'yemek', 'astroloji', 'yasam'];
  const posts = Array.from({ length: 9 }, (_, i) => ({
    _id: `p${i}`, title: ['Sonbaharın en rahat kombinleri', 'Bir hafta sonu için Ayvalık', 'Uzun mesafe ilişkiler için 5 dürüst not', 'Tek tencerede limonlu tavuk', 'Bu hafta burçlar: Merkür geri gidiyor', 'Sabah rutinini basitleştirmenin yolu', 'Kışlık paltolar rehberi', 'Kapadokya balon sabahı', 'Sofrada beş dakikalık meze'][i],
    slug: `ornek-yazi-${i}`, category: cats[i % 6], excerpt: 'Kısa özet metni burada görünür; bir iki cümlelik, merak uyandıran bir giriş.',
    author: 'Burcu', publishedAt: new Date(2026, 8, 1 - i).toISOString(), featured: i === 0, tags: ['sonbahar', 'stil'], body,
  }));
  if (query.includes('slug.current == $slug')) return posts.find((p) => p.slug === params.slug) ?? null;
  if (query.includes('category == $category')) return posts.filter((p) => p.category === params.category);
  return posts;
}

// Sitenin temel ayarları. Buradaki değerleri değiştirip GitHub'a kaydetmen yeterli.
export const site = {
  name: 'Luzest',
  url: 'https://luzest.com',
  tagline: 'Moda, seyahat, aşk, yemek ve yıldızlar.',
  description:
    'Luzest; moda, güzellik, seyahat, aşk ve ilişkiler, yemek ve astroloji üzerine yazılarla hayatın güzel yanlarını anlatan bir lifestyle dergisi.',
  email: 'merhaba@luzest.com',
  instagram: 'https://instagram.com/luzest',
  pinterest: 'https://pinterest.com/luzest',
  sanity: {
    projectId: 'u5wvkla5',
    dataset: 'production',
  },
};

// Kategoriler ve alt bölümleri. Sıra, menüdeki sırayı belirler.
// Yeni alt bölüm eklemek için ilgili "subs" listesine { slug, title } ekle.
export const categories = [
  {
    slug: 'moda', title: 'Moda', blurb: 'Stil, trendler ve giyinmenin keyfi.',
    subs: [
      { slug: 'trendler', title: 'Trendler' },
      { slug: 'kombin-rehberi', title: 'Kombin Rehberi' },
      { slug: 'kapsul-gardirop', title: 'Kapsül Gardırop' },
      { slug: 'butce-dostu', title: 'Bütçe Dostu' },
    ],
  },
  {
    slug: 'guzellik', title: 'Güzellik', blurb: 'Cilt, saç, makyaj ve iyi bakım.',
    subs: [
      { slug: 'cilt-bakimi', title: 'Cilt Bakımı' },
      { slug: 'sac', title: 'Saç' },
      { slug: 'makyaj', title: 'Makyaj' },
      { slug: 'eczane-urunleri', title: 'Eczane Ürünleri' },
    ],
  },
  {
    slug: 'seyahat', title: 'Seyahat', blurb: 'Rotalar, şehirler ve yolda olmak.',
    subs: [
      { slug: 'turkiye-rotalari', title: 'Türkiye Rotaları' },
      { slug: 'hafta-sonu-kacamagi', title: 'Hafta Sonu Kaçamağı' },
      { slug: 'yurt-disi', title: 'Yurt Dışı' },
      { slug: 'vizesiz-ulkeler', title: 'Vizesiz Ülkeler' },
    ],
  },
  {
    slug: 'ask-iliskiler', title: 'Aşk & İlişkiler', blurb: 'Kalp işleri, bağlar ve dürüst konuşmalar.',
    subs: [
      { slug: 'flort', title: 'Flört' },
      { slug: 'iliski', title: 'İlişki' },
      { slug: 'ayrilik', title: 'Ayrılık' },
      { slug: 'arkadaslik-aile', title: 'Arkadaşlık & Aile' },
      { slug: 'okurdan-mektup', title: 'Okurdan Mektup' },
    ],
  },
  {
    slug: 'yemek', title: 'Yemek', blurb: 'Tarifler, mekânlar ve sofra kültürü.',
    subs: [
      { slug: 'kolay-tarifler', title: 'Kolay Tarifler' },
      { slug: 'mekan', title: 'Mekân' },
      { slug: 'kahve-tatli', title: 'Kahve & Tatlı' },
      { slug: 'sofra', title: 'Sofra' },
    ],
  },
  {
    slug: 'astroloji', title: 'Astroloji', blurb: 'Burçlar, gökyüzü ve haftanın enerjisi.',
    subs: [
      { slug: 'haftalik-burc', title: 'Haftalık Burç' },
      { slug: 'aylik-burc', title: 'Aylık Burç' },
      { slug: 'yeni-ay-dolunay', title: 'Yeni Ay & Dolunay' },
      { slug: 'burc-uyumu', title: 'Burç Uyumu' },
    ],
  },
  {
    slug: 'yasam', title: 'Yaşam', blurb: 'Ev, rutinler ve iyi hissetmek.',
    subs: [
      { slug: 'ev-dekorasyon', title: 'Ev & Dekorasyon' },
      { slug: 'rutinler', title: 'Rutinler' },
      { slug: 'kariyer', title: 'Kariyer' },
      { slug: 'zihin-beden', title: 'Zihin & Beden' },
      { slug: 'bir-gunum', title: 'Bir Günüm' },
    ],
  },
];

export const categoryBySlug = (slug) => categories.find((c) => c.slug === slug);
export const subBySlug = (catSlug, subSlug) => categoryBySlug(catSlug)?.subs.find((s) => s.slug === subSlug);

// Ana sayfadaki burç şeridi bu alt bölümdeki son yazıyı gösterir.
export const horoscope = { category: 'astroloji', sub: 'haftalik-burc' };

// Sitenin temel ayarları. Buradaki değerleri değiştirip GitHub'a kaydetmen yeterli.
export const site = {
  name: 'Luzest',
  url: 'https://luzest.com',
  tagline: 'Moda, seyahat, aşk, yemek ve yıldızlar.',
  description:
    'Luzest; moda, seyahat, aşk ve ilişkiler, yemek ve astroloji üzerine yazılarla hayatın güzel yanlarını anlatan bir lifestyle dergisi.',
  email: 'merhaba@luzest.com',
  instagram: 'https://instagram.com/luzest',
  pinterest: 'https://pinterest.com/luzest',
  sanity: {
    projectId: 'u5wvkla5',
    dataset: 'production',
  },
};

// Kategoriler. Sıra, menüdeki sırayı belirler.
export const categories = [
  { slug: 'moda', title: 'Moda', blurb: 'Stil, trendler ve giyinmenin keyfi.' },
  { slug: 'seyahat', title: 'Seyahat', blurb: 'Rotalar, şehirler ve yolda olmak.' },
  { slug: 'ask-iliskiler', title: 'Aşk & İlişkiler', blurb: 'Kalp işleri, bağlar ve dürüst konuşmalar.' },
  { slug: 'yemek', title: 'Yemek', blurb: 'Tarifler, mekânlar ve sofra kültürü.' },
  { slug: 'astroloji', title: 'Astroloji', blurb: 'Burçlar, gökyüzü ve haftanın enerjisi.' },
  { slug: 'yasam', title: 'Yaşam', blurb: 'Ev, rutinler ve iyi hissetmek.' },
];

export const categoryBySlug = (slug) => categories.find((c) => c.slug === slug);

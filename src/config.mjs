// Sitenin temel ayarları. Buradaki değerleri değiştirip GitHub'a kaydetmen yeterli.
export const site = {
  name: 'Luzest',
  url: 'https://luzest.com',
  tagline: 'Hayatın keşfetmeye değer hâli.',
  description:
    'Luzest; moda, güzellik, seyahat, aşk ve ilişkiler, yemek ve astroloji üzerine yazılarla hayatın güzel yanlarını anlatan bir lifestyle dergisi.',
  email: 'info@luzest.com',
  instagram: 'https://instagram.com/luzest',
  pinterest: 'https://tr.pinterest.com/Luzestt/',
  sanity: {
    projectId: 'u5wvkla5',
    dataset: 'production',
  },
};

// Kategoriler ve alt bölümleri. "slide": ana sayfadaki kategori slider'ında görünen görsel ve metin;
// görseli değiştirmek için Sanity'deki herhangi bir görselin cdn.sanity.io adresini yapıştırman yeterli.
// Sıra, menüdeki sırayı belirler.
// Yeni alt bölüm eklemek için ilgili "subs" listesine { slug, title } ekle.
export const categories = [
  {
    slug: 'moda', title: 'Moda', blurb: 'Stil, trendler ve giyinmenin keyfi.',
    slide: {
      image: 'https://cdn.sanity.io/images/u5wvkla5/production/84de810d8f2a3567f2835156ba41288986881414-2116x743.png',
      alt: 'Halı üzerine dizilmiş sonbahar kapsül gardırobu parçaları',
      headline: 'Az parçayla çok stil',
      text: 'Kapsül gardıroptan sezonun trendlerine, dolabını yeniden sevdirecek kombin fikirleri.',
    },
    subs: [
      { slug: 'trendler', title: 'Trendler' },
      { slug: 'kombin-rehberi', title: 'Kombin Rehberi' },
      { slug: 'kapsul-gardirop', title: 'Kapsül Gardırop' },
      { slug: 'butce-dostu', title: 'Bütçe Dostu' },
    ],
    extras: [
      { title: 'Günün Kombin Çarkı', href: '/kombin-carki/' },
    ],
  },
  {
    slug: 'guzellik', title: 'Güzellik', blurb: 'Cilt, saç, makyaj ve iyi bakım.',
    slide: {
      image: 'https://cdn.sanity.io/images/u5wvkla5/production/56543ff77f9483deb3ee697aa434e0efbf348a51-1536x1024.png',
      alt: 'Aynanın önünde makyaj çantası ve fırçalar',
      headline: 'Cildine iyi gelen bir rutin',
      text: 'Eczane ürünleri, beş dakikalık makyajlar ve gerçekten işe yarayan bakım önerileri.',
    },
    subs: [
      { slug: 'cilt-bakimi', title: 'Cilt Bakımı' },
      { slug: 'sac', title: 'Saç' },
      { slug: 'makyaj', title: 'Makyaj' },
      { slug: 'eczane-urunleri', title: 'Eczane Ürünleri' },
    ],
    extras: [
      { title: 'Kendine İyi Bak Çarkı', href: '/bakim-carki/' },
    ],
  },
  {
    slug: 'seyahat', title: 'Seyahat', blurb: 'Rotalar, şehirler ve yolda olmak.',
    slide: {
      image: 'https://cdn.sanity.io/images/u5wvkla5/production/b3cb72c7b6cf1740e9603c0966c8b6c5d6900585-1536x1024.png',
      alt: 'Sisli bir sahil kasabasının taş sokakları',
      headline: 'Bir sonraki rotan burada',
      text: 'Kalabalıksız Türkiye rotaları, vizesiz şehirler ve hafta sonu kaçamakları.',
    },
    subs: [
      { slug: 'turkiye-rotalari', title: 'Türkiye Rotaları' },
      { slug: 'hafta-sonu-kacamagi', title: 'Hafta Sonu Kaçamağı' },
      { slug: 'yurt-disi', title: 'Yurt Dışı' },
      { slug: 'vizesiz-ulkeler', title: 'Vizesiz Ülkeler' },
    ],
  },
  {
    slug: 'ask-iliskiler', title: 'Aşk & İlişkiler', blurb: 'Kalp işleri, bağlar ve dürüst konuşmalar.',
    slide: {
      image: 'https://cdn.sanity.io/images/u5wvkla5/production/a1e78ce0774c642dc850bc32b5773d5c7b8af055-1800x1200.jpg',
      alt: 'Masada kahve kupalarını tutan iki kişi',
      headline: 'Kalbe dair dürüst sohbetler',
      text: 'Flörtten ayrılığa, arkadaşlıktan aileye; ilişkiler üzerine samimi yazılar.',
    },
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
    slide: {
      image: 'https://cdn.sanity.io/images/u5wvkla5/production/a035dbf164ce02b799188a2babf8b72ad41e41c7-1800x2412.jpg',
      alt: 'Çeşit çeşit ekmek ve kahveyle kurulmuş kahvaltı sofrası',
      headline: 'Sofraya gelen her şey',
      text: 'Kolay tarifler, kahve molaları ve gitmeye değer mekânlar.',
    },
    subs: [
      { slug: 'kolay-tarifler', title: 'Kolay Tarifler' },
      { slug: 'mekan', title: 'Mekân' },
      { slug: 'kahve-tatli', title: 'Kahve & Tatlı' },
      { slug: 'sofra', title: 'Sofra' },
    ],
  },
  {
    slug: 'astroloji', title: 'Astroloji', blurb: 'Burçlar, gökyüzü ve haftanın enerjisi.',
    slide: {
      image: 'https://cdn.sanity.io/images/u5wvkla5/production/d7c329c3c38a3d26f97ddf27a175996cb0e084a0-1672x941.png',
      alt: 'Yıldızlı gökyüzünde altın renkli burç çarkı',
      headline: 'Gökyüzü bu hafta ne diyor?',
      text: 'Haftalık burç yorumları, yeni ay ve dolunay rehberleri, günün melek kartı.',
    },
    subs: [
      { slug: 'haftalik-burc', title: 'Haftalık Burç' },
      { slug: 'aylik-burc', title: 'Aylık Burç' },
      { slug: 'yeni-ay-dolunay', title: 'Yeni Ay & Dolunay' },
      { slug: 'burc-uyumu', title: 'Burç Uyumu' },
    ],
    // Yazı alt bölümü olmayan özel sayfalar (menüde ve alt bölüm çubuğunda görünür).
    extras: [
      { title: 'Şans Kurabiyesi', href: '/sans-kurabiyesi/' },
      { title: 'Evet mi Hayır mı?', href: '/evet-mi-hayir-mi/' },
      { title: 'Günün Melek Kartı', href: '/melek-kartlari/' },
    ],
  },
  {
    slug: 'yasam', title: 'Yaşam', blurb: 'Ev, rutinler ve iyi hissetmek.',
    slide: {
      image: 'https://cdn.sanity.io/images/u5wvkla5/production/e60f5f33184758e0c797578fdc9e3767b78da00d-2117x743.png',
      alt: 'Sabah ışığında mutfak tezgâhında kahve fincanı ve defter',
      headline: 'Küçük rutinler, iyi günler',
      text: 'Ev, kariyer, zihin ve beden için kendine iyi bakmanın yolları.',
    },
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

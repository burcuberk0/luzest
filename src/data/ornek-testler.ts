import type { Quiz } from '../lib/sanity';

// "Makyaj tarzın ne?" testinin içeriği.
// Sitede gösterilen sürüm Sanity'deki "Testler" bölümünden gelir; bu dosya yalnızca
// LUZEST_MOCK=1 ile yapılan test derlemelerinde ve Sanity'ye ilk kayıtta kullanılır.
export const makyajQuiz: Quiz = {
  _id: 'quiz-makyaj-tarzin-ne',
  title: 'Makyaj tarzın ne?',
  slug: 'makyaj-tarzin-ne',
  category: 'guzellik',
  intro: 'Aynanın karşısındaki beş dakikan seni ele veriyor. 7 soruda makyaj tarzını bul, sonucunu hikâyende paylaş.',
  emoji: '💄',
  colorFrom: '#fbe0d0',
  colorTo: '#f3d9e1',
  publishedAt: '2026-11-17T15:00:00.000Z',
  seoTitle: 'Makyaj Tarzın Ne? 7 Soruluk Test',
  seoDescription: 'Doğal ışıltı mı, cesur renkler mi? 7 soruluk testle makyaj tarzını bul, sana uygun önerileri keşfet.',
  sponsor: null,
  questions: [
    { question: 'Sabah aynanın karşısında kaç dakikan var?', options: [
      { emoji: '⏱️', text: 'Beş dakika, en fazla', result: 'dogal' },
      { emoji: '☕', text: 'On dakika; kahve soğumadan bitsin', result: 'klasik' },
      { emoji: '🌸', text: 'Müzik açarım, keyfini çıkarırım', result: 'romantik' },
      { emoji: '🎨', text: 'Ne kadar sürerse; makyaj benim oyun alanım', result: 'cesur' } ] },
    { question: 'Makyaj çantandan asla eksik etmediğin ürün?', options: [
      { emoji: '💧', text: 'Renkli nemlendirici ya da cilt tinti', result: 'dogal' },
      { emoji: '🖤', text: 'Siyah eyeliner', result: 'klasik' },
      { emoji: '💄', text: 'Kırmızı ya da koyu bir ruj', result: 'cesur' },
      { emoji: '🍑', text: 'Krem allık', result: 'romantik' } ] },
    { question: 'Bir davete hazırlanıyorsun. Gözlerin için planın ne?', options: [
      { emoji: '✨', text: 'Göz kapağına biraz ışıltı, bolca maskara', result: 'romantik' },
      { emoji: '🌈', text: 'Renkli bir far ya da grafik bir eyeliner', result: 'cesur' },
      { emoji: '🤎', text: 'Kahve tonlarında yumuşak bir dumanlı göz', result: 'klasik' },
      { emoji: '🙂', text: 'Maskara yeter; gözler zaten konuşuyor', result: 'dogal' } ] },
    { question: 'Hangi iltifat seni en çok mutlu eder?', options: [
      { emoji: '🌿', text: '"Makyaj mı yaptın? Hiç anlamadım."', result: 'dogal' },
      { emoji: '🔥', text: '"O rujla bütün odayı aydınlattın."', result: 'cesur' },
      { emoji: '💎', text: '"Her zamanki gibi çok şıksın."', result: 'klasik' },
      { emoji: '🎀', text: '"Yüzün ışıl ışıl, çok tatlı görünüyorsun."', result: 'romantik' } ] },
    { question: 'Instagram\'da kaydettiğin makyaj videoları genelde…', options: [
      { emoji: '🎭', text: 'Sahne makyajları, renkli göz denemeleri', result: 'cesur' },
      { emoji: '🧴', text: 'Cilt bakımı rutinleri', result: 'dogal' },
      { emoji: '🌷', text: 'Pembe tonlu, "yeni uyanmış gibi" makyajlar', result: 'romantik' },
      { emoji: '📐', text: 'Kusursuz kedi göz eyeliner teknikleri', result: 'klasik' } ] },
    { question: 'Dudakların için favori bitişin?', options: [
      { emoji: '🪞', text: 'Parlak bir gloss', result: 'romantik' },
      { emoji: '🫦', text: 'Mat ve iddialı bir renk', result: 'cesur' },
      { emoji: '🧈', text: 'Renkli bir dudak balmı', result: 'dogal' },
      { emoji: '🌰', text: 'Nude ruj, dudak kalemiyle', result: 'klasik' } ] },
    { question: 'Makyajını bir kelimeyle anlatsan?', options: [
      { emoji: '🫧', text: 'Ferah', result: 'dogal' },
      { emoji: '🕊️', text: 'Zamansız', result: 'klasik' },
      { emoji: '💥', text: 'Cesur', result: 'cesur' },
      { emoji: '🌸', text: 'Yumuşak', result: 'romantik' } ] },
  ],
  results: [
    {
      key: 'dogal', title: 'Doğal Işıltı', emoji: '🌿',
      motto: 'En iyi makyaj, cildimin kendisi gibi görünenidir.',
      body: 'Senin için makyaj bir maske değil, cildini biraz daha dinlenmiş göstermenin yolu. Renkli nemlendirici, krem allık ve bir kat maskara; işte bu kadar.\n\nAsıl yatırımını cilt bakımına yapıyorsun ve bunun karşılığını alıyorsun. Bir gün cesur bir ruj denersen, sadeliğin onu daha da öne çıkaracak.',
      traits: ['Pratik', 'Ferah', 'Cilt odaklı', 'Az ama öz'],
      colorFrom: '#dce8d6', colorTo: '#f7e3c4',
      recommendation: { headline: 'Makyajsız makyaj için', text: 'Beş dakikalık doğal makyaj adımları ve cildini ışıl ışıl gösteren ürün önerileri makyaj bölümümüzde.', ctaText: 'Makyaj yazılarını oku', url: '/kategori/guzellik/makyaj/' },
    },
    {
      key: 'klasik', title: 'Zamansız Şıklık', emoji: '🖤',
      motto: 'Trendler gelir geçer, iyi çekilmiş bir eyeliner kalır.',
      body: 'Sen ne istediğini biliyorsun. Bakımlı kaşlar, ince bir eyeliner, nude bir ruj; ofiste de akşam yemeğinde de aynı özenle duruyorsun.\n\nTarzın abartıya ihtiyaç duymuyor çünkü detaylarda kusursuz. Arada sırada bordo bir rujla bu klasiği kendi imzana dönüştürebilirsin.',
      traits: ['Özenli', 'Şık', 'Tutarlı', 'Detaycı'],
      colorFrom: '#efe7e1', colorTo: '#e1daf0',
      recommendation: { headline: 'Klasiğin inceliklerine', text: 'Eyeliner teknikleri, doğru nude rujun sırları ve her yere uyan makyaj rehberleri seni bekliyor.', ctaText: 'Makyaj yazılarını oku', url: '/kategori/guzellik/makyaj/' },
    },
    {
      key: 'cesur', title: 'Cesur Renkler', emoji: '💄',
      motto: 'Makyaj benim için kurallar değil, bir oyun.',
      body: 'Sen makyajı kendini ifade etmenin en eğlenceli yolu olarak görüyorsun. Mavi bir eyeliner, kırmızı bir ruj, beklenmedik bir far; hepsi seninle güzel.\n\nCesaretin, etrafındakilere de ilham veriyor. Yeni bir renk denemeye çekinen arkadaşının ilk danışacağı kişi büyük ihtimalle sensin.',
      traits: ['Yaratıcı', 'Cesur', 'Deneyci', 'Enerjik'],
      colorFrom: '#f6d2cc', colorTo: '#e1daf0',
      recommendation: { headline: 'Bir sonraki denemen için', text: 'Sezonun renk trendleri ve cesur makyaj fikirleri makyaj bölümümüzde.', ctaText: 'Makyaj yazılarını oku', url: '/kategori/guzellik/makyaj/' },
    },
    {
      key: 'romantik', title: 'Romantik Pembe', emoji: '🌸',
      motto: 'Biraz pembe, biraz ışıltı, bolca gülümseme.',
      body: 'Senin makyajında yumuşak bir ışık var. Yanaklarda pembe bir allık, göz kapağında hafif bir parıltı, dudaklarda gloss; yüzün hep yeni uyanmış gibi taze.\n\nTarzın samimi ve sıcak; insanlara kendini yakın hissettiriyor. Şeftali ve mercan tonları da senin paletine çok yakışacak.',
      traits: ['Sıcak', 'Işıltılı', 'Zarif', 'Samimi'],
      colorFrom: '#f3d9e1', colorTo: '#fbe0d0',
      recommendation: { headline: 'Pembe tonlara bayılanlar için', text: 'Allık sürme teknikleri ve ışıltılı göz makyajı önerileri makyaj bölümümüzde.', ctaText: 'Makyaj yazılarını oku', url: '/kategori/guzellik/makyaj/' },
    },
  ],
};

export const mockQuizzes: Quiz[] = [
  makyajQuiz,
  {
    ...makyajQuiz,
    _id: 'quiz-mock-sponsor',
    slug: 'ornek-sponsorlu-test',
    title: 'Örnek sponsorlu test',
    sponsor: { name: 'Nūra', url: 'https://example.com', label: 'Reklam' },
  },
];

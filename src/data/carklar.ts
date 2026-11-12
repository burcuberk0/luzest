// Çark içerikleri. Her çarkta 8 dilim var; dilim eklemek/çıkarmak için listeyi düzenle (6–10 arası iyi görünür).
// color: dilimin rengi. details: sonuç penceresinde başlıklı satırlar.

export interface CarkDilimi {
  slug: string;
  label: string; // çark üstünde görünen kısa ad
  color: string;
  title: string; // sonuç başlığı
  motto: string;
  details: { label: string; text: string }[];
}

export const kombinCarki: CarkDilimi[] = [
  {
    slug: 'monokrom', label: 'Monokrom', color: '#e9dfd3',
    title: 'Tepeden tırnağa tek renk',
    motto: 'Tek renk, sıfır stres, maksimum şıklık.',
    details: [
      { label: 'Kombin', text: 'Krem triko kazak, aynı tonlarda geniş paça pantolon ve bej loafer. Renkleri değil, dokuları karıştır.' },
      { label: 'Aksesuar', text: 'Altın tonlu ince bir kolye ve deri bir omuz çantası.' },
      { label: 'İpucu', text: 'Tek renkte kalınca bir tonu açık, bir tonu koyu seçmek görünümü derinleştirir.' },
    ],
  },
  {
    slug: 'kat-kat', label: 'Kat Kat', color: '#c9a77c',
    title: 'Katmanlarla oyna',
    motto: 'Soğuk hava, yaratıcılığın bahanesi.',
    details: [
      { label: 'Kombin', text: 'Beyaz gömlek, üstüne V yaka süveter, en üste uzun bir trençkot. Altına düz kesim kot.' },
      { label: 'Aksesuar', text: 'İnce bir kemer ve dizi aşan çizme.' },
      { label: 'İpucu', text: 'Gömleğin yakasını ve manşetlerini dışarıda bırak; katmanlar böyle görünür olur.' },
    ],
  },
  {
    slug: 'renk-patlamasi', label: 'Renk Şöleni', color: '#f08a74',
    title: 'Bugün renkten korkma',
    motto: 'Gri bir günde mercan bir kazak, en iyi ilaçtır.',
    details: [
      { label: 'Kombin', text: 'Mercan rengi bir kazak, krem pantolon ve beyaz spor ayakkabı.' },
      { label: 'Aksesuar', text: 'Renkli bir saç tokası ya da desenli bir fular.' },
      { label: 'İpucu', text: 'Tek bir canlı renk seç, geri kalanını nötr tut; böylece göz yorulmaz.' },
    ],
  },
  {
    slug: 'sehirli-sik', label: 'Şehirli Şık', color: '#2b3a67',
    title: 'Toplantıdan akşam yemeğine',
    motto: 'İyi bir blazer, hayatın her sahnesine uyar.',
    details: [
      { label: 'Kombin', text: 'Lacivert blazer, beyaz basic tişört, siyah kumaş pantolon ve loafer.' },
      { label: 'Aksesuar', text: 'Yapılandırılmış bir el çantası ve küçük küpeler.' },
      { label: 'İpucu', text: 'Akşam için loafer yerine ince topuklu bir ayakkabı ve kırmızı ruj yeterli.' },
    ],
  },
  {
    slug: 'rahat-cool', label: 'Rahat & Cool', color: '#a9bfa3',
    title: 'Rahat ama özenli',
    motto: 'Rahatlık da bir stil tercihidir.',
    details: [
      { label: 'Kombin', text: 'Oversize sweatshirt, düz kesim kot, temiz beyaz sneaker.' },
      { label: 'Aksesuar', text: 'Beyzbol şapkası ya da bere, bez çanta.' },
      { label: 'İpucu', text: 'Sweatshirt\'ün önünü hafifçe pantolonun içine sokarsan görünüm bir anda toparlanır.' },
    ],
  },
  {
    slug: 'romantik', label: 'Romantik', color: '#f1c6cf',
    title: 'Biraz romantizm iyi gelir',
    motto: 'Bugün kendine bir aşk mektubu gibi giyin.',
    details: [
      { label: 'Kombin', text: 'Çiçek desenli midi elbise, üzerine kalın örgü hırka ve bilekte bot.' },
      { label: 'Aksesuar', text: 'İnce bir kurdele toka, inci küpeler.' },
      { label: 'İpucu', text: 'Feminen parçaları bot ya da deri ceket gibi sert bir parçayla dengelemek modern durur.' },
    ],
  },
  {
    slug: 'gece-modu', label: 'Gece Modu', color: '#3a2b55',
    title: 'Akşamın yıldızı sensin',
    motto: 'Siyah her zaman doğru cevaptır; ışıltı ise bonus.',
    details: [
      { label: 'Kombin', text: 'Siyah saten etek, siyah ince triko ve topuklu ayakkabı.' },
      { label: 'Aksesuar', text: 'Işıltılı bir clutch ve iddialı küpeler.' },
      { label: 'İpucu', text: 'Tek bir ışıltılı parça yeterli; gerisini sade bırak.' },
    ],
  },
  {
    slug: 'vintage', label: 'Vintage', color: '#d9a933',
    title: 'Geçmişten bir dokunuş',
    motto: 'Bazı parçalar yaşlanmaz, sadece hikâye biriktirir.',
    details: [
      { label: 'Kombin', text: 'Kadife ceket, yüksek bel kot ve kahverengi loafer.' },
      { label: 'Aksesuar', text: 'Eski bir saat, kare çerçeveli gözlük.' },
      { label: 'İpucu', text: 'Bir vintage parçayı modern basic\'lerle eşleştirince kostüm gibi durmaz.' },
    ],
  },
];

export const bakimCarki: CarkDilimi[] = [
  {
    slug: 'maske-gecesi', label: 'Maske Gecesi', color: '#f6c09a',
    title: 'Bu akşam maske gecesi',
    motto: 'Cildin de bir mola hak ediyor.',
    details: [
      { label: 'Ne yap?', text: 'Yüzünü temizle, nemlendirici bir kâğıt ya da krem maske uygula, 15 dakika uzan.' },
      { label: 'Süre', text: '20 dakika' },
      { label: 'Bonus', text: 'Maskeyi beklerken sevdiğin bir podcast aç.' },
    ],
  },
  {
    slug: 'su-molasi', label: 'Su Molası', color: '#9fd0dc',
    title: 'Bugün suyu unutma',
    motto: 'Işıltılı cilt, bir bardak suyla başlar.',
    details: [
      { label: 'Ne yap?', text: 'Masana bir sürahi koy, her saat başı bir bardak iç. Limon ya da nane ekleyebilirsin.' },
      { label: 'Süre', text: 'Gün boyu' },
      { label: 'Bonus', text: 'Telefonuna saatlik bir hatırlatma kur.' },
    ],
  },
  {
    slug: 'erken-uyku', label: 'Erken Uyku', color: '#3a2b55',
    title: 'Güzellik uykusu zamanı',
    motto: 'En iyi göz kremi, sekiz saatlik uykudur.',
    details: [
      { label: 'Ne yap?', text: 'Bu gece ekranları yatmadan bir saat önce kapat, yarım saat erken yat.' },
      { label: 'Süre', text: '1 gece' },
      { label: 'Bonus', text: 'İpek bir yastık kılıfı saçına ve cildine iyi gelir.' },
    ],
  },
  {
    slug: 'sac-bakimi', label: 'Saç Bakımı', color: '#d9a933',
    title: 'Saçlarına özen göster',
    motto: 'İyi bir saç günü, iyi bir gündür.',
    details: [
      { label: 'Ne yap?', text: 'Saç uçlarına besleyici bir yağ ya da maske sür, havluyla sarıp 20 dakika beklet.' },
      { label: 'Süre', text: '30 dakika' },
      { label: 'Bonus', text: 'Son durulamayı ılık suyla yap; saç parlar.' },
    ],
  },
  {
    slug: 'yuz-masaji', label: 'Yüz Masajı', color: '#f1c6cf',
    title: 'Kendine bir yüz masajı yap',
    motto: 'Beş dakikalık masaj, beş yıl dinç görünmek gibi.',
    details: [
      { label: 'Ne yap?', text: 'Nemlendiricini sürerken parmak uçlarınla çene hattından şakaklara doğru yukarı hareketlerle masaj yap.' },
      { label: 'Süre', text: '5 dakika' },
      { label: 'Bonus', text: 'Varsa yüz rulosunu buzdolabında soğut, sonra kullan.' },
    ],
  },
  {
    slug: 'el-ayak', label: 'El & Ayak', color: '#c9b8e6',
    title: 'Ellerin ve ayakların için bir şımartma',
    motto: 'Küçük detaylar, büyük özen demektir.',
    details: [
      { label: 'Ne yap?', text: 'Ellerine ve ayaklarına kalın bir krem sür, üzerine pamuklu eldiven ve çorap giyip uyu.' },
      { label: 'Süre', text: '1 gece' },
      { label: 'Bonus', text: 'Tırnak etlerine bir damla yağ sür.' },
    ],
  },
  {
    slug: 'sakin-banyo', label: 'Sakin Banyo', color: '#a9bfa3',
    title: 'Uzun ve sakin bir duş',
    motto: 'Bazen en iyi terapi sıcak sudur.',
    details: [
      { label: 'Ne yap?', text: 'Sevdiğin bir duş jeli ya da tuz peelingi kullan, ışıkları kıs, acele etme.' },
      { label: 'Süre', text: '25 dakika' },
      { label: 'Bonus', text: 'Duştan sonra nemli tenine vücut yağı sür.' },
    ],
  },
  {
    slug: 'ruj-gunu', label: 'Ruj Günü', color: '#b23a48',
    title: 'Bugün ruj günü',
    motto: 'Güzel bir ruj, en güçlü aksesuardır.',
    details: [
      { label: 'Ne yap?', text: 'Uzun süredir kullanmadığın o cesur rengi sür; makyajın geri kalanını sade bırak.' },
      { label: 'Süre', text: '2 dakika' },
      { label: 'Bonus', text: 'Önce dudak nemlendiricisi sür, ruj daha güzel oturur.' },
    ],
  },
];

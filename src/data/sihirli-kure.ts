// Sihirli küre cevapları. type: renk ve ton için (evet / belki / hayir).
// note: cevabın altında görünen kısa yorum.
export interface KureCevabi { text: string; type: 'evet' | 'belki' | 'hayir'; note: string }

export const kureCevaplari: KureCevabi[] = [
  { text: 'Kesinlikle evet', type: 'evet', note: 'Evren bu konuda seninle aynı fikirde.' },
  { text: 'Evet', type: 'evet', note: 'Kısa ve net. İçinden geleni yap.' },
  { text: 'Hiç şüphe yok', type: 'evet', note: 'Bu kadar emin olduğum az şey var.' },
  { text: 'İşaretler evet diyor', type: 'evet', note: 'Etrafındaki küçük tesadüflere dikkat et.' },
  { text: 'Büyük ihtimalle', type: 'evet', note: 'Rüzgâr senden yana esiyor.' },
  { text: 'Buna güvenebilirsin', type: 'evet', note: 'İçindeki ses de aynı şeyi söylüyor.' },
  { text: 'Evet, ama sabret', type: 'evet', note: 'Olacak; sadece biraz zaman istiyor.' },
  { text: 'Yıldızlar senden yana', type: 'evet', note: 'Bu hafta şansın açık.' },
  { text: 'Kalbin zaten biliyor', type: 'evet', note: 'Cevabı soru sormadan önce hissettin.' },
  { text: 'Belki', type: 'belki', note: 'Kapı aralık; ne kadar açılacağı sana bağlı.' },
  { text: 'Şimdi söyleyemem', type: 'belki', note: 'Sis henüz dağılmadı. Biraz bekle.' },
  { text: 'Tekrar sor', type: 'belki', note: 'Soruyu biraz değiştir, cevap da değişebilir.' },
  { text: 'Zamanı gelince', type: 'belki', note: 'Acele etme; doğru an yaklaşıyor.' },
  { text: 'Önce kendine sor', type: 'belki', note: 'Bu cevap küreden çok sende.' },
  { text: 'Bir işaret bekle', type: 'belki', note: 'Önümüzdeki birkaç gün dikkatli bak.' },
  { text: 'Yarı yarıya', type: 'belki', note: 'İki yol da açık; hangisi seni daha çok heyecanlandırıyor?' },
  { text: 'Hayır', type: 'hayir', note: 'Bu kapı kapalı; ama başkası açılacak.' },
  { text: 'Asla', type: 'hayir', note: 'Bu konuda küre çok kararlı.' },
  { text: 'Pek sanmıyorum', type: 'hayir', note: 'Belki de başka bir şeye odaklanma zamanı.' },
  { text: 'İşaretler hayır diyor', type: 'hayir', note: 'Bazen hayır, en iyi korumadır.' },
  { text: 'Şu an değil', type: 'hayir', note: 'Zamanlaması doğru değil; vazgeçme ama bekle.' },
  { text: 'Buna hiç gerek yok', type: 'hayir', note: 'Enerjini sana iyi gelen şeylere sakla.' },
  { text: 'Kesinlikle hayır', type: 'hayir', note: 'Küre burada çok net.' },
  { text: 'Bence vazgeç', type: 'hayir', note: 'Bırakmak da bir cesaret.' },
];

Bu klasör, uygulamanın oynatacağı ses dosyalarını barındırır.

Nasıl kullanılır:
- Dosyaları `client/public/audio/` içine koyun.
- Kod proje içinde `/audio/filename.mp3` şeklinde erişir (ör: `/audio/kisi1.mp3`).
- Önerilen isimlendirme: küçük harf, boşluk yok, ASCII karakterler (ör: `kisi1.mp3`, `sen.mp3`).

Test etmek için:
1. `npm run dev` ile development server'ı başlatın.
2. Tarayıcıda `http://localhost:5000/audio/kisi1.mp3` adresine giderek dosyanın erişilebilir olduğunu kontrol edin.

Eksik dosyaları kontrol etmek için: `npm run check:audio` (projeye ek bir script eklenmiştir).

Not: Gerçek ses dosyalarını repoya eklemek istemiyorsanız, buraya `.gitkeep` koyabilirsiniz; ama uygulama çalıştırıldığında eksik dosyalar uyarısı alırsınız.
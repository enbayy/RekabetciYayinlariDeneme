# Deneme Sınav Platformu

Modern ve kullanıcı dostu deneme sınav platformu. YKS, TYT, AYT ve branş denemeleri ile sınavlara hazırlanın.

## 🚀 Özellikler

- ✅ **Gerçek Sınav Deneyimi**: 135 dakikalık gerçek sınav koşulları
- ✅ **Detaylı Analiz**: Her soruda geçirilen süre ve performans analizi
- ✅ **Soru Navigasyonu**: Alt kısımda soru numaraları ile kolay geçiş
- ✅ **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- ✅ **Mavi Tema**: Modern ve profesyonel görünüm

## 🛠️ Teknolojiler

- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **JavaScript** - Basit ve uyumlu kod
- **LocalStorage** - Veri saklama

## 📱 Sayfalar

- **Anasayfa** - Tanıtım ve özellikler
- **Denemeler** - TYT, AYT, Branş denemeleri
- **Deneme Sınavı** - Gerçek sınav deneyimi
- **Sonuç** - Detaylı analiz ve istatistikler
- **Üye Ol/Giriş Yap** - Hesap yönetimi
- **Hakkımızda/İletişim** - Bilgi sayfaları

## 🚀 Netlify Deploy

### 1. GitHub'a Yükle
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/deneme-website.git
git push -u origin main
```

### 2. Netlify Ayarları
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: `18`

### 3. Otomatik Deploy
Netlify otomatik olarak GitHub'dan çekecek ve deploy edecek.

## 🔧 Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Static export (Netlify için)
npm run export
```

## 📁 Proje Yapısı

```
deneme-website/
├── src/
│   ├── app/
│   │   ├── page.js              # Anasayfa
│   │   ├── denemeler/
│   │   │   └── page.js          # Denemeler listesi
│   │   ├── deneme/
│   │   │   └── [id]/
│   │   │       └── page.js      # Deneme sınavı
│   │   ├── sonuc/
│   │   │   └── page.js          # Sonuç sayfası
│   │   ├── uye-ol/
│   │   │   └── page.js          # Üye ol
│   │   ├── giris-yap/
│   │   │   └── page.js          # Giriş yap
│   │   ├── hakkimizda/
│   │   │   └── page.js          # Hakkımızda
│   │   ├── iletisim/
│   │   │   └── page.js          # İletişim
│   │   └── layout.js             # Ana layout
│   └── components/
│       └── Navbar.js             # Navigasyon
├── public/                       # Statik dosyalar
├── next.config.js               # Next.js ayarları
├── netlify.toml                 # Netlify ayarları
└── package.json                 # Bağımlılıklar
```

## 🎯 Kullanım

1. **Anasayfa**dan denemelere gidin
2. **Deneme paketi** seçin
3. **"Denemeye Başla"** butonuna tıklayın
4. **Sınavı tamamlayın**
5. **Sonuçlarınızı** görün

## 🔧 Sorun Giderme

### Netlify 404 Hatası
- `next.config.js` dosyasında `output: 'export'` olduğundan emin olun
- `netlify.toml` dosyasının doğru ayarları içerdiğini kontrol edin
- Build command'ın `npm run build` olduğunu doğrulayın

### Build Hatası
- Node.js versiyonunun 18+ olduğundan emin olun
- `npm install` komutunu çalıştırın
- `npm run build` ile test edin

## 📞 Destek

Herhangi bir sorun için iletişim sayfasından bize ulaşabilirsiniz.

---

**Not**: Bu proje tamamen JavaScript ile yazılmıştır ve ECMAScript özellikleri kullanılmamıştır.
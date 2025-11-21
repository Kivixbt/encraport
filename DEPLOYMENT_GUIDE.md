# 🚀 Production Deployment Rehberi - API Key'leri Ekleme

## ⚠️ ÖNEMLİ: API Key'ler GitHub'a YAZILMAZ!

`.env` dosyası GitHub'a yüklenmez (güvenlik için). Production'da API key'lerinizi deployment platform'unda (Vercel/Netlify) **Environment Variables** olarak eklemeniz gerekir.

---

## 📋 Vercel'e Deploy (Önerilen)

### Adım 1: Vercel'e Giriş
1. https://vercel.com adresine gidin
2. GitHub hesabınızla giriş yapın
3. **"Add New Project"** butonuna tıklayın

### Adım 2: Repository'yi Seçin
1. GitHub repository'nizi bulun: `Kivixbt/encraport`
2. **"Import"** butonuna tıklayın

### Adım 3: Environment Variables Ekleme (ÖNEMLİ!)
1. **"Environment Variables"** sekmesine gidin (veya "Configure Project" sayfasında)
2. Şu iki değişkeni ekleyin:

#### 1. Firebase Config:
```
Name: VITE_FIREBASE_CONFIG
Value: {"apiKey":"SİZİN_API_KEY","authDomain":"proje-adi.firebaseapp.com","projectId":"proje-adi","storageBucket":"proje-adi.appspot.com","messagingSenderId":"123456789","appId":"1:123456789:web:abcdef"}
```

**Örnek:**
```
VITE_FIREBASE_CONFIG = {"apiKey":"AIzaSyB1234567890","authDomain":"encraport.firebaseapp.com","projectId":"encraport-12345","storageBucket":"encraport-12345.appspot.com","messagingSenderId":"987654321","appId":"1:987654321:web:xyz123"}
```

#### 2. Gemini API Key:
```
Name: VITE_GEMINI_KEY
Value: AIzaSyC...sizin_gemini_key
```

**Örnek:**
```
VITE_GEMINI_KEY = AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```

### Adım 4: Environment Seçimi
Her iki değişken için:
- ✅ **Production** (işaretleyin)
- ✅ **Preview** (işaretleyin - opsiyonel)
- ✅ **Development** (işaretleyin - opsiyonel)

### Adım 5: Deploy
1. **"Deploy"** butonuna tıklayın
2. Birkaç dakika bekleyin
3. ✅ Projeniz canlıda! (örn: `encraport.vercel.app`)

---

## 📋 Netlify'e Deploy

### Adım 1: Netlify'e Giriş
1. https://netlify.com adresine gidin
2. GitHub hesabınızla giriş yapın
3. **"Add new site"** → **"Import an existing project"**

### Adım 2: Repository'yi Bağlayın
1. GitHub'ı seçin
2. Repository'nizi bulun: `Kivixbt/encraport`
3. **"Connect"** butonuna tıklayın

### Adım 3: Build Ayarları
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- (Netlify otomatik algılayabilir)

### Adım 4: Environment Variables Ekleme
1. **"Show advanced"** butonuna tıklayın
2. **"New variable"** butonuna tıklayın
3. Şu değişkenleri ekleyin:

#### 1. Firebase Config:
```
Key: VITE_FIREBASE_CONFIG
Value: {"apiKey":"SİZİN_API_KEY","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}
```

#### 2. Gemini API Key:
```
Key: VITE_GEMINI_KEY
Value: AIzaSyC...sizin_gemini_key
```

### Adım 5: Deploy
1. **"Deploy site"** butonuna tıklayın
2. Birkaç dakika bekleyin
3. ✅ Projeniz canlıda! (örn: `encraport.netlify.app`)

---

## 🔍 API Key'lerinizi Nereden Bulacaksınız?

### Firebase Config:
1. https://console.firebase.google.com/ adresine gidin
2. Projenizi seçin (veya yeni proje oluşturun)
3. ⚙️ **Project Settings** (sol menüden)
4. **General** sekmesine gidin
5. **"Your apps"** bölümüne scroll edin
6. **Web app** ikonuna tıklayın (</>)
7. **Config** objesini kopyalayın
8. Tek satır JSON formatına çevirin

**Örnek Firebase Config:**
```json
{
  "apiKey": "AIzaSyB1234567890",
  "authDomain": "encraport.firebaseapp.com",
  "projectId": "encraport-12345",
  "storageBucket": "encraport-12345.appspot.com",
  "messagingSenderId": "987654321",
  "appId": "1:987654321:web:xyz123"
}
```

**Tek satır formatı (Vercel/Netlify için):**
```
{"apiKey":"AIzaSyB1234567890","authDomain":"encraport.firebaseapp.com","projectId":"encraport-12345","storageBucket":"encraport-12345.appspot.com","messagingSenderId":"987654321","appId":"1:987654321:web:xyz123"}
```

### Gemini API Key:
1. https://ai.google.dev/ adresine gidin
2. Sağ üstte **"Get API Key"** butonuna tıklayın
3. Yeni API key oluşturun veya mevcut key'i kullanın
4. Key'i kopyalayın

---

## ✅ Kontrol Listesi

Deploy etmeden önce:
- [ ] Firebase Config'i hazırladınız mı?
- [ ] Gemini API Key'iniz var mı?
- [ ] Vercel/Netlify'da environment variables eklediniz mi?
- [ ] Her iki değişken de `VITE_` ile başlıyor mu?
- [ ] Firebase Config tek satır JSON formatında mı?

---

## 🆘 Sorun Giderme

### "API key bulunamadı" hatası alıyorsanız:
1. Environment variables'ın doğru eklendiğini kontrol edin
2. Variable isimlerinin `VITE_` ile başladığından emin olun
3. Deploy'u yeniden yapın (environment variables değişikliklerinden sonra)

### Firebase hatası alıyorsanız:
1. Firebase Config'in tek satır JSON formatında olduğunu kontrol edin
2. Tırnak işaretlerinin doğru escape edildiğinden emin olun
3. Firebase Console'da projenizin aktif olduğunu kontrol edin

### Gemini hatası alıyorsanız:
1. API key'in doğru kopyalandığını kontrol edin
2. Google AI Studio'da key'in aktif olduğunu kontrol edin
3. API quota limitinizi kontrol edin

---

## 📝 Özet

| Platform | Environment Variables Nerede? | Nasıl Ekleme? |
|----------|-------------------------------|---------------|
| **Vercel** | Project Settings → Environment Variables | Web UI üzerinden |
| **Netlify** | Site Settings → Environment Variables | Web UI üzerinden |
| **Local** | `.env` dosyası (GitHub'a yüklenmez) | Dosya düzenleyerek |

**ÖNEMLİ:** Production'da `.env` dosyasına gerek yok! Environment variables platform üzerinden eklenir.


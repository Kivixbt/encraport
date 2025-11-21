# 🔧 Vercel Firebase Config Hatası Çözümü

## ❌ Hata: "Firebase config missing in .env"

Bu hata, Vercel'de environment variables'ın düzgün eklenmediğini gösterir.

---

## ✅ Çözüm Adımları

### 1. Vercel Dashboard'a Gidin
1. https://vercel.com adresine gidin
2. Projenizi seçin: `encraport`
3. **Settings** sekmesine tıklayın
4. Sol menüden **Environment Variables** seçin

### 2. Environment Variables Kontrolü

Şu iki değişkenin **KESINLIKLE** ekli olması gerekiyor:

#### ✅ VITE_FIREBASE_CONFIG
- **Name:** `VITE_FIREBASE_CONFIG`
- **Value:** `{"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}`
- **Environment:** Production, Preview, Development (hepsini işaretleyin)

#### ✅ VITE_GEMINI_KEY
- **Name:** `VITE_GEMINI_KEY`
- **Value:** `AIzaSyC...sizin_key`
- **Environment:** Production, Preview, Development (hepsini işaretleyin)

### 3. Eğer Yoksa Ekleme

1. **"Add New"** butonuna tıklayın
2. **Key** alanına: `VITE_FIREBASE_CONFIG` yazın
3. **Value** alanına Firebase config'inizi yapıştırın (tek satır JSON)
4. **Environment** için Production, Preview, Development'ı işaretleyin
5. **Save** butonuna tıklayın
6. Aynı işlemi `VITE_GEMINI_KEY` için tekrarlayın

### 4. ÖNEMLİ: Deploy'u Yeniden Yapın!

Environment variables ekledikten veya değiştirdikten sonra:

1. **Deployments** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. Veya yeni bir commit yapıp push edin

**NEDEN?** Environment variables değişiklikleri sadece yeni deploy'larda aktif olur!

---

## 🔍 Kontrol Listesi

- [ ] `VITE_FIREBASE_CONFIG` eklendi mi?
- [ ] `VITE_GEMINI_KEY` eklendi mi?
- [ ] Her ikisi de `VITE_` ile başlıyor mu? (ÖNEMLİ!)
- [ ] Production environment seçili mi?
- [ ] Firebase config tek satır JSON formatında mı?
- [ ] Deploy yeniden yapıldı mı?

---

## 📝 Firebase Config Formatı

**YANLIŞ:**
```
VITE_FIREBASE_CONFIG = {
  "apiKey": "...",
  "authDomain": "..."
}
```

**DOĞRU:**
```
VITE_FIREBASE_CONFIG = {"apiKey":"...","authDomain":"...","projectId":"...","storageBucket":"...","messagingSenderId":"...","appId":"..."}
```

**ÖNEMLİ:** Tek satır, tırnak işaretleri escape edilmiş olmalı!

---

## 🆘 Hala Çalışmıyorsa

### 1. Browser Console'u Kontrol Edin
1. Vercel'deki sitenizi açın
2. F12 → Console sekmesi
3. Hata mesajlarını kontrol edin

### 2. Environment Variables'ı Test Edin
Vercel'de build loglarını kontrol edin:
1. **Deployments** → Son deployment → **Build Logs**
2. Environment variables'ın yüklendiğini kontrol edin

### 3. Vercel CLI ile Kontrol
```bash
vercel env ls
```

### 4. Manuel Test
Geçici olarak kodda test edin:
```javascript
console.log('Firebase Config:', import.meta.env.VITE_FIREBASE_CONFIG);
```

---

## ✅ Başarılı Olursa

- ✅ "Firebase config missing" hatası kaybolur
- ✅ Google Login butonu çalışır
- ✅ Firebase authentication aktif olur

---

## 📞 Hızlı Çözüm

1. Vercel → Settings → Environment Variables
2. `VITE_FIREBASE_CONFIG` ekle (tek satır JSON)
3. `VITE_GEMINI_KEY` ekle
4. Deployments → Redeploy
5. ✅ Çalışır!


# 🎥 StreamZone — NestJS bilan MP4 + HLS video striming


> 🇺🇿 HLS va MP4 formatda videolarni yuklash va uzatish  
> 🇬🇧 Upload and stream videos in HLS or MP4 format



## 📦 Texnologiyalar | Technologies

| 🇺🇿 O‘zbekcha            | 🇬🇧 English                  |
|------------------------|------------------------------|
| NestJS — backend ramka | NestJS — backend framework   |
| FFmpeg — HLS segmentlash | FFmpeg — HLS segmentation    |
| ServeStatic — statik xizmat | ServeStatic — static delivery |
| HLS.js — HLS videoni brauzerda o‘ynatish | HLS.js — stream playback |
| HTML/CSS/JS — interfeys | HTML/CSS/JS — UI frontend     |

---

## 🚀 Ishga tushirish | Getting Started

### 1. FFmpeg ni tekshirish | Check FFmpeg

```bash
ffmpeg -version
````

❗ Agar ishlamasa, [FFmpeg yuklab oling](https://www.gyan.dev/ffmpeg/builds/).
❗ If not installed, download [FFmpeg here](https://www.gyan.dev/ffmpeg/builds/).

---

### 2. NestJS backendni ishga tushiring | Run backend

```bash
npm install
npm run start
```

---

## 📁 Loyihaning tuzilmasi | Project structure

```
.
├── public/                # 🎨 Frontend fayllari (HTML, CSS, JS)
├── uploads/               # 📤 Yuklangan .mp4 videolar
├── hls/                   # 🧩 HLS segmentlar (.m3u8, .ts)
├── src/
│   └── video/             # 🎯 Video controller va service
└── main.ts
```

---

## 📤 Yuklash va ko‘rish | Upload & Play

| 🇺🇿                                      | 🇬🇧                            |
| ----------------------------------------- | ------------------------------- |
| Foydalanuvchi video yuklaydi              | User uploads a video            |
| `.mp4` `uploads/` ga tushadi              | `.mp4` goes to `uploads/`       |
| HLS rejimida `.m3u8` yaratiladi           | `.m3u8` is generated via FFmpeg |
| HLS yoki MP4 ni frontendda tanlash mumkin | User can toggle HLS or MP4      |

---

## 🖥 Frontend

`/public` ichida joylashgan:

* `index.html`
* `style.css`
* `script.js`

### ✨ Funksiyalar | Features

| 🇺🇿                             | 🇬🇧                     |
| -------------------------------- | ------------------------ |
| HLS va MP4 o‘rtasida tanlash     | HLS vs MP4 toggle switch |
| HLS.js orqali striming           | HLS.js streaming         |
| MP4 to‘g‘ridan-to‘g‘ri o‘ynatish | MP4 direct playback      |
| Responsive dizayn                | Mobile-friendly UI       |
| Foydalanuvchidan yuklash formasi | Upload form              |

---

## 📡 API Endpointlar | Endpoints

| URL                                   | Tavsif 🇺🇿 / Description 🇬🇧      |
| ------------------------------------- | ----------------------------------- |
| `GET /videos/list`                    | 📺 HLS video ro‘yxati / HLS list    |
| `GET /videos/list-mp4`                | 🎞 MP4 video ro‘yxati / MP4 list    |
| `POST /videos/upload`                 | 📤 HLS uchun video yuklash / upload |
| `GET /videos/stream/:name/index.m3u8` | HLS stream link                     |
| `GET /videos/mp4/:filename`           | MP4 video stream (direct)           |

---

## 🌐 Misol URL | Example Usage

```bash
http://localhost:3000/                         # 🌐 Frontend sahifa
http://localhost:3000/videos/list              # 📄 HLS ro‘yxat
http://localhost:3000/videos/list-mp4          # 🎞 MP4 ro‘yxat
http://localhost:3000/videos/stream/test/index.m3u8   # 📡 HLS link
http://localhost:3000/videos/mp4/test.mp4              # ▶️ MP4 to‘g‘ridan-to‘g‘ri uzatish
```

---

## ⚙ ServeStatic sozlamasi | ServeStatic config

NestJS `AppModule` faylida quyidagicha:

```ts
ServeStaticModule.forRoot([
  {
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/', // HTML sahifa
  },
  {
    rootPath: join(__dirname, '..', 'hls'),
    serveRoot: '/videos/stream', // HLS segmentlar
  },
  {
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/videos/mp4', // MP4 fayllar
  },
])
```

---

## ✅ Afzalliklar | Benefits

| 🇺🇿                             | 🇬🇧                       |
| -------------------------------- | -------------------------- |
| MP4 va HLS formatlar             | MP4 and HLS support        |
| Stream qilish imkoniyati         | Seamless streaming         |
| Yuklash va avtomatik segmentlash | Upload + auto-segmentation |
| Toggle bilan rejimni tanlash     | Toggle playback mode       |

---

## 🔮 Kelajakda qo‘shilishi mumkin | Optional Improvements

* 🔐 JWT autentifikatsiya
* ☁️ AWS S3 bilan integratsiya
* 📈 Video yuklash progress bar
* ⚡ React yoki NextJS frontend

---

💡 Takliflar yoki xatoliklar bo‘lsa: [Issues](https://github.com/MirjaxonQaxxarov/nestjs-video-steam/issues) yoki PR yuboring.
📬 Contact us for more improvements!


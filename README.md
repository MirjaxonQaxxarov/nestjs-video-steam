
# 🎥 StreamZone — NestJS + HLS Video Streaming

> 🇺🇿 NestJS orqali videoni yuklab, HLS formatda stream qilish (FFmpeg yordamida).  
> 🇬🇧 Upload video and stream with HLS format via NestJS and FFmpeg.



## 📦 Texnologiyalar | Technologies

| 🇺🇿 O‘zbekcha            | 🇬🇧 English                  |
|------------------------|------------------------------|
| NestJS — backend ramka | NestJS — backend framework   |
| FFmpeg — HLS segmentlash | FFmpeg — HLS segmentation    |
| HLS.js — frontendda o‘ynatish | HLS.js — frontend streaming |
| HTML/CSS/JS — chiroyli interfeys | HTML/CSS/JS — clean UI        |
| ServeStatic — static fayllar | ServeStatic — static files     |

---

## 🚀 Ishga tushirish | Getting Started

### 1. FFmpeg ni tekshirish | Check FFmpeg

```bash
ffmpeg -version
````

Agar ishlamasa, [FFmpeg yuklab oling](https://www.gyan.dev/ffmpeg/builds/).
If not installed, download it from [here](https://www.gyan.dev/ffmpeg/builds/).

---

### 2. NestJS backendni ishga tushiring | Run backend

```bash
npm install
npm run start
```

---

## 📁 Loyihaning tuzilmasi | Project structure

```
/backend
├── uploads/             # 🇺🇿 Yuklangan fayllar        | 🇬🇧 Uploaded files
├── hls/                 # 🇺🇿 Segmentlar va playlistlar | 🇬🇧 HLS segments
└── public/              # 🇺🇿 Frontend fayllar          | 🇬🇧 Frontend files
```

---

## 📤 Yuklash va o‘ynatish | Upload & Play

| 🇺🇿                                                    | 🇬🇧                                    |
| ------------------------------------------------------- | --------------------------------------- |
| Frontendda foydalanuvchi video yuklaydi                 | User uploads video from frontend        |
| Video `uploads/` papkaga tushadi                        | Video is saved in `uploads/`            |
| FFmpeg avtomatik `hls/` ichiga `.m3u8` va `.ts` bo‘ladi | FFmpeg converts to HLS (`.m3u8`, `.ts`) |

---

## 🖥 Frontend

`/public` ichida joylashgan: `index.html`, `style.css`, `script.js`

| 🇺🇿 Xususiyatlar       | 🇬🇧 Features           |
| ----------------------- | ----------------------- |
| HLS.js orqali stream    | Stream with HLS.js      |
| Video tanlash drop-down | Video selector dropdown |
| Fayl yuklash formasi    | Upload form             |
| Responsive dizayn       | Responsive design       |

---

## 📡 API Endpointlar | Endpoints

| URL                                   | Tavsif 🇺🇿 / Description 🇬🇧           |
| ------------------------------------- | ---------------------------------------- |
| `GET /videos/list`                    | 🎞️ Video ro‘yxatini olish / List videos |
| `POST /videos/upload`                 | 📤 Video yuklash / Upload video          |
| `GET /videos/stream/:name/index.m3u8` | 📺 Stream link for playback              |

---

## 🌐 Misol URL | Example URLs

```bash
http://localhost:3000/                        # Frontend sahifa / frontend
http://localhost:3000/videos/list            # Video ro‘yxati / video list
http://localhost:3000/videos/stream/film1/index.m3u8  # Stream HLS URL
```

---

## 🧱 ServeStatic sozlamasi | Static config

NestJS `ServeStaticModule`:

```ts
ServeStaticModule.forRoot([
  {
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/',
  },
  {
    rootPath: join(__dirname, '..', 'hls'),
    serveRoot: '/videos/stream',
  },
])
```

---

## ✅ Qulayliklar | Benefits

| 🇺🇿                              | 🇬🇧                         |
| --------------------------------- | ---------------------------- |
| Bir nechta videoni tanlash mumkin | Select from multiple videos  |
| Oddiy yuklash interfeysi          | Simple upload UI             |
| Avtomatik `.m3u8` yaratish        | Automatic `.m3u8` generation |
| Mobilga mos dizayn                | Mobile-friendly design       |

---

## 🧩 Qo‘shimcha imkoniyatlar | Optional Features

* 🔐 JWT autentifikatsiya / JWT Auth
* ☁️ AWS S3 integratsiyasi / S3 integration
* ⚙️ Video preview, progress bar, spinner
* 🧠 React versiyasi mavjud / React version available

---

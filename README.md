# 🌌 Astro — StoryLens Worlds

**Astro** adalah proyek eksploratif dan interaktif berbasis web yang menggabungkan jurnal pribadi, inspirasi visual, peta landmark dunia, dan pengalaman audio. Dirancang dengan gaya kosmik dan UI yang estetis, **Astro** bertujuan membantu pengguna menjelajahi dunia—baik luar maupun dalam diri.

---

## 🚀 Fitur Utama

### 📖 Chapter Progress
Visualisasi kemajuan per bab (chapter) dalam bentuk bar progres, memungkinkan pengguna melacak perjalanan eksploratif atau journaling mereka.

### 🎵 Music Box
Integrasi dengan Spotify. Pengguna dapat membagikan satu lagu favorit yang merepresentasikan mood mereka saat ini.

### 🔭 Astro Archive
Galeri grid berisi:
- Gambar luar angkasa (NASA atau karya sendiri)
- Kutipan inspiratif
- Modal pop-up berisi quote & detail

✨ **UI:** Grid `grid-cols-2` hingga `md:grid-cols-3`, dengan efek `hover:scale-105` dan `shadow-glow`.

### 🗺️ Cosmic Compass
Peta interaktif dunia nyata:
- Landmark terkenal dunia (7 Keajaiban Dunia, Eiffel, Louvre, NYC, Pantai & Gunung indah)
- Klik titik lokasi untuk menampilkan foto & informasi
- Progress bar jumlah landmark yang sudah dikunjungi/unlocked

🛠️ Dibuat menggunakan:
- React + Tailwind CSS  
- `react-simple-maps` untuk peta SVG interaktif  
- Modal ringan & responsif

---

## 📷 Screenshot

![Astro Screenshot](./public/screenshot.png)

---

## 📦 Teknologi yang Digunakan

- **React** — library UI modern berbasis komponen
- **Tailwind CSS** — utilitas styling untuk tampilan yang konsisten & cepat
- **Firebase Authentication** *(opsional)* — autentikasi pengguna
- **Vercel** — untuk deployment instan & cepat
- **react-simple-maps** — render SVG world map ringan
- **Spotify Embed API** — integrasi pemutar lagu

---

## ⚙️ Instalasi & Penggunaan

```bash
git clone https://github.com/username/astro-storylens-worlds.git
cd astro-storylens-worlds
npm install
npm run dev

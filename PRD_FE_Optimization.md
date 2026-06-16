# PRD: Frontend Performance Optimization

**Product:** Portfolio Website (resonant-maamoul-5c6539.netlify.app)  
**Type:** Performance Improvement  
**Status:** In Progress  
**Date:** 2026-06-11  
**Author:** -

---

## 1. Background & Problem Statement

Iterasi pertama optimasi telah dilakukan dengan migrasi gambar profil ke Cloudinary CDN. Hasil audit terbaru (local preview build, score **58**) menunjukkan peningkatan signifikan pada LCP, namun masih ada beberapa isu yang perlu diselesaikan.

### Riwayat Audit

| Metrik                   | Baseline (Local v1) | Baseline (Production v1) | Current (Local v2, +Cloudinary) |
| ------------------------ | ------------------- | ------------------------ | ------------------------------- |
| Lighthouse Score         | -                   | -                        | 58                              |
| First Contentful Paint   | 2.1 s               | 2.1 s                    | 1.9 s                           |
| Largest Contentful Paint | > 13 s              | > 13 s                   | **3.1 s** ✅                    |
| Total Blocking Time      | -                   | 480 ms                   | 530 ms                          |
| Cumulative Layout Shift  | -                   | -                        | **0.458** ❌                    |
| Speed Index              | 11.1 s              | 19.5 s                   | -                               |

**Progress:** LCP turun drastis dari >13 s ke 3.1 s berkat Cloudinary CDN + `fetchpriority="high"`. Namun CLS muncul sebagai isu baru dan TBT masih tinggi.

---

## 2. Goals

- Menurunkan **LCP** ke < 2.5 s (Good threshold) — saat ini 3.1 s, tinggal sedikit lagi
- Menurunkan **CLS** ke < 0.1 (Good threshold) — saat ini 0.458 (Poor)
- Menurunkan **TBT** ke < 200 ms — saat ini 530 ms
- Menghilangkan **render-blocking CSS** pada critical path
- Mencapai Lighthouse score **> 85**

---

## 3. Non-Goals

- Tidak menyentuh perubahan fitur atau UI
- Tidak migrasi framework/build tool
- Tidak mengoptimasi halaman selain halaman utama (landing/home)

---

## 4. Root Cause Analysis (Updated)

### 4.1 ✅ RESOLVED — LCP Element Render Delay

Sebelumnya LCP didominasi Element Render Delay >12 detik. Setelah migrasi ke Cloudinary + `fetchpriority="high"`, LCP turun ke 3.1 s. LCP request discovery sudah ✅ semua:

- `fetchpriority=high` applied ✅
- Request discoverable dari initial HTML ✅
- Tidak menggunakan `loading=lazy` ✅

### 4.2 ❌ CLS Tinggi — Blob Animation Element

**CLS Score: 0.458 (Poor — threshold Good: < 0.1)**

Layout shift culprit:

```
div.absolute.top-[10%].left-[5%].w-112.5.h-112.5.rounded-full
  .bg-primary/7.blur-[120px].will-change-transform.bg-animate-blob-1
→ Layout shift score: 0.458
```

Elemen blob animasi latar belakang menyebabkan hampir seluruh CLS. Meskipun sudah pakai `will-change-transform`, elemen ini masih shifting saat halaman load. Kemungkinan penyebab:

- Elemen tidak punya dimensi eksplisit yang stabil saat render awal
- Animasi CSS trigger layout (bukan hanya composite layer)
- `blur-[120px]` bisa trigger reflow karena filter effect mempengaruhi bounding box

### 4.3 ❌ Gambar Profil Oversized untuk Display Size

```
Uploaded:  600x800 px  (53.9 KiB via Cloudinary)
Displayed: 283x378 px
Est. savings: 41.9 KiB
```

Cloudinary sudah dipakai tapi URL transformation belum diset dengan benar — gambar masih di-serve ukuran 800px padahal displayed hanya 283px. Solusinya cukup ubah URL parameter Cloudinary.

### 4.4 ❌ Render-Blocking CSS

`/assets/index-CyJLhSQX.css` (15.4 KiB) masih blocking render dengan durasi **310 ms** di local — naik dari 80 ms sebelumnya (kemungkinan CSS lebih besar setelah refactor).

### 4.5 ❌ Total Blocking Time Masih Tinggi

TBT 530 ms, didominasi:

```
Main-thread work breakdown:
  Other:                    2,129 ms
  Script Evaluation:        1,381 ms
  Style & Layout:             827 ms
  Script Parsing & Compile:   193 ms
  Rendering:                  148 ms
```

Sumber JS terbesar:

- `vendor-react-*.js` (67.5 KiB, 1,503 ms CPU) — unused ~22.8 KiB
- `index-BIqLdo5b.js` (15.83 KiB, 873 ms CPU)

Forced reflow masih ada dari `vendor-react-*.js:2` (65 ms) dan `index-BIqLdo5b.js:2` (9 ms).

### 4.6 ❌ Non-Composited Animations

**22 animated elements** yang tidak berjalan di compositor thread. Ini menyebabkan main thread harus terlibat setiap frame animasi → berkontribusi ke TBT dan jank.

Animasi yang aman di compositor: hanya `transform` dan `opacity`. Animasi lain (width, height, top, left, background, blur, dll.) trigger layout/paint.

---

## 5. Proposed Solutions (Updated)

### P0 — Wajib (Dampak Tinggi)

#### 5.1 Fix CLS — Stabilkan Blob Animation Element

**Masalah:** `div` blob animasi shift saat load dengan CLS score 0.458.

**Fix opsi A — Reserve space eksplisit:**
Pastikan elemen blob punya `position: absolute` dan dimensi yang tidak berubah saat load. Jangan biarkan ada property yang berubah dari default ke animated value di frame pertama.

```jsx
// Pastikan initial state = animated state
// Jangan animasikan dari 'tidak ada' ke 'ada'
<div
  className="absolute top-[10%] left-[5%] w-[112.5px] h-[112.5px] 
             rounded-full bg-primary/7 blur-[120px] will-change-transform"
  style={{ transform: "translateZ(0)" }} // force GPU layer dari awal
/>
```

**Fix opsi B — Pindahkan blob ke `position: fixed` atau pastikan tidak mempengaruhi layout:**

Elemen `absolute` masih bisa mempengaruhi layout jika parent-nya tidak punya `position: relative` yang stabil. Pastikan wrapper punya `overflow: hidden` dan dimensi fixed.

**Fix opsi C — Delay animasi hingga setelah LCP:**

```jsx
// Sembunyikan blob sampai halaman selesai load
const [mounted, setMounted] = useState(false);
useEffect(() => {
  requestIdleCallback(() => setMounted(true));
}, []);

return mounted ? <BlobBackground /> : null;
```

#### 5.2 Fix Cloudinary URL — Responsive Image

Gambar profil masih di-serve 600x800 padahal displayed 283x378. Ubah URL Cloudinary untuk auto-resize:

```
// Sebelum (tidak efisien)
.../v178.../fp_profile_800_hmpzfd.webp

// Sesudah — tambahkan transformation parameter
.../c_fill,w_400,h_533,q_auto,f_auto/fp_profile_800_hmpzfd.webp
```

Parameter:

- `c_fill` — crop mode fill
- `w_400,h_533` — 2x dari displayed size (283x378) untuk retina
- `q_auto` — kualitas otomatis
- `f_auto` — format terbaik (AVIF/WebP by browser)

Target size: < 12 KiB (dari 53.9 KiB saat ini).

#### 5.3 Fix Non-Composited Animations

Audit 22 animated elements. Animasi yang menyebabkan non-composited warning biasanya mengubah property selain `transform`/`opacity`.

```css
/* ❌ Trigger layout — non composited */
@keyframes blob {
  0% {
    width: 100px;
  }
  50% {
    width: 150px;
  }
}

/* ✅ Compositor only */
@keyframes blob {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
```

Untuk blur animation: ganti `filter: blur()` animation dengan `transform: scale()` + static blur, karena animating filter tidak composited.

---

### P1 — Disarankan (Dampak Sedang)

#### 5.4 Defer / Inline Critical CSS

`/assets/index-CyJLhSQX.css` (15.4 KiB) masih blocking 310 ms.

```html
<!-- Inline critical CSS -->
<style>
  /* above-fold styles saja */
</style>

<!-- Defer non-critical -->
<link
  rel="preload"
  href="/assets/index.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/assets/index.css" /></noscript>
```

Tools: `vite-plugin-critical` untuk otomasi ekstraksi critical CSS.

#### 5.5 Preload Font

Font `inter-latin-wght-normal.woff2` belum di-preload.

```html
<link
  rel="preload"
  href="/fonts/inter-latin-wght-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

#### 5.6 Tambah Preconnect ke Cloudinary

```html
<link rel="preconnect" href="https://res.cloudinary.com" />
```

---

### P2 — Nice to Have

#### 5.7 Tree-shake Vendor Bundle

`vendor-react-*.js` (67.5 KiB) masih ada ~22.8 KiB unused. Audit dengan:

```bash
npx vite-bundle-visualizer
```

Pertimbangkan manual chunk splitting di `vite.config.ts`:

```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-core': ['react', 'react-dom'],
        'animations': ['framer-motion'], // jika dipakai
      }
    }
  }
}
```

---

## 6. Implementation Plan (Updated)

| No    | Task                                             | Priority | Effort | Status  |
| ----- | ------------------------------------------------ | -------- | ------ | ------- |
| ~~1~~ | ~~Migrasi gambar ke Cloudinary CDN~~             | ~~P0~~   | ~~S~~  | ✅ Done |
| ~~2~~ | ~~Tambah `fetchpriority="high"` pada LCP image~~ | ~~P0~~   | ~~S~~  | ✅ Done |
| 3     | Fix CLS — stabilkan blob animation element       | P0       | M      | 🔲 Todo |
| 4     | Fix Cloudinary URL — responsive transformation   | P0       | S      | 🔲 Todo |
| 5     | Fix non-composited animations (22 elements)      | P0       | M      | 🔲 Todo |
| 6     | Defer / inline critical CSS                      | P1       | M      | 🔲 Todo |
| 7     | Preload font woff2                               | P1       | S      | 🔲 Todo |
| 8     | Preconnect ke Cloudinary                         | P1       | S      | 🔲 Todo |
| 9     | Tree-shake vendor bundle                         | P2       | L      | 🔲 Todo |

**Estimasi effort:** S = < 1 jam, M = 1–4 jam, L = > 4 jam

---

## 7. Success Metrics

| Metrik           | Baseline v1 | Current v2 | Target   |
| ---------------- | ----------- | ---------- | -------- |
| Lighthouse Score | -           | 58         | > 85     |
| FCP              | 2.1 s       | 1.9 s      | < 1.5 s  |
| LCP              | > 13 s      | 3.1 s      | < 2.5 s  |
| TBT              | 480 ms      | 530 ms     | < 200 ms |
| CLS              | -           | 0.458      | < 0.1    |

---

## 8. Notes

- Audit v2 dilakukan di **local preview build** dengan ekstensi aktif (Loom, React DevTools) — TBT real di production kemungkinan lebih rendah ~200 ms
- Unused JS dari ekstensi browser bukan tanggung jawab kita
- Setelah implementasi P0, lakukan audit ulang di **production + incognito** untuk hasil yang akurat
- CLS 0.458 adalah isu kritis yang harus diselesaikan sebelum deploy production — ini termasuk kategori **Poor** menurut Core Web Vitals Google

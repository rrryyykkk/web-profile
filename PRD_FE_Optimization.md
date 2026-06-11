# PRD — Frontend Performance Optimization

**Portfolio Website — Lighthouse Audit Remediation**

|             |                                            |
| ----------- | ------------------------------------------ |
| Tanggal     | Juni 2026                                  |
| Versi       | 5.0 — Production Audit #5                  |
| Stack       | React + Vite + Tailwind                    |
| Environment | Production (`vite build` + `vite preview`) |

---

## 1. Progress Tracker

| Task                            | Status     | Impact             |
| ------------------------------- | ---------- | ------------------ |
| OPT-00 Fix CLS light-blob-1     | ✅ Done    | —                  |
| OPT-02 Fix react-icons          | ✅ Done    | 4 MB → 83 KB 🎉    |
| OPT-03 Resize gambar            | ✅ Done    | 269 KB → 20 KB ✅  |
| OPT-06 Font preload + swap      | ✅ Done    | —                  |
| OPT-08 Lazy load sections       | ✅ Done    | Bundle split ✅    |
| OPT-01 Production build         | ✅ Done    | Minifikasi ✅      |
| OPT-CLS2 Fix blob-2             | ✅ Partial | CLS 0.987 → 0.709  |
| **OPT-CLS3 Fix blob-1 animasi** | ❌ Belum   | **CLS 0.709 → ~0** |
| **OPT-GF Hapus Google Fonts**   | ❌ Belum   | **FCP/LCP -230ms** |
| OPT-PRELOAD Preload LCP image   | ❌ Belum   | LCP -100ms         |

---

## 2. Metrics History

| Metric           | Audit #1 Dev | Audit #3 Dev | Audit #4 Prod | **Audit #5 Prod**   | Target   |
| ---------------- | ------------ | ------------ | ------------- | ------------------- | -------- |
| Lighthouse Score | ~44          | ~62          | ~65-70        | **77**              | ≥ 85     |
| CLS              | —            | 0            | 0.891         | **0.709** 🔴        | ≤ 0.1    |
| TBT              | —            | 0 ms         | 0 ms ✅       | 0 ms ✅             | ≤ 200 ms |
| Total JS         | ~4.2 MB      | ~4.0 MB      | ~83 KB ✅     | ~83 KB ✅           | ≤ 500 KB |
| Render-blocking  | —            | —            | 80 ms         | **310 ms** (CSS+GF) | 0 ms     |

---

## 3. Issue Breakdown — Audit #5

| Issue                               | Sumber                      | Est. Savings         | Prioritas   | Status   |
| ----------------------------------- | --------------------------- | -------------------- | ----------- | -------- |
| **CLS 0.709 — bg-animate-blob-1**   | `beams-background.tsx`      | **+20-25 pts score** | 🔴 CRITICAL | ❌ Belum |
| **Google Fonts render-blocking**    | `fonts.googleapis.com`      | FCP/LCP **-230ms**   | 🔴 CRITICAL | ❌ Belum |
| CSS render-blocking                 | `/assets/index.css` 15.5 KB | -80 ms               | 🟠 HIGH     | ❌ Belum |
| Unused preconnect fonts.gstatic.com | `<link rel=preconnect>`     | Minor                | 🟢 MEDIUM   | ❌ Belum |
| Gambar bisa dikompresi lebih        | `fp_profile_400.webp` 20 KB | -5.6 KB              | 🟢 LOW      | ❌ Belum |
| Unused JS — Chrome extensions       | Loom, DevTools              | 147 KB               | ℹ️ External | Ignore   |

---

## 4. Root Cause Analysis

### 4.1 CLS 0.709 — bg-animate-blob-1 (Blocker #1)

Sekarang giliran blob-1 yang CLS:

```
div.absolute.top-[10%].left-[5%].w-112.5.h-112.5.rounded-full
  .bg-primary/7.blur-[120px].bg-animate-blob-1.will-change-transform
```

Pola yang sama dengan blob-2 sebelumnya. Ada `will-change-transform` tapi CLS tetap terjadi. Root cause yang paling likely: **animasi CSS mengubah posisi elemen di frame pertama** sehingga browser mendeteksinya sebagai layout shift.

Perlu dicek: apakah semua blob (`blob-1`, `blob-2`, dst) punya animasi yang dimulai dari state yang sama dengan posisi default elemen. Kalau animasinya pakai `translate` dari nilai non-zero di keyframe `0%`, itu yang jadi CLS.

### 4.2 Google Fonts Render-Blocking 230ms (Blocker #2 Baru)

Ada request ke `fonts.googleapis.com` yang **block render selama 230ms** — ini request baru yang tidak ada di audit sebelumnya. Kemungkinan ada komponen baru yang pakai Google Fonts, atau ada `@import url('https://fonts.googleapis.com/...')` di CSS.

Total render-blocking sekarang: CSS 80ms + Google Fonts 230ms = **310ms** — cukup signifikan untuk FCP dan LCP.

Fix: self-host font atau hapus Google Fonts import, karena Inter sudah di-self-host di `/fonts/inter-latin-wght-normal.woff2`.

### 4.3 Unused Preconnect

Ada dua `<link rel=preconnect>` ke `fonts.googleapis.com` dan `fonts.gstatic.com` yang di-flag sebagai unused. Ini terkait langsung dengan isu Google Fonts di atas — kalau Google Fonts dihapus, preconnect-nya juga harus ikut dihapus.

---

## 5. Task List — Menuju 85+

### Harus Dikerjakan 🔴 (Estimasi: 30-60 menit)

| Task ID      | Deskripsi                          | Teknik                            | Target         | Effort |
| ------------ | ---------------------------------- | --------------------------------- | -------------- | ------ |
| **OPT-CLS3** | **Fix CLS semua blob animasi**     | Fix keyframe 0% = posisi default  | CLS → ≤ 0.1    | Low    |
| **OPT-GF**   | **Hapus Google Fonts / self-host** | Remove `@import` Google Fonts     | FCP/LCP -230ms | Low    |
| **OPT-PC**   | **Hapus unused preconnect**        | Remove `<link rel=preconnect>` GF | Clean warning  | Low    |

### Nice to Have 🟡 (Estimasi: 30 menit)

| Task ID     | Deskripsi                       | Teknik                        | Target     | Effort |
| ----------- | ------------------------------- | ----------------------------- | ---------- | ------ |
| OPT-PRELOAD | Preload LCP image di index.html | `<link rel=preload as=image>` | LCP -100ms | Low    |
| OPT-IMG2    | Tingkatkan kompresi gambar      | quality 75 dari 82            | -5.6 KB    | Low    |

---

## 6. Implementation Detail

### OPT-CLS3: Fix Semua Blob Animasi

Problem: animasi blob mulai dari posisi/scale berbeda di keyframe `0%`, browser baca itu sebagai shift.

**Step 1** — Cek semua keyframe animasi blob di CSS/Tailwind config:

```css
/* Cari di tailwind.config.ts atau index.css */
@keyframes blob-1 { ... }
@keyframes blob-2 { ... }
```

**Fix** — Pastikan `0%` dan `100%` identik, dan nilai `0%` = posisi default elemen (tidak ada translate/scale):

```css
/* ❌ SEBELUM — keyframe 0% beda dari posisi default */
@keyframes blob-1 {
  0% {
    transform: translate(20px, -10px) scale(1.05);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.95);
  }
  100% {
    transform: translate(20px, -10px) scale(1.05);
  }
}

/* ✅ SESUDAH — 0% selalu dimulai dari posisi default (no transform) */
@keyframes blob-1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -15px) scale(1.05);
  }
  66% {
    transform: translate(-15px, 20px) scale(0.95);
  }
}
```

**Kalau masih CLS** — disable animasi sampai setelah first paint:

```tsx
// beams-background.tsx
const [mounted, setMounted] = useState(false)

useEffect(() => {
  // Delay animasi sampai setelah hydration
  const timer = setTimeout(() => setMounted(true), 100)
  return () => clearTimeout(timer)
}, [])

// Blob element
<div
  className={`absolute top-[10%] left-[5%] w-112.5 h-112.5
    rounded-full bg-primary/7 blur-[120px] will-change-transform
    ${mounted ? 'bg-animate-blob-1' : ''}`}
  aria-hidden="true"
/>
```

---

### OPT-GF: Hapus Google Fonts Render-Blocking

Cari dan hapus semua referensi Google Fonts — Inter sudah di-self-host, tidak perlu Google Fonts lagi.

**Cek di `index.html`:**

```html
<!-- ❌ Hapus ini kalau ada -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Cek di `index.css` atau file CSS lain:**

```css
/* ❌ Hapus ini kalau ada */
@import url("https://fonts.googleapis.com/css2?family=Inter...");
```

**Pastikan self-hosted font sudah dikonfigurasi dengan benar:**

```css
/* index.css — pastikan ini ada dan path-nya benar */
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/inter-latin-wght-normal.woff2") format("woff2");
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
    U+2020, U+2022, U+2026, U+2030, U+2039-203A, U+2044, U+20AC, U+2122, U+2212,
    U+2215;
}
```

**Hapus juga preconnect yang jadi unused setelah Google Fonts dihapus:**

```html
<!-- ❌ Hapus kedua baris ini dari index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

---

### OPT-PRELOAD: Preload LCP Image

```html
<!-- index.html — taruh di <head>, sebelum CSS -->
<link
  rel="preload"
  as="image"
  href="/fp_profile_400.webp"
  fetchpriority="high"
/>
```

---

## 7. Expected Results

| Metric               | Sekarang (Prod, Skor 77) | Setelah Fix CLS + GF | Setelah Semua | Target   |
| -------------------- | ------------------------ | -------------------- | ------------- | -------- |
| CLS                  | 0.709                    | **≤ 0.1**            | ≤ 0.05        | ≤ 0.1    |
| Render-blocking      | 310 ms                   | **~80 ms**           | ~0 ms         | 0 ms     |
| TBT                  | 0 ms ✅                  | 0 ms ✅              | 0 ms ✅       | ≤ 200 ms |
| Total JS             | ~83 KB ✅                | ~83 KB ✅            | ~83 KB ✅     | ≤ 500 KB |
| **Lighthouse Score** | **77**                   | **~88-92**           | **≥ 90**      | **≥ 85** |

---

## 8. Urutan Eksekusi Sekarang

```
1. OPT-GF   →  Hapus Google Fonts import + preconnect (10 menit)
2. OPT-CLS3 →  Fix keyframe blob-1 animasi (20 menit)
3. vite build && vite preview → audit ulang
4. Kalau skor ≥ 85 → DONE ✅
5. Kalau CLS masih ada → pakai delay mounted trick
6. OPT-PRELOAD → preload LCP image (5 menit)
```

> 💡 **Skor 77 → 85+ tinggal 2 fix**: hapus Google Fonts (-230ms render blocking) dan fix animasi blob-1 (CLS 0.709 → 0). Dua hal ini estimasi ~30 menit total.

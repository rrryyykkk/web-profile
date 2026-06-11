# PRD — Frontend Performance Optimization

**Portfolio Website — Lighthouse Audit Remediation**

|             |                                                |
| ----------- | ---------------------------------------------- |
| Tanggal     | Juni 2026                                      |
| Versi       | 4.0 — Post Production Build                    |
| Stack       | React + Vite + Tailwind                        |
| Environment | **Production** (`vite build` + `vite preview`) |

---

## 1. Progress Tracker

| Task                        | Status   | Impact                    |
| --------------------------- | -------- | ------------------------- |
| OPT-00 Fix CLS light-blob-1 | ✅ Done  | CLS partial fix           |
| OPT-02 Fix react-icons      | ✅ Done  | **4 MB → 83 KB** 🎉       |
| OPT-03 Resize gambar        | ✅ Done  | 269 KB → 54 KB            |
| OPT-06 Font preload + swap  | ✅ Done  | —                         |
| OPT-08 Lazy load sections   | ✅ Done  | Bundle split per section  |
| OPT-01 Production build     | ✅ Done  | Minifikasi + tree shaking |
| **OPT-CLS2 Fix blob-2 CLS** | ❌ Belum | **CLS 0.891 → 0**         |
| OPT-05 Resize gambar 400px  | ❌ Belum | -25 KB                    |
| OPT-CSS Inline critical CSS | ❌ Belum | FCP -40ms                 |

---

## 2. Metrics History

| Metric           | Audit #1 Dev | Audit #2 Dev | Audit #3 Dev | **Audit #4 Prod** | Target   |
| ---------------- | ------------ | ------------ | ------------ | ----------------- | -------- |
| Lighthouse Score | ~44          | 44           | ~62          | **~?**            | ≥ 85     |
| FCP              | 2.1 s        | 2.0 s        | 2.4 s        | —                 | ≤ 1.8 s  |
| LCP              | 4.0 s        | 3.6 s        | 3.8 s        | —                 | ≤ 2.5 s  |
| Speed Index      | 2.7 s        | 2.3 s        | 5.3 s        | —                 | ≤ 2.0 s  |
| TBT              | —            | 60 ms        | 0 ms ✅      | —                 | ≤ 200 ms |
| CLS              | —            | 0.987        | 0            | **0.891** 🔴      | ≤ 0.1    |
| Total JS         | ~4.2 MB      | ~4.0 MB      | ~4.0 MB      | **~83 KB** ✅     | ≤ 500 KB |

---

## 3. Issue Breakdown — Production Build

| Issue                               | File / Sumber                | Est. Savings         | Prioritas   | Status   |
| ----------------------------------- | ---------------------------- | -------------------- | ----------- | -------- |
| **CLS 0.891 — bg-animate-blob-2**   | `beams-background.tsx`       | **+25-30 pts score** | 🔴 CRITICAL | ❌ Belum |
| Render-blocking CSS                 | `/assets/index-D14pdXaN.css` | FCP -40ms            | 🟠 HIGH     | ❌ Belum |
| Gambar oversize (600×600 → 378×504) | `fp_profile_800.webp`        | ~25 KB               | 🟠 HIGH     | ❌ Belum |
| Unused JS — Chrome extensions       | Loom, React DevTools         | 147 KB               | ℹ️ External | Ignore   |
| Critical CSS render-blocking        | `index.css` 15.5 KB          | 80ms                 | 🟢 MEDIUM   | ❌ Belum |

> ℹ️ **Unused JS dari Chrome extensions** (Loom, React DevTools) bukan dari kode lo — abaikan, tidak perlu dioptimasi.

---

## 4. Root Cause Analysis

### 4.1 CLS 0.891 — bg-animate-blob-2 (BLOCKER UTAMA)

Blob **kedua** yang berbeda dari yang kemarin. Culprit sekarang:

```
div.absolute.bottom-[20%].right-[10%].w-125.h-125.rounded-full
  .bg-secondary/7.blur-[140px].bg-animate-blob-2.will-change-transform
```

Sudah ada `will-change-transform` tapi CLS tetap terjadi. Kemungkinan penyebab:

- Class `bg-animate-blob-2` adalah CSS animation yang mengubah `transform` atau `opacity` saat pertama load — kalau animasi dimulai dari posisi berbeda, browser hitung itu sebagai layout shift
- `w-125 h-125` adalah custom Tailwind size — kalau ini di-resolve setelah hydration, ukurannya bisa berubah
- `bg-secondary/7` pakai CSS variable yang mungkin belum tersedia saat first paint (next-themes dark/light switch)

### 4.2 Render-blocking CSS (15.5 KB)

File `/assets/index-D14pdXaN.css` block render selama **80ms**. Di production, semua CSS Tailwind sudah di-purge dan dikompres jadi 15.5 KB — ini kecil, tapi masih blocking FCP karena browser harus download dan parse CSS sebelum bisa paint apapun.

Opsi: inline critical CSS (above-the-fold styles) langsung di `<head>`, load sisanya async. Tapi untuk portfolio ini, 80ms saving mungkin tidak signifikan — **prioritas rendah**.

### 4.3 Gambar Masih Bisa Diperkecil

Di production, gambar ditampilkan di 378×504 px tapi file yang di-serve adalah 600×600 (54 KB). Bisa diperkecil ke 400×400 max untuk saving ~25 KB.

---

## 5. Task List — Production Optimization

### Harus Dikerjakan 🔴 (Estimasi: 30-60 menit)

| Task ID      | Deskripsi                              | Teknik                         | Target      | Effort |
| ------------ | -------------------------------------- | ------------------------------ | ----------- | ------ |
| **OPT-CLS2** | **Fix CLS blob-2 (bg-animate-blob-2)** | Fix animation origin + CSS var | CLS → ≤ 0.1 | Low    |

### Nice to Have 🟡 (Estimasi: 1-2 jam)

| Task ID     | Deskripsi                       | Teknik                        | Target       | Effort |
| ----------- | ------------------------------- | ----------------------------- | ------------ | ------ |
| OPT-05      | Resize gambar ke 400px max      | Sharp CLI                     | Image -25 KB | Low    |
| OPT-CSS     | Inline critical CSS             | Vite plugin atau manual       | FCP -40ms    | Medium |
| OPT-PRELOAD | Preload LCP image di index.html | `<link rel=preload as=image>` | LCP -100ms   | Low    |

---

## 6. Implementation Detail

### OPT-CLS2: Fix CLS bg-animate-blob-2

Ada beberapa kemungkinan fix, coba dari yang paling mudah dulu:

**Fix 1 — Pastikan animasi tidak ubah transform di keyframe awal**

Kalau `bg-animate-blob-2` adalah custom Tailwind animation, cek definisinya di CSS/config:

```css
/* ❌ Kalau animasi mulai dari transform yang berbeda */
@keyframes blob-2 {
  0% {
    transform: translate(0, 0) scale(1);
  } /* posisi awal berbeda */
  50% {
    transform: translate(30px, -20px) scale(1.1);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

/* ✅ Pastikan state awal (0%) = state default elemen */
@keyframes blob-2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -20px) scale(1.1);
  }
}
```

**Fix 2 — Tambahkan `animation-fill-mode: backwards` diganti `forwards`**

```css
.bg-animate-blob-2 {
  animation: blob-2 8s ease-in-out infinite;
  animation-fill-mode: none; /* jangan pakai forwards/backwards */
}
```

**Fix 3 — Delay animasi sampai halaman selesai load**

```tsx
// Jangan langsung animasi, kasih delay
<div
  className="absolute bottom-[20%] right-[10%] w-125 h-125
             rounded-full bg-secondary/7 blur-[140px] will-change-transform"
  style={{ animationDelay: "1s" }} // delay 1s setelah load
  aria-hidden="true"
/>
```

**Fix 4 — Cek next-themes hydration mismatch**

`bg-secondary/7` menggunakan CSS variable dari theme. Kalau next-themes belum inject variable-nya saat SSR/first paint, warna bisa berubah setelah hydration dan trigger layout recalculation.

```tsx
// Tambahkan suppressHydrationWarning di html tag (jika pakai Next.js)
// atau pastikan default theme sudah di-set sebelum paint pertama

// Di main.tsx / root, pastikan theme attribute sudah ada sebelum render:
<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
```

---

### OPT-05: Resize Gambar ke 400px

Displayed size di production: **378×504** — berarti 400px sudah lebih dari cukup.

```bash
# Resize 800px → 400px untuk main serving
sharp -i fp_profile.webp -o fp_profile_400.webp resize 400 400 --fit inside --quality 82
```

Update di komponen Hero:

```tsx
<img
  src="/fp_profile_400.webp"
  srcSet="/fp_profile_300.webp 300w, /fp_profile_400.webp 400w"
  sizes="(max-width: 768px) 300px, 400px"
  fetchPriority="high"
  width={320}
  height={320}
  alt="Rezky Mubarok"
/>
```

---

### OPT-PRELOAD: Preload LCP Image

```html
<!-- index.html — di dalam <head>, sebelum CSS -->
<link
  rel="preload"
  as="image"
  href="/fp_profile_400.webp"
  fetchpriority="high"
/>
```

---

## 7. Expected Results — Production

| Metric               | Sekarang (Prod) | Setelah OPT-CLS2 | Setelah Semua | Target   |
| -------------------- | --------------- | ---------------- | ------------- | -------- |
| CLS                  | 0.891           | **≤ 0.1**        | ≤ 0.05        | ≤ 0.1    |
| TBT                  | 0 ms ✅         | 0 ms ✅          | 0 ms ✅       | ≤ 200 ms |
| Total JS             | ~83 KB ✅       | ~83 KB ✅        | ~83 KB ✅     | ≤ 500 KB |
| FCP                  | —               | —                | ≤ 1.8 s       | ≤ 1.8 s  |
| LCP                  | —               | —                | ≤ 2.5 s       | ≤ 2.5 s  |
| **Lighthouse Score** | **~65-70 est.** | **~85-90**       | **≥ 90**      | **≥ 85** |

> CLS 0.891 sendirian menyebabkan ~25 poin penalti. Fix CLS2 saja sudah cukup untuk menembus 85+.

---

## 8. Urutan Eksekusi Sekarang

```
1. OPT-CLS2  →  Fix bg-animate-blob-2 (coba Fix 1 dulu, lalu audit)
2. vite build && vite preview  →  Audit ulang
3. Kalau skor ≥ 85 → DONE ✅
4. Kalau belum → OPT-PRELOAD (15 menit) → audit lagi
5. OPT-05 → resize gambar kalau masih ada penalti image
```

> 💡 **JS bundle sudah beres total** — dari 4 MB ke 83 KB adalah win terbesar. Sekarang tinggal CLS blob saja yang jadi satu-satunya blocker untuk skor 85+.

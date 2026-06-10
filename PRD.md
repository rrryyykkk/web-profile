# PRD — Personal Web Profile (Rezky Mubarok)

---

## Overview

Web profile satu halaman untuk Rezky Mubarok, Junior Full-Stack Developer, ditujukan untuk recruiter dan perusahaan. Dibangun dengan React + TypeScript, Tailwind CSS v4, shadcn/ui, tanpa routing karena single page.

---

## Goals

- Menampilkan identitas dan kemampuan teknis secara profesional kepada recruiter
- Menarik perhatian dalam 5 detik pertama lewat hero section yang kuat
- Semua konten mudah diupdate tanpa ubah struktur komponen
- Responsive di mobile dan desktop
- Support dark/light mode, base dark

---

## Tech Stack Project

| Layer        | Tech                            |
| ------------ | ------------------------------- |
| Framework    | React + TypeScript (Vite)       |
| Styling      | Tailwind CSS v4 + shadcn/ui     |
| Font         | Inter Variable                  |
| Icons        | Lucide React                    |
| Animation    | tw-animate-css + CSS transition |
| Contact form | Formspree / EmailJS             |
| Deploy       | Vercel / Netlify                |

---

## Color System

| Token          | Hex       | Kegunaan                    |
| -------------- | --------- | --------------------------- |
| `--primary`    | `#0EA5E9` | CTA, link, highlight utama  |
| `--secondary`  | `#6366F1` | Tag, accent, depth          |
| `--accent`     | `#10B981` | Badge status, success state |
| `--background` | `#0A0A0F` | Base page                   |
| `--card`       | `#111118` | Surface card                |

CSS variables untuk shadcn/ui (`index.css`):

```css
:root {
  --primary: oklch(0.598 0.2 220); /* #0EA5E9 */
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.537 0.22 264); /* #6366F1 */
  --secondary-foreground: oklch(0.985 0 0);
  --accent: oklch(0.659 0.17 162); /* #10B981 */
  --accent-foreground: oklch(0.985 0 0);
}

.dark {
  --primary: oklch(0.598 0.2 220);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.537 0.22 264);
  --secondary-foreground: oklch(0.985 0 0);
  --accent: oklch(0.659 0.17 162);
  --accent-foreground: oklch(0.985 0 0);
}
```

---

## Sections & Content

### 1. Navbar

- Logo: `rezky.dev` atau inisial `RM`
- Links: About · Experience · Projects · Skills · Contact
- CTA button: "Hire me" → scroll ke Contact
- Sticky, blur background saat scroll
- Mobile: hamburger menu

### 2. Hero

- Foto profil (gunakan foto dari CV)
- Badge: "Open to work" (green dot)
- Heading: **Rezky Mubarok**
- Subheading: Junior Full-Stack Developer
- Deskripsi 2 kalimat, tone profesional
- 2 CTA: "View Projects" (primary) + "Download CV" (outline)
- Kontak cepat: ikon GitHub · LinkedIn · Email

### 3. About

- Paragraf 3–4 kalimat:
  - Background: S1 Informatika UNUGHA Cilacap, 2022–sekarang, GPA 3.85/4.00
  - Fokus: full-stack web, REST API, autentikasi, immersive web (WebXR/WebVR)
  - Pengalaman: magang PT Winnicode Indonesia, freelance, riset WebVR
- 3 stat card:
  - `3+` Years coding
  - `5+` Projects shipped
  - `3.85` GPA

### 4. Experience

Timeline vertikal, urut terbaru ke terlama:

| #   | Role                                  | Tempat                                 | Periode             |
| --- | ------------------------------------- | -------------------------------------- | ------------------- |
| 1   | Full-Stack Developer                  | PT Winnicode Indonesia                 | Feb 2025 – Jul 2025 |
| 2   | Full-Stack Developer (Riset)          | Mind Platform – Web VR                 | Ongoing             |
| 3   | Frontend Developer                    | PT Juwara Unggas Nusantara (Freelance) | Project-based       |
| 4   | Frontend Developer (Studi Independen) | MSIB – Hacktiv8                        | Sep – Des 2024      |

Per item: role, tempat, periode, 2–3 bullet highlight, link live site/github jika ada.

### 5. Projects

| Project            | Deskripsi                                                                    | Stack                               | Link                                    |
| ------------------ | ---------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------- |
| Portal Berita      | Web portal berita dengan auth Firebase, role admin/user, upload Cloudinary   | React, Node.js, Express, Cloudinary | https://github.com/rryyykkk/Portal_News |
| YuSmart E-Commerce | E-commerce dengan Redux state management dan Firebase Auth                   | React, Redux, Firebase              | https://e-comerce-yusmart.netlify.app/  |
| Mind Platform      | Platform WebVR untuk asesmen kognitif lansia, admin panel, role-based access | React, Three.js, WebVR, Express     | https://mind-platform.id/               |
| Juwara Unggas      | Landing page perusahaan, SEO, WhatsApp & email integration                   | React / Next.js                     | https://juwaraunggasnusantara.com/      |

Per card: nama, deskripsi singkat, badge stack, tombol GitHub + Live Demo.

### 6. Skills

| Kategori  | Item                                               |
| --------- | -------------------------------------------------- |
| Languages | JavaScript, TypeScript, PHP, Rust, Python          |
| Frontend  | React, Next.js, Three.js (WebXR/WebVR)             |
| Backend   | Node.js, Express, Laravel, CodeIgniter, Flask      |
| Styling   | Tailwind CSS, Bootstrap, Bulma, shadcn/ui, daisyUI |
| Database  | PostgreSQL, MongoDB, MySQL, Redis, Firebase        |
| Desktop   | Tauri                                              |
| Realtime  | Socket.io                                          |
| DevOps    | Netlify, VPS (bare metal deploy)                   |
| Tools     | Git, Postman, Cloudinary                           |

Tampilan: badge/tag per skill, dikelompokkan per kategori. Tidak pakai progress bar.

### 7. Education

**Universitas Nahdlatul Ulama Al-Ghazali Cilacap**
S1 Informatika · 2022 – Sekarang · GPA 3.85/4.00
Topik skripsi: _WebXR-based VR Panorama 360° Experience_

**SMA N 1 Patikraja**
IPA · 2019 – 2022 · Rata-rata nilai akhir 8.56

### 8. Certifications

- MSIB Studi Independen – Front-End Web Development (React.js) · Hacktiv8, 2024
- MSIB Magang – Full-Stack Developer · PT Winnicode Indonesia, 2025
- Fundamental HTML, CSS, and JavaScript · Codepolitan
- Fundamental Bootstrap · Codepolitan

### 9. Contact

- Teks ajakan: _"Let's build something together."_
- Email: rezkymubarok0256@gmail.com
- Phone: +6289504500108
- Lokasi: Notog, Patikraja, Banyumas, Jawa Tengah
- Link sosial: GitHub · LinkedIn
- Form sederhana: nama, email, pesan → Formspree / EmailJS

---

## Component Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   └── ui/              ← shadcn components
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   └── certifications.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Data Management

Semua konten dipisah di folder `data/` sebagai typed array TypeScript. Update konten cukup edit file `.ts`, tidak perlu sentuh komponen.

```ts
// data/experience.ts
export const experience = [
  {
    role: "Full-Stack Developer",
    company: "PT Winnicode Indonesia",
    period: "Feb 2025 – Jul 2025",
    highlights: [
      "Membangun web portal berita dari desain UI/UX hingga deployment",
      "Frontend React.js, backend Node.js + Express.js",
      "Firebase Authentication dengan role Admin & User",
    ],
    github: "https://github.com/rryyykkk/Portal_News",
    demo: null,
  },
];
```

```ts
// data/projects.ts
export const projects = [
  {
    name: "Portal Berita",
    description:
      "Web portal berita dengan autentikasi Firebase, role admin/user, dan upload gambar via Cloudinary.",
    stack: ["React", "Node.js", "Express", "Firebase", "Cloudinary"],
    github: "https://github.com/rryyykkk/Portal_News",
    demo: null,
  },
  {
    name: "YuSmart E-Commerce",
    description:
      "Aplikasi e-commerce dengan Redux state management dan Firebase Authentication.",
    stack: ["React", "Redux", "Firebase"],
    github: null,
    demo: "https://e-comerce-yusmart.netlify.app/",
  },
  {
    name: "Mind Platform",
    description:
      "Platform WebVR untuk asesmen kognitif lansia dengan admin panel dan role-based access control.",
    stack: ["React", "Three.js", "WebVR", "Express", "Cloudinary"],
    github: null,
    demo: "https://mind-platform.id/",
  },
  {
    name: "Juwara Unggas Nusantara",
    description:
      "Landing page perusahaan dengan optimasi SEO, integrasi WhatsApp dan email.",
    stack: ["React", "Tailwind CSS"],
    github: null,
    demo: "https://juwaraunggasnusantara.com/",
  },
];
```

```ts
// data/skills.ts
export const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "PHP", "Rust", "Python"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Three.js", "WebXR", "WebVR"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Laravel", "CodeIgniter", "Flask"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Bootstrap", "Bulma", "shadcn/ui", "daisyUI"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
  },
  { category: "Desktop", items: ["Tauri"] },
  { category: "Realtime", items: ["Socket.io"] },
  { category: "DevOps", items: ["Netlify", "VPS"] },
  { category: "Tools", items: ["Git", "Postman", "Cloudinary"] },
];
```

---

## Behavior & UX

| Behaviour         | Detail                                                 |
| ----------------- | ------------------------------------------------------ |
| Scroll navigation | `href="#section-id"` + `scroll-behavior: smooth`       |
| Dark/light toggle | Button di navbar, default dark                         |
| Animasi section   | Fade-in saat masuk viewport via `IntersectionObserver` |
| Responsive        | Mobile-first, breakpoint `md` dan `lg`                 |
| CV download       | File PDF statis di `/public/cv.pdf`                    |
| Foto profil       | Gambar statis di `/public/photo.jpg`                   |

---

## Out of Scope

- Blog / artikel
- CMS atau admin panel
- Backend / database
- Autentikasi
- Multilanguage

---

## Success Criteria

- Lighthouse score ≥ 90 (performance, accessibility)
- Load time < 2 detik
- Tampil baik di Chrome, Firefox, Safari
- Responsive 375px (mobile) hingga 1440px (desktop)

export interface Project {
  name: string;
  description: string;
  stack: string[];
  github: string | null;
  demo: string | null;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "Mind Platform",
    description:
      "Platform WebVR untuk asesmen kognitif lansia dengan lingkungan 3D interaktif, admin panel, dan role-based access control.",
    stack: ["React", "Three.js", "WebVR", "Express", "Cloudinary"],
    github: null,
    demo: "https://mind-platform.id/",
    featured: true,
  },
  {
    name: "Portal Berita",
    description:
      "Web portal berita dengan autentikasi Firebase, role admin/user, upload gambar via Cloudinary, dan manajemen konten lengkap.",
    stack: ["React", "Node.js", "Express", "Firebase", "Cloudinary"],
    github: "https://github.com/rryyykkk/Portal_News",
    demo: null,
    featured: true,
  },
  {
    name: "YuSmart E-Commerce",
    description:
      "Aplikasi e-commerce dengan Redux state management, Firebase Authentication, dan tampilan yang responsif.",
    stack: ["React", "Redux", "Firebase"],
    github: null,
    demo: "https://e-comerce-yusmart.netlify.app/",
    featured: false,
  },
  {
    name: "Juwara Unggas Nusantara",
    description:
      "Landing page perusahaan dengan optimasi SEO on-page, integrasi WhatsApp Business, dan formulir email kontak.",
    stack: ["React", "Tailwind CSS"],
    github: null,
    demo: "https://juwaraunggasnusantara.com/",
    featured: false,
  },
];

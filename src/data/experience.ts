export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  highlights: string[];
  github?: string | null;
  demo?: string | null;
}

export const experience: Experience[] = [
  {
    role: "Full-Stack Developer",
    company: "PT Winnicode Indonesia",
    period: "Feb 2025 – Jul 2025",
    type: "Magang",
    highlights: [
      "Membangun web portal berita dari desain UI/UX hingga deployment production",
      "Frontend menggunakan React.js dengan desain responsif dan user-friendly",
      "Backend Node.js + Express.js dengan REST API yang terstruktur",
      "Firebase Authentication dengan role Admin & User, upload gambar via Cloudinary",
    ],
    github: "https://github.com/rryyykkk/Portal_News",
    demo: null,
  },
  {
    role: "Full-Stack Developer – Riset",
    company: "Mind Platform – Web VR",
    period: "Ongoing",
    type: "Riset",
    highlights: [
      "Mengembangkan platform WebVR untuk asesmen kognitif lansia",
      "Implementasi lingkungan 3D interaktif menggunakan Three.js dan WebVR API",
      "Admin panel dengan role-based access control dan manajemen sesi",
      "Backend Express.js dengan integrasi Cloudinary untuk aset 3D",
    ],
    github: null,
    demo: "https://mind-platform.id/",
  },
  {
    role: "Frontend Developer",
    company: "PT Juwara Unggas Nusantara",
    period: "Project-based",
    type: "Freelance",
    highlights: [
      "Membangun landing page perusahaan dari scratch dengan React",
      "Optimasi SEO on-page untuk meningkatkan visibilitas di mesin pencari",
      "Integrasi WhatsApp Business API dan formulir email kontak",
    ],
    github: null,
    demo: "https://juwaraunggasnusantara.com/",
  },
  {
    role: "Frontend Developer – Studi Independen",
    company: "MSIB – Hacktiv8",
    period: "Sep – Des 2024",
    type: "Studi Independen",
    highlights: [
      "Program Studi Independen MSIB batch 7 bersama Hacktiv8",
      "Belajar React.js secara mendalam: hooks, state management, dan best practices",
      "Menyelesaikan berbagai proyek frontend skala nyata selama program berlangsung",
    ],
    github: null,
    demo: null,
  },
];

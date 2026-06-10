export interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Bahasa Pemrograman",
    icon: "code",
    items: ["JavaScript", "TypeScript", "PHP", "Rust", "Python"],
  },
  {
    category: "Frontend",
    icon: "monitor",
    items: ["React", "Next.js", "Three.js", "WebXR", "WebVR"],
  },
  {
    category: "Backend",
    icon: "server",
    items: ["Node.js", "Express", "Laravel", "CodeIgniter", "Flask"],
  },
  {
    category: "Styling & UI",
    icon: "palette",
    items: ["Tailwind CSS", "Bootstrap", "Bulma", "shadcn/ui", "daisyUI"],
  },
  {
    category: "Database",
    icon: "database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
  },
  {
    category: "Aplikasi Desktop",
    icon: "desktop",
    items: ["Tauri"],
  },
  {
    category: "Real-time",
    icon: "zap",
    items: ["Socket.io"],
  },
  {
    category: "DevOps",
    icon: "cloud",
    items: ["Netlify", "VPS (bare metal)"],
  },
  {
    category: "Tools",
    icon: "wrench",
    items: ["Git", "Postman", "Cloudinary"],
  },
];

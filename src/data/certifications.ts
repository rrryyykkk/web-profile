export interface Certification {
  title: string;
  issuer: string;
  year: string;
  type: "course" | "internship" | "program";
}

export const certifications: Certification[] = [
  {
    title: "MSIB Magang – Full-Stack Developer",
    issuer: "PT Winnicode Indonesia",
    year: "2025",
    type: "internship",
  },
  {
    title: "MSIB Studi Independen – Front-End Web Development (React.js)",
    issuer: "Hacktiv8",
    year: "2024",
    type: "program",
  },
  {
    title: "Fundamental HTML, CSS, and JavaScript",
    issuer: "Codepolitan",
    year: "2023",
    type: "course",
  },
  {
    title: "Fundamental Bootstrap",
    issuer: "Codepolitan",
    year: "2023",
    type: "course",
  },
];

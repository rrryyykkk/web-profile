import { RiGraduationCapLine, RiBookOpenLine } from "react-icons/ri";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const educationData = [
  {
    institution: "Universitas Nahdlatul Ulama Al-Ghazali Cilacap",
    shortName: "UNUGHA Cilacap",
    degree: "S1 Informatika",
    period: "2022 – Sekarang",
    detail: "GPA 3.85/4.00",
    thesis: "Skripsi: WebXR-based VR Panorama 360° Experience",
    icon: "university",
    current: true,
  },
  {
    institution: "SMA Negeri 1 Patikraja",
    shortName: "SMAN 1 Patikraja",
    degree: "Ilmu Pengetahuan Alam (IPA)",
    period: "2019 – 2022",
    detail: "Rata-rata nilai akhir 8.56",
    thesis: null,
    icon: "school",
    current: false,
  },
];

const Education = () => {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="education" className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border max-w-15" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Pendidikan
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Latar Belakang <span className="gradient-text">Pendidikan</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/3 to-secondary/3 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex items-start gap-5">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {edu.icon === "university" ? (
                      <RiGraduationCapLine size={24} />
                    ) : (
                      <RiBookOpenLine size={24} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground leading-snug">
                        {edu.institution}
                      </h3>
                      {edu.current && (
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Aktif
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-primary font-medium mb-1">
                      {edu.degree}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                      <span>{edu.period}</span>
                      <span className="font-medium text-foreground/70">
                        {edu.detail}
                      </span>
                    </div>

                    {edu.thesis && (
                      <p className="text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-3">
                        {edu.thesis}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

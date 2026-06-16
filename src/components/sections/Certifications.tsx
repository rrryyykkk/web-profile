import {
  RiAwardLine,
  RiVerifiedBadgeLine,
  RiBookmarkLine,
} from "react-icons/ri";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { certifications } from "../../data/certifications";

const typeConfig: Record<
  string,
  { label: string; icon: React.ReactNode; style: string }
> = {
  internship: {
    label: "Magang",
    icon: <RiVerifiedBadgeLine size={14} />,
    style: "bg-primary/10 text-primary border-primary/20",
  },
  program: {
    label: "Program",
    icon: <RiAwardLine size={14} />,
    style: "bg-secondary/10 text-secondary border-secondary/20",
  },
  course: {
    label: "Kursus",
    icon: <RiBookmarkLine size={14} />,
    style: "bg-accent/10 text-accent border-accent/20",
  },
};

const Certifications = () => {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="certifications" className="py-10 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border max-w-15" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Sertifikasi
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Sertifikat{" "}
              <span className="gradient-text">&amp; Penghargaan</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => {
              const config = typeConfig[cert.type];
              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    {/* Award icon */}
                    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <RiAwardLine size={20} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-foreground leading-snug mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {cert.issuer} · {cert.year}
                      </p>

                      {config && (
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${config.style}`}
                        >
                          {config.icon}
                          {config.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;

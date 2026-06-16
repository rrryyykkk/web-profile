import {
  RiGithubLine,
  RiExternalLinkLine,
  RiBriefcaseLine,
} from "react-icons/ri";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { experience } from "../../data/experience";

const typeBadgeStyle: Record<string, string> = {
  Magang: "bg-primary/10 text-primary border-primary/20",
  Riset: "bg-secondary/10 text-secondary border-secondary/20",
  Freelance: "bg-accent/10 text-accent border-accent/20",
  "Studi Independen": "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const Experience = () => {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="experience" className="py-10 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border max-w-15" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Pengalaman
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Perjalanan <span className="gradient-text">Karier</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-linear-to-b from-primary/60 via-secondary/40 to-transparent" />

            <div className="space-y-10">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-16 sm:pl-20"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-6 top-1 w-5 h-5 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  {/* Card */}
                  <div className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <RiBriefcaseLine size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                            typeBadgeStyle[exp.type] ||
                            "bg-muted text-muted-foreground border-border"
                          }`}
                        >
                          {exp.type}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Links */}
                    {(exp.github || exp.demo) && (
                      <div className="flex gap-3 pt-2 border-t border-border">
                        {exp.github && (
                          <a
                            href={exp.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <RiGithubLine size={14} />
                            Lihat Kode
                          </a>
                        )}
                        {exp.demo && (
                          <a
                            href={exp.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <RiExternalLinkLine size={14} />
                            Demo Langsung
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

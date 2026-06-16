import { RiGithubLine, RiExternalLinkLine, RiStarLine } from "react-icons/ri";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { projects } from "../../data/projects";

const stackColors: Record<string, string> = {
  React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Next.js": "bg-foreground/10 text-foreground border-foreground/20",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/20",
  Express: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  Firebase: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Cloudinary: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Redux: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Three.js": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  WebVR: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "Tailwind CSS": "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

const getStackClass = (tech: string) =>
  stackColors[tech] || "bg-muted text-muted-foreground border-border";

const Projects = () => {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="projects" className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border max-w-15" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Proyek
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Yang Pernah <span className="gradient-text">Saya Buat</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Beberapa proyek yang menunjukkan kemampuan teknis dan
              problem-solving saya dalam dunia nyata.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full">
                    <RiStarLine size={12} />
                    Unggulan
                  </div>
                )}

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStackClass(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                      >
                        <RiGithubLine size={16} />
                        GitHub
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/40 cursor-not-allowed">
                        <RiGithubLine size={16} />
                        Privat
                      </span>
                    )}

                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                      >
                        <RiExternalLinkLine size={16} />
                        Demo Langsung
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/40">
                        <RiExternalLinkLine size={16} />
                        Tidak Ada Demo
                      </span>
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

export default Projects;

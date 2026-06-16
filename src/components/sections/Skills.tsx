import {
  RiCodeLine,
  RiComputerLine,
  RiServerLine,
  RiPaletteLine,
  RiDatabase2Line,
  RiAppStoreLine,
  RiFlashlightLine,
  RiCloudLine,
  RiToolsLine,
} from "react-icons/ri";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { skills } from "../../data/skills";

const iconMap: Record<string, React.ReactNode> = {
  code: <RiCodeLine size={18} />,
  monitor: <RiComputerLine size={18} />,
  server: <RiServerLine size={18} />,
  palette: <RiPaletteLine size={18} />,
  database: <RiDatabase2Line size={18} />,
  desktop: <RiAppStoreLine size={18} />,
  zap: <RiFlashlightLine size={18} />,
  cloud: <RiCloudLine size={18} />,
  wrench: <RiToolsLine size={18} />,
};

const categoryColors: Record<string, string> = {
  "Bahasa Pemrograman": "text-cyan-400 bg-cyan-400/10",
  Frontend: "text-blue-400 bg-blue-400/10",
  Backend: "text-green-400 bg-green-400/10",
  "Styling & UI": "text-pink-400 bg-pink-400/10",
  Database: "text-orange-400 bg-orange-400/10",
  "Aplikasi Desktop": "text-purple-400 bg-purple-400/10",
  "Real-time": "text-yellow-400 bg-yellow-400/10",
  DevOps: "text-teal-400 bg-teal-400/10",
  Tools: "text-gray-400 bg-gray-400/10",
};

const Skills = () => {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="skills" className="py-10 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border max-w-15" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Keahlian
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Keahlian <span className="gradient-text">Teknis</span>
            </h2>
            <p className="text-muted-foreground mt-3">
              Tools dan teknologi yang saya gunakan sehari-hari.
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((cat) => {
              const colorClass =
                categoryColors[cat.category] || "text-primary bg-primary/10";
              const icon = iconMap[cat.icon] || <RiCodeLine size={18} />;

              return (
                <div
                  key={cat.category}
                  className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorClass}`}
                    >
                      {icon}
                    </div>
                    <h3 className="font-semibold text-sm">{cat.category}</h3>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
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

export default Skills;

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const stats = [
  { value: "1+", label: "Tahun Pengalaman" },
  { value: "4+", label: "Proyek Selesai" },
  { value: "3.85", label: "IPK / 4.00" },
];

const About = () => {
  const [ref, visible] = useIntersectionObserver();

  return (
    <section id="about" className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
          {/* Section header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border max-w-15" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Tentang Saya
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div className="space-y-5">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Semangat{" "}
                <span className="gradient-text">membangun web</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Saya adalah mahasiswa S1 Informatika di Universitas Nahdlatul
                  Ulama Al-Ghazali (UNUGHA) Cilacap, angkatan 2022, dengan IPK
                  3.85/4.00. Saat ini sedang menyelesaikan skripsi tentang{" "}
                  <em>WebXR-based VR Panorama 360° Experience</em>.
                </p>
                <p>
                  Fokus utama saya adalah full-stack web development — dari REST
                  API dan autentikasi di backend, hingga UI yang responsif dan
                  menarik di frontend. Saya juga mendalami{" "}
                  <span className="text-primary font-medium">
                    immersive web (WebXR/WebVR)
                  </span>{" "}
                  sebagai bidang riset.
                </p>
                <p>
                  Pengalaman nyata saya meliputi magang sebagai Full-Stack
                  Developer di PT Winnicode Indonesia, freelance untuk PT Juwara
                  Unggas Nusantara, dan riset aktif pada Mind Platform — sebuah
                  platform WebVR untuk asesmen kognitif lansia.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative group rounded-2xl border border-border bg-card p-6 text-center overflow-hidden hover:border-primary/40 transition-colors"
                >
                  {/* glow bg */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium leading-tight">
                      {stat.label}
                    </p>
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

export default About;

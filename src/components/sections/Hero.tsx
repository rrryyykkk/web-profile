import {
  RiGithubLine,
  RiLinkedinLine,
  RiMailLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiArrowDownLine,
  RiDownloadLine,
  RiFolder3Line,
} from "react-icons/ri";
import { BeamsBackground } from "../ui/beams-background";

const Hero = () => {
  return (
    <BeamsBackground>
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Terbuka untuk Kerja Sama
              </div>

              {/* Name & Title */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Rezky <span className="gradient-text">Mubarok</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground font-medium">
                  Junior Full-Stack Developer
                </p>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Developer yang bersemangat membangun aplikasi web full-stack,
                REST API, dan pengalaman web imersif dengan WebXR/WebVR.
                Saat ini menempuh S1 Informatika di UNUGHA Cilacap
                dengan IPK 3.85/4.00.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  id="hero-view-projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all glow-primary"
                >
                  <RiFolder3Line size={16} />
                  Lihat Proyek
                </a>
                <a
                  href="/cv.pdf"
                  id="hero-download-cv"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <RiDownloadLine size={16} />
                  Unduh CV
                </a>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://github.com/rrryyykkk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors group-hover:text-primary">
                    <RiGithubLine size={18} />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/rezky-mubarok-62a8172a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors group-hover:text-primary">
                    <RiLinkedinLine size={18} />
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/r3zkymrk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-pink-500 hover:bg-pink-500/10 transition-colors group-hover:text-pink-500">
                    <RiInstagramLine size={18} />
                  </span>
                </a>
                <a
                  href="http://facebook.com/rezky.mubarok.739/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-blue-600 hover:bg-blue-600/10 transition-colors group-hover:text-blue-600">
                    <RiFacebookCircleLine size={18} />
                  </span>
                </a>
                <a
                  href="mailto:rezkymubarok0256@gmail.com"
                  aria-label="Email"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors group-hover:text-primary">
                    <RiMailLine size={18} />
                  </span>
                </a>
              </div>
            </div>

            {/* Profile photo */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 blur-2xl scale-110" />
                <div className="absolute inset-0 rounded-2xl border border-primary/20 rotate-6 scale-105" />
                <div className="absolute inset-0 rounded-2xl border border-secondary/20 -rotate-3 scale-102" />

                {/* Photo container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-border shadow-2xl bg-linear-to-tr from-black via-card to-secondary/20">
                  <img
                    src="/fp_profile-removebg-preview_11zon.webp"
                    alt="Rezky Mubarok"
                    fetchPriority="high"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Try the WebP fallback if transparent PNG fails
                      const img = e.target as HTMLImageElement;
                      if (img.src.endsWith("fp_profile-removebg-preview.png")) {
                        img.src = "/fp_profile.webp";
                      } else {
                        // Final fallback avatar if both images fail
                        img.style.display = "none";
                        img.parentElement!.classList.add(
                          "flex",
                          "items-center",
                          "justify-center",
                        );
                        const el = document.createElement("span");
                        el.textContent = "RM";
                        el.className =
                          "text-6xl font-bold gradient-text select-none";
                        img.parentElement!.appendChild(el);
                      }
                    }}
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl border border-border bg-card/90 backdrop-blur-sm shadow-lg flex items-center gap-2 text-xs font-medium">
                  <span className="text-accent">✦</span>
                  Full-Stack Dev
                </div>
                <div className="absolute -top-4 -right-4 px-3 py-2 rounded-xl border border-border bg-card/90 backdrop-blur-sm shadow-lg flex items-center gap-2 text-xs font-medium">
                  <span className="text-primary">◎</span>
                  GPA 3.85/4.00
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-16">
            <a
              href="#about"
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
              aria-label="Scroll to about"
            >
              <span className="text-xs tracking-widest uppercase">Gulir</span>
              <RiArrowDownLine size={18} />
            </a>
          </div>
        </div>
      </section>
    </BeamsBackground>
  );
};

export default Hero;

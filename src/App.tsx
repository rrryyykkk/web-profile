import { lazy, Suspense, useState, useEffect } from "react";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Hero from "./components/sections/Hero";

// Lazy load sections below the fold
const About = lazy(() => import("./components/sections/About"));
const Experience = lazy(() => import("./components/sections/Experience"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Education = lazy(() => import("./components/sections/Education"));
const Certifications = lazy(() => import("./components/sections/Certifications"));
const Contact = lazy(() => import("./components/sections/Contact"));

function SectionSkeleton() {
  return <div className="min-h-[100px]" aria-hidden="true" />;
}

const App = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-transparent dark:bg-background text-foreground relative overflow-hidden bg-dot-pattern">
      {/* Dark mode: premium ambient blobs */}
      <div className="dark:block hidden absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className={`absolute top-[10%] left-[5%] w-112.5 h-112.5 rounded-full bg-primary/7 blur-[120px] will-change-transform ${mounted ? "bg-animate-blob-1" : ""}`} />
        <div className={`absolute bottom-[20%] right-[10%] w-125 h-125 rounded-full bg-secondary/7 blur-[140px] will-change-transform ${mounted ? "bg-animate-blob-2" : ""}`} />
        <div className={`absolute top-[45%] left-[40%] w-87.5 h-87.5 rounded-full bg-accent/4 blur-[110px] will-change-transform`} />
      </div>

      {/* Light mode: colorful animated blobs */}
      <div className="dark:hidden block absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <div className={`absolute top-[5%] left-[0%] w-125 h-125 rounded-full bg-indigo-400/20 blur-[100px] will-change-transform ${mounted ? "light-blob-1" : ""}`} />
        <div className={`absolute top-[0%] right-[0%] w-112.5 h-112.5 rounded-full bg-cyan-400/18 blur-[120px] will-change-transform ${mounted ? "light-blob-2" : ""}`} />
        <div className={`absolute bottom-[10%] left-[30%] w-100 h-100 rounded-full bg-emerald-400/15 blur-[110px] will-change-transform ${mounted ? "light-blob-3" : ""}`} />
        <div
          className={`absolute bottom-[5%] right-[5%] w-95 h-95 rounded-full bg-purple-400/18 blur-[100px] will-change-transform ${mounted ? "light-blob-1" : ""}`}
          style={{ animationDelay: "-8s" }}
        />
        <div
          className={`absolute top-[40%] left-[10%] w-75 h-75 rounded-full bg-pink-400/12 blur-[90px] will-change-transform ${mounted ? "light-blob-2" : ""}`}
          style={{ animationDelay: "-15s" }}
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
          <Projects />
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Education />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;

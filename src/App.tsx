import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";

const App = () => {
  return (
    <div className="min-h-screen bg-transparent dark:bg-background text-foreground relative overflow-hidden bg-dot-pattern">
      {/* Dark mode: premium ambient blobs */}
      <div className="dark:block hidden absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[5%] w-112.5 h-112.5 rounded-full bg-primary/7 blur-[120px] bg-animate-blob-1" />
        <div className="absolute bottom-[20%] right-[10%] w-125 h-125 rounded-full bg-secondary/7 blur-[140px] bg-animate-blob-2" />
        <div className="absolute top-[45%] left-[40%] w-87.5 h-87.5 rounded-full bg-accent/4 blur-[110px]" />
      </div>

      {/* Light mode: colorful animated blobs */}
      <div className="dark:hidden block absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="light-blob-1 absolute top-[5%] left-[0%] w-125 h-125 rounded-full bg-indigo-400/20 blur-[100px]" />
        <div className="light-blob-2 absolute top-[0%] right-[0%] w-112.5 h-112.5 rounded-full bg-cyan-400/18 blur-[120px]" />
        <div className="light-blob-3 absolute bottom-[10%] left-[30%] w-100 h-100 rounded-full bg-emerald-400/15 blur-[110px]" />
        <div
          className="light-blob-1 absolute bottom-[5%] right-[5%] w-95 h-95 rounded-full bg-purple-400/18 blur-[100px]"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="light-blob-2 absolute top-[40%] left-[10%] w-75 h-75 rounded-full bg-pink-400/12 blur-[90px]"
          style={{ animationDelay: "-15s" }}
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;

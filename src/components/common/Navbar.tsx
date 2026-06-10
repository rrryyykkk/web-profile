import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  RiMenu3Line,
  RiCloseLine,
  RiSunLine,
  RiMoonLine,
} from "react-icons/ri";

const navLinks = [
  { label: "Tentang", href: "#about" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Proyek", href: "#projects" },
  { label: "Keahlian", href: "#skills" },
  { label: "Kontak", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            RM
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:block gradient-text">
            rezky.dev
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <RiSunLine size={18} />
              ) : (
                <RiMoonLine size={18} />
              )}
            </button>
          )}

          {/* Hire me CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity glow-primary"
          >
            Hubungi Saya
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <RiCloseLine size={20} /> : <RiMenu3Line size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center"
              >
                Hubungi Saya
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import {
  RiGithubLine,
  RiLinkedinLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiMailLine,
} from "react-icons/ri";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="text-sm text-muted-foreground">
          © {year}{" "}
          <span className="font-semibold text-foreground">Rezky Mubarok</span>.
          Dibuat dengan React &amp; Tailwind CSS.
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/rrryyykkk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RiGithubLine size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/rezky-mubarok-62a8172a3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RiLinkedinLine size={18} />
          </a>
          <a
            href="https://www.instagram.com/r3zkymrk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RiInstagramLine size={18} />
          </a>
          <a
            href="http://facebook.com/rezky.mubarok.739/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RiFacebookCircleLine size={18} />
          </a>
          <a
            href="mailto:rezkymubarok0256@gmail.com"
            aria-label="Email"
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RiMailLine size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

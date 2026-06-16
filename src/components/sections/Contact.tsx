import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiGithubLine,
  RiLinkedinLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiSendPlaneLine,
  RiLoader4Line,
  RiCheckLine,
} from "react-icons/ri";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: <RiMailLine size={18} />,
    label: "Email",
    value: "rezkymubarok0256@gmail.com",
    href: "mailto:rezkymubarok0256@gmail.com",
  },
  {
    icon: <RiPhoneLine size={18} />,
    label: "Telepon",
    value: "+62 895 0450 0108",
    href: "https://wa.me/6289504500108",
  },
  {
    icon: <RiMapPinLine size={18} />,
    label: "Lokasi",
    value: "Notog, Patikraja, Banyumas, Jawa Tengah",
    href: null,
  },
];

const socialLinks = [
  {
    icon: <RiGithubLine size={20} />,
    label: "GitHub",
    href: "https://github.com/rrryyykkk",
  },
  {
    icon: <RiLinkedinLine size={20} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rezky-mubarok-62a8172a3/",
  },
  {
    icon: <RiInstagramLine size={20} />,
    label: "Instagram",
    href: "https://www.instagram.com/r3zkymrk/",
  },
  {
    icon: <RiFacebookCircleLine size={20} />,
    label: "Facebook",
    href: "http://facebook.com/rezky.mubarok.739/",
  },
  {
    icon: <RiMailLine size={20} />,
    label: "Email",
    href: "mailto:rezkymubarok0256@gmail.com",
  },
];

type FormStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [ref, visible] = useIntersectionObserver();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // ✅ Set loading sebelum kirim
    setStatus("loading");
    const toastId = toast.loading("Mengirim pesan...");

    // ✅ Update hidden time input
    const timeInput = formRef.current.querySelector(
      'input[name="time"]',
    ) as HTMLInputElement;
    if (timeInput) {
      timeInput.value = new Date().toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "short",
      });
    }

    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        toast.success("Pesan anda berhasil terkirim!", { id: toastId });
        formRef.current?.reset();
        setForm({ name: "", email: "", message: "" });
        setStatus("success");
        console.log("form:", form);
        setTimeout(() => setStatus("idle"), 2000);
      })
      .catch(() => {
        toast.error("Gagal mengirim pesan.", { id: toastId });
        setStatus("error");
      });
  };

  return (
    <section id="contact" className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`fade-in-up ${visible ? "visible" : ""}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-border max-w-15" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Kontak
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              Mari buat sesuatu <span className="gradient-text">bersama.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Saya terbuka untuk peluang full-time, freelance, maupun kolaborasi
              proyek. Jangan ragu untuk menghubungi saya!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left */}
            <div className="space-y-8">
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                  Temukan saya di
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        s.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={s.label}
                      className="w-11 h-11 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <form
              ref={formRef}
              onSubmit={sendEmail}
              id="contact-form"
              className="rounded-2xl border border-border bg-card p-6 space-y-5"
            >
              {/* ✅ Hidden input time */}
              <input type="hidden" name="time" />

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Nama
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama kamu"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Halo Rezky, saya ingin berdiskusi tentang..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                disabled={status === "loading" || status === "success"}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all glow-primary cursor-pointer"
              >
                {status === "loading" && (
                  <RiLoader4Line size={16} className="animate-spin" />
                )}
                {status === "success" && <RiCheckLine size={16} />}
                {status === "idle" || status === "error" ? (
                  <RiSendPlaneLine size={16} />
                ) : null}
                {status === "loading"
                  ? "Mengirim..."
                  : status === "success"
                    ? "Pesan Terkirim!"
                    : status === "error"
                      ? "Gagal, coba lagi"
                      : "Kirim Pesan"}
              </button>

              {status === "error" && (
                <p className="text-xs text-red-400 text-center">
                  Gagal mengirim pesan. Silakan coba lagi atau hubungi via email
                  langsung.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

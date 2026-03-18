import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContact = () => {
    setMobileOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAdmin = () => {
    setMobileOpen(false);
    document.getElementById("admin")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-navy rounded flex items-center justify-center">
              <span className="text-gold font-bold text-sm tracking-widest">
                ILA
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-navy font-bold text-sm uppercase tracking-widest leading-tight">
                International Legal
              </p>
              <p className="text-gold text-xs uppercase tracking-widest leading-tight">
                Associates
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-xs font-semibold uppercase tracking-widest text-foreground hover:text-gold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#admin"
              data-ocid="nav.link"
              className="text-xs font-semibold uppercase tracking-widest text-foreground hover:text-gold transition-colors duration-200"
            >
              Admin
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <a href="#contact">
              <Button
                data-ocid="nav.primary_button"
                className="bg-gold hover:bg-gold-light text-navy font-bold text-xs uppercase tracking-widest px-5 py-2 rounded-none transition-all duration-200"
              >
                Get Consultation
              </Button>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold uppercase tracking-widest text-navy hover:text-gold transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                data-ocid="nav.link"
                onClick={scrollToAdmin}
                className="text-left text-sm font-semibold uppercase tracking-widest text-navy hover:text-gold transition-colors py-1"
              >
                Admin
              </button>
              <Button
                data-ocid="nav.primary_button"
                onClick={scrollToContact}
                className="w-full bg-gold hover:bg-gold-light text-navy font-bold text-xs uppercase tracking-widest rounded-none"
              >
                Get Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

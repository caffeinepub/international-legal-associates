import { Linkedin, Mail, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/international-legal-associates-0767343b0?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer style={{ background: "oklch(0.18 0.05 243)" }}>
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gold rounded flex items-center justify-center">
                <span className="text-navy font-bold text-sm tracking-widest">
                  ILA
                </span>
              </div>
              <div>
                <p className="text-white font-bold text-sm uppercase tracking-widest leading-tight">
                  International Legal
                </p>
                <p className="text-gold text-xs uppercase tracking-widest leading-tight">
                  Associates
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Premier paralegal services with precision, integrity, and
              dedication. Your trusted legal support partner.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  data-ocid="nav.link"
                  className="w-8 h-8 border border-white/20 hover:border-gold hover:text-gold flex items-center justify-center text-white/60 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    className="text-white/60 hover:text-gold text-sm transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-bold mb-5">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:ashutoshsingh0101970@gmail.com"
                  className="text-white/60 hover:text-gold text-sm transition-colors break-all"
                >
                  ashutoshsingh0101970@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+919596991023"
                  className="text-white/60 hover:text-gold text-sm transition-colors"
                >
                  +91 95969 91023
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © {year} International Legal Associates. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
